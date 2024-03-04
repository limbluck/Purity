import styles from './CourseThumbnail.module.scss'

import defaultImageURL from '../../assets/course.jpg'
import APIService from '../../services/api.service';

export default function CourseThumbnail(props: {status: RequestStatus, course?: CourseThumbnail | undefined}) {

    // Course variable for simplicity
        const course = props.course;

    // Inject API service
        const api = new APIService()

    // Render recieved course thumbnail
        function SuccessCourseThumbnail() {
            return (
            <div className={styles.course}>

                <a className={styles.picture} style={{backgroundImage: `url(${course!.imageURL ? api.ASSETS + course!.imageURL : defaultImageURL})`}}></a>

                <span className={styles.price}>{course!.price ? `${course!.price} USD` : 'FREE'}</span>

                <div className={styles.text}>
                    <a className={styles.title}>{course!.title.substring(0, 33)}</a>
                    <p className={styles.about}>{course!.summary?.substring(0, 99)}</p>
                </div>

                <div className={styles.footer}>

                    <a className={`${styles.info} ${styles.category}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 64"><path d="M51.48,15.46A4.52,4.52,0,0,1,56,20V51a4.52,4.52,0,0,1-4.52,4.52h-47A4.52,4.52,0,0,1,0,51H0V13A4.52,4.52,0,0,1,4.52,8.52H16c3.82,0,4.23,1.14,6.74,4.45,2.07,2.74,7.11,2.49,10.39,2.49Z"/><path d="M51.48,18.12H9.24a4.52,4.52,0,0,0-4.52,4.52v2.84L9.19,19H51.54L56,25.49V22.64A4.52,4.52,0,0,0,51.48,18.12Z"/><path d="M4.57,55.48H51.48A4.52,4.52,0,0,0,56,51V23.48A4.52,4.52,0,0,0,51.48,19H9.25a4.52,4.52,0,0,0-4.52,4.52V51a4.65,4.65,0,0,1-.06.72,2.33,2.33,0,0,1-4.6,0A4.5,4.5,0,0,0,4.57,55.48Z"/></svg>
                        {course!.category}
                        <div className={styles.title}>Category</div>
                    </a>

                    <span className={`${styles.info} ${styles.enrolled}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M15.9,28c-1.4-2.1-2.1-4.5-2.1-7.2c0-4.6,1.9-8.4,4.9-10.7c-1-1.8-3-3.1-5.6-3.1c-4.4,0-6.9,3.6-6.9,7.7c0,2.2,0.7,4.1,2.2,5.4c0.8,0.8,1.5,1.8,1.5,2.8S9.5,24.9,7,26c-3.6,1.6-6.9,3.8-7,7.1C0.1,35.3,1.5,37,3.6,37h3.3c0.5,0,1-0.3,1.3-0.8c1.6-2.9,4.6-4.7,7.1-6C16.2,29.8,16.4,28.7,15.9,28z"/><path d="M45.1,26c-2.5-1.1-2.9-2-2.9-3.1s0.7-2.1,1.5-2.8c1.5-1.4,2.2-3.2,2.2-5.4c0-4.1-2.4-7.7-6.9-7.7c-2.6,0-4.6,1.3-5.7,3.1c3,2.3,4.9,6.1,4.9,10.7c0,2.7-0.7,5.1-2.1,7.2c-0.5,0.8-0.2,1.8,0.6,2.2c2.5,1.2,5.5,3.1,7.1,6c0.3,0.5,0.8,0.8,1.3,0.8h3.3c2.1,0,3.5-1.7,3.5-3.9C52,29.8,48.7,27.6,45.1,26z"/><path d="M32.7,33.3c-2.7-1.2-3.2-2.3-3.2-3.4c0-1.2,0.8-2.3,1.7-3.1c1.6-1.5,2.5-3.6,2.5-6c0-4.5-2.7-8.4-7.6-8.4s-7.6,3.9-7.6,8.4c0,2.4,0.9,4.5,2.5,6c0.9,0.9,1.7,2,1.7,3.1c0,1.2-0.4,2.2-3.2,3.4c-4,1.7-7.8,3.6-7.9,7.2c0,2.4,1.8,4.4,4.1,4.4h10.4h10.4c2.3,0,4.1-2,4.1-4.4C40.5,37,36.7,35.1,32.7,33.3z"/></g></svg>
                        {course!.enrolled}
                        <div className={styles.title}>Enrolled</div>
                    </span>
                    
                </div>
            </div>
        )}

    // Render while course thumbnail is loading
        function LoadingCourseThumbnail() {
            return (
            <div className={`${styles.course} ${styles.loading}`}>

                <a className={styles.picture} style={{backgroundImage: `url(${defaultImageURL})`}}></a>

                <div className={styles.text}>
                    <a className={styles.title}>Loading courses ...</a>
                </div>

            </div>
        )}

    // Render if error occured
        function ErrorCourseThumbnail() {return <></>}

    // Derermine render
    switch (props.status) {
        // Success
            case 200:
                return SuccessCourseThumbnail()
        // Loading
            case 100:
            case 300:
                return LoadingCourseThumbnail()
        // Error
            case 400:
            case 500:
            default:
                return ErrorCourseThumbnail()
    }
}
