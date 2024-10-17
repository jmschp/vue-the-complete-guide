<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <!-- Using a custom event for filters -->
    <!-- <coach-filters @change-filter="setFilters"></coach-filters> -->

    <!-- Using v-model for filters -->
    <coach-filters v-model:filters="activeFilters"></coach-filters>

    <section>
      <base-card>
        <div class="controls">
          <base-button type="button" mode="outline" @click="loadCoachesList(true)">Refresh</base-button>
          <base-button v-if="!isLoading && !isCoach" link to="/register">Register as Coach</base-button>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="!isLoading && hasCoaches">
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
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia"
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
      },
      isLoading: true,
      error: null
    }
  },
  computed: {
    ...mapState(useCoachesStore, ["coaches", "hasCoaches", "isCoach"]),
    filteredCoaches() {
      const coaches = this.coaches
      return coaches.filter((coach) => {
        if (this.activeFilters.backend && coach.areas.includes("backend")) return true
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) return true
        if (this.activeFilters.career && coach.areas.includes("career")) return true
        return false
      })
    }
  },
  methods: {
    ...mapActions(useCoachesStore, ["loadCoaches"]),
    // Using a custom event for filters
    //   setFilters(updatedFilters) {
    //     this.activeFilters = updatedFilters
    //   },
    async loadCoachesList(refresh = false) {
      try {
        this.isLoading = true
        await this.loadCoaches(refresh)
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    handleError() {
      this.error = null
    }
  },
  created() {
    this.loadCoachesList()
  }
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
