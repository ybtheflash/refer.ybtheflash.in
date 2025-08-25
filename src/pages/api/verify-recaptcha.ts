import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: "No token provided" });
    }

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

    try {
        const response = await fetch(verifyUrl, { method: "POST" });
        const data = await response.json();
        if (data.success && data.score > 0.5) {
            return res.status(200).json({ success: true, score: data.score });
        } else {
            return res.status(403).json({ success: false, score: data.score, error: "Failed reCAPTCHA" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Verification failed" });
    }
}
