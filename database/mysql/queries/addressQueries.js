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

//client   
exports.ADDRESS_INSERT_QUERY = "INSERT INTO address Set ?";
exports.ADDRESS_UPDATE_QUERY = "UPDATE address SET address1 = ?, address2 = ?, city = ?, " + 
                               "state = ?, zip = ?, zip_ext = ?, country = ? " +
                               "WHERE id = ? ";
exports.ADDRESS_GET_BY_ID_QUERY = "SELECT * FROM address WHERE id = ?";
exports.ADDRESS_DELETE_QUERY = "DELETE FROM address WHERE id = ?";
exports.ADDRESS_DELETE_BY_CUSTOMER_QUERY = "DELETE FROM address where customer_email_address = ? " + 
                                      "and customer_client_id = ? ";
exports.ADDRESS_LIST_BY_CUSTOMER_QUERY = "SELECT * FROM address where customer_email_address = ? " + 
                                      "and customer_client_id = ? ";
