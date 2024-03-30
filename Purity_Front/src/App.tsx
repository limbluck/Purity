import styles from './App.module.scss'
import { useLayoutEffect, useRef, useState } from 'react';
import { MyAuthContext } from './context/auth.context'
import Header from './components/elements/Header/Header.element'
import Sidebar from './components/elements/Sidebar/Sidebar.element';
import Home from './components/pages/Home/Home.page';
import About from './components/pages/About/About.page';
import Footer from './components/elements/Footer/Footer.element';
import Chatbar from './components/elements/Chatbar/Chatbar.element';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

export default function App() {

    // #region Auth mock

        const [authContext, setAuthContext] = useState(false);

    // #endregion

    // #region Sidebar toggle controls

        const [showSidebar, setShowSidebar] = useState(false);
        function toggleSidebar() {
        showSidebar ?
            setShowSidebar(false) :
            setShowSidebar(true)
        }

    // #endregion

    // #region Chatbar toggle controls

        const [showChatbar, setShowChatbar] = useState(false);
        function toggleChatbar() {
        showChatbar ?
            setShowChatbar(false) :
            setShowChatbar(true)
        }

        function renderChatbar() {
        return (
            <div className={`${styles.chatbar} ${showChatbar ? styles.chatbar_active : undefined}`}>
                <div className={`${styles.container} ${showChatbar ? styles.chatbar_active : undefined}`}>
                <Chatbar toggleChatbar={toggleChatbar}/>
                </div>
            </div>
        )
        }

    // #endregion

    // #region Wrapper section

        // Scroll to top on route change
        const Wrapper = (props: { children: React.ReactElement[] }) => {
            const location = useLocation();
            const wrapperRef = useRef<HTMLDivElement>(null);

            useLayoutEffect(() => {
                wrapperRef.current?.scrollTo(0, 0);
            }, [location.pathname]);
    
            return (
                <div className={`${styles.wrapper} ${showSidebar ? styles.sidebar_active: ''}`} ref={wrapperRef}>
                    {props.children}
                </div>
            )
        }

    // #endregion

    return (
        <>
        <MyAuthContext.Provider value={{auth: authContext, setAuth: setAuthContext}}>
        <BrowserRouter>
        
            <div className={`${styles.header} ${showSidebar ? styles.sidebar_active: ''}`}>
                <Header toggleSidebar={toggleSidebar} toggleChatbar={toggleChatbar}/>
            </div>

            <div className={`${styles.sidebar} ${showSidebar ? styles.sidebar_active: ''}`}>
                <div className={`${styles.container} ${showSidebar ? styles.sidebar_active: ''}`}>
                    <Sidebar />
                </div> 
            </div>

            {authContext && renderChatbar()}

            <div className={styles.header_spaceholder}></div>

            <Wrapper>
                <Routes>
                    <Route path='/home' element={<Home />}/>
                    <Route path='/about' element={<About />}/>
                    <Route path='*' element={<Navigate to="/home" />} />
                </Routes>
                <Footer />
            </Wrapper>

        </BrowserRouter>
        </MyAuthContext.Provider>
        </>
    )
    }
