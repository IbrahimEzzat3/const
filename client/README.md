# Construction Company Frontend

A modern React-based frontend for a construction and design company website, built with Vite, Tailwind CSS, and Material-UI.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS and Material-UI
- **Multi-language Support**: Internationalization with i18next
- **Authentication System**: Complete user authentication with protected routes
- **Admin Dashboard**: Comprehensive admin panel for content management
- **Blog System**: Full-featured blog with CRUD operations
- **Course Management**: Educational content management system
- **Consultation System**: Client consultation booking and management
- **Testimonials**: Customer feedback and review system
- **Responsive Design**: Mobile-first approach with responsive components

## 🛠️ Tech Stack

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

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the client directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=Construction Company
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin panel components
│   ├── auth/           # Authentication components
│   ├── blogs/          # Blog-related components
│   ├── common/         # Common/shared components
│   ├── consultations/  # Consultation components
│   ├── courses/        # Course components
│   ├── sections/       # Home page sections
│   ├── testimonials/   # Testimonial components
│   └── ui/             # Basic UI components
├── pages/              # Page components
├── shared/             # Shared utilities and services
│   ├── context/        # React contexts
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services
│   └── data/           # Static data and translations
├── styles/             # Global styles
└── config.js           # Configuration files
```

## 🌐 Internationalization

The application supports multiple languages using i18next. Translation files are located in `src/shared/data/translations.js`.

## 🔐 Authentication

The app includes a complete authentication system with:
- User registration and login
- Password reset functionality
- Protected routes
- Admin role management
- JWT token handling

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Material-UI**: React component library
- **Custom Components**: Reusable UI components in `src/components/ui/`
- **Responsive Design**: Mobile-first approach

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Configuration

Key configuration files:
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint configuration
- `src/config.js` - Application configuration

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team.
