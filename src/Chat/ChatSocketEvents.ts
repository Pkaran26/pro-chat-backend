import { ObjectId } from 'mongodb';
import {
  ADD_MESSAGE, GET_CONVERSIONS, GET_SINGLE_CONVERSION, DELETE_MESSAGE
} from '../Socket/Events';
import ChatView from '../User/Views';
import { Message } from './MessageClass';

export class ChatSocketEvents{
  private chatView: any;

  constructor(private io: any, private _conn: any){
    this.chatView = new ChatView(this._conn);
  }

  initSocket(){
    const self = this;
    this.io.on(ADD_MESSAGE, async function(data: any) {
      const { socket_id, payload } = data;
      const res = await self.addMessage(payload);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });

    this.io.on(GET_CONVERSIONS, async function(data: any) {
      const { socket_id, user_id } = data;
      const res = await self.getConversions(user_id);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });

    this.io.on(GET_SINGLE_CONVERSION, async function(data: any) {
      const { socket_id, convo_id, skip } = data;
      const res = await self.getSingleConversion(convo_id, skip);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });

    this.io.on(DELETE_MESSAGE, async function(data: any) {
      const { socket_id, message_id } = data;
      const res = await self.deleteMessage(message_id);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });
  }

  async addMessage(payload: Message){
    const res = await this.chatView.addMessage(payload);
    return res.result
  }

  async getConversions(user_id: ObjectId){
    return await this.chatView.getConversions(user_id);
  }

  async getSingleConversion(convo_id: ObjectId, skip: number){
    return await this.chatView.getSingleConversion(convo_id, skip);
  }

  async deleteMessage(message_id: ObjectId){
    const res = await this.chatView.deleteMessage(message_id);
    return res.result;
  }
}
