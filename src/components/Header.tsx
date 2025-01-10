import { motion } from "framer-motion";
import { ChartLine } from "lucide-react";

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
        <ChartLine className="w-6 h-6 text-[#0EA5E9]" />
        <span className="text-2xl font-bold tracking-wider">PENTA FUND</span>
      </motion.div>
      <div className="text-white border border-white/20 px-4 py-2">
        SK
      </div>
    </motion.header>
  );
};