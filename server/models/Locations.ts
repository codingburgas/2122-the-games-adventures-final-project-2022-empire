import BaseModel from "./base/Base";
import { Vector2 } from '../types';
import sql from 'mssql/msnodesqlv8'

class Locations extends BaseModel {
    constructor() {
        super();
    }

    updateUserLocation = (id: number, locationData: Vector2): Promise< any > => {
        return this.connection.request()
        .input('Id', sql.Int, id)
        .input('ChangedX', sql.Decimal, locationData.x)
        .input('ChangedY', sql.Decimal, locationData.y)
        .query('UPDATE UserLocations SET CoordinateX = @ChangedX, CoordinateY = @ChangedY WHERE UserId = @Id')
    };

    getUserLocation = (id: number): Promise< Vector2 | void> => {
        return this.connection.request()
        .input('Id', sql.Int, id)
        .query('SELECT CoordinateX, CoordinateY FROM UserLocations WHERE UserId = @Id')
        .then((result) => {
            return new Vector2(result.recordset[0].CoordinateX, result.recordset[0].CoordinateY);
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

const Location: Locations = new Locations();

export default Location;
