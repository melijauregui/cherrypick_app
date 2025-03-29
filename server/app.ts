import fs from "fs";
import { OpenAPIHono } from '@hono/zod-openapi'
import { callVGGNet, ImageParamSchema, queryPinecone, TopMatchesSchema } from './app/routeVector';
import { createRoute } from '@hono/zod-openapi'
import { PaginatedResponseSchema, PaginationSchema } from "./app/allDatabase";

const app = new OpenAPIHono()
export default app

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
  const { image_path } = c.req.valid('param')
  const image_path_complete = `./server/images/${image_path}`;
  const queryVector = await callVGGNet(image_path_complete);
  fs.writeFileSync('result.json', JSON.stringify(queryVector));
  const res = await queryPinecone(queryVector);
  return c.json(
    res,
    200 
  )
})

const paginatedRoute = createRoute({
  method: 'get',
  path: '/database',
  request: {
    query: PaginationSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: PaginatedResponseSchema,
        },
      },
      description: 'Devuelve los datos de la base de datos de forma paginada',
    },
  },
})

// Registrar el endpoint en la aplicación
app.openapi(paginatedRoute, async (c) => {
  const { page, limit } = c.req.valid('query')

  // const data = await getPaginatedData(page, limit) // Función que retorna un array con los datos de la página solicitada

  return c.json(
    {
      page,
      limit,
      total: 4, 
      data: ["https://i.pinimg.com/474x/72/ec/8e/72ec8eb21c671a640a92c0a24c76bad8.jpg",
              "https://i.pinimg.com/474x/e3/87/4b/e3874b60b2bd8c354b80f74b768ff45a.jpg",
              "https://i.pinimg.com/736x/32/be/3e/32be3e7fa9aa0f103599845cf1778d46.jpg",
              "https://i.pinimg.com/474x/1f/21/16/1f2116d0a2d253fea8853cbcc7c6820b.jpg",
              "https://i.pinimg.com/736x/32/be/3e/32be3e7fa9aa0f103599845cf1778d46.jpg",
              "https://i.pinimg.com/474x/72/ec/8e/72ec8eb21c671a640a92c0a24c76bad8.jpg",
              "https://i.pinimg.com/474x/e3/87/4b/e3874b60b2bd8c354b80f74b768ff45a.jpg",
              "https://i.pinimg.com/736x/32/be/3e/32be3e7fa9aa0f103599845cf1778d46.jpg",
              "https://i.pinimg.com/474x/1f/21/16/1f2116d0a2d253fea8853cbcc7c6820b.jpg",
              "https://i.pinimg.com/736x/32/be/3e/32be3e7fa9aa0f103599845cf1778d46.jpg"], 
    },
    200
  )
})