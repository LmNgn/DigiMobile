import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { useNavigate } from "react-router-dom";
  
  // Định nghĩa kiểu dữ liệu User
  type User = {
    id: number;
    email: string;
    role?: string;
  };
  
  // Kiểu dữ liệu context
  type UserContextType = {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
  };
  
  // Tạo context
  const UserContext = createContext<UserContextType | undefined>(undefined);
  
  // Hook để sử dụng context
  export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error("useUser must be used within a UserProvider");
    }
    return context;
  };
  
  // Provider để bao bọc toàn ứng dụng
  export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
  
    useEffect(() => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          if (parsedUser?.id) {
            setUser(parsedUser); // chỉ set nếu có ID hợp lệ
          }
        }
      } catch (error) {
        console.error("Lỗi khi đọc user từ localStorage:", error);
      } finally {
        setLoading(false); // kết thúc loading dù thành công hay thất bại
      }
    }, []);
  
    // Hàm xử lý logout
    const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      nav("/login");
    };
  
    return (
      <UserContext.Provider value={{ user, loading, setUser, logout }}>
        {children}
      </UserContext.Provider>
    );
  };
  