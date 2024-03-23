import { useState } from "react";
import useSWR from "swr";
import APIService from "../../services/api.service";

/**
 * @description - Hook to get custom amount of blogs thumbnails through backend API request
 * 
 * @param amount - amount of blogs thumbnails to request
 * @returns
 *   @param blogsThumbnailsStatus: RequestStatus - state - status of the request
 *   @method blogsThumbnails: BlogThumbnail[] - state - data (blogs thumbnails)
 * 
 * @usage
 *   const [blogsThumbnailsStatus, blogsThumbnails] = useBlogsThumbnails(5);
 */
export default function useBlogsThumbnailsRnd(amount: number): [RequestStatus, BlogThumbnail[]] {

    // Inject API service
        const api = new APIService()

    // Define states
        const [status, setStatus] = useState<RequestStatus>(10);
        const [blogs, setBlogs] = useState<BlogThumbnail[]>([]);

    // Fetch function for useSWR
    const fetchBlogs = async (url: string, init?: RequestInit) => {

        try {

            // Fetch data
                const responce = await fetch(url, init);
                const responceData: ServiceResponse = await responce.json();

            if (responceData.success) {
                // Set data in state
                    setBlogs(responceData.data as BlogThumbnail[])
                // Set status - success
                    setStatus(20);
            } else {
                // Set status - sql error
                setStatus(30);
            }

        } catch {
            // Set status - fetch error
                setStatus(40);
        }

    }

    // Fetch blogs thumbnails
        const {} = useSWR(api.BlogsThumbnailsRnd(amount), fetchBlogs)

    return [status, blogs]
}