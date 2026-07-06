import img1 from "../assets/img/replica_carro_f1_decorativo_4_42x2_00_scala_1_1_lts_gran_belo_73759_2_59fb7643f990c5084c6520fa092dc341_20230313190018.png"
import img2 from "../assets/img/images.png"

export const cars = [];

for (let grupo = 1; grupo <= 25; grupo++) {
    cars.push({ 
        id: grupo,
        nome: `CARRO ${String(grupo).padStart(2, "0")}`,
        marca: grupo % 2 === 0 ? "Lamborghini" : "BMW",
        ano: "2024",
        km: 15000,
        preco: grupo % 2 === 0 ? 165000 : 145000,
        parcelamento: [
            500,
            1000
        ],
        images: [
            img1,
            img2,
            ""
        ]
    });
}