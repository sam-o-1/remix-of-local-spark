import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface InquiryFormProps {
  businessName: string;
  whatsapp: string;
}

const InquiryForm = ({ businessName, whatsapp }: InquiryFormProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    const text = `Hi! I'm ${name}. I found ${businessName} on LBPP.\n\n${message}`;
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    toast({ title: "Inquiry sent via WhatsApp! 🎉" });
    setName("");
    setMessage("");
  };

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <Send className="h-5 w-5 text-primary" />
        Send Inquiry
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-card"
        />
        <Textarea
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="bg-card"
        />
        <Button type="submit" className="w-full">
          <Send className="mr-2 h-4 w-4" /> Send via WhatsApp
        </Button>
      </form>
    </div>
  );
};

export default InquiryForm;
