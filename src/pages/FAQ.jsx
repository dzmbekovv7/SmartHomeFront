import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqs = [
  { question: "How do I start buying a house?", answer: "Begin by assessing your budget, getting pre-approved for a mortgage, and working with a trusted real estate agent." },
  { question: "What should I look for during a house tour?", answer: "Check the foundation, roof condition, plumbing, electrical systems, and neighborhood amenities." },
  { question: "How long does the buying process take?", answer: "Typically, it takes 30-60 days from offer acceptance to closing, but it can vary." },
  { question: "Can I negotiate the price?", answer: "Yes, negotiation is common. Your agent can help you craft a strong offer." },
  { question: "What is a home inspection?", answer: "A professional inspection to assess the condition of the house before purchase." },
  { question: "Are there hidden costs when buying a house?", answer: "Yes, including closing costs, property taxes, insurance, and maintenance expenses." },
  { question: "How do I sell my house through this website?", answer: "List your property with detailed photos and descriptions, and our agents will help you find buyers." },
  { question: "Can I schedule a virtual tour?", answer: "Yes, many listings offer virtual tours for your convenience." },
  { question: "What financing options are available?", answer: "We provide connections to various mortgage lenders with competitive rates." },
  { question: "Is this website secure for transactions?", answer: "Absolutely, we use industry-standard security protocols to protect your data." },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen px-6 py-24 bg-gradient-to-r from-blue-400 via-white to-blue-600 text-gray-900">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.h2
          className="text-5xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-900 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          House Buying FAQs
        </motion.h2>
        <p className="text-gray-700 mt-4">
          Everything you need to know about buying and selling your dream home.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => toggle(index)}
            className={`backdrop-blur-md bg-white/60 hover:bg-white/80 transition-all duration-300 
              border border-blue-400/70 rounded-3xl p-6 shadow-lg cursor-pointer
              hover:shadow-[0_0_60px_#3b82f680]
              ${index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]"}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-blue-700">{item.question}</h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="text-blue-700" />
              </motion.div>
            </div>

            <AnimatePresence>
              {openIndex === index && (
                <motion.p
                  className="text-blue-900 mt-3 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bottom text */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h4 className="text-xl text-blue-800 mb-4 font-light italic">
          Didn’t find your answer?
        </h4>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Contact Us
        </Link>
      </motion.div>
    </section>
  );
};
