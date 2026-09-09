"use strict";

// Add a theme here, then reference its key in a lesson below.
// Children draw dots in their notebook; they do not need to copy the pictures.
window.NUMBER_THEMES = {
  cats: { title: "Cats come to play", noun: "cats", mark: "dots", icon: "🐱", place: "here", leaveOne: "walks away", leaveMany: "walk away" },
  dogs: { title: "Dogs in the park", noun: "dogs", mark: "dots", icon: "🐶", place: "in the park", leaveOne: "goes home", leaveMany: "go home" },
  cars: { title: "Park the toy cars", noun: "cars", mark: "dots", icon: "🚗", place: "parked here", leaveOne: "rolls away", leaveMany: "roll away" },
  balls: { title: "Balls at playtime", noun: "balls", mark: "dots", icon: "⚽", place: "here", leaveOne: "rolls away", leaveMany: "roll away" },
  balloons: { title: "Balloons at a party", noun: "balloons", mark: "dots", icon: "🎈", place: "at the party", leaveOne: "floats away", leaveMany: "float away" },
  ducks: { title: "Ducks in the pond", noun: "ducks", mark: "dots", icon: "🦆", place: "in the pond", leaveOne: "swims away", leaveMany: "swim away" }
};

// Each lesson is [theme, starting amount, amount joining/leaving].
// Keep addition totals within the range and subtraction results non-negative.
// The same quantities drive the story, illustration and notebook answer.
window.NUMBER_LESSONS = {
  5: {
    add: [["cats", 2, 1], ["dogs", 1, 2], ["cars", 3, 1], ["balls", 3, 2], ["balloons", 2, 2], ["ducks", 4, 1]],
    subtract: [["cats", 3, 1], ["dogs", 4, 2], ["cars", 5, 1], ["balls", 5, 2], ["balloons", 3, 2], ["ducks", 4, 1]]
  },
  10: {
    add: [["cats", 4, 2], ["dogs", 5, 2], ["cars", 6, 2], ["balls", 5, 4], ["balloons", 7, 3], ["ducks", 6, 3]],
    subtract: [["cats", 6, 2], ["dogs", 7, 3], ["cars", 8, 2], ["balls", 9, 4], ["balloons", 10, 3], ["ducks", 3, 3]]
  }
};
