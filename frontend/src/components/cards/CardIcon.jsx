import "../../styles/Card.css";

function CardIcon({ nome, ano, km, preco }) {
    return (
        <>
            <div className="card">
                <img src="" />
                <p>{nome}</p>
                <p>{ano} - {km} Km</p>
                <p>ENT: R$ {preco.toLocaleString("pt-BR")}</p>
            </div>
        </>
    )
}

export default CardIcon;