import { useCallback, useEffect, useState } from "react"

/**
 * @description - Hook for swipe distance tracking
 * 
 * @param elementRef
 *   Ref to DOM element to setup tracking start
 * @param setDistance
 *   State setter for stream of distance values
 * @returns
 *   Function to call when listener is no longer needed
 * 
 * @usage
 *  const elementRef = useRef<HTMLElement>(null);              - ref to an element to track
 *  const [swipeDistance, stopListener] = useSwipe(bannerRef); - distance state & function to call when tracking is no longer needed
 *  useEffect(() => {
 *      ...                                                    - logic to do on distance change
 *  }, [swipeDistance]);
 */
export default function useSwipe(
    elementRef: React.RefObject<HTMLElement>,
): [
    number,
    () => void
] {

    // Setup mousedown and touchstart event listeners

    let downPoint: number;
    const [distance, setDistance] = useState<number>(0);
    useEffect( () => {
        elementRef.current!.addEventListener("mousedown", handleMouseDown, true);
        elementRef.current!.addEventListener("touchstart", handleTouchStart, true);
        return () => {
            elementRef.current!.removeEventListener("mousedown", handleMouseDown, true);
            elementRef.current!.removeEventListener("touchstart", handleTouchStart, true);
        }
    }, []);

    // Mouse events

        // Setup event listeners on mousedown event

            const handleMouseDown = (event: MouseEvent) => {
                downPoint = event.clientX;
                setDistance(0);

                document.addEventListener("mousemove", handleMouseMove,  true);
                document.addEventListener("mouseup", handleMouseUp,  true);
            }

        // Stream distance values from mouse event

            const handleMouseMove = (event: MouseEvent) => {
                setDistance(downPoint - event.clientX);
            };

        // Delete mouse event listeners on mouseup

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove,  true);
                document.removeEventListener("mouseup", handleMouseUp,  true);
            }

    // Touch events

        // Setup event listeners on touchstart event
        
            const handleTouchStart = (event: TouchEvent) => {
                downPoint = event.touches[0].clientX;
                setDistance(0);

                document.addEventListener("touchmove", handleTouchMove,  true);
                document.addEventListener("touchend", handleTouchEnd,  true);
                document.addEventListener("touchcancel", handleTouchCancel,  true);
            }

        // Stream distance values from mouse event

            const handleTouchMove = (event: TouchEvent) => {
                setDistance(downPoint - event.touches[0].clientX);
            }

        // Delete touch event listeners on touchend

            const handleTouchEnd = () => {
                document.removeEventListener("touchmove", handleTouchMove,  true);
                document.removeEventListener("touchend", handleTouchEnd,  true);
                document.removeEventListener("touchcancel", handleTouchCancel,  true);
            }

        // Delete touch event listeners on touchcancel

            const handleTouchCancel = () => {
                document.removeEventListener("touchmove", handleTouchMove,  true);
                document.removeEventListener("touchend", handleTouchEnd,  true);
                document.removeEventListener("touchcancel", handleTouchCancel,  true);
            }

    // Stopper function to call when listener is no longer needed

        const stopListener = useCallback( () => {
            document.removeEventListener("mousemove", handleMouseMove,  true);
            document.removeEventListener("mouseup", handleMouseUp,  true);
            document.removeEventListener("touchmove", handleTouchMove,  true);
            document.removeEventListener("touchend", handleTouchEnd,  true);
            document.removeEventListener("touchcancel", handleTouchCancel,  true);
        }, [])

        return [distance, stopListener]
}