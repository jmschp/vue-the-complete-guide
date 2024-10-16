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
    ],
    lastFetch: null,
    loggedInUser: useAuthUserStore().userId
  }),
  getters: {
    hasCoaches: (state) => state.coaches && state.coaches.length > 0,
    isCoach: (state) => {
      return state.coaches.some((coach) => coach.id === state.loggedInUser)
    },
    shouldUpdate: (state) => {
      if (!state.lastFetch) return true

      const currentTimeStamp = new Date().getTime()
      return (currentTimeStamp - state.lastFetch) / 1000 > 60
    }
  },
  actions: {
    async registerCoach(coachData) {
      const response = await fetch(
        `https://vue-coach-6d9ee-default-rtdb.europe-west1.firebasedatabase.app/coaches/${this.loggedInUser}.json`,
        {
          method: "PUT",
          body: JSON.stringify(coachData)
        }
      )

      const responseData = await response.json()
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to save data.")
      }
      this.coaches.push({ id: this.loggedInUser, ...coachData })
    },
    async loadCoaches(refresh) {
      if (!refresh && !this.shouldUpdate) return

      const response = await fetch(
        "https://vue-coach-6d9ee-default-rtdb.europe-west1.firebasedatabase.app/coaches.json"
      )

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to fetch data.")
      } else {
        const responseData = await response.json()
        for (const key in responseData) {
          const coach = {
            id: key,
            firstName: responseData[key].firstName,
            lastName: responseData[key].lastName,
            hourlyRate: responseData[key].hourlyRate,
            areas: responseData[key].areas,
            description: responseData[key].description
          }
          this.coaches.push(coach)
        }
        this.lastFetch = new Date().getTime()
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCoachesStore, import.meta.hot))
}
