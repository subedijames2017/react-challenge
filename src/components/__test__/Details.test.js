import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Details from "../Details";

Enzyme.configure({ adapter: new Adapter() });

// Test data for rendering details page
let userName = "node";
let repository = {
  id: 27193779,
  node_id: "MDEwOlJlcG9zaXRvcnkyNzE5Mzc3OQ==",
  name: "node",
  full_name: "nodejs/node",
  private: false,
  owner: {
    login: "nodejs",
    id: 9950313,
    node_id: "MDEyOk9yZ2FuaXphdGlvbjk5NTAzMTM=",
    avatar_url: "https://avatars3.githubusercontent.com/u/9950313?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/nodejs",
    html_url: "https://github.com/nodejs",
    followers_url: "https://api.github.com/users/nodejs/followers",
    following_url: "https://api.github.com/users/nodejs/following{/other_user}",
    gists_url: "https://api.github.com/users/nodejs/gists{/gist_id}",
    starred_url: "https://api.github.com/users/nodejs/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/nodejs/subscriptions",
    organizations_url: "https://api.github.com/users/nodejs/orgs",
    repos_url: "https://api.github.com/users/nodejs/repos",
    events_url: "https://api.github.com/users/nodejs/events{/privacy}",
    received_events_url: "https://api.github.com/users/nodejs/received_events",
    type: "Organization",
    site_admin: false,
  },
  html_url: "https://github.com/nodejs/node",
  description:
    "Node.js JavaScript runtime :sparkles::turtle::rocket::sparkles:",
  fork: false,
  url: "https://api.github.com/repos/nodejs/node",
  forks_url: "https://api.github.com/repos/nodejs/node/forks",
  keys_url: "https://api.github.com/repos/nodejs/node/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/nodejs/node/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/nodejs/node/teams",
  hooks_url: "https://api.github.com/repos/nodejs/node/hooks",
  issue_events_url:
    "https://api.github.com/repos/nodejs/node/issues/events{/number}",
  events_url: "https://api.github.com/repos/nodejs/node/events",
  assignees_url: "https://api.github.com/repos/nodejs/node/assignees{/user}",
  branches_url: "https://api.github.com/repos/nodejs/node/branches{/branch}",
  tags_url: "https://api.github.com/repos/nodejs/node/tags",
  blobs_url: "https://api.github.com/repos/nodejs/node/git/blobs{/sha}",
  git_tags_url: "https://api.github.com/repos/nodejs/node/git/tags{/sha}",
  git_refs_url: "https://api.github.com/repos/nodejs/node/git/refs{/sha}",
  trees_url: "https://api.github.com/repos/nodejs/node/git/trees{/sha}",
  statuses_url: "https://api.github.com/repos/nodejs/node/statuses/{sha}",
  languages_url: "https://api.github.com/repos/nodejs/node/languages",
  stargazers_url: "https://api.github.com/repos/nodejs/node/stargazers",
  contributors_url: "https://api.github.com/repos/nodejs/node/contributors",
  subscribers_url: "https://api.github.com/repos/nodejs/node/subscribers",
  subscription_url: "https://api.github.com/repos/nodejs/node/subscription",
  commits_url: "https://api.github.com/repos/nodejs/node/commits{/sha}",
  git_commits_url: "https://api.github.com/repos/nodejs/node/git/commits{/sha}",
  comments_url: "https://api.github.com/repos/nodejs/node/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/nodejs/node/issues/comments{/number}",
  contents_url: "https://api.github.com/repos/nodejs/node/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/nodejs/node/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/nodejs/node/merges",
  archive_url:
    "https://api.github.com/repos/nodejs/node/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/nodejs/node/downloads",
  issues_url: "https://api.github.com/repos/nodejs/node/issues{/number}",
  pulls_url: "https://api.github.com/repos/nodejs/node/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/nodejs/node/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/nodejs/node/notifications{?since,all,participating}",
  labels_url: "https://api.github.com/repos/nodejs/node/labels{/name}",
  releases_url: "https://api.github.com/repos/nodejs/node/releases{/id}",
  deployments_url: "https://api.github.com/repos/nodejs/node/deployments",
  created_at: "2014-11-26T19:57:11Z",
  updated_at: "2020-08-15T08:43:04Z",
  pushed_at: "2020-08-15T07:45:54Z",
  git_url: "git://github.com/nodejs/node.git",
  ssh_url: "git@github.com:nodejs/node.git",
  clone_url: "https://github.com/nodejs/node.git",
  svn_url: "https://github.com/nodejs/node",
  homepage: "https://nodejs.org/",
  size: 606768,
  stargazers_count: 72332,
  watchers_count: 72332,
  language: "JavaScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: false,
  has_pages: false,
  forks_count: 17705,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 1114,
  license: {
    key: "other",
    name: "Other",
    spdx_id: "NOASSERTION",
    url: null,
    node_id: "MDc6TGljZW5zZTA=",
  },
  forks: 17705,
  open_issues: 1114,
  watchers: 72332,
  default_branch: "master",
  score: 1,
};

describe("Details", () => {
  it("Check if Details component is rendering", () => {
    const wrapper = shallow(
      <Details userName={userName} repository={repository} />
    );
    const input = wrapper.find(".detail-page");
    expect(input.length).toBe(1);
  });
});
