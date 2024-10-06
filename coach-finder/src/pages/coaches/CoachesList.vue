<template>
  <!-- Using a custom event for filters -->
  <!-- <coach-filters @change-filter="setFilters"></coach-filters> -->

  <!-- Using v-model for filters -->
  <coach-filters v-model:filters="activeFilters"></coach-filters>

  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        >
        </coach-item>
      </ul>
      <h2 v-else>No coaches</h2>
    </base-card>
  </section>
</template>

<script>
import { mapState } from "pinia"
import { useCoachesStore } from "@/stores/coaches"

import CoachFilters from "@/components/coaches/CoachFilters.vue"
import CoachItem from "@/components/coaches/CoachItem.vue"

export default {
  components: {
    CoachFilters,
    CoachItem
  },
  data() {
    return {
      activeFilters: {
        backend: true,
        frontend: true,
        career: true
      }
    }
  },
  computed: {
    ...mapState(useCoachesStore, ["coaches", "hasCoaches"]),
    filteredCoaches() {
      const coaches = this.coaches
      return coaches.filter((coach) => {
        if (this.activeFilters.backend && coach.areas.includes("backend")) return true
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) return true
        if (this.activeFilters.career && coach.areas.includes("career")) return true
        return false
      })
    }
  }
  // Using a custom event for filters
  // methods: {
  //   setFilters(updatedFilters) {
  //     this.activeFilters = updatedFilters
  //   }
  // }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
