# Social Media App

A basic social media app where you can create posts and view a feed. Built this with React on the frontend and Node/Express on the backend, with MongoDB for the database and ImageKit for handling image uploads.

## What it does

- Create posts (with images)
- View a feed of posts

That's pretty much it for now.

## Tech used

- **Frontend** – React + Vite
- **Backend** – Node.js, Express
- **Database** – MongoDB (via Mongoose)
- **Image uploads** – ImageKit

## Running it locally

You'll need Node.js and MongoDB set up.

**Backend**

```bash
cd backend
npm install
# add a .env file with your MongoDB URI and ImageKit credentials
node server.js
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on port `3000`.

## .env stuff

The backend needs these in a `.env` file:

```
MONGODB_URI=your_mongo_uri
IMAGEKIT_PUBLIC_KEY=...
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_URL_ENDPOINT=...
```
