import type { PlateKind } from "@/config/pricing";
import InteractivePlate from "./InteractivePlate";

type Face = "front" | "rear";
export type Inspection = {
  face: Face;
  angle: number;
  light: number;
  headlights: boolean;
};

type PlateInspectionProps = {
  reg: string;
  kind: PlateKind;
  badge: boolean;
  border: boolean;
  settings: Inspection;
  onChange: (settings: Inspection) => void;
};

export default function PlateInspection({
  reg, kind, badge, border, settings, onChange,
}: PlateInspectionProps) {
  const { face, angle, light, headlights } = settings;
  const hasTwoFaces = kind !== "moto" && kind !== "show";

  return (
    <div className="plate-inspection">
      <div className="inspection-stage" data-headlights={headlights}>
        <InteractivePlate
          reg={reg}
          kind={kind}
          side={hasTwoFaces ? face : "rear"}
          badge={badge}
          border={border}
          angle={angle}
          lightPosition={light}
          headlights={headlights}
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
          <label>
            <span>Light position</span>
            <input
              type="range"
              min="0"
              max="100"
              value={light}
              onChange={(event) => onChange({ ...settings, light: event.currentTarget.valueAsNumber })}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
