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

interface DishCardProps {
  piatto: PiattoData;
  onSelect: (p: PiattoData) => void;
  onAdd: (p: PiattoData) => void;
}

export function DishCard({ piatto, onSelect, onAdd }: DishCardProps) {
  return (
    <div
      onClick={() => onSelect(piatto)}
      style={{
        background: tok.surface,
        border: `1px solid ${tok.borderLight}`,
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(44,24,16,0.06)",
      }}
    >
      <div style={{ position: "relative", paddingTop: "75%" }}>
        <img
          src={piatto.imageUrl}
          alt={piatto.nome}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: "12px 14px" }}>
        <h3 style={{ fontFamily: tok.serif, fontSize: "18px", fontWeight: 500, color: tok.text, marginBottom: "4px", lineHeight: 1.2 }}>
          {piatto.nome}
        </h3>
        {piatto.descrizione && (
          <p
            style={{
              fontFamily: tok.sans,
              fontSize: "13px",
              color: tok.muted,
              lineHeight: 1.5,
              marginBottom: "10px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {piatto.descrizione}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: tok.sans, fontSize: "15px", fontWeight: 600, color: tok.primary }}>{piatto.prezzo}</span>
          <button
            aria-label={`Aggiungi ${piatto.nome}`}
            onClick={(e) => { e.stopPropagation(); onAdd(piatto); }}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: tok.primary,
              border: "none",
              cursor: "pointer",
              color: "#FFFFFF",
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
