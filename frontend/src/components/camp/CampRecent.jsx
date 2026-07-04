import { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

import CardGrid from "../../components/cards/CardGrid";

import "../../styles/Card.css";

function CampRecent() {
    const [recentCars, setRecentCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getCars();

            setRecentCars(data.slice(-5).reverse());
        };

        fetchCars();
    }, []);

    return (
        <>
            <div className="camp standard">
                <div className="recent-text">
                    <div>
                        <h1>Veículos Recentes</h1>
                        <p>Confira os últimos modelos adicionados à nossa frota.</p>
                    </div>
                    <p>VER TODOS →</p>
                </div>
                <div className="recent-cars">
                    {recentCars.map(car => (
                        <CardGrid
                            key={car.id}
                            nome={car.nome}
                            ano={car.ano}
                            km={car.km}
                            preco={car.preco}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default CampRecent;