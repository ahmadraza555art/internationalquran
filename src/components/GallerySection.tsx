import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Item { id: string; title: string; description: string | null; media_type: string; media_url: string; }

const GallerySection = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("gallery_items").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setItems((data as Item[]) || []); setLoading(false); });
  }, []);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Gallery</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">Our Moments</h2>
          <p className="text-muted-foreground text-lg">Photos and videos from our classes, events and students.</p>
        </div>
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No gallery items yet. Check back soon!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {items.map((it) => (
              <div key={it.id} className="bg-card rounded-2xl overflow-hidden shadow-card border border-border group hover:shadow-elegant transition-smooth">
                {it.media_type === "image" ? (
                  <img src={it.media_url} alt={it.title} loading="lazy" className="w-full h-56 object-cover group-hover:scale-105 transition-smooth" />
                ) : (
                  <video src={it.media_url} controls className="w-full h-56 object-cover bg-black" />
                )}
                <div className="p-4">
                  <h3 className="font-display font-bold text-primary">{it.title}</h3>
                  {it.description && <p className="text-sm text-muted-foreground mt-1">{it.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
