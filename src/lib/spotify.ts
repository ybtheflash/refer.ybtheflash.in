// Server-only helpers to talk to Spotify API
// Uses Authorization Code flow with a stored refresh token

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

function getBasicAuth(): string {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    if (!clientId || !clientSecret) throw new Error("Spotify client credentials missing");
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    return `Basic ${basic}`;
}

export async function getAccessToken() {
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    if (!refreshToken) {
        return null; // Not configured yet
    }
    const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: getBasicAuth(),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
        // Avoid caching
        cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.access_token as string | null;
}

export async function fetchNowPlaying() {
    const token = await getAccessToken();
    if (!token) return { ok: true, isPlaying: false };
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });
    if (res.status === 204) return { ok: true, isPlaying: false };
    if (!res.ok) return { ok: true, isPlaying: false };
    const song = await res.json();
    const isPlaying = song?.is_playing === true;
    if (!isPlaying || !song?.item) return { ok: true, isPlaying: false };
    const title = song.item?.name as string;
    const artist = Array.isArray(song.item?.artists)
        ? song.item.artists.map((a: any) => a?.name).filter(Boolean).join(", ")
        : "";
    const album = song.item?.album?.name as string;
    const albumImageUrl = song.item?.album?.images?.[0]?.url as string | undefined;
    const songUrl = song.item?.external_urls?.spotify as string | undefined;
    return {
        ok: true,
        isPlaying: true,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
    };
}
