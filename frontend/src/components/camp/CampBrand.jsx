import { useEffect, useState } from "react";
import { getTopBrands } from "../../services/carService";
import { useNavigate } from "react-router-dom";

import Roda from "../../assets/img/roda.png";

function CampRecent() {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setBrands(getTopBrands());
    }, []);

    return (
        <>
            <h1>ENCONTRE A SUA MARCA</h1>
            <div className="brands-grid">
                {brands.map((brand) => (
                    <div key={brand.marca} className="card-rod" onClick={() => navigate(`/cars?brand=${encodeURIComponent(brand.marca)}`)}>
                        <img src={Roda} alt={brand.marca} />
                        <div>
                            <p>{brand.marca}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CampRecent;