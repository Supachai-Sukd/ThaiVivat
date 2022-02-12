import express from "express";
import { carpark } from "../../api/index";

const router = express.Router();

router.post('/parking/create', carpark.createParkingLot)
router.post('/parking/parkcar', carpark.toParkTheCar)
router.post('/parking/leave', carpark.leaveSlot)
router.get('/parking/status', carpark.getStatParkingLot)
router.get('/car/size', carpark.getRegisPlateByCarSize)
router.get('/car/allocate/size', carpark.allocatedSlotByCarSize)
router.patch('/admin/car/edit', carpark.editRegisterCar)
router.patch('/admin/parking/edit', carpark.editParkingName)

export default router;