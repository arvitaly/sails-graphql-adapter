# Sails GraphQL adapter [![Build Status](https://travis-ci.org/arvitaly/sails-graphql-adapter.svg?branch=master)](https://travis-ci.org/arvitaly/sails-graphql-adapter) [![npm version](https://badge.fury.io/js/sails-graphql-adapter.svg)](https://badge.fury.io/js/sails-graphql-adapter) [![Coverage Status](https://coveralls.io/repos/github/arvitaly/sails-graphql-adapter/badge.svg?branch=master)](https://coveralls.io/github/arvitaly/sails-graphql-adapter?branch=master)

This is lib create graphql api for Sails application.

# Install

    npm install sails-graphql-adapter --save

    //for add generate schema, change bootstrap
    //config/bootstrap.js
    var graphqlBootstrap = require('sails-graphql-adapter/bootstrap');
    module.exports.bootstrap = function (cb) {
        graphqlBootstrap({}, (err)=>{
            if (err){
                cb(err);
                return;
            }
            cb();
        })
    }

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
    var Controller = require('sails-graphql-adapter/controller');
    module.exports = Controller(sails.schema);

# Usage

    //TODO

# Tests

    npm install    
    npm test