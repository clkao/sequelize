var Utils, AbstractQuery, Query;
Utils = require('../../utils');
AbstractQuery = require('../abstract/query');
Query = (function(superclass){
  var onSuccess, prototype = extend$((import$(Query, superclass).displayName = 'Query', Query), superclass).prototype, constructor = Query;
  function Query(client, sequelize, callee, options){
    this.client = client;
    this.sequelize = sequelize;
    this.callee = callee;
    this.options = Utils._.extend({
      logging: console.log,
      plain: false,
      raw: false
    }, options || {});
    this.checkLoggingOption();
  }
  prototype.run = function(sql){
    var receivedError, rows;
    this.sql = sql;
    if (this.options.logging !== false) {
      this.options.logging('Executing: ' + this.sql);
    }
    receivedError = false;
    rows = plv8.execute(sql);
    onSuccess.call(this, rows);
    return this;
  };
  prototype.getInsertIdField = function(){
    return 'id';
  };
  onSuccess = function(rows){
    var results, isTableNameQuery, isRelNameQuery, key;
    results = [];
    isTableNameQuery = this.sql.indexOf('SELECT table_name FROM information_schema.tables') === 0;
    isRelNameQuery = this.sql.indexOf('SELECT relname FROM pg_class WHERE oid IN') === 0;
    if (isTableNameQuery || isRelNameQuery) {
      return this.emit('success', rows.map(function(row){
        return Utils._.values(row);
      }));
    }
    if (this.send('isSelectQuery')) {
      return this.emit('success', this.send('handleSelectQuery', rows));
    } else {
      if (this.send('isShowOrDescribeQuery')) {
        return this.emit('success', results);
      } else {
        if (this.send('isInsertQuery')) {
          for (key in rows[0]) {
            if (rows[0].hasOwnProperty(key)) {
              this.callee[key] = rows[0][key];
            }
          }
          return this.emit('success', this.callee);
        } else {
          if (this.send('isUpdateQuery')) {
            for (key in rows[0]) {
              if (rows[0].hasOwnProperty(key)) {
                this.callee[key] = rows[0][key];
              }
            }
            return this.emit('success', this.callee);
          } else {
            return this.emit('success', results);
          }
        }
      }
    }
  };
  return Query;
}(AbstractQuery));
module.exports = Query;
function extend$(sub, sup){
  function fun(){} fun.prototype = (sub.superclass = sup).prototype;
  (sub.prototype = new fun).constructor = sub;
  if (typeof sup.extended == 'function') sup.extended(sub);
  return sub;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}