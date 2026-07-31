// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User,
//   Mail,
//   Phone,
//   Building2,
//   FileText,
//   Tags,
//   UploadCloud,
//   CheckCircle2,
//   ArrowLeft,
//   ArrowRight,
//   Copy,
//   File as FileIcon,
// } from "lucide-react";
// import Seo from "../components/Seo";
// import Hero from "../components/Hero";
// import Input from "../components/Input";
// import Textarea from "../components/Textarea";
// import Button from "../components/Button";
// import { submitPaper } from "../services/submissionService";
// import {
//   SUBMISSION_FILE_EXTENSIONS,
//   SUBMISSION_FILE_TYPES,
//   MAX_UPLOAD_SIZE_MB,
//   JOURNAL_CATEGORIES,
// } from "../utils/constants";
// import { classNames } from "../utils/helpers";

// const STEPS = ["Author Details", "Paper Details", "Upload Files", "Confirmation"];

// export default function SubmitPaper() {
//   const [step, setStep] = useState(0);
//   const [file, setFile] = useState(null);
//   const [fileError, setFileError] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [submissionId, setSubmissionId] = useState("");
//   const [submitError, setSubmitError] = useState("");

//   const {
//     register,
//     handleSubmit,
//     trigger,
//     getValues,
//     formState: { errors },
//   } = useForm({ mode: "onTouched" });

//   const stepFields = [
//     ["authorName", "email", "phone", "affiliation"],
//     ["paperTitle", "abstract", "keywords", "journal"],
//   ];

//   async function goNext() {
//     if (step < 2) {
//       const valid = await trigger(stepFields[step]);
//       if (!valid) return;
//       setStep((s) => s + 1);
//     } else if (step === 2) {
//       if (!file) {
//         setFileError("Please upload your manuscript file.");
//         return;
//       }
//       await finalizeSubmission();
//     }
//   }

//   function goBack() {
//     setStep((s) => Math.max(0, s - 1));
//   }

//   function handleFileChange(e) {
//     const selected = e.target.files?.[0];
//     if (!selected) return;
//     if (!SUBMISSION_FILE_TYPES.includes(selected.type)) {
//       setFileError("Only PDF, DOC, or DOCX files are allowed.");
//       return;
//     }
//     if (selected.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
//       setFileError(`File must be smaller than ${MAX_UPLOAD_SIZE_MB}MB.`);
//       return;
//     }
//     setFileError("");
//     setFile(selected);
//   }

//   async function finalizeSubmission() {
//     setSubmitting(true);
//     setSubmitError("");
//     try {
//       const values = getValues();
//       const id = await submitPaper(values, file);
//       setSubmissionId(id);
//       setStep(3);
//     } catch (err) {
//       setSubmitError(
//         "We couldn't complete your submission. Please check your connection and try again."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <>
//       <Seo
//         title="Submit Paper"
//         description="Submit your manuscript to Pure Publication through our secure multi-step submission portal."
//         path="/submit-paper"
//       />

//       <Hero
//         breadcrumb="Submit Paper"
//         eyebrow="Author Portal"
//         title="Submit Your"
//         highlight="Manuscript"
//         description="Complete the steps below to submit your paper for peer review. You'll receive a unique submission ID for tracking."
//         image="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop"
//       />

//       <section className="py-20">
//         <div className="container-custom max-w-3xl">
//           {/* Progress Steps */}
//           <div className="flex items-center justify-between mb-14">
//             {STEPS.map((label, i) => (
//               <div key={label} className="flex-1 flex items-center">
//                 <div className="flex flex-col items-center flex-1">
//                   <motion.div
//                     animate={{
//                       scale: step === i ? 1.1 : 1,
//                       backgroundColor: i <= step ? "#f7941e" : "#eef1f8",
//                     }}
//                     className={classNames(
//                       "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm",
//                       i <= step ? "text-white" : "text-navy-400"
//                     )}
//                   >
//                     {i < step ? <CheckCircle2 size={18} /> : i + 1}
//                   </motion.div>
//                   <span className="text-xs mt-2 text-navy-500 hidden sm:block text-center">
//                     {label}
//                   </span>
//                 </div>
//                 {i < STEPS.length - 1 && (
//                   <div
//                     className={classNames(
//                       "h-0.5 flex-1 -mt-6 transition-colors duration-500",
//                       i < step ? "bg-amber-500" : "bg-navy-100"
//                     )}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="bg-white rounded-3xl shadow-card p-6 sm:p-10">
//             <AnimatePresence mode="wait">
//               {step === 0 && (
//                 <motion.div
//                   key="step0"
//                   initial={{ opacity: 0, x: 30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -30 }}
//                   transition={{ duration: 0.4 }}
//                   className="space-y-5"
//                 >
//                   <h3 className="text-xl font-heading font-semibold text-navy-900 mb-6">
//                     Author Details
//                   </h3>
//                   <Input
//                     label="Full Name"
//                     icon={User}
//                     placeholder="Dr. Jane Smith"
//                     error={errors.authorName?.message}
//                     {...register("authorName", { required: "Full name is required" })}
//                   />
//                   <div className="grid sm:grid-cols-2 gap-5">
//                     <Input
//                       label="Email Address"
//                       icon={Mail}
//                       type="email"
//                       placeholder="jane@university.edu"
//                       error={errors.email?.message}
//                       {...register("email", {
//                         required: "Email is required",
//                         pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
//                       })}
//                     />
//                     <Input
//                       label="Phone Number"
//                       icon={Phone}
//                       type="tel"
//                       placeholder="+91 98765 43210"
//                       error={errors.phone?.message}
//                       {...register("phone", { required: "Phone number is required" })}
//                     />
//                   </div>
//                   <Input
//                     label="Affiliation / Institution"
//                     icon={Building2}
//                     placeholder="University of Delhi"
//                     error={errors.affiliation?.message}
//                     {...register("affiliation", { required: "Affiliation is required" })}
//                   />
//                 </motion.div>
//               )}

