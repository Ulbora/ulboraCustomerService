/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
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

var manager = require("./manager");

var db;

exports.init = function (database) {
    db = database;
};


exports.addAddress = function (json, callback) {
    var returnVal = {
        success: false,
        id: null,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        db.addAddress(json, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                returnVal.id = result.id;
                callback(returnVal);
            } else {
                callback(returnVal);
            }
        });
    } else {
        callback(returnVal);
    }
};


exports.updateAddress = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        console.log("update address req in manager: " + JSON.stringify(json));
        if (json.address1 !== undefined && json.address1 !== null && 
                json.address2 !== undefined && json.address2 !== null && 
                json.city !== undefined && json.city !== null  &&
                json.state !== undefined && json.state !== null &&
                json.zip !== undefined && json.zip !== null &&
                json.zipExt !== undefined && json.zipExt !== null && 
                json.country !== undefined && json.country !== null &&
                json.id !== undefined && json.id !== null) {            
            db.updateAddress(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    callback(returnVal);
                } else {
                    returnVal.message = "Error updating address";
                    callback(returnVal);
                }
            });
        } else {
            returnVal.message = "Missing parameters";
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};

exports.getAddress = function (id, callback) {
    var isOk = manager.securityCheck(id);
    if (isOk) {
        db.getAddress(id, function (result) {
            if (result) {
                callback(result);
            } else {
                callback({});
            }
        });
    } else {
        callback({});
    }
};


exports.getAddressListByCustomer = function (email, clientId, callback) {
    var emailOk = manager.securityCheck(email);
    var clientIdOk = manager.securityCheck(clientId);
    if (emailOk && clientIdOk) {
        db.getAddressListByCustomer(email, clientId, function (result) {
            if (result) {
                callback(result);
            } else {
                callback([]);
            }
        });
    } else {
        callback({});
    }
};



exports.deleteAddress = function (id, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(id);
    if (isOk) {
        db.deleteAddress(id, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                callback(returnVal);
            } else {
                returnVal.message = "Error deleting address";
                callback(returnVal);
            }
        });
    } else {
        callback(returnVal);
    }
};


/*
exports.deleteAddressByCustomer = function (email, clientId, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var emailOk = manager.securityCheck(email);
    var clientIdOk = manager.securityCheck(clientId);
    if (emailOk && clientIdOk) {
        db.deleteAddressByCustomer(email, clientId, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                callback(returnVal);
            } else {
                returnVal.message = "Error deleting address";
                callback(returnVal);
            }
        }
        );
    } else {
        callback({});
    }
};

*/
