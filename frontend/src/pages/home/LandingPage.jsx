import { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

import HeaderTop from "../../components/header/HeaderTop.jsx";
import CampRecent from "../../components/camp/CampRecent.jsx";
import CampBrand from "../../components/camp/CampBrand.jsx";

import Art from "../../assets/img/BMW.png";

import "../../styles/Main.css";

function LandingPage() {
    const [existCar, setExistCar] = useState([]);
    const hasCars = existCar.length > 0;

    useEffect(() => {
        setExistCar(getCars());
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

                {hasCars ? (
                    <>
                        <section className="recent">
                            <CampRecent />
                        </section>

                        <section className="marq">
                            <CampBrand />
                        </section>
                    </>
                ) : (
                    <div style={{ padding: "25px" }}>
                        <h1 style={{textAlign: "center"}}>NO MOMENTO NÃO HÁ VEICULOS EM NOSSO ESTOQUE</h1>
                    </div>
                )}

            </main>
        </div>
    );
}

export default LandingPage;