const shell = require('shelljs');

if (!shell.which('git') || !shell.which('yarn')) {
  shell.echo('Sorry, this script requires git and yarn');
  shell.exit(1);
}

const reposPath = process.env.REPOS_PATH;

if (!reposPath) {
  shell.echo('Sorry, you need to set the REPOS_PATH environment variable');
  shell.exit(1);
}

function extractGithubUsername(url) {
  // Remove the "https://" or "http://"
  url = url.replace(/(^\w+:|^)\/\//, '');
  // Extract the username from the URL
  const parts = url.split('/');
  const username = parts[1];

  return username;
}

const githubRepos = [];

if (githubRepos.length === 0) {
  shell.echo('Sorry, you need to add the repos to the githubRepos array');
  shell.exit(1);
}

shell.mkdir(reposPath);

githubRepos.forEach((repo) => {
  const userName = extractGithubUsername(repo);
  shell.exec(`git clone ${repo} ${reposPath}/${userName}`);
  shell.cd(`${reposPath}/${userName}`);
  shell.exec('yarn install');
  shell.cd('../../');
});

shell.exit(1);
