import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { isAdmin } from "@/lib/auth";
import { toast } from "sonner";
import { LogOut, Trash2, Image as ImageIcon, Users, Mail, MessageCircle, Send, Shield, Upload } from "lucide-react";
import logo from "@/assets/logo.png";

interface GalleryItem { id: string; title: string; description: string | null; media_type: string; media_url: string; created_at: string; }
interface Registration { id: string; full_name: string; email: string; phone: string; age: string; course: string; package: string; created_at: string; }
interface ContactMsg { id: string; name: string; email: string; message: string; created_at: string; }
interface ChatMsg { id: string; student_id: string; sender_id: string; sender_role: "admin"|"student"; message: string; created_at: string; }
interface Profile { user_id: string; display_name: string | null; email: string | null; }

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { navigate("/AHMADISNOT1122"); return; }
      if (!(await isAdmin(data.session.user.id))) { toast.error("Not an admin"); navigate("/AHMADISNOT1122"); return; }
      setUser(data.session.user);
      setChecking(false);
    })();
  }, [navigate]);

  const logout = async () => { await supabase.auth.signOut(); navigate("/AHMADISNOT1122"); };

  if (checking) return <div className="min-h-screen flex items-center justify-center bg-gradient-soft"><p>Checking access…</p></div>;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ILQA" className="w-10 h-10 object-contain bg-white/10 rounded-full p-1" />
            <div>
              <div className="font-display font-bold text-lg">Admin Dashboard</div>
              <div className="text-xs opacity-80 flex items-center gap-1"><Shield className="w-3 h-3" /> {user?.email}</div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="bg-white/10 border-white/30 hover:bg-white/20"><LogOut className="w-4 h-4" /> Logout</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="gallery">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="gallery"><ImageIcon className="w-4 h-4 mr-1" /> Gallery</TabsTrigger>
            <TabsTrigger value="students"><Users className="w-4 h-4 mr-1" /> Students</TabsTrigger>
            <TabsTrigger value="messages"><Mail className="w-4 h-4 mr-1" /> Contact</TabsTrigger>
            <TabsTrigger value="chats"><MessageCircle className="w-4 h-4 mr-1" /> Chats</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery"><GalleryTab /></TabsContent>
          <TabsContent value="students"><StudentsTab /></TabsContent>
          <TabsContent value="messages"><ContactTab /></TabsContent>
          <TabsContent value="chats"><ChatsTab adminId={user.id} /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// ---------------- GALLERY TAB ----------------
