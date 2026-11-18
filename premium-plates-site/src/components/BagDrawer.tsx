"use client";
import Link from "@/components/StoreLink";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "./ui/sheet";
import Plate from "./Plate";
import { collection, finishes, priceDraft } from "@/config/catalogue";
import { basketTotal, type BasketLine } from "@/lib/basket";
import "./bag-drawer.css";

const money = (amount: number) => amount.toLocaleString("en-GB", { style: "currency", currency: "GBP" });
type Props = {
  open: boolean;
  onOpen: (open: boolean) => void;
  items: BasketLine[];
  edit: (line: BasketLine) => void;
  quantity: (id: string, quantity: number) => void;
  writable: boolean;
};

export default function BagDrawer({ open, onOpen, items, edit, quantity, writable }: Props) {
  return <Sheet open={open} onOpenChange={onOpen}><SheetContent className="pp-sheet basket-sheet order-bag">
    <SheetTitle>Your bag</SheetTitle>
    <SheetDescription>Review your plate designs and estimated prices.</SheetDescription>
    {!items.length && <p>Your bag is empty. <button onClick={() => {onOpen(false); document.getElementById("studio")?.scrollIntoView();}}>Build a plate</button></p>}
    {items.map(line => {
      const quote = priceDraft(line, line.quantity);
      return <article key={line.id} aria-label={line.reg}>
        <div className="bag-specimen"><Plate reg={line.reg} kind={line.kind} side={line.side} badge={line.badge} border={line.border} options={line} /></div>
        <h3>{line.reg} · {collection.find(p => p.id === line.kind)?.name}</h3>
        <p>{line.kind === "show" ? "Display only" : "Road-style preview"} · {line.side === "both" ? "Front and rear" : line.side + " only"} · {finishes[line.lettering]}</p>
        <details><summary>Options and price breakdown</summary>
          <p>{line.vehicle} · {line.size} · {line.layout} · {line.material} · {line.badge === "none" ? "No identifier" : line.badge.toUpperCase()+" identifier"}</p>
          {line.slogan && <p>Slogan · {line.slogan}</p>}
          <dl>{quote.breakdown.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{money(row.amount)}</dd></div>)}</dl>
        </details>
        <div className="bag-actions">
          <button aria-label={"Decrease quantity for " + line.reg} disabled={line.quantity<=1} onClick={() => quantity(line.id,line.quantity-1)}>−</button>
          <span aria-label="Quantity">{line.quantity}</span>
          <button aria-label={"Increase quantity for " + line.reg} disabled={!Number.isSafeInteger(line.quantity+1)} onClick={() => quantity(line.id,line.quantity+1)}>+</button>
          <button onClick={() => edit(line)}>Edit design</button><button onClick={() => quantity(line.id,0)}>Remove</button>
        </div>
        <strong>{quote.formattedTotal}</strong>
      </article>;
    })}
    {!!items.length && <footer><div>Estimated total <strong>{money(basketTotal(items))}</strong></div>
      {writable ? <Link href="/checkout/">Continue to checkout</Link> : <p role="status">Enable session storage to carry this bag into checkout.</p>}
    </footer>}
  </SheetContent></Sheet>;
}
