<template>
  <base-card>
    <h2>Register as a coach</h2>
    <coach-form @save-data="saveData"></coach-form>
  </base-card>
</template>

<script>
import { mapActions } from "pinia"
import { useCoachesStore } from "@/stores/coaches"
import CoachForm from "@/components/coaches/CoachForm.vue"

export default {
  components: {
    CoachForm
  },
  methods: {
    ...mapActions(useCoachesStore, ["registerCoach"]),
    saveData(coachData) {
      this.registerCoach(coachData)
      this.$router.replace("/coaches")
    }
  }
}
</script>
