export default function getBadgeById(badgeId, database, callback) {
    try {
        database.query(
            `
                SELECT * FROM "badges"
                WHERE "badge_id" = $1;
            `, [badgeId],
            (error, results) => {
                if (error) {
                    console.log(`ERROR: ${error}`);
                } else {
                    callback(results.rows[0]);
                }
            }
          );
    } catch (error) {
        console.log(error);
    }
}