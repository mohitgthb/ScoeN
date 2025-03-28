import { motion } from "framer-motion";
import { University } from "lucide-react";

const Marquee = () => {
  const items = [
    "SCOE",
    "SKN",
    "NBN",
    "RMD",
    "COEP",
    "PICT",
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="flex gap-8">
        {/* Duplicating the content for seamless looping */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center space-x-8 whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: "-500%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25, // Adjust this value for speed (higher = slower)
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                {/* Custom Icon (Circle Shape) */}
                <University className="w-6 h-6 rounded-full text-blue-700 opacity-80" />
                <span className="text-gray-600 text-xl">{item}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
