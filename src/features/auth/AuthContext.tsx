import { createContext, useEffect, useState, type ReactNode } from "react";
import { auth, db } from "../../services/firebase";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: FirebaseUser | null;
  role: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true
  
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (u) {
        setUser(u);
        const snap = await getDoc(doc(db, "users", u.uid));
        if (snap.exists()) {
            setRole(snap.data().role);
        } else {
            console.error("User doc not found");
        }
      } else {
        setRole(null);
        setUser(null);
      }
      } catch (error) {
        console.error("Auth error:", error);
      setUser(null);
      setRole(null);
      } finally {
      setLoading(false);
    }
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};