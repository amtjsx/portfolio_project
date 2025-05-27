const { v4: uuidv4 } = require("uuid")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const coupons = [
      {
        id: uuidv4(),
        code: "WELCOME20",
        description: "20% off your first subscription",
        discount_type: "percentage",
        discount_value: 20,
        max_discount_amount: 5000, // $50.00
        is_active: true,
        first_time_only: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "SUMMER2024",
        description: "15% off any plan for summer 2024",
        discount_type: "percentage",
        discount_value: 15,
        max_discount_amount: 3000, // $30.00
        is_active: true,
        expires_at: new Date(2024, 8, 31), // September 31, 2024
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        code: "FREEBASIC",
        description: "First month free on Basic plan",
        discount_type: "fixed_amount",
        discount_value: 999, // $9.99
        currency: "USD",
        is_active: true,
        max_redemptions: 100,
        redemption_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    await queryInterface.bulkInsert("coupons", coupons, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("coupons", null, {})
  },
}
