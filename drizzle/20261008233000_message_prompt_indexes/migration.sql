ALTER TABLE "message" ADD COLUMN IF NOT EXISTS "prompt" text;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "message_recipient_created_at_idx"
	ON "message" ("recipient_id", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "message_sender_ip_created_at_idx"
	ON "message" ("sender_ip_hash", "created_at");
