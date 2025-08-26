import { NextResponse } from "next/server";
import { fetchNowPlaying } from "@/lib/spotify";

export async function GET() {
    try {
        const data = await fetchNowPlaying();
        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        return NextResponse.json({ ok: false }, { status: 200 });
    }
}
