"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, updateQuantity, getCartTotal, getCartCount } from "@/lib/cart";
import type { CartItem } from "@/lib/cart";
import { slug } from "@/components/osteria-roma-light/carrello/config";

const tok = {
  bg: "#FAF6F0",
  surface: "#FFFFFF",
  borderLight: "#E8DDD0",
  primary: "#C4622D",
  text: "#2C1810",
  muted: "#7A6552",
  serif: "'EB Garamond', 'Georgia', serif",
  sans: "'Work Sans', sans-serif",
};

export default function OrlCarrelloPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart(slug));
  }, []);

  function handleQty(id: string, qty: number) {
    setItems(updateQuantity(slug, id, qty));
  }

  const total = getCartTotal(items);
  const count = getCartCount(items);

  return (
    <main style={{ background: tok.bg, minHeight: "100vh", color: tok.text }}>
      <div
        style={{
          borderBottom: `1px solid ${tok.borderLight}`,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          position: "sticky",
          top: 0,
          background: tok.surface,
          zIndex: 50,
          boxShadow: "0 1px 4px rgba(44,24,16,0.06)",
        }}
      >
        <Link href="/osteria-roma-light" style={{ color: tok.muted, textDecoration: "none", fontSize: "22px" }}>←</Link>
        <div>
          <h1 style={{ fontFamily: tok.serif, fontSize: "22px", fontWeight: 400, fontStyle: "italic", color: tok.text, lineHeight: 1.1 }}>Carrello</h1>
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
            <p style={{ fontFamily: tok.serif, fontSize: "26px", fontStyle: "italic", color: tok.muted }}>Il carrello è vuoto</p>
            <Link
              href="/osteria-roma-light"
              style={{
                display: "inline-block",
                marginTop: "28px",
                padding: "12px 32px",
                background: tok.primary,
                color: "#FFFFFF",
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
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    background: tok.surface,
                    borderRadius: "10px",
                    border: `1px solid ${tok.borderLight}`,
                    padding: "10px",
                    alignItems: "center",
                    boxShadow: "0 1px 3px rgba(44,24,16,0.05)",
                  }}
                >
                  <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                    <img src={item.imageUrl} alt={item.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: tok.serif, fontSize: "16px", fontWeight: 400, color: tok.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nome}</p>
                    <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.primary, fontWeight: 600 }}>{item.prezzo}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                    <button onClick={() => handleQty(item.id, item.quantity - 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: `1px solid ${tok.borderLight}`, background: "transparent", color: tok.text, fontSize: "16px", cursor: "pointer" }}>−</button>
                    <span style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 600, color: tok.text, minWidth: "16px", textAlign: "center" }}>{item.quantity}</span>
                    <button onClick={() => handleQty(item.id, item.quantity + 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "none", background: tok.primary, color: "#FFFFFF", fontSize: "16px", cursor: "pointer" }}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "20px", padding: "14px 16px", background: tok.surface, borderRadius: "10px", border: `1px solid ${tok.borderLight}`, boxShadow: "0 1px 3px rgba(44,24,16,0.05)" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontFamily: tok.sans, fontSize: "13px", color: tok.muted }}>
                  <span>{item.nome} × {item.quantity}</span>
                  <span>€{(item.prezzoNum * item.quantity).toFixed(0)}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${tok.borderLight}`, marginTop: "8px", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 600, color: tok.text }}>Totale</span>
                <span style={{ fontFamily: tok.serif, fontSize: "20px", fontWeight: 400, color: tok.primary }}>€{total.toFixed(0)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {items.length > 0 && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 24px", background: tok.surface, borderTop: `1px solid ${tok.borderLight}`, boxShadow: "0 -2px 12px rgba(44,24,16,0.08)" }}>
          <button
            onClick={() => router.push("/osteria-roma-light/conferma")}
            style={{
              width: "100%",
              maxWidth: "560px",
              display: "block",
              margin: "0 auto",
              padding: "16px",
              background: tok.primary,
              border: "none",
              borderRadius: "12px",
              color: "#FFFFFF",
              fontFamily: tok.sans,
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.12em",
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
