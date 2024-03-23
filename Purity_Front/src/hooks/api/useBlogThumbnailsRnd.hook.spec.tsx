import 'whatwg-fetch'
import server from '../../../tests/server.mock';

import useBlogThumbnailsRnd from './useBlogThumbnailsRnd.hook';
import { renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';
import { HttpResponse, http } from 'msw';

// #region Setup server

    beforeAll(() => {
        server.listen()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    afterAll(() => {
        server.close()
    })

// #endregion

describe('Basic tests', () => {

    test('Cycles through loading state', async () => {

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>}
            const { result } = renderHook(() => useBlogThumbnailsRnd(1), { wrapper });

        // Expect status to be 'loading'
        await waitFor(() => expect(result.current[0]).toBe(10));
    });

    test('Handles fulfilled request for 1 blog', async () => {

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>}
            const { result } = renderHook(() => useBlogThumbnailsRnd(1), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(20));
        // Expect to recieve correct data
            await waitFor(() => expect(result.current[1]).toBe('requested 1 blogs'));
    });

    test('Handles fulfilled request for 5 blogs', async () => {

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>}
            const { result } = renderHook(() => useBlogThumbnailsRnd(5), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(20));
        // Expect to recieve correct data
            await waitFor(() => expect(result.current[1]).toBe('requested 5 blogs'));
    });

    test('Handles failed sql request', async () => {

        // Setup specific request case
            server.use(
                http.get('http://limbluck-purity.mooo.com/server/api/Blogs/thumbnails/:amount([0-9]+)rnd', ({ params })=>{

                return HttpResponse.json({
                    success: false,
                    data: 'requested ' + params.amount + ' blogs failed'
                })
            })
            )

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>}
            const { result } = renderHook(() => useBlogThumbnailsRnd(5), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(30));
        // Expect to recieve an empty array
            await waitFor(() => expect(result.current[1]).toEqual([]));
    });

    test('Handles failed fetch request', async () => {

        // Setup specific request case
            server.use(
                http.get('http://limbluck-purity.mooo.com/server/api/Blogs/thumbnails/:amount([0-9]+)rnd', ({ params })=>{

                return new HttpResponse(null, {
                    status: 404,
                    statusText: 'Error Occured'
                })
            })
            )

        // Render hook with empty SWR cache
            const wrapper = ({ children }: { children: ReactNode }) => {return <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>}
            const { result } = renderHook(() => useBlogThumbnailsRnd(5), { wrapper });

        // Expect status to be 'success'
            await waitFor(() => expect(result.current[0]).toBe(40));
        // Expect to recieve an empty array
            await waitFor(() => expect(result.current[1]).toEqual([]));
    });
})