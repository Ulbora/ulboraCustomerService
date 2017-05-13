var assert = require('assert');
var db = require("../../database/db");
var customerManager = require("../../managers/customerManager");
var cusId1;
var cusId2;
var clientId = "555842";
var addressId;
describe('User Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_customer_service", 5);
            setTimeout(function () {
                customerManager.init(db);                
                done();
            }, 1000);
        });
    });
        
    
    
    describe('#addCustomer()', function () {
        it('should add a customer in manager', function (done) {            
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bobby50@bob.com",                
                clientId: clientId
            };
            setTimeout(function () {
                customerManager.addCustomer(json, function (result) {
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
        it('should add a customer in manager', function (done) {            
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bobby60@bob.com",                
                clientId: clientId
            };
            setTimeout(function () {
                customerManager.addCustomer(json, function (result) {
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
        it('should update customer in manager', function (done) {            
            var json = {
                firstName: "ken",
                lastName: "williamson",
                company: "big big data",
                primaryPhone: "1254567890",
                secondPhone: "4454454444",                
                emailAddress: cusId1,
                clientId: clientId
            };
            setTimeout(function () {
                customerManager.updateCustomer(json, function (result) {
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
                customerManager.getCustomer(cusId1, clientId, function (result) {
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
                customerManager.getCustomerList(function (result) {
                    console.log("customer list: " + JSON.stringify(result));
                    if (result && result.length > 0 && result[0].lastName === "williamson" && result[0].firstName === "ken") {
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
                customerManager.getCustomerListByClientId(clientId, function (result) {
                    console.log("customer list: " + JSON.stringify(result));
                    if (result && result.length > 0 && result[0].lastName === "williamson" && result[0].firstName === "ken") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    

    
    describe('#addCustomerAddress()', function () {
        it('should add a customer address in addressProcessor', function (done) {            
            var json = {
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
            setTimeout(function () {
                db.addAddress(json, function (result) {
                    if (result.success) {
                        addressId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    
    
    
    describe('#addCustomerAddress()', function () {
        it('should add a customer address in addressProcessor', function (done) {            
            var json = {
                address1: "1245 river rd",
                address2: "",
                city: "big valley",
                state: "CA",
                zip: "12345",
                zipExt: "1234",
                country: "USA",
                emailAddress: cusId1,
                clientId: clientId
            };
            setTimeout(function () {
                db.addAddress(json, function (result) {
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
    
    
    describe('#addCustomerAddress()', function () {
        it('should add a customer address in addressProcessor', function (done) {            
            var json = {
                address1: "1246 river rd",
                address2: "",
                city: "big valley",
                state: "CA",
                zip: "12345",
                zipExt: "1234",
                country: "USA",
                emailAddress: cusId1,
                clientId: clientId
            };
            setTimeout(function () {
                db.addAddress(json, function (result) {
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
        it('should fail to update customer email in db because of duplicate', function (done) {
            var d = new Date();
            var json = {   
                newEmailAddress: "bobby60@bob.com",
                dateModified: d,
                emailAddress: cusId1,
                clientId: clientId
            };
            setTimeout(function () {
                customerManager.updateCustomerEmail(json, function (result) {                    
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
        it('should update customer email in db with no addresses', function (done) {
            var d = new Date();
            var json = {   
                newEmailAddress: "bobby600@bob.com",
                dateModified: d,
                emailAddress: cusId2,
                clientId: clientId
            };
            setTimeout(function () {
                customerManager.updateCustomerEmail(json, function (result) {                    
                    if (result.success) { 
                        cusId2 = json.newEmailAddress;
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
        it('should update customer email in db with no addresses', function (done) {
            var d = new Date();
            var json = {   
                newEmailAddress: "bobby500@bob.com",
                dateModified: d,
                emailAddress: cusId1,
                clientId: clientId
            };
            setTimeout(function () {
                customerManager.updateCustomerEmail(json, function (result) {                    
                    if (result.success) { 
                        cusId1 = json.newEmailAddress;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    
  /*   
    describe('#deleteAddressByCustomer()', function () {
        it('should delete Customer address by customer', function (done) {
            setTimeout(function () {
                db.deleteAddressByCustomer(cusId1, clientId, function (result) {
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
*/
    
    describe('#deleteCustomer()', function () {
        it('should delete Customer', function (done) {
            setTimeout(function () {
                customerManager.deleteCustomer(cusId1, clientId, function (result) {
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
                customerManager.deleteCustomer(cusId2, clientId, function (result) {
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



