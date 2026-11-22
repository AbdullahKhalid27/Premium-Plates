import { draftKey, isDraft, restoredDraft, priceDraft, type Draft } from "@/config/catalogue";

export type BasketLine = Draft & { id: string; quantity: number };

export function parseBasket(saved: unknown): BasketLine[] {
  if (!saved || typeof saved !== "object") return [];
  const state = saved as { items?: unknown; bag?: unknown };
  const candidates: unknown[] = Array.isArray(state.items) ? state.items : [state.bag];
  const lines: BasketLine[] = [];
  const ids = new Set<string>();
  for (const [index, line] of candidates.entries()) {
    if (!isDraft(line)) continue;
    const { id, quantity } = line as Partial<BasketLine>;
    if (typeof quantity !== "number" || !Number.isSafeInteger(quantity) || quantity <= 0) continue;
    let key = typeof id === "string" && id ? id : "saved-" + index;
    while (ids.has(key)) key += "-copy";
    ids.add(key);
    lines.push({ ...restoredDraft(line), id: key, quantity });
  }
  return lines;
}

export function readBasket(): BasketLine[] {
  try {
    return parseBasket(JSON.parse(sessionStorage.getItem(draftKey) || "null"));
  } catch {
    return [];
  }
}

export function basketTotal(items: readonly BasketLine[]): number {
  return items.reduce((pence, item) => pence + Math.round(priceDraft(item, item.quantity).total * 100), 0) / 100;
}
