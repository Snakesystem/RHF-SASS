import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { pawdRegExp, phoneRegExp } from "../utility/utils";

const useSchema = () => {
    
    // eslint-disable-next-line no-unused-vars
    const [t, i18n] = useTranslation('lang');

    const loginSchema = yup.object().shape({ 
        Email: yup.string().email("This must be a email").required(t("GLOBAL.mandatory")),
        Password: yup.string().required(t("GLOBAL.mandatory")),
    }).required();

    const registerSchema = yup.object().shape({ 
        Email: yup.string().email("This must be a email").required(t("GLOBAL.mandatory")),
        Fullname: yup.string().required(t("GLOBAL.mandatory")).min(3, t("VALIDATE.minlength")),
        MobilePhone: yup.string().required(t("GLOBAL.mandatory")).matches(phoneRegExp, t("VALIDATE.mobilephone")),
        BankAccountNumber: yup.string().required(t("GLOBAL.mandatory")),
        BankAccountHolder: yup.string().required(t("GLOBAL.mandatory")),
        QuestionRDN: yup.number().required(t("GLOBAL.mandatory")),
        Sales: yup.number(),
        BankName: yup.string().required(t("GLOBAL.mandatory")),
        Password: yup.string().required(t("GLOBAL.mandatory")).matches(pawdRegExp, t("REGIS.strengthpass")),
        ConfirmPassword: yup.string().required(t("GLOBAL.mandatory")).oneOf([yup.ref("Password"), null], t("VALIDATE.ConfPassErr")),
    }).required();

    const bcaSchema = {
        dataPribadi : yup.object().shape({ 
            AutoNID: yup.number(),
    
        }).required(),
        dataBank: yup.object().shape({
            BankName: yup.string().required(t("GLOBAL.mandatory")),
        }),
        dataPendukung: yup.object().shape({
            IDCardFile: yup.string(),
        })
    }

    const briSchema = {
        dataPribadi : yup.object().shape({ 
            AutoNID: yup.number(),
    
        }).required(),
        dataBank: yup.object().shape({
            BankName: yup.string().required(t("GLOBAL.mandatory")),
        }),
        dataPendukung: yup.object().shape({
            IDCardFile: yup.string(),
        })
    }

    const permataSchema = {
        dataPribadi : yup.object().shape({ 
            AutoNID: yup.number(),
    
        }).required(),
        dataBank: yup.object().shape({
            BankName: yup.string().required(t("GLOBAL.mandatory")),
        }),
        dataPendukung: yup.object().shape({
            IDCardFile: yup.string(),
        })
    }

    return { registerSchema, loginSchema, bcaSchema, briSchema, permataSchema };

}

export default useSchema