import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase";

const JOURNALS_COLLECTION = "journals";

/**
 * Fetch all journals, optionally filtered by category.
 */
export async function getJournals(category) {
  const journalsRef = collection(db, JOURNALS_COLLECTION);
  const q =
    category && category !== "All"
      ? query(
          journalsRef,
          where("category", "==", category),
          orderBy("createdAt", "desc")
        )
      : query(journalsRef, orderBy("createdAt", "desc"));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Fetch a single journal by its Firestore document id.
 */
export async function getJournalById(id) {
  const journalRef = doc(db, JOURNALS_COLLECTION, id);
  const snapshot = await getDoc(journalRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

/**
 * Upload a journal cover image to Firebase Storage and return its URL.
 */
export async function uploadJournalCover(file, journalSlug) {
  const storageRef = ref(storage, `journal-covers/${journalSlug}-${Date.now()}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

/**
 * Create a new journal document. Requires admin auth (enforced by security rules).
 */
export async function createJournal(journalData, coverFile) {
  let coverImage = journalData.coverImage || "";
  if (coverFile) {
    coverImage = await uploadJournalCover(coverFile, journalData.title);
  }

  const docRef = await addDoc(collection(db, JOURNALS_COLLECTION), {
    ...journalData,
    coverImage,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

/**
 * Update an existing journal document. Requires admin auth.
 */
export async function updateJournal(id, journalData, coverFile) {
  const journalRef = doc(db, JOURNALS_COLLECTION, id);
  const updates = { ...journalData };

  if (coverFile) {
    updates.coverImage = await uploadJournalCover(coverFile, journalData.title || id);
  }

  await updateDoc(journalRef, updates);
}

/**
 * Delete a journal document and its cover image. Requires admin auth.
 */
export async function deleteJournal(id, coverImagePath) {
  await deleteDoc(doc(db, JOURNALS_COLLECTION, id));

  if (coverImagePath) {
    try {
      await deleteObject(ref(storage, coverImagePath));
    } catch (err) {
      // Cover may already be removed; safe to ignore.
      console.warn("Could not delete cover image:", err.message);
    }
  }
}
