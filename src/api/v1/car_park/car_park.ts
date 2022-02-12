
import { Request, Response } from 'express'
import { StatusCodes } from '../../../utils/resp'
import * as service from './service'
import * as validate from '../../../utils/validation'

/**
 * @apiDescription Create parking lot
 * 
 * @api {post} http://localhost:8090/api/v1/parking/create Parking - Create parking lot
 * @apiVersion 0.1.0
 * @apiName Create parking lot
 * @apiGroup Parking
 *
 * @apiParam (RequestBody) {String} parkingSlot  Name of parking slot.
 * @apiParam (RequestBody) {String} stat Parking space status AVAILABLE or UNAVAILABLE can be used according to the situation.
 * @apiParam (RequestBody) {Float} lat Latitude of parking
 * @apiParam (RequestBody) {Float} long longtitude of parking
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "status": true,
 *       "message": "Create or Update success."
 *   }
 *
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *     {
 *       "status": false,
 *       "message": "Status is invalid"
 *     }
 * 
 */
export const createParkingLot = async (req: Request, res: Response) => {
    try {
        const { parkingSlot, stat ,lat, long } = req.body
        const statUpper = stat.toUpperCase()
        const checkBodyStat = validate.valiDateStatusParkingLot(statUpper)

        if (checkBodyStat === false) throw new Error('Status is invalid')
        if (checkBodyStat === true) {
            const check = await service.checkParking(parkingSlot, statUpper, lat, long)

            if (check === 1) res.status(StatusCodes.OK).json({ status: true, message: 'Create or Update success.' })
        }
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: error.message
        })
    }
}




/**
 * @apiDescription Park the car
 * 
 * @api {post} http://localhost:8090/api/v1/parking/parkcar Parking - Park the car
 * @apiVersion 0.1.0
 * @apiName Park the car
 * @apiGroup Parking
 *
 * @apiParam (RequestBody) {String} numbPlate  Registration plate number.
 * @apiParam (RequestBody) {String} carSize Car size.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "status": true,
 *       "ticket": {
 *          "numberPlate": "New York 123",
 *          "carSize": "LARGE",
 *          "parkingSlot": "A2"
 *      }
 *   }
 *
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *     {
 *       "status": false,
 *       "message": "Car size is invalid"
 *     }
 * 
 */
export const toParkTheCar = async (req: Request, res: Response) => {
    try {
        const { numbPlate, carSize } = req.body
        
        const carsizeUpper = carSize.toUpperCase()

        const validateCarSize = validate.valiDateCarSize(carsizeUpper)

        if (validateCarSize === false) throw new Error('Car size is invalid')
        if (validateCarSize === true) {
            const checkCar: any = await service.checkCars(numbPlate, carsizeUpper)
            const getTicket: any = await service.respTicket(checkCar)
            
            if (getTicket == 0) throw new Error('Can not park repeatedly')
            if (getTicket == 1) throw new Error('Full parking')
            if (getTicket.status == false) throw new Error(getTicket.message)
            res.status(StatusCodes.OK).json({ 
                status: true, 
                ticket: {
                    numberPlate: checkCar.number_plate,
                    carSize: checkCar.size,
                    parkingSlot: getTicket.parkingSlot
                } 
            })
        }
        
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: error.message
        })
    }
}




/**
 * @apiDescription Leave the slot
 * 
 * @api {post} http://localhost:8090/api/v1/parking/leave Parking - Leave the slot
 * @apiVersion 0.1.0
 * @apiName Leave the slot
 * @apiGroup Parking
 *
 * @apiParam (RequestBody) {String} parkingSlot  Parking slot name.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "status": true,
 *       "message": "A2 is Available"
 *   }
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "status": true,
 *       "message": "Parking is empty The sensor may be malfunctioning, please check the sensor."
 *   }
 *
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *     {
 *       "status": false,
 *       "message": "System error"
 *     }
 * 
 */
export const leaveSlot = async (req: Request, res: Response) => {
    try {
        const { parkingSlot } = req.body

        const leave = await service.leaveParking(parkingSlot)

        if (leave == 0) throw new Error('System error')
        if (leave == 1) res.status(StatusCodes.OK).json({ status: false, message: 'Parking is empty The sensor may be malfunctioning, please check the sensor.' })
        if (leave) res.status(StatusCodes.OK).json({ status: true, message: `${leave} is Available` })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: error.message
        })
    }
}



