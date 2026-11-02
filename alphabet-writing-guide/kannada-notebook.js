"use strict";
/* Paired-guide placement, reconstructed from Janapriya Kannada Copy Book 1.
 * Per-letter body anchors are in the original 400x400 path coordinate system.
 * Only a uniform scale and translation are applied: movement, pen lifts,
 * curves, proportions and relative mark positions are preserved.
 * See review/KANNADA-RULING-SOURCES.md for primary references and limitations.
 * Transformed Kannada path contributions retain their original CC BY-SA 4.0 license.
 */
window.KANNADA_NOTEBOOK = (() => {
  const lines = [145, 250];
  const source = "https://drive.google.com/file/d/1M1NQwmvdIKU3u3TumRt6gF2XoWlqUClc/view";
  const placements = {
    "ಅ": {"bodyTop": 87.7, "bodyBottom": 313.0, "page": 4, "row": "upper", "note": "The main body is positioned within the paired guides."},
    "ಆ": {"bodyTop": 89.8, "bodyBottom": 310.0, "page": 4, "row": "lower", "note": "The main body is positioned within the paired guides."},
    "ಇ": {"bodyTop": 92, "bodyBottom": 232, "page": 5, "row": "upper", "note": "The lower finishing tail extends below the body baseline."},
    "ಈ": {"bodyTop": 157.6, "bodyBottom": 303.6, "page": 5, "row": "lower", "note": "The upper bar curl rises above the guide; the right finishing tail retains its original proportions."},
    "ಉ": {"bodyTop": 129.6, "bodyBottom": 270.2, "page": 6, "row": "upper", "note": "The main body is positioned within the paired guides."},
    "ಊ": {"bodyTop": 148.7, "bodyBottom": 251.5, "page": 6, "row": "lower", "note": "The main body is positioned within the paired guides."},
    "ಋ": {"bodyTop": 144, "bodyBottom": 272.3, "page": 7, "row": "upper", "note": "The middle crest rises above the guide; the connected bowls keep their proportions."},
    "ಎ": {"bodyTop": 89.3, "bodyBottom": 312.2, "page": 8, "row": "upper", "note": "The main body is positioned within the paired guides."},
    "ಏ": {"bodyTop": 134.4, "bodyBottom": 320.6, "page": 8, "row": "lower", "note": "The upper finishing curl sits above the main body band."},
    "ಐ": {"bodyTop": 92.3, "bodyBottom": 308.5, "page": 9, "row": "upper", "note": "The main body is positioned within the paired guides."},
    "ಒ": {"bodyTop": 150, "bodyBottom": 305, "page": 9, "row": "lower", "note": "The small upper loop rises above the body guide."},
    "ಓ": {"bodyTop": 180, "bodyBottom": 319.2, "page": 10, "row": "upper", "note": "The small upper loop and separate length mark rise above the body guide."},
    "ಔ": {"bodyTop": 128.8, "bodyBottom": 319.3, "page": 10, "row": "lower", "note": "The upper head strokes sit above the main bowls."},
    "ಅಂ": {"bodyTop": 134.6, "bodyBottom": 265.4, "page": 11, "row": "upper", "note": "The main body is positioned within the paired guides."},
    "ಅಃ": {"bodyTop": 119.1, "bodyBottom": 282.7, "page": 11, "row": "lower", "note": "The main body is positioned within the paired guides."},
    "ಕ": {"bodyTop": 137.398, "bodyBottom": 321.097, "page": 12, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಖ": {"bodyTop": 128.444, "bodyBottom": 304.819, "page": 12, "row": "lower", "note": "The main curves define the body band; their original proportions are preserved."},
    "ಗ": {"bodyTop": 137.398, "bodyBottom": 328.618, "page": 13, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಘ": {"bodyTop": 118.154, "bodyBottom": 263.172, "page": 13, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ಙ": {"bodyTop": 95.0, "bodyBottom": 296.283, "page": 22, "row": "upper", "note": "The main curves define the body band; their original proportions are preserved."},
    "ಚ": {"bodyTop": 136.774, "bodyBottom": 319.778, "page": 14, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಛ": {"bodyTop": 108.533, "bodyBottom": 263.467, "page": 14, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ಜ": {"bodyTop": 99.487, "bodyBottom": 300.111, "page": 15, "row": "upper", "note": "The main curves define the body band; their original proportions are preserved."},
    "ಝ": {"bodyTop": 136.364, "bodyBottom": 249.282, "page": 15, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ಞ": {"bodyTop": 132.147, "bodyBottom": 216.319, "page": 22, "row": "lower", "note": "The middle loop defines the body baseline; its finishing tail continues below."},
    "ಟ": {"bodyTop": 77.5, "bodyBottom": 308.221, "page": 16, "row": "upper", "note": "The main curves define the body band; their original proportions are preserved."},
    "ಠ": {"bodyTop": 135.122, "bodyBottom": 319.115, "page": 16, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಡ": {"bodyTop": 110.738, "bodyBottom": 266.32, "page": 17, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ಢ": {"bodyTop": 93.759, "bodyBottom": 262.721, "page": 17, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ಣ": {"bodyTop": 105.92, "bodyBottom": 294.442, "page": 23, "row": "upper", "note": "The main curves define the body band; their original proportions are preserved."},
    "ತ": {"bodyTop": 135.122, "bodyBottom": 326.593, "page": 18, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಥ": {"bodyTop": 95.493, "bodyBottom": 263.789, "page": 18, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ದ": {"bodyTop": 123.529, "bodyBottom": 319.002, "page": 19, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಧ": {"bodyTop": 110.351, "bodyBottom": 321.547, "page": 19, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ನ": {"bodyTop": 122.72, "bodyBottom": 326.56, "page": 23, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಪ": {"bodyTop": 128.814, "bodyBottom": 324.496, "page": 20, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಫ": {"bodyTop": 115.238, "bodyBottom": 272.316, "page": 20, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ಬ": {"bodyTop": 87.521, "bodyBottom": 301.53, "page": 21, "row": "upper", "note": "The main curves define the body band; their original proportions are preserved."},
    "ಭ": {"bodyTop": 108.533, "bodyBottom": 267.422, "page": 21, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline. The separate lower mark extends below the baseline."},
    "ಮ": {"bodyTop": 152.791, "bodyBottom": 289.789, "page": 24, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಯ": {"bodyTop": 155.258, "bodyBottom": 275.658, "page": 24, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ರ": {"bodyTop": 137.398, "bodyBottom": 321.391, "page": 25, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಲ": {"bodyTop": 87.748, "bodyBottom": 307.245, "page": 25, "row": "lower", "note": "The main curves define the body band; their original proportions are preserved."},
    "ವ": {"bodyTop": 132.846, "bodyBottom": 321.373, "page": 26, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಶ": {"bodyTop": 128.293, "bodyBottom": 320.694, "page": 26, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಷ": {"bodyTop": 132.756, "bodyBottom": 315.813, "page": 27, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಸ": {"bodyTop": 122.72, "bodyBottom": 326.56, "page": 27, "row": "lower", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಹ": {"bodyTop": 135.122, "bodyBottom": 318.111, "page": 28, "row": "upper", "note": "Head stroke at the upper body guide; lower body at the baseline."},
    "ಳ": {"bodyTop": 132.258, "bodyBottom": 256.452, "page": 28, "row": "lower", "note": "The main sweep defines the body baseline; the lower loop extends below."}
  };
  function place(character) {
    const placement = placements[character.name];
    if (!placement) throw new Error(`Missing Kannada notebook placement: ${character.name}`);
    const scale = (lines[1] - lines[0]) / (placement.bodyBottom - placement.bodyTop);
    const shiftY = lines[0] - placement.bodyTop * scale;
    const strokes = character.strokes.map(stroke => {
      // All researched paths use absolute M/L/C commands, each with x,y pairs.
      if (/[^MLC\d.\s-]/.test(stroke.d)) throw new Error("Unsupported Kannada path command");
      let axis = 0;
      const d = stroke.d.replace(/-?\d+(?:\.\d+)?/g, value => {
        const coordinate = axis++ % 2 === 0
          ? 200 + (Number(value) - 200) * scale
          : Number(value) * scale + shiftY;
        return coordinate.toFixed(3);
      });
      return {...stroke, d, strokeWidth: (stroke.strokeWidth || 12) * scale};
    });
    return {...character, strokes, notebookPlacement: {...placement, scale, shiftY, source}};
  }
  return {lines, source, placements, place};
})();
