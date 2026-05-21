# 🔥 FireWatch

A full-stack web application for monitoring and tracking fire-related data. Built with Next.js 14, Firebase, and Clerk authentication.

**[Live Demo →](https://fire-watch-kohl.vercel.app)**

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Clerk |
| Backend | Firebase (Firestore + Cloud Functions) |
| Deployment | Vercel |

---

## Project Structure

```
FireWatch/
├── app/              # Next.js App Router pages & layouts
├── components/       # Reusable UI components (shadcn/ui based)
├── functions/        # Firebase Cloud Functions
├── lib/              # Utility functions & shared logic
└── public/           # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Firebase](https://firebase.google.com) project
- A [Clerk](https://clerk.com) account

### Installation

```bash
git clone https://github.com/Munish0303/FireWatch.git
cd FireWatch
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Authentication & Routes

Clerk handles auth via `middleware.ts`. Public routes:

| Route | Access |
|---|---|
| `/` | Public |
| `/sign-in` | Public |
| `/register` | Public |
| `/learn-more` | Public |
| Everything else | Authenticated only |

---

## Firebase Cloud Functions

Cloud Functions live in `/functions`. To deploy:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only functions
```

---

## Deployment

Deployed on Vercel. To deploy your own instance:

```bash
npm run build   # verify build passes locally first
```

Then connect the repo to [Vercel](https://vercel.com) and add all environment variables from `.env.local` to the Vercel dashboard.

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## License

MIT
