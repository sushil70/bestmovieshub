import { v4 as uuidv4 } from "uuid";
import { addUser, updateUser } from "../newUser";

export const getOrSetUserUUID = () => {
  // Check if the UUID already exists in localStorage
  let userUUID = localStorage.getItem("userUUID");
  if (!userUUID) {
    // Generate a new UUID if it doesn't exist
    userUUID = uuidv4();
    localStorage.setItem("userUUID", userUUID || "");
    addUser({ id: userUUID });
  } else {
    console.log("Returning user: ", userUUID);
    updateUser(userUUID);
  }
};
