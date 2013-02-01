Postgres = require '../postgres/connector-manager'

class PLV8 extends Postgres
    ->
        console.log \constructor

    query: (sql, callee, options) ->
        Query = require("./query")
        query = new Query(null, @sequelize, callee, options || {})
        console.log \query sql
        query.on \success -> console.log \WTF it
        setTimeout -> query.run sql
        query

    connect: ->
        console.log \toconncet

module.exports = PLV8
