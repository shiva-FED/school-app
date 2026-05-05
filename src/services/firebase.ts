import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC7-ARQqAdGcJtXFz7i6vyGbqBbjJ8Giag",
  authDomain: "role-based-app-c543d.firebaseapp.com",
  projectId: "role-based-app-c543d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  experimentalAutoDetectLongPolling: false,
});