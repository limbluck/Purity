import styles from './BlogThumbnail.module.scss'

import defaultImageURL from '../../assets/blog.png'

import APIService from '../../services/api.service';

export default function BlogThumbnail(props: {status: RequestStatus, blog?: BlogThumbnail | undefined}) {

    // Blog variable for simplicity
        const blog = props.blog;

    // Inject API service
        const api = new APIService()

    // Render recieved blog thumbnail
        function SuccessBlogThumbnail() {
            return (
                <div className={styles.blog} style={{backgroundImage: `url(${blog!.imageURL ? api.ASSETS + blog!.imageURL : defaultImageURL})`}}>
                    <a className={styles.title}>{blog!.title}</a>
                    <div className={styles.container}>
                        <div className={`${styles.info} ${styles.author}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
                            <span>{blog!.author}</span>
                            <div className={styles.title}>Author</div>
                        </div>
                        <div className={`${styles.info} ${styles.date}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
                            <span>{blog!.created.substring(0, 10)}</span>
                            <div className={styles.title}>Created</div>
                        </div>                        
                    </div>
                </div>
        )}

    // Render while blog thumbnail is loading
        function LoadingBlogThumbnail() {
            return (
                <div className={`${styles.blog} ${styles.loading}`} style={{backgroundImage: `url()`}}>
                    <a className={styles.title}>Loading blogs ...</a>
                    <div className={styles.container}>
                        <div className={`${styles.info} ${styles.author}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><path d="M50,43v2.2c0,2.6-2.2,4.8-4.8,4.8H6.8C4.2,50,2,47.8,2,45.2V43c0-5.8,6.8-9.4,13.2-12.2c0.2-0.1,0.4-0.2,0.6-0.3c0.5-0.2,1-0.2,1.5,0.1c2.6,1.7,5.5,2.6,8.6,2.6s6.1-1,8.6-2.6c0.5-0.3,1-0.3,1.5-0.1c0.2,0.1,0.4,0.2,0.6,0.3C43.2,33.6,50,37.1,50,43z M26,2c6.6,0,11.9,5.9,11.9,13.2S32.6,28.4,26,28.4s-11.9-5.9-11.9-13.2S19.4,2,26,2z"/></svg>
                            <span>...</span>
                            <div className={styles.title}>Author</div>
                        </div>
                        <div className={`${styles.info} ${styles.date}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
                            <span>...</span>
                            <div className={styles.title}>Created</div>
                        </div>                        
                    </div>
                </div>
        )}

    // Render if error occured
        function ErrorBlogThumbnail() {return <></>}

    // Derermine render
        switch (props.status) {
            // Success
                case 200:
                    return SuccessBlogThumbnail();
            // Loading
                case 100:
                case 300:
                    return LoadingBlogThumbnail();
            // Error
                case 400:
                case 500:
                default:
                    return ErrorBlogThumbnail();
        }
}