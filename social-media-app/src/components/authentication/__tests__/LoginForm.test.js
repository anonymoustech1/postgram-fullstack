import { render, screen } from "../../../helpers/test-utils";

import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import  userFixtures from "../../../helpers/fixtures/user";
import LoginForm from "../LoginForm";

const userData = userFixtures();

test("renders Login form", async () => {
    const user = userEvent.setup(); 

    render(<LoginForm />);

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();

    const emailField = screen.getByTestId("email-field");
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

        const password = faker.lorem.slug(4);
        await user.type(emailField, userData.email);
        await user.type(passwordField, password);

        expect(emailField.value).toBe(userData.email);
        
        expect(passwordField.value).toBe(password);
});