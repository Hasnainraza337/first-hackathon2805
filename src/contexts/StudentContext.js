import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const StudentContext = createContext();

export default function StudentContextProvider({ children }) {
    const [Students, setStudents] = useState([]);
    const [Courses, setCourses] = useState([]);



    // Function to fetch students from Firebase
    const getStudents = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'Students'));
            const array = []
            const studentData = querySnapshot.docs.map((doc) => doc.data());
            array.push(studentData)
            setStudents(studentData);
        } catch (error) {
            console.error('Error fetching Students:', error);
        }
    };


    // get total students
    const getTotalStudents = async () => {

        try {
            const querySnapshot = await getDocs(collection(firestore, 'Students'))
            const totalStudents = querySnapshot.size
            return totalStudents;
        } catch (error) {
            console.error('Error get total students:', error);
            return 0
        }
    };

    const deleteStudent = async (studentData) => {

        try {
            await deleteDoc(doc(firestore, "Students", studentData.id));

            let studentsAfterDelete = Students.filter(student => student.id !== studentData.id)
            // setAllProducts(productsAfterDelete)
            setStudents(studentsAfterDelete)
            message.success("Student deleted successfully")
        } catch (err) {
            console.error(err)
            message.error("something went wrong while delting student")
        }
    }


    // course fetching from firebase
    const getCourses = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'Courses'));
            const array = []
            const courseData = querySnapshot.docs.map((doc) => doc.data());
            array.push(courseData)
            setCourses(courseData);
        } catch (error) {
            console.error('Error fetching Courses:', error);
        }
    };
    // get total Courses
    const getTotalCourses = async () => {

        try {
            const querySnapshot = await getDocs(collection(firestore, 'Courses'))
            const totalCourses = querySnapshot.size
            return totalCourses;
        } catch (error) {
            console.error('Error get total courses:', error);
            return 0
        }
    };

    const deleteCourse = async (courseData) => {

        try {
            await deleteDoc(doc(firestore, "Courses", courseData.id));

            let coursesAfterDelete = Students.filter(course => course.id !== courseData.id)
            // setAllProducts(productsAfterDelete)
            setStudents(coursesAfterDelete)
            message.success("Course deleted successfully")
        } catch (err) {
            console.error(err)
            message.error("something went wrong while delting course")
        }
    }







    useEffect(() => {
        getStudents();
        getCourses()
    }, [getStudents, getCourses]);

    return (

        <StudentContext.Provider value={{ Students, deleteStudent, getTotalStudents, Courses, getTotalCourses, deleteCourse }}>
            {children}
        </StudentContext.Provider>

    )
}


export const useStudentContext = () => useContext(StudentContext)