# Shop API

## Overview
A simple RESTful API for managing an online shop, built with Node.js, Express.js, and MongoDB. It handles CRUD operations for products and categories, with validation and error handling.

## Features
- **Categories Management**: Add new categories (`POST /api/categories`).
- **Products Management**: 
  - Add products with category reference (`POST /api/products`).
  - List products with optional category filter (`GET /api/products?category=<id>`).
  - Delete products by ID (`DELETE /api/products/:id`).
- **Validation**: Ensures non-empty names, positive prices, and valid category IDs.
- **Error Handling**: Custom errors with HTTP status codes (400 for invalid input, 404 for not found, 500 for server errors).
- **In-Memory/Database**: Uses Mongoose for MongoDB integration.

## Project Structure
- `server.js`: Entry point and server setup.
- `app/controllers/`: API logic (e.g., `Category.controller.js`, `Product.controller.js`).
- `app/models/`: Mongoose models (`Category.model.js`, `Product.model.js`).
- `app/routes/`: Route definitions (`Category.routes.js`, `Product.routes.js`).
- `app/middleware/`: Error handlers and wrappers (`asyncHandler.middleware.js`, `ErrorHandler.middleware.js`).
- `app/utils/`: Utilities (`AppError.util.js`).
- `config/`: Database config (`db.conf.js`).

## API Endpoints
| Method | Endpoint             | Description                       | Status Code |
|--------|----------------------|-----------------------------------|-------------|
| `POST` | `/api/categories`    | Add a new category                | 201         |
| `POST` | `/api/products`      | Add a new product with category   | 201, 400, 404|
| `GET`  | `/api/products?category=<id>` | List products, filtered by category | 200       |
| `DELETE` | `/api/products/:id` | Delete a product by ID            | 204, 404    |

## Testing
Use Thunder Client, Postman, or `curl`:
- Add category: `POST http://localhost:3000/api/categories` with body `{"name": "Electronics"}`.
- Add product: `POST http://localhost:3000/api/products` with body `{"name": "Phone", "price": 500, "category": "<category_id>"}`.

## Dependencies
- `express@^4.18.2`: Web framework.
- `mongoose@^7.0.0`: MongoDB ODM.
- `dotenv@^16.0.0`: Environment variables.

## Author
Amirhossein Zamani

## License
ISC
