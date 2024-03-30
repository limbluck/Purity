import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './About.module.scss'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useCarousel from '../../../hooks/useCarousel.hook';

import teacherPictureURL1 from '../../../assets/teachers/teacher1.jpg'
import teacherPictureURL2 from '../../../assets/teachers/teacher2.jpg'
import teacherPictureURL3 from '../../../assets/teachers/teacher3.jpg'
import teacherPictureURL4 from '../../../assets/teachers/teacher4.jpg'
import teacherPictureURL5 from '../../../assets/teachers/teacher5.jpg'
import teacherPictureURL6 from '../../../assets/teachers/teacher6.jpg'
import teacherPictureURL7 from '../../../assets/teachers/teacher7.jpg'
import teacherPictureURL8 from '../../../assets/teachers/teacher8.jpg'
import clientPictureURL1 from '../../../assets/clients/client1.png'
import clientPictureURL2 from '../../../assets/clients/client2.png'
import clientPictureURL3 from '../../../assets/clients/client3.png'
import clientPictureURL4 from '../../../assets/clients/client4.png'
import clientPictureURL5 from '../../../assets/clients/client5.png'
import clientPictureURL6 from '../../../assets/clients/client6.png'
import clientPictureURL7 from '../../../assets/clients/client7.png'
import clientPictureURL8 from '../../../assets/clients/client8.png'

