# 🎨 VirtuGallery

A full-stack web application built for a real art exhibition in Pylos, Greece. Visitors could scan a QR code at the physical exhibition and browse the artist's works digitally.

## 🚀 Tech Stack

**Backend**

- Node.js / Express.js
- PostgreSQL (Supabase)
- Cloudinary (image storage)
- JWT Authentication (Access + Refresh tokens)
- bcrypt (password hashing)

**Frontend**

- React
- CSS

**Deployment**

- Vercel (frontend + backend)

## ✨ Features

- **Role-based authentication** — Artist and Guest user roles
- **Artist dashboard** — upload, edit and delete artworks
- **Guest view** — browse the exhibition without an account
- **QR code integration** — physical visitors scan a QR code to access the digital exhibition
- **Multilingual support** — artwork titles and descriptions stored with language codes
- **Cloudinary integration** — artwork images uploaded and managed via Cloudinary

## 🗂️ Project Structure

```
virtuGallery/
├── backend/
│   ├── config/          # Database & Cloudinary config
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth & file upload middleware
│   ├── routes/          # Express routes
│   └── utils/           # JWT helpers
└── client/              # React frontend
```

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL=your_supabase_connection_string

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
SERVER_PORT=3000
CLIENT_URL=http://localhost:5173
```

## 🏃 Running Locally

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd client
npm install
npm run dev
```

## 📸 About the Project

This app was developed for a sculptor/painter's exhibition held in Pylos, Greece. The artist used the platform to upload and manage their works, while exhibition visitors could access the digital gallery by scanning a QR code on-site.
