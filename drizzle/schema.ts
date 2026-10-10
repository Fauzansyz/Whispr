import { pgTable, text, uuid, timestamp, boolean, foreignKey, primaryKey, unique, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const account = pgTable("account", {
	id: text().primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const message = pgTable("message", {
	id: uuid().defaultRandom().primaryKey(),
	recipientId: text("recipient_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	content: text().notNull(),
	prompt: text(),
	imageBase64: text("image_base64"),
	imageMimeType: text("image_mime_type"),
	isRead: boolean("is_read").default(false).notNull(),
	isStarred: boolean("is_starred").default(false).notNull(),
	isSpam: boolean("is_spam").default(false).notNull(),
	burnAfterRead: boolean("burn_after_read").default(false).notNull(),
	senderIpHash: text("sender_ip_hash"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
}, (table) => [
	index("message_recipient_created_at_idx").on(table.recipientId, table.createdAt),
	index("message_sender_ip_created_at_idx").on(table.senderIpHash, table.createdAt),
]);

export const reaction = pgTable("reaction", {
	id: uuid().defaultRandom().primaryKey(),
	messageId: uuid("message_id").notNull().references(() => message.id, { onDelete: "cascade" } ),
	emoji: text().notNull(),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const session = pgTable("session", {
	id: text().primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
}, (table) => [
	unique("session_token_unique").on(table.token),]);

export const user = pgTable("user", {
	id: text().primaryKey(),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	username: text(),
	bio: text(),
	allowImages: boolean("allow_images").default(true).notNull(),
	isAcceptingMessages: boolean("is_accepting_messages").default(true).notNull(),
}, (table) => [
	unique("user_email_unique").on(table.email),	unique("user_username_unique").on(table.username),]);

export const verification = pgTable("verification", {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});
