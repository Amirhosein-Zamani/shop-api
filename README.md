# Shop API

## Overview
A simple RESTful API for managing an online shop, built with Node.js, Express.js, and MongoDB. It provides comprehensive CRUD operations for products and categories with validation, error handling, and data consistency checks.

## Features
- **Categories Management**:
  - Retrieve all categories (`GET /api/categories`).
  - Add new categories (`POST /api/categories`).
  - Retrieve a category by ID (`GET /api/categories/:id`).
  - Update a category fully (`PUT /api/categories/:id`).
  - Update a category partially (`PATCH /api/categories/:id`).
  - Delete a category (`DELETE /api/categories/:id`).
- **Products Management**:
  - Retrieve all products with optional category filter (`GET /api/products`).
  - Add new products (`POST /api/products`).
  - Retrieve products by category (`GET /api/products/category/:categoryId`).
  - Update a product fully (`PUT /api/products/:id`).
  - Update a product partially (`PATCH /api/products/:id`).
  - Delete a product (`DELETE /api/products/:id`).
- **Validation**: Ensures valid IDs, non-empty names (min 3 characters), non-negative prices, and existing categories.
- **Error Handling**: Custom errors with HTTP status codes (400 for invalid input, 404 for not found, 500 for server errors).
- **Data Consistency**: Checks for duplicate category names and category existence.

## Project Structure
- `server.js`: Entry point and server setup.
- `app/controllers/`: API logic (e.g., `Category.controller.js`, `Product.controller.js`).
- `app/models/`: Mongoose models (`Category.model.js`, `Product.model.js`).
- `app/routes/`: Route definitions (`Category.routes.js`, `Product.routes.js`).
- `app/middleware/`: Error handlers and wrappers (`asyncHandler.middleware.js`, `ErrorHandler.middleware.js`).
- `app/utils/`: Utilities (`AppError.util.js`).
- `config/`: Database config (`db.conf.js`).

## API Endpoints

### Categories
| Method   | Endpoint            | Description                        | Status Code |
|----------|---------------------|------------------------------------|-------------|
| `GET`    | `/api/categories`   | Retrieve all categories            | 200         |
| `POST`   | `/api/categories`   | Create a new category              | 201, 400    |
| `GET`    | `/api/categories/:id` | Retrieve a category by ID          | 200, 404    |
| `PUT`    | `/api/categories/:id` | Update a category fully            | 200, 400, 404 |
| `PATCH`  | `/api/categories/:id` | Update a category partially        | 200, 400, 404 |
| `DELETE` | `/api/categories/:id` | Delete a category                  | 200, 404    |

### Products
| Method   | Endpoint                  | Description                        | Status Code |
|----------|---------------------------|------------------------------------|-------------|
| `GET`    | `/api/products`           | Retrieve all products              | 200         |
| `POST`   | `/api/products`           | Create a new product               | 201, 400, 404 |
| `GET`    | `/api/products/category/:categoryId` | Retrieve products by category | 200, 400, 404 |
| `PUT`    | `/api/products/:id`       | Update a product fully             | 200, 400, 404 |
| `PATCH`  | `/api/products/:id`       | Update a product partially         | 200, 400, 404 |
| `DELETE` | `/api/products/:id`       | Delete a product                   | 200, 404    |

## Testing
Use Thunder Client:

### Categories
- **Create Category**: `POST http://localhost:3000/api/categories` with body `{"name": "Electronics"}`.
- **Get Category by ID**: `GET http://localhost:3000/api/categories/123`.
- **Update Category (PUT)**: `PUT http://localhost:3000/api/categories/123` with body `{"name": "Updated Electronics"}`.
- **Update Category (PATCH)**: `PATCH http://localhost:3000/api/categories/123` with body `{"name": "Updated Electronics"}`.
- **Delete Category**: `DELETE http://localhost:3000/api/categories/123`.

### Products
- **Create Product**: `POST http://localhost:3000/api/products` with body `{"name": "Phone", "price": 500, "category": "123"}`.
- **Get Products**: `GET http://localhost:3000/api/products?category=123`.
- **Get Products by Category**: `GET http://localhost:3000/api/products/category/123`.
- **Update Product (PUT)**: `PUT http://localhost:3000/api/products/456` with body `{"name": "Updated Phone", "price": 600, "category": "123"}`.
- **Update Product (PATCH)**: `PATCH http://localhost:3000/api/products/456` with body `{"price": 650}`.
- **Delete Product**: `DELETE http://localhost:3000/api/products/456`.

## Dependencies
- `express@^4.18.2`: Web framework.
- `mongoose@^7.0.0`: MongoDB ODM.
- `dotenv@^16.0.0`: Environment variables.

## Author
Amirhossein Zamani

## License
ISC
