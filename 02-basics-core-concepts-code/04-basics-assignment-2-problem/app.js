Vue.createApp({
  data() {
    return {
      alertMessage: "Alert pay attention!",
      textOutput: null,
      textOutputConfirmed: null
    };
  },
  methods: {
    triggerAlert() {
      alert(this.alertMessage);
    },
    registerKeydownOutput(event) {
      this.textOutput = event.target.value
    },
    registerEnterOutput(event) {
      this.textOutputConfirmed = event.target.value
    }
  },
}).mount("#assignment");
