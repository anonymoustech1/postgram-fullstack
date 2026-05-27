import React from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../hooks/user.actions";
import { randomAvatar } from "../../utils";

function ProfileDetails(props) {
  const { user } = props;
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }
  const currentUser = getUser();
  console.log("Current User:", currentUser);
  console.log("Profile User:", user);
  console.log(user.id === currentUser.id);
  const avatarUrl = user.avatar || randomAvatar(user.id);


  return (
    <div>
      <div
        className="d-flex flex-row border-bottom p-5"
        data-testid="profile-details"
      >
        <Image
          src={avatarUrl}
          roundedCircle
          width={120}
          height={120}
          className="me-5 border border-primary border-2"
        />
        <div className="d-flex flex-column justify-content-start align-self-center mt-2">
          <p className="fs-4 m-0">{user.name}</p>
          <p className="fs-5">{user.bio ? user.bio : "(No bio.)"}</p>
          <p className="fs-6">
            <small>{user.posts_count} posts</small>
            {/* <p>{user.followers_count} followers</p> */}
          </p>
          {user.id === getUser().id && (
            <Button
              variant="primary"
              size="sm-19"
              className="w-12 mt-4"
              onClick={() => navigate(`/profile/${user.id}/edit/`)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
