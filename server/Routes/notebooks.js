export default function notebooksRoutes(app, secureRoute, database) {
    // Notebooks
    app.get('/api/notebooks', secureRoute, (request, response) => {
        try {
            database.query( // Select all from selected group only
                `
                SELECT * FROM "notebooks";
                `,
                (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {

                        response.json({ notebooks: results.rows });
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/api/notebooks', (request, response) => {
        try {
            console.log(request.user, 'from notebook')
            database.query(
                `
                INSERT INTO "notebooks"(group_id, notebook_name)
                    VALUES(1, '${request.body.notebookName}')
                    RETURNING *;
                `,
                (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        response.json({ notebooks: results.rows });
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    });

    // Notes
    app.get('/api/notebooks/notes', secureRoute, (request, response) => {
        try {
            database.query(
                `
                SELECT * FROM "notes";
                `,
                (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        response.json({ notes: results.rows });
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    });

    app.post('/api/notebooks/notes', (request, response) => {
        try {
            database.query(
                `
            INSERT INTO "notes"(notebook_id, note_title, note_content, date_edited)
                VALUES(${request.body.notebookID}, '${request.body.noteName}', '', '${new Date().toLocaleString()}')
                RETURNING *;
            `,
                (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        response.json({ notes: results.rows });
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    });

    app.put('/api/notebooks/notes/note-contents', (request, response) => {
        try {
            database.query(
                `
            UPDATE "notes" 
            SET 
                "note_content" = '${request.body.contents}',
                "date_edited" = '${new Date().toLocaleString()}'
            WHERE "note_id" = ${request.body.noteID}
            RETURNING *;
            `,
                (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        response.json({ note: results.rows[0] });
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    });
}