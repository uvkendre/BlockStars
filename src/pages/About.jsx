import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen pt-24 sm:pt-32 px-3 sm:px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="mb-8 sm:mb-12 bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-light mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              About This Project
            </span>
          </h1>
          <div className="prose prose-invert max-w-none text-gray-300 text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6">
            <p>
              This is a modern React application featuring a Head & Tail game. Built with cutting-edge web technologies including React, React Router for seamless navigation, and Tailwind CSS for beautiful, responsive design.
            </p>
            <p>
              The Head & Tail game challenges players to predict coin toss outcomes. Select either 'H' (Head) or 'T' (Tail) and watch as your predictions create dynamic column patterns based on specific game rules.
            </p>
            <p>
              This project demonstrates advanced frontend development techniques including state management, form handling, animations with Framer Motion, and responsive design principles.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/head-and-tail" 
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 w-full sm:w-auto"
          >
            Try the Head & Tail Game
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}