import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/App.vue"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseBadge from "@/components/ui/BaseBadge.vue"
import BaseButton from "@/components/ui/BaseBotton.vue"
import router from "@/router"

const app = createApp(App)

app.component("base-badge", BaseBadge)
app.component("base-button", BaseButton)
app.component("base-card", BaseCard)
app.use(createPinia())
app.use(router)

app.mount("#app")
