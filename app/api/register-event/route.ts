import { NextRequest, NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN || "ntn_n47675377287VfE9CKnhyUyF2agO1WQBRE7mXBdvCQgaKX";
const PARENT_PAGE = "33511c2ada4081a9ab16c9885fddda68";

// Hardcoded DB ID - will create on first run if not set
let EVENT_DB_ID = process.env.NOTION_EVENT_DB_ID || "";

async function notionRequest(path: string, method: string, body?: object) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function ensureDb(): Promise<string> {
  if (EVENT_DB_ID) return EVENT_DB_ID;

  const db = await notionRequest("/databases", "POST", {
    parent: { type: "page_id", page_id: PARENT_PAGE },
    title: [{ type: "text", text: { content: "WMG April 18 Event Registrations" } }],
    properties: {
      Name: { title: {} },
      Email: { email: {} },
      Attending: { select: { options: [{ name: "in-person", color: "green" }, { name: "remote", color: "blue" }] } },
      Phone: { phone_number: {} },
      "Registered At": { date: {} },
    },
  });

  EVENT_DB_ID = db.id;
  return db.id;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, attending, phone } = await req.json();
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email required" }, { status: 400 });
    }

    const dbId = await ensureDb();

    await notionRequest("/pages", "POST", {
      parent: { database_id: dbId },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Email: { email },
        Attending: { select: { name: attending || "in-person" } },
        ...(phone ? { Phone: { phone_number: phone } } : {}),
        "Registered At": { date: { start: new Date().toISOString() } },
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Registration error:", message);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
