/* eslint-disable no-empty-function */

import { render } from '@testing-library/react';
import Home from './Home.page';

// #region Module mocks

    jest.mock('../../utility/CourseThumbnail/CourseThumbnail.component.tsx', () => {
        return function CourseThumbnail() {return (<div>Mock Course thumbnail</div>);};
    });
    jest.mock('../../utility/BlogThumbnail/BlogThumbnail.component.tsx', () => {
        return function BlogThumbnail() {return (<div>Mock Blog thumbnail</div>);};
    });

    jest.mock('../../../hooks/useSwipe.hook.ts', () => {
        return function useSwipe(): [boolean, number, () => void] {
            return [false, 0, () => {}];
        };
    });
    jest.mock('../../../hooks/useCarousel.hook.ts', () => {
        return function useCarousel(): [number, (setPage: number) => void] {
            return [0, () => {}];
        };
    });

    jest.mock('../../../hooks/api/useCourseThumbnailsRnd.hook.ts', () => {
        return function useCourseThumbnailsRnd() {return [0, []];};
    });
    jest.mock('../../../hooks/api/useBlogThumbnailsRnd.hook', () => {
        return function useBlogsThumbnailsRnd() {return [0, []];};
    });

// #endregion

describe('Basic tests', () => {

    test('Home page renders', () => {

        // Tested component
            const renderRef = render(
                <Home />
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBeTruthy();
    });
});