import { render } from "@testing-library/react";
import About from "./About.page";

describe('Basic tests', () => {

    test('About page renders', () => {

        // Tested component
            const renderRef = render(
                <About />
            );

        // Tested component rendered
            expect(renderRef.container.innerHTML).toBeTruthy()
    });
});