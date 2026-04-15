import { MapPin, Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onAdminToggle: () => void;
  isAdmin: boolean;
  onSavedClick: () => void;
  savedCount: number;
}

const Navbar = ({ onAdminToggle, isAdmin, onSavedClick, savedCount }: NavbarProps) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between sm:h-16">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold text-foreground">
            LB<span className="text-accent">PP</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
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

          <button
            onClick={onAdminToggle}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            {isAdmin ? "Exit Admin" : "Admin"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
