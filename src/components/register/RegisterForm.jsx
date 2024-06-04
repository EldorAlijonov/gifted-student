import { useFormik } from "formik";
import "./RegisterForm.scss";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { registerFailure, registerStart, registerSuccess } from "../../features/auth/registerSlice";
import { RegisterService } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const userSchema = Yup.object().shape({
    first_name: Yup.string()
        .required("Name is required")
        .min(2, "Name is too short")
        .max(50, "Name is too long"),
    last_name: Yup.string()
        .required("Last name is required")
        .min(2, "Last name is too short")
        .max(50, "Last name is too long"),
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, 'The password can contain only Latin letters and numbers')
        .required("Password is required").min(8, "Short password"),
    password2: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: ""
}

const RegisterForm = () => {

    const { loggedIn, isLoading } = useSelector((state) => state.login);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userSchema,
        onSubmit: async (values) => {
            dispatch(registerStart());
            try {
                const response = await RegisterService.userRegister(values);
                dispatch(registerSuccess(response));
            }
            catch (err) {
                dispatch(registerFailure());
            }
        },
    });
    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn, navigate]);

    return (
        <div className="register-form w-100 d-flex justify-content-center">
            <div className="form-container">
                <div className="logo mb-3 d-flex flex-column align-items-center gap-2">
                    <h2 className="title">
                        Ro'yxatdan O'tish
                    </h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Ism</label>
                        <input type="text"
                            className={`form-control ${formik.touched.first_name && formik.errors.first_name ? 'is-invalidd' : ''}`}
                            id="exampleInputName"
                            placeholder="Ism..."
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.first_name && formik.errors.first_name ? (
                            <span className="error">{formik.errors.first_name}</span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputLastName" className="form-label">Familya</label>
                        <input type="Text"
                            className={`form-control ${formik.touched.last_name && formik.errors.last_name ? 'is-invalidd' : ''}`}
                            id="exampleInputLastName"
                            placeholder="Familya..."
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.last_name && formik.errors.last_name ? (
                            <span className="error">{formik.errors.last_name}</span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email manzil</label>
                        <input type="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalidd' : ''}`}
                            id="exampleInputEmail1"
                            placeholder="Email manzil..."
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.email && formik.errors.email ? (
                            <span className="error">{formik.errors.email}</span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Paroll</label>
                        <input type="password"
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalidd' : ''}`}
                            id="exampleInputPassword1"
                            placeholder="Paroll..."
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                        {formik.touched.password && formik.errors.password ? (
                            <span className="error">{formik.errors.password}</span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Parollni tasdiqlang</label>
                        <input type="password"
                            className={`form-control ${formik.touched.password2 && formik.errors.password2 ? 'is-invalidd' : ''}`}
                            id="exampleInputPassword2"
                            placeholder="Parollni tasdiqlang..."
                            name="password2"
                            value={formik.values.password2}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password2 && formik.errors.password2 ? (
                            <span className="error">{formik.errors.password2}</span>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className={`btn px-5 btn-primary ${isLoading ? "disabled" : ""}`}>Ji'natish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;