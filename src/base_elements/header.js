import '../style/myStyle.css'
import Logo from './logo/Earth Tone.png'
import HeaderMenu from './headerMenu.js'; 
import { MyContext } from '../components/contextItem.js';
import CartPanel from '../screens/cart/cartPanel.js'; 

const Header = () => {
return (
    <div id="headerBar">
        <img src={Logo} id="earthTonelogo" />
        <HeaderMenu />
    </div>
    )
}

export default Header; 