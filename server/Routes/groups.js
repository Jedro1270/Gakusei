export default function groupsRoutes(app, secureRoute, upload, database) {

  // Get All Joined Groups
  app.get('/api/groups', secureRoute, (request, response) => {
    const userId = request.user.id

    database
      .query(
        `
          SELECT * FROM "groups"
            INNER JOIN "group_memberships" as gm
              USING (group_id)
            WHERE gm.user_id = $1
          ORDER BY "group_name" ASC;
        `, [userId]
      )
      .then((results) => {
        response.json({ groups: results.rows });
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
  });

  // Leave Group
  app.delete('/api/groups/:groupId', secureRoute, (request, response) => {
    const groupId = request.params.groupId;
    const userId = request.user.id;

      database
        .query(
          `
            DELETE FROM "group_memberships"
            WHERE 
              "group_id" = $1
                AND
              "user_id" = $2;
          `, [groupId, userId]
        )
        .then((results) => {
          response.json({ message: 'Delete Group Successful' });
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
  });

  // Join Group
  app.post('/api/groups/join-group', secureRoute, (request, response) => {
    const userId = request.user.id;
    const groupId = request.body.groupId;

    database
      .query(
        `
          INSERT INTO "group_memberships"(user_id, group_id)
            VALUES($1, $2)
          RETURNING *;
        `, [userId, groupId]
      )
      .then((results) => {
        if (results.rows.length === 0) {
          console.log('Group Already Joined');
          response.json({ message: 'Group Already Joined' });
        } else {
          response.json({ message: 'Join Group Successful' });
        }
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
  });

  // Search Groups
  app.get('/api/groups/join-group/search', secureRoute, (request, response) => {
    const userId = request.user.id;
    const searchValue = request.query.value;

    database
      .query(
        `
          SELECT * FROM "group_memberships"
            WHERE "user_id" = $1;
        `, [userId]
      )
      .then((results) => {
        if (results.rows.length > 0) {
          const joinedGroupsArray = results.rows.map((group) => {
            return parseInt(group.group_id);
          });

          const joinedGroups = joinedGroupsArray.join(',');

          database
            .query(
              `
                SELECT * FROM "groups"
                  WHERE 
                  "group_id" NOT IN (${joinedGroups})
                    AND
                  "group_name" ILIKE $1;
              `, [`%${searchValue}%`]
            )
            .then((results) => {
              console.log(results.rows)
              response.json({ groups: results.rows });
            })
            .catch((error) => {
              console.log(`ERROR: ${error}`);
            })

        } else {
          database.query(
            `
              SELECT * FROM "groups"
              WHERE "group_name" ILIKE $1;
            `, [`%${searchValue}%`]
          )
          .then((results) => {
            response.json({ groups: results.rows });
          })
          .catch((error) => {
            console.log(`ERROR: ${error}`);
          })
        }
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
  });

  // Create Group
  app.post('/api/groups/create-group', secureRoute, upload.single('file'), (request, response) => {
    const userId = request.user.id;
    const groupname = request.body.groupname;
    const filename = request.file.filename;

    database
      .query(
        `
          INSERT INTO "groups"(group_name, group_picture)
            VALUES($1, $2)
          RETURNING *;
        `, [groupname, filename]
      )
      .then((results) => {
        if (results.rows.length === 0) {
          console.log('ERROR: Data not inserted to database!');
        } else {
          database
            .query(
              `
                INSERT INTO "group_memberships"(user_id, group_id)
                  VALUES(
                    $1, 
                    (SELECT "group_id" FROM "groups"
                      WHERE "group_name" = $2
                    )
                  )
                RETURNING *;
              `, [userId, groupname]
            )
            .then((results) => {
              if (results.rows.length === 0) {
                console.log('ERROR: Data not inserted to database!');
              } else {
                console.log('Group inserted');
                response.json({ message: 'Group Inserted' });
              }
            })
            .catch((error) => {
              console.log(`ERROR: ${error}`);
            })
        }
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
      })
  });
}