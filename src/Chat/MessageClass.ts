// class Status{
//   constructor(
//     public delivered: boolean,
//     public seen: boolean
//   ){}
// }

class File{
  constructor(
    name: string,
    url: string,
    size: string
  ){}
}

export class Message{
  constructor(
    public convo_id: ObjectId,
    public msg_from: ObjectId,
    public msg_to: ObjectId,
    public msg: string,
    public file: File,
    public created_at: date,
    public status: string
  ){}
}
