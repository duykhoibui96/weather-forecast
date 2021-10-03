import { isEmpty } from 'lodash'
import { stringify } from 'querystring'

export default class RestClient {
    constructor({ baseUrl = '' } = {}) {
        this._baseUrl = `http://localhost:8080/${baseUrl}`
    }

    get(url, {
        queryOpts = {}
    } = {}) {
        if (queryOpts && !isEmpty(queryOpts)) {
            url = `${url}?${stringify(queryOpts)}`
        }

        return this._request(url, {
            method: 'GET'
        })
    }

    async _request(url, opts = {}) {
        const fullUrl = `${this._baseUrl}/${url}`
        const {method, body} = opts
        const requestOpts = {
            method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (body) {
            requestOpts.body = JSON.stringify(body)
        }

        const response = await fetch(fullUrl, requestOpts);
        return response.json()
    }
}