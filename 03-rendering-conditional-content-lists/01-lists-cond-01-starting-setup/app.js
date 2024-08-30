Vue.createApp({
  data() {
    return {
      enteredGoal: null,
      goals: [],
    };
  },
  methods: {
    addGoal() {
      this.goals.push(this.enteredGoal);
    },
    removeGoal(index) {
      this.goals.splice(index, 1)
    },
  },
}).mount("#user-goals");
