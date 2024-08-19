/* eslint-disable react/no-unescaped-entities */

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to the Home Page
        </h1>
        <p className="text-gray-600 mb-6">
          You're logged in. Log out if you're done.
        </p>

        <motion.button
          onClick={handleLogout}
          className="inline-block bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </motion.div>
    </main>
  );
}
