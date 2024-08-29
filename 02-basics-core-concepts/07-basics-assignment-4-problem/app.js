Vue.createApp({
  data() {
    return {
      inputUserClass: null,
      paragraphHidden: false,
      inputBgColor: "",
    };
  },
  methods: {
    toggleBtn() {
      this.paragraphHidden = !this.paragraphHidden;
    },
  },
  computed: {
    paragraphClasses() {
      return {
        user1: this.inputUserClass === "user1",
        user2: this.inputUserClass === "user2",
        hidden: this.paragraphHidden,
        visible: !this.paragraphHidden,
      };
    },
  },
}).mount("#assignment");
