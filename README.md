# ShopEase - E-Commerce Platform

A full-stack e-commerce platform built with **Spring Boot 3** (Java 17) and **React 18** (TypeScript), designed as a final year internship project.

## Tech Stack

### Backend
- **Java 17** + **Spring Boot 3.2.5**
- **Spring Security** + **JWT** authentication
- **Spring Data JPA** + **H2** in-memory database (switchable to MySQL)
- **Lombok** for boilerplate reduction
- **Maven** build tool

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **React Hot Toast** for notifications

## Features

### User Features
- User registration and login with JWT authentication
- Browse products by category
- Search products by name
- View product details with stock availability
- Add/remove items from shopping cart
- Update cart item quantities
- Place orders with shipping address and payment method
- View order history with status tracking

### Admin Features
- Admin dashboard with revenue statistics
- Product management (CRUD operations)
- Category management
- Order management with status updates (Pending, Confirmed, Shipped, Delivered, Cancelled)

### Security
- JWT-based stateless authentication
- Role-based access control (USER / ADMIN)
- Password encryption with BCrypt
- CORS configuration for cross-origin requests

## Project Structure

```
ecommerce-platform/
├── backend/                        # Spring Boot Backend
│   ├── src/main/java/com/ecommerce/
│   │   ├── EcommerceApplication.java
│   │   ├── config/                 # Security, CORS, Data Initialization
│   │   ├── controller/             # REST Controllers
│   │   ├── dto/                    # Data Transfer Objects
│   │   ├── exception/              # Global Exception Handling
│   │   ├── model/                  # JPA Entities
│   │   ├── repository/             # Spring Data Repositories
│   │   ├── security/               # JWT Token & Auth Filter
│   │   └── service/                # Business Logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                       # React Frontend
│   ├── src/
│   │   ├── components/             # Reusable Components
│   │   ├── context/                # Auth Context Provider
│   │   ├── pages/                  # Page Components
│   │   ├── services/               # API Service Layer
│   │   └── App.tsx                 # Main App with Routes
│   ├── .env                        # API URL Configuration
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- **Java 17** (JDK)
- **Maven 3.6+**
- **Node.js 18+**
- **npm 9+**

### Backend Setup

```bash
cd backend

# Build the project
mvn clean package -DskipTests

# Run the application
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5173**

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Products (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all active products |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/category/{id}` | Get products by category |
| GET | `/api/products/search?query=` | Search products |

### Categories (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |

### Cart (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/{id}?quantity=` | Update item quantity |
| DELETE | `/api/cart/{id}` | Remove item from cart |
| DELETE | `/api/cart` | Clear cart |

### Orders (Authenticated)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order from cart |
| GET | `/api/orders` | Get user's orders |
| GET | `/api/orders/{id}` | Get order by ID |

### Admin (Admin Role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/products?categoryId=` | Create product |
| PUT | `/api/admin/products/{id}` | Update product |
| DELETE | `/api/admin/products/{id}` | Delete product |
| POST | `/api/admin/categories` | Create category |
| GET | `/api/admin/orders` | Get all orders |
| PUT | `/api/admin/orders/{id}/status?status=` | Update order status |

## Demo Accounts

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| User | `user` | `user123` |

## Switching to MySQL (Production)

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommercedb
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

Add MySQL connector to `pom.xml`:
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

## License

This project is built for educational purposes as a final year internship submission.
