// import { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ScrollToTop from "./components/ScrollToTop";
// import Loader from "./components/Loader";

// // Route-level code splitting: each page is fetched only when visited.
// const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
// const Services = lazy(() => import("./pages/Services"));
// const Journals = lazy(() => import("./pages/Journals"));
// const JournalDetails = lazy(() => import("./pages/JournalDetails"));
// const SubmitPaper = lazy(() => import("./pages/SubmitPaper"));
// const Contact = lazy(() => import("./pages/Contact"));
// const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
// const NotFound = lazy(() => import("./pages/NotFound"));

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col overflow-x-hidden">
//       <ScrollToTop />
//       <Navbar />
//       <main className="flex-1">
//         <Suspense fallback={<Loader fullscreen={false} />}>
//           <AnimatePresence mode="wait">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/services" element={<Services />} />
//               <Route path="/journals" element={<Journals />} />
//               <Route path="/journals/:id" element={<JournalDetails />} />
//               <Route path="/submit-paper" element={<SubmitPaper />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </AnimatePresence>
//         </Suspense>
//       </main>
//       <Footer />
//     </div>
//   );
// }



import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";

// Route-level code splitting
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Journals = lazy(() => import("./pages/Journals"));
const JournalDetails = lazy(() => import("./pages/JournalDetails"));
const SubmitPaper = lazy(() => import("./pages/SubmitPaper"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
// const TermsAndConditions = lazy(() =>
//   import("./pages/TermsAndConditions")
// );
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();

  const standalonePages = [
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const isStandalonePage = standalonePages.includes(location.pathname);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <ScrollToTop />

      {!isStandalonePage && <Navbar />}

      <main className="flex-1">
        <Suspense fallback={<Loader fullscreen={false} />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/journals" element={<Journals />} />
              <Route
                path="/journals/:id"
                element={<JournalDetails />}
              />
              <Route
                path="/submit-paper"
                element={<SubmitPaper />}
              />
              <Route path="/contact" element={<Contact />} />

              {/* Standalone legal pages */}
              <Route
                path="/privacy-policy"
                element={<PrivacyPolicy />}
              />

              {/* <Route
                path="/terms-and-conditions"
                element={<TermsAndConditions />}
              /> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isStandalonePage && <Footer />}
    </div>
  );
}