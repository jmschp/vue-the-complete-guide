import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "@/App.vue"
import BaseCard from "@/components/ui/BaseCard.vue"
import BaseBadge from "@/components/ui/BaseBadge.vue"
import BaseButton from "@/components/ui/BaseBotton.vue"
import BaseDialog from "@/components/ui/BaseDialog.vue"
import BaseSpinner from "@/components/ui/BaseSpinner.vue"

import router from "@/router"

const app = createApp(App)

app.component("base-badge", BaseBadge)
app.component("base-button", BaseButton)
app.component("base-card", BaseCard)
app.component("base-dialog", BaseDialog)
app.component("base-spinner", BaseSpinner)

app.use(createPinia())
app.use(router)

app.mount("#app")
