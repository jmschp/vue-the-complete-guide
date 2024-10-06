import { defineStore, acceptHMRUpdate } from "pinia"

export const useAuthUserStore = defineStore("authUser", {
  state: () => ({
    userId: "c3"
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot))
}
