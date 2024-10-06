<template>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control" :class="{ invalid: !email.isValid }">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model.trim="email.value" @blur="clearValidation('email')" />
      </div>
      <div class="form-control" :class="{ invalid: !message.isValid }">
        <label for="message">Message</label>
        <textarea
          id="message"
          name="message"
          v-model.trim="message.value"
          @blur="clearValidation('message')"
        ></textarea>
      </div>
      <p class="error" v-if="!formIsValid">Please enter a valid message</p>
      <div class="actions">
        <base-button type="submit">Send Message</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { mapActions } from "pinia"
import { useRequestStore } from "@/stores/request"

export default {
  data() {
    return {
      email: {
        value: "",
        isValid: true
      },
      message: {
        value: "",
        isValid: true
      },
      formIsValid: true
    }
  },
  methods: {
    ...mapActions(useRequestStore, ["addRequest"]),
    clearValidation(input) {
      this[input].isValid = true
    },
    submitForm() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      this.formIsValid = true
      if (this.email.value === "" || !emailRegex.test(this.email.value) || this.message.value === "") {
        this.formIsValid = false
        return
      }
      this.addRequest({
        coachId: this.$route.params.id,
        email: this.email.value,
        message: this.message.value
      })
      this.$router.replace("/coaches")
    }
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
