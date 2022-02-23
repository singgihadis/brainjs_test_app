
import { useFormik } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import {ReactSession} from 'react-client-session';
import { useHistory } from "react-router-dom";
const Schema = Yup.object().shape({
    email: Yup.string().required("Required").email(),
    password: Yup.string().required("Required"),
});

const BasicAuth = () => {
    const history = useHistory()
    ReactSession.setStoreType("localStorage")
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: false,
        validationSchema: Schema,
        onSubmit: async (
            values,
            { setFieldError, setSubmitting, resetForm }
        ) => {
            console.log('should submit here')
            const requestOptions = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email: values.email,password:values.password })
           };
           fetch('http://localhost:4000/auth/login', requestOptions)
               .then(response => response.json())
               .then(data => {
                 if(data.message){
                   alert(data.message)
                 }else{
                   ReactSession.set("logged", "1")
                   ReactSession.set("id", "61829f07b7f689003c7f9f24")
                   ReactSession.set("first_name", data.profile.first_name)
                   ReactSession.set("last_name", data.profile.last_name)
                   history.push("/secure")
                 }
               });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    type="email"
                    placeholder="Email"
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.email,
                    })}
                />
                {formik.errors.email && (
                    <div className="text-red-500">{formik.errors.email}</div>
                )}
            </div>
            <div className="mt-5">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    type="password"
                    placeholder="Password"
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.password,
                    })}
                />
                {formik.errors.password && (
                    <div className="text-red-500">{formik.errors.password}</div>
                )}
            </div>
            <div className="mt-5 flex justify-end">
                <button
                    className={cx("btn btn-primary", {
                        loading: formik.isSubmitting,
                    })}
                    type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default BasicAuth;
