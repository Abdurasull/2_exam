import c from "config";

import { createConnection } from "mysql2/promise";

export const connection = await createConnection({
    host: c.get("DB_HOST"),
    database: c.get("DB_NAME"),
    user: c.get("DB_USER"),
    password: c.get("DB_PASSWORD")
})