import { useEffect, useState } from "react";

export const ROOT = "http://limbluck-purity.mooo.com/server";
export const ROOTapi = ROOT + "/api";
export const ROOTassets = ROOT + "/assets";

type ServiceResponse = {
    data: unknown[],
    success: boolean,
    message?: string
}

export function useCourseThumbnails(amount: number): [RequestStatus, CourseThumbnail[]] {

    const [status, setStatus] = useState<RequestStatus>(100);
    
    const [courses, setCourses] = useState<CourseThumbnail[]>([]);

    const fetchCourses = async () => {

        try {
            setStatus(300);

            const responce = await fetch(`${ROOTapi}/Courses/thumbnails/${amount}rnd`);
            const responceData: ServiceResponse = await responce.json();

            if (responceData.success) {
                setCourses(responceData.data as CourseThumbnail[])
                setStatus(200);
            } else {
                setStatus(500);
            }

        } catch {
            setStatus(400);
        }

    }
    
    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        console.log(status)
    }, [status])

    return [status, courses]
}