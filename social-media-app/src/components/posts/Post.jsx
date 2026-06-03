import React, {useState, useContext } from "react";
import { format } from "timeago.js";
import { LikeFilled, CommentOutlined, LikeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdatePost from "./UpdatePost";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";
import { randomAvatar } from "../../utils";
import Toaster from "../Toaster";


 export function Post(props) {
  const { post, refresh, isSinglePost } = props;
  const { setToaster } = useContext(Context);
  
  const [showToast, setShowToast] = useState(false);

  const user = getUser();

  const handleLikeClick = (action) => {
    console.log('Like action:', action, 'Post ID:', post.id) // Debug log
    
    axiosService
      .post(`/api/post/${post.id}/${action}/`)
      .then((response) => {
        console.log('Like successful:', response.data) // to see the log in the console.
        refresh();
      })
      .catch((err) =>{
      console.error('Like error:', err);
      console.error('Error response:', err.response);
      });
  };

  const handleDelete = () => {
    axiosService
      .delete(`/api/post/${post.id}/`)
      .then(() => {
        setShowToast(true);
        setToaster({
          type: "warning",
          message: "Post deleted 🚀",
          show: true,
          title: "Post Deleted",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Post Error",
        });
      });
  };
const avatarUrl = post?.author?.avatar || (post?.author?.id ? randomAvatar(post.author.id): null);
  return (
    <>
      <Card className="rounded-3 my-4" data-testid="post-test">
        <Card.Body>
          <Card.Title className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Image
                // src={post.author.avatar}
                src={avatarUrl}
                roundedCircle
                width={48}
                height={48}
                className="me-2 border border-primary border-2"
              />
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{post.author.name}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(post.created)}</small>
                </p>
              </div>
            </div>
            
        
            {user.name === post.author.name && ( // If the logged-in user's name matches the post author's name, then show the dropdown menu with delete button
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={MoreToggleIcon}>

                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <UpdatePost post={post} refresh={refresh} />

                    <Dropdown.Item
                      onClick={handleDelete}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <LikeFilled
                style={{
                  color: "#fff",
                  backgroundColor: "#0D6EFD",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "75%",
                  padding: "2px",
                  margin: "3px",
                }}
              />
              <p className="ms-1 fs-6">
                <small>{post.likes_count} like</small>
              </p>
            </div>
            {/* {!isSinglePost && (
              <p className="ms-1 fs-6">
                <small>
                  <Link to={`/post/${post.id}/`} >
                    {post.comments_count} comments
                  </Link>
                </small>
              </p>
            )} */}
          </div>
        </Card.Body>

        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">

          <div 
          className="d-flex flex-row"
          style={{ cursor: 'pointer' }}
          onClick={()=>{
            if (post.liked){
              handleLikeClick("remove_like");
            }else{
              handleLikeClick("like");
            }
          }}
          >
            <LikeOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: post.liked ? "#0D6EFD" : "#C4C4C4",
              }}
              // onClick={() => {
              //   if (post.liked) {
              //     handleLikeClick("remove_like");
              //   } else {
              //     handleLikeClick("like");
              //   }
              // }}
            />
            <p className="ms-1">
              <small>Like</small>
            </p>
          </div>
          {!isSinglePost && (
            <div className="d-flex flex-row">
              <CommentOutlined
                style={{
                  width: "24px",
                  height: "24px",
                  padding: "2px",
                  fontSize: "20px",
                  color: "#c4c4c4ff",
                }}
                
              />
    
              {!isSinglePost && (
              <p className="ms-1 fs-6">
                <small text>
                  <Link to={`/post/${post.id}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {post.comments_count} comments
                  </Link>
                </small>
              </p>
            )}
            
            </div>
          )}
        </Card.Footer>
      </Card>
      <Toaster
      title="Post!"
      message="Post deleted"
      type="danger"
      showToast={showToast}
      onClose={()=> setShowToast(false)}
      />
    </>
  );
}

export default Post;
