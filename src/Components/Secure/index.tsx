import { useFormik } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import {ReactSession} from 'react-client-session';
const Schema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
});

const Secure = (props) => {
    ReactSession.setStoreType("localStorage")
    const formik = useFormik({
        initialValues: {
            firstName: props.firstName,
            lastName: props.lastName,
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
               body: JSON.stringify({ id:props.id,firstName: values.firstName,lastName:values.lastName })
           };
           fetch('http://localhost:4000/secure/update', requestOptions)
               .then(response => response.json())
               .then(data => {
                 if(data.message){
                   alert(data.message)
                 }else{
                   ReactSession.set("firstName", data.first_name)
                   ReactSession.set("lastName", data.last_name)
                 }
               });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    type="text"
                    placeholder="First Name"
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.firstName,
                    })}
                />
                {formik.errors.firstName && (
                    <div className="text-red-500">{formik.errors.firstName}</div>
                )}
            </div>
            <div className="mt-5">
                <label className="label">
                    <span className="label-text">Last Name</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    type="text"
                    placeholder="Last Name"
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.lastName,
                    })}
                />
                {formik.errors.lastName && (
                    <div className="text-red-500">{formik.errors.lastName}</div>
                )}
            </div>
            <div className="mt-5 flex justify-end">
                <button
                    className={cx("btn btn-primary", {
                        loading: formik.isSubmitting,
                    })}
                    type="submit"
                >
                    Update
                </button>
            </div>
        </form>
    );
};

export default Secure;
