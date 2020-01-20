<template>
  <div class="home">
    <RepoSearch />
  </div>
</template>

<script>
// @ is an alias to /src
import RepoSearch from '@/components/RepoSearch.vue';
import { githubService } from '@/services/github.service';

export default {
  name: 'Home',
  components: {
    RepoSearch
  },
  beforeMount() {
    githubService.searchOrganizations('netflix')
    .then(response => console.log(response))
    .catch(error => console.log(error));
  },
}
</script>
