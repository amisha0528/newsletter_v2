const express = require('express');
const bodyParser = require('body-parser');
//const request = require('request');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    
})

app.post('/', function(req, res) {
   const FName =  req.body.Fname ;
   const LName =  req.body.Lname ;
   const EMail =  req.body.Email ;



var data = {
    members : [{email_address : EMail ,
        status : "subscribed",
        merge_fields :{
            FNAME : FName,
            LNAME : LName
        }  
    }
]
};

var jsonData = JSON.stringify(data);
var dc="us21"
 var apikey="9175291e58f691c13aaed1021d734cbb"

const url =  "https://us21.api.mailchimp.com/3.0/lists/08bf4499d5";

const options = {
    method : "POST",
    auth : "amisha:9175291e58f691c13aaed1021d734cbb-us21"
}




const request = https.request(url,options,function(response){


    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname +"/failure.html"); 
    }



    response.on("data",function(data){
        console.log(JSON.parse(data));
    })

})


request.write(jsonData);
request.end();

//    const client = require("@mailchimp/mailchimp_marketing");

//    client.setConfig({
//      apiKey: "9175291e58f691c13aaed1021d734cbb",
//      server: "us21",
//    });
   
//    const run = async () => {
//      const response = await client.lists.createList({
//        name: "mishu",
//        permission_reminder: "permission_reminder",
//        email_type_option: true,
//        contact: {
//          company: "",
//          address1: "",
//          city: "",
//          country: "",
//        },
//        campaign_defaults: {
//          from_name: FName + '  ' + LName,
//          from_email: EMail,
//          subject: "subject",
//          language: "language",
//        },
//      });
//      console.log(response);
//    };
   
//    run();

   



})


app.post("/failure",function(req,res){
    res.redirect("/");
})




app.listen(process.env.PORT,function(req,res) {
    console.log('listening on 3000');
})








// API KEY 
// 9175291e58f691c13aaed1021d734cbb-us21

// audience id
// 08bf4499d5