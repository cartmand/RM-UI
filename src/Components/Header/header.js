import React, { useState } from 'react'
import { Nav, Navbar, Col, Form, FormControl, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getQuiz } from '../../Redux/Quiz_question/quiz_question_actions'
import GoogleLogin from './google_login'
import * as yup from 'yup'

//import { rmCoursesShow, rmCoursesHide } from '../../Redux/RM-courses_init/rm_courses_init_actions'
//import { dataLoadedOff } from '../../Redux/Ramadan_quiz_results/indivisual_actions'

function Header() {
  let history = useHistory()
  const [expanded, setexpanded] = useState(false)
  const keyword_quiz_search_valid_header = yup.object().shape({
    keyword: yup.string().required()
  })
  const keyword_quiz_search_header = useForm({
    defaultValues: {
      keyword: ''
    },
    validationSchema: keyword_quiz_search_valid_header
  })

  const { handleSubmit, errors, register, reset } = keyword_quiz_search_header
  const dispatch = useDispatch()
  const onSubmit = (form_data) => {
    dispatch(getQuiz(form_data))
    reset()
    history.push('/searchquiz')
  }
  return (
    <>
      <Navbar expanded={expanded} style={{ backgroundColor: 'green' }} expand='lg' variant='dark'>
        <Col md='2' />
        <Navbar.Brand target='_blank' href='https://reliabilitymeasures.com/'>
          Reliability Measures
        </Navbar.Brand>
        <Navbar.Toggle
          onClick={() => setexpanded((prevExpanded) => (prevExpanded = !prevExpanded))}
          aria-controls='basic-navbar-nav'
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto' onClick={() => setexpanded(false)}>
            <Link className='text-light nav-link' to='/'>
              Home
            </Link>
            {/* <Link className='text-light nav-link' to='/analyze'>
              Analyze Test
            </Link> */}
            <Link className='text-light nav-link' to='/createquestion'>
              Create Items
            </Link>
            <Link className='text-light nav-link' to='/createquiz'>
              Create Quiz
            </Link>
            <Link className='text-light nav-link' to='/searchquiz'>
              Search Quizzes
            </Link>
            <Link className='text-light nav-link' to='/ramadan'>
              Ramadan Quiz Results
            </Link>

            {/* <NavDropdown title={<span className='text-light my-auto'>Courses</span>} id='basic-nav-dropdown'>
              <NavDropdown.Item
                as={Link}
                to='/courses'
                onClick={() => {
                  dispatch(rmCoursesShow())
                }}>
                Google Classroom Courses
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to='/courses'
                onClick={() => {
                  dispatch(rmCoursesHide())
                }}>
                R-M Courses (samples)
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form inline onSubmit={handleSubmit(onSubmit)} style={{ paddingRight: 10 }}>
            {errors.keyword && (
              <p className='text-danger' style={{ paddingRight: 10 }}>
                Can Not Leave Empty
              </p>
            )}
            <FormControl type='text' placeholder='Search Quizzes' className='mr-sm-2' name='keyword' ref={register} />
            <Button variant='outline-light' type='submit'>
              Search
            </Button>
          </Form>
          <div onClick={() => setexpanded(false)}>
            <GoogleLogin />
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
