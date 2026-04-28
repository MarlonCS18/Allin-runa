// app/components/FilterGroup.js
import React from 'react';
import { motion } from 'framer-motion';

// Variante simple para que el grupo de filtros aparezca
const groupVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function FilterGroup({ title, options, selected, onChange, type = 'checkbox' }) {
  return (
    <motion.div className="mb-6" variants={groupVariants}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2 border-gray-200">
        {title}
      </h3>
      {type === 'checkbox' && (
        <div className="flex flex-col gap-3">
          {options.map(option => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group hover:text-green-700">
              <input
                type="checkbox"
                className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500 transition-colors duration-200"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
              />
              <span className="text-base text-gray-700 font-medium group-hover:text-green-800 transition-colors duration-200">
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
    </motion.div>
  );
}