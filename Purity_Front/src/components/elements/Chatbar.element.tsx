import { useRef, useState } from 'react'
import styles from './Chatbar.module.scss'
import useDropdown from '../../hooks/useDropdown.hook';

import profilePicture from '../../assets/profile-pic.jpg'
import chatUserPicture from '../../assets/chat-user.jpg'

type Props = {
    toggleChatbar(): void
}

enum ChatbarModes {
    default = 'Default',
    contacts = 'Contacts',
    settings = 'Settings',
    conversation = 'Conversation',
    search = 'Search'
};

enum GroupTabs {
    none = 'None',
    starred = 'Starred',
    group = 'Group',
    private = 'Private'
}

enum ContactsModes {
    contacts = 'Contacts',
    requests = 'Requests'
}

export default function Chatbar(props: Props) {

    // #region Mode controls

        const [chatbarMode, setChatbarMode] = useState<ChatbarModes>(ChatbarModes.default);

    // #endregion

    // #region Buttons section
    
        function handleButtonsCloseClick() {
    
            props.toggleChatbar();
    
            // Reset chatbar mode and group tabs
            setTimeout(() => {
                setChatbarMode(ChatbarModes.default);
                setCurrentGroupTab(GroupTabs.none);
            }, 250);
        }
    
        function handleButtonsContactsClick() {
            setChatbarMode(ChatbarModes.contacts)
        }
    
        function handleButtonsSettingsClick() {
            setChatbarMode(ChatbarModes.settings)
        }
    
    // #endregion

    // #region Header section

        // Shared

            function handleHeaderBackClick() {
                setChatbarMode(ChatbarModes.default);
            }

            function handleHeaderSearchClick() {
                setChatbarMode(ChatbarModes.search)
            }

        // Contacts mode

            const [contactsMode, setContactsMode] = useState<ContactsModes>(ContactsModes.contacts)

        // Conversation mode

            const conversationMenuRef = useRef(null);
            const [showConversationMenuDropdown, toggleConversationMenuDropdown] = useDropdown(conversationMenuRef)
            function handleConversationMenuClick() {
                toggleConversationMenuDropdown();
            }
            function handleConversationMenuDropdownClick(event: React.MouseEvent<HTMLDivElement>) {
                event.stopPropagation();
            }

            function renderConversationMenuDropdown() {
                return (
                    <div className={styles.dropdown}
                        onClick={handleConversationMenuDropdownClick}>

                        <a className={`${conversationStarred ? styles.hidden : undefined}`} tabIndex={0}
                            onClick={handleStarClick}
                            >Star</a>
                        <a className={`${conversationStarred ? undefined : styles.hidden}`} tabIndex={0}
                            onClick={handleUnstarClick}
                            >Unstar</a>
                        <a className={`${conversationMuted ? styles.hidden : undefined}`} tabIndex={0}
                            onClick={handleMuteClick}
                            >Mute</a>
                        <a className={`${conversationMuted ? undefined : styles.hidden}`} tabIndex={0}
                            onClick={handleUnmuteClick}
                            >Unmute</a>
                        <a className={`${conversationBlocked ? styles.hidden : undefined}`} tabIndex={0}
                            onClick={handleBlockClick}
                            >Block</a>
                        <a className={`${conversationBlocked ? undefined : styles.hidden}`} tabIndex={0}
                            onClick={handleUnblockClick}
                            >Unblock</a>
                        <a tabIndex={0}>Delete</a>
                    </div>
                )
            }

            function handleStarClick() {setConversationStarred(true)}
            function handleUnstarClick() {setConversationStarred(false)}
            function handleMuteClick() {setConversationMuted(true)}
            function handleUnmuteClick() {setConversationMuted(false)}
            function handleBlockClick() {setConversationBlocked(true)}
            function handleUnblockClick() {setConversationBlocked(false)}

    // #endregion

    // #region Main section

        // Contacts mode

            function handleContactsClick() {setContactsMode(ContactsModes.contacts)}
            function handleRequestsClick() {setContactsMode(ContactsModes.requests)}

        // Default mode

            const [currentGroupTab, setCurrentGroupTab] = useState<GroupTabs>(GroupTabs.none);

            function handleGroupStarredClick() {setCurrentGroupTab(GroupTabs.starred)}
            function handleGroupPrivateClick() {setCurrentGroupTab(GroupTabs.private)}
            function handleGroupGroupClick() {setCurrentGroupTab(GroupTabs.group)}

            function handleConversationClick() {setChatbarMode(ChatbarModes.conversation)}

        // Conversation mode

            const [conversationStarred, setConversationStarred] = useState<boolean>(false);
            const [conversationMuted, setConversationMuted] = useState<boolean>(false);
            const [conversationBlocked, setConversationBlocked] = useState<boolean>(false);

    // #endregion

    return (
        <>

            <div className={`${styles.section} ${styles.buttons}`}>
                <button className={styles.close}
                    onClick={handleButtonsCloseClick}>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
                    </svg>
                </button>

                <button className={styles.contacts}
                    onClick={handleButtonsContactsClick}>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                    </svg>
                    <span>Contacts</span>
                </button>

                <button className={styles.settings}
                    onClick={handleButtonsSettingsClick}>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M24 14v-4c-1.619 0-2.906.267-3.705-1.476-.697-1.663.604-2.596 1.604-3.596l-2.829-2.828c-1.033 1.033-1.908 2.307-3.666 1.575-1.674-.686-1.404-2.334-1.404-3.675h-4c0 1.312.278 2.985-1.404 3.675-1.761.733-2.646-.553-3.667-1.574l-2.829 2.828c1.033 1.033 2.308 1.909 1.575 3.667-.348.849-1.176 1.404-2.094 1.404h-1.581v4c1.471 0 2.973-.281 3.704 1.475.698 1.661-.604 2.596-1.604 3.596l2.829 2.829c1-1 1.943-2.282 3.667-1.575 1.673.687 1.404 2.332 1.404 3.675h4c0-1.244-.276-2.967 1.475-3.704 1.645-.692 2.586.595 3.596 1.604l2.828-2.829c-1-1-2.301-1.933-1.604-3.595l.03-.072c.687-1.673 2.332-1.404 3.675-1.404zm-12 2c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                    </svg>
                </button>
            </div>

            <div className={`${styles.section} ${styles.header}`}>

                <div className={`${styles.contacts} ${chatbarMode === ChatbarModes.contacts && styles.active}`}
                >
                    <button className={styles.close}
                        onClick={handleHeaderBackClick}>

                        <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
                            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                        </svg>
                    </button>
                    <span>{contactsMode}</span> 
                    <button className={styles.search}
                        onClick={handleHeaderSearchClick}>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/>
                        </svg>
                    </button>
                </div>

                <div className={`${styles.settings} ${chatbarMode === ChatbarModes.settings && styles.active}`}>
                    <button className={styles.close}
                        onClick={handleHeaderBackClick}>

                        <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
                            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                        </svg>
                    </button>
                    <span>Settings</span>
                </div>

                <div className={`${styles.conversation} ${chatbarMode === ChatbarModes.conversation && styles.active}`}>
                    <button className={styles.close}
                        onClick={handleHeaderBackClick}>

                        <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
                            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                        </svg>
                    </button>

                    <img className={styles.user_image} src={chatUserPicture} draggable="false" />
                    
                    <div className={styles.user_info}>
                        <div className={styles.name}>John Smith</div>
                        <div className={styles.status}>
                            <span className={styles.icons}>
                                <svg className={`${conversationStarred && styles.active}`}
                                    clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z" fill-rule="nonzero"/></svg>
                                <svg className={`${conversationMuted && styles.active}`}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 17.251v1.749h-13.065l9.444-8.566c.565 2.995 1.013 5.966 3.621 6.817zm-9.971 6.749c1.578 0 2.971-1.402 2.971-3h-6c0 1.598 1.449 3 3.029 3zm10.971-19.802l-20.654 18.735-1.346-1.48 2.705-2.453h-1.705v-1.749c4.877-1.591 2.195-10.594 6.863-13.306.645-.374 1.041-1.069 1.04-1.82v-.003c0-1.172.939-2.122 2.097-2.122s2.097.95 2.097 2.122v.003c-.001.75.396 1.447 1.04 1.82 1.064.618 1.743 1.565 2.22 2.674l4.302-3.901 1.341 1.48zm-12-2.198c0 .552.448 1 1 1s1-.448 1-1c0-.551-.448-1-1-1s-1 .449-1 1z"/></svg>
                                <svg className={`${conversationBlocked && styles.active}`}
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-14v-4h14v4z"/></svg>
                            </span>
                            <span>Offline</span>
                        </div>
                    </div>

                    <button className={styles.menu}
                        ref={conversationMenuRef}
                        onClick={handleConversationMenuClick}>

                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z"/></svg>

                        {showConversationMenuDropdown && renderConversationMenuDropdown()}
                    </button>

                </div>

                <div className={`${styles.default} ${(chatbarMode === ChatbarModes.default || chatbarMode === ChatbarModes.search) && styles.active}`}>

                    <button className={`${styles.close} ${chatbarMode === ChatbarModes.search && styles.active}`}
                        onClick={handleHeaderBackClick}>

                        <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
                            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
                        </svg>
                    </button>

                    <input className={`${chatbarMode === ChatbarModes.search && styles.active}`} type="text" placeholder="Search"
                        onClick={handleHeaderSearchClick}/>

                    <button className={`${styles.search} ${chatbarMode === ChatbarModes.search && styles.active}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M23.822 20.88l-6.353-6.354c.93-1.465 1.467-3.2 1.467-5.059.001-5.219-4.247-9.467-9.468-9.467s-9.468 4.248-9.468 9.468c0 5.221 4.247 9.469 9.468 9.469 1.768 0 3.421-.487 4.839-1.333l6.396 6.396 3.119-3.12zm-20.294-11.412c0-3.273 2.665-5.938 5.939-5.938 3.275 0 5.94 2.664 5.94 5.938 0 3.275-2.665 5.939-5.94 5.939-3.274 0-5.939-2.664-5.939-5.939z"/>
                        </svg>
                    </button>

                </div>

            </div>

            <div className={`${styles.section} ${styles.main}`}>

                <div className={`${styles.contacts} ${chatbarMode === ChatbarModes.contacts && styles.active}`}>
                    <div className={styles.categories}>
                        <button className={`${contactsMode === ContactsModes.contacts && styles.contacts}`}
                            onClick={handleContactsClick}
                        >Contacts</button>
                        <button className={`${contactsMode === ContactsModes.requests && styles.contacts}`}
                            onClick={handleRequestsClick}
                        >Requests</button>
                    </div>
                    <div className={styles.contacts_list}>
                        <button>
                            <img src={chatUserPicture} />
                            <span>John Smith</span>
                        </button>
                    </div>
                </div>

                <div className={`${styles.settings} ${chatbarMode === ChatbarModes.settings && styles.active}`}>
                    <span className={styles.category}>Privacy</span>
                    <span className={styles.description}>You can restrict who can message you</span>
                    <div className={styles.option}>
                        <div><input type="radio" name="privacy" id="privacy1" checked /><label htmlFor="privacy1">My contacts only</label></div>
                        <div><input type="radio" name="privacy" id="privacy2" /><label htmlFor="privacy2">My contacts and anyone in my courses</label></div>
                    </div>

                    <span className={styles.category}>Notifications</span>
                    <div className={styles.option}>
                        <div><input type="checkbox" id="email" /><label htmlFor="email">Email</label></div>
                    </div>
                    
                    <span className={styles.category}>General</span>
                    <div className={styles.option}>
                        <div><input type="checkbox" id="enter" /><label htmlFor="enter">Use enter to send</label></div>
                    </div>
                </div>

                <div className={`${styles.search} ${chatbarMode === ChatbarModes.search && styles.active}`}>
                    Search people and messages
                </div>

                <div className={`${styles.conversation} ${chatbarMode === ChatbarModes.conversation && styles.active}`}>

                    <div className={styles.request}>Contact request sent</div>

                    <div className={styles.messages}>

                        <div className={`${styles.message} ${styles.from_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={profilePicture} draggable="false" />
                                <span className={styles.sender_name}>Peter Evans</span>
                                <span className={styles.timestamp}>12:10</span>
                            </div>
                            <div className={styles.content}>
                                Hello!
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>

                        <div className={styles.date}>22 February 2024</div>

                        <div className={`${styles.message} ${styles.to_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={chatUserPicture} draggable="false" />
                                <span className={styles.sender_name}>John Smith</span>
                                <span className={styles.timestamp}>18:49</span>
                            </div>
                            <div className={styles.content}>
                                You're welcome! 🙌 So glad you enjoyed it. If you need more recommendations, feel free to ask. Happy learning!
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>

                        <div className={`${styles.message} ${styles.from_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={profilePicture} draggable="false" />
                                <span className={styles.sender_name}>Peter Evans</span>
                                <span className={styles.timestamp}>15:16</span>
                            </div>
                            <div className={styles.content}>
                                Hey! Just finished that "Python for Data Science" course. It was fantastic! Thank you! 🐍📊
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>

                        <div className={styles.date}>21 February 2024</div>

                        <div className={`${styles.message} ${styles.to_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={chatUserPicture} draggable="false" />
                                <span className={styles.sender_name}>John Smith</span>
                                <span className={styles.timestamp}>10:21</span>
                            </div>
                            <div className={styles.content}>
                                Not really, but make sure you have a good grasp of basic math and statistics. That'll make things smoother. Feel free to ask questions in the forums if you get stuck!
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>

                        <div className={`${styles.message} ${styles.from_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={profilePicture} draggable="false" />
                                <span className={styles.sender_name}>Peter Evans</span>
                                <span className={styles.timestamp}>10:18</span>
                            </div>
                            <div className={styles.content}>
                                Great! I'll check that out. Did you find any challenges while taking the course?
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>
                        
                        <div className={`${styles.message} ${styles.to_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={chatUserPicture} draggable="false" />
                                <span className={styles.sender_name}>John Smith</span>
                                <span className={styles.timestamp}>10:13</span>
                            </div>
                            <div className={styles.content}>
                                Sure thing! I found the course on Coursera by Andrew Ng to be excellent. The way he explains concepts is really clear. Plus, the assignments are hands-on.
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>

                        <div className={`${styles.message} ${styles.from_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={profilePicture} draggable="false" />
                                <span className={styles.sender_name}>Peter Evans</span>
                                <span className={styles.timestamp}>10:07</span>
                            </div>
                            <div className={styles.content}>
                                Thanks, John! 😊 Any specific platform or instructor you recommend for that course?
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>

                        <div className={`${styles.message} ${styles.to_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={chatUserPicture} draggable="false" />
                                <span className={styles.sender_name}>John Smith</span>
                                <span className={styles.timestamp}>10:05</span>
                            </div>
                            <div className={styles.content}>
                                Hey Peter! Welcome aboard! 🚀 For data science, I'd suggest starting with the "Introduction to Data Science" course. It covers the basics and sets a solid foundation.
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>

                        <div className={`${styles.message} ${styles.from_user}`}>
                            <div className={styles.info}>
                                <img className={styles.sender_photo} src={profilePicture} draggable="false" />
                                <span className={styles.sender_name}>Peter Evans</span>
                                <span className={styles.timestamp}>10:00</span>
                            </div>
                            <div className={styles.content}>
                                Hi! 👋 Just joined this platform to explore some online courses. Any recommendations for a beginner in data science?
                            </div>
                            <div className={styles.sender_pointer}></div>
                        </div>
                        <div className={styles.date}>10 February 2024</div>
                    </div>

                    <div className={styles.input}>
                        <textarea placeholder="Write a message..."></textarea>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z"/></svg>
                        </button>
                    </div>

                </div>

                <div className={`${styles.default} ${chatbarMode === ChatbarModes.default && styles.active}`}>

                    <div className={`${styles.group} ${styles.starred} ${currentGroupTab === GroupTabs.starred && styles.unfold}`}
                            onClick={handleGroupStarredClick}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
                        </svg>
                        <span className={styles.name}>STARRED</span>
                        <span className={styles.quantity}>(1)</span>
                    </div>
                    <div className={`${styles.conversations} ${currentGroupTab === GroupTabs.starred && styles.unfold}`}>
                        <div className={styles.conversation}
                            onClick={handleConversationClick}>

                            <img src={chatUserPicture} draggable="false" />
                            <div className={styles.info}>
                                <div className={styles.upper_container}>
                                    <span className={styles.name}>John Smith</span>
                                    <span className={styles.timestamp}>11/11/23</span>
                                </div>
                                <span className={styles.sender}>You:</span>
                                <span className={styles.message}>Hello!</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.group} ${styles.group_chats} ${currentGroupTab === GroupTabs.group && styles.unfold}`}
                        onClick={handleGroupGroupClick}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
                        </svg>
                        <span className={styles.name}>GROUP</span>
                        <span className={styles.quantity}>(0)</span>
                    </div>
                    <div className={`${styles.conversations} ${styles.empty} ${currentGroupTab === GroupTabs.group && styles.unfold}`}>
                        <div>No group conversations</div>
                    </div>

                    <div className={`${styles.group} ${styles.private} ${currentGroupTab === GroupTabs.private && styles.unfold}`}
                        onClick={handleGroupPrivateClick}>
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z"/>
                        </svg>
                        <span className={styles.name}>PRIVATE</span>
                        <span className={styles.quantity}>(0)</span>
                    </div>
                    <div className={`${styles.conversations} ${styles.empty} ${currentGroupTab === GroupTabs.private && styles.unfold}`}>
                        No prviate conversations
                    </div>

                    <div className={styles.see_all}>
                        <a>See all</a>
                    </div>

                </div>

            </div>

        </>
    )
}