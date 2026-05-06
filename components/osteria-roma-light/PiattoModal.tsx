"use client";

import React from "react";
import type { PiattoData } from "./data";

const tok = {
  surface: "#FFFFFF",
  borderLight: "#E8DDD0",
  primary: "#C4622D",
  text: "#2C1810",
  muted: "#7A6552",
  serif: "'EB Garamond', 'Georgia', serif",
  sans: "'Work Sans', sans-serif",
};

interface PiattoModalProps {
  piatto: PiattoData;
  onClose: () => void;
}

export function PiattoModal({ piatto, onClose }: PiattoModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(44,24,16,0.5)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: tok.surface,
          border: `1px solid ${tok.borderLight}`,
          borderRadius: "16px 16px 0 0",
          width: "100%",
          maxWidth: "560px",
          overflow: "hidden",
          boxShadow: "0 -8px 40px rgba(44,24,16,0.12)",
        }}
      >
        <div style={{ position: "relative", paddingTop: "50%" }}>
          <img src={piatto.imageUrl} alt={piatto.nome} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              color: tok.text,
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: "20px 24px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <h2 style={{ fontFamily: tok.serif, fontSize: "22px", fontWeight: 500, color: tok.text, flex: 1, fontStyle: "italic" }}>
              {piatto.nome}
            </h2>
            <span style={{ fontFamily: tok.sans, fontSize: "18px", fontWeight: 600, color: tok.primary, marginLeft: "12px" }}>
              {piatto.prezzo}
            </span>
          </div>
          <p style={{ fontFamily: tok.sans, fontSize: "14px", color: tok.muted, lineHeight: 1.6, marginBottom: "12px" }}>
            {piatto.descrizione}
          </p>
          {piatto.ingredienti && (
            <p style={{ fontFamily: tok.sans, fontSize: "12px", color: tok.muted }}>
              <strong style={{ color: tok.text }}>Ingredienti:</strong> {piatto.ingredienti}
            </p>
          )}
          {piatto.allergeni && (
            <p style={{ fontFamily: tok.sans, fontSize: "11px", color: tok.muted, marginTop: "4px" }}>
              <strong style={{ color: tok.text }}>Allergeni:</strong> {piatto.allergeni}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
