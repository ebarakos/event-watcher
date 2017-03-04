var express = require("express")
var Web3 = require("web3");
var nodemailer = require("nodemailer");
var config = require('./config');

var app = express()
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.rpc.host));
var transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
            user: config.mail.user, 
            pass: config.mail.pass
        }
    });

app.get("/", function (req, res) {
  res.send("Event notification server is open!")
})

var logRentedTopic = "LogRented(bytes32,address,uint256,uint256)"



var logReturnedTopic = "LogReturned(bytes32,uint256,uint256,uint256,uint8)"



app.listen(3000, function () {

    if (web3.isConnected()){

        console.log("Listening for contract events...")

        var certainBlock = 3273431;

        var filterLogRented = web3.eth.filter({fromBlock:certainBlock, address: config.contract.address, "topics":[web3.sha3(logRentedTopic)]});
        filterLogRented.watch(function(error, result) {
            var logRentedData = "Event: LogRented" 
                + "\nPole ID: " + result.topics[1]
                + "\nController: " + "0x" + result.data.substring(2,66).replace(/^[0]+/g,"")
                + "\nWatt power: "  + parseInt(result.data.substring(66,66+64),16)
                + "\nHours to rent: " + parseInt(result.data.substring(66+64,66+64*2),16)
            // console.log(result);
            console.log("\nData: ");
            console.log(logRentedData);
            console.log("\n\n\n");

            var mailOptions = {
                from: config.mail.from, 
                to: config.mail.to, 
                subject: "New Event: LogRented",
                text: logRentedData
            };

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + info.response);
                }
                });
        })

        var filterLogReturned = web3.eth.filter({fromBlock:certainBlock, address: config.contract.address, "topics":[web3.sha3(logReturnedTopic)]});
        filterLogReturned.watch(function(error, result) {
            var logReturnedData = "Event: LogReturned" 
                + "\nPole ID: " + result.topics[1]
                + "\nCharge amount: " +  parseInt(result.data.substring(2,66),16)
                + "\nElapsed seconds: "  + parseInt(result.data.substring(66,66+64),16)
                + "\nWatt: " + parseInt(result.data.substring(66+64,66+64*2),16)
                + "\nContract type: " + parseInt(result.data.substring(66+64*2,66+64*3),16)
            // console.log(result);
            console.log("\nData: ");
            console.log(logReturnedData);
            console.log("\n\n\n");

            var mailOptions = {
                from: config.mail.from, 
                to: config.mail.to, 
                subject: "New Event: LogReturned",
                text: logReturnedData
            };

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log("Message sent: " + info.response);
                }
                });
        })

    } else {
        console.log("Cannot connect to RPC")
    }

})

