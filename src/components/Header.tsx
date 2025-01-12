import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-transparent backdrop-blur-sm"
    >
      <motion.div 
        className="flex items-center gap-2 text-white"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img 
          src="/lovable-uploads/51b19b55-d85b-48bf-9bd3-d9feab921004.png" 
          alt="Logo" 
          className="w-[50px] h-[50px] object-contain"
        />
        <span className="text-2xl font-bold tracking-wider">budovaniemajetku.sk</span>
      </motion.div>
    </motion.header>
  );
};