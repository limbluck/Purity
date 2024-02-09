/**
 * @classdesc
 *  Model for course thumbnail
 *  Initially created to transfer course thumbnail data through API
 */
export class CourseThumbnail {
    public title!: string;
    public category!: string;
    public enrolled!: number;
    public price!: number;
    public summary!: string;
    public imageURL!: string;
}