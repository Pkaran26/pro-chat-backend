import { MongoClient } from 'mongodb';

export class Connection{
  public db: any;

  public async connect(){
    return await MongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true })
    .then(client=>{
      this.db = client.db('prochat');
    }).
    catch(err=>{
      console.log(err);
      return null
    })
  }
}
