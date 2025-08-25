import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

function getClientIP(req: NextApiRequest): string {
    const xff = (req.headers["x-forwarded-for"] || "") as string;
    const ip = xff.split(",")[0].trim() || (req.socket.remoteAddress || "");
    // normalize IPv6-mapped IPv4 ::ffff:127.0.0.1
    return ip.replace("::ffff:", "");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
    try {
        const ip = getClientIP(req);
        const salt = process.env.VISITOR_SALT || "";
        const hash = crypto.createHash("sha256").update(ip + ":" + salt).digest("hex");
        return res.status(200).json({ iphash: hash });
    } catch (e: any) {
        return res.status(500).json({ error: e.message || "Failed" });
    }
}
