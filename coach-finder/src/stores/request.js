import { defineStore, acceptHMRUpdate } from "pinia"
import { useAuthUserStore } from "./authUser"

export const useRequestStore = defineStore("requests", {
  state: () => ({
    requests: []
  }),
  getters: {
    coachRequests: (state) => {
      const userId = useAuthUserStore().userId
      return state.requests.filter((request) => request.coachId === userId)
    },
    hasRequests() {
      return this.coachRequests.length > 0
    }
  },
  actions: {
    addRequest(request) {
      this.requests.push(request)
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRequestStore, import.meta.hot))
}
