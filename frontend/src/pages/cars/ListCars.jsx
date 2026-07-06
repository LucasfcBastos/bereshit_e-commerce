import { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

import HeaderTop from "../../components/header/HeaderTop";
import SelecterCard from "../../components/cards/SelecterCard";
import BrandFilter from "../../components/camp/BrandFilter";
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
    const brands = [...new Set(cars.map(car => car.marca))];
    const hasFilter = brands.length > 1;
    const [selectedBrand, setSelectedBrand] = useState("all");

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getCars();
            setCars(data);
        };

        fetchCars();
    }, []);

    const filteredCars = selectedBrand === "all" ? cars : cars.filter(car => car.marca === selectedBrand);
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.toReversed().slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

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

                <div className="half">

                    {hasFilter && (
                        <BrandFilter brands={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
                    )}

                    <div className="list">
                        {viewMode === "grid" ? (
                            <div className="camp grid">
                                {currentCars.map((car) => (
                                    <CardGrid image={car.images[0]} nome={car.nome} ano={car.ano} km={car.km} preco={car.preco} />
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
                            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                        )}
                    </div>

                </div>

            </main>
        </div>
    );
}

export default ListCars;