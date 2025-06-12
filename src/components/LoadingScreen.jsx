import { motion } from "framer-motion";
import { Loader, Laptop, Server, Cpu, Cloud } from "lucide-react";

const icons = [Laptop, Server, Cpu, Cloud];

const LoadingScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold"
      >
        Loading Your Experience...
      </motion.div>

      <div className="flex gap-6">
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            className="p-3 rounded-full bg-white/10"
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Icon className="w-8 h-8 text-cyan-400" />
          </motion.div>
        ))}
      </div>

      <Loader className="animate-spin text-cyan-300" size={36} />
    </div>
  );
};

export default LoadingScreen;
