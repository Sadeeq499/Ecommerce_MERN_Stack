import { useState, useEffect, useContext, createContext } from "react";
const AuthContext = createContext();

const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState({
    keyword: "",
    results: [],
  });

  return (
    <AuthContext.Provider value={[query, setQuery]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useQuery = () => useContext(AuthContext);

export { QueryProvider, useQuery };
