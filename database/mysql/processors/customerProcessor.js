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

//client operations---------------------------------------
var customerQueries = require("../queries/customerQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addCustomer = function (con, json, callback) {
    var args = {
        first_name: json.firstName,
        last_name: json.lastName,
        company: json.company,
        primary_phone: json.primaryPhone,
        second_phone: json.secondPhone,
        email_address: json.emailAddress,
        date_entered: json.dateEntered,
        client_id: json.clientId
    };
    crud.insertNoId(con, customerQueries.CUSTOMER_INSERT_QUERY, args, function (result) {
        var rtn = {
            emailAddress: json.emailAddress,
            clientId: json.clientId,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};

exports.updateCustomer = function (con, json, callback) {
    var args = [
        json.firstName,
        json.lastName,
        json.company,
        json.primaryPhone,
        json.secondPhone,
        json.dateModified,
        json.emailAddress,
        json.clientId
    ];
    crud.update(con, customerQueries.CUSTOMER_UPDATE_QUERY, args, callback);
};

exports.updateCustomerEmail = function (con, json, callback) {
    var args = [
        json.newEmailAddress,
        json.dateModified,
        json.emailAddress,
        json.clientId
    ];
    crud.update(con, customerQueries.CUSTOMER_UPDATE_EMAIL_QUERY, args, callback);
};



exports.getCustomer = function (email, clientId, callback) {
    var queryId = [email, clientId];
    crud.get(customerQueries.CUSTOMER_GET_BY_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                firstName: result.data[0].first_name,
                lastName: result.data[0].last_name,
                company: result.data[0].company,
                primaryPhone: result.data[0].primary_phone,
                secondPhone: result.data[0].second_phone,
                dateEntered: result.data[0].date_entered,
                dateModified: result.data[0].date_modified,
                emailAddress: result.data[0].email_address,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};

exports.getCustomerList = function (callback) {
    crud.getList(customerQueries.CUSTOMER_LIST_QUERY, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    firstName: result.data[cnt].first_name,
                    lastName: result.data[cnt].last_name,
                    company: result.data[cnt].company,
                    primaryPhone: result.data[cnt].primary_phone,
                    secondPhone: result.data[cnt].second_phone,
                    dateEntered: result.data[cnt].date_entered,
                    dateModified: result.data[cnt].date_modified,
                    emailAddress: result.data[cnt].email_address,
                    clientId: result.data[cnt].client_id
                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};


exports.getCustomerListByClientId = function (clientId, callback) {
    var queryId = [clientId];
    crud.get(customerQueries.CUSTOMER_LIST_BY_CLIENT_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    firstName: result.data[cnt].first_name,
                    lastName: result.data[cnt].last_name,
                    company: result.data[cnt].company,
                    primaryPhone: result.data[cnt].primary_phone,
                    secondPhone: result.data[cnt].second_phone,
                    dateEntered: result.data[cnt].date_entered,
                    dateModified: result.data[cnt].date_modified,
                    emailAddress: result.data[cnt].email_address,
                    clientId: result.data[cnt].client_id
                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};

exports.deleteCustomer = function (con, email, clientId, callback) {
    var queryId = [email, clientId];
    crud.delete(con, customerQueries.CUSTOMER_DELETE_QUERY, queryId, callback);
};
