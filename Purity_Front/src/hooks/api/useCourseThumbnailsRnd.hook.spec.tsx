import 'whatwg-fetch';
import server from '../../../tests/server.mock';

import useCourseThumbnailsRnd from './useCourseThumbnailsRnd.hook';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import { HttpResponse, http } from 'msw';

// #region Setup server

    beforeAll(() => {
        server.listen();
    });

    afterEach(() => {
        server.resetHandlers();
    });

    afterAll(() => {
        server.close();
    });

// #endregion

describe('Basic tests', () => {

    test('Cycles through loading state', async () => {

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;};
            const { result } = renderHook(() => useCourseThumbnailsRnd(1), { wrapper });

        // Expect status to be 'loading'
        await waitFor(() => expect(result.current[0]).toBe(10));
    });

    test('Handles fulfilled request for 1 course', async () => {

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;};
            const { result } = renderHook(() => useCourseThumbnailsRnd(1), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(20));
        // Expect to recieve correct data
            await waitFor(() => expect(result.current[1]).toBe('requested 1 courses'));
    });

    test('Handles fulfilled request for 5 courses', async () => {

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;};
            const { result } = renderHook(() => useCourseThumbnailsRnd(6), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(20));
        // Expect to recieve correct data
            await waitFor(() => expect(result.current[1]).toBe('requested 6 courses'));
    });

    test('Handles failed sql request', async () => {

        // Setup specific request case
            server.use(
                http.get('http://limbluck-purity.mooo.com/server/api/Courses/thumbnails/:amount([0-9]+)rnd', ({ params })=>{

                return HttpResponse.json({
                    success: false,
                    data: 'requested ' + params.amount + ' courses failed'
                });
            })
            );

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;};
            const { result } = renderHook(() => useCourseThumbnailsRnd(6), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(30));
        // Expect to recieve an empty array
            await waitFor(() => expect(result.current[1]).toEqual([]));
    });

    test('Handles failed fetch request', async () => {

        // Setup specific request case
            server.use(
                http.get('http://limbluck-purity.mooo.com/server/api/Courses/thumbnails/:amount([0-9]+)rnd', ()=>{

                return new HttpResponse(null, {
                    status: 404,
                    statusText: 'Error Occured'
                });
            })
            );

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>;};
            const { result } = renderHook(() => useCourseThumbnailsRnd(6), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(40));
        // Expect to recieve an empty array
            await waitFor(() => expect(result.current[1]).toEqual([]));
    });
});