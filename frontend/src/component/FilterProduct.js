import React from "react";
import { GiHamburger } from "react-icons/gi";
import { motion } from "framer-motion";

const FilterProduct = ({ category, onClick, isActive }) => {
  const iconSize = isActive ? "44px" : "40px";
  const activeColor = "#FFD700"; // Yellow color code for active state
  const inactiveColor = "#FFD700"; // Yellow color code for inactive state
  const iconColor = isActive ? activeColor : inactiveColor;

  const iconVariants = {
    inactive: { scale: 1, color: inactiveColor },
    active: { scale: 1.2, color: activeColor },
  };

  return (
    <motion.div
      className='flex flex-col items-center cursor-pointer'
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className='w-12 h-12 flex justify-center items-center rounded-full shadow-md'
        variants={iconVariants}
        animate={isActive ? "active" : "inactive"}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ backgroundColor: iconColor }}
      >
        {isActive ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            <GiHamburger size={iconSize} color='white' />
          </motion.div>
        ) : (
          <GiHamburger size={iconSize} color='white' />
        )}
      </motion.div>
      <p
        className={`text-center font-medium my-1 uppercase ${
          isActive ? "text-yellow-600" : "text-gray-800"
        }`}
      >
        {category}
      </p>
    </motion.div>
  );
};

export default FilterProduct;
