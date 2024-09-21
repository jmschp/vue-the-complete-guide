import { createRouter, createWebHistory } from "vue-router"
import CoachDetails from "@/pages/coaches/CoachDetails.vue"
import CoachesList from "@/pages/coaches/CoachesList.vue"
import CoachRegistration from "@/pages/coaches/CoachRegistration.vue"
import ContactCoach from "@/pages/requests/ContactCoach.vue"
import RequestReceived from "@/pages/requests/RequestReceived.vue"
import NotFound from "@/pages/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetails,
      children: [
        {
          path: "contact",
            component: ContactCoach
        }
      ]
    },
    { path: "/register", component: CoachRegistration },
    { path: "/request", component: RequestReceived },
    { path: "/:notFount(.*)", component: NotFound }
  ]
})

export default router
