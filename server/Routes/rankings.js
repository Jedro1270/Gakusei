import badgeAchievement from '../Helper Functions/badgeAchievement.js';

export default function rankingsRoutes(app, secureRoute, database) {

    // Get Team Members of Group
    app.get('/api/rankings/:groupId', secureRoute, (request, response) => {
        const userId = request.user.id;
        const groupId = request.params.groupId;

        database
            .query(
                `
                    SELECT 
                        DISTINCT ON (username) username,
                        user_id,
                        level_id,
                        points 
                    FROM "users"
                        INNER JOIN "level_achievements"
                            USING (user_id)
                        INNER JOIN "group_memberships"
                            USING (user_id)
                    WHERE "group_id" = $1
                        ORDER BY
                            "username" ASC,
                            "level_id" DESC;
                `, [groupId]
            )
            .then((results) => {
                const rankedMembers = results.rows.sort((firstMember, secondMember) => {
                    return secondMember.points - firstMember.points;
                })

                const topMemberId = rankedMembers[0].user_id;

                if (topMemberId === userId) {
                    const badgeId = 5;

                    badgeAchievement(userId, badgeId, database, (badgeTitle) => {
                        response.json({ members: results.rows, badgeTitle: badgeTitle });
                    });
                } else {
                    response.json({ members: results.rows, badgeTitle: '' });
                }
            })
            .catch((error) => {
                console.log(`ERROR: ${error}`);
            })
    });
}