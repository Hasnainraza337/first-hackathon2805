import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Divider, Form, Input, Row, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'

const { Title } = Typography

const initialState = { courseName: "", type: "", Duration: "", courseCode: "", description: "" }

export default function UpdateCourses() {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const getCourse = useCallback(async () => {

    const docRef = doc(firestore, "Courses", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const course = docSnap.data()
      setState(course)
    } else {
      // docSnap.data() will be undefined in this case
      message.error("Course not found")
    }
  }, [params.id])

  useEffect(() => {
    getCourse()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let { courseName, type, Duration, courseCode, description } = state

    const course = {
      ...state,
      courseName, type, Duration, courseCode, description,
      dateModified: new Date().getTime(),

    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Courses", course.id), course);
      setState(course);
      message.success("Course updated successfully")
      form.resetFields()
      navigate("/courses")
    } catch (e) {
      console.error("Error adding Course: ", e);
    }
    setIsProcessing(false)
  }

  const [form] = Form.useForm();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4">
              <Title level={2} className='m-0 text-center'>Update Course</Title>

              <Divider />

              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Course Name">
                      <Input placeholder='CourseName' value={state.courseName} name='courseName' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Type">
                      <Input placeholder='type' value={state.type} name='type' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Duration">
                      <Input placeholder='Duration' value={state.Duration} name='Duration' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="CourseCode">
                      <Input placeholder='Course Code' value={state.courseCode} name='courseCode' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Description">
                      <Input placeholder='Description' value={state.description} name='description' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Update Course</Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



