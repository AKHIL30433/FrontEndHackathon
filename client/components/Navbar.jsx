import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, LogOut, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { user, logout, userRole, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary p-2">
                        <svg
                            className="h-5 w-5 text-primary-foreground"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10.5 1.5H5.75A4.25 4.25 0 001.5 5.75v8.5A4.25 4.25 0 005.75 18.5h8.5a4.25 4.25 0 004.25-4.25V9.5" />
                            <path
                                d="M6.5 10a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"
                                fill="currentColor"
                                opacity="0.4"
                            />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-foreground">PEER REVIEW</span>
                </Link>
                <div className="hidden items-center gap-4 md:flex">
                    {!isAuthenticated ? (
                        <>
                            <Button variant="ghost" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/signup">Sign Up</Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            {userRole === "admin" ? (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/admin/dashboard">Dashboard</Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/admin/create-assignment">New Assignment</Link>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/student/dashboard">Dashboard</Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/student/peer-review">Reviews</Link>
                                    </Button>
                                </>
                            )}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <User className="h-4 w-4 mr-2" />
                                        {user?.displayName || "Profile"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        {user?.email || user?.displayName}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {userRole === "admin" ? (
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin/profile">Admin Profile</Link>
                                        </DropdownMenuItem>
                                    ) : (
                                        <DropdownMenuItem asChild>
                                            <Link to="/student/profile">Student Profile</Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="text-red-600"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    {isAuthenticated ? (
                        <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    {user?.displayName || "Profile"}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {userRole === "admin" ? (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin/create-assignment">New Assignment</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/admin/profile">Profile</Link>
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link to="/student/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/student/peer-review">Reviews</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/student/profile">Profile</Link>
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-600"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="flex gap-2">
                            <Button size="sm" variant="ghost" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link to="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
