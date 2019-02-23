<template>
  <section class="container">
    <img :src="avatarUrl" />
    <h1>{{ selectedEmail }}</h1>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import '@nuxt/vue-app';

export default Vue.extend({
  async asyncData({ app }) {
    const r = await app.$axios
      .$get('/api/v1.1/me', {
        params: { 'circle-token': '12543b07a533b9c7955a63879acae82e393fcc1c' },
      })
      .catch(() => ({}))
    return { selectedEmail: r.selected_email, avatarUrl: r.avatar_url };
  },
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
