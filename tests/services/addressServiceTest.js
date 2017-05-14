var assert = require('assert');
var db = require("../../database/db");
var addressService = require("../../services/addressService");
var tokenFile = require("./token");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var addressId;
var clientId = "544166";
var cusId1;

describe('addressService', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_customer_service", 5);
            setTimeout(function () {
                addressService.init(db);
                done();
            }, 1000);
        });
    });


    describe('#addCustomer()', function () {
        it('should add a customer in db', function (done) {
            var d = new Date();
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bobby50@bob.com",
                dateEntered: d,
                clientId: clientId
            };
            setTimeout(function () {
                db.addCustomer(json, function (result) {
                    if (result.success) {
                        cusId1 = result.emailAddress;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    describe('#add()', function () {
        it('should add a address', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    address1: "125 river rd",
                    address2: "",
                    city: "big valley",
                    state: "CA",
                    zip: "12345",
                    zipExt: "1234",
                    country: "USA",
                    emailAddress: cusId1,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        addressId = val.id;
                        console.log("add address reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                addressService.add(req, res);
            }, 1000);
        });
    });


    describe('#updateAddress()', function () {
        it('should update address', function (done) {
            setTimeout(function () {

                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    address1: "Peachtree st",
                    address2: "",
                    city: "atlanta",
                    state: "GA",
                    zip: "12345",
                    zipExt: "1234",
                    country: "USA",
                    id: addressId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("update address reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                addressService.update(req, res);
            }, 1000);
        });
    });


    describe('#get()', function () {
        it('should get a role', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = addressId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id && val.address1 === "Peachtree st") {
                        console.log("get address reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                addressService.get(req, res);
            }, 1000);
        });
    });



    describe('#addressList()', function () {
        it('should get address list for a customer', function (done) {
            setTimeout(function () {

                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.body = {
                    email: cusId1,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("address list reaponse: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.length === 1) {
                        console.log("address list reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                addressService.list(req, res);
            }, 1000);
        });
    });


    describe('#delete()', function () {
        it('should delete a address', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = addressId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("delete address reaponse: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete address reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                addressService.delete(req, res);
            }, 1000);
        });
    });


    describe('#get()', function () {
        it('should get a role', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                req.params = {};
                req.params.id = addressId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id === undefined) {
                        console.log("get address reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                addressService.get(req, res);
            }, 1000);
        });
    });

    describe('#deleteCustomer()', function () {
        it('should delete Customer', function (done) {
            setTimeout(function () {
                db.deleteCustomer(cusId1, clientId, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


});


