const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      firstName: null,
      lastName: null,
      confirmedName: null,
    };
  },
  methods: {
    increase(number) {
      this.counter = this.counter + number;
    },
    decrease(number) {
      this.counter = this.counter - number;
    },
    // Using v-model in the input event we don't need this function
    // setName(event) {
    //   this.firstName = event.target.value;
    // },
    confirmName() {
      this.confirmedName = this.fullName;
    },
    resetInput() {
      this.firstName = null;
      this.lastName = null;
      this.confirmedName = null;
    },
    submitForm() {
      alert("Form submitted");
    },
  },
  computed: {
    fullName() {
      if (this.firstName === null || this.lastName === null) return null;
      return this.firstName + " " + this.lastName;
    },
  },
  watch: {
    counter(counterValue) {
      if (counterValue > 50) {
        this.counter = 0;
      }
    },
  },
});

app.mount("#events");
