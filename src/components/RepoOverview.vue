<template>
  <div>
    <ul class="list-unstyled">
      <repo-commits
        v-for="(commit, index) in commits"
        :key="index"
        :commit="commit.node"
      />
    </ul>
  </div>
</template>

<script>
import RepoCommits from "./RepoCommits";
import { githubService } from "@/services/github.service";

export default {
  name: "RepoOverview",
  components: {
    RepoCommits
  },
  props: {
    repo: {
      type: Object,
      default: function() {
        return {
          name: "",
          id: "",
          description: "",
          forkCount: 0,
          diskUsage: 0,
          createdAt: "",
          homepageUrl: "",
          url: "",
          milestones: {
            totalCount: 0
          },
          issues: {
            totalCount: 0
          },
          stargazers: {
            totalCount: 0
          },
          releases: {
            totalCount: 0
          },
          pullRequests: {
            totalCount: 0
          },
          owner: {
            login: "",
            avatarUrl: "",
            id: "",
            email: "",
            url: "",
            name: ""
          },
          forks: {
            totalCount: 0
          },
          commitComments: {
            totalCount: 0
          },
          licenseInfo: {
            name: ""
          },
          watchers: {
            totalCount: 0
          },
          languages: {
            edges: []
          }
        };
      }
    }
  },
  data() {
    return {
      branch: "master",
      cursor: "",
      pageInfo: {},
      commits: []
    };
  },
  beforeMount() {
    this.getCommits();
  },
  methods: {
    getCommits() {
      const repo = this.repo;
      if (repo.name) {
        githubService
          .getRepoCommits(repo.name, repo.owner.login, "master", this.cursor)
          .then(response => {
            const repo = response.repository.ref;
            const history = repo.target.history;

            this.pageInfo = history.pageInfo;
            this.commits = history.edges;
            console.log(this.commits);
          });
      }
    }
  }
};
</script>
