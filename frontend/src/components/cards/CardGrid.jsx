import { useNavigate } from "react-router-dom";
import "../../styles/Card.css";

function CardGrid({ id, image, nome, ano, km, preco }) {

    const navigate = useNavigate();

    return (
        <>
            <div className="card grid" onClick={() => navigate(`/cars/${id}`)}>
                <img src={image} />
                <p>{nome}</p>
                <p>{ano} - {km} Km</p>
                <p>ENT: R$ {preco.toLocaleString("pt-BR")}</p>
            </div>
        </>
    )
}

export default CardGrid;