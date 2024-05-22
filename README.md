# Node.js Express MongoDB CRUD and Authentication Operations

This is a sample project demonstrating CRUD operations and authentication using Node.js, Express, and MongoDB.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [License](#license)

## Introduction

This project showcases a basic CRUD (Create, Read, Update, Delete) API with authentication using Node.js, Express, and MongoDB. It includes user registration, login, and protected routes.

## Features

- User registration with hashed passwords
- User authentication using JSON Web Tokens (JWT)
- Create, Read, Update, and Delete operations on MongoDB
- Protected routes for authenticated users

## Requirements

Make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mrxrobotn/CRUD-Auth-User-Backend-NodeJS-MongoDB.git
   
2. Navigate to the project directory:
   ```bash
   cd CRUD-Auth-User-Backend-NodeJS-MongoDB

3. Install dependencies:
   ```bash
   npm install

## Usage

1. Start MongoDB service if your using local database:.
   ```bash
   mongod

2. Start the server:
   ```bash
   npm start

3. The server will run on http://localhost:3000 by default.

## Endpoints
- GET /api/v1/users/: Get all users
- GET /api/v1/users/:email: Get user by Email
- GET /api/v1/users/:id: Get user by ID
- PUT /api/v1/users/:id: Update item by ID
- DELETE /api/v1/users/:id: Delete item by ID
- DELETE /api/v1/users/profile/me: Get logged in user

## Authentication
- POST /api/v1/users/register: Register a new user
- POST /api/v1/users/login: Log in with existing credentials

## License
This project is licensed under the MIT License.
