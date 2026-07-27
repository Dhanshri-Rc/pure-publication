# Pure Publication

A production-ready academic journal publishing website built with React 19,
Vite, Tailwind CSS, Framer Motion, React Router, React Hook Form, and Firebase.

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, React Router DOM, Framer Motion, React Hook Form, React Helmet Async, Lucide Icons
- **Backend:** Firebase (Authentication, Firestore, Storage, Hosting, Cloud Functions, Security Rules)

## 1. Install dependencies

```bash
npm install
cd functions && npm install && cd ..
```

## 2. Create a Firebase project

1. Go to https://console.firebase.google.com and create a new project.
2. Enable **Authentication** (Email/Password, for the admin account).
3. Enable **Firestore Database** (production mode).
4. Enable **Storage**.
5. Enable **Hosting**.
6. Under Project Settings → General → "Your apps", create a **Web app** and copy the config values.

## 3. Configure environment variables

Copy `.env.example` to `.env` and fill in the values from step 2:

```bash
cp .env.example .env
```

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

## 4. Set up the admin user (for managing journals)

1. In Firebase Console → Authentication, add a user (your admin email/password).
2. In Firestore, create a document at `users/{uid}` (use the UID from step above) with:
   ```json
   { "role": "admin" }
   ```
   This is what `firestore.rules` and `storage.rules` check to authorize journal management.

## 5. Install the Firebase CLI and log in

```bash
npm install -g firebase-tools
firebase login
```

Update `.firebaserc` with your actual project ID (replace `your-firebase-project-id`).

## 6. Deploy Firestore rules, Storage rules, and indexes

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## 7. Configure and deploy Cloud Functions (email notifications)

The functions in `functions/index.js` send an email whenever a new contact
message or paper submission is created. They use Gmail SMTP via `nodemailer`.

1. Create an [App Password](https://myaccount.google.com/apppasswords) for the Gmail account you want to send from.
2. Set the required secrets:
   ```bash
   firebase functions:secrets:set SMTP_USER
   firebase functions:secrets:set SMTP_PASS
   firebase functions:secrets:set ADMIN_EMAIL
   ```
3. Deploy:
   ```bash
   firebase deploy --only functions
   ```

## 8. Seed sample journals (optional but recommended)

1. Firebase Console → Project Settings → Service Accounts → "Generate new private key".
2. Save the downloaded file as `scripts/serviceAccountKey.json`.
3. Run:
   ```bash
   node scripts/seed-journals.js
   ```

## 9. Run locally

```bash
npm run dev
```

## 10. Build and deploy the website

```bash
npm run build
firebase deploy --only hosting
```

The `firebase.json` hosting config already includes the SPA rewrite rule so
client-side routes (e.g. `/journals/some-id`) work correctly on refresh —
no 404 issues.

## Firestore Collections

| Collection         | Purpose                                     | Write access               |
| ------------------ | -------------------------------------------- | --------------------------- |
| `journals`         | Journal listing & detail data                | Admin only                  |
| `submissions`      | Paper submission records                     | Public create, admin read   |
| `contact_messages` | Contact form submissions                     | Public create, admin read   |
| `newsletter`       | Newsletter email subscriptions               | Public create, admin read   |
| `users`            | Maps a Firebase Auth UID to a role (admin)   | Admin only                  |
| `settings`         | Site-wide configuration (optional)           | Admin only                  |

## Notes

- Building an actual admin dashboard UI for managing journals (add/edit/delete)
  was out of scope for the public-facing pages requested, but `journalService.js`
  already contains fully working `createJournal`, `updateJournal`, and
  `deleteJournal` functions ready to be wired into an `/admin` route if needed.
- The Google Maps embed on the Contact page uses a public, keyless embed URL.
  For production, swap in your real office coordinates (and optionally a Maps
  JavaScript API key for a richer embed).
- All pages fall back to sample content if Firestore has no data yet, so the
  site looks complete even before you seed journals.
