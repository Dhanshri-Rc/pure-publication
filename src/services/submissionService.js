import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { generateSubmissionId } from "../utils/helpers";

const SUBMISSIONS_COLLECTION = "submissions";

/**
 * Upload the manuscript file (PDF/DOC/DOCX) to Firebase Storage.
 */
async function uploadManuscript(file, submissionId) {
  const storageRef = ref(
    storage,
    `submissions/${submissionId}/${file.name}`
  );
  const snapshot = await uploadBytes(storageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return { url, path: snapshot.ref.fullPath, name: file.name };
}

/**
 * Submit a full paper submission: uploads the file to Storage and writes
 * the metadata + submission record to Firestore.
 */
export async function submitPaper(formData, file) {
  const submissionId = generateSubmissionId();
  const uploadedFile = await uploadManuscript(file, submissionId);

  await addDoc(collection(db, SUBMISSIONS_COLLECTION), {
    submissionId,
    authorName: formData.authorName,
    email: formData.email,
    phone: formData.phone,
    affiliation: formData.affiliation,
    paperTitle: formData.paperTitle,
    abstract: formData.abstract,
    keywords: formData.keywords,
    journal: formData.journal,
    uploadedFile,
    status: "submitted",
    submittedAt: serverTimestamp(),
  });

  return submissionId;
}
