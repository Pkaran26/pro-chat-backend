class Conversion {
  constructor(
    public user: ObjectId,
    public convo_id: ObjectId
  ) {}
}

class Report {
  constructor(
    public report_by: ObjectId,
    public report_type: string,
    public reviewed: boolean
  ) {}
}

export class User {
  constructor(
    public first_name: string,
    public last_name: string,
    public email: string,
    public conversion: Conversion[],
    public created_at: date,
    public is_active: boolean,
    public password: string,
    public report: Report[]
  ) {}
}

export class Login {
  constructor(
    public email: string,
    public password: string
  ) {}
}
