import axios from "axios";

export const githubService = {
  searchOrganizations
};

const baseURL = "https://api.github.com/";
const apiKey = process.env.GITHUB_API_KEY;
const githubAPI = axios.create({
  baseURL,
  headers: {
    Authorization: `bearer ${apiKey}`
  }
});

function searchOrganizations(search, cursor = "") {
  const request = getSearchOrganizationQuery(search, cursor);
  return requestGQL(request);
}

function requestGQL(query) {
  return githubAPI.post("graphql", { query })
  .then(response => response.data && response.data.data);
}

function getSearchOrganizationQuery(query, cursor = "") {
  let queryParam = `query: "org:${query}"`;
  if (cursor) {
    queryParam += `, after: "${cursor}"`;
  }

  return `{
    search(${queryParam}, type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
            nameWithOwner
            description
            forkCount
            diskUsage
            createdAt
            homepageUrl
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
                id
                email
                url
                name
              }
            }
            languages(first: 10) {
              edges {
                node {
                  name
                  color
                }
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
