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

        passportStrategy(passport, database);

        // Sign In
        app.post('/sign-in', (request, response, next) => {
          passport.authenticate('local', (error, user) => {
            if (error) {
              console.log(`ERROR: ${error}`)
            } else if (!user) {
              console.log('No User exists');
              response.json({message: 'Invalid Username or Password'});
            } else {
              request.logIn(user, (error) => {
                if (error) {
                  console.log(`ERROR: ${error}`)
                }

                response.json({
                  message: 'Successfully Authenticated',
                  user: request.user
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
                  response.json({message: 'Username taken'});
                } else {
                  console.log('User inserted');
                  response.json({message: 'User Inserted'});
                }
              }
            }
          );
        });

        // Groups
        app.get('/groups', (request, response) => {
            try {
                database.query(
                  `
                    SELECT * FROM "groups";
                  `,
                  (error, results) => {
                    if (error) {
                      console.log(`ERROR: ${error}`)
                    } else {         
                      response.json({groups: results.rows});
                    }
                  }
                )
            } catch (error) {
              console.log(error);
            }
        });

        app.post('/groups/join-group/search', (request, response) => {
          try {
            database.query(
              `
                SELECT * FROM "groups"
                  WHERE "group_name" ILIKE '%${request.body.groupname}%';
              `,
              (error, results) => {
                if (error) {
                  console.log(`ERROR: ${error}`)
                } else {         
                  response.json({groups: results.rows});
                }
              }
            )
          } catch (error) {
            console.log(error);
          }
        });

        app.post('/groups/create-group', upload.single('file'), (request, response) => {
          try {
            database.query(          //       INSERT INTO "group_memberships"(user_id, group_id)
              `
                INSERT INTO "groups"(group_name, group_picture)
                  VALUES('${request.body.groupname}', '${request.file.filename}')
                  RETURNING *;
              `,
              (error, results) => {
                if (error) {
                  console.log(`ERROR: ${error}`)
                } else {
                  if (results.rows.length === 0) {
                    console.log('ERROR: Data not inserted to database!');
                  } else {
                    console.log('Group inserted');
                    response.json({message: 'Group Inserted'});
                  }
                }
              }
            );
          } catch (error) {
            console.log(error);
          }
        });

        // Pomodoro 
        app.get('/pomodoro', (request, response) => {
          try {
            
          } catch (error) {
            console.log(error);
          }
        })
        .listen(2727, () => {
          console.log('Server started!');
        });

        // Notebooks
        app.get('/notebooks', (request, response) => {
          try {
            database.query(
              `
                SELECT * FROM "notebooks";
              `,
              (error, results) => {
                console.log(results.rows)
                if (error) {
                  console.log(error)
                } else {
                  
                  response.json({notebooks: results.rows});
                }
              }
            )
          } catch (error) {
            console.log(error);
          }
        });

        app.post('/notebooks', (request, response) => {
          try {
            database.query(
              `
                INSERT INTO "notebooks"(group_id, notebook_name)
                  VALUES(1, '${request.body.notebookName}');
              `,
              (error, results) => {
                if (error) {
                  console.log(error)
                } else {
                  response.json({notebooks: results.rows});
                }
              }
            )
          } catch (error) {
            console.log(error);
          }
        });
  }
});


