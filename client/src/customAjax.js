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

    get = (url, token) => {
        this.xhr.open('GET', url, true);

        this.xhr.setRequestHeader('authorization', `bearer ${token}`);

        this.xhr.send();
    }

    post = (url, data, json) => {
        this.xhr.open('POST', url, true);
        
        if (json) {
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            
            data = JSON.stringify(data);
        }

        this.xhr.send(data) 
    }

    put = (url, data, json) => {
        this.xhr.open('PUT', url, true);
        
        if (json) {
            this.xhr.setRequestHeader('Content-Type', 'application/json');
            
            data = JSON.stringify(data);
        }

        this.xhr.send(data)
    }
} 