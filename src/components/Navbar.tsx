import { MapPin } from "lucide-react";

interface NavbarProps {
  onAdminToggle: () => void;
  isAdmin: boolean;
}

const Navbar = ({ onAdminToggle, isAdmin }: NavbarProps) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container flex h-14 items-center justify-between sm:h-16">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-extrabold text-foreground">
            Local<span className="text-accent">Biz</span>
          </span>
        </div>

        <button
          onClick={onAdminToggle}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          {isAdmin ? "Exit Admin" : "Admin"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
