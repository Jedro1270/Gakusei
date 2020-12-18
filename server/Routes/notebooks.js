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

    // Get All Notes of Notebook
    app.get('/api/notebooks/:groupId/:notebookId', secureRoute, (request, response) => {
        const notebookId = request.params.notebookId;

        try {
            database.query(
                `
                SELECT * FROM "notes";
                    WHERE "notebook_id" = $1
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

    // Update Note Contents
    app.put('/api/notebooks/:groupId/:notebookId/:noteId', secureRoute, (request, response) => {
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