import { Link } from 'react-router-dom'
import Back from '../../images/back-button.svg'
import './style.css'

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={Back} alt=" Voltar" />
        </Link>
      </div>
    </header>
  )
}
export default Header