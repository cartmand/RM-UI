import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserData from './user_data'
import { getUserData } from '../../Redux/User_data/user_data_actions'
import { Row, Col, Tabs, Tab, Button } from 'react-bootstrap'
import { get_config } from '../Config'
import { GoogleLogout } from 'react-google-login'
import { logOut } from '../../Redux/Google_login/google_actions'
import Quizzes from './quizzes'
import Items from './items'

function MyAccountPage() {
  const dispatch = useDispatch()
  const isLogin = useSelector((state) => state.google_json.isLogin)
  const google_json = useSelector((state) => state.google_json.data)
  const user_name = isLogin ? google_json.profileObj.givenName : null
  const img = isLogin ? google_json.profileObj.imageUrl : null
  const logout = () => {
    dispatch(logOut())
  }
  return (
    <>
      {!isLogin && <h1>Please Login</h1>}
      {isLogin && (
        <>
          <Row>
            <Col md='1' />
            <Col md='10'>
              <h1>Welcome {user_name}</h1>
              <img src={img} alt='Profile Pic' style={{ borderRadius: 50 }}></img>
            </Col>
            <Col md='1' className='text-right'>
              {isLogin ? (
                <GoogleLogout
                  clientId={get_config('application_client_id')}
                  buttonText='Logout'
                  onLogoutSuccess={logout}
                />
              ) : null}
              <Button onClick={() => dispatch(getUserData({ user_id: google_json.profileObj.email }))}>
                <i className='fas fa-sync-alt'></i>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md='2' />
            <Col md='8'>
              <Tabs defaultActiveKey='Info' transition={false} id='user-page'>
                <Tab eventKey='Info' title='Info'>
                  <UserData />
                </Tab>
                <Tab eventKey='Quizzes' title='Quizzes'>
                  <Quizzes />
                </Tab>
                <Tab eventKey='Items' title='Items'>
                  <Items />
                </Tab>
              </Tabs>
            </Col>
            <Col md='1'></Col>
            <Col md='1' />
          </Row>
        </>
      )}
    </>
  )
}

export default MyAccountPage