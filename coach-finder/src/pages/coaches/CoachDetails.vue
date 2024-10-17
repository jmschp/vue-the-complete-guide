<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ selectedCoach.hourlyRate }}</h3>
        <router-link to="/coaches/1/contact">Contact</router-link>
        <!-- <router-view></router-view> -->
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <h2>Areas of Expertise</h2>
        <base-badge v-for="area in selectedCoach.areas" :key="area" :type="area"></base-badge>
        <p>{{ selectedCoach.description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapState } from "pinia"
import { useCoachesStore } from "@/stores/coaches"

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectedCoach: null
    }
  },
  computed: {
    ...mapState(useCoachesStore, ["coaches"]),
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`
    },
    contactLink() {
      return `/coaches/${this.id}/contact`
    }
  },
  created() {
    this.selectedCoach = this.coaches.find((coach) => coach.id === this.id)
  }
}
</script>
