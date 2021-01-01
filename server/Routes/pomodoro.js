export default function pomodoroRoutes(app, secureRoute, database) {

    // Get Pomodoros Completed of User
    app.get('/api/pomodoro', secureRoute, (request, response) => {
        const userId = request.user.id;

        try {
            database.query(
                `
                    SELECT * FROM "pomodoros"
                    WHERE "user_id" = $1; 
                `, [userId],
                (error, results) => {
                  if (error) {
                    console.log(`ERROR: ${error}`);
                  } else {
                    response.json({ pomodoros: results.rows });
                  }
                }
              );
        } catch (error) {
            console.log(error);
        }
    });

    // Record Completed Pomodoro
    app.post('/api/pomodoro', secureRoute, (request, response) => {
        const userId = request.user.id;

        try {
            database.query(
                `
                    INSERT INTO "pomodoros"(user_id)
                        VALUES($1)
                    RETURNING *;    
                `, [userId],
                (error, results) => {
                  if (error) {
                    console.log(`ERROR: ${error}`);
                  } else {
                    response.json({ message: 'Sucessfully Uploaded Pomodoro' });
                  }
                }
              );
        } catch (error) {
            console.log(error);
        }
    });
}