import React, { useState } from 'react';

// Pages
import Students from "../Frontend/Students"
import Courses from "../Frontend/Courses"
import Home from './Home';


import { TbLayoutDashboard } from 'react-icons/tb';
import { PiStudentDuotone } from 'react-icons/pi';
import { GiDiploma } from 'react-icons/gi';
// import { FaSignOutAlt } from 'react-icons/fa';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, theme, Layout, Menu } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const Sidebar = () => {

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <>
            <main style={{ width: "100%", height: "100vh" }}>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col p-0">
                            <Layout style={{ height: "100vh" }} >
                                <Sider
                                    id='sider-scroll'
                                    style={{
                                        borderRadius: "2px",

                                    }}
                                    trigger={null} collapsible collapsed={collapsed}
                                >


                                    <div className='sider-top'>
                                        <h4 className='menu ms-2 mb-5 mt-2 text-white'>Menu</h4>
                                    </div>

                                    <div className="demo-logo-vertical" />
                                    <Menu
                                        theme="dark"
                                        mode="inline"
                                        defaultSelectedKeys={['/']}
                                        items={[

                                            {
                                                key: '/',
                                                icon: <TbLayoutDashboard style={{ fontSize: "22" }} />,
                                                label: <Link to='/dashboard' className='text-decoration-none'>Dashboard</Link>
                                            },
                                            {
                                                key: '/students',
                                                icon: <PiStudentDuotone style={{ fontSize: "22" }} />,
                                                label: <Link to='/students' className='text-decoration-none'>Students</Link>
                                            },
                                            {
                                                key: '/courses',
                                                icon: <GiDiploma style={{ fontSize: "22" }} />,
                                                label: <Link to='/courses' className='text-decoration-none'>Courses</Link>
                                            },


                                            // {
                                            //     style: { marginTop: "60px" },
                                            //     key: 'login',
                                            //     icon: <FaSignOutAlt />,
                                            //     label: <Link to="/auth/login" style={{ textDecoration: "none" }} >Sign out</Link>
                                            // },
                                        ]}
                                    />

                                </Sider>

                                <Layout >
                                    <Header
                                        style={{
                                            marginTop: "20px",
                                            padding: "0 0 0 5px",
                                            display: "flex",
                                            alignItems: "center",
                                            // backgroundColor: "#fafafa"
                                            backgroundColor: colorBgContainer
                                        }}
                                    >
                                        <Button
                                            type="text"
                                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                            onClick={() => setCollapsed(!collapsed)}
                                            style={{
                                                fontSize: '16px',
                                                width: 64,
                                                height: 64,
                                            }}
                                        />
                                        {/* <h1 className='fw-bold'>Students Management System</h1> */}

                                    </Header>
                                    <Content
                                        id='Content'
                                        style={{

                                            margin: "12px",
                                            padding: 8,
                                            minHeight: 360,
                                            border: "1px solid   #f5f5f5",
                                            borderRadius: "5px",
                                            backgroundColor: "#fafafa",
                                            overflowY: "scroll"


                                        }}
                                    >

                                        <Routes>
                                            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
                                            <Route path='/' element={<Home />} />
                                            <Route path='/students' element={<Students />} />
                                            <Route path='/courses' element={<Courses />} />
                                        </Routes>
                                    </Content>
                                </Layout>
                            </Layout>
                        </div>
                    </div>
                </div>
            </main >


        </>
    );
};
export default Sidebar;