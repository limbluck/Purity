import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CourseThumbnail } from '../models/course-thumbnail.class';
import { BlogThumbnail } from "../models/blog-thumbnail.class";
import { ApiResponce } from '../models/api-responce.class';

/**
 * @classdesc
 *   Service to handle api calls
 * 
 * @param ROOT: string - backend server adress
 * 
 * @method getRandomCoursesThumbnails: Array<CourseThumbnail>
 *    @input amount: number - amount of requested courses thumbnails
 *    Returns array of random CourseThumbnail objects
 * 
 * @method getRandomBlogsThumbnails: Array<BlogThumbnail>
 *    @input amount: number - amount of requested blogs thumbnails
 *    Returns array of random BlogThumbnail objects
 */
@Injectable({
  providedIn: 'root'
})
export class APIService {

  private readonly ROOT = "http://limbluck-purity.mooo.com";
  private readonly ROOT_api = this.ROOT + "/server/api";
  private readonly ROOT_assets = this.ROOT + "/server/assets";

  constructor(private readonly http: HttpClient) {}

  getRandomCoursesThumbnails(amount: number): Array<CourseThumbnail> {
    let serviceResponce = new Array<CourseThumbnail>;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'json' as 'json'
    };

    this.http.get<ApiResponce<Array<CourseThumbnail>>>(`${this.ROOT_api}/courses/thumbnails/${amount}rnd`, options)
      .subscribe({
        next:(apiResponce) => {
          if (apiResponce.success) {
            for (let i = 0; i < apiResponce.data.length; i++) {
              
              if (apiResponce.data[i].imageURL) {
                apiResponce.data[i].imageURL = this.ROOT_assets + apiResponce.data[i].imageURL
              }
  
              serviceResponce.push(apiResponce.data[i])
            }
          }
        },
        error: (error) => {console.log(error)}
      })

    return serviceResponce
  }

  getRandomBlogsThumbnails(amount: number): Array<BlogThumbnail> {
    let serviceResponce = new Array<BlogThumbnail>;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'json' as 'json'
    };

    this.http.get<ApiResponce<Array<BlogThumbnail>>>(`${this.ROOT_api}/blogs/thumbnails/${amount}rnd`, options)
      .subscribe({
        next:(apiResponce) => {
          if (apiResponce.success) {
            for (let i = 0; i < apiResponce.data.length; i++) {
              
              if (apiResponce.data[i].imageURL) {
                apiResponce.data[i].imageURL = this.ROOT_assets + apiResponce.data[i].imageURL
              }
  
              serviceResponce.push(apiResponce.data[i])
            }
          }
        },
        error: (error) => {console.log(error)}
      })

    return serviceResponce
  }
}
