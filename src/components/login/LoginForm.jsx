import { useFormik } from "formik";
import "./LoginForm.scss";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../../features/auth/loginSlice";
import { LoginService } from "../../services/auth";
import { useEffect, useState } from "react";

const userSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: Yup.string()
        .matches(/^[A-Za-z0-9]+$/, 'The password can contain only Latin letters and numbers')
        .required("Password is required").min(8, "Short password"),

});


const initialValues = {
    email: "",
    password: "",
}

const LoginForm = () => {
    const { loggedIn, isLoading } = useSelector((state) => state.login);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // valudation formik
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userSchema,
        onSubmit: async (values) => {
            dispatch(loginStart());
            try {
                const response = await LoginService.userLogin(values);
                dispatch(loginSuccess(response));
            }
            catch (err) {
                dispatch(loginFailure());
            }
        },
    });

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn, navigate]);

    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="login-form w-100 d-flex justify-content-center">
            <div className="form-container">
                <div className="logo mb-3 d-flex flex-column align-items-center gap-2">
                    <h2 className="title">
                        Kirish
                    </h2>
                </div>
                <form onSubmit={formik.handleSubmit}>

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
                        <input type={showPassword ? "text" : "password"}
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
                    <div className="show-password mb-3 d-flex gap-2">
                        <input
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword">Parollni ko'rsatish</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className={`btn px-5 btn-primary ${isLoading ? "disabled" : ""}`}
                        >
                            Kirish
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;