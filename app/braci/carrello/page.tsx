"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, updateQuantity, getCartTotal, getCartCount } from "@/lib/cart";
import type { CartItem } from "@/lib/cart";
import { slug } from "@/components/braci/carrello/config";

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

export default function BraciCarrelloPage() {
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
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&family=Manrope:wght@300;400;500;600;700&display=swap');`}</style>
      <main style={{ background: tok.bg, minHeight: "100vh", color: tok.text }}>
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
          <Link href="/braci" style={{ color: tok.muted, textDecoration: "none", fontSize: "22px" }}>←</Link>
          <div>
            <h1 style={{ fontFamily: tok.serif, fontSize: "22px", fontWeight: 600, fontStyle: "italic", color: tok.text, lineHeight: 1.1 }}>Carrello</h1>
            <p style={{ fontFamily: tok.sans, fontSize: "12px", color: tok.muted, marginTop: "2px" }}>BRACI</p>
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
                href="/braci"
                style={{
                  display: "inline-block",
                  marginTop: "28px",
                  padding: "12px 32px",
                  background: tok.primary,
                  color: tok.text,
                  borderRadius: "999px",
                  fontFamily: tok.sans,
                  fontSize: "13px",
                  fontWeight: 600,
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
                      border: `1px solid ${tok.border}`,
                      padding: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                      <img src={item.imageUrl} alt={item.nome} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: tok.serif, fontSize: "15px", fontWeight: 600, color: tok.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.nome}</p>
                      <p style={{ fontFamily: tok.sans, fontSize: "13px", color: tok.primary, fontWeight: 700 }}>{item.prezzo}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                      <button onClick={() => handleQty(item.id, item.quantity - 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: `1px solid ${tok.border}`, background: "transparent", color: tok.text, fontSize: "16px", cursor: "pointer" }}>−</button>
                      <span style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 700, color: tok.text, minWidth: "16px", textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => handleQty(item.id, item.quantity + 1)} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "none", background: tok.primary, color: tok.text, fontSize: "16px", cursor: "pointer" }}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "20px", padding: "14px 16px", background: tok.surface, borderRadius: "10px", border: `1px solid ${tok.border}` }}>
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontFamily: tok.sans, fontSize: "13px", color: tok.muted }}>
                    <span>{item.nome} × {item.quantity}</span>
                    <span>€{(item.prezzoNum * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${tok.border}`, marginTop: "8px", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 700, color: tok.text }}>Totale</span>
                  <span style={{ fontFamily: tok.serif, fontSize: "20px", fontWeight: 600, color: tok.primary }}>€{total.toFixed(0)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 24px", background: tok.bg, borderTop: `1px solid ${tok.border}` }}>
            <button
              onClick={() => router.push("/braci/conferma")}
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
                fontWeight: 700,
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
    </>
  );
}
