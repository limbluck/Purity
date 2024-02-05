import { Injectable, inject } from '@angular/core';
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

  private readonly ROOT = "https://localhost:7019";

  constructor(private readonly http: HttpClient) {}

  getRandomCoursesThumbnails(amount: number): Array<CourseThumbnail> {
    let serviceResponce = new Array<CourseThumbnail>;

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': `${this.ROOT}`,
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'json' as 'json'
    };

    this.http.get<ApiResponce<Array<CourseThumbnail>>>(`${this.ROOT}/api/courses/thumbnails/${amount}rnd`, options)
      .subscribe({
        next:(apiResponce) => {
          if (apiResponce.success) {
            // For recieved blob image processing purposes
            for (let i = 0; i < apiResponce.data.length; i++) {
              
              if (apiResponce.data[i].image) {
                // Decode base64 string back into a byte array
                const byteCharacters = atob(apiResponce.data[i].image);
      
                // Convert byte array to array buffer
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
    
                // Create data URL from byte array
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust the MIME type if needed
                apiResponce.data[i].image = URL.createObjectURL(blob);
              }
  
              // Create service responce
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
      'Access-Control-Allow-Origin': `${this.ROOT}`,
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'json' as 'json'
    };

    this.http.get<ApiResponce<Array<BlogThumbnail>>>(`${this.ROOT}/api/blogs/thumbnails/${amount}rnd`, options)
      .subscribe({
        next:(apiResponce) => {
          if (apiResponce.success) {
            // For recieved blob image processing purposes
            for (let i = 0; i < apiResponce.data.length; i++) {
              
              if (apiResponce.data[i].image) {
                // Decode base64 string back into a byte array
                const byteCharacters = atob(apiResponce.data[i].image);
      
                // Convert byte array to array buffer
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
    
                // Create data URL from byte array
                const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Adjust the MIME type if needed
                apiResponce.data[i].image = URL.createObjectURL(blob);
              }
  
              // Create service responce
              serviceResponce.push(apiResponce.data[i])

            }
          }
        },
        error: (error) => {console.log(error)}
      })

    return serviceResponce
  }
}
