import express from 'express';
import { createCar, getAllCars, getCarById, updateCarById, deleteCarById, getCarsByUserId } from '../controllers/car.js';

const router = express.Router();

router.route("/")
    .post(createCar)
    .get(getAllCars);

router.route("/:id")
    .get(getCarById)
    .put(updateCarById)
    .delete(deleteCarById);

router.route("/user/:userId/")
    .get(getCarsByUserId);

export default router;