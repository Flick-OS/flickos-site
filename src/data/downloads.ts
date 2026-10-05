// ISO download counts from SourceForge's public stats API (no auth; sends CORS *).
// The download page fetches these at build time, then the browser refreshes them live.
// SourceForge only has stats from 2023-03-08, when the project was registered.

const PROJECT = 'https://sourceforge.net/projects/flickos/files';
const START_DATE = '2023-03-01';

// Project-level total: every file in every release. The `path` query parameter is ignored.
function statsUrl(): string {
	const end = new Date().toISOString().slice(0, 10);
	return `${PROJECT}/stats/json?start_date=${START_DATE}&end_date=${end}`;
}

async function fetchTotal(timeoutMs: number): Promise<number> {
	const res = await fetch(statsUrl(), { signal: AbortSignal.timeout(timeoutMs) });
	if (!res.ok) throw new Error(`SourceForge stats ${res.status}`);
	const data = (await res.json()) as { total?: unknown };
	if (typeof data.total !== 'number') throw new Error('SourceForge stats: no total');
	return data.total;
}

// Returns null if SourceForge is down or slow, so a failed fetch never breaks the build or the page.
export async function fetchDownloadStats(timeoutMs = 10000): Promise<number | null> {
	try {
		return await fetchTotal(timeoutMs);
	} catch {
		return null;
	}
}

export function formatCount(n: number): string {
	return n.toLocaleString('en-US');
}
