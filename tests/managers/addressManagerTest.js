var assert = require('assert');
var db = require("../../database/db");
var addressManager = require("../../managers/addressManager");
var cusId1;
var cusId2;
var clientId = "65858";
var addressId;
describe('Address Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_customer_service", 5);
            setTimeout(function () {
                addressManager.init(db);
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


    
    describe('#addCustomerAddress()', function () {
        it('should add a customer address in manager', function (done) {
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
                addressManager.addAddress(json, function (result) {
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
        it('should add a customer address in manager', function (done) {
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
                addressManager.addAddress(json, function (result) {
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
        it('should add a customer address in manager', function (done) {
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
                addressManager.addAddress(json, function (result) {
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
        it('should update a customer address in manager', function (done) {            
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
                addressManager.updateAddress(json, function (result) {
                    console.log("update address results: " + JSON.stringify(result));
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
        it('should get address in manager', function (done) {
            setTimeout(function () {
                addressManager.getAddress(addressId, function (result) {
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
    
    
    
    describe('#getAddressListByCustomer()', function () {
        it('should get address list in manager', function (done) {
            setTimeout(function () {
                addressManager.getAddressListByCustomer(cusId1, clientId, function ( result) {
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
        it('should delete Customer address in manager', function (done) {
            setTimeout(function () {
                addressManager.deleteAddress(addressId, function (result) {
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
       
 /*    
    describe('#deleteAddressByCustomer()', function () {
        it('should delete Customer address by customer in manager', function (done) {
            setTimeout(function () {
                addressManager.deleteAddressByCustomer(cusId1, clientId, function (result) {
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
    

});



