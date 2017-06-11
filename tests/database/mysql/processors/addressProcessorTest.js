var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var customerProcessor = require("../../../../database/mysql/processors/customerProcessor");
var addressProcessor = require("../../../../database/mysql/processors/addressProcessor");
var cusId1;
var clientId = "3842";
var addressId;
describe('AddressProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_customer_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    customerProcessor.init(crud);
                    addressProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });


    describe('#addCustomer()', function () {
        it('should add a customer in addressProcessor', function (done) {
            var d = new Date();
            var json = {
                firstName: "rod",
                lastName: "Johnson",
                company: "big data",
                primaryPhone: "1254567890",
                secondPhone: "",
                emailAddress: "bob5@bob.com",
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
                emailAddress: "bob5@bob.com",
                clientId: clientId
            };
            setTimeout(function () {
                addressProcessor.addAddress(null, json, function (result) {
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
        it('should fail to add a customer address in addressProcessor because of bad email', function (done) {
            var d = new Date();
            var json = {
                address1: "125 river rd",
                address2: "",
                city: "big valley",
                state: "CA",
                zip: "12345",
                zipExt: "1234",
                country: "USA",
                emailAddress: "bob6@bob.com",
                clientId: clientId
            };
            setTimeout(function () {
                addressProcessor.addAddress(null, json, function (result) {
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
    
    
    describe('#addCustomerAddress()', function () {
        it('should add a customer address in addressProcessor', function (done) {
            var d = new Date();
            var json = {
                address1: "126 river rd",
                address2: "",
                city: "big valley",
                state: "CA",
                zip: "12345",
                zipExt: "1234",
                country: "USA",
                emailAddress: "bob5@bob.com",
                clientId: clientId
            };
            setTimeout(function () {
                addressProcessor.addAddress(null, json, function (result) {
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
                address1: "128 river rd",
                address2: "",
                city: "big valley",
                state: "CA",
                zip: "12345",
                zipExt: "1234",
                country: "USA",
                emailAddress: "bob5@bob.com",
                clientId: clientId
            };
            setTimeout(function () {
                addressProcessor.addAddress(null, json, function (result) {
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
                id: addressId,
                emailAddress: cusId1
            };
            setTimeout(function () {
                addressProcessor.updateAddress(null, json, function (result) {
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
                addressProcessor.getAddress(addressId, cusId1, function (result) {
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
                addressProcessor.getAddressListByCustomer(cusId1, clientId, function ( result) {
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
                addressProcessor.deleteAddress(null, addressId, cusId1, function (result) {
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
    
    describe('#deleteAddressByCustomer()', function () {
        it('should delete Customer address by customer', function (done) {
            setTimeout(function () {
                addressProcessor.deleteAddressByCustomer(null, cusId1, clientId, function (result) {
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

});

