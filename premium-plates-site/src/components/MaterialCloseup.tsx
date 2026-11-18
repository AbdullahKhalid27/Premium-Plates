import "./motion.css";

export default function MaterialCloseup() {
  return <section className="layer-study section-pad" aria-labelledby="layer-study-title">
    <div>
      <h2 id="layer-study-title">Inside a raised plate</h2>
      <dl>
        <dt>Raised characters</dt><dd>The square edges of acrylic letters cast a narrow shadow across the face.</dd>
        <dt>Reflective face</dt><dd>The reflective surface returns light towards its source.</dd>
        <dt>Backing</dt><dd>The backing supports the face and gives the plate its shape.</dd>
      </dl>
    </div>
    <div className="layer-model" role="img" aria-label="Illustration of lettering above the reflective face and backing">
      <div className="layer-backing" /><div className="layer-face" /><div className="layer-type">PP24 LUX</div>
    </div>
  </section>;
}
