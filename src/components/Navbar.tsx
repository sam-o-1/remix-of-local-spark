import { Link, useNavigate } from "react-router-dom";
import { MapPin, Heart, LogOut, Store, ShieldCheck, User as UserIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onSavedClick?: () => void;
  savedCount?: number;
}

const Navbar = ({ onSavedClick, savedCount = 0 }: NavbarProps) => {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between sm:h-16">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-extrabold text-foreground">
              LB<span className="text-accent">PP</span>
            </span>
          </Link>
          <div className="hidden items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground sm:flex">
            <MapPin className="h-3 w-3 text-primary" />
            Solapur, Maharashtra
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSavedClick && (
            <button
              onClick={onSavedClick}
              className="relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          {!user ? (
            <Button size="sm" onClick={() => navigate("/auth")}>Sign In</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <UserIcon className="h-4 w-4" />
                  <span className="hidden sm:inline capitalize">{role}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(role === "vendor" || role === "admin") && (
                  <DropdownMenuItem onClick={() => navigate("/vendor")}>
                    <Store className="mr-2 h-4 w-4" /> My Businesses
                  </DropdownMenuItem>
                )}
                {role === "admin" && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <ShieldCheck className="mr-2 h-4 w-4" /> Admin
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
