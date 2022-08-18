import React from 'react'
import JobiaLogo from '../assets/Jobia_Logo.png'
import JobiaLogoDark from '../assets/Jobia-logo-dark.png'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../Styles/style.css'
import { Link } from 'react-router-dom'
const Footer = (props) => {
  const { dark } = props
  return (
    <div className={dark ? 'footer-dark' : 'footer-light'}>
      <div class="row align-items-start">
        <div class="col">
          {dark ? <a class="navbar-brand" href="#">
            <img src={JobiaLogoDark} alt="" width="100" height="24" />
          </a> : <a class="navbar-brand" href="#">
            <img src={JobiaLogo} alt="" width="100" height="24" />
          </a>}

        </div>
        <div class={dark ? 'col footer-font white-txt' : 'col footer-font'}>
        </div>
        <div class={dark ? 'col footer-font-style white-txt' : 'col footer-font-style'}>
          © Jobia Inc. 2019. We love our users!
        </div>
      </div>
    </div>
  )
}

export default Footer