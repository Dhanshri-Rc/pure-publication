/**
 * seed-journals.js
 *
 * Populates the Firestore "journals" collection with sample data so the
 * Journals page has real content to display immediately after setup.
 *
 * Usage:
 *   1. Download a service account key from
 *      Firebase Console -> Project Settings -> Service Accounts -> Generate new private key
 *   2. Save it as scripts/serviceAccountKey.json (already gitignored)
 *   3. Run: node scripts/seed-journals.js
 */

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const journals = [
  {
    title: "International Journal of Applied Sciences",
    coverImage: "",
    description:
      "Multidisciplinary research in applied physics, chemistry, and materials science.",
    issn: "2456-1010",
    frequency: "Quarterly",
    category: "Science & Technology",
    publisher: "Pure Publication",
    currentIssue: "Volume 12, Issue 2, 2026",
    status: "Actively Publishing",
  },
  {
    title: "Journal of Clinical & Medical Research",
    coverImage: "",
    description:
      "Peer-reviewed clinical studies, case reports, and public health research.",
    issn: "2456-2020",
    frequency: "Monthly",
    category: "Medicine & Health",
    publisher: "Pure Publication",
    currentIssue: "Volume 9, Issue 7, 2026",
    status: "Actively Publishing",
  },
  {
    title: "Journal of Social Science & Humanities",
    coverImage: "",
    description:
      "Contemporary issues in sociology, psychology, and political science.",
    issn: "2456-3030",
    frequency: "Bi-Monthly",
    category: "Social Sciences",
    publisher: "Pure Publication",
    currentIssue: "Volume 6, Issue 3, 2026",
    status: "Actively Publishing",
  },
  {
    title: "Journal of Engineering Innovations",
    coverImage: "",
    description:
      "Cutting-edge research in mechanical, civil, and electrical engineering.",
    issn: "2456-4040",
    frequency: "Quarterly",
    category: "Engineering",
    publisher: "Pure Publication",
    currentIssue: "Volume 8, Issue 1, 2026",
    status: "Actively Publishing",
  },
  {
    title: "Journal of Management & Commerce",
    coverImage: "",
    description:
      "Research in business strategy, finance, marketing, and commerce.",
    issn: "2456-5050",
    frequency: "Half-Yearly",
    category: "Management & Commerce",
    publisher: "Pure Publication",
    currentIssue: "Volume 5, Issue 1, 2026",
    status: "Actively Publishing",
  },
  {
    title: "Journal of Humanities & Culture",
    coverImage: "",
    description:
      "Explorations in literature, history, philosophy, and cultural studies.",
    issn: "2456-6060",
    frequency: "Annually",
    category: "Humanities",
    publisher: "Pure Publication",
    currentIssue: "Volume 4, 2025",
    status: "Actively Publishing",
  },
];

async function seed() {
  const batch = db.batch();
  journals.forEach((journal) => {
    const ref = db.collection("journals").doc();
    batch.set(ref, { ...journal, createdAt: FieldValue.serverTimestamp() });
  });
  await batch.commit();
  console.log(`Seeded ${journals.length} journals successfully.`);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
