import Grid from "../../assets/svg/IconGrid.svg";
import List from "../../assets/svg/IconList.svg";

function SelecterCard({ viewMode, setViewMode }) {
    return (
        <>
            <div>
                <p>Ordenar por: </p>
                <button className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>
                    <img src={Grid} />
                </button>
                <button className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>
                    <img src={List} />
                </button>
            </div>
        </>
    )
}

export default SelecterCard;