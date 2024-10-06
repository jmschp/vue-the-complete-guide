import { defineStore, acceptHMRUpdate } from "pinia"
import { useAuthUserStore } from "./authUser"
export const useCoachesStore = defineStore("coaches", {
  state: () => ({
    coaches: [
      {
        id: "c1",
        firstName: "Maximilian",
        lastName: "Schwarzmüller",
        hourlyRate: 30,
        areas: ["frontend", "backend", "career"],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!"
      },
      {
        id: "c2",
        firstName: "Julie",
        lastName: "Jones",
        hourlyRate: 30,
        areas: ["frontend", "career"],
        description:
          "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role."
      }
    ]
  }),
  getters: {
    hasCoaches: (state) => state.coaches && state.coaches.length > 0,
    isCoach: (state) => {
      const userId = useAuthUserStore().userId
      console.log(userId)
      return state.coaches.some((coach) => coach.id === userId)
    }
  },
  actions: {
    registerCoach(coachData) {
      const newCoach = {
        id: new Date().toISOString(),
        ...coachData
      }
      this.coaches.push(newCoach)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCoachesStore, import.meta.hot))
}
