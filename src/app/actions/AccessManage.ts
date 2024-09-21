"use client";
import { redirect } from "next/navigation";

// Admin ID, consider moving this to an environment variable
const ADMIN_ID = process.env.REACT_APP_ADMIN_ID; // Move sensitive key to env

// Expiration duration (in milliseconds)
const EXPIRATION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Helper function to get timestamp
const getTimestamp = () => new Date().getTime();

// Helper function to check expiration
const isExpired = (timestamp: number) =>
  getTimestamp() - timestamp > EXPIRATION_DURATION;

// Function to check and clear expired localStorage data
const checkAndClearExpiredSession = () => {
  const sessionTimestamp = localStorage.getItem("a");
  if (sessionTimestamp && isExpired(parseInt(sessionTimestamp, 10))) {
    localStorage.clear();
    redirect("/");
  }
};

// Function to handle the admin redirection
const handleAdminAccess = (id: string) => {
  if (id === ADMIN_ID) {
    localStorage.setItem("a", getTimestamp().toString());
    redirect("/admin");
  } else {
    redirect("/");
  }
};

// Main logic
const manageAccess = (idSearchParams: string | null) => {
  // Check if session is expired before proceeding
  checkAndClearExpiredSession();

  if (idSearchParams) {
    // Store the ID from URL into localStorage
    localStorage.setItem("id", idSearchParams);
    handleAdminAccess(idSearchParams);
  } else {
    const storedId = localStorage.getItem("id");
    if (storedId !== ADMIN_ID) {
      redirect("/");
    }
  }
};

export default manageAccess;
