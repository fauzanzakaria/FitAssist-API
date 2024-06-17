const prisma = require('../prisma');

const predictNutrition = async (req, res) => {
    try {
        const { name, weight } = req.params; //prev body
        const food = await prisma.nutrition.findMany({ //prev find first
            where: { //no contains
                name: {
                    contains: name, 
                },
            }
        });

        if (!food) {
            return res.status(404).json({ error: "Data tidak ditemukan" });
        }

        const predictedNutrition = {
            calories: Math.round((food.calories / 100) * weight),
            proteins: parseFloat(((food.proteins / 100) * weight).toFixed(2)),
            fat: parseFloat(((food.fat / 100) * weight).toFixed(2)),
            carbohydrate: parseFloat(((food.carbohydrate / 100) * weight).toFixed(2)),
            name: food.name,
        };

        res.status(200).json({
            message: "Prediksi Nutrisi Berhasil",
            predictedNutrition
        });
    } catch (error) {
        console.error("Prediksi Gagal:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};

module.exports = { 
    predictNutrition
};