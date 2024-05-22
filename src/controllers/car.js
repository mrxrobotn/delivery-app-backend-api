import Car from '../models/car.js';
import User from '../models/user.js';

// Create a new car
export const createCar = async (req, res) => {
    try {
      const { brand, model, userId } = req.body;
  
      // Create a new car with the ownerId
      const newCar = new Car({ brand, model, ownerId: userId });
      await newCar.save();
  
      // Find the user by ID and update their cars array
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Add the car id to the user cars array
      user.cars.push(newCar._id);
      await user.save();
  
      res.status(201).json(newCar);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Get all cars
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single car by ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a car by ID
export const updateCarById = async (req, res) => {
  try {
    const { brand, model } = req.body;
    const car = await Car.findByIdAndUpdate(req.params.id, { brand, model }, { new: true });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a car by ID
export const deleteCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all cars of user ID
export const getCarsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is available in the request object
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find cars where ownerId matches userId
    const cars = await Car.find({ ownerId: userId });
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};