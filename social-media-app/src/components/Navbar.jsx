import React from "react";
import { randomAvatar } from "../utils";
import { Navbar, Container, Image, NavDropdown, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUser } from "../hooks/user.actions";
// import { Context } from "./Layout";

function Navigationbar() {
    const { setToaster } = useContext(context);
    const user = getUser()
    const userActions = useUserActions();

    const navigate = useNavigate();

    const handleLogout = () => {
//         localStorage.removeItem("");
//         navigate("/login/");
        userActions.logout().catch((e) =>
        setToaster({
            type: "danger",
            message: "Logout failed",
            show: true,
            title: e.data?.detail | "An error occurred.",
            })
        )
    };

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand className="fw-bold" href="#home">
                    Emrysgram

                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown
                        title={
                            <Image 
                            src={user.avatar || randomAvatar()}
                            roundedCircle
                            width={36}
                            height={36}
                            />
                        }
                        >
                            <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>
                            Profile

                            </NavDropdown.Item>

                            <NavDropdown.Item onClick={userActions.logout}>
                                logout
                            </NavDropdown.Item>

                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}
export default Navigationbar;