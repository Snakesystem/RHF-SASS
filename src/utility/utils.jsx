/* eslint-disable react-refresh/only-export-components */
import { Component, lazy } from 'react'
import { Mosaic } from 'react-loading-indicators'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'

export default class ErrorBoundary extends Component {

    state = { hashError: false }

    static getDerivedStateFromErrr(error) {
        return { hashError: true }
    }

    componentDidCatch(error, info) {
        console.log('Error', error, 'info',info)
        return Swal.fire({
            customClass: "swal-wide",
            allowOutsideClick: false,
            showCancelButton: 0,
            title: error,
            text: info.componentStack,
            icon: "error",
            confirmButtonText: "Reload this page",
            hideOnOverlayClick: false,
            hideOnContentClick: false,
            backdrop:'linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)',
            closeClick: false,
            helpers: {
                overlay: { closeClick: false } 
            }
        }).then((result) => {
            if(result.isConfirmed) {
                window.location.reload()
            }
        })
    }

  render() {

    if(this.state.hashError) {
        return this.props.fallback
    }
    return this.props.children
  }
}

export function MPCLoader() {
    return ( 
      <div className="mpc-loader">
          <div className="item-loader d-flex flex-row justify-content-center">
            <div className="flex-column text-center">
              <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
            </div>
          </div>
      </div>
    )
  }
// INPUT VALUDATION REGEX
export const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const pawdRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
// export const phoneRegExp = /^\d{9,13}$/;
// Convert camelCase to camel Case 
export const convertLabel = (str) => {
    return str.replace(/([A-Z])/g, ' $1').trim();
};

// ERROR MESSAGE FORM
export const ErrorMessage = ({ ngModel, errors }) => {
    const error = errors[ngModel];

    if (!error) {
        return null;
    }

    return <div className="invalid-feedback">{error.message}</div>
};

// LOADER PAGE

// LOADING SKELETON TO FIELD
export function LoadingSkeleton(props) {
    const { count } = props
    return (
        <Skeleton height={30} count={count}/>
    )
}

// OTHER LAZY LOAD
export function LazyLoad(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    }).then(() => promise);
}

// LAZY LOAD TO COMPONENT
export function lazyLoadComponents(path) {
    return lazy(() => {
        const promise = LazyLoad(path)
        if(path == null) {
            return <ErrorBoundary fallback="Please input module"/>;
        } else {
            return promise
        }
    })
}

// CREATE OPTIONS FUNCTION SELECT DYNAMIC
export const createOptions = (data, key, value) => {
    return data && data.map((item) => {
        return {
            optionKey: item[key],
            optionValue: item[value]
        }
    })
}

export const getFormatPhoneId = (value) => {

    let data = value; // Replace with actual API call
    
    if (data) {
        const phoneNumber = data.split('+62-')[1];
        return data = phoneNumber;
    }

    return data
}

export const createFormatPhoneId = (value) => {

    let data = value; // Replace with actual API call
    if(data) {
        const phoneNumber = `+62-${data}`;
        return data = phoneNumber;
    }

    return data
}