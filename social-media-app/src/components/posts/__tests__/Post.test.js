import { render, screen } from "../../../helpers/test-utils";
import Post from "../Post";
import { setUserData } from "../../../hooks/user.actions";
import postFixtures  from "../../../helpers/fixtures/post";
import userFixtures from "../../../helpers/fixtures/user";

const userData = userFixtures();
const postData = postFixtures(true, false, userData);

beforeEach(() => {
    // to fully reset the state between __test__, clear the storage
    localStorage.clear();
    // and reset all mocks
    jest.clearAllMocks();
    
    setUserData({
        user: userData,
        access: null,
        refresh: null,     
    });
    
    
    // the beforeEach method: is a jest method that runs before every test.it 
    // takes a callback functions as a parameter, where you can exceute lines of code that should run before the test. 

    // Also! we clear the local storage first to avoild memory leaking (with localStorage.clear) and what did i mean by to avoild memory leaking, a memory leak occur when a program create a memory in heap and forgets to delete it. if too much memory is allocated and not used correctly. this can reduce your computer performance.
});
test("render Post component", ()=> {
        render(<Post post={postData} />);
        const postElement = screen.getByTestId("post-test")
        expect(postElement).toBeInTheDocument();
})

