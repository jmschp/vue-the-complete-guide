<template>
  <form>
    <div>
      <label for="friend-name">Name</label>
      <input type="text" id="friend-name" name="name" autocomplete="on" v-model="name" />
    </div>
    <div>
      <label for="friend-phone">Phone</label>
      <input type="tel" id="friend-phone" name="phone" autocomplete="on" v-model="phone" />
    </div>
    <div>
      <label for="friend-email">Email</label>
      <input type="email" id="friend-email" name="email" autocomplete="on" v-model="email" />
    </div>
    <button type="submit" @click.prevent="submitNewFriend">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      phone: null,
      email: null
    }
  },
  emits: ["submitted-new-friend"],
  methods: {
    submitNewFriend() {
      this.$emit("submitted-new-friend", this.name, this.phone, this.email)
      this.name = null
      this.phone = null
      this.email = null
    }
  }
}
</script>

<style>
#app form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app input {
  font: inherit;
  padding: 0.15rem;
}

#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}

#app form div {
  margin: 1rem 0;
}
</style>
