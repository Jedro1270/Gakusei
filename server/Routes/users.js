import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default function usersRoutes(app, secureRoute, upload, database, passport) {

    // Sign In Locally
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
              points: user.points,
              level: user.level_id,
              levelPointsMax: user.maximum_points,
              levelPointsMin: user.minimum_points
            }

            const token = jwt.sign({ user: body }, process.env.TOKEN_SECRET);

            response.json({
              message: 'Successfully Authenticated',
              token: token,
              user: body
            });
          });
        }
      })(request, response, next);
    });

    // Sign Up
    app.post('/sign-up', async (request, response) => {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);

      database
        .query(
          `
            INSERT INTO "users"(username, password, points)
              VALUES($1, $2, 0)
              ON CONFLICT (username) DO NOTHING
            RETURNING *;
          `, [request.body.username, hashedPassword]
        )
        .then((results) => {

          if (results.rows.length === 0) {
            console.log('Username taken');
            response.json({ message: 'Username Taken' });
          } else {
            const user = results.rows[0];

            database
              .query(
                `
                  INSERT INTO "level_achievements"(user_id, level_id)
                    VALUES($1, $2)
                  RETURNING *;
                `,
                [user.user_id, 1]
              )
              .then((results) => {
                console.log('User inserted');
                response.json({ message: 'User Inserted' });
              })
              .catch((error) => {
                console.log(`ERROR: ${error}`);
              })

          }
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
    });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/redirect', passport.authenticate('google'), (request, response) => {
      response.redirect('http://localhost:3000/api/groups');
    });

    app.get('/auth/facebook', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/facebook', passport.authenticate('google'), (request, response) => {
      response.redirect('http://localhost:3000/api/groups');
    });

    // Get User Details
    app.get('/api/users', secureRoute, (request, response) => {
      const userId = request.user.id;
  
      database
        .query(
          `
            SELECT * FROM "users"
              INNER JOIN "level_achievements" 
                  USING (user_id)
              INNER JOIN "levels"
                  USING (level_id)
            WHERE "user_id" = $1
            ORDER BY "level_id" DESC;
          `, [userId]
        )
        .then((results) => {
          response.json({ user: results.rows[0] });
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
    });

    // Update user profile picture
    app.put('/api/users', secureRoute, upload.single('file'), (request, response) => {
      const userId = request.user.id;
      const profilePicture = request.file.filename;

      database
        .query(
          `
            UPDATE "users"
            SET
                "profile_picture" = $1
            WHERE "user_id" = $2
            RETURNING *;
          `, [profilePicture, userId]
        )
        .then((results) => {
          response.json({ user: results.rows[0] });
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
    });
  }