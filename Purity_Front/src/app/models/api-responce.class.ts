/**
 * @classdesc
 *  Model of API responces
 * 
 * @param data
 *  Container for transferred data
 * @param success
 *  Is a request have been sucessfully fulfilled by a backend server or not
 * @param message
 *  Message provided by a backend server if error is occured
 */
export class ApiResponce<T> {
    public readonly data!: T;
    public readonly success: boolean = false;
    public readonly message: string = "";
}