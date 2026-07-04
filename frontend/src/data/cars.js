export const cars = [];

for (let grupo = 1; grupo <= 25; grupo++) {
    cars.push({
        id: `${grupo}`,
        nome: `CARRO ${String(grupo).padStart(2, "0")}`,
        marca: grupo % 2 === 0 ? "Lamborghini" : "BMW",
        ano: "2024",
        km: 15000,
        preco: grupo % 2 === 0 ? 165000 : 145000,
        imagem: ""
    });
}