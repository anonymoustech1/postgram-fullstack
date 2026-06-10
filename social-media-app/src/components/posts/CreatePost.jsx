import React, { useState } from 'react'
import { Button, Modal, Form, Image } from 'react-bootstrap'
import axiosService from '../../helpers/axios'
import { getUser } from '../../hooks/user.actions'
import Toaster from '../Toaster'
import { randomAvatar } from '../../utils'

const CreatePost = (props) => {
    const { refresh } = props;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = ()=> setShow(true);
    const [validated, setValidated] = useState({});
    const [form, setForm] = useState({
        author: "",
        body: "",
    })
    
    const user = getUser();

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const createPostForm = event.currentTarget;

        if (createPostForm.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        const data = {
            author: user.id,
            body: form.body,
        };
        axiosService.post("/post/", data)
        
        .then(()=>{
            handleClose();
            setToastMessage("Post created 🚀");
            setToastType("success");
            setShowToast(true);

            setForm({});
            // setShowToast(true);
            refresh();

        })
        
        

        .catch((error)=>{
            console.error(
                "Error Creating post:",
                error.response ? error.response.data : error.message
            );
            setToastMessage("An error occurred.");
            setToastType("danger");
            setShowToast(true);
            setToastMessage("An error occurred.");
        });
        
    };
    // const userAvatarUrl = user.avatar || (user?.id ?randomAvatar(user.id) : null);

    const userAvatarUrl = user?.avatar || (user?.id ? randomAvatar(user.id) : null);



  return (
    <>
    <Form.Group className='my-3 w-75'>
        <Form.Control
        className='py-2 rounded-pill border-primary text-primary'
        type='text'
        placeholder='write a post'
        onClick={handleShow}
        data-testid="show-modal-form"

        />

    </Form.Group>
    {/* Add modal code here */}

    {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0'>
            <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>

        <Modal.Body className='border-0'>
            <Form noValidate validated={validated}
            onSubmit={handleSubmit}>
                <Form.Group>

                <Form.Control
                name='body'
                value={form.body}
                onChange={(e) => setForm({...form,
                    body: e.target.value
                })}
                as="textarea"
                rows={3}
                />
                </Form.Group>
            </Form>

        </Modal.Body>
        <Modal.Footer>
            <Button variant='primary'
            onClick={handleSubmit}
            disabled={!form.body === undefined} >
                Post
            </Button>
        </Modal.Footer>

    </Modal> */}

    <Button variant="primary" onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Create Post</Modal.Title>
  </Modal.Header>

  <Modal.Body className='pt-0'>
     <div className='d-flex gap-3'>
         <Image
        src={userAvatarUrl}
        roundedCircle
        width={208}
        height={208}
        className='me-2 border border-primary border-2'
        data-testid="create-post-form"
        />

    </div>

        <div>
            <div 
            className='rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold'
            style={{ width: '48px', height: '48px', flexShrink: 0 }}
            >
            {user && user.email ? user.email.charAt(0).toUpperCase() : 'U'}
        </div>

        </div>
    <div className='flex-grow-1'>
        <div className='mb-2'>
            {/* <span className='fw-semibold'>{user ? user.email : 'User'}</span> */}

             <Form noValidate validated={validated} onSubmit={handleSubmit}>

      <Form.Group >
        <Form.Label>{user?.name}</Form.Label>
        <Form.Control
        name="bodyF"
        value={form.body || ""}
        onChange={(e) => setForm({...form, body: e.target.value})}
        as="textarea"
        rows={6}
        placeholder="What's happening?"
        className='border-0 p-0'
        style={{ 
        resize: 'none',
        fontSize: '1.1rem',
        outline: 'none',
        boxShadow: 'none'

        }}
        data-testid="post-body-field"
        />
      </Form.Group>
      
      
    </Form>

        </div>

    </div>
   
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button 
      variant="primary" 
      onClick={handleSubmit} 
      disabled={!form.body || form.body.trim() === ""}
      data-testid="create-post-submit"    
    >
      Post!
    </Button>
  </Modal.Footer>
</Modal>
    <Toaster
    title="Post!"
    message={toastMessage}
    showToast={showToast}
    type={toastType}
    onClose={()=> setShowToast(false)}
    />
    
    </>
    
  );
}

export default CreatePost;
