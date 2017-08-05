Ulbora Customer Service 
==============

A Customer Micro Service


## Headers
Content-Type: application/json (for POST and PUT)
Authorization: Bearer atToken
clientId: clientId (example 33477)


## Add Customer

```
POST:
URL: http://localhost:3004/rs/customer/add

Example Request
{
   "firstName":"rod",
   "lastName":"Johnson",
   "company":"big data",
   "primaryPhone":"1254567890",
   "secondPhone":"",
   "emailAddress":"bobby50@bob.com"
}
  
```

```
Example Response   

{
  "success": true,
  "id": 176,
  "clientId": "403",
  "message": ""
}

```

## Update Customer

```
PUT:
URL: http://localhost:3004/rs/customer/update

Example Request
{
   "firstName":"Ken",
   "lastName":"Williamson",
   "company":"big data",
   "primaryPhone":"1254567890",
   "secondPhone":"",
   "emailAddress":"bobby50@bob.com"
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```

## Get Customer

```
GET:
URL: http://localhost:3004/rs/customer/get/bobby50@bob.com
  
```

```
Example Response   

{
  "firstName": "rod",
  "lastName": "Johnson",
  "company": "big data",
  "primaryPhone": "1254567890",
  "secondPhone": "",
  "dateEntered": "2017-06-11T04:00:00.000Z",
  "dateModified": null,
  "emailAddress": "bobby50@bob.com",
  "clientId": 403
}

```


## Get Customer List by client id

```
POST:
URL: http://localhost:3004/rs/customer/list

Example Request
{  
   "clientId":"403"
}
  
```

```
Example Response   

[
  {
    "firstName": "rod",
    "lastName": "Johnson",
    "company": "big data",
    "primaryPhone": "1254567890",
    "secondPhone": "",
    "dateEntered": "2017-06-11T04:00:00.000Z",
    "dateModified": null,
    "emailAddress": "bobby50@bob.com"
  }
]

```




## Get List of Customer All

```
GET:
URL: http://localhost:3004/rs/customer/list

  
```

```
Example Response   

[
  {
    "firstName": "rod",
    "lastName": "Johnson",
    "company": "big data",
    "primaryPhone": "1254567890",
    "secondPhone": "",
    "dateEntered": "2017-06-11T04:00:00.000Z",
    "dateModified": null,
    "emailAddress": "bobby50@bob.com"
  }
]

```

## Delete Customer

```
DELETE:
URL: http://localhost:3004/rs/customer/delete/bobby50@bob3.com
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```



## Add Customer Address

```
POST:
URL: http://localhost:3004/rs/address/add

Example Request
{
   "address1":"125 river rd",
   "address2":"",
   "city":"big valley",
   "state":"CA",
   "zip":"12345",
   "zipExt":"1234",
   "country":"USA",
   "emailAddress":"bobby50@bob.com"
}
  
```

```
Example Response   

{
  "success": true,
  "id": 49,
  "message": ""
}

```


## Update Customer Address

```
PUT:
URL: http://localhost:3004/rs/address/update

Example Request
{
   "address1":"1255 river rd",
   "address2":"",
   "city":"big valley",
   "state":"CA",
   "zip":"12345",
   "zipExt":"1234",
   "country":"USA",
   "id":49,
   "emailAddress": "bobby50@bob.com"
   
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```


## Get Customer Address

```
GET:
URL: http://localhost:3004/rs/address/get/49/bobby50@bob.com
  
```

```
Example Response   

{
  "id": 49,
  "address1": "1255 river rd",
  "address2": "",
  "city": "big valley",
  "state": "CA",
  "zip": "12345",
  "zipExt": "1234",
  "country": "USA",
  "emailAddress": "bobby50@bob.com"
}

```



## Get Customer Address List 

```
POST:
URL: http://localhost:3004/rs/address/list

Example Request
{
   "email":"bobby50@bob.com"
}
  
```

```
Example Response   

[
  {
    "id": 49,
    "address1": "1255 river rd",
    "address2": "",
    "city": "big valley",
    "state": "CA",
    "zip": "12345",
    "zipExt": "1234",
    "country": "USA",
    "emailAddress": "bobby50@bob.com",
    "clientId": 403
  }
]

```


## Delete Customer Address

```
DELETE:
URL: http://localhost:3004/rs/address/delete/49/bobby50@bob.com
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```
