import { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

import HeaderTop from "../../components/header/HeaderTop";
import CardIcon from "../../components/cards/CardIcon";

import "../../styles/Camp.css";

function ListCars() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getCars();
            setCars(data);
        };

        fetchCars();
    }, []);

    return (
        <div>
            <HeaderTop />

            <main className="container first">
                <h1 style={{ marginBottom: "25px" }}>TODOS OS CARROS</h1>

                <div className="camp icon">
                    {cars.map((car) => (
                        <CardIcon 
                            nome={car.nome}
                            ano={car.ano}
                            km={car.km}
                            preco={car.preco}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ListCars;