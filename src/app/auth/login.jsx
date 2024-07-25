import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import Swal from "sweetalert2";
import { appRoutes } from "../App";
import useSchema from "../../hooks/useSchema";
import InputTextField from "../../components/templates/InputTextField";

export default function LoginPage() {
  return (
    <section className="container-fluid py-0 my-0 login-page">
      <div className="row justify-content-center">
        <div className="col-lg-6 left-login">
          <div className="content-hero">
            {/* <Swiper className="mySwiper hero-swiper" loop={true} autoplay={{
                  delay: 7000,
                  disableOnInteraction: false,
                }} modules={[Autoplay]} >
                <SwiperSlide className="">
                  <div className="">
                    <img src="/img/closeup-economist-using.jpg" style={{width: '100%'}} alt=""/>
                  </div>
                  <p className="text-swiper"><TypeIt>{t('REGIS.slider1')}</TypeIt></p>
                </SwiperSlide>
                <SwiperSlide className="">
                  <div className="">
                    <img src="/img/closeup-economist-using.jpg" style={{width: '100%'}} alt=""/>
                  </div>
                  <p className="text-swiper"><TypeIt>{t('REGIS.slider2')}</TypeIt></p>
                </SwiperSlide>
                <SwiperSlide className="">
                  <div className="">
                    <img src="/img/glass-jar-full-money.jpg" style={{width: '100%'}} alt=""/>
                  </div>
                  <p className="text-swiper"><TypeIt>{t('REGIS.slider3')}</TypeIt></p>
                </SwiperSlide>
                <SwiperSlide className="">
                  <div className="">
                    <img src="/img/close-up-education.jpg" style={{width: '100%'}} alt=""/>
                  </div>
                  <p className="text-swiper"><TypeIt>{t('REGIS.slider4')}</TypeIt></p>
                </SwiperSlide>
              </Swiper> */}
              <img src="img/login-img.png" className="img-bg-login" alt="bg-login" />
          </div>
        </div>
        <div className="col-lg-6 right-login">
          <div className="content-login d-flex align-content-between flex-wrap">
            <div className="header-login">
              <img src="img/logo-mpc.png" className="img-logo-login" alt="logo-mpc" />
            </div>
            <FormLogin />
            <div className="footer-login align-self-end d-flex flex-column">
              <div className="flex-row">
                <img src="img/logo-ojk.png" alt="" className="mx-3" style={{ width: "77.5px" }} />
                <img src="img/logo-inklusi-keuangan.png" className="mx-3" alt="" style={{ width: "61.5px" }} />
                <img src="img/logo-akses-kesei.png" alt="" className="mx-3" style={{ width: "58.5px" }}/>
                <img src="img/logo-idx.png" alt="" className="mx-3" style={{ width: "36.5px" }}/>
              </div>
              <div className="flex-row text-center">
                <p>© 2024. PT. Micropiranti Sekuritas is Securities Company Member of the Indonesia Stock Exchange, licensed, registered and supervised by the Financial Service Authority.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const FormLogin = () => {

  const navigate = useNavigate()
  const [t, i18n] = useTranslation('lang');
  const { loginSchema } = useSchema();

  const loginForm = useForm({
    defaultValues: {
      Email: "",
      Password: "",
    },
    resolver: yupResolver(loginSchema),
    mode: "all", // this is mode form validation || "onSubmit" || "onChange" || "all"
  });

  const { handleSubmit } = loginForm;
  const { postRequest } = useApi()

  const login = async (data) => {
    try {
      const result = await postRequest(`cif/login`, data);
      if(!result.result) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.response_message
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gajelas',
        })
        navigate(`${appRoutes.CIF}/data-pribadi`)
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(login)} className="form-login">
      <h3>Selamat Datang Kembali!👋</h3>
        <FormProvider {...loginForm}>
          <InputTextField type="text" ngModel="Email" label={t("CIF.email")} placeholder="Please enter your email" />
          <InputTextField type="password" ngModel="Password" label={t("CIF.password")} placeholder="" />
        </FormProvider>
      <div className="flex-row text-end">
        <Link className="text-decoration-none">Lupa password?</Link>
      </div>
      <div className="flex-row text-center">
        <button type="submit" className="btn btn-primary btn-md btn-full">Masuk</button>
        <span className="">Belum punya akun? <Link className="text-decoration-none">Daftar Sekarang</Link></span>
      </div>
    </form>
  )
}