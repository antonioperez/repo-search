<template>
  <div class="search-container">
    <h3>Repo Spider</h3>
    <p>{{ message }}</p>
    <mdb-container>
      <mdb-input
        v-model="search"
        label="Search"
        type="text"
        class="mt-0 mb-3"
        @input="handleSearch"
      />
    </mdb-container>
    <mdb-container>
      <ul class="list-unstyled">
        <repo-overview
          v-for="(repo, index) in repos"
          :key="index"
          :repo="repo.node"
        />
      </ul>
    </mdb-container>
  </div>
</template>

<script>
import { mdbInput, mdbContainer } from "mdbvue";
import RepoOverview from "./RepoOverview";
import { githubService } from "@/services/github.service";

export default {
  name: "Search",
  components: {
    mdbInput,
    mdbContainer,
    RepoOverview
  },
  props: {
    searchStartLength: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      search: "",
      message: "Crawl Your Favorite Organization!",
      repos: []
    };
  },
  beforeMount() {
    this.search = this.$route.params.search || "";
    this.handleSearch();
    console.log("search", this.search);
  },
  methods: {
    handleSearch() {
      this.addSearchToLocation(this.search);
      if (this.search.length >= this.searchStartLength) {
        githubService
          .searchOrganizations(this.search)
          .then(response => {
            const searchResult = response.search || {};
            const resultCount = searchResult.repositoryCount || 0;
            console.log(searchResult);
            this.repos = searchResult.edges;
            this.message = `${resultCount} repos found!`;
          })
          .catch(error => console.log(error));
      }
    },
    addSearchToLocation(params) {
      history.pushState(
        {},
        null,
        "#/" + encodeURIComponent(params)
      );
    }
  }
};
</script>

<style scoped>
.search-container {
  margin-top: 10px;
  text-align: center;
}
</style>
