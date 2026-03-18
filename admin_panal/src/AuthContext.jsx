import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try{
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
   catch(err){
    console.log("Error", err)
    localStorage.removeItem("user")
   }
  }
  }, []);

  const login = (data) => {
    setUser(data);
    setToken(data.accessToken);

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
