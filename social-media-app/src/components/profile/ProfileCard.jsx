import React from 'react'
import { Card, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { randomAvatar } from '../../utils';



// ProfileCard component to display user profile information
// The ProfileCard component will be used to display information about a profile and redirect the user to the profile page.

// ***********.................. ProfileCard Component ..........*********** //
// I retrieved the user object from the props and also added a function to handle the navigation to the user profile.
// Props: user - The user object containing profile information 
// like id, name, avatar, bio, etc.
// Functionality:
// Displays user's avatar, name, and bio.
// On clicking the card or a button, navigates to the user's profile page.

// *************************************************************************** //
const ProfileCard = (props) => {

    const navigate = useNavigate();

    const { user } = props;
    const handleNavigateToProfile = () => {

    navigate(`/profile/${user.id}/`);
  };
  const variants = ['Primary', 'Danger', 'Light', 'Dark'];
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];
  
  const avatarUrl = user.avatar || randomAvatar(user.id);

  return (
    <>
        <Card data-testid="profile-card"
          bg={randomVariant.toLowerCase()}
          key={randomVariant}
          text={randomVariant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '28rem', cursor: 'pointer' }}
          className="mb-2"
          onClick={handleNavigateToProfile}
          
        >
          
            <div className='border-0 p-2'>
                <Image
                src={avatarUrl}
                roundedCircle
                width={48}
                height={48}
                className='me-2 border border-primary border-2'
                />

            </div>
          <Card.Header>{user.bio} 
          </Card.Header>
          
          <Card.Body onClick={handleNavigateToProfile} style={{ cursor: 'pointer' }} >
            
            <Card.Title
            className='fs-6'>{user.name}</Card.Title>
            
            <Card.Text>
              <Button variant="light" onClick={handleNavigateToProfile}>
                view Profile

              </Button>
            </Card.Text>
           
          </Card.Body>
        </Card>
    </>
  )
}

export default ProfileCard
