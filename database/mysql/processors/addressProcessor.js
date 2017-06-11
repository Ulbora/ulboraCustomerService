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

//client operations---------------------------------------
var addressQueries = require("../queries/addressQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addAddress = function (con, json, callback) {
    var args = {
        address1: json.address1,
        address2: json.address2,
        city: json.city,
        state: json.state,
        zip: json.zip,
        zip_ext: json.zipExt,
        country: json.country,
        customer_email_address: json.emailAddress,
        customer_client_id: json.clientId
    };
    console.log("add address in processor: " + JSON.stringify(json));
    crud.insert(con, addressQueries.ADDRESS_INSERT_QUERY, args, function (result) {
        console.log("address add: " + JSON.stringify(result));
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.updateAddress = function (con, json, callback) {
    var args = [
        json.address1,
        json.address2,
        json.city,
        json.state,
        json.zip,
        json.zipExt,
        json.country,
        json.id,
        json.emailAddress
    ];
    crud.update(con, addressQueries.ADDRESS_UPDATE_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.getAddress = function (id, emailAddress, callback) {
    var queryId = [
        id,
        emailAddress
    ];
    crud.get(addressQueries.ADDRESS_GET_BY_ID_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                address1: result.data[0].address1,
                address2: result.data[0].address2,
                city: result.data[0].city,
                state: result.data[0].state,
                zip: result.data[0].zip,
                zipExt: result.data[0].zip_ext,
                country: result.data[0].country,
                emailAddress: result.data[0].customer_email_address,
                clientId: result.data[0].customer_client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};

exports.getAddressListByCustomer = function (email, clientId, callback) {
    var queryId = [email, clientId];
    crud.get(addressQueries.ADDRESS_LIST_BY_CUSTOMER_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    address1: result.data[cnt].address1,
                    address2: result.data[cnt].address2,
                    city: result.data[cnt].city,
                    state: result.data[cnt].state,
                    zip: result.data[cnt].zip,
                    zipExt: result.data[cnt].zip_ext,
                    country: result.data[cnt].country,
                    emailAddress: result.data[cnt].customer_email_address,
                    clientId: result.data[cnt].customer_client_id
                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};

exports.deleteAddress = function (con, id, emailAddress, callback) {
    var queryId = [
        id,        
        emailAddress
    ];
    crud.delete(con, addressQueries.ADDRESS_DELETE_QUERY, queryId, callback);
};


exports.deleteAddressByCustomer = function (con, email, clientId, callback) {
    var queryId = [email, clientId];
    crud.delete(con, addressQueries.ADDRESS_DELETE_BY_CUSTOMER_QUERY, queryId, callback);
};