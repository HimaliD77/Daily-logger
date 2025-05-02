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
});
