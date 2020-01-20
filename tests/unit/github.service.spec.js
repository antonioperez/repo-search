import { githubService } from '@/services/github.service';

describe('Github Service Tests', () => {
  it('renders props.msg when passed', () => {
    return githubService.searchOrganizations('netflix')
    .then(response => console.log(response))
    .catch(error => console.log(error));
  })
})
