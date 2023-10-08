import React, { useEffect, useState } from 'react'
import { Tabs, TabPanel } from 'react-tabs';
import { PiStudentDuotone } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space, Tooltip, } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useStudentContext } from '../../contexts/StudentContext';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';


export default function DashboardTab() {

    const { Students, deleteStudent } = useStudentContext()
    const [Status, setStatus] = useState([]);
    const navigate = useNavigate()

    const studentStatusCollection = collection(firestore, 'studentStatus'); // Replace 'studentStatus' with your desired Firestore collection name


    useEffect(() => {
        const getStatusData = async () => {
            try {
                const statusDoc = await getDoc(doc(firestore, 'studentStatus', 'statusData')); // Replace 'statusData' with your desired document ID
                if (statusDoc.exists()) {
                    setStatus(statusDoc.data().status || []);
                } else {
                    // Initialize Status array with default values if the document doesn't exist
                    const initialStatus = Array(Students.length).fill('');
                    setStatus(initialStatus);
                }
            } catch (error) {
                console.error('Error getting status data from Firestore:', error);
            }
        };

        getStatusData();
    }, [Students, firestore]);


    const handleStatusChange = async (index, newStatus) => {
        const updatedStatusArray = [...Status];
        updatedStatusArray[index] = newStatus;
        setStatus(updatedStatusArray);

        try {
            // Update status in Firestore
            await setDoc(doc(firestore, 'studentStatus', 'statusData'), {
                status: updatedStatusArray,
            });
            console.log('Status updated in Firestore.');
        } catch (error) {
            console.error('Error updating status data in Firestore:', error);
        }
    };



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div>
                            <Tabs defaultIndex={0} >

                                {/* Students  */}
                                <TabPanel>
                                    <div className=''>
                                        <h1 className=' text-center mb-5 '><u>Students Details</u></h1>
                                        <div className="d-flex justify-content-end mb-2">
                                            <Link to="/studentss/addstudents">
                                                <button
                                                    className="btn btn-info">
                                                    <div className="d-flex align-items-center">
                                                        Add Student <PiStudentDuotone size={20} />
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>RollNumber</th>
                                                        <th>FullName</th>
                                                        <th>Email</th>
                                                        <th>PhoneNumber</th>
                                                        <th>Course</th>
                                                        <th>Status</th>
                                                        <th>Attendance</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {Students.map((student, i) => {
                                                    const { fullName, email, phoneNumber, course, rollNumber, } = student;
                                                    return (

                                                        <tbody key={i}  >


                                                            <tr>
                                                                <td className="" style={{ verticalAlign: "middle" }}>
                                                                    {i + 1}.
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }} >
                                                                    {rollNumber}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {fullName}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {email}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {phoneNumber}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {course}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    {Status[i]}
                                                                </td>
                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    <Space>
                                                                        <Tooltip color='red'>
                                                                            <Button
                                                                                danger
                                                                                onClick={() => handleStatusChange(i, 'Absent')} // Handle Absent button click
                                                                                disabled={Status[i] === 'Absent'} // Disable the button if status is already Absent
                                                                            >
                                                                                Absent
                                                                            </Button>
                                                                        </Tooltip>
                                                                        <Tooltip color='primary'>
                                                                            <Button
                                                                                type="primary"
                                                                                onClick={() => handleStatusChange(i, 'Present')} // Handle Present button click
                                                                                disabled={Status[i] === 'Present'} // Disable the button if status is already Present
                                                                            >
                                                                                Present
                                                                            </Button>
                                                                        </Tooltip>
                                                                    </Space>
                                                                </td>


                                                                <td style={{ verticalAlign: "middle" }}>
                                                                    <div className=" d-flex">
                                                                        <div className="d-flex">
                                                                            <Space>
                                                                                <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => deleteStudent(student)} /></Tooltip>
                                                                                <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => { navigate(`/studentss/studentss/${student.id}`) }} /></Tooltip>
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





