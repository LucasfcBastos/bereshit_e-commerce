import { getCars } from "../../services/carService";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import HeaderTop from "../../components/header/HeaderTop";

import "../../styles/Btn.css"
import "../../styles/Main.css"

function ViewCars() {

    const [cars, setCars] = useState([]);
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    
    useEffect(() => {
        const fetchCars = async () => {
            const data = await getCars();
            setCars(data);
        };

        fetchCars();
    }, []);

    const car = cars.find((item) => item.id === Number(id));

    if (!car) {
        return (
            <div>
                <HeaderTop />

                <main className="first container">
                    <p>Carregando...</p>
                </main>
            </div>
        );
    }

    return (
        <div>
            <HeaderTop />

            <main className="first container">

                <button className="btn back">
                    <p>{"<"}</p>
                </button>
                
                <div className="highlight">
                    <div className="all-images">
                        {car.images.map((img, index) => (
                            <div key={index} className={selectedImage === index ? "active" : ""} onClick={() => setSelectedImage(index)}>
                                <img key={index} src={img} alt={`Imagem ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <img src={car.images[selectedImage]} />

                    <div className="info">
                        <h1>{car.nome}</h1>
                        <p className="paint-text" style={{marginBottom: "1em"}}>{car.marca}</p>
                        <p>{car.ano} ● {car.km}</p>
                        <hr />
                        <h1 style={{marginBottom: "1em"}}>ENTRADA DE: R$ {car.preco.toLocaleString("pt-BR")}</h1>
                        <p>PARCELAMOS EM BOLETO DE:</p>
                        <p>● 36x: R$ {car.parcelamento[0].toLocaleString("pt-BR")}</p>
                        <p>● 48x: R$ {car.parcelamento[1].toLocaleString("pt-BR")}</p>
                        <hr />
                        <button>CONVERSAR COM O VENDEDOR</button>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default ViewCars;