/* eslint-disable no-empty-function */

import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Chatbar from './Chatbar.element';

describe('Basic tests', () => {

    test('Chatbar component renders', () => {

        // Tested component
            const renderRef = render(<Chatbar toggleChatbar={() => {}} />);

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBeTruthy();
    });

    test('Default tabs is active on render', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Tested component rendered
            expect(defaultHeader)         .toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)           .toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');
    });
});

describe('Buttons section', () => {

    test('Close button on click triggers prop function', () => {

        // Mock toggle function
            const toggleFunc = jest.fn();

        // Tested component
            render(<Chatbar toggleChatbar={toggleFunc} />);
        // Tested button
            const closeButton = screen.getByTestId('buttons-close');

        // Click close button
            act(() => {fireEvent.click(closeButton);});

        // Expect mock function to be called once
            expect(toggleFunc.mock.calls.length).toBe(1);
    });

    test('Close button on click sets Default mode after 250ms', async () => {

        // Setup mocks
            jest.useFakeTimers();

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested button
            const closeButton =        screen.getByTestId('buttons-close');
        // Contacts button to change mode to 'contacts'
            const contactsButton =     screen.getByTestId('buttons-contacts');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set chatbar modes
            act(() => {
                // Set contacts mode
                    fireEvent.click(contactsButton);

                // Set default mode after 250 ms
                    fireEvent.click(closeButton);
            });

        // Expect state not to be default on 249 ms
            act(() => jest.advanceTimersByTime(249));

            expect(defaultHeader)     .not.toHaveClass('active');
            expect(contactsHeader)        .toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)       .not.toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)          .toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');

        // Expect state to be default on 250 ms
            act(() => jest.advanceTimersByTime(1));

            expect(defaultHeader)         .toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)           .toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');

        // Return to real timers
            jest.useRealTimers();
    });

    test('Contacts button on click sets Contacts mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested button
            const contactsButton =     screen.getByTestId('buttons-contacts');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set contacts mode
            act(() => fireEvent.click(contactsButton));

        // Check if mode changed
            expect(defaultHeader)     .not.toHaveClass('active');
            expect(contactsHeader)        .toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)       .not.toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)          .toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');

    });

    test('Settings button on click sets Settings mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested button
            const settingsButton =     screen.getByTestId('buttons-settings');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set contacts mode
            act(() => fireEvent.click(settingsButton));

        // Check if mode changed
            expect(defaultHeader)     .not.toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)        .toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)       .not.toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)          .toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');
    });
});

describe('Default mode', () => {

    test('Search input on click sets Search mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested search input
            const defaultSearch =      screen.getByTestId('default-search');
        // Secrions to check
            const searchClose =        screen.getByTestId('search-close');
            const searchFind =         screen.getByTestId('search-find');

            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set contacts mode
            act(() => fireEvent.click(defaultSearch));

        // Check if mode changed
            expect(searchClose)           .toHaveClass('active');
            expect(searchFind)            .toHaveClass('active');

            expect(defaultHeader)         .toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)       .not.toHaveClass('active');
            expect(searchMain)            .toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');
    });

    test('Groups on click toggles fold/unfold', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested groups
            const defaultStarred =              screen.getByTestId('default-starred');
            const defaultStarredConversations = screen.getByTestId('default-starred-conversations');
            const defaultGroup =                screen.getByTestId('default-group');
            const defaultGroupConversations =   screen.getByTestId('default-group-conversations');
            const defaultPrivate =              screen.getByTestId('default-private');
            const defaultPrivateConversations = screen.getByTestId('default-private-conversations');

        // Test Starred group
            // Unfold
            act(() => fireEvent.click(defaultStarred));
            expect(defaultStarred)             .toHaveClass('unfold');
            expect(defaultStarredConversations).toHaveClass('unfold');
            // Fold
            act(() => fireEvent.click(defaultStarred));
            expect(defaultStarred)             .not.toHaveClass('unfold');
            expect(defaultStarredConversations).not.toHaveClass('unfold');

        // Test Group group
            // Unfold
            act(() => fireEvent.click(defaultGroup));
            expect(defaultGroup)             .toHaveClass('unfold');
            expect(defaultGroupConversations).toHaveClass('unfold');
            // Fold
            act(() => fireEvent.click(defaultGroup));
            expect(defaultGroup)             .not.toHaveClass('unfold');
            expect(defaultGroupConversations).not.toHaveClass('unfold');

        // Test Private group
            // Unfold
            act(() => fireEvent.click(defaultPrivate));
            expect(defaultPrivate)             .toHaveClass('unfold');
            expect(defaultPrivateConversations).toHaveClass('unfold');
            // Fold
            act(() => fireEvent.click(defaultPrivate));
            expect(defaultPrivate)             .not.toHaveClass('unfold');
            expect(defaultPrivateConversations).not.toHaveClass('unfold');

    });

    test('Conversation on click sets Conversation mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested conversation
            const defautltConversation = screen.getByTestId('default-conversation');
        // Checked Conversation main and header sections
            const defaultHeader =        screen.getByTestId('default-header');
            const contactsHeader =       screen.getByTestId('contacts-header');
            const settingsHeader =       screen.getByTestId('settings-header');
            const conversationHeader =   screen.getByTestId('conversation-header');

            const defaultMain =          screen.getByTestId('default-main');
            const searchMain =           screen.getByTestId('search-main');
            const contactsMain =         screen.getByTestId('contacts-main');
            const settingsMain =         screen.getByTestId('settings-main');
            const conversationMain =     screen.getByTestId('conversation-main');

        // Set Conversation mode
            act(() => fireEvent.click(defautltConversation));

        // Check if mode changed
            expect(defaultHeader)     .not.toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader)    .toHaveClass('active');

            expect(defaultMain)       .not.toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)      .toHaveClass('active');
    });
});

