import { cars } from "../data/cars";

export const getCars = () => {
    return cars;
};

export const getTopBrands = (limit = 7) => {
    const brandCount = {};

    cars.forEach((car) => {
        brandCount[car.marca] = (brandCount[car.marca] || 0) + 1;
    });

    return Object.entries(brandCount)
        .map(([marca, quantidade]) => ({
            marca,
            quantidade,
        }))
        .sort((a, b) => b.quantidade - a.quantidade)
        .slice(0, limit);
};