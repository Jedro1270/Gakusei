import getBadgeById from "./getBadgeById.js";
import levelUpUser from "./levelUpUser.js";

export default function increaseUserPoints(userId, badgeId, database) {
    getBadgeById(badgeId, database, (badge) => {
        const pointsIncrease = badge.points_value;
        
        try {
            database.query(
                `
                    UPDATE "users"
                        SET "points" = "points" + $1
                    WHERE "user_id" = $2;
                `, [pointsIncrease, userId],
                (error, results) => {
                    if (error) {
                        console.log(`ERROR: ${error}`);
                    } else {
                        levelUpUser(userId, database);
                    }
                }
              );
        } catch (error) {
            console.log(error);
        }
    });
}