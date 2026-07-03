import { NavLink } from "react-router-dom";

import LogoSvg from "../../assets/svg/logo.svg";

import "../../styles/Header.css";

const menuItems = [
    {key: "home", label: "INÍCIO", url: "/"},
    {key: "cars", label: "CARROS", url: "/cars"},
    {key: "about", label: "SOBRE", url: "/about"}
]

function HeaderTop() {
    return (
        <>
            <header>
                <img src={LogoSvg} alt="Logo" />
                <div className="menu">
                    {menuItems.map((item) => (
                        <NavLink key={item.key} to={item.url} className={({ isActive }) => isActive ? "active" : "" } >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </header>
        </>
    )
}

export default HeaderTop;