import styles from './Header.module.scss'
import profilePhotoPlaceholderURL from '../../assets/profile-pic.jpg'

import { useAuthContext } from '../../context/auth.context'
import { useRef } from 'react'
import useDropdown from '../../hooks/useDropdown.hook'

export default function Header(props: {toggleSidebar(): void}) {

    const MyAuthContext = useAuthContext()

    // Language dropdown

        const languageRef = useRef<HTMLDivElement>(null);
        const [showLanguageDropdown, toggleLanguageDropdown] = useDropdown(languageRef);

    // Search dropdown

        const searchRef = useRef<HTMLDivElement>(null);
        const [showSearchDropdown, toggleSearchDropdown] = useDropdown(searchRef);

    // Notifications dropdown

        const notificationsRef = useRef<HTMLDivElement>(null);
        const [showNotificationsDropdown, toggleNotificationsDropdown] = useDropdown(notificationsRef);

    //Profile dropdown

        const profileRef = useRef<HTMLDivElement>(null);
        const [showProfileDropdown, toggleProfileDropdown] = useDropdown(profileRef);

        function handleLogOutClick() {
            MyAuthContext.setAuth(false);
            toggleProfileDropdown();
        }

    return (
        <header className={styles.header}>

            <button className={styles.sidebar} onClick={props.toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M46.5,14h-41C4.7,14,4,13.3,4,12.5v-3C4,8.7,4.7,8,5.5,8h41C47.3,8,48,8.7,48,9.5v3C48,13.3,47.3,14,46.5,14z"/><path d="M46.5,28.9h-41c-0.8,0-1.5-0.7-1.5-1.5v-3C4,23.7,4.7,23,5.5,23h41c0.8,0,1.5,0.7,1.5,1.5v3C48,28.2,47.3,28.9,46.5,28.9z"/><path d="M46.5,44h-41C4.7,44,4,43.3,4,42.5v-3C4,38.7,4.7,38,5.5,38h41c0.8,0,1.5,0.7,1.5,1.5v3C48,43.3,47.3,44,46.5,44z"/></svg>
            </button>

            <nav className={styles.navigation}>
                <a tabIndex={0} draggable="false">Home</a> {/* routerLink="/home" */}
                <a tabIndex={0} draggable="false">Courses</a>
                <a tabIndex={0} draggable="false">Blogs</a>
                <a tabIndex={0} draggable="false">About</a>
            </nav>

            <div className={`${styles.language} ${showLanguageDropdown ? styles.active : ''}`}
                ref={languageRef}
                onClick={toggleLanguageDropdown}
            >
                <span className={styles.full}>English</span>
                <span className={styles.short}>En</span>

                {showLanguageDropdown && (
                    <div className={styles.dropdown}
                        onClick={(e) => {e.stopPropagation()}}
                    >
                        <button tabIndex={0}>English</button>
                        <button tabIndex={0}>Русский</button>
                    </div>
                )}
            </div>

            <div className={`${styles.separator} ${MyAuthContext.auth ? styles.active : ''}`} />

            <div className={`${styles.search} ${showSearchDropdown ? styles.active : ''}`}
                ref={searchRef}
                onClick={toggleSearchDropdown}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg>

                {showSearchDropdown && (
                    <div className={`${styles.dropdown} ${MyAuthContext.auth ? styles.authorized : ''}`}
                        onClick={(e) => {e.stopPropagation()}}
                    >
                        <input className={styles.searchbar} type="text" placeholder="Search" />
                    </div>
                )}
            </div>

            {MyAuthContext.auth && (<>
                <div className={`${styles.notifications} ${showNotificationsDropdown ? styles.active : ''}`}
                    ref={notificationsRef}
                    onClick={toggleNotificationsDropdown}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z"/></svg>

                    {showNotificationsDropdown && (
                        <div className={styles.dropdown}
                            onClick={(e) => {e.stopPropagation()}}
                        >
                            <div className={styles.header}>
                                <span className={styles.header}>Notifications</span>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M19.1,42.5L2.6,25.9c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0L19.4,34c0.4,0.4,1.1,0.4,1.5,0L45.2,9.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L21.3,42.5C20.7,43.2,19.7,43.2,19.1,42.5z"/></g></svg>
                                </button>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M26.1,19.1c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S30,19.1,26.1,19.1z"/><path d="M47.1,32.4l-3.7-3.1c0.2-1.1,0.3-2.3,0.3-3.4c0-1.1-0.1-2.3-0.3-3.4l3.7-3.1c1.2-1,1.6-2.8,0.8-4.2l-1.6-2.8c-0.6-1-1.7-1.6-2.9-1.6c-0.4,0-0.8,0.1-1.1,0.2l-4.6,1.7c-1.8-1.6-3.8-2.7-5.9-3.4L31,4.6c-0.3-1.6-1.7-2.5-3.3-2.5h-3.2c-1.6,0-3,0.9-3.3,2.5l-0.8,4.6c-2.2,0.7-4.2,1.9-6,3.4l-4.6-1.7c-0.4-0.1-0.7-0.2-1.1-0.2c-1.2,0-2.3,0.6-2.9,1.6l-1.6,2.8c-0.8,1.4-0.5,3.2,0.8,4.2l3.7,3.1c-0.2,1.1-0.3,2.3-0.3,3.4c0,1.2,0.1,2.3,0.3,3.4L5,32.3c-1.2,1-1.6,2.8-0.8,4.2l1.6,2.8c0.6,1,1.7,1.6,2.9,1.6c0.4,0,0.8-0.1,1.1-0.2l4.6-1.7c1.8,1.6,3.8,2.7,5.9,3.4l0.8,4.8c0.3,1.6,1.6,2.7,3.3,2.7h3.2c1.6,0,3-1.2,3.3-2.8l0.8-4.8c2.3-0.8,4.4-2,6.2-3.7l4.3,1.7c0.4,0.1,0.8,0.2,1.2,0.2c1.2,0,2.3-0.6,2.9-1.6l1.5-2.6C48.7,35.2,48.3,33.4,47.1,32.4z M26.1,37.1c-6.1,0-11-4.9-11-11s4.9-11,11-11s11,4.9,11,11S32.2,37.1,26.1,37.1z"/></g></svg>
                                </button>
                            </div>
                            <div className={styles.main}>
                                <div className={styles.notification}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M24.12,2.69A16.11,16.11,0,0,0,9.69,17a15.9,15.9,0,0,0,5.85,13.65,4.92,4.92,0,0,1,1.87,3.82v.08a4,4,0,0,0,4.05,4h9a4,4,0,0,0,4.05-4v-.08a4.92,4.92,0,0,1,1.87-3.82,15.88,15.88,0,0,0,5.93-12.24C42.36,9.09,34,1.68,24.12,2.69ZM33,43.16H19a1.56,1.56,0,0,0-1.56,1.56,4.69,4.69,0,0,0,4.68,4.68h7.8a4.69,4.69,0,0,0,4.68-4.68A1.56,1.56,0,0,0,33,43.16Z"/></svg>
                                    <div className={styles.container}>
                                        <span className={styles.header}>You just earned a badge!</span>
                                        <span className={styles.timestamp}>2 years 320 days ago</span>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.see_all}>See all</button>
                        </div>
                    )}
                </div>
                
                <div className={styles.chat}> {/* (click)="toggleChatbar.emit()" */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-9.986 7.748-.62 0-1.092-.046-1.759-.097-1 .776-1.774 1.403-3.485 1.962.26-1.383-.113-2.259-.514-3.259-2.383-1.505-4.256-3.411-4.256-6.354 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.363-12 9.747 0 3.13 1.816 5.916 4.641 7.699.867 2.167-1.084 4.008-3.143 4.502 3.085.266 6.776-.481 9.374-2.497 7.08.54 13.128-3.988 13.128-9.704 0-5.384-5.373-9.747-12-9.747z"/></svg>
                </div>
            </>)}

            <div className={`${styles.separator} ${MyAuthContext.auth ? styles.active : ''}`} />

            {MyAuthContext.auth ? (
                <div className={`${styles.profile} ${showProfileDropdown ? styles.active : ''}`}
                    ref={profileRef}
                    onClick={toggleProfileDropdown}
                >
                    <img className={styles.photo} src={profilePhotoPlaceholderURL} />
                    <span className={`${styles.name} ${showProfileDropdown ? styles.active : ''}`}>Peter Evans</span> 

                    {showProfileDropdown && (
                        <div className={styles.dropdown}
                            onClick={(e) => {e.stopPropagation()}}
                        >
                            <a tabIndex={0}>Profile</a>
                            <div className={styles.separator}></div>
                            <a tabIndex={0}>Grades</a>
                            <a tabIndex={0}>Calendar</a>
                            <a tabIndex={0}>Files</a>
                            <div className={styles.separator}></div>
                            <a tabIndex={0} onClick={handleLogOutClick}>Log out</a>
                        </div>
                    )}
                </div>
            ) : (
                <button className={styles.log_in}
                    onClick={() => MyAuthContext.setAuth(true)}
                >
                    Log in
                </button>
            )}

        </header>
    )

}