document.addEventListener('DOMContentLoaded', () => {
    const logForm = document.getElementById('log-form');
    const logInput = document.getElementById('log-input');
    const logList = document.getElementById('log-list');

    loadLogs();

    logForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const logText = logInput.value.trim();
        if (logText) {
            const timestamp = new Date().toLocaleString();
            const log = { text: logText, time: timestamp };
            addLog(log);
            saveLogToLocalStorage(log);
            logInput.value = '';
        }
    });

    function addLog(log) {
        const logEntry = document.createElement('li');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<h3>${log.time}</h3><p>${log.text}</p>`;
        logList.prepend(logEntry); // newest on top
    }

    function saveLogToLocalStorage(log) {
       const logs = getLogsFromLocalStorage();
       logs.push(log);
       localStorage.setItem('dailyLogs', JSON.stringify(logs));
    }

    function loadLogs() {
        const logs = getLogsFromLocalStorage();
        logs.reverse().forEach(log => addLog(log)); // reverse to show latest first
    }

    function getLogsFromLocalStorage() {
        const logs = localStorage.getItem('dailyLogs');
        return logs ? JSON.parse(logs) : [];
    }

    // Live date/time display
    function updateDateTime() {
        const now = new Date();
        document.getElementById('datetime').textContent = now.toLocaleString();
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Log entries
    const logForm = document.getElementById('log-form');
    const logInput = document.getElementById('log-input');
    const logList = document.getElementById('log-list');
    let logs = [];

    logForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = logInput.value.trim();
        if (text) {
            const entry = { text, time: new Date().toLocaleTimeString() };
            logs.push(entry);
            renderLogs();
            logInput.value = '';
        }
    });

    function renderLogs() {
        logList.innerHTML = '';
        logs.forEach((log, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${log.text}</span> <span class="log-time">${log.time}</span>`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✕';
            removeBtn.className = 'remove-task';
            removeBtn.onclick = () => {
                logs.splice(idx, 1);
                renderLogs();
            };
            li.appendChild(removeBtn);
            logList.appendChild(li);
        });
    }

    // Task tracker
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    addTaskBtn.onclick = () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, done: false });
            taskInput.value = '';
            renderTasks();
        }
    };

    taskInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') addTaskBtn.click();
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, idx) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.done;
            checkbox.onchange = () => {
                tasks[idx].done = checkbox.checked;
            };
            li.appendChild(checkbox);
            const span = document.createElement('span');
            span.textContent = task.text;
            if (task.done) span.style.textDecoration = 'line-through';
            li.appendChild(span);
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '✕';
            removeBtn.className = 'remove-task';
            removeBtn.onclick = () => {
                tasks.splice(idx, 1);
                renderTasks();
            };
            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Copy Markdown Log
    const copyBtn = document.getElementById('copy-markdown-btn');
    copyBtn.onclick = () => {
        const date = document.getElementById('datetime').textContent;
        const commitMsg = document.getElementById('git-commit').value;
        let md = `# Daily Log (${date})\n\n`;
        md += '## Log Entries\n';
        if (logs.length === 0) md += '- _No entries today._\n';
        logs.forEach(log => {
            md += `- ${log.text} _(at ${log.time})_\n`;
        });
        md += '\n## Tasks\n';
        if (tasks.length === 0) md += '- _No tasks today._\n';
        tasks.forEach(task => {
            md += `- [${task.done ? 'x' : ' '}] ${task.text}\n`;
        });
        md += `\n## Git Commit\n`;
        md += commitMsg ? '`' + commitMsg + '`' : '_No commit message._';
        navigator.clipboard.writeText(md).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy Markdown Log', 1200);
        });
    };
});
