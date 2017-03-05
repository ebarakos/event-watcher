var config = {};

config.mail = {};
config.contract = {};
config.startingBlock = "latest"
config.startingBlock = 3297021
config.events = ["LogReturned", "LogRented"]
config.mail.service = "Yandex"
config.mail.user = "test.slock.it"
config.mail.pass = "slockit1"
config.mail.to = "e.mparakos@gmail.com" //comma separated for multiple recipients
config.mail.from = config.mail.user + "@yandex.com"
config.rpcHost = "http://localhost:8545"
config.contract.address = "0x5c66d6305ebec1980f94b852c03fd752fba9a1ae"
config.contract.abi =
    [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_poleID",
                "type": "bytes32"
            },
            {
                "name": "_wattPower",
                "type": "uint256"
            },
            {
                "name": "_secondsToRent",
                "type": "uint256"
            }
        ],
        "name": "start",
        "outputs": [],
        "payable": true,
        "type": "function"
    },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_poleID",
                    "type": "bytes32"
                },
                {
                    "name": "measuredWatt",
                    "type": "uint256"
                }
            ],
            "name": "stop",
            "outputs": [],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_id",
                    "type": "bytes32"
                },
                {
                    "name": "_deviceOwner",
                    "type": "address"
                },
                {
                    "name": "_meterProvider",
                    "type": "address"
                },
                {
                    "name": "_maxWattPower",
                    "type": "uint256"
                },
                {
                    "name": "_maxRentingTime",
                    "type": "uint256"
                },
                {
                    "name": "_priceProvider",
                    "type": "uint256"
                }
            ],
            "name": "setUpChargingPole",
            "outputs": [],
            "payable": false,
            "type": "function"
        },
        {
            "inputs": [],
            "payable": false,
            "type": "constructor"
        },
        {
            "payable": false,
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "poleID",
                    "type": "bytes32"
                }
            ],
            "name": "LogPoleSetUp",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "poleID",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "controller",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wattPower",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "hoursToRent",
                    "type": "uint256"
                }
            ],
            "name": "LogRented",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "poleID",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "chargeAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "elapsedSeconds",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "watt",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "contractType",
                    "type": "uint8"
                }
            ],
            "name": "LogReturned",
            "type": "event"
        }
    ]

module.exports = config;