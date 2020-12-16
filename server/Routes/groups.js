export default function groupsRoutes(app, secureRoute, upload, database) {
  app.get('/api/groups', secureRoute, (request, response) => {
    try {
      database.query( // Select all from user joined groups only
        `
              SELECT * FROM "groups";
            `,
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`)
          } else {
            response.json({ groups: results.rows });
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/groups/join-group/search', (request, response) => {
    try {
      database.query(
        `
          SELECT * FROM "groups"
            WHERE "group_name" ILIKE $1;
        `, [`%${request.body.groupname}%`],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`)
          } else {
            response.json({ groups: results.rows });
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  });

  app.post('/api/groups/create-group', upload.single('file'), (request, response) => {
    try {
      database.query(
        `
          INSERT INTO "groups"(group_name, group_picture)
            VALUES($1, $2)
            RETURNING *;
        `, [request.body.groupname, request.file.filename],
        (error, results) => {
          if (error) {
            console.log(`ERROR: ${error}`)
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
  });
}