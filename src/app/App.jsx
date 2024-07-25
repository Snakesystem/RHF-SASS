import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // i18next-browser-languagedetector
import lang_en from '../assets/lang/locale_en.json' // import language en
import lang_id from '../assets/lang/locale_id.json' // import language id
import { useTheme } from '../hooks/useTheme';
import ResponseHandlerProvider from '../hooks/useResponseHandler';
import ErrorBoundary, { MPCLoader } from '../utility/utils';
import { BrowserRouter, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import Aos from 'aos';
import Swal from 'sweetalert2';
import LoginPage from './auth/login';
import RegisterPage from './auth/register';
import HomePage from './client/home';
import CIFPage from './client/cif';
import DataPribadiPage from './client/datapribadi';
import DataBankPage from './client/databank';
import PrivateRoute from '../components/layouts/PrivateRoute';
import AuthProvider from '../hooks/useAuth';
import DataPendukungPage from './client/datapendukung';

export default function App() {

  i18n.use(initReactI18next).init({
    interpolation: {escapeValue: false},
    lang: "en",
    resources: {
      en: {
        lang: lang_en
      },
      id: {
        lang: lang_id
      }
    }
  })
  
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          lang: lang_en
        },
        id: {
          lang: lang_id
        }
      },
      lng: localStorage.getItem('language') || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false // React already does escaping
      }
    });

    const { isDark } = useTheme();
  
  useEffect(() => {
    Aos.init({
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDark ? 'dark': 'light');
    document.documentElement.setAttribute('id', isDark ? 'dark': 'light');
    
  }, [isDark])

  localStorage.setItem('lang', 'en'); 

  return (
    <ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <BrowserRouter>
        <Suspense fallback={<MPCLoader />}>
          <ResponseHandlerProvider>
            <AuthProvider>
              <RouteRender/>
            </AuthProvider>
          </ResponseHandlerProvider>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

const RouteRender = () => {

  const { pathname } = useLocation();
  const transformTitle = (route) => {
    return route
      .replace(/^\//, '') 
      .split('/') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
  };

  useEffect(() => {
    document.title = `${pathname === '/' ? 'Home' : transformTitle(pathname)} - Custommer Onboarding`;
  }, [pathname])

  const routes = useRoutes(routesConfig);
  return routes;
}

const NotFound = () => {

  const navigate = useNavigate()

  useEffect(() => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    }).then(() => {
      navigate(appRoutes.HOME)
    })
  }, [navigate])

  return null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const appRoutes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOTPASSWORD: '/forgotpassword',
  CONTACT: '/contact',
  ABOUT: '/about',
  CIF: 'cif',
  DASHBOARD: '/dashboard',
  UNKNOW: '*',
}

const routesConfig = [
  {
    path: appRoutes.HOME,
    element: 
      <PrivateRoute>
        <HomePage/>
      </PrivateRoute>,
      
    children: [ 
      {
        path: appRoutes.CIF,
        element: <CIFPage/>,
        children: [
          {
            path: 'data-pribadi',
            element: <DataPribadiPage/>
          },
          {
            path: 'data-bank',
            element: <DataBankPage/>
          },
          {
            path: 'data-pendukung',
            element: <DataPendukungPage/>
          },
        ]
      },
    ]
  },  
  {
    path: appRoutes.LOGIN,
    element: <LoginPage/>,
  },  
  {
    path: appRoutes.REGISTER,
    element: <RegisterPage/>
  },  
  {
    path: appRoutes.UNKNOW,
    element: <NotFound/>,
  },  
  
]