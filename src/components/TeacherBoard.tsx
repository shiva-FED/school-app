import { Tldraw, Editor } from "tldraw";
import "tldraw/tldraw.css";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function TeacherBoard() {
  const [initialData, setInitialData] = useState<any>(null);
  const [editor, setEditor] = useState<Editor | null>(null);

  const teacherId = auth.currentUser?.uid;

  useEffect(() => {
    const loadBoard = async () => {
      if (!teacherId) return;

      const ref = doc(db, "boards", teacherId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setInitialData(snap.data().data);
      }
    };

    loadBoard();
  }, [teacherId]);

  // Auto-save every 3 seconds
  useEffect(() => {
    if (!editor || !teacherId) return;

    const interval = setInterval(async () => {
      const snapshot = editor.getSnapshot();

      await setDoc(doc(db, "boards", teacherId), {
        data: snapshot,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [editor, teacherId]);

  return (
    <div style={{ height: "300px" }}>
      <Tldraw
        onMount={(e) => setEditor(e)}
        snapshot={initialData}
      />
    </div>
  );
}