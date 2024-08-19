/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hardcoded admin credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin";

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simple authentication check
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        document.cookie = "authToken=true; path=/";
        router.push("/");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-600"
          />
        </div>
        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-600"
          />
        </div>
        <button
          onClick={handleLogin}
          className={`w-full p-3 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-center text-sm text-gray-600">
          <div className="bg-gray-200 p-2 rounded-lg inline-block">
            <code className="text-blue-600 font-medium">Username: "admin"</code>
            <br />
            <code className="text-blue-600 font-medium">Password: "admin"</code>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