export default function About() {

    // #region Values section

        // #region Tabs carousel

            const valuesCarouselRef = useRef<HTMLDivElement>(null);
            const [ valuesCurrentTab, setValuesCurrentTab ] = useCarousel(valuesCarouselRef);

            function handleValueButtonClick(valueNumber: number) {
                setValuesCurrentTab(valueNumber);
            };

        // #endregion 

        // #region Buttons tab change animation

            // Refs
                const valuesButtonsRef = useRef<HTMLDivElement>(null);
                const valuesButtonsWidth = useRef<number>(0);
                const valuesButtonsBarRef = useRef<HTMLDivElement>(null);
                const valuesButtonsBarWidth = useRef<number>(0);
                const valuesLastTab = useRef<number>(1);
                const valuesWindowSize = useRef<number>(0);

            // Get values on resize
                useEffect(() => {
                    valuesWindowSize.current = window.innerWidth;
                    valuesButtonsWidth.current = Number(window.getComputedStyle(valuesButtonsRef.current! as Element).getPropertyValue("width").slice(0, -2));
                    valuesButtonsBarWidth.current = Number(window.getComputedStyle(valuesButtonsBarRef.current! as Element).getPropertyValue("width").slice(0, -2));
                    window.addEventListener('resize', handleResize);
                    return () => window.removeEventListener('resize', handleResize);
                }, [valuesCurrentTab]);

                const { contextSafe } = useGSAP();

                // Resize animation
                const valuesResizeButtonsBar = contextSafe(() => {
                    if (valuesWindowSize.current > 700) {

                        gsap.set(valuesButtonsBarRef.current, {
                            left: `${(valuesCurrentTab - 1) * 20}%`
                        })
                    }
                    else {

                        gsap.set(valuesButtonsBarRef.current, {
                            left: `${ (valuesButtonsWidth.current / 9 + 8) * (valuesCurrentTab - 1) - 1}px` // Width, padding, border
                        })
                    }
                });

                function handleResize() {
                    valuesWindowSize.current = window.innerWidth;
                    valuesButtonsWidth.current = Number(window.getComputedStyle(valuesButtonsRef.current! as Element).getPropertyValue("width").slice(0, -2));
                    valuesButtonsBarWidth.current = Number(window.getComputedStyle(valuesButtonsBarRef.current! as Element).getPropertyValue("width").slice(0, -2));
                    valuesResizeButtonsBar();
                }

            // Animation
            useGSAP(() => {

                if (valuesWindowSize.current > 700) {

                    if (valuesCurrentTab === 1 && valuesLastTab.current === 5) {
                        gsap.timeline()
                            .to(valuesButtonsBarRef.current, {
                                left: '100%',
                                ease: 'power1.out',
                                duration: 0.25 / 2
                            })
                            .set(valuesButtonsBarRef.current, {
                                left: '-20%',
                            })
                            .to(valuesButtonsBarRef.current, {
                                left: '0%',
                                ease: 'power1.out',
                                duration: 0.25 / 2
                            })
                    }
                    else if (valuesCurrentTab === 5 && valuesLastTab.current === 1) {
                        gsap.timeline()
                        .to(valuesButtonsBarRef.current, {
                            left: '-20%',
                            ease: 'power1.out',
                            duration: 0.25 / 2
                        })
                        .set(valuesButtonsBarRef.current, {
                            left: '100%',
                        })
                        .to(valuesButtonsBarRef.current, {
                            left: '80%',
                            ease: 'power1.out',
                            duration: 0.25 / 2
                        })
                    }
                    else {
                        gsap.to(valuesButtonsBarRef.current, {
                            left: `${(valuesCurrentTab - 1) * 20}%`,
                            ease: 'power1.out',
                            duration: 0.25
                        })
                    }

                } else {

                    if (valuesCurrentTab === 1 && valuesLastTab.current === 5) {
                        gsap.timeline()
                            .to(valuesButtonsBarRef.current, {
                                left: '100%',
                                ease: 'power1.out',
                                duration: 0.25 / 2
                            })
                            .set(valuesButtonsBarRef.current, {
                                left: `${ - valuesButtonsBarWidth.current }px`,
                            })
                            .to(valuesButtonsBarRef.current, {
                                left: '0%',
                                ease: 'power1.out',
                                duration: 0.25 / 2
                            })
                    }
                    else if (valuesCurrentTab === 5 && valuesLastTab.current === 1) {
                        gsap.timeline()
                            .to(valuesButtonsBarRef.current, {
                                left: `${ - valuesButtonsBarWidth.current }px`,
                                ease: 'power1.out',
                                duration: 0.25 / 2
                            })
                            .set(valuesButtonsBarRef.current, {
                                left: `100%`,
                            })
                            .to(valuesButtonsBarRef.current, {
                                left: `${ (valuesButtonsWidth.current / 9 + 8) * (valuesCurrentTab - 1) - 1}px`, // Width, padding, border
                                ease: 'power1.out',
                                duration: 0.25 / 2
                            })
                    }
                    else {
                        gsap.to(valuesButtonsBarRef.current, {
                            left: `${ (valuesButtonsWidth.current / 9 + 8) * (valuesCurrentTab - 1) - 1}px`, // Width, padding, border
                            ease: 'power1.out',
                            duration: 0.25
                        })
                    }

                }

                valuesLastTab.current = valuesCurrentTab;

            }, {dependencies: [ valuesCurrentTab ]});

        // #endregion

    // #endregion

    return (
        <>
            <h1 className={styles.hidden_header}>About Purity</h1>

            <section className={`${styles.section} ${styles.values} ${styles.background__transparent}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Our Core Values</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>At the heart of our institution lie our core values, the guiding principles that shape every aspect of our educational endeavors. <br /> These values define who we are, how we operate, and what we aspire to achieve.</p>

                    <div className={`${styles.content} ${styles.values}`}>

                        <div className={styles.buttons} ref={valuesButtonsRef}>
                            <div ref={valuesButtonsBarRef}></div>
                            <button className={`${valuesCurrentTab === 1 && styles.active}`}
                                onClick={() => {handleValueButtonClick(1)}}>Accessibility</button>
                            <button className={`${valuesCurrentTab === 2 && styles.active}`}
                                onClick={() => {handleValueButtonClick(2)}}>Community</button>
                            <button className={`${valuesCurrentTab === 3 && styles.active}`}
                                onClick={() => {handleValueButtonClick(3)}}>Empowerment</button>
                            <button className={`${valuesCurrentTab === 4 && styles.active}`}
                                onClick={() => {handleValueButtonClick(4)}}>Excellence</button>
                            <button className={`${valuesCurrentTab === 5 && styles.active}`}
                                onClick={() => {handleValueButtonClick(5)}}>Innovation</button>
                        </div>
                        <div className={styles.container}>
                            <div ref={valuesCarouselRef}>
                                <div className={styles.tab}>
                                    <h3>Promoting Accessible Education for All.</h3>
                                    <p>Accessibility is fundamental to our mission of democratizing education and ensuring that learning opportunities are available to all, regardless of background or circumstance. We are committed to breaking down barriers to education and making our courses accessible to diverse learners, including those with disabilities, financial constraints, or geographical limitations. By prioritizing accessibility, we strive to create an inclusive learning environment where everyone has the opportunity to thrive.</p>
                                    <p>Our dedication to accessibility is reflected in our course design, instructional materials, and delivery methods. We adhere to universal design principles, ensuring that our content is perceivable, operable, and understandable for all learners. We provide alternative formats, captioning, and assistive technologies to accommodate different learning styles and needs. Additionally, we offer flexible scheduling, affordable pricing options, and scholarships to reduce financial barriers and increase access to education for underserved communities.</p>
                                </div>
                                <div className={styles.tab}>
                                    <h3>Building a Supportive Learning Community.</h3>
                                    <p>Community is the cornerstone of our educational philosophy. We believe that learning is not just an individual pursuit but a collaborative journey enriched by diverse perspectives, shared experiences, and mutual support. Our commitment to building a strong learning community fosters connections among learners, instructors, and mentors, creating a supportive environment where everyone feels valued, respected, and empowered to contribute.</p>
                                    <p>Through collaborative projects, group discussions, and peer-to-peer interactions, we encourage our learners to engage actively with one another, fostering a sense of belonging and camaraderie. Our community extends beyond the virtual classroom, encompassing alumni networks, industry partnerships, and local initiatives, providing opportunities for lifelong connections and continued growth. We not only enhance the educational experience but also cultivate relationships that endure far beyond the completion of our courses.</p>
                                </div>
                                <div className={styles.tab}>
                                    <h3>Empowering Learners to Succeed.</h3>
                                    <p>Our commitment to empowerment lies at the heart of everything we do. We believe that education has the power to transform lives, and we are dedicated to empowering learners to unlock their full potential. Through our courses, we provide more than just knowledge; we offer tools, guidance, and support to help individuals take control of their learning journey and achieve their goals.</p>
                                    <p>Empowerment, for us, means fostering a culture of independence, curiosity, and self-discovery. We empower learners to think critically, solve problems creatively, and embrace challenges with confidence. By equipping them with the skills and mindset needed to thrive in an ever-changing world, we empower our learners to not only succeed academically but also to become lifelong learners and leaders in their fields.</p>
                                </div>
                                <div className={styles.tab}>
                                    <h3>Pursuing Excellence in Education.</h3>
                                    <p>At our core, we are driven by a relentless pursuit of excellence in education. We believe that every learner deserves access to the highest quality of instruction, resources, and support to reach their fullest potential. Our commitment to excellence is reflected in every aspect of our courses, from meticulously curated content to expert-led instruction. We hold ourselves to the highest standards, constantly striving to innovate and improve to meet the evolving needs of our learners.</p>
                                    <p>Excellence is not just a goal for us; it's a standard that guides our every decision and action. We foster an environment where excellence is celebrated, where learners are inspired to push beyond their limits, and where educators are empowered to continuously refine their craft. By upholding excellence as our cornerstone value, we ensure that our courses not only meet but exceed the expectations of our learners, equipping them with the knowledge, skills, and confidence they need to succeed in today's dynamic world.</p>
                                </div>
                                <div className={styles.tab}>
                                    <h3>Driving Innovation in Education.</h3>
                                    <p>Innovation is at the forefront of our mission to revolutionize education. We believe in pushing the boundaries of traditional learning models and embracing new technologies, methodologies, and ideas to deliver transformative educational experiences. Our commitment to innovation drives us to continuously explore, experiment, and evolve, ensuring that our courses remain at the cutting edge of educational excellence.</p>
                                    <p>At the heart of our innovative approach is a dedication to adaptability and forward-thinking. We seek to anticipate the needs of learners in a rapidly changing world and tailor our courses to meet those needs effectively. Whether through interactive online platforms, immersive learning experiences, or groundbreaking pedagogical techniques, we strive to inspire innovation in both teaching and learning, empowering our learners to thrive in the digital age and beyond.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <section className={`${styles.section} ${styles.teachers} ${styles.background__svg}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Our Awesome Teachers</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>A diverse team of experts dedicated to shaping minds.<br/>From design gurus to marketing mavens, they inspire and empower learners every day.</p>

                    <div className={`${styles.content} ${styles.teachers} ${styles.carousel}`}>

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
            </section>

            <section className={`${styles.section} ${styles.clients} ${styles.background__transparent}`}>
                <div className={styles.container}>

                    <h2 className={styles.header}>Our Awesome Clients</h2>
                    <div className={styles.separator}></div>
                    <p className={styles.text}>Celebrating the heart of our success.<br/>Trusted collaborations and valued partnerships fuel our growth and innovation.</p>

                    <div className={`${styles.content} ${styles.clients} ${styles.carousel}`}>

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
            </section>
        </>
    )
}