import Link from "./StoreLink";
import "./motion.css";
import "./material-study.css";

const layers = [
  ["type","Lettering","Look at the edge of a character. Gel gives it a rounded crown. Cut acrylic gives it a straight sidewall and a sharper shadow."],
  ["face","Reflective face","The face is the coloured surface behind the registration. On a modern road plate it is white at the front and yellow at the rear."],
  ["backing","Rigid backing","The backing holds the plate’s shape. Its outline determines how the plate sits against a bumper or motorcycle mount."],
] as const;

export default function MaterialCloseup() {
  return <section id="anatomy" className="material-study section-pad" aria-labelledby="layer-study-title">
    <header><h2 id="layer-study-title">Inside a raised plate</h2>
      <p>Follow a rear plate from the lettering down to the backing. Select a layer to pick it out in the cutaway.</p></header>
    <div className="material-bench">
      <figure><div className="specimen-drawing layer-model" role="img" aria-label="Exploded view of a rear plate with raised lettering, yellow reflective face and dark backing">
        <div className="layer-backing"/><div className="layer-face"/><div className="layer-type">PP24 LUX</div>
      </div><figcaption><span>Rear plate</span><span>Exploded view · illustrative</span></figcaption></figure>
      <fieldset><legend className="sr-only">Highlight a plate layer</legend>{layers.map(([id,title,copy],i)=>
        <label key={id}><input type="radio" name="material-layer" value={id} defaultChecked={i===0}/><span className="layer-number" aria-hidden="true">0{i+1}</span>
          <span><strong>{title}</strong><span>{copy}</span></span></label>)}</fieldset>
    </div><Link className="material-link" href="/#difference">Compare flat, gel and acrylic lettering ↗</Link>
  </section>;
}
