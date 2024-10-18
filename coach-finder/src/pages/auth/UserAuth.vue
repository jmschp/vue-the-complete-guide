<template>
  <div>
    <base-dialog :show="isLoading" title="Authenticating.." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error" title="Authentication failed" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <form @submit.prevent="handleSubmit">
        <div class="form-control">
          <label for="email">Email</label>
          <input id="email" type="email" name="email" v-model.trim="email" placeholder="Email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input id="password" type="password" name="password" v-model="password" placeholder="Password" />
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and password.</p>

        <base-button type="submit">{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchButtonCaption }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import { mapActions } from "pinia"

import { useAuthUserStore } from "@/stores/authUser"

export default {
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null
    }
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login" ? "Login" : "Signup"
    },
    switchButtonCaption() {
      return this.mode === "signup" ? "Login instead" : "Signup instead"
    }
  },
  methods: {
    ...mapActions(useAuthUserStore, ["signup", "login"]),
    handleError() {
      this.error = null
    },
    async handleSubmit() {
      try {
        this.isLoading = true
        this.formIsValid = true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (this.email === "" || !emailRegex.test(this.email) || this.password.length < 6) {
          this.formIsValid = false
          return
        }
        if (this.mode === "signup") {
          await this.signup(this.email, this.password)
        } else {
          await this.login(this.email, this.password)
        }
        const redirectUrl = `/${this.$route.query.redirect || "coaches"}`
        this.$router.replace(redirectUrl)
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    switchAuthMode() {
      this.mode = this.mode === "login" ? "signup" : "login"
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
