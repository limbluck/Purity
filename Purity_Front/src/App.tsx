import styles from './App.module.scss'
import { useState } from 'react';
import { MyAuthContext } from './context/auth.context'
import Header from './components/elements/Header.element'
import Sidebar from './components/elements/Sidebar.element';
import Home from './components/pages/Home.page';

function App() {

  // Auth mock
    const [authContext, setAuthContext] = useState(false);

  // Sidebar controls
    const [showSidebar, setShowSidebar] = useState(false);
    function toggleSidebar() {
      showSidebar ?
        setShowSidebar(false) :
        setShowSidebar(true)
    }

  return (
    <>
      <MyAuthContext.Provider value={{auth: authContext, setAuth: setAuthContext}}>
        <div className={`${styles.header} ${showSidebar ? styles.sidebar_active: ''}`}> {/* (toggleChatbar)="toggleChatbar()" */}
          <Header toggleSidebar={toggleSidebar}/>
        </div> 

        <div className={`${styles.sidebar} ${showSidebar ? styles.sidebar_active: ''}`}>
          <div className={`${styles.container} ${showSidebar ? styles.sidebar_active: ''}`}>
            <Sidebar />
          </div> 
        </div> 

      {/*<div class="chatbar" [class.chatbar-active]="showChatbar">
          <app-chatbar class="container" [class.chatbar-active]="showChatbar"
          (chatbarToggle)="toggleChatbar()"
          ></app-chatbar>
      </div>
       */}

        <div className={styles.header_spaceholder}></div>

        <div className={`${styles.wrapper} ${showSidebar ? styles.sidebar_active: ''}`}>
            <Home />
            {/* <router-outlet></router-outlet> */}
            {/* <footer></footer> */}
        </div>

      </MyAuthContext.Provider>
    </>
  )
}

export default App
