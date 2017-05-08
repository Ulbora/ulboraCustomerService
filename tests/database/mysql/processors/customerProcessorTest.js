var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var customerProcessor = require("../../../../database/mysql/processors/customerProcessor");
var cusId1;
var cusId2;
var clientId = "3842";
describe('CustomerProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_customer_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    customerProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });


    describe('#addCustomer()', function () {
        it('should add a customer in customerProcessor', function (done) {
            var d = new Date();
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bob@bob.com",  
                dateEntered: d,
                clientId: clientId
            };
            setTimeout(function () {
                customerProcessor.addCustomer(null, json, function (result) {
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
    
    describe('#addCustomer()', function () {
        it('should fail to add a customer in customerProcessor because duplicate', function (done) {
            var d = new Date();
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bob@bob.com",  
                dateEntered: d,
                clientId: clientId
            };
            setTimeout(function () {
                customerProcessor.addCustomer(null, json, function (result) {
                    if (result.success) {
                        cusId1 = result.emailAddress;
                        assert(false);
                    } else {
                        assert(true);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    
    describe('#addCustomer()', function () {
        it('should add a customer in customerProcessor', function (done) {
            var d = new Date();
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bob2@bob.com",  
                dateEntered: d,
                clientId: clientId
            };
            setTimeout(function () {
                customerProcessor.addCustomer(null, json, function (result) {
                    if (result.success) {
                        cusId2 = result.emailAddress;
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
        it('should update customer in processor', function (done) {
            var d = new Date();
            var json = {
                firstName: "ken",
                lastName: "williamson",
                company: "big big data",
                primaryPhone: "1254567890",
                secondPhone: "4454454444",
                dateModified: d,
                emailAddress: "bob@bob.com",
                clientId: clientId
            };
            setTimeout(function () {
                customerProcessor.updateCustomer(null, json, function (result) {
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
    
    
    describe('#updateCustomerEmail()', function () {
        it('should fail to update customer email in processor because of duplicate', function (done) {
            var d = new Date();
            var json = {   
                newEmailAddress: "bob2@bob.com",
                dateModified: d,
                emailAddress: "bob@bob.com",
                clientId: clientId
            };
            setTimeout(function () {
                customerProcessor.updateCustomerEmail(null, json, function (result) {
                    if (result.success) {
                        assert(false);
                    } else {
                        assert(true);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    
    describe('#updateCustomerEmail()', function () {
        it('should update customer email in processor ', function (done) {
            var d = new Date();
            var json = {   
                newEmailAddress: "bob3@bob.com",
                dateModified: d,
                emailAddress: "bob@bob.com",
                clientId: clientId
            };
            setTimeout(function () {
                customerProcessor.updateCustomerEmail(null, json, function (result) {
                    if (result.success) {
                        cusId1 = "bob3@bob.com";
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
        it('should get customer in processor', function (done) {
            setTimeout(function () {
                customerProcessor.getCustomer(cusId1, clientId, function (result) {
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
        it('should get Customer list in processor', function (done) {
            setTimeout(function () {
                customerProcessor.getCustomerList(function (result) {
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
        it('should get Customer list in processor', function (done) {
            setTimeout(function () {
                customerProcessor.getCustomerListByClientId(clientId, function (result) {
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
                customerProcessor.deleteCustomer(null, cusId1, clientId, function (result) {
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

     describe('#deleteCustomer()', function () {
        it('should delete Customer', function (done) {
            setTimeout(function () {
                customerProcessor.deleteCustomer(null, cusId2, clientId, function (result) {
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

