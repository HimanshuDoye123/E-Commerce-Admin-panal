import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
               <ProtectedRoute>
                <Dashboard />
               </ProtectedRoute>
            }
          />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;