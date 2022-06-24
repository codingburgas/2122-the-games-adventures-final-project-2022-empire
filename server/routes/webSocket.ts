import { Socket } from "socket.io";
import { isPlayerInBound } from "../helpers/playerMovement";
import { Vector2 } from '../types';
import Location from "../models/Locations";

let nice: Vector2;

export const onPlayerMovement = async (socket: Socket, data: Vector2): Promise<void> => {
    if (isPlayerInBound()) {
        nice = data;
        socket.emit('playerMovementAccepted', nice);
        await Location.updateUserLocation(socket.data.user.subject, nice);
    } else {
        console.log(socket.data.user.subject);
        socket.emit('playerMovementDeclined', await Location.getUserLocation(socket.data.user.subject));
    }

}
