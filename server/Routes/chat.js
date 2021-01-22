export default function chatRoutes(app, secureRoute, database) {

    // Upload messages
    app.post('/api/chat/:groupId', secureRoute, (request, response) => {
      const userId = request.user.id;
      const groupId = request.params.groupId;
      const message = request.body.message;
      const authorId = message.id === 0 ? userId : message.id;
      const messageContent = message.message;

      let responseMessage = '';


      database
        .query(
          `
            INSERT INTO "messages"(group_id, author_id, message_content)
                VALUES($1, $2, $3)
            RETURNING *;
          `, [groupId, authorId, messageContent]
        )
        .then((results) => {
          responseMessage = 'Successfully Uploaded Messages'
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })

      response.json({ message: responseMessage });
    });

    // Get Previous Messages of Group
    app.get('/api/chat/:groupId', secureRoute, (request, response) => {
      const groupId = request.params.groupId;
      const limit = request.query.limit;


      database
        .query(
          `
            SELECT * FROM "messages" as m
              INNER JOIN "users" as u
                ON m.author_id = u.user_id
            WHERE m.group_id = $1
            ORDER BY "message_id" 
            DESC LIMIT $2;
          `, [groupId, limit]
        )
        .then((results) => {
          response.json({ messages: results.rows });
        })
        .catch((error) => {
          console.log(`ERROR: ${error}`);
        })
    });
  }