import { defineStore, acceptHMRUpdate } from "pinia"
import { useAuthUserStore } from "./authUser"

export const useRequestStore = defineStore("requests", {
  state: () => ({
    requests: {}
  }),
  getters: {
    hasRequests(state) {
      return Object.keys(state.requests).length > 0
    }
  },
  actions: {
    async addRequest(request) {
      const response = await fetch(
        "", // Add Firebase URL here
        { method: "POST", body: JSON.stringify(request) }
      )

      const responseData = await response.json()
      if (!response.ok) throw new Error(responseData.message || "Failed to send message.")

      this.requests[responseData.name] = request
    },
    async fetchRequests() {
      const userId = useAuthUserStore().userId
      const userToken = useAuthUserStore().token

      const response = await fetch(
        "", // Add Firebase URL here
      )

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to fetch requests.")
      } else {
        const responseData = await response.json()
        this.requests = responseData
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRequestStore, import.meta.hot))
}
