import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Divider, Form, Input, Row, Typography, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'

const { Title } = Typography

const initialState = { fullName: "", email: "", phoneNumber: "", course: "", rollNumber: "" }

export default function UpdateStudents() {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const getStudent = useCallback(async () => {

    const docRef = doc(firestore, "Students", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const student = docSnap.data()
      setState(student)
    } else {
      // docSnap.data() will be undefined in this case
      message.error("Student not found")
    }
  }, [params.id])

  useEffect(() => {
    getStudent()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let { fullName, email, phoneNumber, course, rollNumber } = state

    const student = {
      ...state,
      fullName, email, phoneNumber, course, rollNumber,
      dateModified: new Date().getTime(),

    }

    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "Students", student.id), student);
      setState(student);
      message.success("Student updated successfully")
      form.resetFields()
      navigate("/students")
    } catch (e) {
      console.error("Error adding Student: ", e);
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
              <Title level={2} className='m-0 text-center'>Update Student</Title>

              <Divider />

              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Full Name">
                      <Input placeholder='FullName' value={state.fullName} name='fullName' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Email">
                      <Input placeholder='Email' value={state.email} name='email' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Phone Number">
                      <Input placeholder='Phone Number' value={state.phoneNumber} name='phoneNumber' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Course">
                      <Input placeholder='Course Name' value={state.course} name='course' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Form.Item label="Roll No">
                      <Input placeholder='Roll Number' value={state.rollNumber} name='rollNumber' onChange={handleChange} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                    <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Update Student</Button>
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



