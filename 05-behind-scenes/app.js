const app1 = Vue.createApp({
  data() {
    return {
      currentUserInput: "",
      message: "Vue is great!",
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      this.message = this.currentUserInput;
    },
    setTextRef() {
      this.message = this.$refs.userInput.value;
    },
  },
  beforeCreated() {
    console.log("beforeCreated hook");
  },
  created() {
    console.log("created hook");
  },
  beforeMount() {
    console.log("beforeMount hook");
  },
  mounted() {
    console.log("mounted hook");
  },
  beforeUpdate() {
    console.log("beforeUpdate hook");
  },
  updated() {
    console.log("updated hook");
  },
  beforeUnmount() {
    console.log("beforeUnmount hook");
  },
  unmounted() {
    console.log("unmounted hook");
  },
});

app1.mount("#app");

// App 2 is completely separated from App 1
const app2 = Vue.createApp({
  data() {
    return {
      favoriteFood: "Pizza",
    };
  },
  template: "<p>{{ favoriteFood }}</p>",
});

app2.mount("#app2");
