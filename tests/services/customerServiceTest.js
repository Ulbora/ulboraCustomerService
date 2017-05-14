var assert = require('assert');
var db = require("../../database/db");
var customerService = require("../../services/customerService");
var tokenFile = require("./token");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var cusId1;
var clientId = "645456";
describe('customerService', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_customer_service", 5);
            setTimeout(function () {
                customerService.init(db);
                done();
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a customer', function (done) {
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
                    firstName: "rod",
                    lastName: "Johnson",
                    company: "big data",
                    primaryPhone: "1254567890",
                    secondPhone: "",
                    emailAddress: "bobby50@bob.com",
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
                    } else if (val && val.emailAddress) {
                        cusId1 = val.emailAddress;
                        console.log("add customer reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                customerService.add(req, res);
            }, 1000);
        });
    });


    describe('#updateCustomer()', function () {
        it('should update a customer', function (done) {
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
                    firstName: "ken",
                    lastName: "williamson",
                    company: "big big data",
                    primaryPhone: "1254567890",
                    secondPhone: "4454454444",
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
                    } else if (val && val.success) {
                        console.log("update customer reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                customerService.update(req, res);
            }, 1000);
        });
    });


    describe('#get()', function () {
        it('should get a customer', function (done) {
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
                req.params.email = cusId1;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.firstName === "ken" && val.lastName === "williamson") {
                        console.log("get customer reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                customerService.get(req, res);
            }, 1000);
        });
    });



    describe('#list()', function () {
        it('should get a list of customers', function (done) {
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
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    console.log("get customer list reaponse: " + JSON.stringify(val));
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val.length > 0 && val[0].firstName === "ken") {
                        console.log("get customer list reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                customerService.list(req, res);
            }, 1000);
        });
    });

   
    describe('#listByClientId()', function () {
        it('should list customers by clientId', function (done) {
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
                    } else if (val && val.length === 1 && val[0].firstName === "ken") {                        
                        console.log("list customers By ClientId reaponse: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                customerService.listByClientId(req, res);
            }, 1000);
        });
    });

   
    describe('#delete()', function () {
        it('should delete a customer', function (done) {
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
                req.params.email = cusId1;
                req.params.clientId = clientId;
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
                        console.log("delete customer reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                customerService.delete(req, res);
            }, 1000);
        });
    });

});


