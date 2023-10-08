import React, { useState } from 'react'
import { Button, Col, Divider, Form, Input, Row, Typography, message } from 'antd'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const initialState = { courseName: "", type: "", Duration: "", courseCode: "", description: "" }



export default function AddCourses() {


    // const { user } = useAuthContext()
    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()

        let { courseName, type, Duration, courseCode, description } = state



        const courseData = {
            courseName, type, Duration, courseCode, description,
            dateCreated: new Date().getTime(),
            id: Math.random().toString(36).slice(2),

        }
        // console.log(productdata)
        setIsProcessing(true)
        createCourseData(courseData)

    }


    const createCourseData = async (courseData) => {
        try {
            await setDoc(doc(firestore, "Courses", courseData.id), courseData);
            message.success("A new Course added successfully")
            form.resetFields()
            navigate("/courses")

        } catch (e) {
            console.error("Error adding course: ", e);
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
                            <Title level={2} className='m-0 text-center'>Add Course</Title>

                            <Divider />

                            <Form form={form} layout="vertical">
                                <Row gutter={16}>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Course Name">
                                            <Input placeholder='CourseName' name='courseName' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Type">
                                            <Input placeholder='type' name='type' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Duration">
                                            <Input placeholder='Duration' name='Duration' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="CourseCode">
                                            <Input placeholder='Course Code' name='courseCode' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Description">
                                            <Input placeholder='Description' name='description' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                                        <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Add Course</Button>
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
