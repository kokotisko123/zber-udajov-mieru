import { motion } from "framer-motion";
import { ChartLine, PiggyBank } from "lucide-react";

export const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between px-6 py-4 bg-white shadow-sm"
    >
      <motion.div 
        className="flex items-center gap-2 text-primary"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <PiggyBank className="w-8 h-8" />
        <ChartLine className="w-8 h-8" />
        <span className="text-xl font-bold">FinančnéRiešenia</span>
      </motion.div>
    </motion.header>
  );
};