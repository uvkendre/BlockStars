import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const HeadAndTail = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [error, setError] = useState('');
  const [columns, setColumns] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const resultContainerRef = useRef(null);

  // Auto-scroll to bottom when columns update
  useEffect(() => {
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollLeft = resultContainerRef.current.scrollWidth;
    }
  }, [columns]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedValue) {
      setError('Please select value from dropdown');
      toast.error('Please select Head (H) or Tail (T)');
      return;
    }
    
    setError('');
    setIsAnimating(true);
    
    // Show success toast
    toast.success(`Added ${selectedValue === 'H' ? 'Head' : 'Tail'} to the board`, {
      icon: selectedValue === 'H' ? '🪙' : '🪙',
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    
    // Add a small delay for animation
    setTimeout(() => {
      // Create a deep copy of columns
      const newColumns = JSON.parse(JSON.stringify(columns));
      let columnUpdated = false;
      
      if (newColumns.length === 0) {
        // First selection
        newColumns.push([selectedValue]);
        columnUpdated = true;
      } else {
        // Check if we can add to an existing column
        for (let i = 0; i < newColumns.length; i++) {
          const column = newColumns[i];
          const lastValue = column[column.length - 1];
          
          if (lastValue === selectedValue) {
            column.push(selectedValue);
            columnUpdated = true;
            break;
          }
        }
        
        // If couldn't add to existing column, create a new one
        if (!columnUpdated) {
          // Find the shortest column to maintain balance
          let shortestColumnIndex = 0;
          let minLength = newColumns[0].length;
          
          for (let i = 1; i < newColumns.length; i++) {
            if (newColumns[i].length < minLength) {
              minLength = newColumns[i].length;
              shortestColumnIndex = i;
            }
          }
          
          newColumns[shortestColumnIndex].push(selectedValue);
        }
      }
      
      setColumns(newColumns);
      setSelectedValue('');
      setIsAnimating(false);
    }, 300);
  };

  // Get color and border based on value (H or T)
  const getCellStyle = (value) => {
    return value === 'H' 
      ? 'bg-blue-500/20 border-blue-500/30 text-blue-300' 
      : 'bg-amber-500/20 border-amber-500/30 text-amber-300';
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-3 sm:px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-800 -mx-2 sm:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 sm:mb-8 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Head & Tail
            </span>
          </h1>
          
          {/* Game Controls */}
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-800 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-grow">
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className={`w-full p-3 text-base sm:text-base bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  disabled={isAnimating}
                >
                  <option value="">Select Head (H) or Tail (T)</option>
                  <option value="H">Head (H)</option>
                  <option value="T">Tail (T)</option>
                </select>
                {error && (
                  <motion.p 
                    className="text-red-400 text-sm mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              <motion.button
                type="submit"
                className={`${
                  isAnimating
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors w-full sm:w-auto`}
                whileHover={!isAnimating ? { scale: 1.02 } : {}}
                whileTap={!isAnimating ? { scale: 0.98 } : {}}
                disabled={isAnimating}
              >
                {isAnimating ? 'Adding...' : 'Submit'}
              </motion.button>
            </form>
          </motion.div>

          {/* Results Display */}
          <motion.div 
            ref={resultContainerRef}
            className="bg-gray-900/50 backdrop-blur-sm p-3 sm:p-6 rounded-xl border border-gray-800 min-h-[200px] overflow-x-auto -mx-1 sm:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {columns.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">No data yet</h3>
                <p className="text-gray-500">Start by selecting H (Head) or T (Tail) and click Submit</p>
              </motion.div>
            ) : (
              <div className="flex gap-3 sm:gap-6 items-end">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col-reverse gap-2">
                    {column.map((value, rowIndex) => (
                      <motion.div
                        key={`${colIndex}-${rowIndex}`}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg border ${
                          getCellStyle(value)
                        } ${
                          isAnimating && rowIndex === column.length - 1 ? 'animate-bounce' : ''
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: rowIndex * 0.05 }}
                      >
                        {value}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            className="mt-6 text-center text-xs sm:text-sm text-gray-500 px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>Tip: Same values stack in columns, different values create new columns</p>
          </motion.div>
          
          <motion.div 
            className="mt-8 text-center px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-2 border border-gray-700 text-white/80 hover:text-white hover:bg-gray-800/50 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeadAndTail;
