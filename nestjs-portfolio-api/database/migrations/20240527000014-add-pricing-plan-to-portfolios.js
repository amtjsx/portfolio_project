module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("portfolios", "pricing_plan_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "pricing_plans",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })

    // Add index
    await queryInterface.addIndex("portfolios", ["pricing_plan_id"])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("portfolios", "pricing_plan_id")
  },
}
