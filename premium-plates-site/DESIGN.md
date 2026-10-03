---
name: Premium Plates
description: A cinematic plate studio shaped by the car, the registration, and the finish.
colors:
  primary: "#622f35"
  petroleum: "#142126"
  ink: "#111b1e"
  mineral-paper: "#f0ede6"
  copper: "#caa785"
  line: "#d0cdc5"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.5
  plate:
    fontFamily: "Roboto Condensed, sans-serif"
    fontWeight: 700
rounded:
  plate: "6px"
spacing:
  section-desktop: "100px"
  section-mobile: "65px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.mineral-paper}"
    height: "48px"
    padding: "12px 18px"
  button-light:
    backgroundColor: "{colors.mineral-paper}"
    textColor: "{colors.ink}"
    height: "48px"
    padding: "12px 18px"
---

## Overview

**Creative North Star: "The car gives the plate its context."**

The opening uses supplied night-drive footage, followed by a material collection and an interactive fitting studio. Mineral paper provides reading space; petroleum surfaces hold the car and its preview. Oxblood makes choices visible without competing with the footage.

**Key Characteristics:**
- Cinematic footage with a useful registration entry point.
- Editorial type paired with compact, explicit controls.
- A live plate placed in the actual vehicle scene.
- Motion attached to selecting, comparing, and inspecting.

## Colors

Primary oxblood identifies the main action. Petroleum belongs to the film and preview environment. Mineral paper supports readable forms and information; copper connects display emphasis to the warm street lighting.

## Typography

Instrument Serif carries large titles and italic emphasis. Geist carries navigation, descriptions, and controls. Roboto Condensed is used for illustrative registration previews; it is not asserted to be a production number plate font.

## Layout

Desktop sections use generous side margins and asymmetric compositions. At 800px the configurator becomes a vertical flow; at 520px the hero footage is reframed so the whole plate stays visible. The car preview always reserves its geometry before media loads.

## Elevation & Depth

Shadows belong mainly to the physical plate specimen, menu, and sheet. Material comparison uses an actual clipping boundary controlled by an accessible range input.

## Shapes

Page sections and main actions have square corners. Plate previews have gently rounded corners, with short, hex, and motorcycle formats represented as distinct shapes.

## Components

The header collection dropdown jumps directly to a configured studio. Official shadcn/Radix Sheets provide mobile navigation and the demo bag; Accordion provides FAQs. A bag item is a snapshot of the chosen registration and options, so further edits do not silently change it.

The video is a seven-second H.264 cut with soundtrack assembled from the supplied footage. It starts muted and offers separate sound and playback controls. Reduced motion pauses the initial film, shows a still, and removes nonessential CSS animation; visitors can still choose to play it. The three hero lines enter in a timed sequence. The studio preview animates a newly selected plate into the car recess and offers a replay control. Product hover tilt and moving light are bounded and apply to mouse input only.

## Do's and Don'ts

- Keep the plate visible and the next action obvious.
- Use the supplied footage and its palette as visual context.
- Preserve keyboard access and reduced-motion behavior.
- Do not add purple, fabricated reviews, or unverified commercial claims.
- Do not present illustrative prices or the show-plate film as verified production specifications.
