import { trigger, useAnimation } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Subject } from "rxjs";
import { bannerAnimations } from '../../animations/banner.animations';
import { HttpClient } from '@angular/common/http'

import { APIService } from '../../services/api.service';
import { CourseThumbnail } from '../../models/course-thumbnail.class';
import { BlogThumbnail } from '../../models/blog-thumbnail.class';

/**
 * @classdesc
 *   Class to handle home page component's logic
 * 
 * @section Banner - handle logic of a banner section of the home page 
 *    @animations bannerAnimations - animations for main banner
 *    @param bannerCurrent: number
 *      Track the current banner number (from 1 to 3)
 *    @param banner1stItemStatus: string
 *    @param banner2stItemStatus: string
 *    @param banner3stItemStatus: string
 *      Statuses to pass to the banner animation
 *    @method bannerSwitch: void
 *      Change banners' statuses depending on bannerCurrent value
 *    @method bannerPervious: void 
 *      Decrement bannerCurrent by 1 and call bannerSwitch
 *    @method bannerNext: void 
 *      Increment bannerCurrent by 1 and call bannerSwitch
 * 
 *    @param bannerSwipeCancel: Subject<undefined>
 *      Subject required to tell to the swipe detection directive that it must unsubscribe of the current scroll move
 *    @method bannerSwipe: void 
 *      @input distance: {x: number, y: number}
 *      Сall bannerPervious or bannerNext methods in dependency of swipe distance returned by swipe detection directive
 * 
 * @section Courses - handle logic of a courses section of the home page
 *    @param coursesThumbnails: Array<CourseThumbnail>
 *      Container variable for the API responce value
 * 
 * @section Teachers - handle logic of a teachers section of the home page
 *    @param teachersPage: number
 *      Current page of a teachers carousel
 *    @method teachersPageDecrease: void
 *      Increace teachersPage by 1
 *    @method teachersPageIncrease: void
 *      Decreace teachersPage by 1
 *    @method teachersPageSet: void
 *      @input pageNumber: number
 *      Set teachersPage
 * 
 *    @param teachersSwipeDistance: number
 *      Distance measured by the swipe detection directive and required for the caorousel directive
 *    @param teachersSwipeActive: boolean
 *      Is user swiping the teachers carousel at the moment
 *    @method teachersSwipeStart: void
 *      Method to call when swipe started
 *      Updates teachersSwipeActive for the carouselDirective 
 *    @method teachersSwipeMove: void
 *      Method to call when swipe is happening
 *      Updates teachersSwipeDistance for the carouselDirective 
 *    @method teachersSwipeEnd: void
 *      Method to call when swipe ended
 *      Updates teachersSwipeActive for the carouselDirective 
 * 
 *    @param teachersPageRecieved: number
 *      Page recieved in responce from carousel directive
 *    @method teachersRecievePage: void
 *      Method to set teachersPage equal to teachersPageRecieved
 * 
 * @section Reviews - handle logic of a review section of the home page
 *    @param reviewsPage: number
 *      Current page of a reviews carousel
 *    @method reviewsPageSet: void
 *      @input pageNumber: number
 *      Set reviewsPage
 * 
 *    @param reviewsSwipeDistance: number
 *      Distance measured by the swipe detection directive and required for the caorousel directive
 *    @param reviewsSwipeActive: boolean
 *      Is user swiping the reviews carousel at the moment
 *    @method reviewsSwipeStart: void
 *      Method to call when swipe started
 *      Updates reviewsSwipeActive for the carouselDirective 
 *    @method reviewsSwipeMove: void
 *      Method to call when swipe is happening
 *      Updates reviewsSwipeDistance for the carouselDirective 
 *    @method reviewsSwipeEnd: void
 *      Method to call when swipe ended
 *      Updates reviewsSwipeActive for the carouselDirective 
 * 
 *    @param reviewsPageRecieved: number
 *      Page recieved in responce from carousel directive
 *    @method reviewsRecievePage: void
 *      Method to set reviewsPage equal to reviewsPageRecieved
 * 
 * @section Blogs - handle logic of a blogs section of the home page
 *    @param blogsThumbnails: Array<BlogThumbnail>
 *      Container variable for the API responce value
 * 
 *    @param blogsPage: number
 *      Current page of a blogs carousel
 *    @method blogsPageDecrease: void
 *      Increace blogsPage by 1
 *    @method blogsPageIncrease: void
 *      Decreace blogsPage by 1
 * 
 *    @param blogsSwipeDistance: number
 *      Distance measured by the swipe detection directive and required for the caorousel directive
 *    @param blogsSwipeActive: boolean
 *      Is user swiping the blogs carousel at the moment
 *    @method blogsSwipeStart: void
 *      Method to call when swipe started
 *      Updates blogsSwipeActive for the carouselDirective 
 *    @method blogsSwipeMove: void
 *      Method to call when swipe is happening
 *      Updates blogsSwipeDistance for the carouselDirective 
 *    @method blogsSwipeEnd: void
 *      Method to call when swipe ended
 *      Updates blogsSwipeActive for the carouselDirective 
 * 
 *    @param blogsPageRecieved: number
 *      Page recieved in responce from carousel directive
 *    @method blogsRecievePage: void
 *      Method to set blogsPage equal to blogsPageRecieved
 * 
 * @section Clients - handle logic of a blogs section of the home page
 *    @param clientsPage: number
 *      Current page of a clients carousel
 *    @method clientsPageDecrease: void
 *      Increace clientsPage by 1
 *    @method clientsPageIncrease: void
 *      Decreace clientsPage by 1
 * 
 *    @param clientsSwipeDistance: number
 *      Distance measured by the swipe detection directive and required for the caorousel directive
 *    @param clientsSwipeActive: boolean
 *      Is user swiping the clients carousel at the moment
 *    @method clientsSwipeStart: void
 *      Method to call when swipe started
 *      Updates clientsSwipeActive for the carouselDirective 
 *    @method clientsSwipeMove: void
 *      Method to call when swipe is happening
 *      Updates clientsSwipeDistance for the carouselDirective 
 *    @method clientsSwipeEnd: void
 *      Method to call when swipe ended
 *      Updates clientsSwipeActive for the carouselDirective 
 * 
 *    @param clientsPageRecieved: number
 *      Page recieved in responce from carousel directive
 *    @method clientsRecievePage: void
 *      Method to set clientsPage equal to clientsPageRecieved
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    bannerAnimations.bannerElementAnimation,
    bannerAnimations.bannerContainerAnimation,
    bannerAnimations.bannerBackgroundAnimation
  ]
})
export class HomeComponent {

  constructor (
    private readonly _cdref: ChangeDetectorRef,
    private readonly _apiService: APIService,
    ) {
      this.coursesThumbnails = this._apiService.getRandomCoursesThumbnails(6)
      this.blogsThumbnails = this._apiService.getRandomBlogsThumbnails(5)
    }

  // #region Banner

  bannerCurrent: number = 1;
  banner1stItemStatus: string = 'shown';
  banner2ndItemStatus: string = 'hidden';
  banner3rdItemStatus: string = 'hidden';
  bannerSwitch() {
    switch (this.bannerCurrent) {
      case(1):
      this.banner1stItemStatus = 'shown';
      this.banner2ndItemStatus = 'hidden';
      this.banner3rdItemStatus = 'hidden';
      break
      case(2):
      this.banner1stItemStatus = 'hidden';
      this.banner2ndItemStatus = 'shown';
      this.banner3rdItemStatus = 'hidden';
      break
      case(3):
      this.banner1stItemStatus = 'hidden';
      this.banner2ndItemStatus = 'hidden';
      this.banner3rdItemStatus = 'shown';
      break
      default:
        throw new Error("Unexpected value of 'this.bannerCurrent' in bannerSwitch() function")
      }
    }

    bannerPervious(): void {
      --this.bannerCurrent < 1
      ? this.bannerCurrent = 3
      : this.bannerCurrent;
      this.bannerSwitch()
    }
    
    bannerNext(): void {
      ++this.bannerCurrent > 3
      ? this.bannerCurrent = 1
      : this.bannerCurrent;
      this.bannerSwitch()
    }
    
    readonly bannerSwipeCancel = new Subject<undefined>()
    bannerSwipe(distance: {x: number, y: number}): void {
      if (distance.x > 200) {this.bannerPervious(); this.bannerSwipeCancel.next(undefined)}
      if (distance.x < -200) {this.bannerNext(); this.bannerSwipeCancel.next(undefined)}
    }
        
        // #endregion
  
  // #region Courses

    coursesThumbnails: Array<CourseThumbnail>;
    
  // #endregion

  // #region Teachers

    teachersPage: number = 1;
    teachersPageDecrease(): void {
      this.teachersPage = this.teachersPageRecieved;
      this._cdref.detectChanges();
      this.teachersPage--;
    }
    teachersPageIncrease(): void {
      this.teachersPage = this.teachersPageRecieved;
      this._cdref.detectChanges();
      this.teachersPage++;
    }
    teachersPageSet(pageNumber: number): void {
      this.teachersPage = this.teachersPageRecieved;
      this._cdref.detectChanges();
      this.teachersPage = pageNumber;
    }

    teachersSwipeDistance: number = 0;
    teachersSwipeActive: boolean = false;
    teachersSwipeStart() {
      this.teachersSwipeActive = true;
    }
    teachersSwipeMove(value: {x: number, y: number}) {
      this.teachersSwipeDistance = value.x;
    }
    teachersSwipeEnd() {
      this.teachersSwipeActive = false;
    }

    teachersPageRecieved: number = 1;
    teachersRecievePage(recievedPage: number) {
      this.teachersPageRecieved = recievedPage;
    }

  // #endregion

  // #region Reviews
  
    reviewsPage: number = 1;
    reviewsPageSet(pageNumber: number) {
      this.reviewsPage = this.reviewsPageRecieved;
      this._cdref.detectChanges();
      this.reviewsPage = pageNumber;
    }

    reviewsSwipeDistance: number = 0;
    reviewsSwipeActive: boolean = false;
    reviewsSwipeStart() {
      this.reviewsSwipeActive = true;
    }
    reviewsSwipeMove(value: {x: number, y: number}) {
      this.reviewsSwipeDistance = value.x;
    }
    reviewsSwipeEnd() {
      this.reviewsSwipeActive = false;
      this.reviewsPage = this.reviewsPageRecieved;
    }
    
    reviewsPageRecieved: number = 1;
    reviewsRecievePage(recievedPage: number) {
      this.reviewsPageRecieved = recievedPage;
    }

  // #endregion

  // #region Blogs

    blogsThumbnails: Array<BlogThumbnail>;
    
    blogsPage: number = 1;
    blogsPageDecrease() {
      this.blogsPage = this.blogsPageRecieved;
      this._cdref.detectChanges();
      this.blogsPage--;
    }
    blogsPageIncrease() {
      this.blogsPage = this.blogsPageRecieved;
      this._cdref.detectChanges();
      this.blogsPage++;
    }
    
    blogsSwipeDistance: number = 0;
    blogsSwipeActive: boolean = false;
    blogsSwipeStart() {
      this.blogsSwipeActive = true;
    }
    blogsSwipeMove(value: {x: number, y: number}) {
      this.blogsSwipeDistance = value.x;
    }
    blogsSwipeEnd() {
      this.blogsSwipeActive = false;
    }

    blogsPageRecieved: number = 1;
    blogsRecievePage(recievedPage: number) {
      this.blogsPageRecieved = recievedPage;
    }

  // #endregion
  
  // #region Clients
    clientsPage: number = 1;
    clientsPageDecrease() {
      this.clientsPage = this.clientsPageRecieved;
      this._cdref.detectChanges();
      this.clientsPage--;
    }
    clientsPageIncrease() {
      this.clientsPage = this.clientsPageRecieved;
      this._cdref.detectChanges();
      this.clientsPage++;
    }

    clientsSwipeDistance: number = 0;
    clientsSwipeActive: boolean = false;
    clientsSwipeStart() {
      this.clientsSwipeActive = true;
    }
    clientsSwipeMove(value: {x: number, y: number}) {
      this.clientsSwipeDistance = value.x;
    }
    clientsSwipeEnd() {
      this.clientsSwipeActive = false;
    }

    clientsPageRecieved: number = 1;
    clientsRecievePage(recievedPage: number) {
      this.clientsPageRecieved = recievedPage;
    }

  // #endregion
}
