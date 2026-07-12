# Aryan Dubey — Personal Portfolio (Full-Stack)

A dark, modern personal website with a 3D animated background, a projects
showcase, a hobbies/travel-blog section, a contact area, a visitor feedback
form, and a password-protected admin panel so you can add projects and blog
posts anytime — without touching code.

**Stack:** React (Vite) + Node/Express + MongoDB, deployed as a single service.

---

## 1. Project structure

```
aryan-portfolio/
├── backend/         Express API + MongoDB models
└── frontend/        React app (Vite)
```

The backend serves the built frontend, so in production it's **one service,
one URL** — no separate frontend/backend hosting needed.

---

## 2. Get a MongoDB database (free)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free "M0" cluster.
3. Under **Database Access**, create a database user (username + password).
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) —
   simplest option for a small personal project.
5. Click **Connect → Drivers**, copy the connection string. It looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`
   Add a database name at the end, e.g. `.../portfolio?retryWrites=true...`

---

## 3. Run it locally

### Backend
```bash
cd backend
cp .env.example .env
# open .env and fill in:
#   MONGO_URI      → your Atlas connection string from step 2
#   JWT_SECRET     → any long random string
#   ADMIN_USERNAME → the username YOU will log in with
#   ADMIN_PASSWORD → the password YOU will log in with
npm install
npm run dev
```
The API runs on `http://localhost:5000`. On first start it will create your
admin account automatically from `ADMIN_USERNAME` / `ADMIN_PASSWORD`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` — the site is now running, with the API proxied
through Vite automatically.

Visit `http://localhost:5173/admin` to log in and start adding projects and
hobby/travel posts.

---

## 4. Deploy (Render or Railway — single service)

Both work the same way. Steps below use **Render**; Railway is nearly identical.

1. Push this whole `aryan-portfolio` folder to a GitHub repo.
2. On Render: **New → Web Service**, connect your repo.
3. **Build Command:**
   ```
   cd frontend && npm install && npm run build && cd ../backend && npm install
   ```
4. **Start Command:**
   ```
   node backend/server.js
   ```
5. Add these **Environment Variables** (same as your local `.env`):
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `CLIENT_ORIGIN` → set to your Render URL once you have it (e.g. `https://aryan-portfolio.onrender.com`)
   - `PORT` → Render sets this automatically, you can leave it out
6. Deploy. Your site + API will be live at the same URL Render gives you.

---

## 5. Customizing content

- **Name, hero text, About paragraph, skills:** edit
  `frontend/src/components/Hero.jsx` and `About.jsx` directly.
- **Contact links & resume:** edit `frontend/src/components/Contact.jsx`.
- **Projects & travel/gym posts:** don't edit code for these — add them from
  `/admin` after logging in. They're stored in MongoDB and show up
  immediately.
- **Your photo:** replace the placeholder box in `About.jsx` with an
  `<img src="/your-photo.jpg" />` tag, and drop the image file into
  `frontend/public/`.
- **Colors:** all theme colors are CSS variables at the top of
  `frontend/src/index.css` — change `--blue` / `--purple` / `--bg` etc.

---

## 6. A note on the admin panel

The password lock keeps casual visitors out, and the backend genuinely
verifies your login with a hashed password + signed token (JWT) — this is
real authentication, not just a hidden button. Just don't share your
`ADMIN_PASSWORD` or `JWT_SECRET`.

---

## 7. Feedback form

Visitor messages are saved to MongoDB (`Feedback` collection) but there's no
admin view built for them yet, per your earlier answer. If you'd like one
later, it's a small addition — a `feedback` tab in the admin panel reading
from `GET /api/feedback` (currently that route only supports `POST`).
