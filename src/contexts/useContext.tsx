import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  email: string;
  role?: string;
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  // Hàm xử lý logout
  const logout = () => {
    if (user?.id) {
      localStorage.removeItem(`cart-${user.id}`); // Xóa giỏ hàng khi đăng xuất
    }
    localStorage.removeItem("cart");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    nav("/login");
  };
  

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
