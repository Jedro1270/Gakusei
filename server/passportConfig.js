import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { Strategy as facebookStrategy } from 'passport-facebook';
import passportJwt from 'passport-jwt';

const JWTStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export default function passportStrategy(passport, database) {

    passport.use(
        new localStrategy((username, password, done) => {
            database.query(
                `
                    SELECT * FROM "users"
                        INNER JOIN "level_achievements" 
                            USING (user_id)
                        INNER JOIN "levels"
                            USING (level_id)
                    WHERE "username" = $1
                    ORDER BY "level_id" DESC;
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

    passport.use(
        new googleStrategy(
            {
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: 'http://localhost:2727/auth/google/redirect'
            },
            (accessToken, refreshToken, profile, done) => {
                done(null, profile);
            }
        )
    );

    passport.use(
        new facebookStrategy(
            {
                clientID: process.env.FACEBOOK_ID,
                clientSecret: process.env.FACEBOOK_SECRET,
                callbackURL: 'http://localhost:3000/auth/facebook/redirect'
            },
            function (accessToken, refreshToken, profile, done) {
                done(null, profile);
            }
        )
    );

    passport.serializeUser((user, done) => {

        const body = {
            id: user.id,
            username: user.displayName,
            profilePicture: null,
        }

        const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

        const signInDetails = {
            token: token,
            body: body
        }

        done(null, signInDetails);
    });

    passport.deserializeUser((signInDetails, done) => {
        done(null, signInDetails)
    });
}