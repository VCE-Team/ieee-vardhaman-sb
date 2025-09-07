import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is IEEE Vardhaman Student Branch?",
    answer: "IEEE Vardhaman Student Branch is a student community at Vardhaman College of Engineering dedicated to fostering technical knowledge, innovation, and professional development among students through various activities, workshops, and events."
  },
  {
    question: "How can I become a member of IEEE Vardhaman?",
    answer: "To become a member, you need to first join IEEE as a student member through the IEEE website. Once you have your IEEE membership, you can join our student branch by contacting our membership coordinator or visiting our office."
  },
  {
    question: "What benefits do I get from joining IEEE Vardhaman?",
    answer: "Members get access to exclusive workshops, technical events, networking opportunities, leadership positions, IEEE resources and publications, mentorship programs, and the chance to participate in international conferences and competitions."
  },
  {
    question: "How often do you organize events?",
    answer: "We regularly organize events throughout the academic year, including technical workshops, seminars, competitions, and networking sessions. On average, we host 2-3 events per month across different technical domains."
  },
  {
    question: "Can non-IEEE members attend your events?",
    answer: "Yes, most of our events are open to all students. However, IEEE members often get priority registration, discounted rates, and exclusive access to certain premium events and workshops."
  },
  {
    question: "How can I stay updated about upcoming events?",
    answer: "You can stay updated by subscribing to our newsletter, following our social media channels, checking our website regularly, or joining our Discord/WhatsApp community groups."
  }
];

export const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about IEEE Vardhaman Student Branch
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 transition-all duration-300 ${
                openIndex === index ? 'pb-6' : 'pb-0'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full py-6 text-left flex items-center justify-between focus:outline-none group ${
                  openIndex === index ? 'text-green-600' : 'text-gray-900 hover:text-green-600'
                }`}
              >
                <span className="text-xl font-medium pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180 text-green-600' : 'text-gray-400 group-hover:text-green-600'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 text-lg leading-relaxed pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-600 mb-6">Still have questions?</p>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="group relative inline-flex items-center px-8 py-3 text-lg font-medium border-2 border-black rounded-full overflow-hidden transition-all duration-300 hover:border-transparent"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-green-500"></span>
            <span className="relative flex items-center justify-center transition-colors duration-300 group-hover:text-white">
              Contact Us
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}; 
