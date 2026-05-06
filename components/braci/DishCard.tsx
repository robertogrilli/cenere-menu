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
        border: `1px solid ${tok.border}`,
        borderRadius: "10px",
        overflow: "hidden",
        cursor: "pointer",
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
        <h3
          style={{
            fontFamily: tok.serif,
            fontSize: "17px",
            fontWeight: 600,
            color: tok.text,
            marginBottom: "4px",
            lineHeight: 1.2,
          }}
        >
          {piatto.nome}
        </h3>
        {piatto.descrizione && (
          <p
            style={{
              fontFamily: tok.sans,
              fontSize: "12px",
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
          <span style={{ fontFamily: tok.sans, fontSize: "14px", fontWeight: 700, color: tok.primary }}>
            {piatto.prezzo}
          </span>
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
              color: tok.text,
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
