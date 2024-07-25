import { createRef, Fragment, Suspense, useEffect, useState } from "react";
import { createFormatPhoneId, getFormatPhoneId, LoadingSkeleton } from "../../utility/utils";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../App";
import { FormProvider, useForm } from "react-hook-form";
import InputTextField from "../../components/templates/InputTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApi } from "../../hooks/useApi";
import { useTranslation } from "react-i18next";
import useSchema from "../../hooks/useSchema";
import Swal from "sweetalert2";
import InputNumberField from "../../components/templates/InputNumberField";
import SelectDynamic from "../../components/templates/SelectDymanic";
import { DevTool } from "@hookform/devtools";

export default function RegisterPage() {
  const [prep, setPrep] = useState(1); 
  let prepComponent;

  if (prep === 1) {
    prepComponent = <Preparation changePrep={setPrep} />;
  } else if (prep === 2) {
    prepComponent = <Questions changePrep={setPrep} />;
  } else {
    prepComponent = <JoinUs changePrep={setPrep} />;
  }

  return (
    <section className="container mb-7">
      <Suspense fallback={<LoadingSkeleton count={100} />}>
        {prepComponent}
      </Suspense>
    </section>
  );
}

const Preparation = ({ changePrep }) => {
  return (
    <Fragment>
      <div className="row mb-3 mx-2">
        <div className="col-lg-6" data-aos="fade-top">
          <img src="/img/reni.svg" style={{ width: "100%" }} alt="" />
        </div>
        <div className="col-lg-6">
          <h2 className="me-auto">Preparation</h2>
          <h4>Apa saja yang perlu di siapkan?</h4>
          <ol>
            <li>KTP</li>
            <li>NPWP</li>
            <li>Rekening bank</li>
          </ol>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 text-start">
          <Link
            to={appRoutes.HOME}
            type="button"
            className="btn btn-outline-secondary"
          >
            Halaman Login
          </Link>
        </div>
        <div className="col-md-6 text-end">
          <button
            onClick={() => changePrep(2)}
            type="button"
            className="btn btn-primary"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const Questions = ({ changePrep }) => {
  return (
    <Fragment>
      <div className="row mb-3 mx-2">
        <div className="col-lg-6" data-aos="fade-top">
          <img src="img/reni2.svg" style={{ width: "100%" }} alt="" />
        </div>
        <div className="col-lg-6">
          <h2 className="me-auto">Apakah kamu ada pertanyaan?</h2>
        </div>
      </div>
      <div className="row justify-content-between">
        <div className="col-md-6 text-start">
          <button
            type="button"
            onClick={() => changePrep(1)}
            className="btn btn-outline-secondary"
          >
            Kembali
          </button>
        </div>
        <div className="col-md-6 text-end">
          <button
            onClick={() => changePrep(3)}
            type="button"
            className="btn btn-primary"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const JoinUs = ({ changePrep }) => {

  const { postRequest } = useApi();
  const navigate = useNavigate();

  const recaptchaRef = createRef();
  const { getRequest } = useApi();
  const [t, i18n] = useTranslation('lang');
  const { registerSchema } = useSchema();
  const [rdn, setRDN] = useState([]);
  const Sales = [
    { SalesNID: 1, SalesName: "Abah Six Pack" },
    { SalesNID: 2, SalesName: "Ujang" },
  ];

  const formDataPribadi = useForm({
    // please input your default values
    defaultValues: {
      Email: "", // example Email: "ujang@micropiranti.com"
      Fullname: "",
      MobilePhone: getFormatPhoneId(""),
      BankAccountNumber: "",
      BankAccountHolder: "",
      QuestionRDN: 6,
      Sales: 1,
      BankName: "",
      Password: "",
      ConfirmPassword: "",
    },
    resolver: yupResolver(registerSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  })

  const { handleSubmit, formState, control  } = formDataPribadi;
  const { isValid } = formState;   const getRDN = async () => {
    try {
      const result = await getRequest(`list/rdn`);
      setRDN(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRDN();
  }, []);

  const submitRegistrasi = async (data) => {
    const validData = {
      Email: data.Email,
      Fullname: data.Fullname,
      MobilePhone: createFormatPhoneId(data.MobilePhone),
      BankAccountNumber: data.BankAccountNumber,
      BankAccountHolder: data.BankAccountHolder,
      QuestionRDN: data.QuestionRDN,
      Sales: data.Sales,
      BankName: data.BankName,
      Password: data.Password,
    } 
    try {
      const result = await postRequest(`cif/registrasi`, validData);
      if(result.response_code === "00") {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: result.response_message
        })
        navigate(appRoutes.HOME)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.response_message
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }

  const handleCaptcha = () => {
    const hasil = recaptchaRef.current.getValue();
    console.log(hasil)
  }

  return (
    <FormProvider {...formDataPribadi}>
      <form noValidate onSubmit={handleSubmit(submitRegistrasi)}>
        <div className="row mb-3 mx-2">
          <div className="col-lg-6" data-aos="fade-top">
            <img src="img/pendaftaran.jpg" style={{ width: "100%" }} alt="" />
          </div>
          <div className="col-lg-6">
            <h2 className="me-auto">Join Us</h2>
            <div className="row shadow"> 
              <div className="col-md-6">
                <SelectDynamic ngModel="QuestionRDN" label={t("CIF.bankrdn")} options={rdn} optionKey="code" valueKey="number" optionValue="description" />
                <InputTextField type="text" ngModel="Fullname" label={t("CIF.fullname")} placeholder="" />
                <InputTextField type="text" ngModel="Email" label={t("CIF.email")} placeholder="" />
                <InputNumberField type="text" ngModel="MobilePhone" label={t("CIF.contactmobilephone")} placeholder="81xxxxxxx" />
                <SelectDynamic ngModel="Sales" label={t("CIF.sales")} options={Sales} optionKey="SalesNID" optionValue="SalesName" valueKey="number" />
              </div>
              <div className="col-md-6">
                <InputTextField type="text" ngModel="BankName" label={t("CIF.bankname")} placeholder="" />
                <InputTextField type="text" ngModel="BankAccountNumber" label={t("CIF.bankaccountnumber")} placeholder="" />
                <InputTextField type="text" ngModel="BankAccountHolder" label={t("CIF.bankaccountname")} placeholder="" />
                <InputTextField type="password" ngModel="Password" label={t("CIF.password")} placeholder="" />
                <InputTextField type="password" ngModel="ConfirmPassword" label={t("CIF.confirmpassword")} placeholder="" />
              </div>
              {/* {isValid && <div className="col-12">
                <ReCAPTCHA ref={recaptchaRef} size="normal" sitekey="Ntar aja" onChange={handleCaptcha}/>
              </div>} */}
            </div>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="col-md-6 text-start">
            <button type="button" onClick={() => changePrep(2)} className="btn btn-outline-secondary" >Kembali</button>
          </div>
          <div className="col-md-6 text-end">
            <button type="submit" disabled={!isValid} className="btn btn-primary">Daftar</button>
          </div>
        </div>
      </form>
      <DevTool control={control}/>
    </FormProvider>
  );
};