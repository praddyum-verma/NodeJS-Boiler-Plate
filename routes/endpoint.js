var help = require('../lib/help')
var cards = require('../metadata/cards')
var db = require('../lib/db')

var customernewssearch = {};

customernewssearch.handler = (body, res, callback) => {        
    
    var query= 'select * from dcf.activity_task_mod_master';
    //DB connection
    console.log("In Custome")
    db.createConn(query, function (err, result) {
        if (!err) {
            console.log(result)            
            callback(200,result,res)                                   
        } else {
            callback(500,{},res)
        }
      });

};

module.exports = customernewssearch;
