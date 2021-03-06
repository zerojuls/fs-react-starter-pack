![fs-react-starter-pack](https://cloud.githubusercontent.com/assets/10958238/19007584/a5839d9e-875d-11e6-9629-38f468fca30f.jpg)

# FS React Starter Pack

### React boilerplate (React, Webpack, React Bootstrap)

[![Build Status](https://travis-ci.org/fullstackforger/fs-react-starter-pack.svg?branch=master)](https://travis-ci.org/fullstackforger/fs-react-starter-pack)
[![GitHub issues open](https://img.shields.io/github/issues/fullstackforger/fs-react-starter-pack.svg?maxAge=2592000)](https://github.com/fullstackforger/fs-react-starter-pack/issues?q=is%3Aissue+is%3Aopen) 
[![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/fullstackforger/fs-react-starter-pack.svg?maxAge=2592000)](https://github.com/fullstackforger/fs-react-starter-pack/issues?q=is%3Aissue+is%3Aclosed)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ff404c431141498d88306b538dc7e44e)](https://www.codacy.com/app/fullstackforger/fs-react-starter-pack?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fullstackforger/fs-react-starter-pack&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/fullstackforger/fs-react-starter-pack/badge.svg?branch=master)](https://coveralls.io/github/fullstackforger/fs-react-starter-pack?branch=master)
[![Code Climate](https://codeclimate.com/github/fullstackforger/fs-react-starter-pack/badges/gpa.svg)](https://codeclimate.com/github/fullstackforger/fs-react-starter-pack)  
[![dependencies Status](https://david-dm.org/fullstackforger/fs-react-starter-pack/status.svg)](https://david-dm.org/fullstackforger/fs-react-starter-pack)
[![devDependencies Status](https://david-dm.org/fullstackforger/fs-react-starter-pack/dev-status.svg)](https://david-dm.org/fullstackforger/fs-react-starter-pack?type=dev)
[![peerDependencies Status](https://david-dm.org/fullstackforger/fs-react-starter-pack/peer-status.svg)](https://david-dm.org/fullstackforger/fs-react-starter-pack?type=peer)
[![license](https://img.shields.io/github/license/fullstackforger/fs-react-starter-pack.svg)]()

> **Work in progress. Contributions are welcomed!**


## Setup instruction

### Client

```
npm install && npm start
```

### API Server

> **side note:** It is demo server wit API endpoints you need for the starter.  
> In the future API will be moved to external package such us [hapilizer](https://github.com/fullstackforger/hapilizer)

Install dependencies and start API server (from another terminal)
```
cd server && npm install && node start
```

## Barebones

### Routing with [react-router][react-router] 

Router is configured using [configuration object][react-router-conf] passed to `Router` component.

### Authentication with [react-jwt-auth-redux][react-jwt-auth-redux] 

Authentication is delivered with [react-jwt-auth][react-jwt-auth] for authentication
and [react-jwt-auth-redux][react-jwt-auth-redux] for Redux bindings.

Users can register and login using email and password or sign in with social account.  

### Isomorphic checks with [enverse][enverse]

[Enverse][enverse] is super simple library with tiny footprint for environment checks.

## Sources

### Great packages

Here is the list of great react packages that inspired me to start this project.

* [joshgeller/react-redux-jwt-auth-example](https://github.com/joshgeller/react-redux-jwt-auth-example)
* [mjrussell/redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper)
* [sahat/satellizer](https://github.com/sahat/satellizer)
* [lynndylanhurley/redux-auth](https://github.com/lynndylanhurley/redux-auth)
* [jedireza/aqua](https://github.com/jedireza/aqua)
* [jedireza/frame](https://github.com/jedireza/frame)
* [mxstbr/react-boilerplate](https://github.com/mxstbr/react-boilerplate)

### List of react starting projects

If you don't like this starter pack or have different requirement for you project you should check out following sites:

* [andrewhfarmer.com/starter-project](http://andrewhfarmer.com/starter-project)
* [habd.as/awesome-react-boilerplates](https://habd.as/awesome-react-boilerplates)
* react-hot-loader usage [examples](https://github.com/gaearon/react-hot-loader/tree/master/docs) 

<!-- references --> 

[enverse]: https://github.com/fullstackforger/enverse
[redux]: http://redux.js.org/
[react-jwt-auth]: https://github.com/fullstackforger/react-jwt-auth
[react-jwt-auth-redux]: https://github.com/fullstackforger/react-jwt-auth-redux
[react-router]: https://github.com/reactjs/react-router/blob/v2.8.0/
[react-router-conf]: https://github.com/reactjs/react-router/blob/v2.8.0/docs/guides/RouteConfiguration.md#configuration-with-plain-routes