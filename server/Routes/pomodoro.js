export default function pomodoroRoutes(app, secureRoute, database) {
    app.get('/api/pomodoro', secureRoute, (request, response) => {
        try {

        } catch (error) {
            console.log(error);
        }
    });
}