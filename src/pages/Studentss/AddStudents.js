import React, { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Divider, Form, Input, Row, Typography, message, Select } from 'antd'
const { Option } = Select;

const { Title } = Typography

const initialState = { fullName: "", email: "", phoneNumber: "", course: "", rollNumber: "" }



export default function AddStudents() {



    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    const handleChange1 = (field, value) => setState((prevState) => ({ ...prevState, [field]: value }));


    const handleSubmit = async (e) => {
        e.preventDefault()

        let { fullName, email, phoneNumber, course, rollNumber } = state



        const studentData = {
            fullName, email, phoneNumber, course, rollNumber,
            dateCreated: new Date().getTime(),
            id: Math.random().toString(36).slice(2),

        }
        // console.log(productdata)
        setIsProcessing(true)
        createStudentData(studentData)

    }


    const createStudentData = async (studentData) => {
        try {
            await setDoc(doc(firestore, "Students", studentData.id), studentData);
            message.success("A new Student added successfully")
            form.resetFields()
            navigate("/students")

        } catch (e) {
            console.error("Error adding student: ", e);
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
                            <Title level={2} className='m-0 text-center'>Add Student</Title>

                            <Divider />

                            <Form form={form} layout="vertical">
                                <Row gutter={16}>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Full Name">
                                            <Input placeholder='FullName' name='fullName' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Email">
                                            <Input placeholder='Email' name='email' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Phone Number">
                                            <Input placeholder='Phone Number' name='phoneNumber' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    {/* <Col xs={24} lg={12}>
                                        <Form.Item label="Course">
                                            <Input placeholder='Course Name' name='course' onChange={handleChange} />
                                        </Form.Item>
                                    </Col> */}
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Course">
                                            <Select
                                                placeholder="Select a course"
                                                name="course"
                                                onChange={(value) => handleChange1('course', value)}
                                            >
                                                <Option value="Web and Mobile Application">Web and Mobile Application</Option>
                                                <Option value="Graphic Designing">Graphic Designing</Option>
                                                <Option value="Video Animation">Video Animation</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} lg={12}>
                                        <Form.Item label="Roll No">
                                            <Input placeholder='Roll Number' name='rollNumber' onChange={handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={{ span: 12, offset: 6 }} lg={{ span: 8, offset: 8 }} >
                                        <Button type='primary' htmlType='submit' className='w-100' loading={isProcessing} onClick={handleSubmit}>Add Student</Button>
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
