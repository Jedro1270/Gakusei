import bcrypt from 'bcryptjs';
import { Strategy as localStrategy } from 'passport-local';

export default function passportStrategy(passport, database) {

    passport.use(
        new localStrategy((username, password, done) => {
            database.query(
                `
                    SELECT * FROM "users"
                        WHERE "username" = '${username}';
                `,
                (error, results) => {
                    if (error) {
                        console.log(`ERROR: ${error}`)
                      } else {

                        if (results.rows.length === 0) {
                          return done(null, false)
                        }

                        const user = results.rows[0];

                        bcrypt.compare( password, user.password, (error, result) => {
                            if (error) {
                                console.log(`ERROR: ${error}`)
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

    passport.serializeUser((user, done) => {
        done(null, user.user_id)
    });

    passport.deserializeUser((id, done) => {
        database.query(
            `
                SELECT * FROM "users"
                    WHERE "user_id" = ${id}
            `,
            (error, results) => {
                const user = results.rows[0];

                done(error, user)
            }
        )
    });
}