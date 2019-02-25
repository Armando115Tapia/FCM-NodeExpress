/*var express=require('express'),
    fs = require('fs'),
    path=require('path');
 */
//var formidable = require('formidable');

//var FCM = require('fcm-node');
var serverKey="AAAA9NlbMFc:APA91bEZeh9qxhkQLkHkpmWu0_eoLQgtHWYCZ_neUVmKI8zVVqTjqTi8_w8-EXoOgkt2xE_wK0EULiZz12HTo1ajfOioy5I-7KPFKv99Em3_0mZabvh1QJsbCkYxBMqd0Qjp3wAMpD9Z"; 
//You will find this in your firebase console
//var fcm = new FCM(serverKey);

//To get server key Select your project > Click the Gear icon(Settings) > Move to 'Cloud Messaging' tab .
//Under Project credentials your will get your so called long 'Server Key'
 
var fcm = require('fcm-notification');
    var token = "eH1KXVCbdW4:APA91bFwMAl03JfrFFfVJ3v05wEKHqJxA_MkEYKegfB2LZaA6AEs5cUT7w_duwEMEjfhdrBNvy8YP0P-BTV-e-5f7xgGCi4FTGdjiKgH5Mhn2sde1GoWvvdEdiUS5Y2UHZXBq8c7Go97";
    var FCM = new fcm('./limpizimo-4755e-firebase-adminsdk-itco5-8a0e83e7b1.json');


module.exports=function(app){
 
 //PRIMERA OPCION USANDO
 //https://www.npmjs.com/package/fcm-node
    app.get('/sendFcmNotification',function (req,res){
    var data=req.body;
    var message="Hola!!, push notification send from express";
    var title="Limpizimo";
    var token="fpyGWldaOeQ:APA91bF4AdueiScPY1oCjMWeaUBvO6SLM8Zl-A-ADNYxyGfmxcohvZlEQrHk_7NTTuRiD1KgT1Ae3WzHTt_5gm7WfVyf47Oj86DWn_UtotqC9J77T2OAUhoGunQ8mNDT78Ki4Y_0N7k5";
    var message = { 
        to: token, 
        notification: {
            title: title, //title of notification 
            body: message, //content of the notification
            sound: "default",
            icon: "ic_launcher" //default notification icon
        },
        data: data //payload you want to send with your notification
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Notification not sent");
            res.json({success:false})
        } else {
            console.log("Successfully sent with response: ", response);
            res.json({success:true})
        }
    });
 
  });

//SEGUNDA OPCION
//USADO: https://www.npmjs.com/package/fcm-notification
app.get('/fcm-notification', function(req,res){
    var message = {
        data: {    //This is only optional, you can send any data
            score: '850',
            time: '2:45'
        },
        notification:{
            title : 'Limpizimo',
            body : 'Tu servicio a sido confirmado, la empleada llegara',
            
        },
        token : token
        };
 
     FCM.send(message, function(err, response) {
    if(err){
        console.log('error found', err);
        res.json({success:false})
    }else {
        console.log('response here', response);
        res.json({success:true})
    }
})

});



}