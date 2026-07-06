import { useState, useEffect } from "react";
import { getTopBrands } from "../../services/carService";

import HeaderTop from "../../components/header/HeaderTop.jsx";
import CampRecent from "../../components/camp/CampRecent.jsx";

import Art from "../../assets/img/BMW.png";
import Roda from "../../assets/img/roda.png";

import "../../styles/Main.css";

function LandingPage() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        setBrands(getTopBrands());
    }, []);

    return (
        <div>
            <HeaderTop />

            <main className="first page">

                <section className="hero">
                    <div className="hero-text">
                        <h1>O CARRO CERTO MUDA TUDO.</h1>
                        <h1>ESCOLHA COM CONFIANÇA.<br/>DIRIJA COM TRANQUILIDADE.</h1>
                        <p>Os melhores veículos, cuidadosamente selecionados<br/>para levar você mais longe.</p>
                    </div>
                    <div className="hero-image">
                        <img src={Art} alt="BMW" />
                    </div>
                </section>

                <section className="recent">
                    <CampRecent />
                </section>

                <section className="marq">
                    <h1>ENCONTRE A SUA MARCA</h1>
                    <div className="brands-grid">
                        {brands.map((brand) => (
                            <div key={brand.marca} className="card-rod">
                                <img src={Roda} alt={brand.marca} />
                                <div>
                                    <p>{brand.marca}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
}

export default LandingPage;