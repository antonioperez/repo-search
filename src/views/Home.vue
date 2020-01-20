<template>
  <div class="home">
    <RepoSearch />
  </div>
</template>

<script>
import RepoSearch from '@/components/RepoSearch.vue';

export default {
  name: 'Home',
  components: {
    RepoSearch
  },
  beforeMount() {
  },
}
</script>
