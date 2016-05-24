# Build
1. `npm install`
2. `gulp js`

# Run
1. Rename `.env_sample` -> `.env`.
2. Edit .env to contain your Host Key, API key, and Email.
3. In command line run `node server.js`.
4. Load `index.html` in your browser.

# Building Your Own Backend
This repository serves as the front end for all of our 3rd party integrations.
It is intended to be backend agnostic with the intention of making it as easy as
possible to port it to new backends.  If you would like to build a custom backend
just follow these steps:

1. Implement RestProxyCallback()
```
    /*
     * A callback for cf-util-http to proxy all calls to our backend
     *
     * @param {Object} [opts]
     * @param {String} [opts.method] - GET/POST/PUT/PATCH/DELETE
     * @param {String} [opts.url]
     * @param {Object} [opts.parameters]
     * @param {Object} [opts.headers]
     * @param {Object} [opts.body]
     * @param {Function} [opts.onSuccess]
     * @param {Function} [opts.onError]
     */
     function RestProxyCallback(opts) {}
```
This method is called on every request before it is sent. It should route all
absolute URLs to the endpoint for your backend. Requests with
relative URLs for things like localization (./lang/*.js) and
config (./config.js) should remain unchanged.

2. Build your backend data store
Your backend needs to store the following information about each user:
    * CloudFlare [Client V4 API](https://api.cloudflare.com/) Key
    * CloudFlare Client V4 API Email
    * CloudFlare [Host API](https://www.cloudflare.com/docs/host-api.html) Key

3. In `index.html` create a variable in local storage called `cfEmail` which contains
CloudFlare Client V4 API Email of the current user.

4. Build an API Client for the CloudFlare V4 API which adds the necessary headers
to each request.

5. Build an API Client for the CloudFlare Host API which adds the Host Key to all requests.
