var Postgres, PLV8;
Postgres = require('../postgres/connector-manager');
PLV8 = (function(superclass){
  var prototype = extend$((import$(PLV8, superclass).displayName = 'PLV8', PLV8), superclass).prototype, constructor = PLV8;
  function PLV8(){}
  prototype.query = function(sql, callee, options){
    var Query, query;
    Query = require("./query");
    query = new Query(null, this.sequelize, callee, options != null
      ? options
      : {});
    setTimeout(function(){
      return query.run(sql);
    }, 1);
    return query;
  };
  prototype.connect = function(){
    return console.log('toconncet');
  };
  return PLV8;
}(Postgres));
module.exports = PLV8;
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