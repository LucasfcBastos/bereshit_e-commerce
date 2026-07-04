import HeaderTop from "../../components/header/HeaderTop.jsx";

import Art from "../../assets/img/BMW.png";

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
            </main>
        </div>
    );
}

export default LandingPage;