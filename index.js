$(document).ready(function (){});

function searchRepositories() {
  const req = new XMLHttpRequest();
  const str = document.getElementById('searchTerms').value;
  const searchStr = `https://api.github.com/search/repositories?q=${str}`;
  req.addEventListener("load", showRepositories);
  req.open("GET", searchStr);
  req.send();
}

function showRepositories(event, data) {
  const repos = JSON.parse(this.responseText);
  const repoList = '<ul>' + repos.items.map(r =>
      `<li>
        <img src="${r.owner.avatar_url}" height="32" width="32"/>
        <a href="${r.owner.html_url}">${r.owner.login}</a><br/>
        <strong>${r.name}</strong><br/>
        ${r.description}<br/>
        <a href="${r.html_url}">${r.html_url}</a><br/>
        <a href="#" data-owner="${r.owner.login}" data-repo="${r.name}" onclick="getCommits(this)">Show Commits</a>
      </li><br/>`).join('') + '</ul>';
  document.getElementById("results").innerHTML = repoList;
}

function getCommits(el) {
  const owner = el.dataset.owner;
  const repo = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", `https://api.github.com/repos/${owner}/${repo}/commits`);
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = '<strong>Commits:</strong>' + '<ul>' + commits.map(commit =>
    `<li>
      <img src="${commit.author.avatar_url}" height="32" width="32"/>
      <strong>${commit.commit.author.name}</strong> (${commit.author.login})<br/>
      ${commit.sha}<br/>${commit.commit.message}
    </li><br/>`).join('') + '</ul>';
  document.getElementById("details").innerHTML = commitsList;
}

function displayError() {
  document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again.";
}