describe('Search mode', () => {

    test('Close button on click sets Default mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested button
            const closeButton =        screen.getByTestId('search-close');
        // Default input to change mode to Search
            const input =              screen.getByTestId('default-search');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set Search mode and return to Default mode
            act(() => {
                fireEvent.click(input);
                fireEvent.click(closeButton);
            });

            expect(defaultHeader)         .toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)           .toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');

    });
});

describe('Contacts mode', () => {

    test('Close button on click sets Default mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested button
            const closeButton =        screen.getByTestId('contacts-close');
        // Contacts button to change mode to Contacts
            const contactsButton =     screen.getByTestId('buttons-contacts');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set Search mode and return to Default mode
            act(() => {
                fireEvent.click(contactsButton);
                fireEvent.click(closeButton);
            });

            expect(defaultHeader).toHaveClass('active');
            expect(contactsHeader).not.toHaveClass('active');
            expect(settingsHeader).not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain).toHaveClass('active');
            expect(searchMain).not.toHaveClass('active');
            expect(contactsMain).not.toHaveClass('active');
            expect(settingsMain).not.toHaveClass('active');
            expect(conversationMain).not.toHaveClass('active');
    });

    test('Search button on click sets Search mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested button
            const searchButton =       screen.getByTestId('contacts-search');
        // Contacts button to change mode to Contacts
            const contactsButton =     screen.getByTestId('buttons-contacts');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set Search mode and return to Default mode
            act(() => {
                fireEvent.click(contactsButton);
                fireEvent.click(searchButton);
            });

            expect(defaultHeader)         .toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)       .not.toHaveClass('active');
            expect(searchMain)            .toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');
    });
    
    test('Contacts and Requests buttons on click displays their value in header', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Contacts button to change mode to Contacts
            const contactsModeButton =  screen.getByTestId('buttons-contacts');
        // Tested buttons
            const contactsButton =      screen.getByTestId('contacts-contacts');
            const requestsButton =      screen.getByTestId('contacts-requests');
        // Sections to check
            const contactsHeaderValue = screen.getByTestId('contacts-header-value');

        // Set Contacts mode
            act(() => fireEvent.click(contactsModeButton));
        
        // Set and check Requests value
            act(() => fireEvent.click(requestsButton));
            expect(contactsHeaderValue.textContent).toMatch(/Requests/i);

        // Set and check Contacts value
            act(() => fireEvent.click(contactsButton));
            expect(contactsHeaderValue.textContent).toMatch(/Contacts/i);
    });
});