//               {step === 1 && (
//                 <motion.div
//                   key="step1"
//                   initial={{ opacity: 0, x: 30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -30 }}
//                   transition={{ duration: 0.4 }}
//                   className="space-y-5"
//                 >
//                   <h3 className="text-xl font-heading font-semibold text-navy-900 mb-6">
//                     Paper Details
//                   </h3>
//                   <Input
//                     label="Paper Title"
//                     icon={FileText}
//                     placeholder="A Novel Approach to..."
//                     error={errors.paperTitle?.message}
//                     {...register("paperTitle", { required: "Paper title is required" })}
//                   />
//                   <Textarea
//                     label="Abstract"
//                     placeholder="Summarize your research (150-300 words)..."
//                     rows={5}
//                     error={errors.abstract?.message}
//                     {...register("abstract", { required: "Abstract is required" })}
//                   />
//                   <Input
//                     label="Keywords (comma separated)"
//                     icon={Tags}
//                     placeholder="machine learning, data science, AI"
//                     error={errors.keywords?.message}
//                     {...register("keywords", { required: "Keywords are required" })}
//                   />
//                   <div>
//                     <label className="block text-sm font-medium text-navy-700 mb-2">
//                       Target Journal Category
//                     </label>
//                     <select
//                       className="w-full rounded-xl border border-navy-100 bg-white px-4 py-3 text-navy-900 outline-none transition-all duration-300 focus:border-amber-400 focus:shadow-glow"
//                       {...register("journal", { required: "Please select a category" })}
//                     >
//                       <option value="">Select a category</option>
//                       {JOURNAL_CATEGORIES.filter((c) => c !== "All").map((cat) => (
//                         <option key={cat} value={cat}>
//                           {cat}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.journal && (
//                       <p className="mt-1.5 text-xs text-red-500">{errors.journal.message}</p>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               {step === 2 && (
//                 <motion.div
//                   key="step2"
//                   initial={{ opacity: 0, x: 30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -30 }}
//                   transition={{ duration: 0.4 }}
//                 >
//                   <h3 className="text-xl font-heading font-semibold text-navy-900 mb-6">
//                     Upload Files
//                   </h3>
//                   <label
//                     htmlFor="manuscript-upload"
//                     className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-navy-200 hover:border-amber-400 rounded-2xl py-14 px-6 cursor-pointer transition-all duration-300 hover:bg-amber-50/40"
//                   >
//                     <UploadCloud className="text-amber-500" size={40} />
//                     <p className="text-navy-600 font-medium">
//                       Click to upload your manuscript
//                     </p>
//                     <p className="text-navy-400 text-xs">
//                       PDF, DOC, or DOCX — up to {MAX_UPLOAD_SIZE_MB}MB
//                     </p>
//                     <input
//                       id="manuscript-upload"
//                       type="file"
//                       accept={SUBMISSION_FILE_EXTENSIONS}
//                       className="hidden"
//                       onChange={handleFileChange}
//                     />
//                   </label>

//                   {file && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-center gap-3 mt-4 bg-navy-50 rounded-xl px-4 py-3"
//                     >
//                       <FileIcon className="text-navy-500" size={20} />
//                       <span className="text-sm text-navy-700 truncate">{file.name}</span>
//                       <span className="text-xs text-navy-400 ml-auto">
//                         {(file.size / (1024 * 1024)).toFixed(2)} MB
//                       </span>
//                     </motion.div>
//                   )}
//                   {fileError && <p className="mt-3 text-xs text-red-500">{fileError}</p>}
//                   {submitError && <p className="mt-3 text-sm text-red-500">{submitError}</p>}
//                 </motion.div>
//               )}

//               {step === 3 && (
//                 <motion.div
//                   key="step3"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="text-center py-10"
//                 >
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
//                   >
//                     <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
//                   </motion.div>
//                   <h3 className="text-2xl font-heading font-bold text-navy-900 mb-3">
//                     Submission Successful!
//                   </h3>
//                   <p className="text-navy-500 mb-6 max-w-md mx-auto">
//                     Your paper has been submitted for review. Save your submission ID
//                     to track its status.
//                   </p>
//                   <div className="inline-flex items-center gap-3 bg-navy-50 rounded-full px-6 py-3 mb-8">
//                     <span className="font-mono font-semibold text-navy-900">
//                       {submissionId}
//                     </span>
//                     <button
//                       onClick={() => navigator.clipboard.writeText(submissionId)}
//                       aria-label="Copy submission ID"
//                       className="text-navy-400 hover:text-amber-500 transition-colors"
//                     >
//                       <Copy size={16} />
//                     </button>
//                   </div>
//                   <div>
//                     <Button to="/" variant="ghost">
//                       Back to Home
//                     </Button>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {step < 3 && (
//               <div className="flex justify-between mt-10">
//                 <Button
//                   variant="ghost"
//                   onClick={goBack}
//                   disabled={step === 0}
//                   className={step === 0 ? "invisible" : ""}
//                 >
//                   <ArrowLeft size={16} /> Back
//                 </Button>
//                 <Button onClick={goNext} loading={submitting}>
//                   {step === 2 ? "Submit Paper" : "Continue"}
//                   {step < 2 && <ArrowRight size={16} />}
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }


