var _       = require('lodash');
var helpers = require('./helpers');
var orm     = require('orm');

module.exports = {
list   : list_account,
create : creat_account,
get    : get_account
}
function creat_account(req, res, next) {
    var params = _.pick(req.body, 'account', 'password','email');
    req.models.users.find({or:[ {account: params.account},{email: params.email}]}, function (err, users) {
        if (err) throw err;
        console.log("Find users num: %s",users.length);
        if (users.length>0) {
            console.log("account exists already.")
            return res.end("exist");
        }
        req.models.users.create(params, function (err, users) {
          if(err) {
                console.log("Create user error: "+ err);
                if(Array.isArray(err)) {
                  return res.end({ errors: helpers.formatErrors(err) });
                } else {
                  return next(err);
                }
          }
          console.log("Create user success: "+ params);
          return res.end('success');
        });
    });
}
function list_account(req, res, next) {
/*
    req.models.users.find().limit(4).order('account').all(function (err, users) {
      if (err) return next(err);

      var items = users.map(function (m) {
        return m.serialize();
      });

      res.send({ items: items });
    });
*/
      res.send("bad!");
}
function get_account(req, res, next) {

}
