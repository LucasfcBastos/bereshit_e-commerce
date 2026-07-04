import "../../styles/Camp.css";

function BrandFilter({ brands, selectedBrand, setSelectedBrand }) {
    return (
        <aside className="camp standard filter">
            <h1>FILTRAR POR</h1>
            <hr />

            <label className="radio-item">
                <input type="radio" name="brand" value="all" checked={selectedBrand === "all"} onChange={(e) => setSelectedBrand(e.target.value)} />
                <p>Todos as Marcas</p>
            </label>

            {brands.map((marca) => (
                <label key={marca} className="radio-item">
                    <input type="radio" name="brand" value={marca} checked={selectedBrand === marca} onChange={(e) => setSelectedBrand(e.target.value)} />
                    <p>{marca}</p>
                </label>
            ))}
        </aside>
    );
}

export default BrandFilter;