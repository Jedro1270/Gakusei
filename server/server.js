import pg from 'pg';
import bodyParser from 'body-parser';
import express from 'express';
import multer from 'multer';
import cors from 'cors';

const pool = new pg.Pool({
  user: 'postgres',
  password: 'postgres',
  database: 'gakusei',
  host: 'localhost',
});

const app = express();
const upload = multer({dest: '../public/'});

let database;

pool.connect((error, client) => {
  if (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  } else {
    database = client;

    app
        .use(bodyParser.urlencoded({extended: true}))
        .use(cors())
        .get('/groups', (request, response) => {
            response.send("It's Alive!");
        })
        .get('/pomodoro', (request, response) => {
            
        })
        .listen(2727, () => {
          console.log('server started!')
        });
  }
});


