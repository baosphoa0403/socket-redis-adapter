import { ModuleRef, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis-adapter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // GATEWAY_METADATA
  // const PORT_METADATA = "port";
  // const options = refector.get('websockets:gateway_options',SocketAdminGateway )
  // console.log("options",options );
  
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
