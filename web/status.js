// status.js — carrega l'estat de les places i gestiona el buscador

(function () {
    'use strict';

    const ENDPOINT = 'status_data.php';
    const AUTO_REFRESH_MS = 60000; // refresc automàtic cada minut

    const tbody = document.getElementById('status-tbody');
    const searchInput = document.getElementById('status-search');
    const countLabel = document.getElementById('status-count');
    const refreshBtn = document.getElementById('status-refresh');
    const updatedLabel = document.getElementById('status-updated');

    let allBoards = [];
    let autoRefreshTimer = null;

    const STATUS_LABELS = {
        activa: 'Activa',
        sense_dades: 'Sense dades',
        inactiva: 'Inactiva',
    };

    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function formatDate(isoLike) {
        if (!isoLike) return '—';
        const d = new Date(isoLike.replace(' ', 'T'));
        if (isNaN(d.getTime())) return escapeHtml(isoLike);
        return d.toLocaleString('ca-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    function relativeTime(hours) {
        if (hours === null || hours === undefined) return '';
        if (hours < 1) return 'fa ' + Math.round(hours * 60) + ' min';
        if (hours < 48) return 'fa ' + Math.round(hours) + ' h';
        return 'fa ' + Math.round(hours / 24) + ' dies';
    }

    function renderRow(board) {
        const statusKey = board.status || 'sense_dades';
        const statusLabel = STATUS_LABELS[statusKey] || statusKey;
        const rel = relativeTime(board.hours_since);
        
        // Enllaç de Grafana amb la ID de la placa injectada dinàmicament
        const grafanaUrl = `https://api-rrd.madavi.de:3000/grafana/d/GUaL5aZMz/pm-sensors?orgId=1&from=now-30d&to=now&timezone=browser&var-chipID=esp8266-${escapeHtml(board.board_id)}&var-type=BME280&var-query0=sensors`;

        return `
            <tr data-search="${escapeHtml(board.board_id.toLowerCase())}">
                <td>${escapeHtml(board.board_id)}</td>
                <td>${escapeHtml(board.total_readings)}</td>
                <td>${formatDate(board.last_seen)}${rel ? ' <span class="status-rel">(' + rel + ')</span>' : ''}</td>
                <td><a href="${grafanaUrl}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">Veure a Grafana</a></td>
                <td><span class="status-badge status-badge--${statusKey}">${statusLabel}</span></td>
            </tr>
        `;
    }

    function renderTable(boards) {
        if (!boards.length) {
            tbody.innerHTML = '<tr><td colspan="5" class="status-empty">No s\'ha trobat cap placa amb aquest criteri.</td></tr>';
            countLabel.textContent = '0 places';
            return;
        }
        tbody.innerHTML = boards.map(renderRow).join('');
        countLabel.textContent = boards.length + (boards.length === 1 ? ' placa' : ' places');
    }

    function applyFilter() {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) {
            renderTable(allBoards);
            return;
        }
        const filtered = allBoards.filter((b) => b.board_id.toLowerCase().includes(q));
        renderTable(filtered);
    }

    function showError(message) {
        tbody.innerHTML = `<tr><td colspan="7" class="status-error">${escapeHtml(message)}</td></tr>`;
        countLabel.textContent = '';
    }

    async function loadStatus() {
        try {
            const res = await fetch(ENDPOINT, { headers: { Accept: 'application/json' } });
            if (!res.ok) {
                throw new Error('El servidor ha respost amb un error (' + res.status + ')');
            }
            const data = await res.json();
            if (data.status !== 'ok') {
                throw new Error('No s\'han pogut carregar les dades (' + (data.reason || 'error desconegut') + ')');
            }
            allBoards = data.boards || [];
            applyFilter();

            if (data.generated_at) {
                const gen = new Date(data.generated_at);
                updatedLabel.textContent = 'Última actualització: ' + gen.toLocaleString('ca-ES');
            }
        } catch (err) {
            console.error('BoscDeDades status:', err);
            showError('No s\'ha pogut connectar amb el servidor. Torna-ho a provar en uns instants.');
        }
    }

    function scheduleAutoRefresh() {
        if (autoRefreshTimer) clearInterval(autoRefreshTimer);
        autoRefreshTimer = setInterval(loadStatus, AUTO_REFRESH_MS);
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadStatus();
        scheduleAutoRefresh();

        searchInput.addEventListener('input', applyFilter);
        refreshBtn.addEventListener('click', loadStatus);
    });
})();