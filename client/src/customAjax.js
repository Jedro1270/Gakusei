export default class customAjax {

    constructor() {
        this.xhr = new XMLHttpRequest();
        this.response = '';
    }

    stateListener = (callback) => {
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === 4) {
                if (this.xhr.status === 200) {
                    callback(this.xhr.response);
                }
            }
        }
    }

    get = (url) => {
        this.xhr.open('GET', url, true);

        this.xhr.send();
    }

    post = (url, data) => {
        this.xhr.open('POST', url, true);
        this.xhr.setRequestHeader('Content-Type', 'application/json');

        const stringData = JSON.stringify(data);

        this.xhr.send(stringData)
    }
} 