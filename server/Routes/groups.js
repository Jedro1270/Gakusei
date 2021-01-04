export default function groupsRoutes(app, secureRoute, upload, database) {

  // Get All Joined Groups
  app.get('/api/groups', secureRoute, (request, response) => {
    const userId = request.user.id

    try {
      database.query(
        `
          SELECT * FROM "groups"
            INNER JOIN "group_memberships" as gm
              USING (group_id)
          WHERE gm.user_id = $1
        `, [userId],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`);
          } else {
            response.json({ groups: results.rows });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  // Leave Group
  app.delete('/api/groups/:groupId', secureRoute, (request, response) => {
    const groupId = request.params.groupId;
    const userId = request.user.id;

    try {
      database.query(
        `
          DELETE FROM "group_memberships"
          WHERE 
            "group_id" = $1
              AND
            "user_id" = $2;
        `, [groupId, userId],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`);
          } else {
              response.json({ message: 'Delete Group Successful' });
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  });

  // Join Group
  app.post('/api/groups/join-group', secureRoute, (request, response) => {
    const userId = request.user.id;
    const groupId = request.body.groupId;

    try {
      database.query(
        `
          INSERT INTO "group_memberships"(user_id, group_id)
            VALUES($1, $2)
          RETURNING *;
        `, [userId, groupId],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`);
          } else {
            
            if (results.rows.length === 0) {
              console.log('Group Already Joined');
              response.json({ message: 'Group Already Joined' });
            } else {
              response.json({ message: 'Join Group Successful' });
            }

          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  });

  // Search Groups
  app.get('/api/groups/join-group/search', secureRoute, (request, response) => {
    const userId = request.user.id;
    const searchValue = request.query.value;

    try {
      database.query(
        `
          SELECT * FROM "group_memberships"
            WHERE "user_id" = $1;
        `, [userId],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`);
          } else {
            if (results.rows.length > 0) {
              const joinedGroupsArray = results.rows.map((group) => {
                return parseInt(group.group_id);
              });
  
              const joinedGroups = joinedGroupsArray.join(',');
  
              database.query(
                `
                  SELECT * FROM "groups"
                    WHERE 
                    "group_id" NOT IN (${joinedGroups})
                      AND
                    "group_name" ILIKE $1;
                `, [`%${searchValue}%`],
                (error, results) => {
                  if (error) {
                    console.log(`ERROR: ${error}`);
                  } else {
                    response.json({ groups: results.rows });
                  }
                }
              );
            } else {
              database.query(
                `
                  SELECT * FROM "groups";
                `,
                (error, results) => {
                  if (error) {
                    console.log(`ERROR: ${error}`);
                  } else {
                    response.json({ groups: results.rows });
                  }
                }
              );
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  // Create Group
  app.post('/api/groups/create-group', secureRoute, upload.single('file'), (request, response) => {
    const userId = request.user.id;
    const groupname = request.body.groupname;
    const filename = request.file.filename;

    try {
      database.query(
        `
          INSERT INTO "groups"(group_name, group_picture)
            VALUES($1, $2)
          RETURNING *;
        `, [groupname, filename],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`);
          } else {
            if (results.rows.length === 0) {
              console.log('ERROR: Data not inserted to database!');
            } else {
              try {
                database.query(
                  `
                    INSERT INTO "group_memberships"(user_id, group_id)
                      VALUES(
                        $1, 
                        (SELECT "group_id" FROM "groups"
                          WHERE "group_name" = $2
                        )
                      )
                    RETURNING *;
                  `, [userId, groupname],
                  (error, results) => {
                    if (error) {
                      console.log(`ERROR: ${error}`);
                    } else {
                      if (results.rows.length === 0) {
                        console.log('ERROR: Data not inserted to database!');
                      } else {

                        console.log('Group inserted');
                        response.json({ message: 'Group Inserted' });
                      }
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
  });
}