import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/user.actions"; 


const LoginForm = () => {
  // const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget; 
    
    if (loginForm.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return; // Stop execution if form is invalid
    }
    
    setValidated(true);
    
    const data = {
      email: form.email,
      password: form.password,
    };

    /**  This is where a refactoring come in hand 1.e instead of repeating the same code across the code base, i decide to follow the Don’t Repeat Yourself (DRY) rule. For example, i use the same code to store tokens and user information for the LoginForm that have been define in react custom hooks user.actions.js 
 */

    userActions.login(data)
    .catch((err) =>{
      if (err.message) {
        setError(err.request.response);
      }
    });


    // console.log("Logging in with:", data);

    // axios.post("http://localhost:8000/api/auth/login/", data)
    //   .then((res) => {
    //     console.log("Login successful:", res.data);
    //     // Store the account and token in localStorage
    //     localStorage.setItem("auth", JSON.stringify({
    //       access: res.data.access,
    //       refresh: res.data.refresh,
    //       user: res.data.user,
    //     }));
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     console.error("Login error:", err);
    //     console.error("Error response:", err.response?.data);
    //     if (err.response?.data) {
    //       // Display backend error messages
    //       setError(JSON.stringify(err.response.data));
    //     } else if (err.message) {
    //       setError(err.message);
    //     }
    //   });
  };

  return (

    
    <Form
      id="login-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      data-testid="login-form"
    >
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="email"
          placeholder="Enter Email"
          data-testid="email-field" 

        />
        <Form.Control.Feedback type="invalid">
          This field is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={form.password}
          minLength="8"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Password"
          data-testid="password-field"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password (minimum 8 characters).
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-content text-danger mb-3">
        {error && <p>{error}</p>}
      </div>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;