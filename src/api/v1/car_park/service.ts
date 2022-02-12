import { prisma } from '../../../config/prisma'

export const checkParking = async (parkSlot: any, stat: any, lat: any, long: any) => {
    try {
        await prisma.parking.upsert({
            where: {
                parkingSlot: parkSlot
            },
            update: {
                status: stat,
                latitude: parseFloat(lat),
                longtitude: parseFloat(long)
            },
            create: {
                parkingSlot: parkSlot,
                status: stat,
                latitude: lat,
                longtitude: long
            },
        })
        return 1

    } catch (error) {
        return false
    }
}


export const checkCars = async (numbPlate: string, carSize: any) => {
    try {
        const car = await prisma.cars.upsert({
            where: {
                number_plate: numbPlate
            },
            update: {
                size: carSize
            },
            create: {
                number_plate: numbPlate,
                size: carSize
            },
        })

        return car
    } catch (error) {
        return false
    }
}


export const respTicket = async (detailCar: any) => {
    try {
        let data: {
            id: string; parkingSlot: string; status: any; latitude: any; longtitude: any;
            parkedCars: string; distance: number;
        }[] = []


        const checkBeforeGenTicket = await prisma.parking.findFirst({ where: { parkedCars: detailCar.id } })
        if (checkBeforeGenTicket) return 0

        const getParkingList = await prisma.parking.findMany({})

        const mockEntryPoint = {
            latitude: 1.0,
            longitude: 1.0
        }

        function getDistance(x1: number, y1: number, x2: number, y2: number) {
            let y = x2 - x1;
            let x = y2 - y1;

            return Math.sqrt(x * x + y * y);
        }

        const getDis = getParkingList.map((item: any) => {
            item.distance = getDistance(Number(item.latitude), Number(mockEntryPoint.longitude), Number(mockEntryPoint.latitude), Number(item.longtitude))

            return item
        })

        getDis.map((item: any) => {


            if (item.status == 'AVAILABLE') {
                data.push({
                    id: item.id,
                    parkingSlot: item.parkingSlot,
                    status: item.status,
                    latitude: item.latitude,
                    longtitude: item.longtitude,
                    parkedCars: item.parkedCars,
                    distance: item.distance
                })
            }
        })

        if (data.length == 0) return 1
        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;
        let tmp;
        for (let i = data.length - 1; i >= 0; i--) {
            tmp = data[i].distance;
            if (tmp < lowest) lowest = tmp;
            if (tmp > highest) highest = tmp;
        }

        const nearestEntryPoint = data.filter((item: any) => { return item.distance == lowest && item.status == 'AVAILABLE' })

        const parkTheCar = await prisma.parking.update({
            where: {
                id: nearestEntryPoint[0].id,
            },
            data: {
                status: 'UNAVAILABLE',
                parkedCars: detailCar.id
            },
        })

        await prisma.parkingHistory.create({
            data: {
                carID: detailCar.id,
                parkingId: parkTheCar.id,
                status: parkTheCar.status
            }
        })

        return parkTheCar

    } catch (error) {
        return {
            status: false,
            message: 'Park the car error'
        }
    }
}



export const leaveParking = async (parkingSlot: string) => {
    try {
        const target = await prisma.parking.findFirst({ where: { parkingSlot: parkingSlot } })


        if (target == null) return 0
        if (target !== null && target.status == 'AVAILABLE') return 1
        if (target !== null && target.parkingSlot == parkingSlot) {
            await prisma.parkingHistory.create({
                data: {
                    carID: target.parkedCars,
                    parkingId: target.id,
                    status: 'AVAILABLE'
                }
            })

            const targetLeave = await prisma.parking.update({
                where: {
                    parkingSlot: target.parkingSlot
                },
                data: {
                    status: 'AVAILABLE',
                    parkedCars: null
                }
            })

            return targetLeave.parkingSlot
        }
    } catch (error) {
        return false
    }
}




export const respStatus = async () => {
    try {
        const status = await prisma.parking.findMany({
            select: {
                parkingSlot: true,
                status: true
            }
        })
        return status
    } catch (error) {
        return false
    }
}



export const plateByCarSize = async () => {
    try {
        const getCar = await prisma.cars.findMany({
            select: {
                number_plate: true,
                size: true
            }
        })

        const small = getCar.filter((item: any) => { return item.size == 'SMALL' })
        const medium = getCar.filter((item: any) => { return item.size == 'MEDIUM' })
        const large = getCar.filter((item: any) => { return item.size == 'LARGE' })

        return {
            small,
            medium,
            large
        }
    } catch (error) {
        return false
    }
}



export const allocatedByCarSize = async () => {
    try {
        let data: { id: any; parkingSlot: any; status: any; parkedCar: any; carSize: any }[] = []

        const target = await prisma.parking.findMany({
            include: {
                parked: {
                    select: {
                        number_plate: true,
                        size: true
                    }
                }
            }
        })
        target.map((item: any) => {
            data.push({
                id: item.id,
                parkingSlot: item.parkingSlot,
                status: item.status,
                parkedCar: item.parked !== null ? item.parked.number_plate : undefined,
                carSize: item.parked !== null ? item.parked.size : undefined
            })
        })

        const small = data.filter((item: any) => { return item.carSize == 'SMALL' })
        const medium = data.filter((item: any) => { return item.carSize == 'MEDIUM' })
        const large = data.filter((item: any) => { return item.carSize == 'LARGE' })

        return {
            small,
            medium,
            large
        }
    } catch (error) {
        return false
    }
}





export const editCar = async (idCar: string, numbPlate: string, size: any) => {
    try {
        const targetCar = await prisma.cars.findUnique({ where: { id: idCar } })
        if (!targetCar) return 0
       const updateCar = await prisma.cars.update({
            where: {
                id: idCar
            },
            data: {
                number_plate: numbPlate,
                size: size
            }
        })
        return {
            number_plate: updateCar.number_plate,
            result: true
        }
    } catch (error) {
        return false
    }
}