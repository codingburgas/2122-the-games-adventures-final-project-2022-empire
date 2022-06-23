import {Socket} from "socket.io";
import {ExtendedError} from "socket.io/dist/namespace";
import jwt, {Secret} from "jsonwebtoken";


export const auth = (socket: Socket, next: (err?: ExtendedError) => void): void => {
    if(socket.handshake.query && socket.handshake.query.token) {
        try {
            socket.data.user = jwt.verify(socket.handshake.query.token as string, process.env.ACCESS_TOKEN_SECRET as Secret);
            next();
        }
        catch (e) {
            next(new Error('Auth error'));
        }
    }
}
