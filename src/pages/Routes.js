import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Studentss from './Studentss'
import Coursess from './Coursess'
// import Auth from '../pages/Auth'
// import PrivateRoute from '../components/PrivateRoute'
export default function Index() {
    // const { isAuth } = useAuthContext()
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='/studentss/*' element={<Studentss />} />
                <Route path='/coursess/*' element={<Coursess />} />
                {/* <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} /> */}
            </Routes>

        </>
    )
}
