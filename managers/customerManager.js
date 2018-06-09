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

var manager = require("./manager");

var db;

exports.init = function (database) {
    db = database;
};


exports.addCustomer = function (json, callback) {
    var returnVal = {
        success: false,
        emailAddress: null,
        clientId: null,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        json.dateEntered = new Date();
        db.addCustomer(json, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                returnVal.emailAddress = result.emailAddress;
                returnVal.clientId = result.clientId;
                callback(returnVal);
            } else {
                callback(returnVal);
            }
        });
    } else {
        callback(returnVal);
    }
};


exports.updateCustomer = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        console.log("updateCustomer req in manager: " + JSON.stringify(json));
        if (json.firstName !== undefined && json.firstName !== null &&
                json.lastName !== undefined && json.lastName !== null &&
                json.company !== undefined && json.company !== null &&
                json.primaryPhone !== undefined && json.primaryPhone !== null &&
                json.secondPhone !== undefined && json.secondPhone !== null &&
                json.emailAddress !== undefined && json.emailAddress !== null &&
                json.clientId !== undefined && json.clientId !== null) {
            json.dateModified = new Date();
            db.updateCustomer(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    callback(returnVal);
                } else {
                    returnVal.message = "Error updating customer";
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




exports.updateCustomerEmail = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        console.log("updateCustomerEmail req in manager: " + JSON.stringify(json));
        if (json.newEmailAddress !== undefined && json.newEmailAddress !== null &&
                json.emailAddress !== undefined && json.emailAddress !== null &&
                json.clientId !== undefined && json.clientId !== null) {
            json.dateModified = new Date();
            db.updateCustomerEmail(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    returnVal.emailAddress = json.newEmailAddress;
                    returnVal.clientId = json.clientId;
                    callback(returnVal);
                } else {
                    returnVal.message = "Error updating customer";
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



exports.getCustomer = function (email, clientId, callback) {
    var emailOk = manager.securityCheck(email);
    var clientIdOk = manager.securityCheck(clientId);
    if (emailOk && clientIdOk) {
        db.getCustomer(email, clientId, function (result) {
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

exports.getCustomerList = function (callback) {
    db.getCustomerList(callback);
};


exports.getCustomerListByClientId = function (clientId, callback) {    
    var clientIdOk = manager.securityCheck(clientId);
    if (clientIdOk) {
        db.getCustomerListByClientId(clientId, function (result) {
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


exports.deleteCustomer = function (email, clientId, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var emailOk = manager.securityCheck(email);
    var clientIdOk = manager.securityCheck(clientId);
    if (emailOk && clientIdOk) {
        db.deleteCustomer(email, clientId, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                callback(returnVal);
            } else {
                returnVal.message = "Error deleting customer";
                callback(returnVal);
            }
        }
        );
    } else {
        callback({});
    }
};
