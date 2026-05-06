"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clearCart } from "@/lib/cart";
import { slug } from "@/components/osteria-roma/conferma/config";

const tok = {
  bg: "#120D08",
  surface: "#1E1610",
  border: "rgba(196,98,45,0.18)",
  primary: "#C4622D",
  text: "#F0E6D3",
  muted: "#9E7D62",
  serif: "'EB Garamond', 'Georgia', serif",
  sans: "'Work Sans', sans-serif",
};

function randomOrderId() {
  return "OR-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

export default function ConfermaPage() {
  const [orderId] = useState(() => randomOrderId());

  useEffect(() => {
    clearCart(slug);
  }, []);

  return (
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
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "rgba(196,98,45,0.15)",
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

      <p style={{ fontFamily: tok.sans, fontSize: "11px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: tok.primary, marginBottom: "12px" }}>
        Osteria Roma · Trastevere
      </p>

      <h1 style={{ fontFamily: tok.serif, fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 400, fontStyle: "italic", color: tok.text, lineHeight: 1.15, marginBottom: "16px" }}>
        Ordine confermato
      </h1>

      <p style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 300, color: tok.muted, lineHeight: 1.7, maxWidth: "320px", marginBottom: "32px" }}>
        Il tuo ordine è stato ricevuto. Il cameriere porterà tutto al tuo tavolo.
      </p>

      <div style={{ background: tok.surface, border: `1px solid ${tok.border}`, borderRadius: "12px", padding: "16px 32px", marginBottom: "40px" }}>
        <p style={{ fontFamily: tok.sans, fontSize: "11px", color: tok.muted, letterSpacing: "0.1em", marginBottom: "4px" }}>Numero ordine</p>
        <p style={{ fontFamily: tok.serif, fontSize: "24px", fontWeight: 500, color: tok.primary, letterSpacing: "0.08em" }}>{orderId}</p>
      </div>

      <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.muted, marginBottom: "40px" }}>
        Lun–Dom · 12:30–15:00 · 19:30–23:30
      </p>

      <Link
        href="/osteria-roma"
        style={{
          padding: "14px 40px",
          border: `1px solid rgba(196,98,45,0.45)`,
          borderRadius: "999px",
          color: tok.text,
          fontFamily: tok.sans,
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        Torna al Menu
      </Link>
    </main>
  );
}
