import "../../styles/Card.css";

function CardGrid({ image, nome, ano, km, preco }) {
    return (
        <>
            <div className="card grid">
                <img src={image} />
                <p>{nome}</p>
                <p>{ano} - {km} Km</p>
                <p>ENT: R$ {preco.toLocaleString("pt-BR")}</p>
            </div>
        </>
    )
}

export default CardGrid;