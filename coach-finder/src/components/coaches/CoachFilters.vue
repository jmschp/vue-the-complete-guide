<template>
  <base-card>
    <h2>Find your coach</h2>
    <span class="filter-option">
      <!-- Using v-model -->
      <input type="checkbox" id="backend" name="backend" checked :value="filters.backend" @change="updateFilter" />

      <!-- Using a custom event -->
      <!-- <input type="checkbox" id="backend" name="backend" checked @change="setFilter" /> -->
      <label for="backend">Backend</label>
    </span>

    <span class="filter-option">
      <!-- Using v-model -->
      <input
        type="checkbox"
        id="frontend"
        name="frontend"
        checked
        :model-value="filters.frontend"
        @change="updateFilter"
      />

      <!-- Using a custom event -->
      <!-- <input type="checkbox" id="frontend" name="frontend" checked @change="setFilter" /> -->
      <label for="frontend">Frontend</label>
    </span>

    <span class="filter-option">
      <!-- Using v-model -->
      <input type="checkbox" id="career" name="career" checked :model-value="filters.career" @change="updateFilter" />

      <!-- Using a custom event -->
      <!-- <input type="checkbox" id="career" name="career" checked @change="setFilter" /> -->
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<!-- Using a custom event -->
<!-- <script>
export default {
  emits: ["change-filter"],
  data() {
    return {
      filters: { backend: true, frontend: true, career: true }
    }
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id
      const isChecked = event.target.checked
      const updatedFilters = {
        ...this.filters,
        [inputId]: isChecked
      }
      this.filters = updatedFilters
      this.$emit("change-filter", this.filters)
    }
  }
}
</script> -->

<!-- Using v-model -->
<script>
export default {
  emits: ["update:filters"],
  props: { filters: { type: Object, required: true } },
  methods: {
    updateFilter(event) {
      const inputId = event.target.id
      const isChecked = event.target.checked
      this.$emit("update:filters", { ...this.filters, [inputId]: isChecked })
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
