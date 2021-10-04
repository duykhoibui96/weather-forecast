import { isEmpty } from 'lodash'
import { stringify } from 'querystring'

export default class RestClient {
    constructor({ baseUrl = '' } = {}) {
        if (baseUrl[baseUrl.length - 1] === '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1)
        }

        this._baseUrl = baseUrl
    }

    get(url, opts) {
        return this._request(url, {
            ...opts,
            method: 'GET'
        })
    }

    post(url, opts) {
        return this._request(url, {
            ...opts,
            method: 'POST'
        })
    }

    put(url, opts) {
        return this._request(url, {
            ...opts,
            method: 'PUT'
        })
    }

    delete(url, opts) {
        return this._request(url, {
            ...opts,
            method: 'DELETE'
        })
    }

    async _request(url = '', opts = {}) {
        let fullUrl = `${this._baseUrl}/${url[0] === '/' ? url.substring(1) : url}`
        const {method, body, qs} = opts

        if (!isEmpty(qs)) {
            fullUrl = `${fullUrl}?${stringify(qs)}`
        }

        const requestOpts = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (body) {
            requestOpts.body = JSON.stringify(body)
        }

        const response = await fetch(fullUrl, requestOpts);
        if (!response.ok) {
            throw new Error({
                status: response.status,
                statusText: response.statusText
            })
        }

        return response.json()
    }
}