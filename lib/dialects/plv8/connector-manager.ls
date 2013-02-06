Postgres = require '../postgres/connector-manager'

class PLV8 extends Postgres
    ->
        console.log \constructor

    query: (sql, callee, options) ->
        Query = require("./query")
        query = new Query(null, @sequelize, callee, options || {})
        setTimeout (-> query.run sql), 1ms
        query

    connect: ->
        console.log \toconncet

module.exports = PLV8
