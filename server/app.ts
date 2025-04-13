import fs from "fs";
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { callVGGNet, ImageParamSchema, queryPinecone, TopMatchesSchema } from './app/routeVector';
import { PaginationSchema } from "./app/allDatabase";


const app = new OpenAPIHono()
export default app

// api que recibe una imagen y devuelve los 10 resultados más similares paginados
const routeVector = createRoute({
  method: 'get',
  path: '/images/{image_path}',
  request: {
    params: ImageParamSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TopMatchesSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})

app.openapi(routeVector, async (c) => {
  const topK = 10;
  const { image_path } = c.req.valid('param')
  const image_path_complete = `./server/images/${image_path}`;
  const queryVector = await callVGGNet(image_path_complete);
  fs.writeFileSync('result.json', JSON.stringify(queryVector));
  const res = await queryPinecone(queryVector, topK);
  return c.json(
    res,
    200 
  )
})

// api que devuelve los resultados paginados de la base de datos
const paginatedRoute = createRoute({
  method: 'get',
  path: '/all',
  request: {
    query: PaginationSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TopMatchesSchema,
        },
      },
      description: 'Devuelve los datos de la base de datos de forma paginada',
    },
  },
})

// Registrar el endpoint en la aplicación
app.openapi(paginatedRoute, async (c) => {
  const { page, limit } = c.req.valid('query')
  const topK = 10;
  
  const embedding = Array.from({ length: 768 }, () => Math.random());

  const res = await queryPinecone(embedding, topK);
  return c.json(
    res,
    200 
  )
})


