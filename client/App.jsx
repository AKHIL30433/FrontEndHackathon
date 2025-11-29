import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import AppRouter from "@/router/Router";
import "./global.css";

const App = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
};

export default App;
