export default function groupsRoutes(app, secureRoute, upload, database) {
  app.get('/api/groups', secureRoute, (request, response) => {

    // TO DO:
    //   Select Group
    //   Leave Group

    try {
      database.query(
        `
          SELECT * FROM "groups"
            INNER JOIN "group_memberships" as gm
              USING (group_id)
          WHERE gm.user_id = $1
        `, [request.user.id],
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

  app.post('/api/groups/join-group', secureRoute, (request, response) => {
    try {
      database.query(
        `
          INSERT INTO "group_memberships"(user_id, group_id)
            VALUES($1, $2)
          RETURNING *;
        `, [request.body.userId, request.body.groupId],
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

  app.post('/api/groups/join-group/search', secureRoute, (request, response) => {
    try {
      database.query(
        `
          SELECT * FROM "groups" as g
            INNER JOIN "group_memberships" as gm
              USING (group_id)
          WHERE 
            g.group_name ILIKE $1
              AND
            gm.user_id != $2
        `, [`%${request.body.groupname}%`, request.body.userId],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`);
          } else {
            response.json({ groups: results.rows });
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/groups/create-group', secureRoute, upload.single('file'), (request, response) => {
    try {
      database.query(
        `
          INSERT INTO "groups"(group_name, group_picture)
            VALUES($1, $2)
          RETURNING *;
        `, [request.body.groupname, request.file.filename],
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
                  `, [request.user.id, request.body.groupname],
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