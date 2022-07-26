var express = require('express');
var router = express.Router();
var endpoint = require('./endpoint')


const callback = function(statusCode,data,res){
            if(statusCode && data){

                res.setHeader('Access-Control-Allow-Origin','*')
                res.setHeader('Access-Control-Allow-Methods','*')
                res.setHeader('Content-type','application/json')
                res.writeHead(statusCode)
                res.end(JSON.stringify(data))
            }   
            
        }

router.post('/test', function(req, res, next){
        endpoint.handler(req.body,res,callback)
})

router.get('/ping',function(req,res,next){        
        callback(200,{},res)
})

module.exports = router;