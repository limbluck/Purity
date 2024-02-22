import { useCallback, useState } from "react";

export default function useDropdown(parentRef: React.RefObject<HTMLElement>): [boolean, () => void] {

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleClickOustide = useCallback((event: MouseEvent) => {
        if (!parentRef!.current!.contains(event.target as HTMLElement)) {
            setShowDropdown(false);
            document.removeEventListener("mousedown", handleClickOustide, true);
        }
    }, []);

    function toggleDropdown() {
        if (!showDropdown) {
            setShowDropdown(true);
            document.addEventListener("mousedown", handleClickOustide, true);
        } else {
            setShowDropdown(false);
            document.removeEventListener("mousedown", handleClickOustide, true);
        }
    };

    return [showDropdown, toggleDropdown]
}