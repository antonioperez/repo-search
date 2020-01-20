<template>
  <mdb-media tag="li" class="repo-media">
    <mdb-media-image
      circle
      class="d-flex mr-3"
      :src="repo.owner.avatarUrl"
      alt="repo owner avatar"
    />
    <mdb-media-body class="repo-media-body">
      <h5 class="repo-title mt-0 mb-3 font-weight-bold">
        <a :href="repo.url" target="_blank">{{ repo.name }}</a>
      </h5>
      <h6><a :href="repo.url" target="_blank"><mdb-icon fab icon="github" />&nbsp;{{ repo.nameWithOwner }}</a></h6>
      <p>{{ repo.description }}</p>
      <p>
        <span class="repo-stat"><mdb-icon icon="code-branch" />&nbsp;{{
          repo.forks.totalCount.toLocaleString()
        }}</span>
        <span class="repo-stat"><mdb-icon icon="star" />&nbsp;{{ repo.stargazers.totalCount.toLocaleString() }}</span>
        <span class="repo-stat"><mdb-icon icon="eye" />&nbsp;{{ repo.watchers.totalCount.toLocaleString() }}</span>
        <span class="repo-stat"><mdb-icon icon="exclamation-triangle" />&nbsp;{{ repo.issues.totalCount.toLocaleString() }}</span>
      </p>
    </mdb-media-body>
  </mdb-media>
</template>

<script>
import { mdbMedia, mdbMediaBody, mdbMediaImage, mdbIcon } from "mdbvue";

export default {
  name: "Search",
  components: {
    mdbMedia,
    mdbMediaBody,
    mdbMediaImage,
    mdbIcon
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
  }
};
</script>

<style scoped lang="scss">
.repo-media {
  text-align: left;
  margin-bottom: 1.5rem;
}

.repo-media-body {
  a {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }
}
.repo-stat {
  margin-right: 0.5rem;
}

.repo-title {
  text-transform: lowercase;
  &:first-letter {
    text-transform: uppercase;
  }
}
</style>
