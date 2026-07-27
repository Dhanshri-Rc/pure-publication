import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Clock, CheckCircle2 } from "lucide-react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import AnimatedSection from "../components/AnimatedSection";
import { submitContactMessage } from "../services/contactService";
import { CONTACT_INFO } from "../utils/constants";

const INFO_CARDS = [
  { icon: MapPin, title: "Address", value: CONTACT_INFO.address },
  { icon: Mail, title: "Email", value: CONTACT_INFO.email },
  { icon: Phone, title: "Phone", value: CONTACT_INFO.phone },
  { icon: Clock, title: "Working Hours", value: CONTACT_INFO.hours },
];

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(data) {
    setError("");
    try {
      await submitContactMessage(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Something went wrong. Please try again in a moment.");
    }
  }

  return (
    <>
      <Seo
        title="Contact Us"
        description="Get in touch with Pure Publication's editorial team for queries about journals, submissions, or partnerships."
        path="/contact"
      />

      <Hero
        breadcrumb="Contact"
        eyebrow="Get In Touch"
        title="We'd Love to"
        highlight="Hear From You"
        description="Reach out with questions about submissions, journals, or partnerships — our editorial team responds within 24 hours."
        image="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1200&auto=format&fit=crop"
      />

      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-6 mb-20">
            {INFO_CARDS.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-navy-800 flex items-center justify-center mb-4">
                    <card.icon className="text-amber-400" size={22} />
                  </div>
                  <h4 className="font-heading font-semibold text-navy-900 mb-1">{card.title}</h4>
                  <p className="text-navy-500 text-sm leading-relaxed">{card.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <SectionTitle
                align="left"
                badge="Send a Message"
                title="Let's Start a"
                highlight="Conversation"
                description="Fill out the form and our team will get back to you shortly."
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                  >
                    <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                    <h4 className="font-heading font-semibold text-navy-900 text-lg mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-navy-500 text-sm">
                      Thank you for reaching out — we'll respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name"
                        placeholder="John Doe"
                        error={errors.name?.message}
                        {...register("name", { required: "Name is required" })}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        error={errors.email?.message}
                        {...register("email", {
                          required: "Email is required",
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                        })}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+91 98765 43210"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                      <Input
                        label="Subject"
                        placeholder="Submission Inquiry"
                        error={errors.subject?.message}
                        {...register("subject", { required: "Subject is required" })}
                      />
                    </div>
                    <Textarea
                      label="Message"
                      placeholder="Tell us more about your inquiry..."
                      error={errors.message?.message}
                      {...register("message", { required: "Message is required" })}
                    />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" variant="primary" loading={isSubmitting} className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </AnimatedSection>

            <AnimatedSection direction="right" className="rounded-3xl overflow-hidden shadow-card h-full min-h-[420px]">
              <iframe
                title="Pure Publication Location"
                src="https://www.google.com/maps?q=Gurugram%20Haryana%20India&output=embed"
                className="w-full h-full min-h-[420px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
