import { createContext, useContext, useEffect, useState } from "react";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  deleteTeacher,
} from "../services/firestoreService";
import type { User } from "../types";
import { getApps, initializeApp } from "firebase/app";
import { auth, db, firebaseConfig } from "../services/firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface AdminContextType {
  users: User[];
  fetchData: () => void;
  updateUser: (id: string, data: any) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  handleCreateUser: (data: any) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside provider");
  return ctx;
};

export const AdminProvider = ({ children }: any) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchData = async () => {
    const u = await getAllUsers();
    setUsers(u as User[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateUser = async (data: any) => {
    const secondaryApp =
      getApps().find((app) => app.name === "secondary") ||
      initializeApp(firebaseConfig, "secondary");
    const secondaryAuth = getAuth(secondaryApp);

    try {
      // 1. create auth user
      const cred = await createUserWithEmailAndPassword(
        secondaryAuth,
        data.email,
        data.password,
      );

      console.log("Auth created:", cred.user.uid);
      console.log("Primary auth user:", auth.currentUser);

      // 2. store in firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        name: data.name,
        email: data.email,
        role: data.role,
        teacherId: data.role === "student" ? data.teacherId : null,
      });

      console.log("Firestore write SUCCESS");

      alert("User created");

      // 3. Clean up secondary app
      await secondaryAuth.signOut();

      await fetchData();
    } catch (e) {
      console.error("@@@@@", e);
      throw e;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        fetchData,
        updateUser,
        deleteUser,
        deleteTeacher,
        handleCreateUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
