import { applyProduct, defaultDraft, motorcyclePhoto } from "@/config/catalogue";
import type { PlateKind } from "@/config/pricing";
import Plate from "./Plate";

export default function CataloguePlate({ kind, reg }: { kind: PlateKind; reg?: string }) {
  const draft = applyProduct(defaultDraft, kind);
  return (
    <div className="catalogue-specimen" data-motorcycle={kind === "moto"}>
      {kind === "moto" && <div className="motorcycle-scene" style={{ backgroundImage: `url('${motorcyclePhoto}')` }} aria-hidden="true" />}
      <Plate reg={reg} kind={kind} side={kind === "regular" ? "front" : "rear"} options={draft} />
    </div>
  );
}

