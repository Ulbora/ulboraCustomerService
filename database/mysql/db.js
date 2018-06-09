/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var crud = require("./crud/mysqlCrud");
var addressProcessor = require("./processors/addressProcessor");
var customerProcessor = require("./processors/customerProcessor");

exports.connect = function (host, user, pw, db, cpnum) {
    crud.connect(host, user, pw, db, cpnum);
    addressProcessor.init(crud);
    customerProcessor.init(crud);
};
// for testing only
exports.testConnection = function (callback) {
    crud.testConnection(callback);
};

// for testing only
exports.getConnection = function (callback) {
    crud.getConnection(callback);
};


//customer
exports.addCustomer = function (json, callback) {
    customerProcessor.addCustomer(null, json, callback);
};

exports.updateCustomer = function (json, callback) {
    customerProcessor.updateCustomer(null, json, callback);
};

exports.updateCustomerEmail = function (json, callback) {
    // must do in transaction
    //must update any addresss that exist
    var rtn = {
        success: false,
        message: null
    };
    crud.getConnection(function (err, con) {
        if (!err && con) {
            con.beginTransaction(function (err) {
                if (!err) {
                    addressProcessor.getAddressListByCustomer(json.emailAddress, json.clientId,
                            function (oldAddresses) {
                                console.log("Old address found: " + JSON.stringify(oldAddresses));
                                if (oldAddresses && oldAddresses.length > 0) {
                                    addressProcessor.deleteAddressByCustomer(con, json.emailAddress, json.clientId,
                                            function (deleteAddressResult) {
                                                console.log("deleting Old address : " + JSON.stringify(deleteAddressResult));
                                                if (deleteAddressResult.success) {
                                                    for (var cnt = 0; cnt < oldAddresses.length; cnt++) {
                                                        oldAddresses[cnt].emailAddress = json.newEmailAddress;
                                                        delete oldAddresses[cnt].id;
                                                    }
                                                    updateCustEmail(con, json, function (changeEmailResult) {
                                                        if (changeEmailResult.success) {
                                                            console.log("change email address : " + JSON.stringify(changeEmailResult));
                                                            addBackOldAddresses(con, oldAddresses, function (addressUpdated) {
                                                                console.log("add new email address : " + JSON.stringify(addressUpdated));
                                                                if (addressUpdated.success) {
                                                                    con.commit(function (err) {
                                                                        if (err) {
                                                                            con.rollback();
                                                                        } else {
                                                                            rtn.success = true;
                                                                            rtn.clientId = json.clientId;
                                                                            rtn.emailAddress = json.newEmailAddress;
                                                                        }
                                                                        con.release();
                                                                        callback(rtn);
                                                                    });
                                                                } else {
                                                                    con.rollback();
                                                                    con.release();
                                                                    callback(rtn);
                                                                }
                                                            });
                                                        } else {
                                                            con.rollback();
                                                            con.release();
                                                            callback(rtn);
                                                        }
                                                    });
                                                } else {
                                                    con.rollback();
                                                    con.release();
                                                    callback(rtn);
                                                }
                                            });
                                } else {
                                    updateCustEmail(con, json, function (changeEmailResult) {
                                        console.log("update customer email: " + JSON.stringify(changeEmailResult));
                                        if (changeEmailResult.success) {
                                            con.commit(function (err) {
                                                if (err) {
                                                    con.rollback();
                                                } else {
                                                    rtn.success = true;
                                                    rtn.clientId = json.clientId;
                                                    rtn.emailAddress = json.newEmailAddress;
                                                }
                                                con.release();
                                                callback(rtn);
                                            });
                                        } else {
                                            con.rollback();
                                            con.release();
                                            callback(rtn);
                                        }
                                    });
                                }
                            });
                } else {
                    con.release();
                    callback(rtn);
                }
            });
        } else {
            if (con) {
                con.release();
            }
            callback(rtn);
        }
    });
};

var updateCustEmail = function (con, json, callback) {
    customerProcessor.updateCustomerEmail(con, json, callback);
};

var addBackOldAddresses = function (con, addresses, callback) {
    console.log("in addBackOldAddresses");
    console.log("OldAddresses: " + JSON.stringify(addresses));
    var rtn = {
        success: false
    };
    var len = addresses.length;
    var addressesAdded = 0;
    for (var cnt = 0; cnt < addresses.length; cnt++) {
        console.log("in for loop :" + cnt);
        addressProcessor.addAddress(con, addresses[cnt], function (result) {
            console.log("address add back: " + JSON.stringify(result));
            if (result.success) {
                addressesAdded++;
                if (len === addressesAdded) {
                    rtn.success = true;
                    callback(rtn);
                }
            } else {
                callback(rtn);
            }
        });
    }
};


exports.getCustomer = function (email, clientId, callback) {
    customerProcessor.getCustomer(email, clientId, callback);
};

exports.getCustomerList = function (callback) {
    customerProcessor.getCustomerList(callback);
};

exports.getCustomerListByClientId = function (clientId, callback) {
    customerProcessor.getCustomerListByClientId(clientId, callback);
};

exports.deleteCustomer = function (email, clientId, callback) {
    var rtn = {
        success: false,
        message: null
    };
    crud.getConnection(function (err, con) {
        if (!err && con) {
            con.beginTransaction(function (err) {
                if (!err) {
                    addressProcessor.deleteAddressByCustomer(con, email, clientId, function (delRes) {
                        if (delRes.success) {
                            customerProcessor.deleteCustomer(con, email, clientId, function (cusDelRes) {
                                if (cusDelRes.success) {
                                    con.commit(function (err) {
                                        if (err) {
                                            con.rollback();
                                        } else {
                                            rtn.success = true;                                            
                                        }
                                        con.release();
                                        callback(rtn);
                                    });
                                } else {
                                    con.rollback();
                                    con.release();
                                    callback(rtn);
                                }
                            });
                        } else {
                            con.rollback();
                            con.release();
                            callback(rtn);
                        }
                    });
                } else {
                    con.release();
                    callback(rtn);
                }
            });
        } else {
            if (con) {
                con.release();
            }
            callback(rtn);
        }
    });

};

//end user

//address 
exports.addAddress = function (json, callback) {
    addressProcessor.addAddress(null, json, callback);
};

exports.updateAddress = function (json, callback) {
    addressProcessor.updateAddress(null, json, callback);
};

exports.getAddress = function (id, emailAddress, clientId, callback) {
    addressProcessor.getAddress(id, emailAddress, clientId, callback);
};

exports.getAddressListByCustomer = function (email, clientId, callback) {
    addressProcessor.getAddressListByCustomer(email, clientId, callback);
};

exports.deleteAddress = function (id, emailAddress, clientId, callback) {
    addressProcessor.deleteAddress(null, id, emailAddress, clientId, callback);
};

//exports.deleteAddressByCustomer = function (email, clientId, callback) {
    //addressProcessor.deleteAddressByCustomer(null, email, clientId, callback);
//};
