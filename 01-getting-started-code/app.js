// Using simple JavaScript
// In the following approach we use imperative programming. We define each action we need to take.

// const inputElement = document.querySelector("input");
// const btnElement = document.querySelector("button");
// const listElement = document.querySelector("ul");

// function insertGoal() {
//   const value = inputElement.value;
//   const listItem = document.createElement("li");
//   listItem.textContent = value;
//   listElement.append(listItem);
//   inputElement.value = "";
// }

// btnElement.addEventListener("click", insertGoal);

// Using Vue
// In the following approach we have the same end result as in the above JavaScript code, but using Vue.
// In this approach we use declarative programming. We are defining the end result not the steps that wee need to take.

Vue.createApp({
  data() {
    return {
      goals: [],
      enteredValue: "",
      // divValue: null
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
      this.enteredValue = "";
    },
  },
}).mount("#app");
