import { Reducer, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";

import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";

import useSwipe from "./useSwipe.hook";

gsap.registerPlugin(CustomEase);

/**
 * @description - Hook to handle carousel (page changes and swipe movements)
 * 
 * @param elementRef
 *   Ref to DOM element to setup carousel on
 * @returns
 *   @param pageCycle.current: number - state - current page number
 *   @method setPage - call with required page number to set
 * 
 * @restrictions
 *   Carousel must have at least 3 elements in it
 *   Carousel element must be a horizontal flexbox
 * 
 * @example
 *     <div>                                                 - parent wrapper element with carousel container for gap calculations
 *
 *         <button onClick={() => {setPage(currentPage + 1)}}>   - button to set next page
 *         <button onClick={() => {setPage(currentPage - 1)}}>   - button to set pervious page
 *
 *         <div ref={elementRef}>                                - carousel container
 *             <div> ... </div>                                      - carousel element #1
 *             ...
 *             <div> ... </div>                                      - carousel element #n
 *
 *         </div>                                                - page setter
 *             <button onClick={()=>{setPage(1)}>                    - button to set page #1
 *             ...
 *             <button onClick={()=>{setPage(n)}>                    - button to set page #n
 *         <div>
 *     </div>
 */
export default function useCarousel(elementRef: React.RefObject<HTMLElement>): [number, (setPage: number) => void] {

    // #region Get element css properties

        // Define states
            const childrenAmount = useRef<number>(0);
            const [childrenFit, setChildrenFit] = useState<number>(0);
            const pageWidth = useRef<number>(0);

        // Function to get new page width on resize event
            const handleResize = () => {

                // If element have minimum children amount
                if (elementRef.current!.children.length >= 3) {

                    // Get width of a first child (assumed that children have equal width)
                    let calculatedChildWidth = Number(window.getComputedStyle(elementRef.current!.children[0]).getPropertyValue("width").slice(0, -2));

                    // Get width of an element
                    let calculatedElementWidth = Number(window.getComputedStyle(elementRef.current!.parentElement as Element).getPropertyValue("width").slice(0, -2));

                    // Calculate how much children fits in the screen (parent element)
                    let calculatedChildrenFit = Math.floor(calculatedElementWidth / calculatedChildWidth);
                    if (calculatedChildrenFit > elementRef.current!.children.length) calculatedChildrenFit = elementRef.current!.children.length - 2;
                    setChildrenFit(calculatedChildrenFit);

                    // Set gap for propper render of an element
                    let calculatedElementGap = (calculatedElementWidth - calculatedChildWidth * calculatedChildrenFit) / calculatedChildrenFit;
                    elementRef.current!.style.gap = String(calculatedElementGap) + 'px';

                    // Set page width
                    pageWidth.current = calculatedChildWidth + calculatedElementGap;
                }

            }

        // Get page widht & Get pages amount & Setup resize event listener
            useLayoutEffect(() => {
                childrenAmount.current = elementRef.current!.children.length
                handleResize();
                window.addEventListener('resize', handleResize, true);
                return () => window.removeEventListener('resize', handleResize, true)
            }, []);

        // Set initial 'display' and 'odrder' properties to carousel's children (first page state)
            useEffect(() => {

                setPageChildrenProperties(pageCycle.current);

            }, [childrenFit])

    // #endregion

    // #region Page setter

        // Setup reducer
            class PageCycle {
                current!: number
                requested?: number
                direction?: number
            }
            class PageCycleAction {
                requestedPage!: number
                direction?: number
            }
            const [pageCycle, dispatchPageCycle] = useReducer<Reducer<PageCycle, PageCycleAction>>(reducerPageCycle, {current: 1})
            function reducerPageCycle(state: PageCycle, action: PageCycleAction): PageCycle {

                // Check if page needs to be changed at all
                    if (action.requestedPage === state.current) return {current: action.requestedPage}
                    if (action.direction === 0) {

                        // Cycle pages for increace and decreace input cases
                            if (action.requestedPage < 1) action.requestedPage = childrenAmount.current;
                            if (action.requestedPage > childrenAmount.current) action.requestedPage = 1;

                        return {current: action.requestedPage}
                    }


                // If it's a start of a new cycle
                    if (!action.direction) {

                        // Cycle pages for increace and decreace input cases
                            if (action.requestedPage < 1) action.requestedPage = childrenAmount.current;
                            if (action.requestedPage > childrenAmount.current) action.requestedPage = 1;

                        // Calculate direction of a page changing cycle
                            // Is a path with a leap on an end of an array shorter than a path through an array?
                            action.direction = Math.abs(action.requestedPage - state.current) > (childrenAmount.current / 2)
                                ? action.requestedPage - state.current - (Math.sign(action.requestedPage - state.current) * childrenAmount.current)  // Yes, iterate with a leap on an end of an array
                                : action.requestedPage - state.current                                                                    // No,  iterate through an array
                    }

                // Pass requested page of define it if it havent been defined yet
                    let requestedPage = state.requested ? state.requested : action.requestedPage

                // Define next page
                    let nextPage = state.current + Math.sign(action.direction);
                        if (nextPage < 1) nextPage = childrenAmount.current;
                        if (nextPage > childrenAmount.current) nextPage = 1;

                return {current: nextPage, requested: requestedPage, direction: action.direction}
            }

        // Setter to call outside (for simplicity of use)
            // Timeout to prevent double activation of same but conflicting animations from starting together
            const pageOnTimeout = useRef<boolean>(false)
            function setPage(requestedPage: number) {
                
                if (!pageOnTimeout.current) {
                    dispatchPageCycle({requestedPage: requestedPage});
                    pageOnTimeout.current = true;
                    setTimeout(() => {
                        pageOnTimeout.current = false;
                    }, 250);
                }
            }

        // GSAP Effect to sync animations with page state changes
            useGSAP(() => {

                if (pageCycle.direction && pageCycle.requested) {

                    // Define ease function (default for middle page)
                        let easeFunc: string = 'linear';
                        // Single page
                            if (Math.abs(pageCycle.direction) === 1) {
                                easeFunc = 'power1.inOut'
                            }
                        // Last page
                            else if (pageCycle.requested === pageCycle.current) {
                                easeFunc = CustomEase.create("custom", "M0,0 C0.323,0.27 0.475,0.608 0.667,0.831 0.758,0.918 0.847,1 1,1 ")
                            }
                        // First page
                            else if (
                                (pageCycle.requested - pageCycle.direction === pageCycle.current - Math.sign(pageCycle.direction)) ||
                                (pageCycle.requested - pageCycle.direction - childrenAmount.current - 1 === pageCycle.current) ||
                                (pageCycle.requested - pageCycle.direction + childrenAmount.current + 1 === pageCycle.current)
                            ) {
                                easeFunc = CustomEase.create("custom", "M0,0 C0.212,0 0.331,0.078 0.487,0.253 0.611,0.43 0.676,0.74 1,1 ")
                            }

                    // Define duration time
                        let durationTime: number = 1 / Math.abs(pageCycle.direction) * 0.25;
                        if (Math.abs(pageCycle.direction) === 1) durationTime = 0.15;

                    // Remove transition property if remained from swipe
                        elementRef.current!.style.removeProperty('transition');

                    // Animate with GSAP
                        let animation = gsap.timeline()
                            .to(elementRef.current, {
                                xPercent: -50,
                                x: pageWidth.current * -1 * Math.sign(pageCycle.direction),
                                duration: durationTime,
                                ease: easeFunc,
                                onComplete: changeState,
                                onCompleteParams: [pageCycle.current, pageCycle.requested, pageCycle.direction]
                            })
                            .set(elementRef.current, {
                                xPercent: -50
                            })

                    // Helper function to fit in animation onComplete
                        function changeState(currentPage: number, requestedPage: number, direction: number) {
                            setPageChildrenProperties(currentPage);
                            dispatchPageCycle({requestedPage: requestedPage, direction: direction});
                            animation.revert()
                        }
                }

            }, {dependencies: [pageCycle]})

    // #endregion

    // #region Swipe controls

        // useSwipe status (swipe active or not) and last swipe distance value
            const [swipeStatus, swipeDistance] = useSwipe(elementRef);

        // Setup page offset to handle swap multiple pages at one move
            const [pageOffset, setPageOffset] = useState<number>(0);

        // Current displayed page (with setted display and order) relative to page where swipe started
            const [displayedPage, setDisplayedPage] = useState<number>(0);

        // Syncronize swipe with swipe event distance
            useEffect(() => {

                // Prevent set of translate property when swipe is not active
                if (swipeStatus) {

                    // Set element position according to swipe distance
                        elementRef.current!.style.transform = `translate(calc(-50% - ${swipeDistance % pageWidth.current}px))`;

                    // Update page status
                        // If swiping to the right
                        if (swipeDistance > 0) {

                            // Increace page.current state if scrolled to right more than a half of a page width
                            if (swipeDistance / pageWidth.current > pageOffset + 0.5) {
                                setPageOffset(Math.ceil(swipeDistance / pageWidth.current))
                                dispatchPageCycle({requestedPage: pageCycle.current + 1, direction: 0})
                            }
                            // Decreace page.current state if scrolled back to left to less than a half of a page width
                            else if (swipeDistance / pageWidth.current < pageOffset - 0.5) {
                                setPageOffset(pageOffset - 1)
                                dispatchPageCycle({requestedPage: pageCycle.current - 1, direction: 0})
                            }

                            // Set new display and order properties to children if scrolled more than one page width to right
                            if (swipeDistance >= pageWidth.current * (displayedPage + 1)) {
                                setDisplayedPage(displayedPage + 1)
                                setPageChildrenProperties(pageCycle.current);
                            }
                            // Set new display and order properties to children if scrolled back to less than one page width to right
                            else if (displayedPage && swipeDistance < displayedPage * pageWidth.current) {
                                setDisplayedPage(displayedPage - 1)
                                setPageChildrenProperties(pageCycle.current - 1 > 0 ? pageCycle.current - 1 : childrenAmount.current);
                            }
                        }
                        // If swiping to the left
                        if (swipeDistance < 0) {

                            // If scrolled to left more than a half of a page width
                            if (swipeDistance / pageWidth.current < pageOffset - 0.5) {
                                setPageOffset(Math.floor(swipeDistance / pageWidth.current))
                                dispatchPageCycle({requestedPage: pageCycle.current - 1, direction: 0})
                            }
                            // If scrolled back to right to less than a half of a page width
                            else if (swipeDistance / pageWidth.current > pageOffset + 0.5) {
                                setPageOffset(pageOffset + 1)
                                dispatchPageCycle({requestedPage: pageCycle.current + 1, direction: 0})
                            }

                            // Set new display and order properties to children if scrolled more than one page width to left
                            if (swipeDistance <= pageWidth.current * (displayedPage - 1)) {
                                setDisplayedPage(displayedPage - 1)
                                setPageChildrenProperties(pageCycle.current);
                            }
                            // Set new display and order properties to children if scrolled back to less than one page width to left
                            else if (displayedPage && swipeDistance > displayedPage * pageWidth.current) {
                                setDisplayedPage(displayedPage + 1)
                                setPageChildrenProperties(pageCycle.current + 1 <= childrenAmount.current ? pageCycle.current + 1 : 1);
                            }

                        }
                }

            }, [swipeDistance]);
        
        // Syncronize swipe with swipe event end
            useGSAP(() => {

                // If swipe ended
                if (!swipeStatus) {

                    // Reset display and order properties
                        setPageChildrenProperties(pageCycle.current);

                    // Reset style
                        elementRef.current!.style.removeProperty('transform')

                    // Animate transition
                        // On right swipe further than half of page width
                        if (swipeDistance > 0 && swipeDistance % pageWidth.current / pageWidth.current > 0.5) {
                            let animation = gsap.fromTo(elementRef.current,{
                                xPercent: -50,
                                x: pageWidth.current - swipeDistance % pageWidth.current,
                            }, {
                                xPercent: -50,
                                x: 0,
                                duration: 0.15,
                                ease: 'power1.in',
                                onComplete: () => {animation.revert()}
                            })
                        }
                        // On left swipe further than half of page width
                        else if (swipeDistance < 0 && swipeDistance % pageWidth.current / pageWidth.current < - 0.5) {
                            let animation = gsap.fromTo(elementRef.current,{
                                xPercent: -50,
                                x: - swipeDistance % pageWidth.current - pageWidth.current,
                            }, {
                                xPercent: -50,
                                x: 0,
                                duration: 0.15,
                                ease: 'power1.in',
                                onComplete: () => {animation.revert()}
                            })
                        }
                        // On swipe lesser than half of page width
                        else {
                            let animation = gsap.fromTo(elementRef.current,{
                                    xPercent: -50,
                                    x: - swipeDistance % pageWidth.current,
                                }, {
                                    xPercent: -50,
                                    x: 0,
                                    duration: 0.15,
                                    ease: 'power1.in',
                                    onComplete: () => {animation.revert()}
                                })
                        }

                    // Reset page offset
                        setPageOffset(0);

                    // Reset current page
                        setDisplayedPage(0)
                }

            }, {dependencies: [swipeStatus]})

    // #endregion

    // #region Utility functions

        // Set display and order properties
        function setPageChildrenProperties(page: number) {

            // Check if element have at least 3 children
            if (elementRef.current!.children.length >= 3) {

                // Show element if it was hidden
                elementRef.current!.style.removeProperty('display');

                // Hide all children
                for (let i = 0; i < elementRef.current!.children.length; i++) {
                    (elementRef.current!.children[i] as HTMLElement).style.display = 'none'
                }
    
                // Display and order new children
                for (let i = -1; i <= childrenFit; i++) {
                    (relativeChildElement(i, page - 1) as HTMLElement).style.removeProperty('display');
                    (relativeChildElement(i, page - 1) as HTMLElement).style.order = String(i - 1);
                }
            }
            // Else hide an element
            else {
                elementRef.current!.style.display = 'none';
            }
        }

        // Find child element relative to parent
        function relativeChildElement(findChildNumber: number, baseChildNumber: number): Element | undefined {

            // Return undefined if amount of children is less than 3
                if (elementRef.current!.children.length < 3) {
                    return undefined
                }

            // Error if a baseChild element dont exist
                if (!elementRef.current!.children[baseChildNumber]) {
                    throw new Error(`Cant access child number ${baseChildNumber}`);
                };

            // Error if there are less elements than requested
                if (Math.abs(findChildNumber) > elementRef.current!.children.length) {
                    throw new Error(`Only ${elementRef.current!.children.length} elements exist out of ${Math.abs(findChildNumber)} requested`);
                }

            // Return if an element is just exists on a current side of an array
            if (elementRef.current!.children[baseChildNumber + findChildNumber]) return elementRef.current!.children[baseChildNumber + findChildNumber];

            // Search an other side of an array

                // Position of an element on an other side of an array
                let soughtElementPosition: number = 0;

                // Search the negatives
                if (findChildNumber < 0) {

                    // Locate position of an element on an other side of an array
                    for (let i = baseChildNumber + findChildNumber; i <= baseChildNumber; i++) {
                        if (elementRef.current!.children[i]) break
                        soughtElementPosition++;
                    }

                    // Return an element from an other side of an array
                    return elementRef.current!.children[elementRef.current!.children.length - soughtElementPosition]
                }
                // Search the positives
                if (findChildNumber > 0) {

                    // Locate position of an element on an other side of an array
                    for (let i = baseChildNumber + findChildNumber; i >= baseChildNumber; i--) {
                        if (elementRef.current!.children[i]) break
                        soughtElementPosition++;
                    }

                    // Return an element from an other side of an array
                    return elementRef.current!.children[soughtElementPosition - 1]
                }

            // Error return in case of unexpected circumstances
            throw new Error('Faced unexpected branch') 

        };

    // #endregion

    return [pageCycle.current, setPage]
}