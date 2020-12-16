import CustomAjax from "../../../CustomAjax";

export default function verifyToken(token, history) {
    const ajax = new CustomAjax();

    ajax.get('http://localhost:2727/api', token);
    ajax.stateListener((response) => {
        response = JSON.parse(response);

        if (response.message === 'Invalid User') {
            history.push('/');
        }
    });

}