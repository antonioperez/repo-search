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
    <mdb-container class="search-filters">
      <div class="search-filters-inputs">
        <span>
          <mdb-icon icon="sort-amount-down-alt" />&nbsp;
          <select v-model="sortBy" @change="handleFilterChange" class="sort-filter">
            <option value="forks">Forks</option>
            <option value="stars">Stars</option>
            <option value="help-wanted-issues">Help Wanted Issues</option>
          </select>
        </span>
      </div>
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
import { mdbInput, mdbContainer, mdbIcon } from "mdbvue";
import RepoOverview from "./RepoOverview";
import { githubService } from "@/services/github.service";

export default {
  name: "Search",
  components: {
    mdbInput,
    mdbContainer,
    mdbIcon,
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
      sortBy: "forks",
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
          .searchOrganizations(this.search, this.sortBy)
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
    handleFilterChange(event) {
      this.sortBy = event.target.value;
      this.handleSearch();
    },
    addSearchToLocation(params) {
      history.pushState({}, null, "#/" + encodeURIComponent(params));
    }
  }
};
</script>

<style scoped>
.search-container {
  margin-top: 10px;
  text-align: center;
}

.search-filters {
  margin-bottom: 2rem;
}

.search-filters-inputs {
  float: right;
}

.sort-filter {
  padding: 5px 35px 5px 5px;
  border: 1px solid #ccc;
  height: 35px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

@media only screen and (max-width: 850px) {
  .sort-filter, .search-filters-inputs {
    width:90%;
    float: none;
  }
}
</style>
