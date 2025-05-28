import fs from 'node:fs/promises';

const getSwagger = async (name) => {
    return JSON.parse(
        await fs.readFile(process.cwd() + `/src/swagger/${name}.swagger.json`, "utf8")
    );    
}

const authSwagger = await getSwagger('auth');
const carsSwagger = await getSwagger('cars');
const costumersSwagger = await getSwagger('costumers');
const statusSwagger = await getSwagger('status');
const discount_conditionsSwagger = await getSwagger('discount_conditions');
const contractSwagger = await getSwagger('contract');
const paymentsSwagger = await getSwagger('payments');


export const swaggerOptions = {
    openapi: "3.0.0",
    info: {
        title: "Nest Store",
        version: "1.0.0",
        contact: {
            url: "/api-docs-json",
        },
    },
    paths: {
        ...authSwagger.paths,
        ...costumersSwagger.paths,
        ...carsSwagger.paths,
        ...statusSwagger.paths,
        ...discount_conditionsSwagger.paths,
        ...contractSwagger.paths,
        ...paymentsSwagger.paths,
    },
    components: {
        securitySchemes: {
            Bearer: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};


