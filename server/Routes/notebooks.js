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
                    VALUES(1, $1)
                    RETURNING *;
                `, [request.body.notebookName],
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
                VALUES($1, $2, '', $3)
                RETURNING *;
            `, [request.body.notebookID, request.body.noteName, new Date().toLocaleString()],
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
                "note_content" = $1,
                "date_edited" = $2
            WHERE "note_id" = $3
            RETURNING *;
            `, [request.body.contents, new Date().toLocaleString(), request.body.noteID],
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