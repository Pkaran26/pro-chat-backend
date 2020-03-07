import { ObjectId } from 'mongodb';
import {
  ADD_USER, USER_LOGIN, SEARCH_USERS, GET_USERS, REPORT_USER
} from '../Socket/Events';
import UserView from './Views';
import { User, Login } from './UserClass';

export class UserSocketEvents{
  private userView: any;

  constructor(private io: any, private _conn: any){
    this.userView = new UserView(this._conn);
  }

  initSocket(){
    const self = this;
    this.io.on(ADD_USER, async function(data: any) {
      const { socket_id, payload } = data;
      const res = await self.addUser(payload);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });

    this.io.on(USER_LOGIN, async function(data: any) {
      const { socket_id, payload } = data;
      const res = await self.login(payload);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });

    this.io.on(SEARCH_USERS, async function(data: any) {
      const { socket_id, query, skip } = data;
      const res = await self.searchUsers(query, skip);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });

    this.io.on(GET_USERS, async function(data: any) {
      const { socket_id, skip } = data;
      const res = await self.getUsers(skip);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });

    this.io.on(REPORT_USER, async function(data: any) {
      const { socket_id, user_id, type } = data;
      const res = await self.reportUser(user_id, type);
      self.io.to(`${ socket_id }`).emit({ ...res });
    });
  }

  async addUser(payload: User){
    const res = await this.userView.addUser(payload);
    return res.result
  }

  async login(payload: Login){
    const res = await this.userView.login(payload);
    return res.result
  }

  async searchUsers(query: string, skip: number){
    return await this.userView.searchUsers(query, skip);
  }

  async getUsers(skip: number){
    return await this.userView.getUsers(skip);
  }

  async reportUser(user_id: ObjectId, type: string){
    return await this.userView.reportUser(user_id, type);
  }
}
