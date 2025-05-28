import c from "config";
export const serverConfig = {
    PORT: c.get("PORT") || 3000,
    TOKEN_SECRET: c.get("mySecretTokenKey"),
    DB_HOST: c.get("DB_HOST"),
    DB_NAME: c.get("DB_NAME"),
    DB_USER: c.get("DB_USER"),
    DB_PASSWORD: c.get("DB_PASSWORD"),
    NODE_ENV: "development",
    JWT_EXPIRES_IN: c.get("JWT_EXPIRES_IN")
    

} 