import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Copyright,
  Eye,
  File as FileIcon,
  FileCheck2,
  FileText,
  Globe2,
  Lock,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";

import Seo from "../components/Seo";
import { submitPaper } from "../services/submissionService";

import {
  SUBMISSION_FILE_EXTENSIONS,
  SUBMISSION_FILE_TYPES,
  MAX_UPLOAD_SIZE_MB,
  JOURNAL_CATEGORIES,
} from "../utils/constants";

import submitPaperBg from "../assets/images/submit-paper-bg.png";

const STEPS = [
  "Manuscript Details",
  "Authors & Affiliations",
  "Upload Files",
  "Review & Confirmation",
  "Submit",
];

const MANUSCRIPT_TYPES = [
  "Research Article",
  "Review Article",
  "Short Communication",
  "Case Study",
  "Conference Paper",
  "Book Chapter",
  "Editorial",
];

const SUBJECT_AREAS = [
  "Computer Science and Engineering",
  "Medical and Health Sciences",
  "Pharmaceutical Sciences",
  "Management and Commerce",
  "Engineering and Technology",
  "Life Sciences",
  "Social Sciences",
  "Environmental Sciences",
  "Law and Humanities",
  "Multidisciplinary",
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const inputClass = `
  h-[47px]
  w-full
  rounded-[6px]
  border
  border-[#dce4e2]
  bg-white
  px-4
  text-[12px]
  text-[#173d3a]
  outline-none
  transition-all
  duration-300
  placeholder:text-[#8b9896]
  hover:border-[#bdcbc8]
  focus:border-[#d4a257]
  focus:shadow-[0_0_0_4px_rgba(212,162,87,0.10)]
`;

const textareaClass = `
  min-h-[126px]
  w-full
  resize-y
  rounded-[6px]
  border
  border-[#dce4e2]
  bg-white
  px-4
  py-3
  text-[12px]
  leading-6
  text-[#173d3a]
  outline-none
  transition-all
  duration-300
  placeholder:text-[#8b9896]
  hover:border-[#bdcbc8]
  focus:border-[#d4a257]
  focus:shadow-[0_0_0_4px_rgba(212,162,87,0.10)]
`;

function FieldLabel({ children, required = false }) {
  return (
    <label className="mb-2 block text-[13px] font-[550] text-[#163d3a]">
      {children}

      {required && <span className="ml-1 text-[#d95d55]">*</span>}
    </label>
  );
}

function ErrorText({ message }) {
  if (!message) return null;

  return (
    <motion.p
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-[12px] font-medium text-red-500"
    >
      {message}
    </motion.p>
  );
}

function RadioOption({ name, value, label, register }) {
  return (
    <label className="group flex cursor-pointer items-center gap-2 text-[12px] text-[#526461]">
      <input
        type="radio"
        value={value}
        {...register(name)}
        className="peer sr-only"
      />

      <span
        className="
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-full
          border
          border-[#aab9b6]
          transition-all
          duration-300
          group-hover:border-[#073f40]
          peer-checked:border-[#073f40]
          peer-checked:bg-[#073f40]
        "
      >
        <Check
          size={10}
          className="text-white opacity-0 peer-checked:opacity-100"
        />
      </span>

      {label}
    </label>
  );
}

function GuidelineItem({ icon: Icon, title, description }) {
  return (
    <motion.button
      type="button"
      whileHover={{ x: 4 }}
      className="
        group
        flex
        w-full
        items-center
        gap-3
        rounded-[7px]
        px-1
        py-2.5
        text-left
        transition-colors
        hover:bg-[#f8faf9]
      "
    >
      <span
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#dae3e1]
          text-[#073f40]
          transition-all
          duration-300
          group-hover:border-[#d4a257]
          group-hover:bg-[#fff9ef]
          group-hover:text-[#c68e33]
        "
      >
        <Icon size={16} strokeWidth={1.8} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold text-[#173d3a]">
          {title}
        </span>

        <span className="mt-0.5 block text-[11px] leading-4 text-[#7a8987]">
          {description}
        </span>
      </span>

      <ChevronRight
        size={14}
        className="text-[#667875] transition-all group-hover:translate-x-1 group-hover:text-[#d4a257]"
      />
    </motion.button>
  );
}

function BenefitItem({ icon: Icon, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group flex items-start gap-3 px-3 py-4"
    >
      <span
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#d5dfdc]
          text-[#073f40]
          transition-all
          duration-300
          group-hover:border-[#d4a257]
          group-hover:bg-[#fff9ef]
          group-hover:text-[#c68e33]
        "
      >
        <Icon size={19} strokeWidth={1.8} />
      </span>

      <span>
        <span className="block text-[13px] font-[550] text-[#173d3a]">
          {title}
        </span>

        <span className="mt-1 block text-[11px] leading-4 text-[#72817e]">
          {description}
        </span>
      </span>
    </motion.div>
  );
}

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
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      paperTitle: "",
      abstract: "",
      keywords: "",
      journal: "",
      manuscriptType: "",
      subjectArea: "",
      revisedSubmission: "no",
      submittedElsewhere: "no",

      authorName: "",
      email: "",
      phone: "",
      affiliation: "",
      country: "",
      coAuthors: "",

      declaration: false,
    },
  });

  const titleValue = watch("paperTitle") || "";
  const abstractValue = watch("abstract") || "";

  const stepFields = [
    [
      "paperTitle",
      "abstract",
      "journal",
      "manuscriptType",
      "subjectArea",
      "keywords",
    ],
    ["authorName", "email", "phone", "affiliation", "country"],
  ];

  function scrollToForm() {
    window.requestAnimationFrame(() => {
      document
        .getElementById("submission-form")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function goNext() {
    setSubmitError("");

    if (step === 0 || step === 1) {
      const valid = await trigger(stepFields[step]);

      if (!valid) return;

      setStep((current) => current + 1);
      scrollToForm();
      return;
    }

    if (step === 2) {
      if (!file) {
        setFileError("Please upload your manuscript file.");
        return;
      }

      setFileError("");
      setStep(3);
      scrollToForm();
      return;
    }

    if (step === 3) {
      const valid = await trigger("declaration");

      if (!valid) return;

      await handleSubmit(finalizeSubmission)();
    }
  }

  function goBack() {
    setSubmitError("");
    setStep((current) => Math.max(0, current - 1));
    scrollToForm();
  }

  function handleFileChange(event) {
    const selected = event.target.files?.[0];

    if (!selected) return;

    const extension = selected.name.split(".").pop()?.toLowerCase();

    const allowedExtension = ["pdf", "doc", "docx"].includes(extension);

    const allowedMime =
      !selected.type || SUBMISSION_FILE_TYPES.includes(selected.type);

    if (!allowedExtension && !allowedMime) {
      setFile(null);
      setFileError("Only PDF, DOC, or DOCX files are allowed.");
      event.target.value = "";
      return;
    }

    if (selected.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
      setFile(null);
      setFileError(`File must be smaller than ${MAX_UPLOAD_SIZE_MB}MB.`);
      event.target.value = "";
      return;
    }

    setFile(selected);
    setFileError("");
  }

  async function finalizeSubmission() {
    setSubmitting(true);
    setSubmitError("");

    try {
      /*
       * Firebase logic remains the same.
       * The complete react-hook-form values and selected file
       * are passed to your existing submission service.
       */
      const values = getValues();

      const id = await submitPaper(values, file);

      setSubmissionId(id);
      setStep(4);
      scrollToForm();
    } catch (error) {
      console.error("Paper submission failed:", error);

      setSubmitError(
        "We couldn't complete your submission. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const reviewValues = getValues();

  return (
    <>
      <Seo
        title="Submit Paper | Pure Publications"
        description="Submit your manuscript to Pure Publications through our secure multi-step academic journal submission portal."
        keywords="submit paper, manuscript submission, academic journal, peer review, Pure Publications"
        path="/submit-paper"
      />

      <main className="overflow-hidden bg-white">
        {/* HERO */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden border-b border-[#edf1f0] bg-white"
        >
          <div className="relative mx-auto min-h-[390px] sm:min-h-[430px] lg:min-h-[470px] w-full max-w-[1440px]">
            <motion.img
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              src={submitPaperBg}
              alt="Research books, academic manuscript and laptop"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent md:hidden" />

            <div
              className="
                relative
                z-10
                mx-auto
                flex
                min-h-[365px]
                w-full
                max-w-[1240px]
                items-center
                px-5
                py-12
                sm:px-7
                lg:px-10
              "
            >
              <div className="w-full max-w-[580px]">
                <motion.div
                  variants={fadeUp}
                  className="mb-5 mt-16 flex items-center gap-2 text-[12px] font-medium text-[#72807e]"
                >
                  <span>Home</span>
                  <ChevronRight size={13} />
                  <span className="font-semibold text-[#073f40]">
                    Submit Paper
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="
                    font-serif
                    font-[600]
                    leading-[1.08]
                    tracking-[-0.025em]
                    text-[#073f40]
                    text-[28px]
             sm:text-[32px]
             lg:text-[36px]
                  "
                >
                  Share Your Research.

                  <span className="mt-1 block text-[#d09a45]">
                    Make an Impact.
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="mt-5 max-w-[465px] text-[14px] sm:text-[15px] leading-7 text-[#596966]"
                >
                  Submit your manuscript to our peer-reviewed journals
                  <br className="hidden sm:block" />
                  and contribute to global knowledge.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="
                    mt-7
                    grid
                    max-w-[650px]
                    grid-cols-2
                    overflow-hidden
                    rounded-[7px]
                    bg-[#073f40]
                    shadow-[0_15px_32px_rgba(7,63,64,0.20)]
                    sm:grid-cols-4
                  "
                >
                  {[
                    {
                      icon: BookOpen,
                      value: "120+",
                      label: "Journals",
                    },
                    {
                      icon: FileText,
                      value: "1500+",
                      label: "Articles Published",
                    },
                    {
                      icon: Globe2,
                      value: "5+",
                      label: "Countries",
                    },
                    {
                      icon: Award,
                      value: "95%",
                      label: "Author Satisfaction",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.label}
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                        }}
                        className={`
                          flex
                          min-h-[76px]
                          items-center
                          gap-3
                          px-2
                          py-3
                          ${index > 0 ? "border-l border-white/15" : ""}
                        `}
                      >
                        <Icon
                          size={24}
                          strokeWidth={1.7}
                          className="shrink-0 text-[#d6a650]"
                        />

                        <span>
                          <span className="block font-serif text-[20px] font-[550] leading-none text-white">
                            {item.value}
                          </span>

                          <span className="mt-1.5 block text-[10px] leading-3 text-white/80">
                            {item.label}
                          </span>
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SUBMISSION AREA */}
        <section
          id="submission-form"
          className="scroll-mt-24 bg-[#fefefe] px-4 pb-16 pt-6 sm:px-6 lg:px-8"
        >
          <div className="mx-auto w-full max-w-[1240px]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="text-center"
            >
              <span className="text-[10px] font-[550] uppercase tracking-[0.12em] text-[#d19a44]">
                Submission Process
              </span>

              <h2 className="mt-2 font-serif text-[22px] font-[550] text-[#073f40] sm:text-[28px]">
                Submit Your Manuscript in 5 Easy Steps
              </h2>

              <span className="mx-auto mt-3 block h-[2px] w-7 bg-[#d4a257]" />
            </motion.div>

            {/* PROGRESS */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto mt-8 max-w-[1020px]"
            >
              <div className="relative flex justify-between">
                <div className="absolute left-[8%] right-[8%] top-[18px] h-px bg-[#dce4e2]" />

                <motion.div
                  animate={{
                    width: `${Math.min(
                      (step / (STEPS.length - 1)) * 84,
                      84
                    )}%`,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-[8%] top-[18px] z-[1] h-px bg-[#073f40]"
                />

                {STEPS.map((label, index) => {
                  const completed = index < step;
                  const active = index === step;

                  return (
                    <div
                      key={label}
                      className="relative z-10 flex w-[19%] flex-col items-center text-center"
                    >
                      <motion.span
                        animate={{
                          scale: active ? 1.08 : 1,
                          backgroundColor:
                            active || completed ? "#073f40" : "#ffffff",
                          color:
                            active || completed ? "#ffffff" : "#073f40",
                        }}
                        className="
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#d7e0de]
                          text-[16px]
                          font-[550]
                          shadow-[0_4px_13px_rgba(7,63,64,0.07)]
                        "
                      >
                        {completed ? <Check size={15} /> : index + 1}
                      </motion.span>

                      <span
                        className={`
                          mt-3
                          hidden
                          text-[12px]
                          leading-4
                          sm:block
                          ${
                            active
                              ? "font-semibold text-[#073f40]"
                              : "text-[#697875]"
                          }
                        `}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <div className="mt-8 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_285px]">
              {/* FORM CARD */}
              <motion.form
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                onSubmit={(event) => event.preventDefault()}
                className="
                  rounded-[8px]
                  border
                  border-[#e0e8e6]
                  bg-white
                  p-5
                  shadow-[0_9px_32px_rgba(7,63,64,0.04)]
                  sm:p-7
                "
              >
                <AnimatePresence mode="wait">
                  {/* STEP 1 */}
                  {step === 0 && (
                    <motion.div
                      key="step-one"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-[20px] font-[550] text-[#113b39]">
                            Step 1: Manuscript Details
                          </h3>

                          <p className="mt-1 text-[13px] text-[#788684]">
                            Please provide the basic details of your manuscript.
                          </p>
                        </div>

                        <p className="pt-1 text-[12px] text-[#7d8987]">
                          All fields marked
                          <span className="mx-1 text-red-500">*</span>
                          are mandatory
                        </p>
                      </div>

                      <div>
                        <FieldLabel required>Manuscript Title</FieldLabel>

                        <input
                          type="text"
                          maxLength={250}
                          placeholder="Enter your manuscript title"
                          className={inputClass}
                          {...register("paperTitle", {
                            required: "Manuscript title is required.",
                          })}
                        />

                        <span className="mt-1 block text-right text-[12px] text-[#899592]">
                          {titleValue.length}/250
                        </span>

                        <ErrorText message={errors.paperTitle?.message} />
                      </div>

                      <div className="mt-4">
                        <FieldLabel required>Abstract</FieldLabel>

                        <textarea
                          maxLength={3000}
                          placeholder="Provide a brief abstract of your manuscript"
                          className={textareaClass}
                          {...register("abstract", {
                            required: "Abstract is required.",
                          })}
                        />

                        <span className="mt-1 block text-right text-[12px] text-[#899592]">
                          {abstractValue.length}/3000
                        </span>

                        <ErrorText message={errors.abstract?.message} />
                      </div>

                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel required>Select Journal</FieldLabel>

                          <select
                            className={inputClass}
                            {...register("journal", {
                              required: "Please select a journal.",
                            })}
                          >
                            <option value="">-- Select Journal --</option>

                            {JOURNAL_CATEGORIES.filter(
                              (category) => category !== "All"
                            ).map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>

                          <ErrorText message={errors.journal?.message} />
                        </div>

                        <div>
                          <FieldLabel required>Manuscript Type</FieldLabel>

                          <select
                            className={inputClass}
                            {...register("manuscriptType", {
                              required: "Please select a manuscript type.",
                            })}
                          >
                            <option value="">-- Select Type --</option>

                            {MANUSCRIPT_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>

                          <ErrorText
                            message={errors.manuscriptType?.message}
                          />
                        </div>
                      </div>

                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel required>Subject Area</FieldLabel>

                          <select
                            className={inputClass}
                            {...register("subjectArea", {
                              required: "Please select a subject area.",
                            })}
                          >
                            <option value="">
                              -- Select Subject Area --
                            </option>

                            {SUBJECT_AREAS.map((area) => (
                              <option key={area} value={area}>
                                {area}
                              </option>
                            ))}
                          </select>

                          <ErrorText message={errors.subjectArea?.message} />
                        </div>

                        <div>
                          <FieldLabel required>Keywords</FieldLabel>

                          <input
                            type="text"
                            placeholder="Enter keywords (comma separated)"
                            className={inputClass}
                            {...register("keywords", {
                              required: "Keywords are required.",
                            })}
                          />

                          <ErrorText message={errors.keywords?.message} />
                        </div>
                      </div>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel>
                            Is this a revised submission?
                          </FieldLabel>

                          <div className="flex gap-5 pt-1">
                            <RadioOption
                              name="revisedSubmission"
                              value="yes"
                              label="Yes"
                              register={register}
                            />

                            <RadioOption
                              name="revisedSubmission"
                              value="no"
                              label="No"
                              register={register}
                            />
                          </div>
                        </div>

                        <div>
                          <FieldLabel>
                            Have you submitted this manuscript elsewhere?
                          </FieldLabel>

                          <div className="flex gap-5 pt-1">
                            <RadioOption
                              name="submittedElsewhere"
                              value="yes"
                              label="Yes"
                              register={register}
                            />

                            <RadioOption
                              name="submittedElsewhere"
                              value="no"
                              label="No"
                              register={register}
                            />
                          </div>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ y: -2 }}
                        className="
                          mt-6
                          flex
                          items-start
                          gap-3
                          rounded-[7px]
                          border
                          border-[#e7c98f]
                          bg-[#fffaf2]
                          px-4
                          py-4
                        "
                      >
                        <FileCheck2
                          size={21}
                          className="mt-0.5 shrink-0 text-[#073f40]"
                        />

                        <p className="text-[12px] leading-5 text-[#536461]">
                          Ensure your manuscript is original, has not been
                          published before, and is not under consideration for
                          publication elsewhere.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {step === 1 && (
                    <motion.div
                      key="step-two"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="mb-6">
                        <h3 className="font-serif text-[20px] font-semibold text-[#113b39]">
                          Step 2: Authors & Affiliations
                        </h3>

                        <p className="mt-1 text-[12px] text-[#788684]">
                          Provide the corresponding author and affiliation
                          information.
                        </p>
                      </div>

                      <div>
                        <FieldLabel required>Full Name</FieldLabel>

                        <input
                          type="text"
                          placeholder="Enter corresponding author name"
                          className={inputClass}
                          {...register("authorName", {
                            required: "Full name is required.",
                          })}
                        />

                        <ErrorText message={errors.authorName?.message} />
                      </div>

                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel required>Email Address</FieldLabel>

                          <input
                            type="email"
                            placeholder="author@university.edu"
                            className={inputClass}
                            {...register("email", {
                              required: "Email is required.",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address.",
                              },
                            })}
                          />

                          <ErrorText message={errors.email?.message} />
                        </div>

                        <div>
                          <FieldLabel required>Phone Number</FieldLabel>

                          <input
                            type="tel"
                            placeholder="+91 98765 43210"
                            className={inputClass}
                            {...register("phone", {
                              required: "Phone number is required.",
                            })}
                          />

                          <ErrorText message={errors.phone?.message} />
                        </div>
                      </div>

                      <div className="mt-4">
                        <FieldLabel required>
                          Affiliation / Institution
                        </FieldLabel>

                        <input
                          type="text"
                          placeholder="University or institution name"
                          className={inputClass}
                          {...register("affiliation", {
                            required: "Affiliation is required.",
                          })}
                        />

                        <ErrorText message={errors.affiliation?.message} />
                      </div>

                      <div className="mt-4">
                        <FieldLabel required>Country</FieldLabel>

                        <input
                          type="text"
                          placeholder="Enter country"
                          className={inputClass}
                          {...register("country", {
                            required: "Country is required.",
                          })}
                        />

                        <ErrorText message={errors.country?.message} />
                      </div>

                      <div className="mt-4">
                        <FieldLabel>Co-authors</FieldLabel>

                        <textarea
                          rows={4}
                          placeholder="Enter co-author names, email addresses and affiliations"
                          className={textareaClass}
                          {...register("coAuthors")}
                        />

                        <p className="mt-1.5 text-[11px] text-[#82908e]">
                          Enter each co-author on a separate line.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {step === 2 && (
                    <motion.div
                      key="step-three"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="mb-6">
                        <h3 className="font-serif text-[20px] font-semibold text-[#113b39]">
                          Step 3: Upload Files
                        </h3>

                        <p className="mt-1 text-[12px] text-[#788684]">
                          Upload your manuscript file for editorial review.
                        </p>
                      </div>

                      <label
                        htmlFor="manuscript-upload"
                        className="
                          group
                          flex
                          cursor-pointer
                          flex-col
                          items-center
                          justify-center
                          rounded-[9px]
                          border-2
                          border-dashed
                          border-[#cdd9d7]
                          bg-[#fbfcfc]
                          px-6
                          py-12
                          text-center
                          transition-all
                          duration-300
                          hover:border-[#d4a257]
                          hover:bg-[#fffaf1]
                        "
                      >
                        <motion.span
                          whileHover={{ y: -3, scale: 1.05 }}
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            bg-[#073f40]
                            text-white
                            shadow-[0_10px_25px_rgba(7,63,64,0.20)]
                          "
                        >
                          <UploadCloud size={26} />
                        </motion.span>

                        <span className="mt-4 text-[12px] font-semibold text-[#163f3c]">
                          Click to upload your manuscript
                        </span>

                        <span className="mt-2 text-[12px] text-[#7b8a87]">
                          PDF, DOC, or DOCX — up to {MAX_UPLOAD_SIZE_MB}MB
                        </span>

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
                          className="
                            mt-4
                            flex
                            items-center
                            gap-3
                            rounded-[7px]
                            border
                            border-[#dfe7e5]
                            bg-[#f8faf9]
                            px-4
                            py-3
                          "
                        >
                          <FileIcon
                            size={20}
                            className="shrink-0 text-[#073f40]"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-semibold text-[#244441]">
                              {file.name}
                            </p>

                            <p className="mt-0.5 text-[11px] text-[#81908d]">
                              {(file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setFile(null);
                              setFileError("");
                            }}
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-full
                              text-[#83908e]
                              transition-all
                              hover:bg-red-50
                              hover:text-red-500
                            "
                            aria-label="Remove manuscript"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      )}

                      {fileError && (
                        <p className="mt-3 text-[12px] font-medium text-red-500">
                          {fileError}
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 4 */}
                  {step === 3 && (
                    <motion.div
                      key="step-four"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="mb-6">
                        <h3 className="font-serif text-[20px] font-semibold text-[#113b39]">
                          Step 4: Review & Confirmation
                        </h3>

                        <p className="mt-1 text-[12px] text-[#788684]">
                          Review all information before submitting your
                          manuscript.
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-[7px] border border-[#dfe7e5]">
                        {[
                          ["Manuscript Title", reviewValues.paperTitle],
                          ["Journal", reviewValues.journal],
                          ["Manuscript Type", reviewValues.manuscriptType],
                          ["Subject Area", reviewValues.subjectArea],
                          ["Keywords", reviewValues.keywords],
                          ["Author Name", reviewValues.authorName],
                          ["Email Address", reviewValues.email],
                          ["Phone Number", reviewValues.phone],
                          ["Affiliation", reviewValues.affiliation],
                          ["Country", reviewValues.country],
                          ["Manuscript File", file?.name],
                        ].map(([label, value], index) => (
                          <div
                            key={label}
                            className={`
                              grid
                              gap-2
                              px-4
                              py-3
                              sm:grid-cols-[165px_1fr]
                              ${
                                index % 2 === 0
                                  ? "bg-[#f8faf9]"
                                  : "bg-white"
                              }
                            `}
                          >
                            <span className="text-[12px] font-semibold text-[#355350]">
                              {label}
                            </span>

                            <span className="break-words text-[12px] leading-5 text-[#687b77]">
                              {value || "Not provided"}
                            </span>
                          </div>
                        ))}
                      </div>

                      <label
                        className="
                          mt-6
                          flex
                          cursor-pointer
                          items-start
                          gap-3
                          rounded-[7px]
                          border
                          border-[#e5c993]
                          bg-[#fffaf2]
                          px-4
                          py-4
                        "
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 accent-[#073f40]"
                          {...register("declaration", {
                            required:
                              "Please accept the submission declaration.",
                          })}
                        />

                        <span className="text-[12px] leading-5 text-[#52635f]">
                          I confirm that all submitted information is correct,
                          all authors have approved this manuscript, and the
                          submission complies with publication ethics and
                          originality requirements.
                        </span>
                      </label>

                      <ErrorText message={errors.declaration?.message} />
                    </motion.div>
                  )}

                  {/* SUCCESS */}
                  {step === 4 && (
                    <motion.div
                      key="step-five"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.45 }}
                      className="py-10 text-center"
                    >
                      <motion.span
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 14,
                        }}
                        className="
                          mx-auto
                          flex
                          h-20
                          w-20
                          items-center
                          justify-center
                          rounded-full
                          bg-[#e8f5f0]
                          text-[#13795b]
                        "
                      >
                        <CheckCircle2 size={46} />
                      </motion.span>

                      <h3 className="mt-5 font-serif text-[28px] font-[550] text-[#073f40]">
                        Submission Successful!
                      </h3>

                      <p className="mx-auto mt-3 max-w-[480px] text-[12px] leading-6 text-[#71817e]">
                        Your manuscript has been submitted successfully. Save
                        your submission ID for tracking and future
                        communication.
                      </p>

                      <div
                        className="
                          mx-auto
                          mt-7
                          flex
                          max-w-[390px]
                          items-center
                          justify-between
                          rounded-[8px]
                          border
                          border-[#dce5e3]
                          bg-[#f7faf9]
                          px-5
                          py-4
                        "
                      >
                        <span className="text-left">
                          <span className="block text-[10px] uppercase tracking-[0.12em] text-[#81908d]">
                            Submission ID
                          </span>

                          <span className="mt-1 block font-mono text-[14px] font-bold text-[#073f40]">
                            {submissionId}
                          </span>
                        </span>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() =>
                            navigator.clipboard.writeText(submissionId)
                          }
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-[#073f40]
                            text-white
                          "
                          aria-label="Copy submission ID"
                        >
                          <Copy size={17} />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 rounded-[7px] bg-red-50 px-4 py-3 text-[12px] font-medium text-red-600"
                  >
                    {submitError}
                  </motion.p>
                )}

                {step < 4 && (
                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-[#edf1f0] pt-6">
                    <motion.button
                      type="button"
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={goBack}
                      disabled={step === 0 || submitting}
                      className={`
                        flex
                        min-h-[41px]
                        items-center
                        justify-center
                        gap-2
                        rounded-[7px]
                        px-5
                        text-[11px]
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          step === 0
                            ? "pointer-events-none invisible"
                            : "border border-[#d6e0de] bg-white text-[#31504d] hover:border-[#073f40]"
                        }
                      `}
                    >
                      <ArrowLeft size={15} />
                      Back
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={goNext}
                      disabled={submitting}
                      className="
                        flex
                        min-h-[41px]
                        items-center
                        justify-center
                        gap-3
                        rounded-[7px]
                        bg-[#073f40]
                        px-6
                        text-[12px]
                        font-semibold
                        text-white
                        shadow-[0_9px_22px_rgba(7,63,64,0.18)]
                        transition-all
                        duration-300
                        hover:bg-[#0a5351]
                        hover:shadow-[0_13px_28px_rgba(7,63,64,0.25)]
                        disabled:cursor-not-allowed
                        disabled:opacity-70
                      "
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          {step === 3
                            ? "Submit Manuscript"
                            : "Save & Continue"}

                          {step === 3 ? (
                            <Send size={15} />
                          ) : (
                            <ArrowRight size={15} />
                          )}
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </motion.form>

              {/* SIDEBAR */}
              <motion.aside
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                className="space-y-4 lg:sticky lg:top-24"
              >
                <motion.section
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="rounded-[8px] border border-[#e0e8e6] bg-white p-5 shadow-[0_8px_28px_rgba(7,63,64,0.035)]"
                >
                  <h3 className="font-serif text-[18px] font-semibold text-[#153d3a]">
                    Submission Guidelines
                  </h3>

                  <div className="mt-3">
                    <GuidelineItem
                      icon={FileText}
                      title="Author Guidelines"
                      description="View detailed author guidelines"
                    />

                    <GuidelineItem
                      icon={ShieldCheck}
                      title="Review Process"
                      description="Learn about our review process"
                    />

                    <GuidelineItem
                      icon={Award}
                      title="Publication Ethics"
                      description="Our commitment to ethical publishing"
                    />

                    <GuidelineItem
                      icon={Copyright}
                      title="Copyright Policy"
                      description="Understand our copyright terms"
                    />

                    <GuidelineItem
                      icon={ClipboardCheck}
                      title="Plagiarism Policy"
                      description="We ensure original and authentic content"
                    />
                  </div>
                </motion.section>

                <motion.section
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="rounded-[8px] border border-[#e0e8e6] bg-white p-5 shadow-[0_8px_28px_rgba(7,63,64,0.035)]"
                >
                  <h3 className="font-serif text-[18px] font-semibold text-[#153d3a]">
                    Need Help?
                  </h3>

                  <p className="mt-2 text-[12px] leading-5 text-[#74827f]">
                    Our support team is here to assist you at every step of your
                    submission.
                  </p>

                  <a
                    href="tel:+91 8446723800"
                    className="group mt-4 flex items-start gap-3"
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#f4f8f7]
                        text-[#073f40]
                        transition-all
                        group-hover:bg-[#073f40]
                        group-hover:text-white
                      "
                    >
                      <Phone size={16} />
                    </span>

                    <span>
                      <span className="block text-[12px] font-semibold text-[#1d413e]">
                        +91 84467 23800
                      </span>

                      <span className="mt-1 block text-[10px] text-[#7c8987]">
                        Mon - Fri, 10:00 AM - 6:00 PM IST
                      </span>
                    </span>
                  </a>

                  <a
                    href="mailto:publicationpure@gmail.com"
                    className="group mt-4 flex items-start gap-3"
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#f4f8f7]
                        text-[#073f40]
                        transition-all
                        group-hover:bg-[#073f40]
                        group-hover:text-white
                      "
                    >
                      <Mail size={16} />
                    </span>

                    <span className="min-w-0">
                      <span className="block break-all text-[12px] font-semibold text-[#1d413e]">
                        publicationpure@gmail.com
                      </span>

                      <span className="mt-1 block text-[10px] text-[#7c8987]">
                        We respond within 24 hours
                      </span>
                    </span>
                  </a>
                </motion.section>

                <motion.section
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="rounded-[8px] border border-[#e0e8e6] bg-white p-5 shadow-[0_8px_28px_rgba(7,63,64,0.035)]"
                >
                  <h3 className="font-serif text-[18px] font-semibold text-[#153d3a]">
                    Tips for a Successful Submission
                  </h3>

                  <div className="mt-4 space-y-3">
                    {[
                      "Follow the author guidelines carefully.",
                      "Ensure your manuscript is well-structured.",
                      "Check grammar, spelling, and references.",
                      "Provide all required information.",
                    ].map((tip) => (
                      <div
                        key={tip}
                        className="flex items-start gap-2 text-[11px] leading-4 text-[#657572]"
                      >
                        <Check
                          size={13}
                          className="mt-0.5 shrink-0 text-[#073f40]"
                        />

                        {tip}
                      </div>
                    ))}
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    className="mt-5 flex items-center gap-3 text-[12px] font-[550] text-[#153f3c]"
                  >
                    View Author Guidelines
                    <ArrowRight size={14} />
                  </motion.button>
                </motion.section>
              </motion.aside>
            </div>

            {/* BENEFITS */}
            <motion.section
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-7 rounded-[8px] border border-[#edf1f0] bg-[#f7f9f8] px-3 py-4"
            >
              <motion.h2
                variants={fadeUp}
                className="text-center font-serif text-[18px] font-[550] text-[#133d3a]"
              >
                Why Publish with Pure Publications?
              </motion.h2>

              <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-5">
                <BenefitItem
                  icon={Award}
                  title="Peer Reviewed"
                  description="Rigorous peer review ensures quality."
                />

                <BenefitItem
                  icon={ShieldCheck}
                  title="Global Visibility"
                  description="Indexed in leading databases worldwide."
                />

                <BenefitItem
                  icon={Eye}
                  title="DOI Provided"
                  description="Digital Object Identifier for every publication."
                />

                <BenefitItem
                  icon={ClipboardCheck}
                  title="Timely Publication"
                  description="Fast and efficient publication process."
                />

                <BenefitItem
                  icon={Lock}
                  title="Open Access"
                  description="Wider reach and greater impact."
                />
              </div>
            </motion.section>

          
          </div>
        </section>
      </main>
    </>
  );
}
