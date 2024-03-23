import { act, fireEvent, screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';

import Header from "./Header.element"
import { MemoryRouter } from "react-router-dom";
import { MyAuthContext } from "../../../context/auth.context";

describe('Basic tests', () => {

    test('Header component renders', () => {

        // Tested component
            const renderRef = render(
                <MemoryRouter>
                    <Header toggleChatbar={() => {}} toggleSidebar={() => {}}/>
                </MemoryRouter>
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBeTruthy()
    });
});

describe('Sidebar and Chatbar toggle function props', () => {

    test('Sidebar button on click triggers toggle function prop', () => {

        // Mock toggle sidebar function
            const toggleFunc = jest.fn();

        // Render component
            render(
                <MemoryRouter>
                    <Header toggleSidebar={toggleFunc} toggleChatbar={() => {}}/>
                </MemoryRouter>
            );

        // Click sidebar button
            const sidebarButton = screen.getByTestId('sidebar-button');
            act(() => {fireEvent.click(sidebarButton)});

        // Expect mock function to be called once
            expect(toggleFunc.mock.calls.length).toBe(1);
    });

    test('Chatbar button on click triggers toggle function prop', () => {

        // Mock toggle chatbar function
            const toggleFunc = jest.fn();

        // Render component with authorized context
            render(
                <MyAuthContext.Provider value={{auth: true, setAuth: () => {}}}>
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={toggleFunc}/>
                </MemoryRouter>
                </MyAuthContext.Provider>
            );

        // Click chatbar button
            const chatbarButton = screen.getByTestId('chatbar-button');
            act(() => {fireEvent.click(chatbarButton)});

        // Expect mock function to be called once
            expect(toggleFunc.mock.calls.length).toBe(1);
    });
});

describe('Auth context', () => {

    test('Login button renders when auth context is false and triggers auth toggle function on click', () => {

        // Mock toggle auth context function
            const toggleContext = jest.fn();

        // Render component with auth context false
            render(
                <MyAuthContext.Provider value={{auth: false, setAuth: toggleContext}}>
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
                </MyAuthContext.Provider>
            );

        // Expect login button to be
            expect(screen.getByTestId('login-button')).toBeInTheDocument();

        // Expect profile button not to be
            expect(screen.queryByTestId('profile-button')).not.toBeInTheDocument();

        // Expect to call toggleContext function on login button click
            const loginButton = screen.getByTestId('login-button');
            act(() => fireEvent.click(loginButton));
            expect(toggleContext.mock.calls.length).toBe(1);
    });

    test('Profile button renders when auth context is true and triggers auth toggle function on click', () => {

        // Mock toggle auth context function
            const toggleContext = jest.fn();

        // Render component with auth context false
            render(
                <MyAuthContext.Provider value={{auth: true, setAuth: toggleContext}}>
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
                </MyAuthContext.Provider>
            );

        // Expect profile button to be
            expect(screen.queryByTestId('profile-button')).toBeInTheDocument();

        // Expect login button not to be
            expect(screen.queryByTestId('login-button')).not.toBeInTheDocument();

        // Expect to call toggleContext function on profile dropdown logout button click
            const profileButton = screen.getByTestId('profile-button');
            act(() => fireEvent.click(profileButton));
            const logOutButton = screen.getByTestId('profile-dropdown-logout');
            act(() => fireEvent.click(logOutButton));
            expect(toggleContext.mock.calls.length).toBe(1);
    });
});

describe('Dropdowns', () => {

    test('Language dropdown opens and closes on button click', () => {

        // Render component
            render(
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
            );

        // Click language button and expect language dropdown to appear
            const languageButton = screen.getByTestId('language-button');
            act(() => {fireEvent.click(languageButton)});
            expect(screen.getByTestId('language-dropdown')).toBeInTheDocument();

        // Click language button and expect language dropdown to disappear
            act(() => {fireEvent.click(languageButton)});
            expect(screen.queryByTestId('language-dropdown')).not.toBeInTheDocument();
    });
    test('Language dropdown not closes on click iside and closes on mousedown outside', () => {

        // Render component
            const renderRef = render(
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
            );

        // Click language button for dropdown to appear
            const languageButton = screen.getByTestId('language-button');
            act(() => {fireEvent.click(languageButton)});

        // Click iside a dropdown and expect it to stay
            const languageDropdown = screen.getByTestId('language-dropdown');
            act(() => {fireEvent.click(languageDropdown)});
            expect(screen.queryByTestId('language-dropdown')).toBeInTheDocument();

        // Click outside of a dropdown and expect it to disappear (on mousedown event)
            act(() => {fireEvent.mouseDown(renderRef.container)});
            expect(screen.queryByTestId('language-dropdown')).not.toBeInTheDocument();
    });

    test('Search dropdown opens and closes on button click', () => {

        // Render component
            render(
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
            );

        // Click search button and expect search dropdown to appear
            const searchButton = screen.getByTestId('search-button');
            act(() => {fireEvent.click(searchButton)});
            expect(screen.queryByTestId('search-dropdown')).toBeInTheDocument();

        // Click search button and expect search dropdown to disappear
            act(() => {fireEvent.click(searchButton)});
            expect(screen.queryByTestId('search-dropdown')).not.toBeInTheDocument();
    });
    test('Search dropdown not closes on click iside and closes on mousedown outside', () => {

        // Render component
            const renderRef = render(
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
            );

        // Click search button for dropdown to appear
            const searchButton = screen.getByTestId('search-button');
            act(() => {fireEvent.click(searchButton)});

        // Click iside a dropdown and expect it to stay
            const searchDropdown = screen.getByTestId('search-dropdown');
            act(() => {fireEvent.click(searchDropdown)});
            expect(screen.queryByTestId('search-dropdown')).toBeInTheDocument();

        // Click outside of a dropdown and expect it to disappear (on mousedown event)
            act(() => {fireEvent.mouseDown(renderRef.container)});
            expect(screen.queryByTestId('search-dropdown')).not.toBeInTheDocument();
    });

    test('Notifications dropdown opens and closes on button click', () => {

        // Render component with true auth context
            render(
                <MyAuthContext.Provider value={{auth: true, setAuth: () => {}}}>
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
                </MyAuthContext.Provider>
            );

        // Click notifications button and expect notifications dropdown to appear
            const notificationsButton = screen.getByTestId('notifications-button');
            act(() => {fireEvent.click(notificationsButton)});
            expect(screen.queryByTestId('notifications-dropdown')).toBeInTheDocument();

        // Click notifications button and expect notifications dropdown to disappear
            act(() => {fireEvent.click(notificationsButton)});
            expect(screen.queryByTestId('notifications-dropdown')).not.toBeInTheDocument();
    });
    test('Notifications dropdown not closes on click iside and closes on mousedown outside', () => {

        // Render component
            const renderRef = render(
                <MyAuthContext.Provider value={{auth: true, setAuth: () => {}}}>
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
                </MyAuthContext.Provider>
            );

        // Click notifications button for dropdown to appear
            const notificationsButton = screen.getByTestId('notifications-button');
            act(() => {fireEvent.click(notificationsButton)});

        // Click iside a dropdown and expect it to stay
            const notificationsDropdown = screen.getByTestId('notifications-dropdown');
            act(() => {fireEvent.click(notificationsDropdown)});
            expect(screen.queryByTestId('notifications-dropdown')).toBeInTheDocument();

        // Click outside of a dropdown and expect it to disappear (on mousedown event)
            act(() => {fireEvent.mouseDown(renderRef.container)});
            expect(screen.queryByTestId('notifications-dropdown')).not.toBeInTheDocument();
    });

    test('Profile dropdown opens and closes on button click', () => {

        // Render component with true auth context
            render(
                <MyAuthContext.Provider value={{auth: true, setAuth: () => {}}}>
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
                </MyAuthContext.Provider>
            );

        // Click profile button and expect profile dropdown to appear
            const profileButton = screen.getByTestId('profile-button');
            act(() => {fireEvent.click(profileButton)});
            expect(screen.queryByTestId('profile-dropdown')).toBeInTheDocument();

        // Click profile button and expect profile dropdown to disappear
            act(() => {fireEvent.click(profileButton)});
            expect(screen.queryByTestId('profile-dropdown')).not.toBeInTheDocument();
    });
    test('Profile dropdown not closes on click iside and closes on mousedown outside', () => {

        // Render component
            const renderRef = render(
                <MyAuthContext.Provider value={{auth: true, setAuth: () => {}}}>
                <MemoryRouter>
                    <Header toggleSidebar={() => {}} toggleChatbar={() => {}}/>
                </MemoryRouter>
                </MyAuthContext.Provider>
            );

        // Click profile button for dropdown to appear
            const profileButton = screen.getByTestId('profile-button');
            act(() => {fireEvent.click(profileButton)});

        // Click iside a dropdown and expect it to stay
            const profileDropdown = screen.getByTestId('profile-dropdown');
            act(() => {fireEvent.click(profileDropdown)});
            expect(screen.queryByTestId('profile-dropdown')).toBeInTheDocument();

        // Click outside of a dropdown and expect it to disappear (on mousedown event)
            act(() => {fireEvent.mouseDown(renderRef.container)});
            expect(screen.queryByTestId('profile-dropdown')).not.toBeInTheDocument();
    });

});