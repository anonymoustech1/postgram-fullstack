import { render as rtlRender } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";


function render(ui, { ...renderOptions } = {}) {
    const Wrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
