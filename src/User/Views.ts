import { ObjectId } from 'mongodb';
import moment from 'moment';
import { User, Login } from './UserClass'

export default class UserView{
  constructor(private _conn: any){}

  async addUser(payload: User){
    try {
      await this._conn.connect();
     return await this._conn.db.collection('user').insert({ ...payload, created_at: moment() });
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      //this._conn.close()
    }
  }

  async login(payload: Login){
    try {
      await this._conn.connect();
      const { email, password } = payload
      const user = await this._conn.db.collection('user').findOne({ email: email, password: password });
      if(user){
        return user
      }else{
        return null
      }
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      //this._conn.close()
    }
  }

  async searchUsers(query: string, skip: number){
    try {
      await this._conn.connect();
      return await this._conn.db.collection('user').aggregate([
        {
          $match: {
            $or: [
              { first_name: `/${ query }/` },
              { last: `/${ query }/` },
              { email: `/${ query }/` }
            ]
          },
          $skip: skip,
          $limit: 10
        },
      ])
      .toArray()
    } catch (error) {
      console.log(error);
      return null;
    } finally {
      //this._conn.close()
    }
  }

  async getUsers(skip: number){
    try {
      await this._conn.connect();
      return await this._conn.db.collection('user').aggregate([{
        $skip: skip,
        $limit: 10
      }]).toArray()
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async reportUser(user_id: ObjectId, type: string){
    try {
      await this._conn.connect();
      return await this._conn.db.collection('user').aggregate([{
        $match: { '_id': user_id },
        $addToSet: {
          report: {
            user_id: user_id,
            type: type
          }
        }
      }]).toArray()
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
