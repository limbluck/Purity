import styles from './Home.module.scss'
import bannerPictureURL1 from '../../assets/banner/banner1.jpg'
import bannerPictureURL2 from '../../assets/banner/banner2.jpg'
import bannerPictureURL3 from '../../assets/banner/banner3.jpg'

import { useEffect, useRef, useState } from 'react'
import useSwipe from '../../hooks/useSwipe.hook'
import CourseThumbnail from '../utility/CourseThumbnail.component'
import { useCourseThumbnails } from '../../hooks/useAPI.hooks'

export default function Home() {


    // #region Banner section
        const [bannerCurrent, setBannerCurrent] = useState(1);
        const bannersAmount: number = 3;

        function bannerNext(): void {
            if (bannerCurrent < bannersAmount) setBannerCurrent(bannerCurrent + 1)
            else setBannerCurrent(1);
        }
        function bannerPervious(): void {
            if (bannerCurrent > 1) setBannerCurrent(bannerCurrent - 1)
            else setBannerCurrent(bannersAmount);
        }

        // Swipe controls
        
            const bannerRef = useRef<HTMLElement>(null);
            const [bannerCurrentDistance, bannerStopListener] = useSwipe(bannerRef);
            let bannerRequiredSwipeDistance: number;
            useEffect(() => {
                bannerRequiredSwipeDistance = bannerRef.current!.offsetWidth / 3;
                if (bannerCurrentDistance! >  bannerRequiredSwipeDistance) {bannerStopListener(); bannerNext()}
                if (bannerCurrentDistance! < -bannerRequiredSwipeDistance) {bannerStopListener(); bannerPervious();}
            }, [bannerCurrentDistance]);

    // #endregion

    // #region Courses section

        const [status, courses] = useCourseThumbnails(6);

    // #endregion

    return (
        <>
            <h1 className={styles.hidden_header}>Welcome to Purity!</h1>

            <section className={styles.banner}
                ref={bannerRef}
            >

                <button className={`${styles.slide} ${styles.left}`}
                    onClick={bannerPervious}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"/></g></svg>
                </button>

                <button className={`${styles.slide} ${styles.right}`}
                    onClick={bannerNext}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M17.9,4.4l20.7,20.5c0.6,0.6,0.6,1.6,0,2.2L17.9,47.6c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2c-0.6-0.6-0.6-1.6,0-2.2l16.3-16.1c0.6-0.6,0.6-1.6,0-2.2L13.6,8.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2C16.4,3.9,17.3,3.9,17.9,4.4z"/></g></svg>
                </button>

                <div className={`${styles.item} ${bannerCurrent === 1 ? styles.shown : styles.hidden}`}>
                    <div className={styles.container}>
                        <h2 className={styles.header}>Learn Without Limits</h2>
                        <p className={styles.text}>Explore endless learning possibilities at Purity.<br/>Elevate your education journey with diverse courses.</p>
                        <button className={styles.button}>Find Out More</button>
                    </div>
                    <img className={styles.background} src={bannerPictureURL1} draggable="false" />
                </div>

                <div className={`${styles.item} ${bannerCurrent === 2 ? styles.shown : styles.hidden}`}>
                    <div className={styles.container}>
                        <h2 className={styles.header}>Where Knowledge Knows No Bounds</h2>
                        <p className={styles.text}>Embark on a journey of unlimited learning with Purity.<br />Explore diverse courses tailored for your success.<br />Unleash your potential today!</p>
                        <a className={styles.button}>Start Your Odyssey</a>
                    </div>
                    <img className={styles.background} src={bannerPictureURL2} draggable="false" />
                </div>

                <div className={`${styles.item} ${bannerCurrent === 3 ? styles.shown : styles.hidden}`}>
                    <div className={styles.container}>
                        <h2 className={styles.header}>Nurturing Minds, Shaping Futures</h2>
                        <p className={styles.text}>Ignite your curiosity with Purity's curated courses.<br />Empower your intellect and chart a path to success.</p>
                        <a className={styles.button}>Explore Courses</a>
                    </div>
                    <img className={styles.background} src={bannerPictureURL3} draggable="false" />
                </div>

            </section>

            <section className={`${styles.section} ${styles.cards} ${styles.background__transparent}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Follow Your Dreams</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>Unlock your potential through our transformative education courses.<br/>Engage in enriching experiences that propel you toward a brighter future.</p>

                    <div className={`${styles.content} ${styles.cards}`}>

                        <div className={`${styles.card} ${styles.color_1}`}>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M19.1,42.5L2.6,25.9c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0L19.4,34c0.4,0.4,1.1,0.4,1.5,0L45.2,9.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L21.3,42.5C20.7,43.2,19.7,43.2,19.1,42.5z"/></g></svg>
                            <h3 className={styles.title}>DISCOVER YOUR PASSION</h3>
                            <p className={styles.text}>Explore courses tailored to your interests. Uncover new passions, and embark on a learning journey that aligns with your dreams.</p>
                            <a className={styles.button}>Passion Unleashed</a>
                        </div>

                        <div className={`${styles.card} ${styles.color_2}`}>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M19.1,42.5L2.6,25.9c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0L19.4,34c0.4,0.4,1.1,0.4,1.5,0L45.2,9.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L21.3,42.5C20.7,43.2,19.7,43.2,19.1,42.5z"/></g></svg>
                            <h3 className={styles.title}>ACHIEVE YOUR AMBITIONS</h3>
                            <p className={styles.text}>Turn dreams into reality with our comprehensive courses. Equip yourself with the skills needed to achieve your long-held aspirations.</p>
                            <a className={styles.button}>Ambitions Realized</a>
                        </div>

                        <div className={`${styles.card} ${styles.color_3}`}>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M19.1,42.5L2.6,25.9c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0L19.4,34c0.4,0.4,1.1,0.4,1.5,0L45.2,9.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L21.3,42.5C20.7,43.2,19.7,43.2,19.1,42.5z"/></g></svg>
                            <h3 className={styles.title}>SHAPE YOUR FUTURE</h3>
                            <p className={styles.text}>Craft a future that aligns with your dreams. Our courses provide the knowledge and tools to shape the successful tomorrow you envision.</p>
                            <a className={styles.button}>Future in Focus</a>
                        </div>

                    </div>

                </div>
            </section>

            <section className={`${styles.section} ${styles.courses} ${styles.background__svg}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Our Featured Courses</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>Discover excellence in learning through our featured courses.<br/>Elevate your skills and knowledge with specially curated programs designed for your success.</p>

                    <div className={`${styles.content} ${styles.courses}`}>

                        <CourseThumbnail status={status} course={courses[0]}/>
                        <CourseThumbnail status={status} course={courses[1]}/>
                        <CourseThumbnail status={status} course={courses[2]}/>
                        <CourseThumbnail status={status} course={courses[3]}/>
                        <CourseThumbnail status={status} course={courses[4]}/>
                        <CourseThumbnail status={status} course={courses[5]}/>

                    </div>

                    <a className={styles.button}>View All Courses</a>

                </div>
            </section>
        </>
    )

            

            // <section class="banner small">
            //     <h2 class="header">Become A Student Today!</h2>
            //     <p class="text">Embrace your educational journey with us.<br>Join today and unlock a world of knowledge and possibilities.</p>
            //     <a class="button">Register Now</a>
            // </section>

            // <section class="section teachers background--white">
            //     <div class="container">

            //         <h2 class="header">Our Awesome Teachers</h2>
            //         <div class="separator"></div>
            //         <p class="text">A diverse team of experts dedicated to shaping minds.<br>From design gurus to marketing mavens, they inspire and empower learners every day.</p>

            //         <div class="content teachers carousel"
            //             appSwipeDetection
            //                 (swipeStart)="teachersSwipeStart()"
            //                 (swipeMove)="teachersSwipeMove($event)"
            //                 (swipeEnd)="teachersSwipeEnd()"
            //         >

            //             <button class="slide left"
            //                 (click)="teachersPageDecrease()"
            //             >
            //                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"/></g></svg>
            //             </button>
            //             <button class="slide right"
            //                 (click)="teachersPageIncrease()"
            //             >
            //                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M17.9,4.4l20.7,20.5c0.6,0.6,0.6,1.6,0,2.2L17.9,47.6c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2c-0.6-0.6-0.6-1.6,0-2.2l16.3-16.1c0.6-0.6,0.6-1.6,0-2.2L13.6,8.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2C16.4,3.9,17.3,3.9,17.9,4.4z"/></g></svg>
            //             </button>

            //             <div class="container"
            //                 appCarousel
            //                     [carouselSetPage]="teachersPage"
            //                     (carouselCurrentPage)="teachersRecievePage($event)"
            //                     [carouselSwipeDistance]="teachersSwipeDistance"
            //                     [carouselSwipeActive]="teachersSwipeActive"
            //             >
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher1.jpg" draggable="false">
            //                     <span class="name">Peter Stevenson</span>
            //                     <span class="subject">Designer and CEO</span>
            //                     <span class="about">Leading design visionary and business strategist.</span>
            //                 </div>
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher2.jpg" draggable="false">
            //                     <span class="name">Alicia Patrick</span>
            //                     <span class="subject">Public Relations</span>
            //                     <span class="about">Expert in communication and brand promotion.</span>
            //                 </div>
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher3.jpg" draggable="false">
            //                     <span class="name">Anna Smith</span>
            //                     <span class="subject">Marketing and Sales</span>
            //                     <span class="about">Mastermind behind successful marketing campaigns.</span>
            //                 </div>
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher4.jpg" draggable="false">
            //                     <span class="name">Thomas Jones</span>
            //                     <span class="subject">Front-End Developer</span>
            //                     <span class="about">Crafting user-friendly web interfaces with flair.</span>
            //                 </div>
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher5.jpg" draggable="false">
            //                     <span class="name">Gloria Angels</span>
            //                     <span class="subject">Designer</span>
            //                     <span class="about">Creativity meets functionality in her designs.</span>
            //                 </div>
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher6.jpg" draggable="false">
            //                     <span class="name">Martin Philips</span>
            //                     <span class="subject">Front-End Developer</span>
            //                     <span class="about">Transforming ideas into seamless web experiences.</span>
            //                 </div>
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher7.jpg" draggable="false">
            //                     <span class="name">Michael Lorens</span>
            //                     <span class="subject">Marketing & Sales</span>
            //                     <span class="about">Driving sales with innovative marketing strategies.</span>
            //                 </div>
            //                 <div class="teacher">
            //                     <img class="photo" src="assets/teachers/teacher8.jpg" draggable="false">
            //                     <span class="name">William Anderson</span>
            //                     <span class="subject">Public Relations</span>
            //                     <span class="about">Building strong public relations for impactful brands.</span>
            //                 </div>

            //             </div>
            //         </div>

            //         <div class="pages">
            //             <button (click)="teachersPageSet(1)" [class.active]="teachersPageRecieved === 1"></button>
            //             <button (click)="teachersPageSet(2)" [class.active]="teachersPageRecieved === 2"></button>
            //             <button (click)="teachersPageSet(3)" [class.active]="teachersPageRecieved === 3"></button>
            //             <button (click)="teachersPageSet(4)" [class.active]="teachersPageRecieved === 4"></button>
            //             <button (click)="teachersPageSet(5)" [class.active]="teachersPageRecieved === 5"></button>
            //             <button (click)="teachersPageSet(6)" [class.active]="teachersPageRecieved === 6"></button>
            //             <button (click)="teachersPageSet(7)" [class.active]="teachersPageRecieved === 7"></button>
            //             <button (click)="teachersPageSet(8)" [class.active]="teachersPageRecieved === 8"></button>
            //         </div>

            //     </div>
            // </section>

            // <section class="section reviews background--transparent">
            //     <div class="container">

            //         <h2 class="header">What Our Customers Say</h2>
            //         <div class="separator transparent"></div>

            //         <div class="content reviews carousel"
            //             appSwipeDetection
            //                     (swipeStart)="reviewsSwipeStart()"
            //                     (swipeMove)="reviewsSwipeMove($event)"
            //                     (swipeEnd)="reviewsSwipeEnd()"
            //         >
            //             <div class="container"
            //                 appCarousel
            //                     [carouselSetPage]="reviewsPage"
            //                     (carouselCurrentPage)="reviewsRecievePage($event)"
            //                     [carouselSwipeDistance]="reviewsSwipeDistance"
            //                     [carouselSwipeActive]="reviewsSwipeActive"
            //             >

            //                 <div class="review">
            //                     <p class="text">The courses here revolutionized my design approach.<br>Comprehensive and insightful, a must-visit for aspiring designers.</p>
            //                     <img class="photo" src="assets/reviews/review1.jpg" draggable="false">
            //                     <p class="name">Peter Stevenson</p>
            //                     <p class="subject">Designer and CEO</p>
            //                 </div>

            //                 <div class="review">
            //                     <p class="text">A game-changer for PR enthusiasts!<br>I've gained invaluable skills that have elevated my professional strategies.</p>
            //                     <img class="photo" src="assets/reviews/review2.jpg" draggable="false">
            //                     <p class="name">Andy Worner</p>
            //                     <p class="subject">Public Relations</p>
            //                 </div>

            //                 <div class="review">
            //                     <p class="text">Exceptional content for anyone in sales and marketing.<br>Practical insights that have boosted my team's performance.</p>
            //                     <img class="photo" src="assets/reviews/review3.jpg" draggable="false">
            //                     <p class="name">John Evens</p>
            //                     <p class="subject">Marketing and Sales</p>
            //                 </div>

            //             </div>
            //         </div>

            //         <div class="pages">
            //             <button (click)="reviewsPageSet(1)" [class.active]="reviewsPageRecieved === 1"></button>
            //             <button (click)="reviewsPageSet(2)" [class.active]="reviewsPageRecieved === 2"></button>
            //             <button (click)="reviewsPageSet(3)" [class.active]="reviewsPageRecieved === 3"></button>
            //             </div>

            //     </div>
            // </section>

            // <section class="section blogs background--svg">
            //     <div class="container">

            //         <h2 class="header">Our Latest Blogs</h2>
            //         <div class="separator"></div>
            //         <p class="text">Dive into thought-provoking blogs from industry experts.<br>From design innovations to marketing trends, stay informed and inspired with our latest articles.</p>

            //         <div class="content blogs carousel"
            //             appSwipeDetection
            //                 (swipeStart)="blogsSwipeStart()"
            //                 (swipeMove)="blogsSwipeMove($event)"
            //                 (swipeEnd)="blogsSwipeEnd()"
            //         >

            //             <button class="slide left"
            //                 (click)="blogsPageDecrease()"
            //             >
            //                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"/></g></svg>
            //             </button>
            //             <button class="slide right"
            //                 (click)="blogsPageIncrease()"
            //             >
            //                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M17.9,4.4l20.7,20.5c0.6,0.6,0.6,1.6,0,2.2L17.9,47.6c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2c-0.6-0.6-0.6-1.6,0-2.2l16.3-16.1c0.6-0.6,0.6-1.6,0-2.2L13.6,8.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2C16.4,3.9,17.3,3.9,17.9,4.4z"/></g></svg>
            //             </button>

            //             <div class="container"
            //                 appCarousel
            //                     [carouselSetPage]="blogsPage"
            //                     (carouselCurrentPage)="blogsRecievePage($event)"
            //                     [carouselSwipeDistance]="blogsSwipeDistance"
            //                     [carouselSwipeActive]="blogsSwipeActive"
            //             >

            //                 @if (blogsThumbnails[0]) {
            //                     <div class="blog" style="background-image: url({{blogsThumbnails[0].imageURL}});">
            //                         <a class="title">{{blogsThumbnails[0].title}}</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>{{blogsThumbnails[0].author}}</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>{{blogsThumbnails[0].created.substring(0, 10)}}</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
                
            //                     <div class="blog" style="background-image: url({{blogsThumbnails[1].imageURL}});">
            //                         <a class="title">{{blogsThumbnails[1].title}}</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>{{blogsThumbnails[1].author}}</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>{{blogsThumbnails[1].created.substring(0, 10)}}</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
                
            //                     <div class="blog" style="background-image: url({{blogsThumbnails[2].imageURL}});">
            //                         <a class="title">{{blogsThumbnails[2].title}}</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>{{blogsThumbnails[2].author}}</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>{{blogsThumbnails[2].created.substring(0, 10)}}</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
                
            //                     <div class="blog" style="background-image: url({{blogsThumbnails[3].imageURL}});">
            //                         <a class="title">{{blogsThumbnails[3].title}}</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>{{blogsThumbnails[3].author}}</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>{{blogsThumbnails[3].created.substring(0, 10)}}</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
                
            //                     <div class="blog" style="background-image: url({{blogsThumbnails[4].imageURL}});">
            //                         <a class="title">{{blogsThumbnails[4].title}}</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>{{blogsThumbnails[4].author}}</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>{{blogsThumbnails[4].created.substring(0, 10)}}</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
            //                 } @else {
            //                     <div class="blog" style="background-image: url();">
            //                         <a class="title">Loading blogs...</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>Loading blogs...</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>???</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
            //                     <div class="blog" style="background-image: url();">
            //                         <a class="title">Loading blogs...</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>Loading blogs...</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>???</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
            //                     <div class="blog" style="background-image: url();">
            //                         <a class="title">Loading blogs...</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>Loading blogs...</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>???</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
            //                     <div class="blog" style="background-image: url();">
            //                         <a class="title">Loading blogs...</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>Loading blogs...</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>???</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
            //                     <div class="blog" style="background-image: url();">
            //                         <a class="title">Loading blogs...</a>
            //                         <div class="container">
            //                             <div class="info author">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
            //                                 <span>Loading blogs...</span>
            //                                 <div class="title">Author</div>
            //                             </div>
            //                             <div class="info date">
            //                                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
            //                                 <span>???</span>
            //                                 <div class="title">Created</div>
            //                             </div>                        
            //                         </div>
            //                     </div>
            //                 }

            //             </div>
            //         </div>

            //     </div>
            // </section>

            // <section class="section clients background--transparent">
            //     <div class="container">

            //         <h2 class="header">Our Awesome Clients</h2>
            //         <div class="separator"></div>
            //         <p class="text">Celebrating the heart of our success.<br>Trusted collaborations and valued partnerships fuel our growth and innovation.</p>

            //         <div class="content clients carousel"
            //             appSwipeDetection
            //                 (swipeStart)="clientsSwipeStart()"
            //                 (swipeMove)="clientsSwipeMove($event)"
            //                 (swipeEnd)="clientsSwipeEnd()"
            //         >

            //             <button class="slide left"
            //                 (click)="clientsPageDecrease()"
            //             >
            //                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"/></g></svg>
            //             </button>
            //             <button class="slide right"
            //                 (click)="clientsPageIncrease()"
            //             >
            //                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M17.9,4.4l20.7,20.5c0.6,0.6,0.6,1.6,0,2.2L17.9,47.6c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2c-0.6-0.6-0.6-1.6,0-2.2l16.3-16.1c0.6-0.6,0.6-1.6,0-2.2L13.6,8.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2C16.4,3.9,17.3,3.9,17.9,4.4z"/></g></svg>
            //             </button>

            //             <div class="container"
            //                 appCarousel
            //                     [carouselSetPage]="clientsPage"
            //                     (carouselCurrentPage)="clientsRecievePage($event)"
            //                     [carouselSwipeDistance]="clientsSwipeDistance"
            //                     [carouselSwipeActive]="clientsSwipeActive"
            //             >

            //                 <img class="client" src="assets/clients/client1.png" draggable="false">
            //                 <img class="client" src="assets/clients/client2.png" draggable="false">
            //                 <img class="client" src="assets/clients/client3.png" draggable="false">
            //                 <img class="client" src="assets/clients/client4.png" draggable="false">
            //                 <img class="client" src="assets/clients/client5.png" draggable="false">
            //                 <img class="client" src="assets/clients/client6.png" draggable="false">
            //                 <img class="client" src="assets/clients/client7.png" draggable="false">
            //                 <img class="client" src="assets/clients/client8.png" draggable="false">

            //             </div>

            //         </div>
            //     </div>
            // </section>
}