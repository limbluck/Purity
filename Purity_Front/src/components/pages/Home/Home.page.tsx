import styles from './Home.module.scss';

import bannerPictureURL1 from '../../../assets/banner/banner1.jpg';
import bannerPictureURL2 from '../../../assets/banner/banner2.jpg';
import bannerPictureURL3 from '../../../assets/banner/banner3.jpg';
import teacherPictureURL1 from '../../../assets/teachers/teacher1.jpg';
import teacherPictureURL2 from '../../../assets/teachers/teacher2.jpg';
import teacherPictureURL3 from '../../../assets/teachers/teacher3.jpg';
import teacherPictureURL4 from '../../../assets/teachers/teacher4.jpg';
import teacherPictureURL5 from '../../../assets/teachers/teacher5.jpg';
import teacherPictureURL6 from '../../../assets/teachers/teacher6.jpg';
import teacherPictureURL7 from '../../../assets/teachers/teacher7.jpg';
import teacherPictureURL8 from '../../../assets/teachers/teacher8.jpg';

import rewiewsPictureURL1 from '../../../assets/reviews/review1.jpg';
import rewiewsPictureURL2 from '../../../assets/reviews/review2.jpg';
import rewiewsPictureURL3 from '../../../assets/reviews/review3.jpg';

import clientPictureURL1 from '../../../assets/clients/client1.png';
import clientPictureURL2 from '../../../assets/clients/client2.png';
import clientPictureURL3 from '../../../assets/clients/client3.png';
import clientPictureURL4 from '../../../assets/clients/client4.png';
import clientPictureURL5 from '../../../assets/clients/client5.png';
import clientPictureURL6 from '../../../assets/clients/client6.png';
import clientPictureURL7 from '../../../assets/clients/client7.png';
import clientPictureURL8 from '../../../assets/clients/client8.png';

import { useEffect, useRef, useState } from 'react';

import CourseThumbnail from '../../utility/CourseThumbnail/CourseThumbnail.component';
import BlogThumbnail from '../../utility/BlogThumbnail/BlogThumbnail.component';

import useSwipe from '../../../hooks/useSwipe.hook';
import useCarousel from '../../../hooks/useCarousel.hook';
import useCourseThumbnailsRnd from '../../../hooks/api/useCourseThumbnailsRnd.hook';
import useBlogsThumbnailsRnd from '../../../hooks/api/useBlogThumbnailsRnd.hook';

