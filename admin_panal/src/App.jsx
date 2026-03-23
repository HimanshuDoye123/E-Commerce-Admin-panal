import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";

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
          <Route
            path= "/users"
            element ={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
           path="/products"
           element ={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
           }
          />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;