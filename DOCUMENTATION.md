<a name="top"></a>
# Thai Vivat v1.0.0

API document

# Table of contents

- [Admin](#Admin)
  - [Admin - Change active status car](#Admin---Change-active-status-car)
  - [Admin - Change active status parking](#Admin---Change-active-status-parking)
  - [Admin - Edit parking name](#Admin---Edit-parking-name)
  - [Admin - Edit register car](#Admin---Edit-register-car)
  - [Admin - Get all car](#Admin---Get-all-car)
  - [Admin - Get all history.](#Admin---Get-all-history.)
  - [Admin - Get all parking](#Admin---Get-all-parking)
- [Car](#Car)
  - [Car - Registration allocated slot number list by car size](#Car---Registration-allocated-slot-number-list-by-car-size)
  - [Car - Registration plate number list by car size.](#Car---Registration-plate-number-list-by-car-size.)
- [Parking](#Parking)
  - [Parking - Create parking lot](#Parking---Create-parking-lot)
  - [Parking - Leave the slot](#Parking---Leave-the-slot)
  - [Parking - Park the car](#Parking---Park-the-car)
  - [Parking - Parking status](#Parking---Parking-status)

___


# <a name='Admin'></a> Admin

## <a name='Admin---Change-active-status-car'></a> Admin - Change active status car
[Back to top](#top)

<p>Change active status car</p>

```
PATCH http://localhost:8090/api/v1/admin/car/status
```

### Parameters - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| idTarget | `String` | <p>Id Car.</p> |
| stat | `String` | <p>Status car.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "message": "Change status success."
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Id or status is undefined."
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Status is invalid"
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Update status error."
   }
```

## <a name='Admin---Change-active-status-parking'></a> Admin - Change active status parking
[Back to top](#top)

<p>Change active status parking</p>

```
PATCH http://localhost:8090/api/v1/admin/parking/status
```

### Parameters - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| idTarget | `String` | <p>Id parking.</p> |
| stat | `String` | <p>Status parking.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "message": "Change status success."
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Id or status is undefined."
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Status is invalid"
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Update status error."
   }
```

## <a name='Admin---Edit-parking-name'></a> Admin - Edit parking name
[Back to top](#top)

<p>Edit parking name</p>

```
PATCH http://localhost:8090/api/v1/admin/parking/edit
```

### Parameters - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| idParking | `String` | <p>Id Parking.</p> |
| parkingSlot | `String` | <p>Parking slot name</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "message": "Parking ABC12 update success"
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Please input id"
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Id parking is invalid"
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Update error"
   }
```

## <a name='Admin---Edit-register-car'></a> Admin - Edit register car
[Back to top](#top)

<p>Edit register car</p>

```
PATCH http://localhost:8090/api/v1/admin/car/edit
```

### Parameters - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| idCar | `String` | <p>Id register car.</p> |
| numbPlate | `String` | <p>Register number plate.</p> |
| size | `String` | <p>Size car.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "message": "Register car LA 123 update success."
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Please input id car"
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Car size is invalid"
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Id car is invalid"
   }
```

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Update register car error."
   }
```

## <a name='Admin---Get-all-car'></a> Admin - Get all car
[Back to top](#top)

<p>Get all car</p>

```
GET http://localhost:8090/api/v1/admin/car
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "data": [
      {
          "id": "62037074001347bc00b59621",
          "number_plate": "LA 12345",
          "size": "LARGE",
          "createdAt": "2022-02-09T07:42:42.538Z"
      },
      {
          "id": "62037bba001c28d000aae0c8",
          "number_plate": "sdsd BangkokSs",
          "size": "SMALL",
          "createdAt": "2022-02-09T08:30:48.542Z"
      }
     ]
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Get car details error."
   }
```

## <a name='Admin---Get-all-history.'></a> Admin - Get all history.
[Back to top](#top)

<p>Get all history.</p>

```
GET http://localhost:8090/api/v1/admin/parking/history
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "data": [
        {
          "id": "620741f4009df0fe00b7bb2c",
          "status": "AVAILABLE",
          "createdAt": "2022-02-12T05:13:24.347Z",
          "parking": {
              "id": "6203674600910efc00ef1881",
              "parkingSlot": "A2",
              "status": "AVAILABLE"
          },
          "car": {
              "id": "620741f0009df0fe00b7bb2a",
              "number_plate": "AB7732411",
              "size": "LARGE"
          }
      }
     ]
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Get history details error."
   }
```

## <a name='Admin---Get-all-parking'></a> Admin - Get all parking
[Back to top](#top)

<p>Get all parking</p>

```
GET http://localhost:8090/api/v1/admin/parking
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "data": [
       {
          "id": "62036609000e03f300c07977",
          "parkingSlot": "ABC12",
          "status": "UNAVAILABLE",
          "latitude": 10,
          "longtitude": 81
      },
      {
          "id": "6203674600910efc00ef1881",
          "parkingSlot": "A2",
          "status": "AVAILABLE",
          "latitude": 10.2,
          "longtitude": 81.1
      }
     ]
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Get parking details error."
   }
```

# <a name='Car'></a> Car

## <a name='Car---Registration-allocated-slot-number-list-by-car-size'></a> Car - Registration allocated slot number list by car size
[Back to top](#top)

<p>Registration allocated slot number list by car size</p>

```
GET http://localhost:8090/api/v1/car/allocate/size
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
       "small": [
         {
             "id": "62036609000e03f300c07977",
             "parkingSlot": "A1",
             "status": "UNAVAILABLE",
             "parkedCar": "AB6243476",
             "carSize": "SMALL"
         },
         {
             "id": "6206603200530b58009a07d4",
             "parkingSlot": "AB2285382",
             "status": "UNAVAILABLE",
             "parkedCar": "AB4241270",
             "carSize": "SMALL"
         },
         ],
      "medium": [
         {
             "id": "620374f900cd91b4001f6443",
             "parkingSlot": "A4",
             "status": "UNAVAILABLE",
             "parkedCar": "กทม 1234",
             "carSize": "MEDIUM"
         }
         ],
     "large": [
          {
             "id": "6203c09e0040ccd100fc8383",
             "parkingSlot": "A5",
             "status": "UNAVAILABLE",
             "parkedCar": "กทม ABCD 1234",
             "carSize": "LARGE"
         },
         {
             "id": "6203c0b40040ccd100fc8384",
             "parkingSlot": "A6",
             "status": "UNAVAILABLE",
             "parkedCar": "กทม 123456",
             "carSize": "LARGE"
         },
         ]
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Get registration plate number error"
   }
```

## <a name='Car---Registration-plate-number-list-by-car-size.'></a> Car - Registration plate number list by car size.
[Back to top](#top)

<p>Registration plate number list by car size</p>

```
GET http://localhost:8090/api/v1/car/size
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
       "small": [
         {
             "number_plate": "sdsd BangkokS",
             "size": "SMALL"
         },
         {
             "number_plate": "sdsd BangkokSs",
             "size": "SMALL"
         }
         ],
      "medium": [
         {
             "number_plate": "กทม 1234",
             "size": "MEDIUM"
         },
         {
             "number_plate": "A2270962",
             "size": "MEDIUM"
         }
         ],
     "large": [
         {
             "number_plate": "sdsd Bangkok",
             "size": "LARGE"
         },
         {
             "number_plate": "กทม 12345",
             "size": "LARGE"
         }
         ]
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Get registration plate number error"
   }
```

# <a name='Parking'></a> Parking

## <a name='Parking---Create-parking-lot'></a> Parking - Create parking lot
[Back to top](#top)

<p>Create parking lot</p>

```
POST http://localhost:8090/api/v1/parking/create
```

### Parameters - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| parkingSlot | `String` | <p>Name of parking slot.</p> |
| stat | `String` | <p>Parking space status AVAILABLE or UNAVAILABLE can be used according to the situation.</p> |
| lat | `Float` | <p>Latitude of parking</p> |
| long | `Float` | <p>longtitude of parking</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "message": "Create or Update success."
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Status is invalid"
   }
```

## <a name='Parking---Leave-the-slot'></a> Parking - Leave the slot
[Back to top](#top)

<p>Leave the slot</p>

```
POST http://localhost:8090/api/v1/parking/leave
```

### Parameters - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| parkingSlot | `String` | <p>Parking slot name.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "message": "A2 is Available"
  }
```

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "message": "Parking is empty The sensor may be malfunctioning, please check the sensor."
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "System error"
   }
```

## <a name='Parking---Park-the-car'></a> Parking - Park the car
[Back to top](#top)

<p>Park the car</p>

```
POST http://localhost:8090/api/v1/parking/parkcar
```

### Parameters - `RequestBody`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| numbPlate | `String` | <p>Registration plate number.</p> |
| carSize | `String` | <p>Car size.</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "ticket": {
         "numberPlate": "New York 123",
         "carSize": "LARGE",
         "parkingSlot": "A2"
     }
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Car size is invalid"
   }
```

## <a name='Parking---Parking-status'></a> Parking - Parking status
[Back to top](#top)

<p>Parking status</p>

```
GET http://localhost:8090/api/v1/parking/status
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 200 OK
  {
      "status": true,
      "data": [
      {
          "parkingSlot": "A1",
          "status": "UNAVAILABLE"
      },
      {
          "parkingSlot": "A2",
          "status": "AVAILABLE"
      }
     ]
  }
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Bad Request
   {
     "status": false,
     "message": "Get status failed"
   }
```

