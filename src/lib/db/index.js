import "server-only"
//import { setDefaultResultOrder } from "node:dns";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../../drizzle/schema";

//setDefaultResultOrder("ipv4first");

const sql = neon(process.env.DATABASE_URL);
const db = drizzle({ client: sql, schema });

export { schema };
export default db;
