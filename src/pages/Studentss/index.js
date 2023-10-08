import React from 'react'
import AddStudents from './AddStudents'
import { Route, Routes } from 'react-router-dom'
import UpdateStudents from './UpdateStudents'
// import Nopage from 'pages/Frontend/Nopage'

export default function index() {
    return (
        <>
            <main className='students'>
                <Routes>
                    <Route path='addStudents' element={<AddStudents />} />
                    <Route path='/studentss/:id' element={<UpdateStudents />} />
                    {/* <Route path='*' element={<Nopage />} /> */}
                </Routes>
            </main>
        </>
    )
}
