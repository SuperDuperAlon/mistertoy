import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(7, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});



const CustomTextField = (props) => {
    return <TextField id="outlined-basic" label="Outlined" variant="outlined" {...props}  />

}

export const Login = () => {

    const onSubmit = (values) => {
        console.log('values:', values)
    }


    return <div>
        {/* <h1 title="Hello im an h1" style={{color:'red'}}>Signup</h1> */}
        <h1 >Login</h1>
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched }) => (
                <Form className='formik'>
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <span>{errors.firstName}</span>
                    ) : null}
                    <Field name="lastName" title="BABABA"  />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div >
}
