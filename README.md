# Construction Company Full-Stack Application

A modern, full-stack web application for a construction and design company, featuring a React frontend and Node.js/Express backend with comprehensive content management capabilities.

## 🏗️ Project Overview

This application provides a complete digital presence for a construction company, including:
- **Public Website**: Showcasing services, projects, and company information
- **Admin Dashboard**: Content management for blogs, courses, consultations, and testimonials
- **User Authentication**: Secure login/registration system with role-based access
- **Multi-language Support**: Internationalization for global reach
- **Responsive Design**: Mobile-first approach for all devices

## 🚀 Features

### Frontend (React)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Material-UI
- **Multi-language Support**: Internationalization with i18next
- **Authentication System**: Complete user authentication with protected routes
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Blog System**: Full-featured blog with CRUD operations
- **Course Management**: Educational content management system
- **Consultation System**: Client consultation booking and management
- **Testimonials**: Customer feedback and review system
- **Responsive Design**: Mobile-first approach with responsive components

### Backend (Node.js/Express)
- **RESTful API**: Complete REST API with proper HTTP status codes
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete user CRUD operations with admin privileges
- **Content Management**: Blog, courses, consultations, and testimonials management
- **File Upload**: Image upload functionality with Multer
- **Email Services**: Password reset and notification emails
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest testing framework with Supertest

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Material-UI
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Handling**: Formik + Yup validation
- **Internationalization**: i18next + react-i18next
- **UI Components**: Headless UI, Lucide React, React Icons
- **Notifications**: React Hot Toast, SweetAlert2
- **Image Carousel**: Swiper
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js (>=16.0.0)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, express-rate-limit
- **Testing**: Jest, Supertest
- **Development**: Nodemon
- **Environment**: dotenv

## 📦 Installation & Setup

### Prerequisites
- Node.js (>=16.0.0)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/construction-company
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FROM_EMAIL=noreply@company.com
FROM_NAME=Construction Company
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Construction Company
```

### 4. Start the Application

#### Development Mode
```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd client
npm run dev
```

#### Production Mode
```bash
# Build Frontend
cd client
npm run build

# Start Backend
cd ../server
npm start
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

## 📁 Project Structure

```
project/
├── client/                 # React Frontend
│   ├── public/            # Static assets
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── shared/        # Shared utilities
│   │   └── styles/        # Global styles
│   ├── package.json
│   └── README.md
├── server/                 # Node.js Backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── uploads/           # Uploaded files
│   ├── package.json
│   └── README.md
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:resettoken` - Reset password
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Content Management
- **Users**: `GET/POST/PUT/DELETE /api/users`
- **Blogs**: `GET/POST/PUT/DELETE /api/blogs`
- **Courses**: `GET/POST/PUT/DELETE /api/courses`
- **Consultations**: `GET/POST/PUT/DELETE /api/consultations`
- **Testimonials**: `GET/POST/PUT/DELETE /api/testimonials`

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication:

1. **User Registration/Login**: Returns a JWT token
2. **Protected Routes**: Require the token in the Authorization header
3. **Role-based Access**: Admin and user roles with different permissions
4. **Token Format**: `Bearer <token>`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🌐 Internationalization

The frontend supports multiple languages using i18next:
- Arabic (RTL support)
- English (LTR support)
- Easy to add more languages

## 🔒 Security Features

### Frontend
- Protected routes with authentication checks
- Input validation with Formik and Yup
- Secure API communication with Axios
- XSS protection

### Backend
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting
- **Input Validation**: Request validation with express-validator
- **Password Hashing**: bcryptjs for secure password storage
- **JWT**: Secure token-based authentication

## 📁 File Upload

The backend supports image uploads:
- **Supported formats**: JPG, JPEG, PNG, GIF, WEBP
- **Maximum file size**: 5MB
- **Storage**: Files stored in `server/uploads/` directory
- **Security**: File type and size validation

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm run lint
```

### Backend Testing
```bash
cd server
npm test
npm run test:watch
npm run test:coverage
```

## 🚀 Deployment

### Frontend Deployment
1. Build the application:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider

### Backend Deployment
1. Set production environment variables
2. Start the server:
   ```bash
   cd server
   npm start
   ```
3. Deploy to your hosting provider (Heroku, DigitalOcean, AWS, etc.)

### Environment Variables for Production

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=Construction Company
```

#### Backend (.env.production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-production-jwt-secret
JWT_EXPIRE=30d
EMAIL_HOST=your-smtp-host
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASS=your-password
FROM_EMAIL=noreply@yourdomain.com
FROM_NAME=Construction Company
```

## 📊 Performance Optimization

### Frontend
- **Code Splitting**: React Router lazy loading
- **Image Optimization**: WebP format support
- **Bundle Optimization**: Vite build optimization
- **Caching**: Browser caching strategies

### Backend
- **Compression**: Gzip compression middleware
- **Caching**: Response caching for static content
- **Database Indexing**: Optimized MongoDB queries
- **Rate Limiting**: API protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Frontend Issues**: Check the [client README](client/README.md)
- **Backend Issues**: Check the [server README](server/README.md)
- **General Questions**: Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added multi-language support
- **v1.2.0** - Enhanced admin dashboard
- **v1.3.0** - Improved security and performance

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js team for the robust backend framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters 