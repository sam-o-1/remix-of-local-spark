import { MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-10">
    <div className="container text-center">
      <div className="mb-3 flex items-center justify-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <MapPin className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="text-lg font-extrabold">LB<span className="text-accent">PP</span></span>
      </div>
      <p className="text-sm text-muted-foreground">
        Helping local businesses get discovered. Built with ❤️
      </p>
    </div>
  </footer>
);

export default Footer;