export default function Home() {

    // #region Banner section

        // #region Banner-related variables

            // State for class set logic in html
                const [bannerCurrent, setBannerCurrent] = useState(0);
                // Launch first banner background animation
                useEffect(() => {
                    setBannerCurrent(1);
                }, []);
            // Const for 'next' and 'pervious' functions logic
                const bannersAmount = 3;
            // Ref for 'next' and 'pervious' buttons click timeout
                const bannerOnTimeout = useRef<boolean>(false);
            // Banner section element ref to listen swipes on
                const bannerRef = useRef<HTMLElement>(null);
            // Swipe distance value required for banner change
                const bannerRequiredSwipeDistance = useRef<number>(0);

        // #endregion

        // #region Buttons

            // onClick for 'Next' button 
                function bannerNext(): void {

                    if (!bannerOnTimeout.current) {
                        
                        setBannerCurrent(bannerCurrent < bannersAmount ? bannerCurrent + 1 : 1);

                        bannerOnTimeout.current = true;

                        setTimeout(() => {
                            bannerOnTimeout.current = false;
                        }, 1500);
                    }
                }
            // onClick for 'Pervious' button 
                function bannerPervious(): void {

                    if (!bannerOnTimeout.current) {

                        setBannerCurrent(bannerCurrent > 1 ? bannerCurrent - 1 : bannersAmount);

                        bannerOnTimeout.current = true;

                        setTimeout(() => {
                            bannerOnTimeout.current = false;
                        }, 1500);
                    }
                }

        // #endregion

        // #region Swipe-related

            // useSwipe hook to listen distance change of mousemove and touchmove events
                const [, bannerCurrentDistance, bannerStopListener] = useSwipe(bannerRef);

            // Set bannerRequiredSwipeDistance
                useEffect(() => {
                    // Initial set of bannerRequiredSwipeDistance
                    bannerRequiredSwipeDistance.current = bannerRef.current!.offsetWidth / 3;
                    // Listener to set bannerRequiredSwipeDistance on resize events
                    window.addEventListener('resize', () => {bannerRequiredSwipeDistance.current = bannerRef.current!.offsetWidth / 3;}, true);
                    return window.removeEventListener('resize', () => {bannerRequiredSwipeDistance.current = bannerRef.current!.offsetWidth / 3;}, true);
                }, []);

            // Swipe control effect to sync with useSwipe event listeners
                useEffect(() => {
                    // Swipe right (click 'Next')
                    if (bannerCurrentDistance! >  bannerRequiredSwipeDistance.current) {bannerStopListener(); bannerNext();}
                    // Swipe left (click 'Pervious')
                    if (bannerCurrentDistance! < -bannerRequiredSwipeDistance.current) {bannerStopListener(); bannerPervious();}

                }, [bannerCurrentDistance]);

        // #endregion

    // #endregion

    // #region Courses section

        // Fetch courses
        const [coursesThumbnailsStatus, coursesThumbnails] = useCourseThumbnailsRnd(6);

    // #endregion

    // #region Teachers section

        // useCarousel hook to handle carousel page changes and swipes
        const teachersCarouselRef = useRef(null);
        const [teachersPage, teachersSetPage] = useCarousel(teachersCarouselRef);

        // onClick for 'Next' button
        function teachersNextPage() {
            teachersSetPage(teachersPage + 1);
        }
        // onClick for 'Pervious' button
        function teachersPerviousPage() {
            teachersSetPage(teachersPage - 1);
        }

    // #endregion

    // #region Reviews section

        // useCarousel hook to handle carousel page changes and swipes
        const reviewsCarouselRef = useRef(null);
        const [reviewsPage, reviewsSetPage] = useCarousel(reviewsCarouselRef);

    // #endregion

    // #region Blogs section
    
        // Fetch blogs
        const [blogsThumbnailsStatus, blogsThumbnails] = useBlogsThumbnailsRnd(5);

        // useCarousel hook to handle carousel page changes and swipes
        const blogsCarouselRef = useRef(null);
        const [blogsPage, blogsSetPage] = useCarousel(blogsCarouselRef);

        // onClick for 'Next' button
        function blogsNextPage() {
            blogsSetPage(blogsPage + 1);
        }
        // onClick for 'Pervious' button
        function blogsPerviousPage() {
            blogsSetPage(blogsPage - 1);
        }


    // #endregion

    // #region Clients section
    
        // useCarousel hook to handle carousel page changes and swipes
        const clientsCarouselRef = useRef(null);
        const [clientsPage, clientsSetPage] = useCarousel(clientsCarouselRef);

        // onClick for 'Next' button
        function clientsNextPage() {
            clientsSetPage(clientsPage + 1);
        }
        // onClick for 'Pervious' button
        function clientsPerviousPage() {
            clientsSetPage(clientsPage - 1);
        }


    // #endregion

    return (
        <>
            <h1 className={styles.hidden_header}>Welcome to Purity!</h1>

            <section className={styles.banner}
                ref={bannerRef}>

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

                        <CourseThumbnail status={coursesThumbnailsStatus} course={coursesThumbnails[0]}/>
                        <CourseThumbnail status={coursesThumbnailsStatus} course={coursesThumbnails[1]}/>
                        <CourseThumbnail status={coursesThumbnailsStatus} course={coursesThumbnails[2]}/>
                        <CourseThumbnail status={coursesThumbnailsStatus} course={coursesThumbnails[3]}/>
                        <CourseThumbnail status={coursesThumbnailsStatus} course={coursesThumbnails[4]}/>
                        <CourseThumbnail status={coursesThumbnailsStatus} course={coursesThumbnails[5]}/>

                    </div>

                    <a className={styles.button}>View All Courses</a>

                </div>
            </section>

            <section className={`${styles.banner} ${styles.small}`}>
                <h2 className={styles.header}>Become A Student Today!</h2>
                <p className={styles.text}>Embrace your educational journey with us.<br/>Join today and unlock a world of knowledge and possibilities.</p>
                <a className={styles.button}>Register Now</a>
            </section>

            <section className={`${styles.section} ${styles.teachers} ${styles.background__white}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Our Awesome Teachers</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>A diverse team of experts dedicated to shaping minds.<br/>From design gurus to marketing mavens, they inspire and empower learners every day.</p>

                    <div className={`${styles.content} ${styles.teachers} ${styles.carousel}`}>

                        <button className={`${styles.slide} ${styles.right}`}
                            onClick={teachersNextPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M17.9,4.4l20.7,20.5c0.6,0.6,0.6,1.6,0,2.2L17.9,47.6c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2c-0.6-0.6-0.6-1.6,0-2.2l16.3-16.1c0.6-0.6,0.6-1.6,0-2.2L13.6,8.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2C16.4,3.9,17.3,3.9,17.9,4.4z"/></g></svg>
                        </button>
                        <button className={`${styles.slide} ${styles.left}`}
                            onClick={teachersPerviousPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"/></g></svg>
                        </button>

                        <div className={styles.container}
                            ref={teachersCarouselRef}
                        >
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL1} draggable="false" />
                                <span className={styles.name}>Peter Stevenson</span>
                                <span className={styles.subject}>Designer and CEO</span>
                                <span className={styles.about}>Leading design visionary and business strategist.</span>
                            </div>
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL2} draggable="false" />
                                <span className={styles.name}>Alicia Patrick</span>
                                <span className={styles.subject}>Public Relations</span>
                                <span className={styles.about}>Expert in communication and brand promotion.</span>
                            </div>
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL3} draggable="false" />
                                <span className={styles.name}>Anna Smith</span>
                                <span className={styles.subject}>Marketing and Sales</span>
                                <span className={styles.about}>Mastermind behind successful marketing campaigns.</span>
                            </div>
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL4} draggable="false" />
                                <span className={styles.name}>Thomas Jones</span>
                                <span className={styles.subject}>Front-End Developer</span>
                                <span className={styles.about}>Crafting user-friendly web interfaces with flair.</span>
                            </div>
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL5} draggable="false" />
                                <span className={styles.name}>Gloria Angels</span>
                                <span className={styles.subject}>Designer</span>
                                <span className={styles.about}>Creativity meets functionality in her designs.</span>
                            </div>
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL6} draggable="false" />
                                <span className={styles.name}>Martin Philips</span>
                                <span className={styles.subject}>Front-End Developer</span>
                                <span className={styles.about}>Transforming ideas into seamless web experiences.</span>
                            </div>
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL7} draggable="false" />
                                <span className={styles.name}>Michael Lorens</span>
                                <span className={styles.subject}>Marketing & Sales</span>
                                <span className={styles.about}>Driving sales with innovative marketing strategies.</span>
                            </div>
                            <div className={styles.teacher}>
                                <img className={styles.photo} src={teacherPictureURL8} draggable="false" />
                                <span className={styles.name}>William Anderson</span>
                                <span className={styles.subject}>Public Relations</span>
                                <span className={styles.about}>Building strong public relations for impactful brands.</span>
                            </div>

                        </div>
                    </div>

                    <div className={styles.pages}>
                        <button className={teachersPage === 1 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(1);}}
                        ></button>
                        <button className={teachersPage === 2 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(2);}}
                        ></button>
                        <button className={teachersPage === 3 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(3);}}
                        ></button>
                        <button className={teachersPage === 4 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(4);}}
                        ></button>
                        <button className={teachersPage === 5 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(5);}}
                        ></button>
                        <button className={teachersPage === 6 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(6);}}
                        ></button>
                        <button className={teachersPage === 7 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(7);}}
                        ></button>
                        <button className={teachersPage === 8 ? styles.active : ''}
                            onClick={()=>{teachersSetPage(8);}}
                        ></button>
                    </div>

                </div>
            </section>

            <section className={`${styles.section} ${styles.reviews} ${styles.background__transparent}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>What Our Customers Say</h2>
                    <div className={`${styles.separator} ${styles.transparent}`}></div>

                    <div className={`${styles.content} ${styles.reviews} ${styles.carousel}`}>
                        <div className={styles.container}
                            ref={reviewsCarouselRef}
                        >

                            <div className={styles.review}>
                                <p className={styles.text}>The courses here revolutionized my design approach.<br/>Comprehensive and insightful, a must-visit for aspiring designers.</p>
                                <img className={styles.photo} src={rewiewsPictureURL1} draggable="false" />
                                <p className={styles.name}>Peter Stevenson</p>
                                <p className={styles.subject}>Designer and CEO</p>
                            </div>

                            <div className={styles.review}>
                                <p className={styles.text}>A game-changer for PR enthusiasts!<br/>I've gained invaluable skills that have elevated my professional strategies.</p>
                                <img className={styles.photo} src={rewiewsPictureURL2} draggable="false" />
                                <p className={styles.name}>Andy Worner</p>
                                <p className={styles.subject}>Public Relations</p>
                            </div>

                            <div className={styles.review}>
                                <p className={styles.text}>Exceptional content for anyone in sales and marketing.<br/>Practical insights that have boosted my team's performance.</p>
                                <img className={styles.photo} src={rewiewsPictureURL3} draggable="false" />
                                <p className={styles.name}>John Evens</p>
                                <p className={styles.subject}>Marketing and Sales</p>
                            </div>

                        </div>
                    </div>

                    <div className={styles.pages}>
                        <button className={reviewsPage === 1 ? styles.active : ''}
                            onClick={()=>{reviewsSetPage(1);}}
                        ></button>
                        <button className={reviewsPage === 2 ? styles.active : ''}
                            onClick={()=>{reviewsSetPage(2);}}
                        ></button>
                        <button className={reviewsPage === 3 ? styles.active : ''}
                            onClick={()=>{reviewsSetPage(3);}}
                        ></button>
                    </div>

                </div>
            </section>

            <section className={`${styles.section} ${styles.blogs} ${styles.background__svg}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Our Latest Blogs</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>Dive into thought-provoking blogs from industry experts.<br/>From design innovations to marketing trends, stay informed and inspired with our latest articles.</p>

                    <div className={`${styles.content} ${styles.blogs} ${styles.carousel}`}
                        style={{display: blogsThumbnailsStatus >= 400 ? 'none' : undefined}}
                    >

                        <button className={`${styles.slide} ${styles.right}`}
                            onClick={blogsNextPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M17.9,4.4l20.7,20.5c0.6,0.6,0.6,1.6,0,2.2L17.9,47.6c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2c-0.6-0.6-0.6-1.6,0-2.2l16.3-16.1c0.6-0.6,0.6-1.6,0-2.2L13.6,8.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2C16.4,3.9,17.3,3.9,17.9,4.4z"/></g></svg>
                        </button>
                        <button className={`${styles.slide} ${styles.left}`}
                            onClick={blogsPerviousPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"/></g></svg>
                        </button>

                        <div className={styles.container}
                            ref={blogsCarouselRef}
                        >

                            <BlogThumbnail status={blogsThumbnailsStatus} blog={blogsThumbnails[0]}/>
                            <BlogThumbnail status={blogsThumbnailsStatus} blog={blogsThumbnails[1]}/>
                            <BlogThumbnail status={blogsThumbnailsStatus} blog={blogsThumbnails[2]}/>
                            <BlogThumbnail status={blogsThumbnailsStatus} blog={blogsThumbnails[3]}/>
                            <BlogThumbnail status={blogsThumbnailsStatus} blog={blogsThumbnails[4]}/>

                        </div>
                    </div>

                </div>
            </section>

            <section className={`${styles.section} ${styles.clients} ${styles.background__transparent}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Our Awesome Clients</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>Celebrating the heart of our success.<br/>Trusted collaborations and valued partnerships fuel our growth and innovation.</p>

                    <div className={`${styles.content} ${styles.clients} ${styles.carousel}`}>

                        <button className={`${styles.slide} ${styles.right}`}
                            onClick={clientsNextPage}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M17.9,4.4l20.7,20.5c0.6,0.6,0.6,1.6,0,2.2L17.9,47.6c-0.6,0.6-1.6,0.6-2.2,0l-2.2-2.2c-0.6-0.6-0.6-1.6,0-2.2l16.3-16.1c0.6-0.6,0.6-1.6,0-2.2L13.6,8.8c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2C16.4,3.9,17.3,3.9,17.9,4.4z"/></g></svg>
                        </button>
                        <button className={`${styles.slide} ${styles.left}`}
                            onClick={clientsPerviousPage}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M34.2,47.7L13.4,27.2c-0.6-0.6-0.6-1.6,0-2.2L34.2,4.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L22.1,25c-0.6,0.6-0.6,1.6,0,2.2l16.3,16.1c0.6,0.6,0.6,1.6,0,2.2l-2.2,2.2C35.7,48.2,34.8,48.2,34.2,47.7z"/></g></svg>
                        </button>

                        <div className={styles.container}
                            ref={clientsCarouselRef}
                        >

                            <img className={styles.client} src={clientPictureURL1} draggable="false" />
                            <img className={styles.client} src={clientPictureURL2} draggable="false" />
                            <img className={styles.client} src={clientPictureURL3} draggable="false" />
                            <img className={styles.client} src={clientPictureURL4} draggable="false" />
                            <img className={styles.client} src={clientPictureURL5} draggable="false" />
                            <img className={styles.client} src={clientPictureURL6} draggable="false" />
                            <img className={styles.client} src={clientPictureURL7} draggable="false" />
                            <img className={styles.client} src={clientPictureURL8} draggable="false" />

                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}