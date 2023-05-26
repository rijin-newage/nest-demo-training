import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  private clientCount = 0;

  afterInit() {
    console.log('Socket server is ready');
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    this.clientCount++;
    console.log(`Client connected: ${client.handshake.query.clientName}`);
    console.log(`Total clients : ${this.clientCount}`);
    this.server.emit('reply', `New client joined, total ${this.clientCount}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.clientCount--;
    console.log(`Client disconnected: ${client.handshake.query.clientName}`);
    console.log(`Total clients : ${this.clientCount}`);
  }

  @SubscribeMessage('message')
  onClientMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log(data);
    client.emit('reply', `Hello ${client.handshake.query.clientName}`);
  }
}
