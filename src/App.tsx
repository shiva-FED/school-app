import Routes from "./components/routes";
import { AuthProvider } from "./features/auth/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;