import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import CourseThumbnail from "./CourseThumbnail.component";

// Mock API service
jest.mock('../../../services/api.service', () => {
    return class {
        readonly ASSETS = "";
    }
});

describe('Basic tests', () => {

    test('CourseThumbnail component on status 10 loading renders loading data', () => {

        // Tested component
            render(
                <CourseThumbnail status={10} course={undefined} />
            );

        // Expect title to display loading state
            const title = screen.getByTestId('title');
            expect(title.textContent).toMatch(/loading/i);

        // Expect imageURL to match mock course imageURL
            const image = screen.getByTestId('image');
            expect(image).toHaveStyle(`background-image: url(test-file-stub)`)
    });

    test('CourseThumbnail component on status 20 success renders course data', () => {

        // Mock course data
            const mockCourse = {
                title: 'Mock Course',
                category: 'Mock',
                enrolled: 0,
                summary: 'Please enroll',
                price: 999,
                imageURL: 'mock-image'
            }

        // Render tested component
            render(
                <CourseThumbnail status={20} course={mockCourse} />
            );

        // Expect title to match mock course title
            const title = screen.getByTestId('title');
            expect(title.textContent).toMatch(new RegExp (mockCourse.title));

        // Expect category to match mock course category
            const category = screen.getByTestId('category');
            expect(category.textContent).toMatch(new RegExp (mockCourse.category));

        // Expect enrolled to match mock course enrolled
            const enrolled = screen.getByTestId('enrolled');
            expect(enrolled.textContent).toMatch(new RegExp (mockCourse.enrolled.toString()));

        // Expect summary to match mock course summary
            const summary = screen.getByTestId('summary');
            expect(summary.textContent).toMatch(new RegExp (mockCourse.summary));

        // Expect price to match mock course price
            const price = screen.getByTestId('price');
            expect(price.textContent).toMatch(new RegExp (mockCourse.price.toString() + ' USD'));

        // Expect imageURL to match mock course imageURL
            const image = screen.getByTestId('image');
            expect(image).toHaveStyle(`background-image: url(${mockCourse.imageURL})`)
    });

    test('CourseThumbnail component on status 20 success renders correct unsetted price', () => {

        // Mock course data
            const mockCourse = {
                title: 'Mock Course',
                category: 'Mock',
                enrolled: 0,
                summary: 'Please enroll',
                price: undefined,
                imageURL: 'mock-image'
            }

        // Render tested component
            render(
                <CourseThumbnail status={20} course={mockCourse} />
            );

        // Expect price to match free
            const price = screen.getByTestId('price');
            expect(price.textContent).toMatch(/FREE/i);
    });

    test('CourseThumbnail component on status 30 sql error not renders', () => {

        // Tested component
            const renderRef = render(
                <CourseThumbnail status={30} course={undefined} />
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBe('');
    });

    test('CourseThumbnail component on status 40 fetch error not renders', () => {

        // Tested component
            const renderRef = render(
                <CourseThumbnail status={40} course={undefined} />
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBe('');
    });
});