import pg from 'pg';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';

import passportStrategy from './passportConfig.js';
import groupsRoutes from './Routes/groups.js'
import notebooksRoutes from './Routes/notebooks.js';
import pomodoroRoutes from './Routes/pomodoro.js';
import usersRoutes from './Routes/users.js';
import chatRoutes from './Routes/chat.js';
import rankingsRoutes from './Routes/rankings.js';
import badgesRoutes from './Routes/badges.js';

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

const groupImageStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'client/public/images/group-icons');
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname)
  }
});

const profilePictureStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'client/public/images/profile-pictures');
  },
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname)
  }
});

const uploadGroupImage = multer({
  storage: groupImageStorage
});

const uploadProfilePicture = multer({
  storage: profilePictureStorage
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

    groupsRoutes(app, secureRoute, uploadGroupImage, database);
    notebooksRoutes(app, secureRoute, database);
    pomodoroRoutes(app, secureRoute, database);
    usersRoutes(app, secureRoute, uploadProfilePicture, database, passport);
    chatRoutes(app, secureRoute, database);
    rankingsRoutes(app, secureRoute, database);
    badgesRoutes(app, secureRoute, database);

    app.listen(2727, () => {
      console.log('Server started!');
    });
  }
});
