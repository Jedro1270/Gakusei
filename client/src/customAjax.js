export default class CustomAjax {

    constructor() {
        this.xhr = new XMLHttpRequest();
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

    #requestBody = (url, data, json, token, method) => {
        this.xhr.open(method, url, true);

        this.xhr.setRequestHeader('authorization', `bearer ${token}`);
        
        if (json) {
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            
            data = JSON.stringify(data);
        }

        if (data) {
            this.xhr.send(data);
        } else {
            this.xhr.send();
        }
    }

    get = (url, token) => {
        this.#requestBody(url, null, null, token, 'GET');
    }

    post = (url, data, json, token) => {
        this.#requestBody(url, data, json, token, 'POST');
    }

    put = (url, data, json, token) => {
        this.#requestBody(url, data, json, token, 'PUT');
    }

    delete = (url, token) => {
        this.#requestBody(url, null, null, token, 'DELETE');
    }
} 