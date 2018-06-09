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



var addressService = require("../services/addressService");
var customerService = require("../services/customerService");

exports.init = function(app, db){
    //init
    addressService.init(db);
    customerService.init(db);
    
    // role validation
    app.post('/rs/address/add', addressService.add);
    app.put('/rs/address/update', addressService.update);
    app.get('/rs/address/get/:id/:email', addressService.get);
    app.post('/rs/address/list', addressService.list);  
    app.delete('/rs/address/delete/:id/:email', addressService.delete);
    
    //user services
    app.post('/rs/customer/add', customerService.add);      
    app.put('/rs/customer/update', customerService.update);
    app.get('/rs/customer/get/:email', customerService.get);
    //app.get('/rs/customer/list', customerService.list);  
    app.post('/rs/customer/list', customerService.listByClientId);  
    app.delete('/rs/customer/delete/:email', customerService.delete);
    
       
        
};
