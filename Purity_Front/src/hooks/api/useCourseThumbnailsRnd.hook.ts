import { useState } from "react";
import useSWR from "swr";
import APIService from "../../services/api.service";

/**
 * @description - Hook to get custom amount of courses thumbnails through backend API request
 * 
 * @param amount - amount of courses thumbnails to request
 * @returns
 *   @param coursesThumbnailsStatus: RequestStatus - state - status of the request
 *   @method coursesThumbnails: CourseThumbnail[] - state - data (courses thumbnails)
 * 
 * @usage
 *   const [coursesThumbnailsStatus, coursesThumbnails] = useCourseThumbnails(6);
 */
export default function useCourseThumbnailsRnd(amount: number): [RequestStatus, CourseThumbnail[]] {

    // Inject API service
        const api = new APIService()

    // Define states
        const [status, setStatus] = useState<RequestStatus>(100);
        const [courses, setCourses] = useState<CourseThumbnail[]>([]);

    // Fetch function for useSWR
    const fetchCourses = async (url: string, init?: RequestInit) => {

        try {

            // Set status - loading
            setStatus(300);

            // Fetch data
                const responce = await fetch(url, init);
                const responceData: ServiceResponse = await responce.json();

            if (responceData.success) {
                // Set data in state
                    setCourses(responceData.data as CourseThumbnail[])
                // Set status - success
                    setStatus(200);
            } else {
                // Set status - backend error
                setStatus(500);
            }

        } catch {
            // Set status - frontend error
                setStatus(400);
        }

    }

    // Fetch courses thumbnails
        const {} = useSWR(api.CoursesThumbnailsRnd(amount), fetchCourses)

    return [status, courses]
}