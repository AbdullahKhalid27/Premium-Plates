import { applyProduct, defaultDraft, motorcyclePhoto } from "@/config/catalogue";
import type { PlateKind } from "@/config/pricing";
import Plate from "./Plate";

export default function CataloguePlate({ kind }: { kind: PlateKind }) {
  const draft = applyProduct(defaultDraft, kind);
  return (
    <div className="catalogue-specimen" data-motorcycle={kind === "moto"}>
      {kind === "moto" && <div className="motorcycle-scene" style={{ backgroundImage: `url('${motorcyclePhoto}')` }} aria-hidden="true" />}
      <Plate kind={kind} side={kind === "regular" ? "front" : "rear"} options={draft} />
    </div>
  );
}
