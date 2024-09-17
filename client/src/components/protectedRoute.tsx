"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated() && pathname !== "/login") {
        await router.push("/login");
      } else if (isAuthenticated() && pathname === "/login") {
        await router.push("/");
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, router, pathname]);

  if (isChecking) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
