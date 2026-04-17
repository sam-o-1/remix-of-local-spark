import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(72),
  name: z.string().trim().max(100).optional(),
});

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, name: mode === "signup" ? name : undefined });
    if (!parsed.success) {
      toast({ title: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast({ title: "Account created! You're signed in." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!" });
      }
      navigate("/", { replace: true });
    } catch (err: any) {
      toast({ title: err.message || "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold">
            LB<span className="text-accent">PP</span>
          </span>
        </Link>
        <h1 className="mb-1 text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          {mode === "login" ? "Sign in to continue" : "Sign up as a customer. Vendor access is granted by an admin."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" maxLength={100} />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} maxLength={72} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </Card>
    </div>
  );
};

export default Auth;
