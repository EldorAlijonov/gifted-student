import { Navbar, Sidebar, StudentInfo } from "../../components";
import { jwtDecode } from "jwt-decode"; // Fix the import statement
import './ProfilPage.scss';
import { useMemo, useState } from "react";
import { useFaculties, useSubFaculties, Message } from "../../hooks";
import { useFormik } from "formik";
import { StudentsRepository } from "../../services/students";
import { validationSchema } from "./validationSchema";
import { Modal } from "antd";

const initialState = {
    faculty: 0,
    image: null,
    group: "",
    course: "",
    passport_number: "",
    idcart_number: "",
    passport_or_idcart_file: null,
    status: true,
    region: "",
    phone_number: "",
    district: "",
    street: "",
    resume: null,
    base_student: "",
    sub_faculty: 0,
};

const ProfilPage = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const { faculties } = useFaculties();
    const { subFaculties } = useSubFaculties();
    const { success, error, messageApiContext } = Message();

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("image", values.image);
            formData.append("resume", values.resume);
            formData.append("passport_or_idcart_file", values.passport_or_idcart_file);
            formData.append("passport_number", values.passport_number);
            formData.append("region", values.region);
            formData.append("phone_number", values.phone_number);
            formData.append("district", values.district);
            formData.append("street", values.street);
            formData.append("faculty", values.faculty);
            formData.append("sub_faculty", values.sub_faculty);
            formData.append("course", values.course);
            formData.append("group", values.group);
            formData.append("base_student", decoded.user_id);

            try {
                await StudentsRepository.addStudents(formData);
                success("Ma'lumotlar kiritildi!");
                formik.resetForm();
            } catch (err) {
                error(`${err.response.data.base_student}`);
            }

        },
    });

    const [filteredSubFaculties, setFilteredSubFaculties] = useState([]);

    useMemo(() => {
        const filteredSubFaculties = subFaculties.filter(
            subObject => subObject.faculty.id === Number(formik.values.faculty)
        );
        setFilteredSubFaculties(filteredSubFaculties);
    }, [formik.values.faculty, subFaculties]);


    // modal
    const [openModal, setOpenModal] = useState(false);

    const canselModal = () => {
        setOpenModal(false);
        formik.resetForm();
    }

    return (
        <div className="profil">
            {messageApiContext}
            <Navbar />
            <div className="profil-container">
                <Sidebar />
                <div className="content">
                    <div className="top d-flex justify-content-between align-items-center mb-3">
                        <h1 className="title fs-lg-2">Talaba Ma'lumotlari</h1>
                        <button className="btn btn-primary py-2"
                            onClick={() => setOpenModal(!openModal)}
                        >Ma'lumotlarni kiritish</button>
                    </div>
                    <div className="form-content">

                        <Modal open={openModal} footer={null} title="Malumotlarni kiritish" width={800} closeIcon={null}>
                            <form onSubmit={formik.handleSubmit} className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Tel raqami</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            className="form-control"
                                            placeholder="Tel nomer"
                                            onChange={formik.handleChange}
                                            name="phone_number"
                                            value={formik.values.phone_number}
                                        />
                                        {formik.touched.phone_number && formik.errors.phone_number ? (
                                            <span className="error">{formik.errors.phone_number}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Viloyat</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            className="form-control"
                                            placeholder="Viloyat"
                                            onChange={formik.handleChange}
                                            name="region"
                                            value={formik.values.region}
                                        />
                                        {formik.touched.region && formik.errors.region ? (
                                            <span className="error">{formik.errors.region}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Tuman {"(Shahar)"}</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            className="form-control"
                                            placeholder="Tuman(Shahar)"
                                            onChange={formik.handleChange}
                                            name="district"
                                            value={formik.values.district}
                                        />
                                        {formik.touched.district && formik.errors.district ? (
                                            <span className="error">{formik.errors.district}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Mahalla</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            placeholder="Mahalla"
                                            className="form-control"
                                            value={formik.values.street}
                                            onChange={formik.handleChange}
                                            name="street"
                                        />
                                        {formik.touched.street && formik.errors.street ? (
                                            <span className="error">{formik.errors.street}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="fileInput">Rasm{"(3x4)"}</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            id="fileInput"
                                            className="form-control"
                                            type="file"
                                            name="image"
                                            onChange={(event) => {
                                                formik.setFieldValue("image", event.target.files[0]);
                                            }}
                                        />
                                        {formik.touched.image && formik.errors.image ? (
                                            <span className="error">{formik.errors.image}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Obyektivka</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="file"
                                            className="form-control"
                                            name="resume"
                                            onChange={(event) => {
                                                formik.setFieldValue("resume", event.target.files[0]);
                                            }}
                                        />
                                        {formik.touched.resume && formik.errors.resume ? (
                                            <span className="error">{formik.errors.resume}</span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                        <label className="form-label">Pasport yoki ID karta (pdf)</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="file"
                                            className="form-control"
                                            onChange={(event) => {
                                                formik.setFieldValue("passport_or_idcart_file", event.target.files[0]);
                                            }}
                                            name="passport_or_idcart_file"
                                        />
                                        {formik.touched.passport_or_idcart_file && formik.errors.passport_or_idcart_file ? (
                                            <span className="error">{formik.errors.passport_or_idcart_file}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Fakultet</label>
                                        <select
                                            className="form-select"
                                            name="faculty"
                                            onChange={formik.handleChange}
                                            value={formik.values.faculty}
                                        >
                                            <option>Fakultetni tanlang</option>
                                            {faculties.length > 0 ? (
                                                faculties.map(facultyObject => (
                                                    <option key={facultyObject.id} value={facultyObject.id}>
                                                        {facultyObject.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option className="text-danger">Fakultetlar mavjud emas</option>
                                            )}
                                        </select>
                                        {formik.touched.faculty && formik.errors.faculty ? (
                                            <span className="error">{formik.errors.faculty}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Yo'nalishi</label>
                                        <select
                                            className="form-select"
                                            name="sub_faculty"
                                            onChange={formik.handleChange}
                                            value={formik.values.sub_faculty}
                                        >
                                            <option>Yo'nalishni tanlang</option>
                                            {formik.values.faculty &&
                                                filteredSubFaculties.map((subObject) => (
                                                    <option key={subObject.id} value={subObject.id}>
                                                        {subObject.name}
                                                    </option>
                                                ))}
                                        </select>
                                        {formik.touched.sub_faculty && formik.errors.sub_faculty ? (
                                            <span className="error">{formik.errors.sub_faculty}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Kurs</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            className="form-control"
                                            placeholder="Kurs"
                                            name="course"
                                            onChange={formik.handleChange}
                                            value={formik.values.course}
                                        />
                                        {formik.touched.course && formik.errors.course ? (
                                            <span className="error">{formik.errors.course}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Guruh</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            className="form-control"
                                            placeholder="Guruh"
                                            onChange={formik.handleChange}
                                            value={formik.values.group}
                                            name="group"
                                        />
                                        {formik.touched.group && formik.errors.group ? (
                                            <span className="error">{formik.errors.group}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pasport seriyasi va raqami</label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            className="form-control"
                                            placeholder="Pasport seriyasi va raqami"
                                            onChange={formik.handleChange}
                                            value={formik.values.passport_number}
                                            name="passport_number"
                                        />
                                        {formik.touched.passport_number && formik.errors.passport_number ? (
                                            <span className="error">{formik.errors.passport_number}</span>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-lg-12 text-center mt-2 d-flex justify-content-between">
                                    <button className="btn border" type="button"
                                        onClick={() => {
                                            formik.resetForm();
                                        }}
                                    >
                                        Tozalash
                                    </button>
                                    <div className="d-flex align-items-center gap-3">
                                        <button className="btn border"
                                            type="button"
                                            onClick={canselModal}>Bekor Qilish</button>
                                        <button className="btn btn-primary px-4" type="submit">
                                            Ma'lumotlarni kiritish
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </Modal>
                    </div>


                    <div className="profil-info mt-3">
                        <StudentInfo />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProfilPage;
