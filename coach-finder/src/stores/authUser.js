import { defineStore, acceptHMRUpdate } from "pinia"

let timer

export const useAuthUserStore = defineStore("authUser", {
  state: () => ({
    userId: null,
    token: null,
    tokenExpiresIn: null,
    didAutoLogout: false
  }),
  getters: {
    isAuthenticated: (state) => {
      return state.userId !== null && state.token !== null && state.tokenExpiresIn !== null
    }
  },
  actions: {
    async signup(email, password) {
      return this.auth(email, password, "signup")
    },
    async login(email, password) {
      return this.auth(email, password, "login")
    },
    logout() {
      this.userId = null
      this.token = null
      this.tokenExpiresIn = null
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiration")
      localStorage.removeItem("userId")
      clearTimeout(timer)
    },
    async auth(email, password, mode) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZYpvNgpkIMIEZLMiq9JjgbCSB0-nt4ZM"
      if (mode === "signup") {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZYpvNgpkIMIEZLMiq9JjgbCSB0-nt4ZM"
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password, returnSecureToken: true })
      })
      const responseData = await response.json()

      if (!response.ok) throw new Error(responseData.error.message)

      const expiresIn = +responseData.expiresIn * 1000
      const expirationDate = new Date().getTime() + expiresIn

      this.token = responseData.idToken
      this.tokenExpiresIn = expirationDate
      this.userId = responseData.localId
      this.didAutoLogout = false

      localStorage.setItem("token", responseData.idToken)
      localStorage.setItem("tokenExpiration", expirationDate)
      localStorage.setItem("userId", responseData.localId)

      timer = setTimeout(() => {
        this.autoLogout()
      }, expiresIn)
    },
    tryLogin() {
      const token = localStorage.getItem("token")
      const tokenExpiration = localStorage.getItem("tokenExpiration")
      const userId = localStorage.getItem("userId")
      const expiresIn = +tokenExpiration - new Date().getTime()

      if (expiresIn < 0) return

      if (token && tokenExpiration && userId) {
        this.token = token
        this.userId = userId
        this.tokenExpiresIn = tokenExpiration

        timer = setTimeout(() => {
          this.autoLogout()
        }, expiresIn)
      }
    },
    autoLogout() {
      this.didAutoLogout = true
      this.logout()
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthUserStore, import.meta.hot))
}
