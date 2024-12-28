import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ChevronDown } from 'lucide-react';
import ContactForm from './ContactForm';
import Modal from './Modal';

const Hero = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <motion.section 
        className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white px-4 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="text-sm font-medium text-indigo-400 tracking-wider uppercase">Welcome to my portfolio</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white"
          >
            Mamun
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-2xl text-indigo-200 mb-8"
          >
            Website Developer & Social Media Marketer
          </motion.p>

          <motion.button
            variants={itemVariants}
            onClick={() => setIsContactModalOpen(true)}
            className="px-8 py-3 mb-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors duration-200 transform hover:scale-105"
          >
            Let's Connect
          </motion.button>

          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-8"
          >
            <a href="https://github.com" className="text-indigo-300 hover:text-white transition-colors transform hover:scale-110">
              <Github size={28} />
            </a>
            <a href="https://linkedin.com" className="text-indigo-300 hover:text-white transition-colors transform hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a href="https://twitter.com" className="text-indigo-300 hover:text-white transition-colors transform hover:scale-110">
              <Twitter size={28} />
            </a>
            <a href="mailto:contact@example.com" className="text-indigo-300 hover:text-white transition-colors transform hover:scale-110">
              <Mail size={28} />
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown 
            size={32} 
            className="text-indigo-400 animate-bounce" 
          />
        </motion.div>
      </motion.section>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)}>
        <ContactForm onSuccess={() => setIsContactModalOpen(false)} />
      </Modal>
    </>
  );
};

export default Hero;