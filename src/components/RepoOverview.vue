<template>
  <mdb-media tag="li" class="repo-media">
    <mdb-media-image
      circle
      class="d-flex mr-3"
      :src="repo.owner.avatarUrl"
      alt="repo owner avatar"
    />
    <mdb-media-body>
      <h5 class="repo-media-body mt-0 mb-1 font-weight-bold">
        <a :href="repo.url" target="_blank">{{ repo.nameWithOwner }}</a>
      </h5>
      {{ repo.description }}
    </mdb-media-body>
  </mdb-media>
</template>

<script>
import { mdbMedia, mdbMediaBody, mdbMediaImage } from "mdbvue";

export default {
  name: "Search",
  components: {
    mdbMedia,
    mdbMediaBody,
    mdbMediaImage
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
          languages: {
            edges: []
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
</style>