const GalleryTab = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
    setItems((data as GalleryItem[]) || []);
  };
  useEffect(() => { load(); }, []);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error("Choose a file"); return; }
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: upErr } = await supabase.storage.from("gallery").upload(path, file);
    if (upErr) { setUploading(false); toast.error(upErr.message); return; }
    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
    const media_type = file.type.startsWith("video") ? "video" : "image";
    const { error } = await supabase.from("gallery_items").insert({ ...form, media_type, media_url: urlData.publicUrl });
    setUploading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Uploaded!");
    setForm({ title: "", description: "" }); setFile(null);
    (document.getElementById("gallery-file") as HTMLInputElement).value = "";
    load();
  };

  const del = async (it: GalleryItem) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("gallery_items").delete().eq("id", it.id);
    const path = it.media_url.split("/gallery/")[1];
    if (path) await supabase.storage.from("gallery").remove([path]);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form onSubmit={upload} className="bg-card border border-border rounded-2xl p-6 space-y-3 shadow-card lg:col-span-1 h-fit">
        <h3 className="font-display font-bold text-primary text-lg flex items-center gap-2"><Upload className="w-4 h-4" /> Upload Media</h3>
        <div><Label>Title *</Label><Input required value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} /></div>
        <div><Label>Description</Label><Textarea rows={2} value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} /></div>
        <div><Label>Image or Video *</Label><Input id="gallery-file" required type="file" accept="image/*,video/*" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} /></div>
        <Button type="submit" variant="hero" className="w-full" disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</Button>
      </form>
      <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
        {items.length === 0 && <p className="text-muted-foreground col-span-2">No items yet.</p>}
        {items.map((it) => (
          <div key={it.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
            {it.media_type === "image" ? (
              <img src={it.media_url} alt={it.title} className="w-full h-40 object-cover" />
            ) : (
              <video src={it.media_url} className="w-full h-40 object-cover bg-black" />
            )}
            <div className="p-3">
              <div className="font-display font-bold text-primary text-sm truncate">{it.title}</div>
              <div className="text-xs text-muted-foreground capitalize">{it.media_type}</div>
              <Button size="sm" variant="outline" className="mt-2 text-destructive" onClick={() => del(it)}><Trash2 className="w-3 h-3" /> Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------- STUDENTS TAB ----------------
const StudentsTab = () => {
  const [regs, setRegs] = useState<Registration[]>([]);
  useEffect(() => {
    supabase.from("registrations").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setRegs((data as Registration[]) || []));
  }, []);
  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="p-4 border-b border-border"><h3 className="font-display font-bold text-primary">Registered Students ({regs.length})</h3></div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr>
            <th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Age</th><th className="p-3">Course</th><th className="p-3">Package</th><th className="p-3">Date</th>
          </tr></thead>
          <tbody>
            {regs.map((r) => (
              <tr key={r.id} className="border-t border-border hover:bg-muted/40">
                <td className="p-3 font-medium">{r.full_name}</td><td className="p-3"><a href={`mailto:${r.email}`} className="text-primary hover:underline">{r.email}</a></td>
                <td className="p-3"><a href={`https://wa.me/${r.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-primary hover:underline">{r.phone}</a></td>
                <td className="p-3">{r.age}</td><td className="p-3">{r.course}</td><td className="p-3">{r.package}</td>
                <td className="p-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {regs.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No registrations yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---------------- CONTACT TAB ----------------
const ContactTab = () => {
  const [msgs, setMsgs] = useState<ContactMsg[]>([]);
  useEffect(() => {
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setMsgs((data as ContactMsg[]) || []));
  }, []);
  return (
    <div className="space-y-4">
      <h3 className="font-display font-bold text-primary text-lg">Contact Form Submissions ({msgs.length})</h3>
      {msgs.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
      {msgs.map((m) => (
        <div key={m.id} className="bg-card border border-border rounded-xl p-5 shadow-card">
          <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
            <div>
              <div className="font-display font-bold text-primary">{m.name}</div>
              <a href={`mailto:${m.email}`} className="text-sm text-primary hover:underline">{m.email}</a>
            </div>
            <div className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
          </div>
          <p className="text-sm whitespace-pre-wrap">{m.message}</p>
        </div>
      ))}
    </div>
  );
};

// ---------------- CHATS TAB ----------------
const ChatsTab = ({ adminId }: { adminId: string }) => {
  const [students, setStudents] = useState<(Profile & { last?: string })[]>([]);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  // Load students that have chatted (or all profiles)
  useEffect(() => {
    (async () => {
      const { data: profiles } = await supabase.from("profiles").select("user_id, display_name, email");
      setStudents((profiles as Profile[]) || []);
    })();

    const ch = supabase.channel("admin-chats")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (payload) => {
        const m = payload.new as ChatMsg;
        if (selected && m.student_id === selected.user_id) setMessages((p) => [...p, m]);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [selected]);

  const openChat = async (s: Profile) => {
    setSelected(s);
    const { data } = await supabase.from("chat_messages").select("*").eq("student_id", s.user_id).order("created_at", { ascending: true });
    setMessages((data as ChatMsg[]) || []);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selected) return;
    const text = input.trim();
    setInput("");
    const { error } = await supabase.from("chat_messages").insert({
      student_id: selected.user_id, sender_id: adminId, sender_role: "admin", message: text,
    });
    if (error) toast.error(error.message);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4 h-[70vh]">
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-y-auto">
        <div className="p-3 border-b border-border font-display font-bold text-primary">Students ({students.length})</div>
        {students.map((s) => (
          <button key={s.user_id} onClick={() => openChat(s)}
            className={`w-full text-left p-3 border-b border-border hover:bg-muted transition-smooth ${selected?.user_id === s.user_id ? "bg-muted" : ""}`}>
            <div className="font-medium text-sm">{s.display_name || "Unnamed"}</div>
            <div className="text-xs text-muted-foreground truncate">{s.email}</div>
          </button>
        ))}
        {students.length === 0 && <p className="p-4 text-sm text-muted-foreground">No students yet.</p>}
      </div>

      <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-card flex flex-col">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">Select a student to chat</div>
        ) : (
          <>
            <div className="p-3 border-b border-border">
              <div className="font-display font-bold text-primary">{selected.display_name || "Unnamed"}</div>
              <div className="text-xs text-muted-foreground">{selected.email}</div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && <p className="text-center text-muted-foreground py-8">No messages yet. Start the conversation!</p>}
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender_role === "admin" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${m.sender_role === "admin" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <div className="text-sm whitespace-pre-wrap break-words">{m.message}</div>
                    <div className="text-[10px] opacity-70 mt-1">{new Date(m.created_at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
              <Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Reply to student..." />
              <Button type="submit" variant="hero" size="icon"><Send className="w-4 h-4" /></Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
