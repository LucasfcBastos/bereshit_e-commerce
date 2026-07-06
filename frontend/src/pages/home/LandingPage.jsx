import HeaderTop from "../../components/header/HeaderTop.jsx";
import CampRecent from "../../components/camp/CampRecent.jsx";
import CampBrand from "../../components/camp/CampBrand.jsx";

import Art from "../../assets/img/BMW.png";

import "../../styles/Main.css";

function LandingPage() {
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
                    <CampBrand />
                </section>

            </main>
        </div>
    );
}

export default LandingPage;