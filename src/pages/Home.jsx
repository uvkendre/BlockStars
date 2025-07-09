import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:py-0">
      <div className="max-w-4xl w-full space-y-8 sm:space-y-12 text-center px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Experience the Classic{' '}
            <span className="block sm:inline-block mt-2 sm:mt-0">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
                Head & Tail
              </span>{' '}
              Game
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-2 sm:px-0">
            A modern take on the timeless coin toss game. Test your luck and strategy with our interactive Head & Tail experience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-6 sm:pt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/head-and-tail"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
              >
                Play Now
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-white bg-gray-800/50 hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="pt-8 sm:pt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >

        </motion.div>
      </div>
    </div>
  );
}