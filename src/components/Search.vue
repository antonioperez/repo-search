<template>
  <div class="search-container">
    <h3>Commit Spider</h3>
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
          <mdb-icon icon="sort-amount-up" />&nbsp;
          <select
            v-model="sortBy"
            class="sort-filter"
            @change="handleFilterChange"
          >
            <option value="forks">Forks</option>
            <option value="stars">Stars</option>
            <option value="help-wanted-issues">Help Wanted Issues</option>
          </select>
        </span>
      </div>
    </mdb-container>
    <mdb-container>
      <ul class="list-unstyled">
        <repo-item
          v-for="(repo, index) in repos"
          :key="index"
          :repo="repo.node"
          @selectedRepo="onRepoSelected"
        />
      </ul>
      <div v-if="isLoading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </mdb-container>
    <mdb-container>
      <mdb-modal
        size="lg"
        :show="showRepoModal"
        scrollable
        @close="showRepoModal = false"
      >
        <mdb-modal-header>
          <mdb-modal-title>{{ selectedRepo.nameWithOwner }}'s commits</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <repo-overview :repo="selectedRepo" />
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="primary" @click.native="showRepoModal = false">
            Close
          </mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>
    </mdb-container>
  </div>
</template>

<script>
import {
  mdbInput,
  mdbContainer,
  mdbIcon,
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter
} from "mdbvue";
import RepoItem from "./RepoItem";
import RepoOverview from "./RepoOverview";
import { githubService } from "@/services/github.service";
import { scrollService } from "@/services/scroll.service";

export default {
  name: "Search",
  components: {
    mdbInput,
    mdbContainer,
    mdbIcon,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    RepoItem,
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
      resultCount: 0,
      showRepoModal: false,
      isLoading: false,
      search: "",
      message: "Crawl a Repo's commits!",
      sortBy: "forks",
      cursor: "",
      selectedRepo: {},
      repos: [],
      pageInfo: {
        startCursor: "",
        endCursor: "",
        hasNextPage: false,
        hasPreviousPage: false
      }
    };
  },
  mounted() {
    this.handleScroll();
  },
  beforeMount() {
    this.search = this.$route.params.search || "";
    this.handleSearch();
  },
  methods: {
    handleSearch() {
      this.addSearchToLocation(this.search);
      if (this.search.length >= this.searchStartLength) {
        this.isLoading = true;
        githubService
          .searchOrganizations(this.search, this.sortBy, this.cursor)
          .then(response => {
            this.isLoading = false;
            const searchResult = response.search || {};
            const resultCount = searchResult.repositoryCount || 0;
            const repos = searchResult.edges;
            if (this.cursor) {
              this.repos.push(...repos);
            } else {
              this.repos = searchResult.edges;
            }

            this.pageInfo = searchResult.pageInfo;
            this.resultCount += resultCount;
            this.message = `${resultCount} repos found!`;
          });
      }
    },
    handleFilterChange(event) {
      this.sortBy = event.target.value;
      this.cursor = "";
      this.handleSearch();
    },
    handleScroll() {
      window.onscroll = () => {
        const bottomOfWindow = scrollService.isBottomScreen();
        if (bottomOfWindow && this.pageInfo.hasNextPage) {
          this.cursor = this.pageInfo.endCursor;
          this.handleSearch();
        }
      };
    },
    addSearchToLocation(params) {
      history.pushState({}, null, "#/" + encodeURIComponent(params));
    },
    onRepoSelected(value) {
      console.log(value);
      this.selectedRepo = value;
      this.showRepoModal = true;
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
  .sort-filter,
  .search-filters-inputs {
    width: 90%;
    float: none;
  }
}
</style>
