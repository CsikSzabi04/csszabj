import { Link } from "react-scroll";
import { motion } from "framer-motion";

export default function Reference() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      {/* Smooth Scroll Navigation Links */}
      <nav className="flex space-x-4 text-xl text-white">
        <Link to="about" smooth={true} duration={500} className="hover:text-teal-500 cursor-pointer">
          About
        </Link>
        <Link to="projects" smooth={true} duration={500} className="hover:text-teal-500 cursor-pointer">
          Projects
        </Link>
        <Link to="contact" smooth={true} duration={500} className="hover:text-teal-500 cursor-pointer">
          Contact
        </Link>
      </nav>
    </motion.div>
  );
}
