import styles from './Sidebar.module.scss'
import logoURL from '../../assets/logo.png'
import { useAuthContext } from '../../context/auth.context'
import { Link, NavLink } from 'react-router-dom'

export default function Sidebar() {

    const MyAuthContext = useAuthContext()

    function routerNavLinkHome(props: {isActive: boolean}) {return props.isActive ? styles.active : ''}

    function renderLinks() {
        return (<>
            <nav className={styles.main}>
                <NavLink className={routerNavLinkHome} to='/home' draggable="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M49,27h-5v22c0,0.6-0.4,1-1,1H33c-0.6,0-1-0.4-1-1V32H20v17c0,0.6-0.4,1-1,1H9c-0.6,0-1-0.4-1-1V27H3c-0.4,0-0.8-0.2-0.9-0.6C1.9,26,2,25.6,2.3,25.3l23-23c0.4-0.4,1.1-0.4,1.4,0l23,23c0.3,0.3,0.3,0.7,0.2,1.1S49.4,27,49,27z"/></g></svg>
                    Home
                </NavLink>
                <a draggable="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M11.5,17h-8C2.7,17,2,17.7,2,18.5V44c0,2.2,1.8,4,4,4h5.5c0.8,0,1.5-0.7,1.5-1.5v-28C13,17.7,12.3,17,11.5,17z"/><path d="M48.5,17h-30c-0.8,0-1.5,0.7-1.5,1.5v28c0,0.8,0.7,1.5,1.5,1.5H46c2.2,0,4-1.8,4-4V18.5C50,17.7,49.3,17,48.5,17z"/><path d="M46,4H6C3.8,4,2,5.8,2,8v3.5C2,12.3,2.7,13,3.5,13h45c0.8,0,1.5-0.7,1.5-1.5V8C50,5.8,48.2,4,46,4z"/></g></svg>
                    Dashboard
                </a>
                <a draggable="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><path d="M46.5,20h-41C4.7,20,4,20.7,4,21.5V46c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V21.5C48,20.7,47.3,20,46.5,20zM19,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M19,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M29,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M29,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z M39,42c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V42z M39,32c0,0.6-0.4,1-1,1h-4c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1V32z"/><path d="M44,7h-4h-1V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2H19V5c0-1.6-1.3-3-3-3l0,0c-1.6,0-3,1.3-3,3v2h-1H8c-2.2,0-4,1.8-4,4v2.5C4,14.3,4.7,15,5.5,15h41c0.8,0,1.5-0.7,1.5-1.5V11C48,8.8,46.2,7,44,7z"/></g></svg>
                    Calendar
                </a>
                <a draggable="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><g><g><path d="M44.4,19H33.2c-2.6,0-4.2-1.6-4.2-4.2V3.6C29,2.7,28.3,2,27.4,2H10.8C8.2,2,6,4.2,6,6.8v38.4c0,2.6,2.2,4.8,4.8,4.8h30.4c2.6,0,4.8-2.2,4.8-4.8V20.6C46,19.7,45.3,19,44.4,19z"/></g><g><path d="M45.7,12.9L35.1,2.3C34.9,2.1,34.5,2,34.2,2l0,0C33.6,2,33,2.5,33,3.1v8.5c0,1.8,1.6,3.4,3.4,3.4h8.5c0.6,0,1.1-0.6,1.1-1.2l0,0C46,13.5,45.9,13.1,45.7,12.9z"/></g></g></svg>
                    My files
                </a>
                <a draggable="false">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><path d="M21.18,36.34c.91,0,1.66-1.07,1.66-2.4s-.74-2.4-1.66-2.4-1.66,1.07-1.66,2.4,.74,2.4,1.66,2.4Z" /><path d="M31.34,36.34c.91,0,1.66-1.07,1.66-2.4s-.74-2.4-1.66-2.4-1.66,1.07-1.66,2.4,.74,2.4,1.66,2.4Z" /><path d="M34.2,41.16c-.8-.7-2.76-2.18-5.42-2.82-.43,.66-1.31,1.11-2.33,1.11s-1.96-.48-2.37-1.17c-1.63,.35-3.37,1.13-5.17,2.53-.45,.35-.75,.9-.74,1.49,0,3.91,4.05,.75,8.09,.81,4.14,.07,8.48,2.79,8.48-.75,.03-.47-.19-.91-.53-1.21h-.01Z" /><path d="M19.71,44.6c-.47,0-.87-.1-1.2-.35-.47-.37-.7-1-.7-1.95,0-.67,.32-1.33,.88-1.76,1.71-1.33,3.49-2.2,5.31-2.6,.14-.03,.29,.03,.37,.16,.37,.61,1.19,1.01,2.08,1.01s1.67-.37,2.05-.96c.08-.12,.23-.18,.37-.14,2.77,.67,4.81,2.25,5.56,2.9,.44,.38,.68,.93,.65,1.49,0,.8-.21,1.38-.66,1.73-.87,.7-2.43,.35-4.23-.05-1.22-.28-2.6-.59-3.94-.61-1.37-.02-2.75,.34-3.98,.66-.99,.26-1.85,.48-2.56,.48h0Zm4.21-5.95c-1.64,.39-3.26,1.21-4.81,2.42-.38,.3-.61,.76-.61,1.22,0,.72,.14,1.19,.43,1.41,.55,.43,1.76,.11,3.16-.25,1.27-.33,2.69-.71,4.16-.68,1.4,.02,2.82,.34,4.07,.62,1.63,.37,3.03,.68,3.65,.19,.27-.22,.4-.62,.4-1.22,.02-.36-.14-.71-.41-.95-.69-.6-2.54-2.03-5.05-2.69-.54,.66-1.47,1.07-2.47,1.07s-1.99-.43-2.52-1.13h0Z" /><path d="M14.51,42.4c-3.34,1.95-6.4,.29-7.56-.56,1.95-1.34,2.62-1.81,2.71-2.82-2.65,.1-4.59-.13-7.15-4.47,2.66-.79,2.07-1.38,6.43-2.79-.12-.76-3.52-.26-4.72-1.48,1.04-.76,2.16-4.01,3.34-4.54-1.43,.02-2.86,.03-4.29,.05,.83-2.86,3.38-5.38,5.91-6.95-.39-.51-1.49-.97-2.01-1.35,1.82-1.73,6.27-2.95,8.13-1.54-.29-4.55,3.49-5.78,3.46-9.06,1.94,.59,4.78,3.17,5.21,5.15,1.26-1.57,5.28-3.14,7.75-3.76,.91,.44,1.5,1.37,1.76,2.34s.24,3.27,.23,4.28c6.55-2.66,10.33,.65,11.65,2.39-.37,.68-1.56,1.75-2.21,2.21,2.48,1.38,3.93,2.87,4.61,5.36-1.6,.47-2.61,.64-4.23,1.27,.75,.95,2.44,1.4,3.64,1.89-.76,2.5-2.33,1.91-3.5,2.14,1.71,3.3,4,3.43,5.83,3.77-1.09,3.13-4.12,5.73-7.46,5.66,.2,.59,1,1.72,1.61,1.8-1.84,1.98-3.4,1.84-5.68,1.37,3.73-6.97,.72-14.37-.67-16.29-.22,.79-.57,1.53-1.75,1.66-1.78-2.92-6.67-5.44-10-6.18-.28,1.7,.22,3.51,1.34,4.82-1.78-.02-5.8-1.41-7.13-2.6-4.83,3.68-9.22,8-5.25,18.21h0v.02Z" /><path d="M11.25,43.82c-2.22,0-3.96-1.11-4.6-1.58-.13-.1-.21-.25-.21-.42,0-.16,.08-.32,.22-.41,1.38-.95,2.03-1.41,2.31-1.88-2.43,0-4.46-.58-6.9-4.73-.08-.13-.09-.3-.03-.44,.06-.15,.18-.26,.33-.3,1.14-.34,1.63-.63,2.26-.99,.6-.35,1.32-.77,2.79-1.32-.08,0-.15-.02-.22-.03-1.14-.13-2.56-.3-3.33-1.09-.1-.11-.16-.25-.14-.4,.01-.15,.09-.28,.2-.37,.38-.28,.86-1.12,1.32-1.93,.35-.61,.68-1.2,1.04-1.68l-3.01,.04c-.15,0-.31-.07-.41-.2-.1-.13-.13-.29-.08-.45,.72-2.46,2.78-4.99,5.56-6.87-.22-.15-.48-.29-.71-.42-.28-.16-.55-.31-.76-.46-.12-.09-.2-.23-.21-.38,0-.15,.05-.3,.16-.4,1.65-1.57,5.6-2.88,7.96-2.01,.1-2.17,1.11-3.58,2.01-4.84,.79-1.11,1.47-2.06,1.46-3.37,0-.16,.07-.31,.2-.41,.13-.1,.3-.12,.45-.08,1.84,.57,4.36,2.7,5.28,4.71,1.77-1.5,5.33-2.8,7.41-3.32,.11-.03,.24-.02,.34,.03,.96,.46,1.7,1.43,2.03,2.67,.21,.79,.26,2.32,.25,3.67,6.85-2.43,10.55,1.52,11.54,2.82,.12,.16,.14,.37,.04,.55-.33,.6-1.13,1.38-1.76,1.91,2.34,1.43,3.58,3.01,4.2,5.29,.07,.27-.08,.54-.35,.62-.52,.15-.97,.27-1.4,.39-.68,.18-1.29,.34-2,.58,.57,.38,1.35,.67,2.06,.93,.28,.1,.55,.2,.8,.3,.24,.1,.37,.37,.29,.62-.7,2.29-2.12,2.37-3.16,2.42,1.38,2.2,3.03,2.48,4.64,2.76,.15,.03,.31,.05,.46,.08,.15,.03,.27,.12,.35,.24,.07,.13,.09,.28,.04,.42-1.14,3.25-4.04,5.64-7.12,5.96,.29,.42,.66,.8,.87,.83,.19,.03,.34,.16,.41,.33,.06,.18,.02,.38-.11,.51-2.02,2.17-3.82,2-6.15,1.52-.16-.03-.29-.14-.36-.28s-.06-.31,0-.45c3.28-6.13,1.14-12.47-.15-14.93-.32,.52-.85,.95-1.77,1.05-.19,.02-.38-.07-.49-.24-1.57-2.57-5.83-4.94-9.13-5.82-.08,1.39,.38,2.8,1.28,3.86,.13,.15,.16,.36,.07,.54-.08,.18-.26,.29-.46,.29h0c-1.71-.02-5.45-1.25-7.13-2.46-4.71,3.64-8.5,7.8-4.78,17.38,.09,.23,0,.5-.22,.62-1.24,.72-2.43,.98-3.51,.98h0l.02,.04Zm-3.39-1.99c1.18,.69,3.48,1.62,6.02,.34-3.78-10.15,.68-14.65,5.58-18.38,.19-.15,.46-.14,.64,.02,1.03,.92,3.86,1.98,5.73,2.34-.73-1.28-1.02-2.81-.78-4.26,.02-.14,.1-.26,.21-.34,.11-.08,.26-.11,.39-.08,1.78,.39,3.87,1.24,5.73,2.33,1.41,.82,3.28,2.14,4.41,3.79,.6-.16,.83-.57,1.02-1.24,.05-.19,.21-.33,.4-.36,.19-.03,.38,.04,.5,.2,1.7,2.35,4.2,9.57,1.02,16.22,1.71,.3,2.83,.24,4.08-.88-.62-.5-1.11-1.36-1.25-1.76-.05-.16-.03-.33,.07-.47,.1-.13,.25-.21,.42-.21,2.76,.05,5.52-1.91,6.75-4.76-1.78-.31-3.95-.76-5.59-3.93-.07-.14-.08-.31,0-.45,.07-.14,.2-.25,.36-.28,.28-.06,.58-.07,.86-.08,.88-.04,1.6-.07,2.1-1.26-.11-.04-.21-.08-.32-.12-1.12-.41-2.4-.88-3.08-1.75-.1-.13-.13-.29-.09-.45s.15-.28,.3-.34c1.13-.44,1.98-.67,2.89-.91,.29-.08,.58-.15,.89-.24-.65-1.95-1.87-3.26-4.22-4.57-.15-.08-.25-.24-.26-.41s.07-.34,.21-.44c.56-.41,1.45-1.2,1.88-1.77-1.18-1.4-4.65-4.47-10.84-1.95-.16,.06-.34,.05-.48-.05s-.22-.26-.22-.43c.04-1.99-.03-3.5-.21-4.13-.24-.88-.72-1.58-1.34-1.94-2.75,.72-6.26,2.25-7.29,3.54-.12,.15-.32,.22-.51,.18-.19-.05-.34-.19-.38-.39-.3-1.36-2.34-3.65-4.26-4.54-.19,1.28-.91,2.28-1.6,3.25-.96,1.35-1.96,2.74-1.81,5.06,.01,.2-.09,.39-.27,.48-.17,.09-.39,.08-.55-.04-1.43-1.09-5.01-.32-6.95,1.07,.03,.02,.06,.03,.08,.05,.56,.31,1.14,.64,1.45,1.06,.09,.11,.12,.26,.09,.4s-.11,.26-.23,.34c-2.6,1.61-4.6,3.81-5.46,6l3.57-.05c.25,0,.45,.16,.5,.4,.05,.23-.07,.47-.29,.57-.49,.22-1.13,1.34-1.64,2.24-.38,.67-.75,1.31-1.12,1.77,.61,.3,1.54,.41,2.31,.5,1.12,.13,2.01,.24,2.12,.96,.04,.25-.11,.48-.34,.56-2.34,.76-3.2,1.26-3.96,1.71-.54,.31-1.01,.59-1.86,.89,2.24,3.55,3.92,3.77,6.37,3.67,.15,0,.29,.05,.38,.16,.1,.11,.15,.25,.14,.39-.1,1.11-.76,1.68-2.31,2.76h.04Z" /></svg>
                    My courses
                </a>
            </nav>

            <div className={styles.separator}></div>
        </>)
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <img src={logoURL} draggable="false" />
            </div>

            {MyAuthContext.auth && renderLinks()}

            <nav className={styles.info}>
                <Link to='/home' draggable="false">Home</Link>
                <a draggable="false">Courses</a>
                <a draggable="false">Blogs</a>
                <a draggable="false">About</a>
            </nav>
        </div>
    )
}