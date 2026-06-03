import React, { useState, useContext } from "react";
import { Button, Form, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { randomAvatar } from "../../utils";
import { Context } from "../Layout";

function CreateComment(props) {
    const { postId, refresh } = props;
    // const [avatar, setAvatar] = useState(randomAvatar());
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({
        author: "",
        body: "",
        post: "",
    });

    const { setToaster } = useContext(Context);
    const user = getUser();

    // const handleClose = () => setShow(false);

    // const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const createPostForm = event.currentTarget;

        if (createPostForm.checkValidity() === false) {
            event.stopPropagation();

            setValidated(true)
            return; // dont proceed if form is invalid 
        }

        const data = {
            author: user.id,
            body: form.body,
            post: postId,
        };

        axiosService.post(`/api/post/${postId}/comment/`, data)
        .then(() =>{
            // handleClose();
            setForm({...form, body: "" });
            setToaster({
                type: "success",
                message: "Comment Success successfully 🚀",
                show: true,
                title: "Comment!",        
            });
            refresh()
        })
        .catch(()=>{
            setToaster({
                type: "danger",
                message: "An error occurred",
                show: true,
                title: "Post Error",
            });
        });

    };
    const avatarUrl = user.avatar || randomAvatar(user.id);
    return (
        <Form
        className="d-flex flex-row justify-content-between"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        data-testid="create-comment-test"
      >
        <Image
          src={avatarUrl}
          roundedCircle
          width={48}
          height={48}
          className="my-2"
        />
        <Form.Group className="m-8 w-75">
          <Form.Control
            className="py-2 rounded-pill border-primary"
            type="text"
            data-testid="comment-body-field"
            placeholder="Write a comment"
            value={form.body}
            name="body"
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </Form.Group>
        <div className="m-auto">
          <Button
            variant="primary"
            data-testid="create-comment-submit"
            onClick={handleSubmit}
            disabled={!form.body}
            size="small"
          >
            Comment
          </Button>
        </div>
      </Form>

    );

}
export default CreateComment;