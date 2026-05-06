"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { PIATTI, GALLERY_IMAGES, HERO_IMAGE } from "@/components/braci/data";
import type { PiattoData } from "@/components/braci/data";
import { DishCard } from "@/components/braci/DishCard";
import { PiattoModal } from "@/components/braci/PiattoModal";
import { addToCart, getCartCount, getCart } from "@/lib/cart";

const slug = "braci";

const tok = {
  bg: "#0A0A0A",
  surface: "#141414",
  border: "rgba(200,84,26,0.2)",
  primary: "#C8541A",
  text: "#F5EFE8",
  muted: "#A89880",
  serif: "'Playfair Display', 'Georgia', serif",
  sans: "'Manrope', 'system-ui', sans-serif",
};

export default function BraciPage() {
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap');
        @keyframes braci-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .braci-gallery { animation: braci-scroll 24s linear infinite; }
        .braci-gallery-mask {
          mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
      `}</style>

      <main style={{ background: tok.bg, minHeight: "100vh", color: tok.text, overflowX: "hidden" }}>

        {/* ── CART BADGE ── */}
        {cartCount > 0 && (
          <Link
            href="/braci/carrello"
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 100,
              background: tok.primary,
              color: tok.text,
              borderRadius: "999px",
              padding: "8px 18px",
              fontFamily: tok.sans,
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 20px rgba(200,84,26,0.4)",
            }}
          >
            <span>Carrello</span>
            <span
              style={{
                background: tok.text,
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
              border: `1px solid ${tok.border}`,
              color: tok.primary,
              borderRadius: "999px",
              padding: "8px 20px",
              fontFamily: tok.sans,
              fontSize: "13px",
              fontWeight: 600,
              pointerEvents: "none",
            }}
          >
            Aggiunto al carrello
          </div>
        )}

        {/* ── HERO ── */}
        <section style={{ position: "relative", height: "100svh", minHeight: "600px", overflow: "hidden" }}>
          <img
            src={HERO_IMAGE}
            alt="BRACI"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.45)" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, ${tok.bg} 0%, rgba(10,10,10,0.3) 60%, transparent 100%)`,
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
              padding: "0 24px 80px",
              textAlign: "center",
            }}
          >
            <p style={{ fontFamily: tok.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: tok.primary, marginBottom: "16px" }}>
              Milano · Navigli
            </p>
            <h1
              style={{
                fontFamily: tok.serif,
                fontSize: "clamp(56px, 12vw, 96px)",
                fontWeight: 600,
                fontStyle: "italic",
                color: tok.text,
                lineHeight: 1,
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              BRACI
            </h1>
            <p style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 300, color: tok.muted, letterSpacing: "0.15em", marginBottom: "40px" }}>
              Cucina alla brace · Carbone · Fuoco
            </p>
            <button
              onClick={() => document.getElementById("menu-braci")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                padding: "14px 40px",
                background: "transparent",
                border: `1px solid rgba(200,84,26,0.5)`,
                borderRadius: "999px",
                color: tok.text,
                fontFamily: tok.sans,
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.25em",
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
          <div className="braci-gallery-mask">
            <div className="braci-gallery" style={{ display: "flex", gap: "16px", width: "max-content" }}>
              {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((src, i) => (
                <div key={i} style={{ width: "280px", height: "200px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── QUOTE ── */}
        <div style={{ textAlign: "center", padding: "40px 24px" }}>
          <p style={{ fontFamily: tok.serif, fontSize: "clamp(20px, 4vw, 32px)", fontStyle: "italic", color: tok.muted }}>
            "Il fuoco non mente mai"
          </p>
        </div>

        {/* ── MENU ── */}
        <section id="menu-braci" style={{ maxWidth: "1080px", margin: "0 auto", padding: "20px 20px 80px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontFamily: tok.serif, fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 600, fontStyle: "italic", color: tok.text, marginBottom: "6px" }}>
              Il Menu
            </h2>
            <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.muted }}>
              Tocca un piatto per scoprire ingredienti · usa + per aggiungerlo al carrello
            </p>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              background: tok.surface,
              borderRadius: "10px",
              border: `1px solid ${tok.border}`,
              padding: "4px",
              marginBottom: "24px",
              overflowX: "auto",
            }}
          >
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
                  color: activeTab === i ? tok.text : tok.muted,
                  fontFamily: tok.sans,
                  fontSize: "13px",
                  fontWeight: 600,
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
        <section style={{ textAlign: "center", padding: "60px 24px 80px", borderTop: `1px solid ${tok.border}` }}>
          <p style={{ fontFamily: tok.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: tok.primary, marginBottom: "16px" }}>
            Milano · Via Tortona 14 · Navigli
          </p>
          <h2 style={{ fontFamily: tok.serif, fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 600, fontStyle: "italic", color: tok.text, marginBottom: "32px" }}>
            Conferma il tuo ordine
          </h2>
          <Link
            href="/braci/carrello"
            style={{
              display: "inline-block",
              padding: "14px 48px",
              background: tok.primary,
              borderRadius: "999px",
              color: tok.text,
              fontFamily: tok.sans,
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Vai al carrello
          </Link>
          <p style={{ fontFamily: tok.sans, fontSize: "12px", color: tok.muted, marginTop: "16px" }}>
            Mar–Dom · 12:00–15:00 · 19:00–23:00
          </p>
        </section>

        {/* ── MODAL ── */}
        {selectedPiatto && (
          <PiattoModal piatto={selectedPiatto} onClose={() => setSelectedPiatto(null)} />
        )}
      </main>
    </>
  );
}
