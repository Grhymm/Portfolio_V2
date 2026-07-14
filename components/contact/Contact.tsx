"use client";

import {
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import emailjs from "@emailjs/browser";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { AlertCircle, Check, Loader2, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const EMAIL = "atargaondodonel@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "error";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

const fieldClass =
  "w-full border-b bg-transparent py-4 text-base text-foreground outline-none transition-colors duration-300 sm:py-5";

export function Contact() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const buttonControls = useAnimationControls();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name as keyof FormErrors] ? { ...prev, [name]: undefined } : prev));
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!values.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    return nextErrors;
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      buttonControls.start({
        x: [0, -8, 8, -8, 8, 0],
        transition: { duration: 0.4, ease: "easeInOut" },
      });
      return;
    }

    if (!formRef.current || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(() => {
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 2500);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3500);
      });
  }

  return (
    <section id="contact">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer(0.15)}
        className="flex w-full flex-col gap-10 lg:gap-14"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5"
        >
          <Send className="h-3.5 w-3.5 text-accent" />
          <span className="text-xs font-medium uppercase tracking-wider text-foreground">
            Contact
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="max-w-xl text-[clamp(26px,2.8vw_+_5px,36px)] font-medium leading-[clamp(32px,3.2vw_+_7px,42px)] text-foreground"
        >
          If you have a general or project enquiry, please drop me an email
          or fill the form – available now
        </motion.h2>

        <motion.form
          ref={formRef}
          variants={staggerContainer(0.1)}
          onSubmit={handleSubmit}
          noValidate
          className="flex max-w-xl flex-col gap-10 sm:gap-12"
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-3">
            <label htmlFor="contact-name" className="text-sm text-muted">
              Your Name <span className="text-accent">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={cn(
                fieldClass,
                errors.name
                  ? "border-[#EF4444] focus:border-[#EF4444]"
                  : "border-card-border focus:border-accent",
              )}
            />
            {errors.name && (
              <motion.p
                id="contact-name-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-[#EF4444]"
              >
                {errors.name}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col gap-3">
            <label htmlFor="contact-email" className="text-sm text-muted">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={cn(
                fieldClass,
                errors.email
                  ? "border-[#EF4444] focus:border-[#EF4444]"
                  : "border-card-border focus:border-accent",
              )}
            />
            {errors.email && (
              <motion.p
                id="contact-email-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-[#EF4444]"
              >
                {errors.email}
              </motion.p>
            )}
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col gap-3">
            <label htmlFor="contact-message" className="text-sm text-muted">
              Project Description
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={values.message}
              onChange={handleChange}
              className={cn(fieldClass, "resize-none border-card-border focus:border-accent")}
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-stretch gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <motion.button
              type="submit"
              animate={buttonControls}
              disabled={status === "sending"}
              whileHover={
                status === "idle"
                  ? { scale: 1.05, boxShadow: "0 0 24px rgba(34, 255, 102, 0.45)" }
                  : undefined
              }
              whileTap={{ scale: 0.97 }}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-colors disabled:cursor-not-allowed sm:w-auto",
                status === "error"
                  ? "bg-[#EF4444] text-white"
                  : status === "sent"
                    ? "bg-accent-bright text-black"
                    : "bg-accent text-black hover:bg-accent-bright",
                status === "sending" && "opacity-80",
              )}
            >
              {status === "sending" && (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              )}
              {status === "sent" && <Check className="h-4 w-4" aria-hidden="true" />}
              {status === "error" && (
                <AlertCircle className="h-4 w-4" aria-hidden="true" />
              )}
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                  ? "Message sent"
                  : status === "error"
                    ? "Something went wrong"
                    : "Send Message"}
            </motion.button>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 text-muted underline decoration-muted/40 underline-offset-4 transition-colors hover:text-accent sm:justify-start"
            >
              <Mail className="h-4 w-4" />
              {EMAIL}
            </a>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
