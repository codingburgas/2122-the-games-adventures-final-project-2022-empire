import { Socket } from "socket.io";
import { isPlayerInBound } from "../helpers/playerMovement";

interface Vector2 {x: number, y: number}

let nice: Vector2;

export const onPlayerMovement = (socket: Socket, data: Vector2): void => {
    if (isPlayerInBound()) {
        nice = data;
        socket.emit('playerMovementAccepted', nice);
    }
}
