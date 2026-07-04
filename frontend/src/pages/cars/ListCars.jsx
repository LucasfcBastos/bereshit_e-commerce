import { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

import HeaderTop from "../../components/header/HeaderTop";
import SelecterCard from "../../components/cards/SelecterCard";
import CardGrid from "../../components/cards/CardGrid";
import CardLine from "../../components/cards/CardLine";
import Pagination from "../../components/pagination/Pagination";

import "../../styles/Camp.css";
import "../../styles/Main.css";

function ListCars() {
    const [viewMode, setViewMode] = useState("grid");
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 15;

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getCars();
            setCars(data);
        };

        fetchCars();
    }, []);

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.toReversed().slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(cars.length / carsPerPage);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage]);

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
                        {currentCars.map((car) => (
                            <CardGrid nome={car.nome} ano={car.ano} km={car.km} preco={car.preco} />
                        ))}
                    </div>
                ) : (
                    <div className="camp line">
                        {currentCars.map((car) => (
                            <CardLine nome={car.nome} ano={car.ano} km={car.km} preco={car.preco} />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                )}

            </main>
        </div>
    );
}

export default ListCars;