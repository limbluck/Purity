import { useCallback, useEffect, useState } from "react"

/**
 * @description - Hook for swipe distance tracking
 * 
 * @param elementRef
 *   Ref to DOM element to setup tracking start event
 * @returns
 *   @param swipeActive - state - swipe listener status
 *   @param swipeDistace - state - current swipe distance
 *   @method stopListener - call to stop listener function when one is no longer needed
 * 
 * @usage
 *  const elementRef = useRef<HTMLElement>(null);
 *  const [swipeActive, swipeDistance, stopListener] = useSwipe(bannerRef);
 *  useEffect(() => {
 *      ...
 *  }, [swipeDistance]);
 *  useEffect(() => {
 *      ...
 *  }, [swipeActive]);
 */
export default function useSwipe(elementRef: React.RefObject<HTMLElement>): [boolean, number, () => void] {

    // #region Setup mousedown and touchstart event listeners

        let downPoint: number;
        const [distance, setDistance] = useState<number>(0);
        const [swipeActive, setSwipeActive] = useState<boolean>(false);
        useEffect( () => {
            elementRef.current?.addEventListener("mousedown", handleMouseDown, true);
            elementRef.current?.addEventListener("touchstart", handleTouchStart, true);
            return () => {
                elementRef.current?.removeEventListener("mousedown", handleMouseDown, true);
                elementRef.current?.removeEventListener("touchstart", handleTouchStart, true);
            }
        }, []);

    // #endregion 

    // #region Mouse events

        // Setup event listeners on mousedown event

            const handleMouseDown = (event: MouseEvent) => {
                downPoint = event.clientX;
                setSwipeActive(true);
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
                setSwipeActive(false);
            }

    // #endregion 

    // #region Touch events

        // Setup event listeners on touchstart event
        
            const handleTouchStart = (event: TouchEvent) => {
                downPoint = event.touches[0].clientX;
                setSwipeActive(true);
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
                setSwipeActive(false);
            }

        // Delete touch event listeners on touchcancel

            const handleTouchCancel = () => {
                document.removeEventListener("touchmove", handleTouchMove,  true);
                document.removeEventListener("touchend", handleTouchEnd,  true);
                document.removeEventListener("touchcancel", handleTouchCancel,  true);
                setSwipeActive(false);
            }

    // #endregion 

    // #region Stopper function to call when listener is no longer needed

        const stopListener = useCallback( () => {
            document.removeEventListener("mousemove", handleMouseMove,  true);
            document.removeEventListener("mouseup", handleMouseUp,  true);
            document.removeEventListener("touchmove", handleTouchMove,  true);
            document.removeEventListener("touchend", handleTouchEnd,  true);
            document.removeEventListener("touchcancel", handleTouchCancel,  true);
            setSwipeActive(false);
        }, [])

    // #endregion 

        return [swipeActive, distance, stopListener]
}