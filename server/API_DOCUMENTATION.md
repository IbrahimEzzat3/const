# API Documentation

Base URL: `https://ecosus-production.up.railway.app/api/` 

## Authentication Routes
`/api/auth`
- POST `/register` - Register a new user
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "phone":"string"
  } 
  ```
- POST `/login` - Login user
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- GET `/me` - Get current user profile (Requires Auth Token)
- PUT `/updatedetails`
  ```json
  {
    "name": "string",
    "email": "string",
    "phone":"string"

  }
  ```
- PUT `/updatepassword`
  ```json
  {
    "currentPassword": "string",
    "newPassword": "string"
  }
  ```

## Blog Routes
`/api/blog`
- GET `/` - Get all blog posts
  - Query params: `page`, `limit`, `search`
- GET `/:id` - Get single blog post
  - Params: `id` (blog post ID)
- POST `/` (Admin only)
  ```json
  {
    "title": "string",
    "content": "string",
    "image": "file upload"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (blog post ID)
  ```json
  {
    "title": "string",
    "content": "string",
    "image": "file upload (optional)"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (blog post ID)

## Testimonial Routes
`/api/testimonials`
- GET `/` - Get all testimonials
  - Query params: `page`, `limit`
- GET `/:id`
  - Params: `id` (testimonial ID)
- POST `/` (Admin only)
  ```json
  {
    "name": "string",
    "position": "string",
    "content": "string",
    "image": "file upload"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (testimonial ID)
  ```json
  {
    "name": "string",
    "position": "string",
    "content": "string",
    "image": "file upload (optional)"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (testimonial ID)

## Course Routes
`/api/courses`
- GET `/` - Get all courses
  - Query params: `page`, `limit`, `search`, `category`
- GET `/:id`
  - Params: `id` (course ID)
- POST `/` (Admin only)
  ```json
  {
    "title": "string",
    "description": "string",
    "price": "number",
    "duration": "string",
    "category": "string",
    "image": "file upload"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (course ID)
  ```json
  {
    "title": "string",
    "description": "string",
    "price": "number",
    "duration": "string",
    "category": "string",
    "image": "file upload (optional)"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (course ID)

## Consultation Routes
`/api/consultations`
- GET `/` - Get all consultations
  - Query params: `page`, `limit`, `status`
- GET `/:id`
  - Params: `id` (consultation ID)
- POST `/`
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "message": "string",
    "preferredDate": "date"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (consultation ID)
  ```json
  {
    "status": "string (pending/approved/rejected)",
    "notes": "string"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (consultation ID)

## User Routes
`/api/users`
- GET `/` (Admin only)
  - Query params: `page`, `limit`, `role`
- GET `/:id` (Admin only)
  - Params: `id` (user ID)
- PUT `/:id` (Admin only)
  - Params: `id` (user ID)
  ```json
  {
    "name": "string",
    "email": "string",
    "role": "string (user/admin)"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (user ID)

## Slider Routes
`/api/sliders`
- GET `/` - Get all sliders
  - Query params: `page`, `limit`
- GET `/:id`
  - Params: `id` (slider ID)
- POST `/` (Admin only)
  ```json
  {
    "title": "string",
    "description": "string",
    "image": "file upload"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (slider ID)
  ```json
  {
    "title": "string",
    "description": "string",
    "image": "file upload (optional)"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (slider ID)

## Project Routes
`/api/projects`
- GET `/` - Get all projects
  - Query params: `page`, `limit`, `category`
- GET `/:id`
  - Params: `id` (project ID)
- POST `/` (Admin only)
  ```json
  {
    "title": "string",
    "description": "string",
    "category": "string",
    "client": "string",
    "completionDate": "date",
    "images": "file upload (multiple)"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (project ID)
  ```json
  {
    "title": "string",
    "description": "string",
    "category": "string",
    "client": "string",
    "completionDate": "date",
    "images": "file upload (multiple, optional)"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (project ID)

## Enrollment Routes
`/api/enrollments`
- GET `/` - Get all enrollments
  - Query params: `page`, `limit`, `status`
- GET `/:id`
  - Params: `id` (enrollment ID)
- POST `/`
  ```json
  {
    "courseId": "string",
    "name": "string",
    "email": "string",
    "phone": "string"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (enrollment ID)
  ```json
  {
    "status": "string (pending/approved/rejected)",
    "notes": "string"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (enrollment ID)

## Why Image Routes
`/api/whyImage`
- GET `/` - Get all why images
  - Query params: `page`, `limit`
- GET `/:id`
  - Params: `id` (why image ID)
- POST `/` (Admin only)
  ```json
  {
    "title": "string",
    "description": "string",
    "image": "file upload"
  }
  ```
- PUT `/:id` (Admin only)
  - Params: `id` (why image ID)
  ```json
  {
    "title": "string",
    "description": "string",
    "image": "file upload (optional)"
  }
  ```
- DELETE `/:id` (Admin only)
  - Params: `id` (why image ID)


## Important Notes

1. Authentication:
   - Most endpoints require authentication via JWT token
   - Send token in request header: `Authorization: Bearer <your_token>`
   - Admin-only routes require admin role

2. File Uploads:
   - For routes that require file uploads, use multipart/form-data
   - Images are stored in `/uploads` directory
   - Public assets are served from `/public` directory

3. Rate Limiting:
   - API is rate-limited to 1000 requests per 15 minutes per IP

4. Error Responses:
   ```json
   {
     "success": false,
     "error": "Error type",
     "message": "Detailed error message"
   }
   ```

5. Success Responses:
   ```json
   {
     "success": true,
     "data": {...}
   }
   ```