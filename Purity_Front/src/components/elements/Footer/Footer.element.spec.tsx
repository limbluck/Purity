/* eslint-disable no-empty-function */

import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './Footer.element';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Basic tests', () => {

    test('Footer component renders', () => {
    
            const renderRef = render(
                <MemoryRouter>
                    <Footer />
                </MemoryRouter>
            );
            expect(renderRef.container.innerHTML).toBeTruthy();
    });
});

describe('Router tests', () => {

    test('About link works', () => {

        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/' element={<></>}/>
                    <Route path='/about' element={<div data-testid="42">Pass the test</div>}/>
                </Routes>
                <Footer />
            </MemoryRouter>,
        );

        const aboutLink = screen.getByTestId('about-link');

        act(() => fireEvent.click(aboutLink));

        expect(screen.getByTestId('42')).toBeInTheDocument();
    });
});