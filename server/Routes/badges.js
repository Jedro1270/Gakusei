export default function badgesRoutes(app, secureRoute, database) {

    // Get Badges of User
    app.get('/api/badges', secureRoute, (request, response) => {
        const userId = request.user.id;

        try {
            database.query(
                `
                    SELECT * FROM "badges" b
                        INNER JOIN "badge_achievements" AS ba
                            USING (badge_id)
                    WHERE ba.user_id = $1
                    ORDER BY b.badge_id ASC;  
                `, [userId],
                (error, results) => {
                  if (error) {
                    console.log(`ERROR: ${error}`);
                  } else {
                    response.json({ badges: results.rows });
                  }
                }
              );
        } catch (error) {
            console.log(error);
        }
    });
}