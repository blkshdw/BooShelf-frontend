import 'isomorphic-fetch';
import { TYPE_JSON, TYPE_PLAIN } from 'constants/Common';

export default class Request {

    constructor({ path, type = 'GET', query = {}, headers = {}, body }) {
        this.path = path;
        this.type = type;
        this.query = query;
        this.headers = headers;
        this.body = body;
    }

    setPath(path) {
        this.path += path;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setQuery(query) {
        this.query = query && query;
        return this;
    }

    setHeaders(data) {
        if (data instanceof FormData) return this;

        Object.assign(this.headers, { 'Content-type': TYPE_JSON });
        return this;
    }

    setBody(data) {
        if (data instanceof FormData) this.body = data;
        else this.body = data && JSON.stringify(data);
        return this;
    }

    queryToString() {
        const str = JSON.stringify(this.query);
        return this.query ? `?query=${str}` : '';
    }

    fetch() {
        return new Promise((resolve, reject) => {
            fetch(this.path + this.queryToString(), {
                method: this.type,
                body: this.body,
                headers: this.headers,
                credentials: 'include',
                mode: 'cors'
            })
                .then(response => {
                    if (response.status === 200 || response.status === 201) {
                        const acceptedType = this.headers.Accept;
                        switch (acceptedType) {
                            case TYPE_PLAIN:
                                response.text().then(resolve);
                                break;
                            default:
                                response.json().then(resolve);
                        }
                    } else {
                        response.json().then(error => reject(error.message));
                    }
                })
                .catch(error => reject(error.message));
        });
    }
}

