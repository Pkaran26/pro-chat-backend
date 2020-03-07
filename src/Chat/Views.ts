import { ObjectId } from 'mongodb';
import moment from 'moment';
import { _conn } from '../Utils/Connection';
import { Message } from './MessageClass';

export default class ChatView{
  constructor(private _conn: any){}
  
  async addMessage(payload: Message){
    try {
      await this._conn.connect();
      const { msg_from, msg_to, convo_id } = payload
      await this._conn.db.collection('user').aggregate([ {
        $match: { '_id': { $in: [msg_from, msg_to] } },
        $addToSet: { conversion: convo_id }
      } ])
      return await this._conn.db.collection('chat').insert({ ...payload, created_at: moment() })
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getConversions(user_id: ObjectId){
    try {
      await this._conn.connect();
      return await this._conn.db.collection('user').aggregate([{
        $match: { _id: user_id },
        $lookup: {
          from: 'user',
          localField: 'conversion.user',
          foreignField: '_id',
          as: 'conversion_user'
        },
        $lookup: {
          from: 'chat',
          localField: 'conversion.convo_id',
          foreignField: '_id',
          as: 'conversions'
        }
      }]).toArray()
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getSingleConversion(convo_id: ObjectId, skip: number){
    try {
      await this._conn.connect();
      return await this._conn.db.collection('chat').aggregate([{
        $match: { convo_id: convo_id },
        $sort: 'created_at',
        $skip: skip,
        $lookup: {
          from: 'user',
          localField: 'msg_from',
          foreignField: '_id',
          as: 'msg_from'
        },
      }]).toArray()
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteMessage(message_id: ObjectId){
    try {
      await this._conn.connect();
      return await this._conn.db.collection('chat').delete({ _id: message_id })
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
