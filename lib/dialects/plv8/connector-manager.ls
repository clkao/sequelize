Postgres = require '../postgres/connector-manager'

class PLV8 extends Posgres
    ->
        console.log \constructor

    query: (sql, callee, options) ->
        console.log \query

    connect: ->
        console.log \toconncet

module.exports = PLV8
