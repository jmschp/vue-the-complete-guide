<template>
  <base-card>
    <h2>Requests Received</h2>
    <ul v-if="hasRequests">
      <request-item
        v-for="request in coachRequests"
        :key="request.id"
        :email="request.email"
        :message="request.message"
      ></request-item>
    </ul>
    <h3 v-else>No requests received</h3>
  </base-card>
</template>

<script>
import { useRequestStore } from "@/stores/request"
import { mapState } from "pinia"

import RequestItem from "@/components/RequestItem.vue"

export default {
  components: {
    RequestItem
  },
  computed: {
    ...mapState(useRequestStore, ["coachRequests", "hasRequests"])
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
