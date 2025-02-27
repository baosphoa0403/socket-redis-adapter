import { OnModuleInit } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server, Namespace } from 'socket.io';

@WebSocketGateway({namespace: "notify"})
export class NotifyAdminGateway
  implements  OnModuleInit
{
  
  onModuleInit() {
    console.log('WebSocket server is running...');
  }

//   beforeApplicationShutdown(signal?: string) {
//       throw new Error('Method not implemented.');
//   }
//   onModuleDestroy() {
//       throw new Error('Method not implemented.');
//   }
  @WebSocketServer() server: Namespace;
  
  @SubscribeMessage('events')
  async abc(client: Socket, data: string) {
    console.log("data", data);
    console.log("    this.server.name",     this.server.name);
    
    // console.log( "  this.server", this.server.emit("hello", data));
      
  }
}
