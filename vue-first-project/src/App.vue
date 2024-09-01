<template>
  <header>
    <h1>FriendList</h1>
  </header>
  <FriendForm @submitted-new-friend="addNewFriend" />
  <ul>
    <FriendContact
      v-for="friend in friends"
      :key="friend.id"
      v-bind="friend"
      @toggle-favorite="toggleFavorite"
      @delete-contact="deleteContact"
    />
  </ul>
</template>

<script>
import FriendContact from "./components/FriendContact.vue"
import FriendForm from "./components/FriendForm.vue"

export default {
  components: {
    FriendContact,
    FriendForm
  },
  data() {
    return {
      friends: [
        {
          id: "d30b48b3-e17e-4efe-a89d-04673f203c78",
          name: "Manuel Lorenz",
          phone: "Ï01234 5678 991",
          email: "manuel@localhost.com",
          isFavorite: true
        },
        {
          id: "e767f836-56f1-4a3a-b575-4d9fec0020c1",
          name: "Julie Jones",
          phone: "09876 543 221",
          email: "julie@localhost.com",
          isFavorite: false
        }
      ]
    }
  },
  methods: {
    toggleFavorite(friendId) {
      const friend = this.friends.find((friend) => friend.id === friendId)
      friend.isFavorite = !friend.isFavorite
    },
    addNewFriend(name, phone, email) {
      const newFriend = { id: uuidV4(), name, phone, email, isFavorite: false }
      this.friends.push(newFriend)
    },
    deleteContact(friendId) {
      this.friends = this.friends.filter((friend) => friend.id !== friendId)
    }
  }
}

function uuidV4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  )
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
