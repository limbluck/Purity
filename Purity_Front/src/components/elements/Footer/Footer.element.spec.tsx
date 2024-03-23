import { render } from "@testing-library/react";

import Footer from "./Footer.element"

describe('Basic tests', () => {

    test('Footer component renders', () => {
    
        // Tested component
            const renderRef = render(<Footer />);
    
        // Tested component rendered
            expect(renderRef.container.innerHTML).toBeTruthy()
    })
})