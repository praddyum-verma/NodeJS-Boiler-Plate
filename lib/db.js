const { Pool } = require('pg');
var db = {}

const az_identity = require('@azure/identity');
const az_kv = require('@azure/keyvault-secrets');
const credential = new az_identity.DefaultAzureCredential();
const client = new az_kv.SecretClient('link-to-keyvault',credential)

var dcf_dbuser=''
var dcf_dbhost=''
var dcf_dbname=''
var dcf_dbpass=''

var result=[]

async function retrieve_data() {

    dcf_dbuser=await client.getSecret('dcf-dbuser')
    dcf_dbhost=await client.getSecret('dcf-dbhost')
    dcf_dbname=await client.getSecret('dcf-dbname')
    dcf_dbpass=await client.getSecret('dcf-dbpass')

    dcf_dbuser=dcf_dbuser.value
    dcf_dbpass=dcf_dbpass.value
    dcf_dbhost=dcf_dbhost.value
    dcf_dbname=dcf_dbname.value    
    
}

db.createConn = (query,callback)=>{  

    retrieve_data().then(()=>{
        
        const pool = new Pool({ 
            user: dcf_dbuser,
            host: dcf_dbhost,
            database: dcf_dbname,
            password: dcf_dbpass,                
            port: 5432,
            ssl:true    
        });

        if(typeof(pool)=='object'){
            console.log(pool)
            pool.connect((err, client, done) => {
                if (err) throw err;
                client.query(query, (err, res) => {
                    done();
                    if (err) {            
                        callback(500,{'Err':'Couldnot create connection'})
                    } else {
                        for (let row of res.rows) {
                            result.push(row)
                        }
                        callback(false,result)
                        }
                    });
                })
        }                    
    })

}

module.exports = db;