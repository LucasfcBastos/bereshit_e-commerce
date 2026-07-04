import { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

import HeaderTop from "../../components/header/HeaderTop";
import SelecterCard from "../../components/cards/SelecterCard";
import CardGrid from "../../components/cards/CardGrid";
import CardLine from "../../components/cards/CardLine";

import "../../styles/Camp.css";
import "../../styles/Main.css";

function ListCars() {
    const [viewMode, setViewMode] = useState("grid");
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
                <div className="top">
                    <h1>TODOS OS CARROS</h1>
                    <SelecterCard viewMode={viewMode} setViewMode={setViewMode} />
                </div>

                {viewMode === "grid" ? (
                    <div className="camp grid">
                        {cars.map((car) => (
                            <CardGrid nome={car.nome} ano={car.ano} km={car.km} preco={car.preco} />
                        ))}
                    </div>
                ) : (
                    <div className="camp line">
                        {cars.map((car) => (
                            <CardLine nome={car.nome} ano={car.ano} km={car.km} preco={car.preco} />
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}

export default ListCars;