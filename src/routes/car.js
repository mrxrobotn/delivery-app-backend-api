import express from 'express';
import { createCar, getAllCars, getCarById, updateCarById, deleteCarById } from '../controllers/car.js';

const router = express.Router();

router.route("/")
    .post(createCar)
    .get(getAllCars);

router.route("/:id")
    .get(getCarById)
    .put(updateCarById)
    .delete(deleteCarById);

export default router;