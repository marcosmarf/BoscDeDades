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
    let lastGeneratedAt = null;
    let autoRefreshTimer = null;

    const LOCALE_MAP = { ca: 'ca-ES', es: 'es-ES', en: 'en-GB' };

    function tr(key, fallback) {
        if (typeof window.t === 'function') return window.t(key, fallback);
        return fallback;
    }

    function currentLocale() {
        const lang = document.documentElement.lang || 'ca';
        return LOCALE_MAP[lang] || 'ca-ES';
    }

    function statusLabel(statusKey) {
        const map = {
            activa: 'status-badge-activa',
            sense_dades: 'status-badge-sense_dades',
            inactiva: 'status-badge-inactiva',
        };
        const fallbackMap = { activa: 'Activa', sense_dades: 'Sense dades', inactiva: 'Inactiva' };
        const key = map[statusKey];
        if (!key) return statusKey;
        return tr(key, fallbackMap[statusKey] || statusKey);
    }

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
        return d.toLocaleString(currentLocale(), {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    function relativeTime(hours) {
        if (hours === null || hours === undefined) return '';
        if (hours < 1) {
            return tr('status-rel-min', 'fa {n} min').replace('{n}', Math.round(hours * 60));
        }
        if (hours < 48) {
            return tr('status-rel-h', 'fa {n} h').replace('{n}', Math.round(hours));
        }
        return tr('status-rel-dies', 'fa {n} dies').replace('{n}', Math.round(hours / 24));
    }

    function renderRow(board) {
        const statusKey = board.status || 'sense_dades';
        const label = statusLabel(statusKey);
        const rel = relativeTime(board.hours_since);
        const grafanaText = tr('status-grafana-link', 'Veure a Grafana');

        // Enllaç de Grafana amb la ID de la placa injectada dinàmicament
        const grafanaUrl = `https://api-rrd.madavi.de:3000/grafana/d/GUaL5aZMz/pm-sensors?orgId=1&from=now-30d&to=now&timezone=browser&var-chipID=esp8266-${escapeHtml(board.board_id)}&var-type=BME280&var-query0=sensors`;

        return `
            <tr data-search="${escapeHtml(board.board_id.toLowerCase())}">
                <td>${escapeHtml(board.board_id)}</td>
                <td>${escapeHtml(board.total_readings)}</td>
                <td>${formatDate(board.last_seen)}${rel ? ' <span class="status-rel">(' + rel + ')</span>' : ''}</td>
                <td><a href="${grafanaUrl}" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">${escapeHtml(grafanaText)}</a></td>
                <td><span class="status-badge status-badge--${statusKey}">${escapeHtml(label)}</span></td>
            </tr>
        `;
    }

    function updateCountLabel(count) {
        const noun = tr(count === 1 ? 'status-count-singular' : 'status-count-plural', count === 1 ? 'placa' : 'places');
        countLabel.textContent = count + ' ' + noun;
    }

    function renderTable(boards) {
        if (!boards.length) {
            const emptyMsg = tr('status-empty', "No s'ha trobat cap placa amb aquest criteri.");
            tbody.innerHTML = `<tr><td colspan="5" class="status-empty">${escapeHtml(emptyMsg)}</td></tr>`;
            updateCountLabel(0);
            return;
        }
        tbody.innerHTML = boards.map(renderRow).join('');
        updateCountLabel(boards.length);
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
        tbody.innerHTML = `<tr><td colspan="5" class="status-error">${escapeHtml(message)}</td></tr>`;
        countLabel.textContent = '';
    }

    function renderUpdatedLabel() {
        if (!lastGeneratedAt) return;
        const gen = new Date(lastGeneratedAt);
        const prefix = tr('status-updated-prefix', 'Última actualització:');
        updatedLabel.textContent = prefix + ' ' + gen.toLocaleString(currentLocale());
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
                lastGeneratedAt = data.generated_at;
                renderUpdatedLabel();
            }
        } catch (err) {
            console.error('BoscDeDades status:', err);
            showError(tr('status-error-connection', 'No s\'ha pogut connectar amb el servidor. Torna-ho a provar en uns instants.'));
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

    // Re-render dynamic content (table rows, count, updated label) when the
    // language changes, so text generated in JS stays in sync with the
    // static strings that translations.js updates via element ids.
    document.addEventListener('bosc:languagechange', () => {
        applyFilter();
        renderUpdatedLabel();
    });
})();