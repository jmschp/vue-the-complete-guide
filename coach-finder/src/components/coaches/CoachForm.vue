<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" name="firstName" v-model="firstName" />
    </div>

    <div class="form-control">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" name="lastName" v-model.trim="lastName" />
    </div>

    <div class="form-control">
      <label for="description">Description</label>
      <textarea id="description" name="description" v-model.trim="description"></textarea>
    </div>

    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="hourlyRate" name="hourlyRate" v-model.number="hourlyRate" />
    </div>

    <div class="form-control">
      <label for="areas">Areas</label>
      <select id="areas" name="areas" multiple v-model="areas">
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="career">Career</option>
      </select>
    </div>
    <base-button type="submit">Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: "",
      lastName: "",
      hourlyRate: 0,
      areas: [],
      description: ""
    }
  },
  methods: {
    submitForm() {
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        description: this.description,
        hourlyRate: this.hourlyRate,
        areas: this.areas
      }

      this.$emit("save-data", formData)
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
