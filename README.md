<div align="center">

# 🚀 Keerthivasan R — MERN Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-68A063?style=flat&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://mongodb.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?style=flat&logo=vercel)](https://vercel.com)

**Full Stack Developer Portfolio built with the MERN Stack**

[Live Demo](https://genwear-client.vercel.app) · [GitHub](https://github.com/keerthivasan20044) · [LinkedIn](https://linkedin.com/in/keerthivasan-r-8003a7389)

</div>

---

## 📁 Project Structure

```
portfolio/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── favicon.ico              # Tab bar icon
│   │   ├── favicon.svg              # SVG favicon
│   │   ├── favicon-32.png           # 32×32 PNG favicon
│   │   ├── favicon-64.png           # 64×64 PNG favicon
│   │   ├── favicon-512.png          # 512×512 PNG (PWA)
│   │   ├── apple-touch-icon.png     # iOS home screen icon
│   │   ├── site.webmanifest         # PWA manifest
│   │   └── Keerthivasan_Resume.pdf  # Downloadable resume
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Responsive nav + hamburger
│   │   │   ├── Hero.jsx             # Typewriter + DevBoy + stats
│   │   │   ├── DevBoy.jsx           # Animated developer character
│   │   │   ├── About.jsx            # Profile card + tech stack
│   │   │   ├── Skills.jsx           # Animated skill bars
│   │   │   ├── Projects.jsx         # 5 projects with GENWEAR featured
│   │   │   ├── Certifications.jsx   # 4 certifications
│   │   │   ├── Education.jsx        # Timeline layout
│   │   │   ├── Contact.jsx          # Form → MongoDB via API
│   │   │   ├── Footer.jsx
│   │   │   ├── ParticleCanvas.jsx   # Particle network background
│   │   │   ├── SectionTitle.jsx     # Reusable section header
│   │   │   └── TechIcons.jsx        # All logos as inline SVG
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── vercel.json                  # Vercel deploy config
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── contactController.js     # Handle contact form
│   │   └── messageController.js     # Admin CRUD operations
│   ├── middleware/
│   │   ├── auth.js                  # Admin key authentication
│   │   ├── validate.js              # Input validation rules
│   │   └── errorHandler.js          # Global error handler
│   ├── models/
│   │   └── Message.js               # Mongoose schema
│   ├── routes/
│   │   ├── contact.js               # POST /api/contact
│   │   └── messages.js              # Admin message routes
│   ├── .env.example
│   ├── .gitignore
│   ├── vercel.json                  # Vercel serverless config
│   ├── server.js                    # Entry point
│   └── package.json
│
├── .gitignore                       # Root gitignore
├── package.json                     # Root scripts (concurrently)
├── render.yaml                      # Render.com deploy config
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free) — [cloud.mongodb.com](https://cloud.mongodb.com)

### 1. Clone & Install

```bash
git clone https://github.com/keerthivasan20044/portfolio.git
cd portfolio

# Install all dependencies at once
npm run install:all
```

### 2. Configure Environment

```bash
# Server
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and settings

# Client
cd ../client
cp .env.example .env
# Only needed for production API URL
```

### 3. Run Development

```bash
# From root — runs both client & server simultaneously
npm run dev

# OR run individually:
npm run server   # Express on http://localhost:5000
npm run client   # React on  http://localhost:5173
```

---

## 🔑 Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `ADMIN_KEY` | Secret key for admin routes | `mysecretkey123` |

### Client (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend URL (production only) | `https://your-api.onrender.com` |

---

## 🌐 API Endpoints

### Public

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/contact` | Submit contact form → saves to MongoDB |

### Admin (requires `x-admin-key` header)

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/messages` | Get all messages (paginated) |
| `GET` | `/api/messages/:id` | Get single message |
| `PATCH` | `/api/messages/:id/read` | Mark as read |
| `DELETE` | `/api/messages/:id` | Delete one message |
| `DELETE` | `/api/messages` | Delete all messages |

**Query params for GET /api/messages:**
- `page=1` — page number
- `limit=20` — items per page
- `unread=true` — filter unread only

---

## 🚀 Deployment

### Frontend → Vercel

1. Push `client/` folder to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `client`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
5. Deploy → auto-deploys on every push ✅

### Backend → Render.com

1. Push `server/` folder to GitHub
2. New Web Service on [render.com](https://render.com)
3. Set **Root Directory** to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables from `server/.env.example`
7. Deploy ✅

### Database → MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create free M0 cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all for Render)
5. Copy connection string → paste as `MONGODB_URI`

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🎨 Design | Cyberpunk dark theme — Cyan + Purple + Pink |
| 🧑‍💻 Dev Boy | Fully animated developer character (CSS) |
| ✨ Particles | Canvas particle network background |
| ⌨️ Typewriter | Animated role text in hero |
| 📊 Skills | Scroll-triggered animated progress bars |
| 💼 Projects | GENWEAR featured + 4 more projects |
| 📩 Contact | Form saves to MongoDB via Express API |
| 📄 Resume | PDF download button in hero |
| 🔖 Favicon | KV icon across all browsers + PWA |
| 📱 Responsive | Mobile-first + hamburger menu |
| 🔒 Security | Helmet, CORS, rate limiting, validation |
| 🎭 Animations | Framer Motion scroll-triggered reveals |
| 🔤 Fonts | Orbitron + Fira Code + Poppins |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Backend | Node.js + Express |
| Database | MongoDB Atlas + Mongoose |
| Validation | express-validator |
| Security | helmet + cors + express-rate-limit |
| Deployment | Vercel (frontend) + Render (backend) |
| Icons | Inline SVG (no CDN) |

---

<div align="center">
Built with ♥ by <strong>Keerthivasan R</strong> · keerthivasanmca718@gmail.com
</div>
