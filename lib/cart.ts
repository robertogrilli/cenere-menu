export interface CartItem {
  id: string;
  nome: string;
  prezzo: string;
  prezzoNum: number;
  imageUrl: string;
  categoria: string;
  quantity: number;
}

function parsePrice(prezzo: string): number {
  const match = prezzo.replace(",", ".").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function key(slug: string) {
  return `cart_${slug}`;
}

export function getCart(slug: string): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key(slug)) ?? "[]");
  } catch {
    return [];
  }
}

function saveCart(slug: string, items: CartItem[]) {
  localStorage.setItem(key(slug), JSON.stringify(items));
}

export function addToCart(
  slug: string,
  piatto: { id: string; nome: string; prezzo: string; imageUrl: string; categoria: string }
): CartItem[] {
  const items = getCart(slug);
  const existing = items.find((i) => i.id === piatto.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...piatto, prezzoNum: parsePrice(piatto.prezzo), quantity: 1 });
  }
  saveCart(slug, items);
  return items;
}

export function updateQuantity(slug: string, id: string, qty: number): CartItem[] {
  const items = getCart(slug).filter((i) => (i.id === id ? qty > 0 : true));
  items.forEach((i) => { if (i.id === id) i.quantity = qty; });
  saveCart(slug, items);
  return items;
}

export function clearCart(slug: string) {
  localStorage.removeItem(key(slug));
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.prezzoNum * i.quantity, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}
