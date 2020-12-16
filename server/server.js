import pg from 'pg';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import passportStrategy from './passportConfig.js';
import groupsRoutes from './Routes/groups.js'
import notebooksRoutes from './Routes/notebooks.js';
import pomodoroRoutes from './Routes/pomodoro.js';

dotenv.config();

if (process.env.TOKEN_SECRET == undefined) {
  process.exit(1);
}

const pool = new pg.Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'gakusei',
  host: 'localhost',
});

const app = express();

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'client/public/images/group-icons');
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname)
  }
});

const upload = multer({
  storage: storage
});

let database;

pool.connect((error, client) => {
  if (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  } else {
    database = client;

    app
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(cors({
        origin: 'http://localhost:3000',
        credentials: true
      }))
      .use(passport.initialize())

    passportStrategy(passport, database);

    // Sign In
    app.post('/sign-in', (request, response, next) => {
      passport.authenticate('local', (error, user) => {
        if (error) {
          console.log(`ERROR: ${error}`)
        } else if (!user) {
          console.log('No User exists');
          response.json({ message: 'Invalid Username or Password' });
        } else {
          request.logIn(user, { session: false }, (error) => {
            if (error) {
              console.log(`ERROR: ${error}`);
              return next(error);
            }

            const body = {
              id: user.user_id,
              username: user.username,
              profilePicture: user.profile_picture,
              points: user.points
            }

            const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET)

            response.json({
              message: 'Successfully Authenticated',
              token: token,
            });
          });
        }
      })(request, response, next);
    });

    // Sign Up
    app.post('/sign-up', async (request, response) => {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);

      database.query(
        `
              INSERT INTO "users"(username, password, points)
                VALUES($1, $2, 0)
                ON CONFLICT (username) DO NOTHING
                RETURNING *;
            `, [request.body.username, hashedPassword],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`)
          } else {
            if (results.rows.length === 0) {
              console.log('Username taken');
              response.json({ message: 'Username taken' });
            } else {
              console.log('User inserted');
              response.json({ message: 'User Inserted' });
            }
          }
        }
      );
    });

    const secureRoute = (request, response, next) => {
      passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error) {
          console.log(`ERROR: ${error}`)
        } else if (!user) {
          console.log('Invalid User!');
          response.json({ message: 'Invalid User' });
        } else {
          request.user = user;
          next();
        }
      })(request, response, next);
    }

    app.get('/api', secureRoute, (request, response, next) => {
      console.log('Token Verified');
      next();
    });

    groupsRoutes(app, secureRoute, upload, database);
    notebooksRoutes(app, secureRoute, database);
    pomodoroRoutes(app, secureRoute, database);

    app.listen(2727, () => {
      console.log('Server started!');
    });
  }
});
