var assert = require('assert');
var db = require("../../../database/mysql/db");
var cusId1;

var clientId = "3447";
describe('mysql DB user', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_customer_service", 5);
            db.testConnection(function (success) {
                if (success) {                    
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
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
                emailAddress: "bobby@bob.com",  
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
    
    describe('#updateCustomer()', function () {
        it('should update customer in db', function (done) {
            var d = new Date();
            var json = {
                firstName: "ken",
                lastName: "williamson",
                company: "big big data",
                primaryPhone: "1254567890",
                secondPhone: "4454454444",
                dateModified: d,
                emailAddress: cusId1,
                clientId: clientId
            };
            setTimeout(function () {
                db.updateCustomer(json, function (result) {
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
    
    
    
    describe('#getCustomer()', function () {
        it('should get customer in db', function (done) {
            setTimeout(function () {
                db.getCustomer(cusId1, clientId, function (result) {
                    if (result && result.lastName === "williamson" && result.firstName === "ken") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    
    describe('#getCustomerList()', function () {
        it('should get Customer list in db', function (done) {
            setTimeout(function () {
                db.getCustomerList(function (result) {
                    console.log("customer list: " + JSON.stringify(result));
                    if (result && result.length > 0) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    
    describe('#getCustomerListByClient()', function () {
        it('should get Customer list in db', function (done) {
            setTimeout(function () {
                db.getCustomerListByClientId(clientId, function (result) {
                    console.log("customer list: " + JSON.stringify(result));
                    if (result && result.length > 0) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
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

