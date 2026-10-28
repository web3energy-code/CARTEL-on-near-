import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return res.status(500).json({
      error: "Server authentication is not configured",
    });
  }

  const accountId = req.body?.accountId;

  if (
    typeof accountId !== "string" ||
    !/^[a-z0-9._-]{2,64}$/.test(accountId)
  ) {
    return res.status(400).json({
      error: "Invalid NEAR account ID",
    });
  }

  const recipient =
    process.env.CARTEL_AUTH_RECIPIENT ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!recipient) {
    return res.status(500).json({
      error: "Authentication domain is not configured",
    });
  }

  const supabase = createClient(
    supabaseUrl,
    serviceKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  const nonce = randomBytes(32).toString("base64");
  const expiresAt = new Date(
    Date.now() + 5 * 60 * 1000
  ).toISOString();

  const message =
    `Sign in to CARTEL\n` +
    `NEAR account: ${accountId}\n` +
    `Nonce: ${nonce}\n` +
    `Expires: ${expiresAt}`;

  const { error } = await supabase
    .from("wallet_auth_challenges")
    .insert({
      nonce,
      account_id: accountId,
      message,
      recipient,
      expires_at: expiresAt,
    });

  if (error) {
    console.error(
      "Challenge creation failed:",
      error.message
    );

    return res.status(500).json({
      error: "Could not create authentication challenge",
    });
  }

  return res.status(200).json({
    accountId,
    message,
    nonce,
    recipient,
    expiresAt,
  });
}
