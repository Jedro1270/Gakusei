import badgeAchievement from '../Helper Functions/badgeAchievement.js';

export default function pomodoroRoutes(app, secureRoute, database) {

  // Get Pomodoros Completed of User
  app.get('/api/pomodoro', secureRoute, (request, response) => {
    const userId = request.user.id;

    database
      .query(
        `
            SELECT * FROM "pomodoros"
            WHERE "user_id" = $1; 
        `, [userId]
      )
      .then((results) => {
        let badgeId = 0;

        switch(results.rows.length) {
          case 2:
            badgeId = 1;
            break;
          case 8:
            badgeId = 2;
            break;
          case 16:
            badgeId = 3;
            break;
          case 32:
            badgeId = 4;
            break;
        }

        if (badgeId !== 0) {
          badgeAchievement(userId, badgeId, database, (badgeTitle) => {
            response.json({ pomodoros: results.rows, badgeTitle: badgeTitle });
          });
        } else {
          response.json({ pomodoros: results.rows, badgeTitle: '' });
        }
        
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
  });

  // Record Completed Pomodoro
  app.post('/api/pomodoro', secureRoute, (request, response) => {
    const userId = request.user.id;

    database
      .query(
        `
            INSERT INTO "pomodoros"(user_id)
                VALUES($1)
            RETURNING *;    
        `, [userId]
      )
      .then((results) => {
        response.json({ message: 'Sucessfully Uploaded Pomodoro' });
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
  });
}