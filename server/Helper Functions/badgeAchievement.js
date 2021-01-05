import getBadgeById from "./getBadgeById.js";
import increaseUserPoints from "./increaseUserPoints.js";

export default function badgeAchievement(userId, badgeId, database, callback) {
    getBadgeById(badgeId, database, (badge) => {
        try {
            database.query(
                `
                    SELECT * FROM "badge_achievements"
                    WHERE
                        "user_id" = $1
                            AND
                        "badge_id" = $2;
                `, [userId, badgeId],
                (error, results) => {
                    if (error) {
                        console.log(`ERROR: ${error}`);
                    } else {
                        if (results.rows.length === 0) {
                            try {
                                database.query(
                                    `
                                        INSERT INTO "badge_achievements"(user_id, badge_id)
                                            VALUES($1, $2)
                                        RETURNING *;
                                    `, [userId, badgeId],
                                    (error, results) => {
                                        if (error) {
                                            console.log(`ERROR: ${error}`);
                                        } else {
                                            if (results.rows.length === 0) {
                                                callback('');
                                            } else {
                                                callback(badge.badge_name);
                                                increaseUserPoints(userId, badgeId, database);
                                            }
                                        }
                                    }
                                  );
                            } catch (error) {
                                console.log(error);
                            }
                        } else {
                            callback('');
                        }
                    }
                }
              );
        } catch (error) {
            console.log(error);
        }
    });
}