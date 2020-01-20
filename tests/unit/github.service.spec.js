import { githubService } from '@/services/github.service';

describe('Github Service Tests', () => {
  it('renders props.msg when passed', () => {
    return githubService.searchOrganizations('netflix')
    .then(response => expect(response.search.repositoryCount).toBeGreaterThan(0));
  })
})
