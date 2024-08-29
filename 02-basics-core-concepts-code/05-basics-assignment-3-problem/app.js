Vue.createApp({
  data() {
    return {
      sum: 0,
    };
  },
  methods: {
    add(number) {
      this.sum = this.sum + number;
    },
  },
  computed: {
    result() {
      if (this.sum < 37) {
        return "Not there yet";
      } else if (this.sum > 37) {
        return "Too much!";
      } else {
        return this.sum;
      }
    },
  },
  watch: {
    result() {
      const that = this;
      setTimeout(() => {
        that.sum = 0;
      }, 5000);
    },
  },
}).mount("#assignment");
