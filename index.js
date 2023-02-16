const core = require('@action/core');
const github = require('@actions/github');

try {
  const labelName = core.getInput('label-name');
  const labelColor = core.getInput('label-color');
  const octokit = new github.GitHub(process.env.GITHUB_TOKEN);
  octokit.issues.listLabelsForRepo({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo
  }).then(({ data }) => {
    const label = data.find(l => l.name === labelName);
    if (!label) {
      octokit.issues.createLabel({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        name: labelName,
        color: labelColor
      }).then((response) => {
        console.log(`Label ${response.data.name} created successfully`);
      });
    } else {
      console.log(`Label ${labelName} already exists`);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
