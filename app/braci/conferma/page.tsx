"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clearCart } from "@/lib/cart";
import { slug } from "@/components/braci/conferma/config";

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

function randomOrderId() {
  return "BR-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

export default function BraciConfermaPage() {
  const [orderId] = useState(() => randomOrderId());

  useEffect(() => {
    clearCart(slug);
  }, []);

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,600&family=Manrope:wght@300;500;600&display=swap');`}</style>
      <main
        style={{
          background: tok.bg,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
          color: tok.text,
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "rgba(200,84,26,0.15)",
            border: `2px solid ${tok.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            color: tok.primary,
            marginBottom: "28px",
          }}
        >
          ✓
        </div>

        <p style={{ fontFamily: tok.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: tok.primary, marginBottom: "12px" }}>
          BRACI · Milano
        </p>

        <h1 style={{ fontFamily: tok.serif, fontSize: "clamp(34px, 7vw, 52px)", fontWeight: 600, fontStyle: "italic", color: tok.text, lineHeight: 1.15, marginBottom: "16px" }}>
          Ordine confermato
        </h1>

        <p style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 300, color: tok.muted, lineHeight: 1.7, maxWidth: "300px", marginBottom: "32px" }}>
          Il tuo ordine è stato ricevuto. Il cameriere porterà tutto al tuo tavolo.
        </p>

        <div style={{ background: tok.surface, border: `1px solid ${tok.border}`, borderRadius: "12px", padding: "16px 32px", marginBottom: "36px" }}>
          <p style={{ fontFamily: tok.sans, fontSize: "11px", color: tok.muted, letterSpacing: "0.1em", marginBottom: "4px" }}>Numero ordine</p>
          <p style={{ fontFamily: tok.serif, fontSize: "24px", fontWeight: 600, color: tok.primary, letterSpacing: "0.08em" }}>{orderId}</p>
        </div>

        <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.muted, marginBottom: "36px" }}>Mar–Dom · 12:00–15:00 · 19:00–23:00</p>

        <Link
          href="/braci"
          style={{
            padding: "14px 40px",
            border: `1px solid rgba(200,84,26,0.4)`,
            borderRadius: "999px",
            color: tok.text,
            fontFamily: tok.sans,
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Torna al Menu
        </Link>
      </main>
    </>
  );
}
