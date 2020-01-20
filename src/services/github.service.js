import axios from "axios";

export const githubService = {
  searchOrganizations,
  getRepoCommits
};

const baseURL = "https://api.github.com/";
const apiKey = process.env.GITHUB_API_KEY;
const githubAPI = axios.create({
  baseURL,
  headers: {
    Authorization: `bearer ${apiKey}`
  }
});

function searchOrganizations(search, sortBy, cursor = "") {
  const request = getSearchOrganizationQuery(search, sortBy, cursor);
  return requestGQL(request);
}

function getRepoCommits(name, owner, branch, cursor) {
  const request = getRepoCommitsQuery(name, owner, branch, cursor);
  return requestGQL(request);
}

function requestGQL(query) {
  return githubAPI
    .post("graphql", { query })
    .then(response => response.data && response.data.data);
}

function getSearchOrganizationQuery(query, sortBy, cursor = "") {
  let queryParam = `query: "org:${query} sort:${sortBy}"`;
  if (cursor) {
    queryParam += `, after: "${cursor}"`;
  }

  return `{
    search(${queryParam}, type: REPOSITORY, first: 20) {
      repositoryCount
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            nameWithOwner
            description
            forkCount
            diskUsage
            url
            milestones(first: 10) {
              totalCount
            }
            issues {
              totalCount
            }
            stargazers {
              totalCount
            }
            releases {
              totalCount
            }
            pullRequests {
              totalCount
            }
            owner {
              login
              avatarUrl(size: 80)
              ... on Organization {
                url
                name
              }
            }
            forks {
              totalCount
            }
            commitComments {
              totalCount
            }
            licenseInfo {
              name
            }
            watchers {
              totalCount
            }
          }
        }
      }
    }
  }`;
}

function getRepoCommitsQuery(name, owner, branch = "master", cursor) {
  let queryParam = "";
  if (cursor) {
    queryParam += `, after: "${cursor}"`;
  }

  return `{
    repository(name: "${name}", owner: "${owner}") {
      ref(qualifiedName: "${branch}") {
        target {
          ... on Commit {
            id
            history(first: 50 ${queryParam}) {
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  oid
                  messageHeadline
                  message
                  commitUrl
                  committedDate
                  pushedDate
                  url
                  deletions
                  additions
                  changedFiles
                  author {
                    avatarUrl(size: 50)
                    name
                    email
                    date
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
}
