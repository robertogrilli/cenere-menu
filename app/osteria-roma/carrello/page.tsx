"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, updateQuantity, getCartTotal, getCartCount } from "@/lib/cart";
import type { CartItem } from "@/lib/cart";
import { slug } from "@/components/osteria-roma/carrello/config";

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

export default function CarrelloPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart(slug));
  }, []);

  function handleQty(id: string, qty: number) {
    const updated = updateQuantity(slug, id, qty);
    setItems(updated);
  }

  const total = getCartTotal(items);
  const count = getCartCount(items);

  return (
    <main style={{ background: tok.bg, minHeight: "100vh", color: tok.text }}>
      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${tok.border}`,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "sticky",
          top: 0,
          background: tok.bg,
          zIndex: 50,
        }}
      >
        <Link href="/osteria-roma" style={{ color: tok.muted, textDecoration: "none", fontFamily: tok.sans, fontSize: "22px", lineHeight: 1 }}>←</Link>
        <div>
          <h1 style={{ fontFamily: tok.serif, fontSize: "22px", fontWeight: 500, fontStyle: "italic", color: tok.text, lineHeight: 1.1 }}>Carrello</h1>
          <p style={{ fontFamily: tok.sans, fontSize: "12px", color: tok.muted, marginTop: "2px" }}>Osteria Roma</p>
        </div>
        {count > 0 && (
          <span style={{ marginLeft: "auto", fontFamily: tok.sans, fontSize: "12px", color: tok.muted }}>
            {count} {count === 1 ? "piatto" : "piatti"}
          </span>
        )}
      </div>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "24px 16px 120px" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: "80px" }}>
            <p style={{ fontFamily: tok.serif, fontSize: "28px", fontStyle: "italic", color: tok.muted }}>Il carrello è vuoto</p>
            <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.muted, marginTop: "8px" }}>Torna al menu e aggiungi i tuoi piatti preferiti</p>
            <Link
              href="/osteria-roma"
              style={{
                display: "inline-block",
                marginTop: "32px",
                padding: "12px 32px",
                background: tok.primary,
                color: tok.text,
                borderRadius: "999px",
                fontFamily: tok.sans,
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textDecoration: "none",
              }}
            >
              Sfoglia il Menu
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "14px",
                    background: tok.surface,
                    borderRadius: "10px",
                    border: `1px solid ${tok.border}`,
                    padding: "12px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                    <img src={item.imageUrl} alt={item.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: tok.serif, fontSize: "16px", fontWeight: 500, color: tok.text, lineHeight: 1.2, marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.nome}
                    </p>
                    <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.primary, fontWeight: 600 }}>{item.prezzo}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                    <button onClick={() => handleQty(item.id, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: `1px solid ${tok.border}`, background: "transparent", color: tok.text, fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontFamily: tok.sans, fontSize: "15px", fontWeight: 600, color: tok.text, minWidth: "18px", textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => handleQty(item.id, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "none", background: tok.primary, color: tok.text, fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "24px", padding: "16px", background: tok.surface, borderRadius: "10px", border: `1px solid ${tok.border}` }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontFamily: tok.sans, fontSize: "13px", color: tok.muted }}>
                  <span>{item.nome} × {item.quantity}</span>
                  <span>€{(item.prezzoNum * item.quantity).toFixed(0)}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${tok.border}`, marginTop: "8px", paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 600, color: tok.text }}>Totale</span>
                <span style={{ fontFamily: tok.serif, fontSize: "20px", fontWeight: 500, color: tok.primary }}>€{total.toFixed(0)}</span>
              </div>
            </div>

            <p style={{ fontFamily: tok.sans, fontSize: "11px", color: tok.muted, textAlign: "center", marginTop: "12px", letterSpacing: "0.05em" }}>
              Il cameriere porterà l'ordine al tuo tavolo
            </p>
          </>
        )}
      </div>

      {items.length > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "16px 24px", background: tok.bg, borderTop: `1px solid ${tok.border}` }}>
          <button
            onClick={() => router.push("/osteria-roma/conferma")}
            style={{
              width: "100%",
              maxWidth: "560px",
              display: "block",
              margin: "0 auto",
              padding: "16px",
              background: tok.primary,
              border: "none",
              borderRadius: "12px",
              color: tok.text,
              fontFamily: tok.sans,
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            Conferma ordine · €{total.toFixed(0)}
          </button>
        </div>
      )}
    </main>
  );
}
