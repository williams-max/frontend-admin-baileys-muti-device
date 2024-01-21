import logo from '../../../../core/assets/img/logo.png'

export const Header = () => {
  const showMenu = () => {
        // show navbar
        document.getElementById('nav-bar')!.classList.toggle('showNavbar')
        // change icon
        document.getElementById('header-toggle')!.classList.toggle('bx-x')
        // add padding to body
        document.getElementById('body-pd')!.classList.toggle('body-pd')
        // add padding to header
        document.getElementById('header')!.classList.toggle('body-pd')
  }

  return (
        <header className="header" id="header">
            <img src={ logo } width={100} alt="" className="logo-navbar" />
            <div className="header_toggle" onClick={() => showMenu()}>
                <i className='bx bx-menu' id="header-toggle"></i>
            </div>
        </header>
  )
}
