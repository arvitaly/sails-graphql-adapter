# Sails GraphQL adapter [![Build Status](https://travis-ci.org/arvitaly/sails-graphql-adapter.svg?branch=master)](https://travis-ci.org/arvitaly/sails-graphql-adapter)

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
    module.exports = Controller;

# Usage

    //TODO

# Tests

    npm install    
    npm test