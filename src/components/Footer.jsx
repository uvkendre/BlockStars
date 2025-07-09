import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <motion.p 
            className="text-xs text-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            &copy; {currentYear} BlockStars
          </motion.p>
          
          <motion.div 
            className="text-xs text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/about">About</Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
