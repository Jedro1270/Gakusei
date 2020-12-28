export default function notebooksRoutes(app, secureRoute, database) {

    // Get All Notebooks of Group
    app.get('/api/notebooks/:groupId', secureRoute, (request, response) => {
        const groupId = request.params.groupId;

        try {
            database.query(
                `
                SELECT * FROM "notebooks"
                    WHERE "group_id" = $1;
                `, [groupId],
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

    // Create New Notebook for Group
    app.post('/api/notebooks/:groupId', secureRoute, (request, response) => {
        const groupId = request.params.groupId;
        const notebookName = request.body.notebookName;

        try {
            database.query(
                `
                INSERT INTO "notebooks"(group_id, notebook_name)
                    VALUES($1, $2)
                RETURNING *;
                `, [groupId, notebookName],
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

    // Update Notebook Title
    app.put('/api/notebooks/:groupId/:notebookId', secureRoute, (request, response) => {
        const notebookId = request.params.notebookId;
        const title = request.body.title;

        try {
            database.query(
                `
                UPDATE "notebooks" 
                SET 
                    "notebook_name" = $1
                WHERE "notebook_id" = $2
                RETURNING *;
                `, [title, notebookId],
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

    // Delete Notebook
    app.delete('/api/notebooks/:groupId/:notebookId', secureRoute, (request, response) => {
        const notebookId = request.params.notebookId;

        try {
            database.query(
                `
                DELETE FROM "notes"
                    WHERE "notebook_id" = $1
                RETURNING *;
                `, [notebookId],
                (error, results) => {
                    if (error) {
                        console.log(error)
                    } else {
                        database.query(
                            `
                            DELETE FROM "notebooks"
                                WHERE "notebook_id" = $1
                            RETURNING *;
                            `, [notebookId],
                            (error, results) => {
                                if (error) {
                                    console.log(error)
                                } else {
                                    response.json({ note: results.rows[0] });
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
    });

    // Get All Notes of Notebook
    app.get('/api/notebooks/:groupId/:notebookId', secureRoute, (request, response) => {
        const notebookId = request.params.notebookId;

        try {
            database.query(
                `
                SELECT 
                    "note_title",
                    "note_content",
                    "notebook_id",
                    "note_id",
                    TO_CHAR(
                    "date_edited", 'MON-DD-YYYY HH12:MIPM'
                    ) AS date_edited
                FROM "notes"
                WHERE "notebook_id" = $1;
                `, [notebookId],
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

    // Create New Note for Notebook
    app.post('/api/notebooks/:groupId/:notebookId', secureRoute, (request, response) => {
        const notebookId = request.params.notebookId;
        const noteTitle = request.body.noteName;
        const date = new Date().toLocaleString();

        try {
            database.query(
                `
                INSERT INTO "notes"(notebook_id, note_title, note_content, date_edited)
                    VALUES($1, $2, '', $3)
                RETURNING *;
                `, [notebookId, noteTitle, date],
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

    // Get Specific Note
    app.get('/api/notebooks/:groupId/:notebookId/:noteId', secureRoute, (request, response) => {
        const noteId = request.params.noteId;

        try {
            database.query(
                `
                SELECT * FROM "notes"
                    WHERE "note_id" = $1;
                `, [noteId],
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

    // Update Note Title
    app.put('/api/notebooks/:groupId/:notebookId/:noteId', secureRoute, (request, response) => {
        const noteId = request.params.noteId;
        const title = request.body.title;

        try {
            database.query(
                `
                UPDATE "notes" 
                SET 
                    "note_title" = $1
                WHERE "note_id" = $2
                RETURNING *;
                `, [title, noteId],
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

     // Delete Note
     app.delete('/api/notebooks/:groupId/:notebookId/:noteId', secureRoute, (request, response) => {
        const noteId = request.params.noteId;

        try {
            database.query(
                `
                DELETE FROM "notes" 
                    WHERE "note_id" = $1
                RETURNING *;
                `, [noteId],
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

    // Update Note Contents
    app.put('/api/notebooks/:groupId/:notebookId/:noteId/contents', secureRoute, (request, response) => {
        const noteId = request.params.noteId;
        const contents = request.body.contents;
        const date = new Date().toLocaleString();

        try {
            database.query(
                `
                UPDATE "notes" 
                SET 
                    "note_content" = $1,
                    "date_edited" = $2
                WHERE "note_id" = $3
                RETURNING *;
                `, [contents, date, noteId],
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