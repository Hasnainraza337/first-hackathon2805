import React from 'react'
import AddCourses from './AddCourses'
import { Route, Routes } from 'react-router-dom'
import UpdateCourses from './UpdateCourses'
// import Nopage from 'pages/Frontend/Nopage'

export default function index() {
    return (
        <>
            <main className='students'>
                <Routes>
                    <Route path='addCourses' element={<AddCourses />} />
                    <Route path='/coursess/:id' element={<UpdateCourses />} />
                    {/* <Route path='*' element={<Nopage />} /> */}
                </Routes>
            </main>
        </>
    )
}
