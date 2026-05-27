import { render, screen, fireEvent } from "../../../helpers/test-utils";
import { v4 as uuid } from "uuid";
import userEvent from "@testing-library/user-event";
import { setUserData } from "../../../hooks/user.actions";
import userFixtures from "../../../helpers/fixtures/user";
import { faker } from "@faker-js/faker";
import CreateComment from "../CreateComment";


/* “The RTL is a library for actually testing React applications”
jest is just a javascript framwork for writing, running, and structuring test it come with all tools needed

 */

/* the beforeEach method: is a jest method that runs before every test.it takes a callback functions as a parameter, where you can exceute lines of code that should run before the test. */

// eslint-disable-next-line no-undef
const userData = userFixtures();

beforeEach(()=> {
    // to fully reset the state between __tests__, 
    
    localStorage.clear();

    // and reset all mocks 

    jest.clearAllMocks();

    setUserData ({
        user: userData,
        access: null,
        refresh: null,
    });  
})
test("Create Comment", async() => {
    const user = userEvent.setup();
    render(<CreateComment postId={uuid()} />)

    const createFormElement = screen.getByTestId("create-comment-test");
    expect(createFormElement).toBeInTheDocument();

    const commentBodyField = screen.getByTestId("comment-body-field");
    expect(commentBodyField).toBeInTheDocument();

    const submitButton = screen.getByTestId("create-comment-submit");
    expect(submitButton).toBeInTheDocument()

    expect(submitButton.disabled).toBeTruthy();

    const commentBody = faker.lorem.sentence(10);

    await user.type(commentBodyField, commentBody);

    // checking if field has the test and button is not disabled

    expect(commentBodyField.value).toBe(commentBody);

    expect(submitButton.disabled).toBeFalsy()
})