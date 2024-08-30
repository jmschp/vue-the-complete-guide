Vue.createApp({
  data() {
    return {
      tasks: [],
      newTask: null,
      listVisible: true,
    };
  },
  computed: {
    btnText() {
     return this.listVisible ? "Hide list" : "Show list";
    },
  },
  methods: {
    addTask() {
      this.tasks.push(this.newTask);
      this.newTask = null;
    },
    toggleList() {
      this.listVisible = !this.listVisible;
    },
  },
}).mount("#assignment");
