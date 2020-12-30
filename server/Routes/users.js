export default function usersRoutes(app, secureRoute, upload, database) {

    // Update user profile picture
    app.put('/api/users', secureRoute, upload.single('file'), (request, response) => {
      const userId = request.user.id;
      const profilePicture = request.file.filename;
  
      try {
        database.query(
          `
            UPDATE "users"
            SET
                "profile_picture" = $1
            WHERE "user_id" = $2
            RETURNING *;
          `, [profilePicture, userId],
          (error, results) => {
            if (error) {
              console.log(`ERROR: ${error}`);
            } else {
              response.json({ user: results.rows[0] });
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    });
  }