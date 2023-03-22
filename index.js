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

const githubRepos = [
  'https://github.com/dimka3553/harbour_todo_exercise.git',
  'https://github.com/MarcoMeijer/harbour_todo_exercise.git',
];

shell.mkdir(reposPath);

githubRepos.forEach((repo) => {
  const userName = extractGithubUsername(repo);
  shell.exec(`git clone ${repo} ${reposPath}/${userName}`);
  shell.cd(`${reposPath}/${userName}`);
  shell.exec('yarn install');
  shell.cd('../../');
});

shell.exit(1);
