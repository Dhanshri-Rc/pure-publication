import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  Tags,
  UploadCloud,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Copy,
  File as FileIcon,
} from "lucide-react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import { submitPaper } from "../services/submissionService";
import {
  SUBMISSION_FILE_EXTENSIONS,
  SUBMISSION_FILE_TYPES,
  MAX_UPLOAD_SIZE_MB,
  JOURNAL_CATEGORIES,
} from "../utils/constants";
import { classNames } from "../utils/helpers";

const STEPS = ["Author Details", "Paper Details", "Upload Files", "Confirmation"];

export default function SubmitPaper() {
  const [step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const stepFields = [
    ["authorName", "email", "phone", "affiliation"],
    ["paperTitle", "abstract", "keywords", "journal"],
  ];

  async function goNext() {
    if (step < 2) {
      const valid = await trigger(stepFields[step]);
      if (!valid) return;
      setStep((s) => s + 1);
    } else if (step === 2) {
      if (!file) {
        setFileError("Please upload your manuscript file.");
        return;
      }
      await finalizeSubmission();
    }
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleFileChange(e) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!SUBMISSION_FILE_TYPES.includes(selected.type)) {
      setFileError("Only PDF, DOC, or DOCX files are allowed.");
      return;
    }
    if (selected.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
      setFileError(`File must be smaller than ${MAX_UPLOAD_SIZE_MB}MB.`);
      return;
    }
    setFileError("");
    setFile(selected);
  }

  async function finalizeSubmission() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const values = getValues();
      const id = await submitPaper(values, file);
      setSubmissionId(id);
      setStep(3);
    } catch (err) {
      setSubmitError(
        "We couldn't complete your submission. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Seo
        title="Submit Paper"
        description="Submit your manuscript to Pure Publication through our secure multi-step submission portal."
        path="/submit-paper"
      />

      <Hero
        breadcrumb="Submit Paper"
        eyebrow="Author Portal"
        title="Submit Your"
        highlight="Manuscript"
        description="Complete the steps below to submit your paper for peer review. You'll receive a unique submission ID for tracking."
        image="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
      />

      <section className="py-20">
        <div className="container-custom max-w-3xl">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-14">
            {STEPS.map((label, i) => (
              <div key={label} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    animate={{
                      scale: step === i ? 1.1 : 1,
                      backgroundColor: i <= step ? "#f7941e" : "#eef1f8",
                    }}
                    className={classNames(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm",
                      i <= step ? "text-white" : "text-navy-400"
                    )}
                  >
                    {i < step ? <CheckCircle2 size={18} /> : i + 1}
                  </motion.div>
                  <span className="text-xs mt-2 text-navy-500 hidden sm:block text-center">
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={classNames(
                      "h-0.5 flex-1 -mt-6 transition-colors duration-500",
                      i < step ? "bg-amber-500" : "bg-navy-100"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-card p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-heading font-semibold text-navy-900 mb-6">
                    Author Details
                  </h3>
                  <Input
                    label="Full Name"
                    icon={User}
                    placeholder="Dr. Jane Smith"
                    error={errors.authorName?.message}
                    {...register("authorName", { required: "Full name is required" })}
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Email Address"
                      icon={Mail}
                      type="email"
                      placeholder="jane@university.edu"
                      error={errors.email?.message}
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                      })}
                    />
                    <Input
                      label="Phone Number"
                      icon={Phone}
                      type="tel"
                      placeholder="+91 98765 43210"
                      error={errors.phone?.message}
                      {...register("phone", { required: "Phone number is required" })}
                    />
                  </div>
                  <Input
                    label="Affiliation / Institution"
                    icon={Building2}
                    placeholder="University of Delhi"
                    error={errors.affiliation?.message}
                    {...register("affiliation", { required: "Affiliation is required" })}
                  />
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-heading font-semibold text-navy-900 mb-6">
                    Paper Details
                  </h3>
                  <Input
                    label="Paper Title"
                    icon={FileText}
                    placeholder="A Novel Approach to..."
                    error={errors.paperTitle?.message}
                    {...register("paperTitle", { required: "Paper title is required" })}
                  />
                  <Textarea
                    label="Abstract"
                    placeholder="Summarize your research (150-300 words)..."
                    rows={5}
                    error={errors.abstract?.message}
                    {...register("abstract", { required: "Abstract is required" })}
                  />
                  <Input
                    label="Keywords (comma separated)"
                    icon={Tags}
                    placeholder="machine learning, data science, AI"
                    error={errors.keywords?.message}
                    {...register("keywords", { required: "Keywords are required" })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-navy-700 mb-2">
                      Target Journal Category
                    </label>
                    <select
                      className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-900 outline-none transition-all duration-300 focus:border-amber-400 focus:shadow-glow"
                      {...register("journal", { required: "Please select a category" })}
                    >
                      <option value="">Select a category</option>
                      {JOURNAL_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.journal && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.journal.message}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-xl font-heading font-semibold text-navy-900 mb-6">
                    Upload Files
                  </h3>
                  <label
                    htmlFor="manuscript-upload"
                    className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-navy-200 hover:border-amber-400 rounded-2xl py-14 px-6 cursor-pointer transition-all duration-300 hover:bg-amber-50/40"
                  >
                    <UploadCloud className="text-amber-500" size={40} />
                    <p className="text-navy-600 font-medium">
                      Click to upload your manuscript
                    </p>
                    <p className="text-navy-400 text-xs">
                      PDF, DOC, or DOCX — up to {MAX_UPLOAD_SIZE_MB}MB
                    </p>
                    <input
                      id="manuscript-upload"
                      type="file"
                      accept={SUBMISSION_FILE_EXTENSIONS}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  {file && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 mt-4 bg-navy-50 rounded-xl px-4 py-3"
                    >
                      <FileIcon className="text-navy-500" size={20} />
                      <span className="text-sm text-navy-700 truncate">{file.name}</span>
                      <span className="text-xs text-navy-400 ml-auto">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </motion.div>
                  )}
                  {fileError && <p className="mt-3 text-xs text-red-500">{fileError}</p>}
                  {submitError && <p className="mt-3 text-sm text-red-500">{submitError}</p>}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold text-navy-900 mb-3">
                    Submission Successful!
                  </h3>
                  <p className="text-navy-500 mb-6 max-w-md mx-auto">
                    Your paper has been submitted for review. Save your submission ID
                    to track its status.
                  </p>
                  <div className="inline-flex items-center gap-3 bg-navy-50 rounded-full px-6 py-3 mb-8">
                    <span className="font-mono font-semibold text-navy-900">
                      {submissionId}
                    </span>
                    <button
                      onClick={() => navigator.clipboard.writeText(submissionId)}
                      aria-label="Copy submission ID"
                      className="text-navy-400 hover:text-amber-500 transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                  <div>
                    <Button to="/" variant="ghost">
                      Back to Home
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 3 && (
              <div className="flex justify-between mt-10">
                <Button
                  variant="ghost"
                  onClick={goBack}
                  disabled={step === 0}
                  className={step === 0 ? "invisible" : ""}
                >
                  <ArrowLeft size={16} /> Back
                </Button>
                <Button onClick={goNext} loading={submitting}>
                  {step === 2 ? "Submit Paper" : "Continue"}
                  {step < 2 && <ArrowRight size={16} />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
