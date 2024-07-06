import { createContext, useState, useEffect } from "react";

const UseContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedData = localStorage.getItem("user");
    return storedData ? JSON.parse(storedData) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UseContext.Provider value={{ user, setUser }}>
      {children}
    </UseContext.Provider>
  );
};

export default UseContext;
