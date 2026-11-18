import { motorcyclePhoto } from "@/config/catalogue";
import type { PlateBadge, PlateKind } from "@/config/pricing";
import InteractivePlate from "./InteractivePlate";
import type { PlateOptions } from "./Plate";

type Face = "front" | "rear";
export type Inspection = {
  face: Face;
  angle: number;
  headlights: boolean;
};

type PlateInspectionProps = {
  reg: string;
  kind: PlateKind;
  badge: PlateBadge;
  border: boolean;
  options?: PlateOptions;
  settings: Inspection;
  onChange: (settings: Inspection) => void;
};

export default function PlateInspection({
  reg, kind, badge, border, options, settings, onChange,
}: PlateInspectionProps) {
  const { face, angle, headlights } = settings;
  const hasTwoFaces = kind !== "moto";

  return (
    <div className="plate-inspection">
      <div className="inspection-stage" data-headlights={headlights} data-motorcycle={kind === "moto"}>
        {kind === "moto" && <div className="motorcycle-scene" style={{ backgroundImage: `url('${motorcyclePhoto}')` }} aria-hidden="true" />}
        {kind !== "moto" && <><span className="street-lamp street-lamp-left" aria-hidden="true" /><span className="street-lamp street-lamp-right" aria-hidden="true" /></>}
        <InteractivePlate
          reg={reg}
          kind={kind}
          side={hasTwoFaces ? face : "rear"}
          badge={badge}
          border={border}
          angle={angle}
          headlights={headlights}
          options={options}
        />
        <span className="inspection-caption">Illustrative preview</span>
      </div>
      <div className="inspection-controls">
        <div className="inspection-options">
          {hasTwoFaces && (
            <div className="inspection-segments" role="group" aria-label="Preview face">
              {(["front", "rear"] as const).map((side) => (
                <button
                  key={side}
                  type="button"
                  aria-pressed={face === side}
                  onClick={() => onChange({ ...settings, face: side })}
                >
                  {side === "front" ? "Front" : "Rear"}
                </button>
              ))}
            </div>
          )}
          <button
            className="inspection-headlights"
            type="button"
            aria-pressed={headlights}
            onClick={() => onChange({ ...settings, headlights: !headlights })}
          >
            Headlights
          </button>
        </div>
        <div className="inspection-ranges">
          <label>
            <span>Plate angle <span aria-hidden="true">{angle}°</span></span>
            <input
              type="range"
              min="-28"
              max="28"
              value={angle}
              aria-valuetext={`${angle} degrees`}
              onChange={(event) => onChange({ ...settings, angle: event.currentTarget.valueAsNumber })}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
