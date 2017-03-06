var express = require("express")
var Web3 = require("web3");
var nodemailer = require("nodemailer");
var config = require('./config-alt');

var app = express()
app.get("/", function (req, res) {
    res.send("Event notification server is open!")
})

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.rpcHost));
var transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
            user: config.mail.user, 
            pass: config.mail.pass
        }
    });

var MyContract = web3.eth.contract(config.contract.abi);
var myContractInstance = MyContract.at(config.contract.address);
var availableEventNames = config.contract.abi.filter(function (r) {return r.type = "event"}).map(function(r) {return r.name;});

var eventCallback = function(error, result) {
    console.log(result)
    var data = JSON.stringify(result.args, null, "\n").slice(1, -1)
    var mailOptions = {
        from: config.mail.from,
        to: config.mail.to,
        subject: "Event: " + result.event,
        text: data
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + info.response);
        }
    });
}

var eventFilter = [{some: 'args'}, {fromBlock: config.startingBlock}, eventCallback]

var server = app.listen(3002, function () {
    if (web3.isConnected()){
        for (var i = 0, len = config.events.length; i < len; i++) {
            if(availableEventNames.includes(config.events[i])) {
                console.log("Watching event: " + config.events[i])
                eval("myContractInstance." + config.events[i]).apply(this, eventFilter);
            } else {
                console.log("Event: " + config.events[i] + " is not included in contract's events")
            }
        }
    } else {
        console.log("Cannot connect to RPC")
        server.close();
    }
})

