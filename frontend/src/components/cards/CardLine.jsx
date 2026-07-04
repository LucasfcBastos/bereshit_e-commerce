import "../../styles/Card.css";

function CardLine({ nome, ano, km, preco }) {
    return (
        <>
            <div className="card line">
                <img src="" />
                <div className="info">
                    <div className="principal">
                        <p>{nome}</p>
                        <p>{ano} - {km} Km</p>
                    </div>
                    <p>ENT: R$ {preco.toLocaleString("pt-BR")}</p>
                </div>
            </div>
        </>
    )
}

export default CardLine;