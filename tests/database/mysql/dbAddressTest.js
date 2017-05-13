var assert = require('assert');
var db = require("../../../database/mysql/db");
var cusId1;
var cusId2;
var clientId = "55842";
var addressId;

describe('mysql DB address', function () {
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


    
    describe('#addCustomer()', function () {
        it('should add a customer in db', function (done) {
            var d = new Date();
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bobby60@bob.com",
                dateEntered: d,
                clientId: clientId
            };
            setTimeout(function () {
                db.addCustomer(json, function (result) {
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

    
    describe('#addCustomerAddress()', function () {
        it('should add a customer address in addressProcessor', function (done) {
            var d = new Date();
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
            var d = new Date();
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
            var d = new Date();
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
    
    describe('#updateCustomerAddress()', function () {
        it('should update a customer address in addressProcessor', function (done) {
            var d = new Date();
            var json = {
                address1: "Peachtree st",
                address2: "",
                city: "atlanta",
                state: "GA",
                zip: "12345",
                zipExt: "1234",
                country: "USA",
                id: addressId
            };
            setTimeout(function () {
                db.updateAddress(json, function (result) {
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

    
    describe('#getAddress()', function () {
        it('should get address in processor', function (done) {
            setTimeout(function () {
                db.getAddress(addressId, function (result) {
                    if (result && result.address1 === "Peachtree st" && result.city === "atlanta") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    
    describe('#getAddressByCustomer()', function () {
        it('should get address list in processor', function (done) {
            setTimeout(function () {
                db.getAddressListByCustomer(cusId1, clientId, function ( result) {
                    console.log("address list: " + JSON.stringify(result));
                    if (result && result.length > 0) {
                        if (result[0].address1 === "Peachtree st" && result[0].city === "atlanta") {
                            assert(true);
                        } else {
                            assert(false);
                        }
                    }else{
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#deleteAddress()', function () {
        it('should delete Customer address', function (done) {
            setTimeout(function () {
                db.deleteAddress(addressId, function (result) {
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
                db.updateCustomerEmail(json, function (result) {                    
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
                db.updateCustomerEmail(json, function (result) {                    
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
                db.updateCustomerEmail(json, function (result) {                    
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
    
    
    describe('#deleteCustomer()', function () {
        it('should delete Customer', function (done) {
            setTimeout(function () {
                db.deleteCustomer(cusId2, clientId, function (result) {
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

