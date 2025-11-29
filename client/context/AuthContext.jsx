import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem("authUser");
        const storedToken = localStorage.getItem("authToken");
        const storedRole = localStorage.getItem("userRole");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setUserRole(storedRole);
        }
        setLoading(false);
    }, []);

    const login = (authToken, userData, role) => {
        setUser(userData);
        setToken(authToken);
        setUserRole(role);
        localStorage.setItem("authUser", JSON.stringify(userData));
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userRole", role);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setUserRole(null);
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        userRole,
        token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
