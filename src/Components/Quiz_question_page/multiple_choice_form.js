import React from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Button, ListGroup, Row, Col, Form } from 'react-bootstrap'

function MultipleChoiceForm() {
  const { watch, control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'quiz_question.item_choices' })
  const from_data = watch({ nest: true })
  console.log(from_data.quiz_question)
  return (
    <>
      {watch('quiz_question.tags.item_type') === 'Multiple Choice' ? (
        <>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col md='2' />
                <Col md='6' className="h4">Item Choices</Col>
                <Col md='3'>Check Correct Answer(s)</Col>
                <Col md='1'>
                  <Button
                    type='button'
                    onClick={() => {
                      append({ choice: '', correct: false })
                    }}>
                    <i className='fas fa-plus'></i>
                  </Button>{' '} Add
                </Col>
              </Row>
            </ListGroup.Item>
            {fields.map((item, index) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md='2'>Choice {index + 1}</Col>
                  <Col md='6'>
                    <Controller
                      as={<Form.Control as='textarea' rows='2' />}
                      autoComplete='off'
                      name={`quiz_question.item_choices[${index}].choice`}
                      control={control}
                      defaultValue={item.choice}
                    />
                  </Col>
                  <Col md='3'>
                    <Controller
                      as={<input type='checkbox' className='double' />}
                      name={`quiz_question.item_choices[${index}].correct`}
                      defaultValue={item.correct}
                      control={control}
                    />
                  </Col>
                  <Col md='1'>
                    <Button type='button' onClick={() => remove(index)}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : null}
    </>
  )
}

export default MultipleChoiceForm
