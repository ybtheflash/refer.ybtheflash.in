"use client";
import { init } from "@instantdb/react";

const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID;

if (!APP_ID) {
    console.warn("NEXT_PUBLIC_INSTANT_APP_ID is not set. InstantDB will not work.");
}

export const db = APP_ID ? init({ appId: APP_ID }) : (null as any);
