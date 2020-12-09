import pg from 'pg';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import session from 'express-session';

import passportStrategy from './passportConfig.js';

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
        .use(bodyParser.urlencoded({extended: true}))
        .use(cors({
          origin: 'http://localhost:3000',
          credentials: true
        }))
        .use(session({
          secret: 'secretCode',
          resave: true,
          saveUninitialized: true
        }))
        .use(cookieParser('secretCode'))
        .use(passport.initialize())
        .use(passport.session());

        passportStrategy(passport, database)

        // Sign In
        app.post('/sign-in', (request, response, next) => {
          passport.authenticate('local', (error, user) => {
            if (error) {
              console.log(`ERROR: ${error}`)
            } else if (!user) {
              console.log('No User exists');
              response.send('Invalid Username or Password')
            } else {
              request.logIn(user, (error) => {
                if (error) {
                  console.log(`ERROR: ${error}`)
                }

                response.send('Successfully Authenticated');
                console.log(request.user);
              });
            }
          })(request, response, next)
        });

        // Sign Up
        app.post('/sign-up', async (request, response) => {
          const hashedPassword = await bcrypt.hash(request.body.password, 10);

          database.query(
            `
              INSERT INTO "users"(username, password, points)
                VALUES('${request.body.username}', '${hashedPassword}', 0)
                ON CONFLICT (username) DO NOTHING
                RETURNING *;
            `,
            (error, results) => {
              if (error) {
                console.log(`ERROR: ${error}`)
              } else {
                if (results.rows.length === 0) {
                  console.log('Username taken');
                  response.send('Username Taken');
                } else {
                  console.log('User inserted');
                  response.send('User Inserted');
                }
              }
            }
          );
        });

        // Groups
        app.get('/groups', (request, response) => {
            try {
                response.send('something');
            } catch (error) {
              console.log(error)
            }
        });

        app.post('/groups/create-group', upload.single('file'), (request, response) => {
          try {
            // database stuff here

            response.json({message: 'Upload Successful'})
          } catch (error) {
            console.log(error)
          }
        });

        // Pomodoro 
        app.get('/pomodoro', (request, response) => {
          try {
            
          } catch (error) {
            console.log(error)
          }
        })
        .listen(2727, () => {
          console.log('Server started!')
        });
  }
});


