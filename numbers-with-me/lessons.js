"use strict";

// Add a theme here, then reference its key in a lesson below.
// Children draw only the theme's simple mark, not the illustrated setting.
window.NUMBER_THEMES = {
  moon: { title: "The moon bus", noun: "travellers", mark: "dots", join: "climb aboard", leave: "hop off", place: "on the moon bus" },
  robot: { title: "Robot recharge", noun: "robots", mark: "boxes", join: "come to charge", leave: "roll away", place: "at the charging station" },
  bridge: { title: "The little bridge crew", noun: "blocks", mark: "boxes", join: "arrive on a delivery", leave: "go to build a bridge", place: "in the building yard" }
};

// Each lesson is [theme, starting amount, amount joining/leaving].
// Keep addition totals within the range and subtraction results non-negative.
// The same quantities drive the story, illustration and notebook answer.
window.NUMBER_LESSONS = {
  5: {
    add: [["moon", 2, 1], ["robot", 1, 2], ["bridge", 3, 1], ["moon", 3, 2], ["robot", 2, 2], ["bridge", 4, 1]],
    subtract: [["moon", 3, 1], ["robot", 4, 2], ["bridge", 5, 1], ["moon", 5, 2], ["robot", 3, 2], ["bridge", 4, 1]]
  },
  10: {
    add: [["moon", 4, 2], ["robot", 5, 2], ["bridge", 6, 2], ["moon", 5, 4], ["robot", 7, 3], ["bridge", 6, 3]],
    subtract: [["moon", 6, 2], ["robot", 7, 3], ["bridge", 8, 2], ["moon", 9, 4], ["robot", 10, 3], ["bridge", 3, 3]]
  }
};
