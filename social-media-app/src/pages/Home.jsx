import React from 'react';
import Layout from '../components/Layout';
import { Row, Col, Image } from 'react-bootstrap';
import { randomAvatar } from '../utils';
import useSWR from "swr";
import { getUser } from '../hooks/user.actions';
import CreatePost from '../components/posts/CreatePost';
import Post from "../components/posts/Post";
import { fetcher } from '../helpers/axios';
import ProfileCard from "../components/profile/ProfileCard";

const Home = () => {
  
  const posts = useSWR("/api/post/", fetcher, {
    refreshInterval: 20000,
  });

  const profiles = useSWR("/api/user/?page_size=4", fetcher);

  // const { data, mutate } = useSWR(user ? "/api/post/" : null, fetcher, {
  //   refreshInterval: 20000,
  // });
  const user = getUser();


  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Row className='justify-content-evently'>
        <Col sm={8}>
          <Row className='border rounded align-items-center'>
            <Col className='flex-shrink-1'>
              <Image
                src={user.avatar || randomAvatar(user.id)}
                roundedCircle
                width={52}
                height={52}
                className='my-2'
              />
            </Col>
            <Col sm={10} className='flex-grow-1'>
              <CreatePost refresh={posts.mutate}/>
            </Col>
          </Row>
          <Row className='my-4'>
        {posts.data?.results.map((post, index) => (
          <Post key={index.id} post={post} refresh={posts.mutate} />
        ))}
      </Row>
      </Col>
      <Col sm={4} className="border rounded py-4 h-50" style={{boxSizing:"border-box"}}>
      <h4 className='font-weight-bold text-center'>
        Suggested people</h4>
        <div className='d-flex flex-column'>
          {profiles.data &&
           profiles.data.results.map((profile, index) => (
            <ProfileCard key={index} user={profile} />
          ))}

        </div>
       </Col>
        
      </Row>
      
    </Layout>
  );
}

export default Home;
