import bcrypt from 'bcryptjs';
import { Strategy as localStrategy } from 'passport-local';
import passportJwt from 'passport-jwt';

const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export default function passportStrategy(passport, database) {

    passport.use(
        new localStrategy((username, password, done) => {
            database.query(
                `
                    SELECT * FROM "users"
                        INNER JOIN "level_achievements" USING (user_id)
                    WHERE "username" = $1;
                `, [username],
                (error, results) => {
                    if (error) {
                        console.log(`ERROR: ${error}`);
                        return done(error, false)
                    } else {

                        if (results.rows.length === 0) {
                            return done(null, false)
                        }

                        const user = results.rows[0];

                        bcrypt.compare(password, user.password, (error, result) => {
                            if (error) {
                                console.log(`ERROR: ${error}`);
                                return done(error, false)
                            } else if (result === true) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        });
                    }
                }
            )
        })
    );

    passport.use(
        new JWTStrategy(
            {
                secretOrKey: process.env.TOKEN_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            },
            (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    console.log(error)
                    return done(error);
                }
            }
        )
    );
}