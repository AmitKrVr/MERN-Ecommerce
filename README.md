# Forever - MERN E-commerce Platform

A full-featured e-commerce platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. The project consists of three main components: a customer-facing frontend, an admin panel, and a backend server.

## Features

### Customer Frontend

-   User authentication and authorization
-   Product browsing with advanced filtering options
-   Category-based navigation (Men, Women, Kids)
-   Product type filtering (Topwear, Bottomwear, Winterwear)
-   Price-based sorting
-   Latest collections showcase
-   Best sellers section
-   Shopping cart functionality
-   Multiple payment options:
    -   Razorpay integration
    -   Stripe integration
    -   Cash on Delivery (COD)

### Admin Panel

-   Product management (Add, Edit, Delete)
-   Order management
-   Image upload functionality
-   Order status tracking
-   Sales monitoring
-   User management

### Backend

-   RESTful API architecture
-   JWT-based authentication
-   Image upload with Cloudinary
-   Payment gateway integrations
-   Order processing
-   Database management

## Tech Stack

### Frontend & Admin Panel

-   React 18
-   Vite for build tooling
-   React Router for navigation
-   Axios for API requests
-   TailwindCSS for styling
-   React Toastify for notifications

### Backend

-   Node.js with Express
-   MongoDB with Mongoose
-   JWT for authentication
-   Bcrypt for password hashing
-   Multer for file handling
-   Cloudinary for image storage
-   Razorpay & Stripe SDKs

## Installation

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB
-   npm or yarn

### Setting up the Backend

```bash
cd backend
npm install
# Create .env file with required configurations
npm run server
```

### Setting up the Frontend

```bash
cd frontend
npm install
npm run dev
```

### Setting up the Admin Panel

```bash
cd admin
npm install
npm run dev
```

## Environment Variables

### Backend (.env)

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
CLOUDNIARY_NAME=your_cloudinary_name
CLOUDINARY_URL=your_cloudinary_url
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
RAZORPAY_KEY_ID=your_razorpay_key_id

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

## API Endpoints

### Products

-   GET /api/products - Get all products
-   POST /api/products - Add new product
-   PUT /api/products/:id - Update product
-   DELETE /api/products/:id - Delete product

### Authentication

-   POST /api/auth/register - Register user
-   POST /api/auth/login - Login user

### Orders

-   GET /api/orders - Get all orders
-   POST /api/orders - Create new order
-   PUT /api/orders/:id - Update order status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

-   React Team for the amazing frontend library
-   MongoDB Team for the powerful database
-   Express.js Team for the backend framework
-   Node.js Team for the runtime environment
