import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignForm = ({ onChange, onSubmit }) => {
  return (
    <Formik
      initialValues={{ password: '', email: '' }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(3, 'Must be 3 characters or more')
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className="sign__form">
        <h2 className="sign__title">Регистрация</h2>
        <Field
          className="sign__input"
          // onChange={onChange}
          type="email"
          placeholder="Email"
          name="email"
          id="email"/>
        <ErrorMessage className="sign__error" name="email" />

        <Field
          className="sign__input"
          // onChange={onChange}
          type="password"
          placeholder="Пароль"
          name="password"
          id="password"/>
        <ErrorMessage className="sign__error" name="password" />

        <button onClick={onSubmit} className="sign__button">Зарегистрироваться</button>
      </Form>
    </Formik>
  );
};

export default SignForm;