describe('Settings mode', () => {

    test('Close button on click sets Default mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Tested button
            const closeButton =        screen.getByTestId('settings-close');
        // Default input to change mode to Search
            const settingsButton =     screen.getByTestId('buttons-settings');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set Search mode and return to Default mode
            act(() => {
                fireEvent.click(settingsButton);
                fireEvent.click(closeButton);
            });

            expect(defaultHeader)         .toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)           .toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');

    });
});

describe('Conversation mode', () => {

    test('Close button on click sets Default mode', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Conversation button
            const conversation =       screen.getByTestId('default-conversation');
        // Tested button
            const closeButton =        screen.getByTestId('conversation-close');
        // Sections to check
            const defaultHeader =      screen.getByTestId('default-header');
            const contactsHeader =     screen.getByTestId('contacts-header');
            const settingsHeader =     screen.getByTestId('settings-header');
            const conversationHeader = screen.getByTestId('conversation-header');

            const defaultMain =        screen.getByTestId('default-main');
            const searchMain =         screen.getByTestId('search-main');
            const contactsMain =       screen.getByTestId('contacts-main');
            const settingsMain =       screen.getByTestId('settings-main');
            const conversationMain =   screen.getByTestId('conversation-main');

        // Set Search mode and return to Default mode
            act(() => {
                fireEvent.click(conversation);
                fireEvent.click(closeButton);
            });

            expect(defaultHeader)         .toHaveClass('active');
            expect(contactsHeader)    .not.toHaveClass('active');
            expect(settingsHeader)    .not.toHaveClass('active');
            expect(conversationHeader).not.toHaveClass('active');

            expect(defaultMain)           .toHaveClass('active');
            expect(searchMain)        .not.toHaveClass('active');
            expect(contactsMain)      .not.toHaveClass('active');
            expect(settingsMain)      .not.toHaveClass('active');
            expect(conversationMain)  .not.toHaveClass('active');

    });

    test('Menu button on click renders Menu dropdown', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Conversation button
            const conversation = screen.getByTestId('default-conversation');
        // Tested button
            const menuButton = screen.getByTestId('conversation-menu');

        // Set Conversation mode and click Menu button
            act(() => {
                fireEvent.click(conversation);
                fireEvent.click(menuButton);
            });

        // Expect dropdown to appear
            expect(screen.getByTestId('conversation-menu-dropdown')).toBeInTheDocument();
    });

    test('Menu button on click renders Menu dropdown', () => {

        // Tested component
            render(<Chatbar toggleChatbar={() => {}} />);
        // Conversation button
            const conversation = screen.getByTestId('default-conversation');
        // Menu button
            const menuButton = screen.getByTestId('conversation-menu');
        // Tested dropdown buttons

        // Set Conversation mode and open menu dropdown
            act(() => {
                fireEvent.click(conversation);
                fireEvent.click(menuButton);
            });

        // Starred
            // Check starred
            const starButton = screen.getByTestId('conversation-menu-dropdown-star');
            act(() => fireEvent.click(starButton));
            expect(screen.queryByTestId('conversation-starred-icon')).toBeInTheDocument();
            // Check unstarred
            const unstarButton = screen.getByTestId('conversation-menu-dropdown-unstar');
            act(() => fireEvent.click(unstarButton));
            expect(screen.queryByTestId('conversation-starred-icon')).not.toBeInTheDocument();

        // Muted
            // Check muted
            const muteButton = screen.getByTestId('conversation-menu-dropdown-mute');
            act(() => fireEvent.click(muteButton));
            expect(screen.queryByTestId('conversation-muted-icon')).toBeInTheDocument();
            // Check unmuted
            const unmuteButton = screen.getByTestId('conversation-menu-dropdown-unmute');
            act(() => fireEvent.click(unmuteButton));
            expect(screen.queryByTestId('conversation-muted-icon')).not.toBeInTheDocument();

        // Blocked
            // Check blocked
            const blockButton = screen.getByTestId('conversation-menu-dropdown-block');
            act(() => fireEvent.click(blockButton));
            expect(screen.queryByTestId('conversation-blocked-icon')).toBeInTheDocument();
            // Check unblocked
            const unblockButton = screen.getByTestId('conversation-menu-dropdown-unblock');
            act(() => fireEvent.click(unblockButton));
            expect(screen.queryByTestId('conversation-blocked-icon')).not.toBeInTheDocument();

    });
});