import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
// import style / configure plugins
import 'react-toastify/dist/ReactToastify.css'; // style react-toastify https://fkhadra.github.io/react-toastify/introduction
import 'sweetalert2/src/sweetalert2.scss' // style sweetalert2 https://sweetalert2.github.io/
// import '@sweetalert2/themes/dark/dark.scss';
import "react-form-wizard-component/dist/style.css"; // style react-form-wizard https://react-form-wizard-component-document.netlify.app/
import 'react-bootstrap-typeahead/css/Typeahead.css'; // style react-bootstrap-typeahead https://ericgio.github.io/react-bootstrap-typeahead/
import 'aos/dist/aos.css' // style aos https://github.com/michalsnik/aos
import 'react-loading-skeleton/dist/skeleton.css' // style react-loading-skeleton https://www.npmjs.com/package/react-loading-skeleton
import 'bootstrap-icons/font/bootstrap-icons.css' // style bootstrap-icons https://icons.getbootstrap.com/
import 'bootstrap-icons/font/bootstrap-icons.min.css' // style compiler bootstrap-icons https://icons.getbootstrap.com/
import './assets/scss/style.scss'  // style custom sass
import ThemeProvider from './hooks/useTheme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
