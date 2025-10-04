import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config()
import '../config/container';
import Fastify from 'fastify';
import { userRoutes } from './routes/UserRoutes';
import { roleRoutes } from './routes/RoleRoute';
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import PetRoute from './routes/PetRoute';
import ProviderRoute from './routes/ProviderRoute';


const fastify = Fastify({
  logger: true
})
fastify.register(jwt, {
  secret: process.env.JWT_SECRET
})
fastify.register(cors)
fastify.decorate(
  "authenticate",
  async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
);
 fastify.decorate(
    "isAdmin",
    async function (request: any, reply: any) {
      try {
        await request.jwtVerify();

        if (!request.user.roles.includes("Administrador")) {
          return reply.code(403).send({ error: "Forbidden: Admins only" });
        }
      } catch (err) {
        reply.code(401).send({ error: "Unauthorized", details: err });
      }
    }
  );
fastify.register(userRoutes, {
  prefix: '/api'
})
fastify.register(roleRoutes, {
  prefix: '/api'
})
fastify.register(PetRoute, {
  prefix: '/api'
})
fastify.register(ProviderRoute, {
  prefix: '/api'
})


const start = async () => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 3000
  try {
    await fastify.listen({ port: port, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${port}`)
}
start()