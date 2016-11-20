# Sails GraphQL adapter 

[GraphQL](http://graphql.org/) and [Relay](https://facebook.github.io/relay/) interface for [Sails](http://sailsjs.org/) applications. (IN DEVELOPMENT).

[![Build Status](https://travis-ci.org/arvitaly/sails-graphql-adapter.svg?branch=master)](https://travis-ci.org/arvitaly/sails-graphql-adapter) 
[![npm version](https://badge.fury.io/js/sails-graphql-adapter.svg)](https://badge.fury.io/js/sails-graphql-adapter) 
[![Coverage Status](https://coveralls.io/repos/github/arvitaly/sails-graphql-adapter/badge.svg?branch=master)](https://coveralls.io/github/arvitaly/sails-graphql-adapter?branch=master) 
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)


# Install

## Automatic install by sails hook

You can use sails-hook-graphql for automatic binding this adapter. More info about config https://github.com/arvitaly/sails-hook-graphql#configure

    npm install sails-hook-graphql --save

## Manual install

You can use `generate` and `controller`

    npm install sails-graphql-adapter --save

    //Generate GraphQL schema
    const generate = require("sails-graphql-adapter").generate;
    const schema = generate(sails);
    //Controller for graphql queries
    const Controller = require("sails-graphql-adapter").controller;
    const controller = Controller({schema: schema}); // {index:(req, res)=>void}

    //example manual binding
    // config/routes.js
    {
        "/graphql" : "GraphQLController:index"
    }
    // api/controllers/GraphQLController.js
    module.export = controller;

# Documentation

## Queries

For every model generated 3 query object:

1. Single model, like `user(where:{id:1}){ name }`

2. Connection for list of model, like `users(where:{nameContains:"Jo"}){ edges{ node{id, firstName }} }`

3. Count, like `countUsers(where:{birthdayGreaterThan:"Fri Nov 18 2016 17:39:43 GMT+0700 (SE Asia Standard Time)"}){ count }` // Not implemented now

## Mutations

For every model generated mutations:

1. Update mutation with setters, like `updateUsers(where:{heightGreaterThan:150} user:{ setHeight( height: 151) } ){ users{ height } }`

2. Create mutation with submodel creations, like `createUser(id: 1, father : 16, createPet:{name: "Rex"} ){ user{ name } }`

3. Destroy mutation by id, like destroyUserById(id: 15) // Not implemented now

## Subscriptions //TODO

Subscriptions looked like queries


# API

## generate(sails): GraphQLSchema;

Arg `sails` is initialized sails-app. Should be initialized ORM. This may be after hook-event `hook:orm:loaded` or using config/bootstrap.js

GraphQLSchema - native schema from [graphql-js](https://github.com/graphql/graphql-js)

## controller(opts?: {schema?: GraphQLSchema;  sails? }) : {index: (req, res, next)=>void };

Controller generate method for request and ready for using as sails-controller.

You can create it with schema or sails (like in `generate`).

Controller use native [express-graphql adapter](https://github.com/graphql/express-graphql).

# Tests

    npm install    
    npm test
    
# TODO

- [ ] Args for find https://github.com/arvitaly/sails-graphql-adapter/issues/1
    - [ ] Tests
- [ ] Queries
    - [x] Single query
        - [x] Tests
    - [ ] Connection query
        - [ ] Tests    
- [ ] Node object
    - [ ] Tests
- [ ] Mutations
    - [x] Update
         - [ ] Tests
    - [x] Create
        - [x] Submodel recursively create
            - [ ] Tests
        - [ ] Tests
    - [ ] DestroyById
        - [ ] Tests        
- [ ] Subscriptions
    - [ ] Tests
- [ ] Documentation