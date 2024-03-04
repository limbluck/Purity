import styles from './App.module.scss'
import { useState } from 'react';
import { MyAuthContext } from './context/auth.context'
import Header from './components/elements/Header.element'
import Sidebar from './components/elements/Sidebar.element';
import Home from './components/pages/Home.page';
import Footer from './components/elements/Footer.element';
import Chatbar from './components/elements/Chatbar.element';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {

    // #region Auth mock

        const [authContext, setAuthContext] = useState(false);

    // #endregion

    // #region Sidebar controls

        const [showSidebar, setShowSidebar] = useState(false);
        function toggleSidebar() {
        showSidebar ?
            setShowSidebar(false) :
            setShowSidebar(true)
        }

    // #endregion

    // #region Chatbar controls

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

            <div className={`${styles.wrapper} ${showSidebar ? styles.sidebar_active: ''}`}>
                <Routes>
                    <Route path='/home' element={<Home />}/>
                    <Route path='*' element={<Navigate to="/home" />} />
                </Routes>
                <Footer />
            </div>

        </BrowserRouter>
        </MyAuthContext.Provider>
        </>
    )
    }
