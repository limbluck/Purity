export default class APIService {
    readonly ROOT = "http://limbluck-purity.mooo.com/server";
    readonly API = this.ROOT + "/api";
    readonly ASSETS = this.ROOT + "/assets";

    CoursesThumbnailsRnd(amount: number) {return `${this.API}/Courses/thumbnails/${amount}rnd`}
    BlogsThumbnailsRnd(amount: number) {return `${this.API}/Blogs/thumbnails/${amount}rnd`}
}