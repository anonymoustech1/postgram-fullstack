import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../hooks/user.actions";

/* we declare the states and functions we'll use in the component */
const RegistrationForm = () => {
  // const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({

    username: "", // Fixed typo: was "usename"
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;
    
    // StopPropagation():  When the form is invalid, stopPropagation() prevents the submit event from continuing to other components or handlers. This avoids unwanted behavior and ensures only the validation runs.
    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return; // Stop execution if form is invalid
    }
    
    setValidated(true);
    
    const data = {
      username: form.username,
      password: form.password,
      email: form.email,
      first_name: form.first_name, // Fixed: was form.email
      last_name: form.last_name,
      bio: form.bio
    };

    userActions.register(data).catch((err) => {
      if (err.message) {
        setError(err.request.response);
      }
    });
  };

  //   // The next step is to use axios to make a Post request to the API:
  //   axios.post("http://localhost:8000/api/auth/register/", data) // Fixed port: 800 -> 8000
  //     .then((res) => {
  //       // Registering the account and token in the store
  //       localStorage.setItem("auth", JSON.stringify({
  //         access: res.data.access,
  //         refresh: res.data.refresh,
  //         user: res.data.user,
  //       }));
  //       navigate("/")
  //     })
  //     .catch((err) => {
  //       if (err.message) {
  //         setError(err.request.response);
  //       }
  //     });
  // };

  return (
    <Form 
      id="registration-form" 
      className="border p-4 rounded" 
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          value={form.first_name}
          onChange={(e) => setForm({...form, first_name: e.target.value })}
          required
          type="text"
          placeholder="Enter first name"
        />
        <Form.Control.Feedback type="invalid">
          This field is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
          value={form.last_name}
          onChange={(e) => setForm({...form, last_name: e.target.value})}
          required
          type="text"
          placeholder="Enter last name"
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          value={form.username}
          onChange={(e) => setForm({...form, username: e.target.value})}
          required
          type="text"
          placeholder="Enter username"
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
          required
          type="email"
          placeholder="Enter email"
        />
        <Form.Control.Feedback type="invalid">
          This field is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
          required
          type="password"
          placeholder="Enter password"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Bio</Form.Label>
        <Form.Control 
          value={form.bio}
          onChange={(e) => setForm({...form, bio: e.target.value})}
          as="textarea"
          rows={3}
          placeholder="A simple bio... (Optional)"
        />
      </Form.Group>

      <div className='text-content text-danger'>
        {error && <p>{error}</p>}
      </div>

      <Button className="btn btn-primary" type='submit'>
        Submit
      </Button> 
    </Form>
  );
};

export default RegistrationForm;