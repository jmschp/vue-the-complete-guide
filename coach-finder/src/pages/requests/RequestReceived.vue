<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h2>Requests Received</h2>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-if="!isLoading && hasRequests">
        <request-item
          v-for="(request, key) in requests"
          :key="key"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>No requests received</h3>
    </base-card>
  </div>
</template>

<script>
import { useRequestStore } from "@/stores/request"
import { mapState, mapActions } from "pinia"

import RequestItem from "@/components/RequestItem.vue"

export default {
  data() {
    return {
      error: null,
      isLoading: true
    }
  },
  components: {
    RequestItem
  },
  computed: {
    ...mapState(useRequestStore, ["requests", "hasRequests"])
  },
  methods: {
    ...mapActions(useRequestStore, ["fetchRequests"]),
    handleError() {
      this.error = null
    },
    async loadRequests() {
      try {
        this.isLoading = true
        await this.fetchRequests()
        this.isLoading = false
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    }
  },
  created() {
    this.loadRequests()
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
