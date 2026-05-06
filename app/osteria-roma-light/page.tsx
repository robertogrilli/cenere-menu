"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { PIATTI, GALLERY_IMAGES } from "@/components/osteria-roma-light/data";
import type { PiattoData } from "@/components/osteria-roma-light/data";
import { DishCard } from "@/components/osteria-roma-light/DishCard";
import { PiattoModal } from "@/components/osteria-roma-light/PiattoModal";
import { addToCart, getCartCount, getCart } from "@/lib/cart";

const slug = "osteria-roma-light";

const tok = {
  bg: "#FAF6F0",
  surface: "#FFFFFF",
  border: "rgba(196,98,45,0.2)",
  borderLight: "#E8DDD0",
  primary: "#C4622D",
  text: "#2C1810",
  muted: "#7A6552",
  serif: "'EB Garamond', 'Georgia', serif",
  sans: "'Work Sans', sans-serif",
};

export default function OsteriaRomaLightPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPiatto, setSelectedPiatto] = useState<PiattoData | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categorie = [...new Set(PIATTI.map((p) => p.categoria))];

  useEffect(() => {
    setCartCount(getCartCount(getCart(slug)));
  }, []);

  const handleAdd = useCallback((piatto: PiattoData) => {
    const items = addToCart(slug, piatto);
    setCartCount(getCartCount(items));
    setAddedId(piatto.id);
    setTimeout(() => setAddedId(null), 900);
  }, []);

  const piattiInCategoria = PIATTI.filter((p) => p.categoria === categorie[activeTab]);

  return (
    <main style={{ background: tok.bg, minHeight: "100vh", color: tok.text, overflowX: "hidden" }}>
      <style>{`
        @keyframes orl-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .orl-gallery { animation: orl-scroll 22s linear infinite; }
        .orl-mask {
          mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>

      {/* Cart badge */}
      {cartCount > 0 && (
        <Link
          href="/osteria-roma-light/carrello"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 100,
            background: tok.primary,
            color: "#FFFFFF",
            borderRadius: "999px",
            padding: "8px 18px",
            fontFamily: tok.sans,
            fontSize: "13px",
            fontWeight: 500,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 16px rgba(196,98,45,0.3)",
          }}
        >
          <span>Carrello</span>
          <span
            style={{
              background: "#FFFFFF",
              color: tok.primary,
              borderRadius: "50%",
              width: "22px",
              height: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {cartCount}
          </span>
        </Link>
      )}

      {addedId && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            background: tok.surface,
            border: `1px solid ${tok.borderLight}`,
            color: tok.primary,
            borderRadius: "999px",
            padding: "8px 20px",
            fontFamily: tok.sans,
            fontSize: "13px",
            fontWeight: 500,
            boxShadow: "0 4px 16px rgba(44,24,16,0.1)",
            pointerEvents: "none",
          }}
        >
          Aggiunto al carrello
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "85svh", minHeight: "540px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80"
          alt="Osteria Roma"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(250,246,240,1) 0%, rgba(250,246,240,0.2) 60%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 24px 64px",
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: tok.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: tok.primary, marginBottom: "12px" }}>
            Trastevere · Roma
          </p>
          <h1
            style={{
              fontFamily: tok.serif,
              fontSize: "clamp(52px, 10vw, 88px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: tok.text,
              lineHeight: 1,
              marginBottom: "14px",
            }}
          >
            Osteria Roma
          </h1>
          <p style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 300, color: tok.muted, letterSpacing: "0.1em", marginBottom: "36px" }}>
            La cucina della tradizione
          </p>
          <button
            onClick={() => document.getElementById("menu-light")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "13px 36px",
              background: tok.primary,
              border: "none",
              borderRadius: "999px",
              color: "#FFFFFF",
              fontFamily: tok.sans,
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Sfoglia il Menu
          </button>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <div style={{ width: "100%", overflow: "hidden", padding: "40px 0", background: tok.bg }}>
        <div className="orl-mask">
          <div className="orl-gallery" style={{ display: "flex", gap: "14px", width: "max-content" }}>
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, i) => (
              <div key={i} style={{ width: "260px", height: "195px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, border: `1px solid ${tok.borderLight}` }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUOTE ── */}
      <div style={{ textAlign: "center", padding: "48px 24px", borderTop: `1px solid ${tok.borderLight}`, borderBottom: `1px solid ${tok.borderLight}` }}>
        <blockquote style={{ fontFamily: tok.serif, fontSize: "clamp(20px, 4vw, 32px)", fontStyle: "italic", color: tok.muted, maxWidth: "500px", margin: "0 auto" }}>
          "Mangiare a Roma è capire Roma"
        </blockquote>
      </div>

      {/* ── MENU ── */}
      <section id="menu-light" style={{ maxWidth: "1080px", margin: "0 auto", padding: "48px 20px 80px" }}>
        <h2 style={{ fontFamily: tok.serif, fontSize: "clamp(36px, 6vw, 54px)", fontWeight: 400, fontStyle: "italic", color: tok.text, marginBottom: "6px" }}>
          Il Nostro Menu
        </h2>
        <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.muted, marginBottom: "28px" }}>
          Tocca un piatto per scoprire ingredienti · usa + per aggiungerlo al carrello
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", background: tok.surface, borderRadius: "10px", border: `1px solid ${tok.borderLight}`, padding: "4px", marginBottom: "24px", overflowX: "auto" }}>
          {categorie.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "8px",
                border: "none",
                background: activeTab === i ? tok.primary : "transparent",
                color: activeTab === i ? "#FFFFFF" : tok.muted,
                fontFamily: tok.sans,
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
          {piattiInCategoria.map((piatto) => (
            <DishCard key={piatto.id} piatto={piatto} onSelect={setSelectedPiatto} onAdd={handleAdd} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ textAlign: "center", padding: "60px 24px 80px", borderTop: `1px solid ${tok.borderLight}`, background: tok.surface }}>
        <p style={{ fontFamily: tok.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: tok.primary, marginBottom: "12px" }}>
          Trastevere · Roma · Via della Lungaretta 12
        </p>
        <h2 style={{ fontFamily: tok.serif, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, fontStyle: "italic", color: tok.text, marginBottom: "32px" }}>
          Conferma ordine al tavolo
        </h2>
        <Link
          href="/osteria-roma-light/carrello"
          style={{
            display: "inline-block",
            padding: "14px 48px",
            background: tok.primary,
            borderRadius: "999px",
            color: "#FFFFFF",
            fontFamily: tok.sans,
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Vai al carrello
        </Link>
        <p style={{ fontFamily: tok.sans, fontSize: "12px", color: tok.muted, marginTop: "16px" }}>
          Lun–Dom · 12:30–15:00 · 19:30–23:30
        </p>
      </section>

      {selectedPiatto && (
        <PiattoModal piatto={selectedPiatto} onClose={() => setSelectedPiatto(null)} />
      )}
    </main>
  );
}
