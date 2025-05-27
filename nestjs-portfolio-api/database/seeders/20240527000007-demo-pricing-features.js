const { v4: uuidv4 } = require("uuid")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, get the pricing plans and features
    const plans = await queryInterface.sequelize.query(
      `SELECT id, name, tier FROM pricing_plans WHERE deleted_at IS NULL`,
      { type: Sequelize.QueryTypes.SELECT },
    )

    const features = await queryInterface.sequelize.query(`SELECT id, key FROM features WHERE deleted_at IS NULL`, {
      type: Sequelize.QueryTypes.SELECT,
    })

    // Create a map for easier access
    const planMap = {}
    const featureMap = {}

    plans.forEach((plan) => {
      planMap[plan.tier] = plan.id
    })

    features.forEach((feature) => {
      featureMap[feature.key] = feature.id
    })

    // Define feature assignments for each plan
    const pricingFeatures = []

    // Free Plan Features
    if (planMap.free && featureMap.portfolio_websites) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.free,
        feature_id: featureMap.portfolio_websites,
        value: "1",
        is_enabled: true,
        limit: 1,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.free && featureMap.projects_per_portfolio) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.free,
        feature_id: featureMap.projects_per_portfolio,
        value: "5",
        is_enabled: true,
        limit: 5,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.free && featureMap.storage_space) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.free,
        feature_id: featureMap.storage_space,
        value: "50 MB",
        is_enabled: true,
        limit: 50,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.free && featureMap.email_support) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.free,
        feature_id: featureMap.email_support,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // Basic Plan Features
    if (planMap.basic && featureMap.portfolio_websites) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.basic,
        feature_id: featureMap.portfolio_websites,
        value: "3",
        is_enabled: true,
        limit: 3,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.basic && featureMap.projects_per_portfolio) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.basic,
        feature_id: featureMap.projects_per_portfolio,
        value: "20",
        is_enabled: true,
        limit: 20,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.basic && featureMap.storage_space) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.basic,
        feature_id: featureMap.storage_space,
        value: "200 MB",
        is_enabled: true,
        limit: 200,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.basic && featureMap.custom_domain) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.basic,
        feature_id: featureMap.custom_domain,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.basic && featureMap.remove_watermark) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.basic,
        feature_id: featureMap.remove_watermark,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.basic && featureMap.basic_analytics) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.basic,
        feature_id: featureMap.basic_analytics,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.basic && featureMap.email_support) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.basic,
        feature_id: featureMap.email_support,
        is_enabled: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // Pro Plan Features
    if (planMap.pro && featureMap.portfolio_websites) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.pro,
        feature_id: featureMap.portfolio_websites,
        value: "10",
        is_enabled: true,
        limit: 10,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.pro && featureMap.projects_per_portfolio) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.pro,
        feature_id: featureMap.projects_per_portfolio,
        value: "100",
        is_enabled: true,
        limit: 100,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.pro && featureMap.storage_space) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.pro,
        feature_id: featureMap.storage_space,
        value: "1 GB",
        is_enabled: true,
        limit: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // Add all premium features to Pro plan
    const proFeatures = [
      "custom_domain",
      "remove_watermark",
      "custom_branding",
      "basic_analytics",
      "advanced_analytics",
      "google_analytics",
      "email_support",
      "priority_support",
      "blog_feature",
      "seo_tools",
      "custom_templates",
    ]

    proFeatures.forEach((featureKey) => {
      if (planMap.pro && featureMap[featureKey]) {
        pricingFeatures.push({
          id: uuidv4(),
          pricing_plan_id: planMap.pro,
          feature_id: featureMap[featureKey],
          is_enabled: true,
          created_at: new Date(),
          updated_at: new Date(),
        })
      }
    })

    if (planMap.pro && featureMap.team_members) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.pro,
        feature_id: featureMap.team_members,
        value: "3",
        is_enabled: true,
        limit: 3,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // Enterprise Plan Features - Everything unlimited
    if (planMap.enterprise && featureMap.portfolio_websites) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.enterprise,
        feature_id: featureMap.portfolio_websites,
        value: "Unlimited",
        is_enabled: true,
        limit: 100,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.enterprise && featureMap.projects_per_portfolio) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.enterprise,
        feature_id: featureMap.projects_per_portfolio,
        value: "Unlimited",
        is_enabled: true,
        limit: 1000,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.enterprise && featureMap.storage_space) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.enterprise,
        feature_id: featureMap.storage_space,
        value: "10 GB",
        is_enabled: true,
        limit: 10000,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    if (planMap.enterprise && featureMap.team_members) {
      pricingFeatures.push({
        id: uuidv4(),
        pricing_plan_id: planMap.enterprise,
        feature_id: featureMap.team_members,
        value: "Unlimited",
        is_enabled: true,
        limit: 100,
        created_at: new Date(),
        updated_at: new Date(),
      })
    }

    // Add all features to Enterprise plan
    Object.keys(featureMap).forEach((featureKey) => {
      // Skip features already added with custom values
      if (!["portfolio_websites", "projects_per_portfolio", "storage_space", "team_members"].includes(featureKey)) {
        if (planMap.enterprise && featureMap[featureKey]) {
          pricingFeatures.push({
            id: uuidv4(),
            pricing_plan_id: planMap.enterprise,
            feature_id: featureMap[featureKey],
            is_enabled: true,
            created_at: new Date(),
            updated_at: new Date(),
          })
        }
      }
    })

    // Insert all pricing features
    if (pricingFeatures.length > 0) {
      await queryInterface.bulkInsert("pricing_features", pricingFeatures, {})
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("pricing_features", null, {})
  },
}
