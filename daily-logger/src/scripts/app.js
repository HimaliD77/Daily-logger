// This file contains the JavaScript code for the daily logger. It handles user interactions, such as adding new entries, displaying existing logs, and managing local storage for persistence.

document.addEventListener('DOMContentLoaded', () => {
    const logForm = document.getElementById('log-form');
    const logInput = document.getElementById('log-input');
    const logList = document.getElementById('log-list');

    // Load existing logs from local storage
    loadLogs();

    // Event listener for form submission
    logForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addLog(logInput.value);
        logInput.value = '';
    });

    function addLog(log) {
        if (log) {
            const logEntry = document.createElement('li');
            logEntry.textContent = log;
            logList.appendChild(logEntry);
            saveLogToLocalStorage(log);
        }
    }

    function saveLogToLocalStorage(log) {
        let logs = getLogsFromLocalStorage();
        logs.push(log);
        localStorage.setItem('dailyLogs', JSON.stringify(logs));
    }

    function loadLogs() {
        const logs = getLogsFromLocalStorage();
        logs.forEach(log => {
            const logEntry = document.createElement('li');
            logEntry.textContent = log;
            logList.appendChild(logEntry);
        });
    }

    function getLogsFromLocalStorage() {
        const logs = localStorage.getItem('dailyLogs');
        return logs ? JSON.parse(logs) : [];
    }
});