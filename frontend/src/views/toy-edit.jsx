import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy());
  const navigate = useNavigate();
  const { toyId } = useParams();

  useEffect(() => {
    if (!toyId) return;
    loadToy();
  }, []);

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToyToEdit(toy))
      .catch((err) => {
        console.log("Had issues in toy details", err);
        navigate("/toys");
      });
  }

  function handleChange({target}){
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    if (field === 'labels'){
        const newVal = value.split(',')
        console.log(newVal);
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: newVal }))
    }
    else setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
}


  function onSaveToy(ev) {
    ev.preventDefault();
    toyService
      .save(toyToEdit)
      .then((toy) => {
        console.log("toy saved", toy);
        showSuccessMsg("toy saved!");
        navigate("/toys");
      })
      .catch((err) => {
        console.log("err", err);
        showErrorMsg("Cannot save toy");
      });
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit.id ? "Edit this toy" : "Add a new toy"}</h2>

      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Vendor : </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter name..."
          value={toyToEdit.name}
          onChange={handleChange}
        />
        <label htmlFor="price">Price : </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter price"
          value={toyToEdit.price}
          onChange={handleChange}
        />
        <label htmlFor="labels">labels : </label>
        <input
          type="text"
          name="labels"
          id="labels"
          placeholder="Enter price"
          value={toyToEdit.labels}
          onChange={handleChange}
        />

        <div>
          <button>{toyToEdit._id ? "Save" : "Add"}</button>
          <Link to="/toys">Cancel</Link>
        </div>
      </form>
    </section>
  );
}



// const SignupSchema = Yup.object().shape({
//     firstName: Yup.string()
//         .min(2, 'Too Short!')
//         .max(7, 'Too Long!')
//         .required('Required'),
//     lastName: Yup.string()
//         .min(2, 'Too Short!')
//         .max(50, 'Too Long!')
//         .required('Required'),
//     email: Yup.string().email('Invalid email').required('Required'),
// });



// const CustomTextField = (props) => {
//     return <TextField id="outlined-basic" label="Outlined" variant="outlined" {...props}  />

// }

// export const MyForm = () => {

//     const onSubmit = (values) => {
//         console.log('values:', values)
//     }

//     const h1Props = {
//         style: { color: 'red' },
//         title: 'Hello im an h1'
//     }

//     return <div>
//         {/* <h1 title="Hello im an h1" style={{color:'red'}}>Signup</h1> */}
//         <h1 {...h1Props} >Signup</h1>
//         <Formik
//             initialValues={{
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//             }}
//             validationSchema={SignupSchema}
//             onSubmit={onSubmit}
//         >
//             {({ errors, touched }) => (
//                 <Form className='formik'>
//                     <Field name="firstName" />
//                     {errors.firstName && touched.firstName ? (
//                         <span>{errors.firstName}</span>
//                     ) : null}
//                     <Field as={CustomTextField} name="lastName" title="BABABA"  />
//                     {errors.lastName && touched.lastName ? (
//                         <div>{errors.lastName}</div>
//                     ) : null}
//                     <Field name="email" type="email" />
//                     {errors.email && touched.email ? <div>{errors.email}</div> : null}
//                     <button type="submit">Submit</button>
//                 </Form>
//             )}
//         </Formik>
//     </div >
// }
