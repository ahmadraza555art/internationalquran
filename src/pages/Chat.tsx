import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, MessageCircle } from "lucide-react";

interface Msg {
  id: string;
  sender_role: "admin" | "student";
  message: string;
  created_at: string;
}

const Chat = () => {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { navigate("/auth"); return; }
      setUser(data.session.user);
    });
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("student_id", user.id)
        .order("created_at", { ascending: true });
      setMessages((data as Msg[]) || []);
      setLoading(false);
    };
    load();

    const channel = supabase
      .channel(`chat-${user.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `student_id=eq.${user.id}` }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Msg]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    const text = input.trim();
    setInput("");
    const { error } = await supabase.from("chat_messages").insert({
      student_id: user.id, sender_id: user.id, sender_role: "student", message: text,
    });
    if (error) toast.error("Failed to send: " + error.message);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-gradient-soft">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="bg-card rounded-2xl shadow-elegant border border-border overflow-hidden flex flex-col h-[70vh]">
            <div className="bg-gradient-hero text-primary-foreground p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><MessageCircle /></div>
              <div>
                <div className="font-display font-bold">Academy Support</div>
                <div className="text-xs opacity-80">We typically reply within a few hours</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading && <p className="text-center text-muted-foreground">Loading...</p>}
              {!loading && messages.length === 0 && (
                <p className="text-center text-muted-foreground py-12">Send your first message — assalamualaikum 🌙</p>
              )}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender_role === "student" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${m.sender_role === "student" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                    <div className="text-sm whitespace-pre-wrap break-words">{m.message}</div>
                    <div className="text-[10px] opacity-70 mt-1">{new Date(m.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
              <Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Type your message..." />
              <Button type="submit" variant="hero" size="icon"><Send className="w-4 h-4" /></Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
