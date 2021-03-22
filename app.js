const { Chance } = require('chance');
const issueDesc = document.getElementById('desc');
const issueSeverity = document.getElementById('severity');
const issueAssigned = document.getElementById('assigned');
const submitIssue = document.getElementById('add_new_issue');
let issueList = document.getElementById('issuesList');

function reloadList(lst) {
    while (lst.firstChild) {
        lst.removeChild(lst.firstChild);
    }
    fetchIssues();
}

function createIssue(e) {
    let lst = [];
    let newIssue = {
        id: chance.guid(),
        description: issueDesc.value,
        severity: issueSeverity.value,
        assigned: issueAssigned.value,
        status: 'Open'
    }

    lst.push(newIssue);
    if (localStorage.getItem('issues') == null) {
        localStorage.setItem('issues', JSON.stringify(lst));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(newIssue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    reloadList(issueList);
    e.preventDefault();
}

function fetchIssues() {
    const getIssues = JSON.parse(localStorage.getItem('issues'));
    getIssues.forEach(issue => {
        issueList.innerHTML +=
            `<li>` +
            `<p class="issue_id">Issue ID: ${issue.id}</p>` +
            `<p class="open" id="tag">${issue.status}</p>` +
            `<div class="issue">` +
            `<h2>${issue.description}</h2>` +
            `<i class="far fa-clock"><span>${issue.severity}</span></i>` +
            `<i class="far fa-user"><span>${issue.assigned}</span></i>` +
            `<div class="btn-container">` +
            `<button class='btn-close'>Close</button>` +
            `<button class='btn-delete'>Delete</button>` +
            `</div>` +
            `</div>` +
            `</li>`
    });
    document.querySelectorAll('.btn-close').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            getIssues[index].status = 'Closed';
            localStorage.setItem('issues', JSON.stringify(getIssues));
            reloadList(issueList);
        });
    });
    document.querySelectorAll('.btn-delete').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            getIssues.splice(index, 1);
            localStorage.setItem('issues', JSON.stringify(getIssues));
            reloadList(issueList);
        });
    });
}

submitIssue.addEventListener('click', (e) => {
    createIssue(e);
});

window.addEventListener('DOMContentLoaded', () => {
    fetchIssues();
});

