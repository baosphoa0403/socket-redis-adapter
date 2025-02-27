import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatAdminGateway } from './chat-gateway';
import { NotifyAdminGateway } from './notify-gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatAdminGateway, NotifyAdminGateway],
  exports: []
})
export class AppModule {}
