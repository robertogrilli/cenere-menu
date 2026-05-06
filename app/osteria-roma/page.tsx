"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { CinematicLandingHero } from "@/components/osteria-roma/CinematicLandingHero";
import { NeuralNoise } from "@/components/osteria-roma/NeuralNoise";
import { BlurReveal } from "@/components/osteria-roma/BlurReveal";
import SlidingTabs from "@/components/osteria-roma/SlidingTabs";
import { ExpandCards } from "@/components/osteria-roma/ExpandCards";
import { AnimatedModal } from "@/components/osteria-roma/AnimatedModal";
import { ParallaxSection } from "@/components/osteria-roma/Parallax";
import { ImageAutoSlider } from "@/components/osteria-roma/ImageAutoSlider";
import { FloatingChatWidgetShadcnui } from "@/components/osteria-roma/FloatingChatWidgetShadcnui";
import { ShimmerButton } from "@/components/osteria-roma/ShimmerButton";
import {
  PIATTI,
  GALLERY_IMAGES,
  PARALLAX_IMAGE,
} from "@/components/osteria-roma/data";
import type { PiattoData } from "@/components/osteria-roma/data";
import { addToCart, getCartCount, getCart } from "@/lib/cart";

const slug = "osteria-roma";

export default function OsteriaRomaPage() {
  const [selectedPiatto, setSelectedPiatto] = useState<PiattoData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    setCartCount(getCartCount(getCart(slug)));
  }, []);

  const handleAddToCart = useCallback((piatto: PiattoData) => {
    const items = addToCart(slug, piatto);
    setCartCount(getCartCount(items));
    setAddedId(piatto.id);
    setTimeout(() => setAddedId(null), 900);
  }, []);

  const categorie = [...new Set(PIATTI.map((p) => p.categoria))];

  const tabItems = categorie.map((cat) => ({
    key: cat,
    label: cat,
    panel: (
      <ExpandCards
        piatti={PIATTI.filter((p) => p.categoria === cat)}
        onSelect={(p) => {
          setSelectedPiatto(p);
          setModalOpen(true);
        }}
        onAddToCart={handleAddToCart}
      />
    ),
  }));

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      style={{
        background: "#120D08",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <NeuralNoise />

      {/* Cart badge */}
      {cartCount > 0 && (
        <Link
          href="/osteria-roma/carrello"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 100,
            background: "#C4622D",
            color: "#F0E6D3",
            borderRadius: "999px",
            padding: "8px 18px",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 20px rgba(196,98,45,0.4)",
          }}
        >
          <span>Carrello</span>
          <span
            style={{
              background: "#F0E6D3",
              color: "#C4622D",
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

      {/* Added feedback pill */}
      {addedId && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 200,
            background: "#1E1610",
            border: "1px solid rgba(196,98,45,0.4)",
            color: "#C4622D",
            borderRadius: "999px",
            padding: "8px 20px",
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            pointerEvents: "none",
          }}
        >
          Aggiunto al carrello
        </div>
      )}

      {/* ── HERO ── */}
      <CinematicLandingHero
        title="Osteria Roma"
        subtitle="Trastevere · Roma"
        tagline="La cucina della tradizione"
        imageUrl="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80"
        ctaText="Sfoglia il Menu"
        onCtaClick={scrollToMenu}
      />

      {/* ── GALLERY ── */}
      <ImageAutoSlider images={GALLERY_IMAGES} />

      {/* ── PARALLAX ── */}
      <ParallaxSection imageUrl={PARALLAX_IMAGE} className="my-12">
        <BlurReveal>
          <blockquote
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontSize: "clamp(22px, 4vw, 36px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#F0E6D3",
              textAlign: "center",
              maxWidth: "600px",
              padding: "0 24px",
            }}
          >
            "Mangiare a Roma è capire Roma"
          </blockquote>
        </BlurReveal>
      </ParallaxSection>

      {/* ── MENU ── */}
      <section
        id="menu"
        className="px-6 pt-20 pb-6 max-w-6xl mx-auto"
        style={{ position: "relative", zIndex: 10 }}
      >
        <BlurReveal delay={0}>
          <h2
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontSize: "clamp(40px, 7vw, 64px)",
              fontWeight: 500,
              fontStyle: "italic",
              color: "#F0E6D3",
              marginBottom: "8px",
            }}
          >
            Il Nostro Menu
          </h2>
        </BlurReveal>
        <BlurReveal delay={0.2}>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 300,
              color: "#9E7D62",
              letterSpacing: "0.06em",
              marginBottom: "32px",
            }}
          >
            Tocca un piatto per scoprire ingredienti e storia · usa + per aggiungerlo al carrello
          </p>
        </BlurReveal>

        <SlidingTabs items={tabItems} defaultIndex={0} />
      </section>

      {/* ── CTA ── */}
      <section
        className="flex flex-col items-center py-20 px-6"
        style={{ position: "relative", zIndex: 10 }}
      >
        <BlurReveal delay={0}>
          <p
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#C4622D",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            Trastevere · Roma · Via della Lungaretta 12
          </p>
        </BlurReveal>
        <BlurReveal delay={0.2}>
          <h2
            style={{
              fontFamily: "'EB Garamond', 'Georgia', serif",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#F0E6D3",
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            Conferma ordine al tavolo
          </h2>
        </BlurReveal>

        <Link href="/osteria-roma/carrello" style={{ textDecoration: "none" }}>
          <ShimmerButton>Vai al carrello</ShimmerButton>
        </Link>

        <p
          style={{
            fontFamily: "'Work Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 300,
            color: "#9E7D62",
            marginTop: "16px",
          }}
        >
          Lun–Dom · 12:30–15:00 · 19:30–23:30
        </p>
      </section>

      {/* ── MODAL ── */}
      <AnimatedModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        piatto={selectedPiatto}
      />

      {/* ── POPUP ── */}
      <FloatingChatWidgetShadcnui
        offerTitle="Torna all'Osteria Roma"
        offerDescription="10% di sconto al prossimo ordine — lascia il tuo numero."
        triggerDelay={28000}
      />
    </main>
  );
}
