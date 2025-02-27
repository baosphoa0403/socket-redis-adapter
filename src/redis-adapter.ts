import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { INestApplicationContext } from '@nestjs/common';




export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;
    
    constructor(private app: INestApplicationContext,) {
        super(app)
    }
    async connectToRedis(): Promise<void> {
        const pubClient = createClient({ url: `redis://localhost:6379` });
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);
            
        this.adapterConstructor = createAdapter(pubClient, subClient);
    }

   

    // sẽ auto tạo 1 sever socket
    // public create(
    //     port: number,
    //     options: ServerOptions & {
    //         namespace?: string;
    //         server?: any;
    //     },
    //   ): Server {
    //     console.log("port 2", port, "namespace: ", options?.namespace, "");
    //     const server = super.createIOServer(port, options || {});
    //     server.adapter(this.adapterConstructor);
    
    //     return server;
    //   }

    createIOServer(port: number, options?: ServerOptions & { namespace?: string }): Server {
        console.log("port", port, "namespace: ", options?.namespace, "options: ", options);

        const server: Server = super.createIOServer(port, options);
       
        server.adapter(this.adapterConstructor);
        return server;
    }

    bindClientConnect(server: Server, callback: Function) {
        server.on('connection', (socket: Socket) => {
            console.log("zoo");
            callback(socket)
        });
    }

    // bindMessageHandlers(client: Socket, handlers: { message: string; callback: Function }[], transform: (data: any) => any) {
    //     handlers.forEach(({ message, callback }) => {
    //         client.on(message, async (data) => {
    //             const transformedData = transform ? transform(data) : data;
    //             console.log("zoo1212", transformedData);
                
    //             callback(transformedData);
    //         });
    //     });
    // }

    async close(server: Server): Promise<void> {
        server.close();
    }
    
   
}
