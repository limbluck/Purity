import { useState } from "react";

/**
 * @description - 
 * 
 * @param parentRef - amount of courses thumbnails to request
 * @returns
 *   @param showDropdown: boolean - state - dopdown status (is it shown?)
 *   @method toggleDropdown - call to toggle dropdown status
 * 
 * @usage
 *   const [showDropdown, toggleDropdown] = useDropdown(elementRef)
 */
export default function useDropdown(parentRef: React.RefObject<HTMLElement>): [boolean, () => void] {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleClickOustide = (event: MouseEvent) => {
        if (parentRef.current!.contains(event.target as HTMLElement) === false) {
            setShowDropdown(false);
            document.removeEventListener("mousedown", handleClickOustide, true);
        }
    };

    function toggleDropdown() {
        if (showDropdown === false) {
            setShowDropdown(true);
            document.addEventListener("mousedown", handleClickOustide, true);
        } else {
            setShowDropdown(false);
            document.removeEventListener("mousedown", handleClickOustide, true);
        }
    };

    return [showDropdown, toggleDropdown]
}