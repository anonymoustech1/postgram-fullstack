import { render, screen } from "../../../helpers/test-utils";
import TestRenderer from "react-test-renderer";
import ProfileCard from "../ProfileCard";
import { BrowserRouter } from "react-router-dom";

const userData = {
    id: "0590cd67-eacd-4299-8413-605bd547ea17",
    first_name: "odunayo",
    last_name: "christian",
    name: "odunayo Chris",
    post_count: 3,
    email: "christiandelson293@gmail.com",
    bio: "lead software engineering ",
    username: "christiandelson",
    avatar: null,
    created: "2026-03-19T17:31:03.310Z",
    updated: "2026-03-20T07:38:47.631Z",
};

test("Render ProfileCard component", () => {
    render(<ProfileCard user={userData} />);
    
    const profileCard = screen.getByTestId("profile-card")
    expect(profileCard).toBeInTheDocument();


    const nameElement = screen.getByText(userData.name);
    expect(nameElement).toBeInTheDocument();

});

test("Profile Card snapshot", () => {
    const profileCardDomTree = TestRenderer.create(
        <BrowserRouter>
        <ProfileCard user={userData} />
        </BrowserRouter>
    ).toJSON();
    expect(profileCardDomTree).toMatchSnapshot();
});