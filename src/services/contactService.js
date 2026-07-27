import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const CONTACT_COLLECTION = "contact_messages";

/**
 * Store a contact form submission in Firestore. A Cloud Function
 * (see functions/index.js) listens for new documents in this collection
 * and emails the admin automatically.
 */
export async function submitContactMessage({
  name,
  email,
  phone,
  subject,
  message,
}) {
  const docRef = await addDoc(collection(db, CONTACT_COLLECTION), {
    name,
    email,
    phone: phone || "",
    subject,
    message,
    status: "unread",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
