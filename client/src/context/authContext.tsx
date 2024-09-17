"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContextType } from "@/app/types/interface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    const firstName = Cookies.get("firstName");
    const lastName = Cookies.get("lastName");
    const image = Cookies.get("image");
    if (token && firstName && lastName && image) {
      setUser({
        token,
        firstName: JSON.parse(firstName),
        lastName: JSON.parse(lastName),
        image: JSON.parse(image),
      });
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://dummyjson.com/user/login", {
        username,
        password,
      });
      const { token, firstName, lastName, image } = response.data;
      console.log(response.data, "<<<<<<");
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("firstName", firstName, { expires: 7 });
      Cookies.set("lastName", lastName, { expires: 7 });
      Cookies.set("image", image, { expires: 7 });

      setUser({ token, firstName, lastName, image });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("image");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
