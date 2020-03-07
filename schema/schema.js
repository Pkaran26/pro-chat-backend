const user = [
  first_name: string,
  last_name: string,
  email: string,
  conversions: [{
    user: ObjectId,
    convo_id: ObjectId
  }],
  created_at: date,
  is_active: boolean,
  report: [{
    report_by: ObjectId,
    report_type: string
  }]
]

const messages = [
  convo_id: ObjectId,
  user_from: ObjectId,
  user_to: ObjectId,
  msg: string,
  file: {
    name: string,
    url: string,
    size: string
  }
  created_at: date,
  status: {
    delivered: boolean,
    seen: boolean
  }
]
