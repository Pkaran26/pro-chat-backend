import express from 'express';
import cors from 'cors';
import * as socketio from "socket.io";
import * as bodyParser from "body-parser";
import { Connection } from './Utils/Connection';
import { UserSocketEvents } from "./User/UserSocketEvents";
import { ChatSocketEvents } from "./Chat/ChatSocketEvents";
import moment from "moment";

import { CONNECTION, DISCONNECT } from './Socket/Events';

const app = express();
app.set("port", process.env.PORT || 3005);
app.use(cors());
app.use(bodyParser.json())
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on(CONNECTION, function(socket: any) {
  const _conn = new Connection();

  const userSocket = new UserSocketEvents(io, _conn);
  userSocket.initSocket();

  const chatSocket = new ChatSocketEvents(io, _conn);
  chatSocket.initSocket();

  console.log("a user connected");

  io.on(DISCONNECT, function(data: any) {
    console.log("a user connected");
  });

});

const server = http.listen(3005, function() {
  console.log("listening on *:3000");
});
