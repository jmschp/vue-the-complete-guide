import { createRouter, createWebHistory } from "vue-router"
import CoachDetails from "@/pages/coaches/CoachDetails.vue"
import CoachesList from "@/pages/coaches/CoachesList.vue"
import CoachRegistration from "@/pages/coaches/CoachRegistration.vue"
import ContactCoach from "@/pages/requests/ContactCoach.vue"
import NotFound from "@/pages/NotFound.vue"
import RequestReceived from "@/pages/requests/RequestReceived.vue"
import UserAuth from "@/pages/auth/UserAuth.vue"
import { useAuthUserStore } from "@/stores/authUser"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/auth", component: UserAuth, meta: { requiresUnAuth: true } },
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      props: true,
      component: CoachDetails,
      children: [{ path: "contact", component: ContactCoach }]
    },
    { path: "/register", component: CoachRegistration, meta: { requiresAuth: true } },
    { path: "/request", component: RequestReceived, meta: { requiresAuth: true } },
    { path: "/:pathMatch(.*)*", component: NotFound }
  ]
})

router.beforeEach((to, _from) => {
  const isLoggedIn = useAuthUserStore().isAuthenticated
  if (to.meta.requiresAuth && !isLoggedIn) return "/auth"
  if (to.meta.requireUnAuth && isLoggedIn) return "/coaches"
  return true
})

export default router
