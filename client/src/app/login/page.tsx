"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function Login(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    try {
      await login(username, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center md:justify-end min-h-screen bg-gray-100">
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.freepik.com/free-psd/3d-rendering-woman-wall_23-2149294137.jpg?t=st=1726211527~exp=1726215127~hmac=aac7d6abe99f0557ad66d08241467143f4b0f1e2984f50adca990ee9eaa4865c&w=2000"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 md:p-10 w-full max-w-2xl mx-4 md:mx-8 my-8 md:my-0 md:mr-20 md:ml-auto">
        <div className="flex justify-center mb-6 md:mb-8">
          <img
            src="https://iproc.id/assets/img/iproc-clean.png"
            alt="Login Logo"
            width={120}
            height={120}
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-left mb-2 md:mb-3">
          Masuk ke platform iProc
        </h1>
        <h2 className="text-sm md:text-base text-gray-600 text-left mb-6 md:mb-8">
          Sistem modernisasi pengadaan barang dan jasa elektronik
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 md:mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 md:px-4 md:py-3 text-gray-700 border rounded-lg focus:outline-none focus:border-slate-500"
              placeholder="Enter Username"
              required
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div className="mb-6 md:mb-8">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 md:px-4 md:py-3 text-gray-700 border rounded-lg focus:outline-none focus:border-slate-500"
              placeholder="Enter Password"
              minLength={5}
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8">
            <button
              className="w-full md:w-auto bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded focus:outline-none focus:shadow-outline mb-4 md:mb-0"
              type="submit"
            >
              Login to your account
            </button>
          </div>
        </form>
        <hr className="mb-6 md:mb-8 border-t" />
        <p className="text-center text-gray-600 text-sm md:text-base">
          Informasi iProc:
          <span className="text-blue-500 hover:text-blue-700">
            helpdesk@adw.co.id
          </span>
        </p>
      </div>
    </section>
  );
}
