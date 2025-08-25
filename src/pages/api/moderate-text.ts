import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { text } = req.body || {};
    if (typeof text !== "string" || !text.trim()) return res.status(400).json({ error: "Invalid text" });

    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured" });

    const prompt = `You are a strict profanity checker. Reply ONLY with YES or NO. Is the following text profane, offensive, harassing, or inappropriate?\n\nTEXT:\n"${text.slice(0, 1000)}"`;

    try {
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0 },
                }),
            }
        );
        const data = await resp.json();
        const textOut: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const ans = textOut.trim().toUpperCase();
        const profane = ans.startsWith("YES");
        return res.status(200).json({ profane });
    } catch (e: any) {
        return res.status(500).json({ error: e.message || "Moderation failed" });
    }
}
