import "./motion.css";

export default function MaterialCloseup() {
  return <section id="anatomy" className="layer-study section-pad" aria-labelledby="layer-study-title">
    <div>
      <h2 id="layer-study-title">Inside a raised plate</h2>
      <p>A raised plate has three visible layers. Look across the face at an angle and you can see how the lettering, reflective face, and backing each contribute to the finished plate.</p>
      <dl>
        <dt>Raised characters</dt><dd>3D Gel has a rounded surface, so the highlight curves across each character. 4D Acrylic has a straighter sidewall and a sharper edge that casts a more defined shadow. Flat lettering sits flush with the face.</dd>
        <dt>Reflective face</dt><dd>This is the white or yellow layer behind the characters on a road plate. It reflects light back towards its source, helping the dark registration stand out in headlights.</dd>
        <dt>Backing</dt><dd>The backing keeps the plate rigid and determines its outline, from a standard oblong to a two-line motorcycle plate. The finished profile must leave room for the assigned registration and its spacing.</dd>
      </dl>
    </div>
    <div className="layer-model" role="img" aria-label="Illustration of lettering above the reflective face and backing">
      <div className="layer-backing" /><div className="layer-face" /><div className="layer-type">PP24 LUX</div>
    </div>
  </section>;
}
