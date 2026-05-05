import { useEffect, useState } from "react";
import { auth, db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function StudentDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const snap = await getDoc(doc(db, "students", user.uid));
      setData(snap.data());
    };
    fetch();
  }, []);

  return <div>{data?.name}</div>;
}