/**
 * @apiDescription Parking status
 * 
 * @api {get} http://localhost:8090/api/v1/parking/status Parking - Parking status
 * @apiVersion 0.1.0
 * @apiName Parking status
 * @apiGroup Parking
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "status": true,
 *       "data": [
 *       {
 *           "parkingSlot": "A1",
 *           "status": "UNAVAILABLE"
 *       },
 *       {
 *           "parkingSlot": "A2",
 *           "status": "AVAILABLE"
 *       }
 *      ]
 *   }
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *     {
 *       "status": false,
 *       "message": "Get status failed"
 *     }
 * 
 */
export const getStatParkingLot = async (req: Request, res: Response) => {
    try {
        const resp = await service.respStatus()

        if (resp == false) throw new Error('Get status failed')
        if (resp) {
            res.status(StatusCodes.OK).json({ status: true, data: resp })
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: error.message
        })
    }
}



/**
 * @apiDescription Registration plate number list by car size
 * 
 * @api {get} http://localhost:8090/api/v1/car/size Car - Registration plate number list by car size.
 * @apiVersion 0.1.0
 * @apiName Registration plate number list by car size
 * @apiGroup Car
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "status": true,
 *        "small": [
 *          {
 *              "number_plate": "sdsd BangkokS",
 *              "size": "SMALL"
 *          },
 *          {
 *              "number_plate": "sdsd BangkokSs",
 *              "size": "SMALL"
 *          }
 *          ],
 *       "medium": [
 *          {
 *              "number_plate": "กทม 1234",
 *              "size": "MEDIUM"
 *          },
 *          {
 *              "number_plate": "A2270962",
 *              "size": "MEDIUM"
 *          }
 *          ],
 *      "large": [
 *          {
 *              "number_plate": "sdsd Bangkok",
 *              "size": "LARGE"
 *          },
 *          {
 *              "number_plate": "กทม 12345",
 *              "size": "LARGE"
 *          }
 *          ]
 *   }
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *     {
 *       "status": false,
 *       "message": "Get registration plate number error"
 *     }
 * 
 */
export const getRegisPlateByCarSize = async (req: Request, res: Response) => {
    try {
        const getPlateNumber = await service.plateByCarSize()

        if (getPlateNumber == false) throw new Error('Get registration plate number error')
        if (getPlateNumber) {
            res.status(StatusCodes.OK).json({
                status: true,
                small: getPlateNumber.small,
                medium: getPlateNumber.medium,
                large: getPlateNumber.large
            })
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: error.message
        })
    }
}




/**
 * @apiDescription Registration allocated slot number list by car size
 * 
 * @api {get} http://localhost:8090/api/v1/car/allocate/size Car - Registration allocated slot number list by car size
 * @apiVersion 0.1.0
 * @apiName Registration allocated slot number list by car size
 * @apiGroup Car
 *
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 *   {
 *       "status": true,
 *        "small": [
 *          {
 *              "id": "62036609000e03f300c07977",
 *              "parkingSlot": "A1",
 *              "status": "UNAVAILABLE",
 *              "parkedCar": "AB6243476",
 *              "carSize": "SMALL"
 *          },
 *          {
 *              "id": "6206603200530b58009a07d4",
 *              "parkingSlot": "AB2285382",
 *              "status": "UNAVAILABLE",
 *              "parkedCar": "AB4241270",
 *              "carSize": "SMALL"
 *          },
 *          ],
 *       "medium": [
 *          {
 *              "id": "620374f900cd91b4001f6443",
 *              "parkingSlot": "A4",
 *              "status": "UNAVAILABLE",
 *              "parkedCar": "กทม 1234",
 *              "carSize": "MEDIUM"
 *          }
 *          ],
 *      "large": [
 *           {
 *              "id": "6203c09e0040ccd100fc8383",
 *              "parkingSlot": "A5",
 *              "status": "UNAVAILABLE",
 *              "parkedCar": "กทม ABCD 1234",
 *              "carSize": "LARGE"
 *          },
 *          {
 *              "id": "6203c0b40040ccd100fc8384",
 *              "parkingSlot": "A6",
 *              "status": "UNAVAILABLE",
 *              "parkedCar": "กทม 123456",
 *              "carSize": "LARGE"
 *          },
 *          ]
 *   }
 *  @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *     {
 *       "status": false,
 *       "message": "Get registration plate number error"
 *     }
 * 
 */
export const allocatedSlotByCarSize = async (req: Request, res: Response) => {
    try {
        const getAllocatedByCarSize: any = await service.allocatedByCarSize()

        if (getAllocatedByCarSize === false) throw new Error('Get data error')
        if (getAllocatedByCarSize) {
            res.status(StatusCodes.OK).json({
                status: true,
                small: getAllocatedByCarSize.small,
                medium: getAllocatedByCarSize.medium,
                large: getAllocatedByCarSize.large
            })
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message: error.message
        })
    }
}