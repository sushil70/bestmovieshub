"use client";

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
const checkAndClearExpiredSession = async (router: any) => {
  const sessionTimestamp = await localStorage.getItem("a");
  if (sessionTimestamp && isExpired(parseInt(sessionTimestamp, 10))) {
    await localStorage.clear();
    router.push("/");
  }
};

// Function to handle the admin redirection
const handleAdminAccess = async (id: string, router: any) => {
  if (id === ADMIN_ID) {
    await window.localStorage.setItem("a", getTimestamp().toString());
    router.push("/admin");
  } else {
    router.push("/");
  }
};

// Main logic
const manageAccess = async (idSearchParams: string | null, router: any) => {
  // Check if session is expired before proceeding
  checkAndClearExpiredSession(router);

  if (idSearchParams) {
    // Store the ID from URL into localStorage
    await localStorage.setItem("id", idSearchParams);
    handleAdminAccess(idSearchParams, router);
  } else {
    const storedId = await window.localStorage.getItem("id");
    if (storedId !== ADMIN_ID) {
      router.push("/");
    }
  }
};

export default manageAccess;
