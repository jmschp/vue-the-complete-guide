<template>
  <li>
    <h2>{{ name }}</h2>
    <p v-if="isFavorite">Favorite</p>
    <div>
      <button @click="toggleDetails">{{ detailsVisible ? "Hide" : "Show" }}</button>
    </div>
    <div>
      <button @click="toggleFavorite">{{ isFavorite ? "Remove from" : "Add to" }} favorites</button>
    </div>
    <ul v-show="detailsVisible">
      <li><strong>Phone:</strong> {{ phone }}</li>
      <li><strong>Email:</strong> {{ email }}</li>
    </ul>
    <button type="button" @click="$emit('delete-contact', id)">Delete</button>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    isFavorite: {
      type: Boolean,
      require: true
    }
  },
  emits: ["toggle-favorite", "delete-contact"],
  data() {
    return {
      detailsVisible: true
    }
  },
  methods: {
    toggleDetails() {
      this.detailsVisible = !this.detailsVisible
    },
    toggleFavorite() {
      this.$emit("toggle-favorite", this.id)
    }
  }
}
</script>

<style>
#app li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
</style>
