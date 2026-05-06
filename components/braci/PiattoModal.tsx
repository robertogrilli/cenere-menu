"use client";

import React from "react";
import type { PiattoData } from "./data";

const tok = {
  surface: "#141414",
  border: "rgba(200,84,26,0.2)",
  primary: "#C8541A",
  text: "#F5EFE8",
  muted: "#A89880",
  serif: "'Playfair Display', 'Georgia', serif",
  sans: "'Manrope', 'system-ui', sans-serif",
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
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: tok.surface,
          border: `1px solid ${tok.border}`,
          borderRadius: "16px 16px 0 0",
          width: "100%",
          maxWidth: "560px",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", paddingTop: "50%" }}>
          <img
            src={piatto.imageUrl}
            alt={piatto.nome}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(0,0,0,0.5)",
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
            <h2 style={{ fontFamily: tok.serif, fontSize: "22px", fontWeight: 700, color: tok.text, flex: 1 }}>
              {piatto.nome}
            </h2>
            <span style={{ fontFamily: tok.sans, fontSize: "18px", fontWeight: 700, color: tok.primary, marginLeft: "12px" }}>
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
