import express from "express";
import { serverConfig } from "./config.js";
import swaggerUi from "swagger-ui-express";
import { mainRouter } from "./router/main.router.js";
import { swaggerOptions } from "./swagger.js";
import bodyParser from "body-parser";


const app = express();
app.use(express.json());
app.use(bodyParser.json());

const PORT = serverConfig.PORT;
console.log(serverConfig.NODE_ENV);


if (serverConfig.NODE_ENV !== "production") {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));
    app.use("/api-docs-json", (req, res) => res.json(swaggerOptions));
}

app.use("/api", mainRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} -port`);
    console.log(`Swagger is running on http://localhost:${PORT}/api-docs`);
    
});