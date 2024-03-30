import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

import Sidebar from "./Sidebar.element";
import { MyAuthContext } from "../../../context/auth.context";

describe('Basic tests', () => {

    test('Sidebar component renders', () => {

        // Tested component
            const renderRef = render(
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBeTruthy()
    });
});

describe('Auth context', () => {

    test('Main links renders with auth context is true', () => {

        // Render component with auth context true
            render(
                <MyAuthContext.Provider value={{ auth: true, setAuth: () => {} }}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
                </MyAuthContext.Provider>
            );

        // Expect links to be
            expect(screen.queryByTestId('links-main')).toBeInTheDocument();
    });

    test('Main links not renders with auth context is false', () => {

        // Render component with auth context true
            render(
                <MyAuthContext.Provider value={{ auth: false, setAuth: () => {} }}>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
                </MyAuthContext.Provider>
            );

        // Expect links not to be
            expect(screen.queryByTestId('links-main')).not.toBeInTheDocument();
    });
});