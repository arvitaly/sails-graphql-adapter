# Sails GraphQL adapter 

This is lib create graphql api for Sails application. (In depelopment)

[![Build Status](https://travis-ci.org/arvitaly/sails-graphql-adapter.svg?branch=master)](https://travis-ci.org/arvitaly/sails-graphql-adapter) 
[![npm version](https://badge.fury.io/js/sails-graphql-adapter.svg)](https://badge.fury.io/js/sails-graphql-adapter) 
[![Coverage Status](https://coveralls.io/repos/github/arvitaly/sails-graphql-adapter/badge.svg?branch=master)](https://coveralls.io/github/arvitaly/sails-graphql-adapter?branch=master) 
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)



# Install

    npm install sails-graphql-adapter --save

    //add route for graphql queries
    //config/routes.js
    module.exports.routes = {
        ///...
        'GET /graphql': 'GraphQLController',
        ///...
    }

    //add controller
    sails generate controller GraphQL

    //api/controllers/GraphQLController.js
    module.exports = require('sails-graphql-adapter').controller()

# Usage

    //TODO create documentation

# Tests

    npm install    
    npm test
    
# Todo

- [ ] Node object
- [ ] Queries
    - [ ] Args
        - [ ] Useful args
    - [ ] Relay connection
    - [ ] Populate
- [ ] Mutations
    - [ ] Update
        - [ ] Submodel create
    - [ ] Create
        - [ ] Submodel create
    - [ ] Remove
    
- [ ] Subscriptions
- [ ] Documentation