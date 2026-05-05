import { auth } from "../../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const login = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const register = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);