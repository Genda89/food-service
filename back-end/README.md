# Food Service Back-End

This is the back-end service for the Food Service application, built with [NestJS](https://nestjs.com/) and MongoDB (via Mongoose). It provides RESTful APIs for authentication, user management, food items, orders, and more.

## Features

- User authentication (JWT-based)
- User registration and management
- Food item management
- Order management
- Day scheduling
- MongoDB integration via Mongoose

## Project Structure

```
src/
  app.module.ts           # Main application module
  main.ts                 # Application entry point
  auth/                   # Authentication logic (controllers, services, DTOs, guards)
  days/                   # Day scheduling logic
  food/                   # Food item logic
  order/                  # Order logic
  user/                   # User logic
  schema/                 # Mongoose schemas
  utils/                  # Utility modules (GeoCoder, TravelTime)
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or remote)

### Installation

1. Navigate to the `back-end` directory:
   ```sh
   cd back-end
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

- Set up your environment variables (e.g., MongoDB URI, JWT secret) in a `.env` file at the root of `back-end`.

Example `.env`:

```
MONGODB_URI=mongodb://localhost:27017/food-service
JWT_SECRET=your_jwt_secret
```

### Running the Server

```sh
npm run start:dev
```

The server will start on the default port (usually 3000).

### API Documentation

- Use [Postman](https://www.postman.com/) to import the collection in `postman/FOOD SERVICE.postman_collection.json` for testing the API endpoints.

## Scripts

- `npm run start:dev` — Start the server in development mode
- `npm run build` — Build the project
- `npm run start` — Start the built project

---
