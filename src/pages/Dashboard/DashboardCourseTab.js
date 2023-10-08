import React from 'react'
import { Tabs, TabPanel } from 'react-tabs';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Tooltip, } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useStudentContext } from '../../contexts/StudentContext';
import { GiDiploma } from 'react-icons/gi';

export default function DashboardCourseTab() {

    const { Courses, deleteCourse } = useStudentContext()
    const navigate = useNavigate()


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div>
                            <Tabs defaultIndex={0} >

                                {/* Courses  */}
                                <TabPanel>
                                    <div className=''>
                                        <h1 className=' text-center mb-5 '><u>Courses Details</u></h1>
                                        <div className="d-flex justify-content-end mb-2">
                                            <Link to="/coursess/addcourses">
                                                <button
                                                    className="btn btn-info">
                                                    <div className="d-flex align-items-center">
                                                        Add Course <GiDiploma size={20} />
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>CourseName</th>
                                                        <th>Type</th>
                                                        <th>Duration</th>
                                                        <th>CourseCode</th>
                                                        <th>Description</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {Courses.map((course, i) => {
                                                    const { courseName, type, Duration, courseCode, description, } = course;
                                                    return (

                                                        <tbody key={i}  >


                                                            <tr>
                                                                <td className="" style={{ verticalAlign: "middle" }}>
                                                                    {i + 1}.
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }} >
                                                                    {courseName}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {type}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {Duration}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {courseCode}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {description}
                                                                </td>

                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    <div className=" d-flex">
                                                                        <div className="d-flex">
                                                                            <Space>
                                                                                <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => deleteCourse(course)} /></Tooltip>
                                                                                <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/coursess/coursess/${course.id}`) }} /></Tooltip>
                                                                            </Space>

                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    )
                                                })}

                                            </table>
                                        </div>
                                    </div>
                                </TabPanel>

                            </Tabs>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}





