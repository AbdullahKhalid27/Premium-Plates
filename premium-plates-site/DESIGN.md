---
name: Plate Studio
description: An interactive number plate preview shaped by registration, lettering and light.
colors:
  primary: "#4a1f39"
  deep-plum: "#35172a"
  ink: "#252329"
  mineral-paper: "#f0ede6"
  apricot: "#ff9876"
  line: "#c9c2b9"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Plus Jakarta Sans, Arial, sans-serif"
    fontSize: "16px"
    lineHeight: 1.5
  plate:
    fontFamily: "Charles Wright, sans-serif"
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

The opening pairs a registration field and lettering choices with a live plate under a plum arch. It leads into the builder, finish comparison and collection. The on-car view gives the chosen plate its vehicle context.

**Key Characteristics:**
- A live registration preview with angle, lighting and face controls.
- Editorial type paired with compact, explicit controls.
- A live plate placed in the actual vehicle scene.
- Motion attached to selecting, comparing, and inspecting.

## Colors

Beige carries copy and forms. Kiln plum groups inspection surfaces and primary actions. Apricot identifies focus and active controls against dark plum. White and yellow belong to the plate faces.

## Typography

Georgia carries large titles and italic emphasis. Plus Jakarta Sans carries navigation, descriptions and controls. The existing Charles Wright font is used for illustrative registration previews.

## Layout

Desktop puts the headline and registration beside the plate. The opening stacks at 760px. The builder becomes a vertical flow at 800px and reserves the on-car preview geometry before the media loads.

## Elevation & Depth

Shadows belong mainly to the physical plate specimen, menu, and sheet. Material comparison uses an actual clipping boundary controlled by an accessible range input.

## Shapes

Page sections and main actions have square corners. Plate previews have gently rounded corners, with short, hex, and motorcycle formats represented as distinct shapes.

## Components

The header collection dropdown jumps directly to a configured studio. Official shadcn/Radix Sheets provide mobile navigation and the demo bag; Accordion provides FAQs. A bag item is a snapshot of the chosen registration and options, so further edits do not silently change it.

The supplied night-drive film sits below the studio with a poster and native play controls. The plate inspection uses native ranges and buttons for repeatable angle and lighting changes. The studio animates a selected plate into the car recess and offers a replay control. Reduced motion disables hover tilt and CSS transitions, with explicit inspection controls available.

## Do's and Don'ts

- Keep the plate visible and the next action obvious.
- Use the supplied footage as an optional styling demonstration.
- Preserve keyboard access and reduced-motion behavior.
- Use the agreed plum and beige palette and substantiate commercial claims before launch.
- Do not present illustrative prices or the show-plate film as verified production specifications.
