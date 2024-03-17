import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import BlogThumbnail from "./BlogThumbnail.component";

// Mock API service
    jest.mock('../../services/api.service', () => {
        return class {
            readonly ASSETS = "";
        }
    });

describe('Basic tests', () => {

    test('BlogThumbnail component on status 10 loading renders loading data', () => {

        // Tested component
            render(
                <BlogThumbnail status={10} blog={undefined} />
            );

        // Expect title to display loading state
            const title = screen.getByTestId('title');
            expect(title.textContent).toMatch(/loading/i);

        // Expect author to match mock blog author
            const author = screen.getByTestId('author');
            expect(author.textContent).toMatch(/.../i);

        // Expect created to match mock blog created
            const created = screen.getByTestId('created');
            expect(created.textContent).toMatch(/.../i);

        // Expect imageURL to match mock blog imageURL
            const image = screen.getByTestId('image');
            expect(image).toHaveStyle(`background-image: url()`)
    });

    test('BlogThumbnail component on status 20 success renders blog data', () => {

        // Mock blog data
            const mockBlog = {
                title: 'Mock Blog',
                author: 'Mock Author',
                created: '01/01/1900',
                imageURL: 'mock-url'
            }

        // Render tested component
            render(
                <BlogThumbnail status={20} blog={mockBlog} />
            );

        // Expect title to match mock blog title
            const title = screen.getByTestId('title');
            expect(title.textContent).toMatch(new RegExp (mockBlog.title));

        // Expect author to match mock blog author
            const author = screen.getByTestId('author');
            expect(author.textContent).toMatch(new RegExp (mockBlog.author));

        // Expect created to match mock blog created
            const created = screen.getByTestId('created');
            expect(created.textContent).toMatch(new RegExp (mockBlog.created));

        // Expect imageURL to match mock blog imageURL
            const image = screen.getByTestId('image');
            expect(image).toHaveStyle(`background-image: url(${mockBlog.imageURL})`)
    });

    test('BlogThumbnail component on status 30 sql error not renders', () => {

        // Tested component
            const renderRef = render(
                <BlogThumbnail status={30} blog={undefined} />
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBe('');
    });

    test('BlogThumbnail component on status 40 fetch error not renders', () => {

        // Tested component
            const renderRef = render(
                <BlogThumbnail status={40} blog={undefined} />
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBe('');
    });
});