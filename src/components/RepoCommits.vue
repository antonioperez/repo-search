<template>
  <mdb-media tag="li" class="commit-media">
    <mdb-media-image
      circle
      class="d-flex mr-3 commit-avatar"
      :src="commit.author && commit.author.avatarUrl"
      alt="commit owner avatar"
    />
    <mdb-media-body class="commit-media-body">
      <h5 class="commit-title mt-0 mb-3 font-weight-bold">
        <a :href="commit.url" target="_blank">{{ commit.messageHeadline }} </a>
      </h5>
      <p>
        <span class="commit-stat"><mdb-icon icon="file" />&nbsp;{{
          commit.changedFiles.toLocaleString()
        }}</span>
        <span class="commit-stat"><mdb-icon icon="plus" />&nbsp;{{
          commit.additions.toLocaleString()
        }}</span>
        <span class="commit-stat"><mdb-icon icon="minus" />&nbsp;{{
          commit.deletions.toLocaleString()
        }}</span>
      </p>
      <p>
        <label>Commit Date</label>&nbsp;{{ commit.committedDate | dateFormat }}<br />
        {{ commit.message }}
      </p>
    </mdb-media-body>
  </mdb-media>
</template>

<script>
import { mdbMedia, mdbMediaBody, mdbMediaImage, mdbIcon } from "mdbvue";

export default {
  name: "CommitItem",
  components: {
    mdbMedia,
    mdbMediaBody,
    mdbMediaImage,
    mdbIcon
  },
  props: {
    commit: {
      type: Object,
      default: function() {
        return {
          oid: "",
          messageHeadline: "",
          message: "",
          committedDate: "",
          pushedDate: "",
          url: "",
          deletions: 0,
          additions: 0,
          author: {
            avatarUrl: "",
            name: "",
            email: "",
            date: ""
          }
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
.commit-media {
  text-align: left;
  margin-bottom: 1.5rem;
}

.commit-media-body {
  a {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }

  label {
    font-weight: bold;
  }
}
.commit-stat {
  margin-right: 0.5rem;
}

.commit-title {
  text-transform: lowercase;
  &:first-letter {
    text-transform: uppercase;
  }
}
.commit-stat {
  margin-right: 0.5rem;
}

.commit-avatar {
  max-width: 50px;
}
</style>
