import * as yup from 'yup';

export const validationSchema = yup.object().shape({
    faculty: yup.number().required("Fakultetni kiriting"),
    image: yup.mixed()
        .required("Rasmni yuklang")
        .test(
            "fileFormat",
            "Faqat jpg, png formatlarini qabul qilinadi",
            value => value && ['image/jpeg', 'image/png'].includes(value.type)
        ),
    group: yup.string().required("Guruhni kiriting"),
    course: yup.string().required("Kursni kiriting"),
    passport_number: yup.string().required("Passport raqamini kiriting"),
    passport_or_idcart_file: yup.mixed().required("Passport yoki ID kart faylini yuklang")
        .test(
            "fileFormat",
            "Faqat pdf, doc, docx formatlarini qabul qilinadi",
            value => value && ['application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ].includes(value.type)
        ),
    region: yup.string().required("Hududni kiriting"),
    phone_number: yup.string().required("Telefon raqamini kiriting"),
    district: yup.string().required("Tumanni kiriting"),
    street: yup.string().required("Ko'chani kiriting"),
    resume: yup.mixed().required("Obyektivka yuklang")
        .test(
            "fileFormat",
            "Faqat pdf, doc, docx formatlarini qabul qilinadi",
            value => value && ['application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ].includes(value.type)
        ),
    sub_faculty: yup.number().required("Subfakultetni kiriting"),
});