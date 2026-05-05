import type { User } from "../types";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

// get all users
export const getAllUsers = async () => {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as User[];
};

// update user
export const updateUser = async (id: string, data: any) => {
  await updateDoc(doc(db, "users", id), data);
};

// delete user
export const deleteUser = async (id: string) => {
  await deleteDoc(doc(db, "users", id));
};

// Get all teachers
// export const getTeachers = async () => {
//   const snap = await getDocs(collection(db, "teachers"));
//   return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
// };

// Get all students
// export const getAllStudents = async () => {
//   const snap = await getDocs(collection(db, "students"));
//   return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
// };


export const getStudentsByTeacher = async (teacherId: string) => {
  const q = query(
    collection(db, "users"),
    where("role", "==", "student"),
    where("teacherId", "==", teacherId),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};


// TEACHER DELETE (with students)
export const deleteTeacher = async (teacherId: string) => {
  // const q = query(
  //   collection(db, "users"),
  //   where("role", "==", "student"),
  //   where("teacherId", "==", teacherId),
  // );

  // const snap = await getDocs(q);

  // const deleteStudents = snap.docs.map((d) =>
  //   deleteDoc(doc(db, "users", d.id)),
  // );

  // await Promise.all(deleteStudents);

  await deleteDoc(doc(db, "users", teacherId));
};
