Vue.createApp({
  data() {
    return {
      name: "Miguel Pimenta",
      age: 41,
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
      ageToAdd: 5,
    };
  },
  methods: {
    calculateAge(val) {
      return this.age + val;
    },
  },
}).mount("#assignment");
