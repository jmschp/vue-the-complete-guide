const app = Vue.createApp({
  data() {
    return {
      friends: [
        {
          id: 1,
          name: "Manuel Lorenz",
          phone: "Ï01234 5678 991",
          email: "manuel@localhost.com",
          // visible: true,
        },
        {
          id: 2,
          name: "Julie Jones",
          phone: "09876 543 221",
          email: "julie@localhost.com",
          // visible: true,
        },
      ],
    };
  },
  // methods: {
  //   toggleDetails(friendId) {
  //     const friend = this.friends.find((friend) => {
  //       return friend.id === friendId;
  //     });

  //     friend.visible = !friend.visible;
  //   },
  // },
});

app.component("friend-contact", {
  props: ["friend"],
  data() {
    return {
      detailsVisible: true,
      // friend: {
      //   id: 1,
      //   name: "Manuel Lorenz",
      //   phone: "01234 5678 991",
      //   email: "manuel@localhost.com",
      // },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsVisible = !this.detailsVisible;
    },
  },
  template: `
    <li>
    <h2>{{ friend.name }}</h2>
    <button @click="toggleDetails">Show Details</button>
    <ul v-show="detailsVisible">
      <li><strong>Phone:</strong> {{ friend.phone }}</li>
      <li><strong>Email:</strong> {{ friend.email }}</li>
    </ul>
  </li>
  `,
});

app.mount("#app");
