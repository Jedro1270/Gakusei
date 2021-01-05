export default function levelUpUser(userId, database) {
    try {
        database.query(
            `
                SELECT * FROM "users"
                    INNER JOIN "level_achievements"
                        USING (user_id)
                    WHERE "user_id" = $1
                ORDER BY "level_id" DESC;
            `, [userId],
            (error, results) => {
                if (error) {
                    console.log(`ERROR: ${error}`);
                } else {
                    const user = results.rows[0];
                    const userPoints = user.points;
                    const currentLevelId = user.level_id;
                    const nextLevelId = currentLevelId + 1;

                    try {
                        database.query(
                            `
                                SELECT * FROM "levels"
                                WHERE "level_id" = $1
                            `, [nextLevelId],
                            (error, results) => {
                                if (error) {
                                    console.log(`ERROR: ${error}`);
                                } else {
                                    const nextLevel = results.rows[0];

                                    if (userPoints >= nextLevel.minimum_points) {
                                        try {
                                            database.query(
                                                `
                                                    INSERT INTO "level_achievements"(user_id, level_id)
                                                        VALUES($1, $2)
                                                    RETURNING *;
                                                `, [userId, nextLevelId],
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
                                    }
                                }
                            }
                            );
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            );
    } catch (error) {
        console.log(error);
    }
}