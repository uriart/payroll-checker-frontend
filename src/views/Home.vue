<template>
  <div v-if="isAuthenticated" class="home">
    <div class="main-container">
      <router-view />
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  name: 'Home',
  setup() {
    const { isAuthenticated } = useAuth0();
    return { isAuthenticated };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.main-container {
  flex: 1;
  padding: 16px;
}
</style>
