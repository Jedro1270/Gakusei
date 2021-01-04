export default function rankingsRoutes(app, secureRoute, database) {

    // Get Team Members of Group
    app.get('/api/rankings/:groupId', secureRoute, (request, response) => {
        const groupId = request.params.groupId;

        try {
            database.query(
                `
                    SELECT * FROM "users"
                        INNER JOIN "level_achievements"
                            USING (user_id)
                        INNER JOIN "group_memberships"
                            USING (user_id)
                    WHERE "group_id" = $1
                        ORDER BY
                            "points" DESC;
                `, [groupId],
                (error, results) => {
                  if (error) {
                    console.log(`ERROR: ${error}`);
                  } else {
                    response.json({ members: results.rows });
                  }
                }
              );
        } catch (error) {
            console.log(error);
        }
    });
}