import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id
		}),
	},
	user: {
		accounts: r.many.account(),
		messages: r.many.message(),
		sessions: r.many.session(),
	},
	message: {
		user: r.one.user({
			from: r.message.recipientId,
			to: r.user.id
		}),
		reactions: r.many.reaction(),
	},
	reaction: {
		message: r.one.message({
			from: r.reaction.messageId,
			to: r.message.id
		}),
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id
		}),
	},
}))