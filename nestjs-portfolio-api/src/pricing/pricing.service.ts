import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4 } from "uuid";
import { Op } from "../common/models/sequelize-imports";
import { User } from "../user/models/user.model";
import { ApplyCouponDto } from "./dto/apply-coupon.dto";
import { AssignFeaturesDto } from "./dto/assign-features.dto";
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { CreateFeatureDto } from "./dto/create-feature.dto";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { CreatePricingPlanDto } from "./dto/create-pricing-plan.dto";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";
import { UpdateFeatureDto } from "./dto/update-feature.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { UpdatePricingPlanDto } from "./dto/update-pricing-plan.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { Coupon } from "./models/coupon.model";
import { Feature } from "./models/feature.model";
import { Payment } from "./models/payment.model";
import { PricingFeature } from "./models/pricing-feature.model";
import { PricingPlan } from "./models/pricing.model";
import { Subscription } from "./models/subscription.model";

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(PricingPlan)
    private pricingPlanModel: typeof PricingPlan,
    @InjectModel(Subscription)
    private subscriptionModel: typeof Subscription,
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
    @InjectModel(Coupon)
    private couponModel: typeof Coupon,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Feature)
    private featureModel: typeof Feature,
    @InjectModel(PricingFeature)
    private pricingFeatureModel: typeof PricingFeature
  ) {}

  // Pricing Plan Methods
  async findAllPlans(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

    const plans = await this.pricingPlanModel.findAll({
      where,
      include: [
        {
          model: Feature,
          through: {
            attributes: ["value", "isEnabled", "limit", "metadata"],
          },
          attributes: [
            "id",
            "name",
            "description",
            "key",
            "category",
            "type",
            "icon",
          ],
        },
      ],
      order: [["sortOrder", "ASC"]],
    });

    return {
      data: plans,
      total: plans.length,
    };
  }

  async findPlanById(id: string) {
    const plan = await this.pricingPlanModel.findByPk(id, {
      include: [
        {
          model: Feature,
          through: {
            attributes: ["value", "isEnabled", "limit", "metadata"],
          },
          attributes: [
            "id",
            "name",
            "description",
            "key",
            "category",
            "type",
            "icon",
          ],
        },
      ],
    });

    if (!plan) {
      throw new NotFoundException(`Pricing plan with ID ${id} not found`);
    }

    return plan;
  }

  async createPlan(createPricingPlanDto: CreatePricingPlanDto) {
    const plan = await this.pricingPlanModel.create({
      ...createPricingPlanDto,
      id: uuidv4(),
      discountValidUntil: createPricingPlanDto.discountValidUntil
        ? new Date(createPricingPlanDto.discountValidUntil)
        : null,
    });

    return plan;
  }

  async updatePlan(id: string, updatePricingPlanDto: UpdatePricingPlanDto) {
    const plan = await this.findPlanById(id);

    await plan.update({
      ...updatePricingPlanDto,
      discountValidUntil: updatePricingPlanDto.discountValidUntil
        ? new Date(updatePricingPlanDto.discountValidUntil)
        : null,
    });

    return plan;
  }

  async removePlan(id: string) {
    const plan = await this.findPlanById(id);

    // Check if there are active subscriptions using this plan
    const activeSubscriptions = await this.subscriptionModel.count({
      where: {
        planId: id,
        status: "active",
      },
    });

    if (activeSubscriptions > 0) {
      throw new BadRequestException(
        `Cannot delete plan with active subscriptions`
      );
    }

    await plan.destroy();

    return {
      success: true,
      message: `Pricing plan with ID ${id} deleted successfully`,
    };
  }

  async getFeaturedPlans() {
    const plans = await this.pricingPlanModel.scope("featured").findAll({
      order: [["sortOrder", "ASC"]],
    });

    return {
      data: plans,
      total: plans.length,
    };
  }

  // Subscription Methods
  async findAllSubscriptions(filters: any = {}) {
    const { userId, status, planId } = filters;

    const where: any = {};

    if (userId) where.userId = userId;
    if (status) where.status = status;
    if (planId) where.planId = planId;

    const subscriptions = await this.subscriptionModel.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: PricingPlan,
          attributes: ["id", "name", "price", "currency", "billingInterval"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: subscriptions,
      total: subscriptions.length,
    };
  }

  async findSubscriptionById(id: string) {
    const subscription = await this.subscriptionModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: PricingPlan,
          attributes: [
            "id",
            "name",
            "price",
            "currency",
            "billingInterval",
            "features",
            "limits",
          ],
        },
      ],
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${id} not found`);
    }

    return subscription;
  }

  async findUserSubscriptions(userId: string) {
    const subscriptions = await this.subscriptionModel.findAll({
      where: { userId },
      include: [
        {
          model: PricingPlan,
          attributes: [
            "id",
            "name",
            "price",
            "currency",
            "billingInterval",
            "features",
            "limits",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: subscriptions,
      total: subscriptions.length,
    };
  }

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    // Check if user exists
    const user = await this.userModel.findByPk(createSubscriptionDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createSubscriptionDto.userId} not found`
      );
    }

    // Check if plan exists
    const plan = await this.pricingPlanModel.findByPk(
      createSubscriptionDto.planId
    );
    if (!plan) {
      throw new NotFoundException(
        `Pricing plan with ID ${createSubscriptionDto.planId} not found`
      );
    }

    // Check if plan is active
    if (!plan.isActive) {
      throw new BadRequestException(
        `Pricing plan with ID ${createSubscriptionDto.planId} is not active`
      );
    }

    // Check if user already has an active subscription for this plan
    const existingSubscription = await this.subscriptionModel.findOne({
      where: {
        userId: createSubscriptionDto.userId,
        planId: createSubscriptionDto.planId,
        status: "active",
      },
    });

    if (existingSubscription) {
      throw new ConflictException(
        `User already has an active subscription for this plan`
      );
    }

    // Calculate dates
    const now = new Date();
    const startDate = createSubscriptionDto.startDate
      ? new Date(createSubscriptionDto.startDate)
      : now;
    let endDate = null;
    let currentPeriodEnd = null;

    if (plan.billingInterval === "month") {
      currentPeriodEnd = new Date(startDate);
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    } else if (plan.billingInterval === "year") {
      currentPeriodEnd = new Date(startDate);
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    } else if (plan.billingInterval === "one-time") {
      // For one-time payments, set a far future date
      currentPeriodEnd = new Date(startDate);
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 100);
      endDate = currentPeriodEnd;
    }

    // Set trial end date if applicable
    let trialEndDate = null;
    if (plan.trialPeriodDays > 0) {
      trialEndDate = new Date(startDate);
      trialEndDate.setDate(trialEndDate.getDate() + plan.trialPeriodDays);
    }

    // Create subscription
    const subscription = await this.subscriptionModel.create({
      id: uuidv4(),
      userId: createSubscriptionDto.userId,
      planId: createSubscriptionDto.planId,
      status:
        createSubscriptionDto.status || (trialEndDate ? "trialing" : "active"),
      startDate,
      endDate,
      trialEndDate,
      currentPeriodStart: startDate,
      currentPeriodEnd,
      autoRenew:
        createSubscriptionDto.autoRenew !== undefined
          ? createSubscriptionDto.autoRenew
          : true,
      externalSubscriptionId: createSubscriptionDto.externalSubscriptionId,
      paymentProvider: createSubscriptionDto.paymentProvider,
      metadata: createSubscriptionDto.metadata,
    });

    return subscription;
  }

  async updateSubscription(
    id: string,
    updateSubscriptionDto: UpdateSubscriptionDto
  ) {
    const subscription = await this.findSubscriptionById(id);

    // Handle cancellation
    if (updateSubscriptionDto.canceledAt && !subscription.canceledAt) {
      updateSubscriptionDto.status = "canceled";
    }

    await subscription.update({
      status: updateSubscriptionDto.status,
    });

    return subscription;
  }

  async renewSubscription(id: string) {
    const subscription = await this.findSubscriptionById(id);

    if (
      subscription.status !== "active" &&
      subscription.status !== "trialing"
    ) {
      throw new BadRequestException(
        `Cannot renew subscription with status ${subscription.status}`
      );
    }

    if (!subscription.autoRenew) {
      throw new BadRequestException(`Subscription auto-renewal is disabled`);
    }

    const plan = await this.pricingPlanModel.findByPk(subscription.planId);

    if (!plan || !plan.isActive) {
      throw new BadRequestException(`Associated pricing plan is not active`);
    }

    // Calculate new period
    const newPeriodStart = new Date(subscription.currentPeriodEnd);
    const newPeriodEnd = new Date(newPeriodStart);

    if (plan.billingInterval === "month") {
      newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 1);
    } else if (plan.billingInterval === "year") {
      newPeriodEnd.setFullYear(newPeriodEnd.getFullYear() + 1);
    }

    // Update subscription
    await subscription.update({
      status: "active",
      currentPeriodStart: newPeriodStart,
      currentPeriodEnd: newPeriodEnd,
    });

    // Create payment record
    await this.createPayment({
      userId: subscription.userId,
      subscriptionId: subscription.id,
      amount: plan.price,
      currency: plan.currency,
      status: "succeeded",
      paymentMethod: "card", // Default
      description: `Subscription renewal for ${plan.name} plan`,
      metadata: {
        renewalDate: new Date().toISOString(),
        billingPeriod: `${newPeriodStart.toISOString()} to ${newPeriodEnd.toISOString()}`,
      },
    });

    return subscription;
  }

  async cancelSubscription(id: string, reason?: string) {
    const subscription = await this.findSubscriptionById(id);

    if (subscription.status === "canceled") {
      throw new BadRequestException(`Subscription is already canceled`);
    }

    await subscription.update({
      status: "canceled",
      canceledAt: new Date(),
      cancellationReason: reason,
      autoRenew: false,
    });

    return subscription;
  }

  async deleteSubscription(id: string) {
    const subscription = await this.findSubscriptionById(id);

    await subscription.destroy();

    return {
      success: true,
      message: `Subscription with ID ${id} deleted successfully`,
    };
  }

  // Payment Methods
  async findAllPayments(filters: any = {}) {
    const { userId, subscriptionId, status } = filters;

    const where: any = {};

    if (userId) where.userId = userId;
    if (subscriptionId) where.subscriptionId = subscriptionId;
    if (status) where.status = status;

    const payments = await this.paymentModel.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Subscription,
          include: [
            {
              model: PricingPlan,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return {
      data: payments,
      total: payments.length,
    };
  }

  async findPaymentById(id: string) {
    const payment = await this.paymentModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Subscription,
          include: [
            {
              model: PricingPlan,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    // Check if user exists
    const user = await this.userModel.findByPk(createPaymentDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPaymentDto.userId} not found`
      );
    }

    // Check if subscription exists if provided
    if (createPaymentDto.subscriptionId) {
      const subscription = await this.subscriptionModel.findByPk(
        createPaymentDto.subscriptionId
      );
      if (!subscription) {
        throw new NotFoundException(
          `Subscription with ID ${createPaymentDto.subscriptionId} not found`
        );
      }
    }

    // Create payment
    const payment = await this.paymentModel.create({
      id: uuidv4(),
      ...createPaymentDto,
    });

    return payment;
  }

  async updatePayment(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findPaymentById(id);

    // If payment is being refunded
    if (
      updatePaymentDto.status === "refunded" &&
      payment.status !== "refunded"
    ) {
      if (!updatePaymentDto.refundAmount) {
        updatePaymentDto.refundAmount = payment.amount;
      }

      if (!updatePaymentDto.refundId) {
        updatePaymentDto.refundId = `refund_${Date.now()}`;
      }
    }

    await payment.update(updatePaymentDto);

    return payment;
  }

  async deletePayment(id: string) {
    const payment = await this.findPaymentById(id);

    await payment.destroy();

    return {
      success: true,
      message: `Payment with ID ${id} deleted successfully`,
    };
  }

  // Coupon Methods
  async findAllCoupons(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

    const coupons = await this.couponModel.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    return {
      data: coupons,
      total: coupons.length,
    };
  }

  async findCouponById(id: string) {
    const coupon = await this.couponModel.findByPk(id);

    if (!coupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`);
    }

    return coupon;
  }

  async findCouponByCode(code: string) {
    const coupon = await this.couponModel.findOne({
      where: { code },
    });

    if (!coupon) {
      throw new NotFoundException(`Coupon with code ${code} not found`);
    }

    return coupon;
  }

  async createCoupon(createCouponDto: CreateCouponDto) {
    // Check if coupon code already exists
    const existingCoupon = await this.couponModel.findOne({
      where: { code: createCouponDto.code },
    });

    if (existingCoupon) {
      throw new ConflictException(
        `Coupon with code ${createCouponDto.code} already exists`
      );
    }

    // Create coupon
    const coupon = await this.couponModel.create({
      id: uuidv4(),
      ...createCouponDto,
      expiresAt: createCouponDto.expiresAt
        ? new Date(createCouponDto.expiresAt)
        : null,
    });

    return coupon;
  }

  async updateCoupon(id: string, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findCouponById(id);

    // If code is being updated, check if it already exists
    if (updateCouponDto.code && updateCouponDto.code !== coupon.code) {
      const existingCoupon = await this.couponModel.findOne({
        where: { code: updateCouponDto.code },
      });

      if (existingCoupon) {
        throw new ConflictException(
          `Coupon with code ${updateCouponDto.code} already exists`
        );
      }
    }

    await coupon.update({
      ...updateCouponDto,
      expiresAt: updateCouponDto.expiresAt
        ? new Date(updateCouponDto.expiresAt)
        : coupon.expiresAt,
    });

    return coupon;
  }

  async deleteCoupon(id: string) {
    const coupon = await this.findCouponById(id);

    await coupon.destroy();

    return {
      success: true,
      message: `Coupon with ID ${id} deleted successfully`,
    };
  }

  async applyCoupon(applyCouponDto: ApplyCouponDto) {
    const { code, planId } = applyCouponDto;

    // Find coupon
    const coupon = await this.couponModel.findOne({
      where: { code, isActive: true },
    });

    if (!coupon) {
      throw new NotFoundException(
        `Coupon with code ${code} not found or inactive`
      );
    }

    // Check if coupon is expired
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      throw new BadRequestException(`Coupon with code ${code} has expired`);
    }

    // Check if coupon has reached max redemptions
    if (
      coupon.maxRedemptions &&
      coupon.redemptionCount >= coupon.maxRedemptions
    ) {
      throw new BadRequestException(
        `Coupon with code ${code} has reached maximum redemptions`
      );
    }

    // Check if coupon is applicable to the plan
    if (
      planId &&
      coupon.applicablePlanIds &&
      coupon.applicablePlanIds.length > 0
    ) {
      if (!coupon.applicablePlanIds.includes(planId)) {
        throw new BadRequestException(
          `Coupon with code ${code} is not applicable to this plan`
        );
      }
    }

    // If planId is provided, calculate discounted price
    let discountedPrice = null;
    let originalPrice = null;
    let discount = null;

    if (planId) {
      const plan = await this.pricingPlanModel.findByPk(planId);

      if (!plan) {
        throw new NotFoundException(`Pricing plan with ID ${planId} not found`);
      }

      originalPrice = plan.price;

      if (coupon.discountType === "percentage") {
        discount = Math.round((plan.price * coupon.discountValue) / 100);

        // Apply max discount if set
        if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
          discount = coupon.maxDiscountAmount;
        }
      } else {
        discount = coupon.discountValue;
      }

      discountedPrice = Math.max(0, plan.price - discount);
    }

    // Increment redemption count
    await coupon.update({
      redemptionCount: coupon.redemptionCount + 1,
    });

    return {
      coupon,
      discount,
      originalPrice,
      discountedPrice,
      message: `Coupon ${code} applied successfully`,
    };
  }

  // Utility Methods
  async getUserActiveSubscription(userId: string) {
    const subscription = await this.subscriptionModel.findOne({
      where: {
        userId,
        status: {
          [Op.in]: ["active", "trialing"],
        },
      },
      include: [
        {
          model: PricingPlan,
          attributes: [
            "id",
            "name",
            "price",
            "currency",
            "billingInterval",
            "features",
            "limits",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return subscription;
  }

  async checkUserSubscriptionAccess(userId: string, featureKey: string) {
    const subscription = await this.getUserActiveSubscription(userId);

    if (!subscription) {
      return {
        hasAccess: false,
        message: "No active subscription found",
      };
    }

    const planFeatureCheck = await this.checkPlanHasFeature(
      subscription.planId,
      featureKey
    );

    return {
      hasAccess: planFeatureCheck.hasFeature,
      subscription,
      plan: subscription.plan,
      feature: planFeatureCheck.feature,
      value: planFeatureCheck.value,
      limit: planFeatureCheck.limit,
      message: planFeatureCheck.message,
    };
  }

  // Feature Methods
  async findAllFeatures(includeInactive = false) {
    const where = includeInactive ? {} : { isActive: true };

    const features = await this.featureModel.findAll({
      where,
      order: [
        ["category", "ASC"],
        ["sortOrder", "ASC"],
        ["name", "ASC"],
      ],
    });

    return {
      data: features,
      total: features.length,
    };
  }

  async findFeatureById(id: string) {
    const feature = await this.featureModel.findByPk(id, {
      include: [
        {
          model: PricingPlan,
          through: {
            attributes: ["value", "isEnabled", "limit"],
          },
          attributes: ["id", "name", "tier"],
        },
      ],
    });

    if (!feature) {
      throw new NotFoundException(`Feature with ID ${id} not found`);
    }

    return feature;
  }

  async findFeatureByKey(key: string) {
    const feature = await this.featureModel.findOne({
      where: { key },
    });

    if (!feature) {
      throw new NotFoundException(`Feature with key ${key} not found`);
    }

    return feature;
  }

  async createFeature(createFeatureDto: CreateFeatureDto) {
    // Check if feature with same key already exists
    if (createFeatureDto.key) {
      const existingFeature = await this.featureModel.findOne({
        where: { key: createFeatureDto.key },
      });

      if (existingFeature) {
        throw new ConflictException(
          `Feature with key ${createFeatureDto.key} already exists`
        );
      }
    }

    const feature = await this.featureModel.create({
      id: uuidv4(),
      ...createFeatureDto,
    });

    return feature;
  }

  async updateFeature(id: string, updateFeatureDto: UpdateFeatureDto) {
    const feature = await this.findFeatureById(id);

    // If key is being updated, check if it already exists
    if (updateFeatureDto.key && updateFeatureDto.key !== feature.key) {
      const existingFeature = await this.featureModel.findOne({
        where: { key: updateFeatureDto.key },
      });

      if (existingFeature) {
        throw new ConflictException(
          `Feature with key ${updateFeatureDto.key} already exists`
        );
      }
    }

    await feature.update(updateFeatureDto);

    return feature;
  }

  async deleteFeature(id: string) {
    const feature = await this.findFeatureById(id);

    // Remove all associations with pricing plans
    await this.pricingFeatureModel.destroy({
      where: { featureId: id },
    });

    await feature.destroy();

    return {
      success: true,
      message: `Feature with ID ${id} deleted successfully`,
    };
  }

  async assignFeaturesToPlan(
    planId: string,
    assignFeaturesDto: AssignFeaturesDto
  ) {
    const plan = await this.findPlanById(planId);

    // Remove existing feature assignments
    await this.pricingFeatureModel.destroy({
      where: { pricingPlanId: planId },
    });

    // Create new feature assignments
    const assignments = await Promise.all(
      assignFeaturesDto.features.map(async (assignment) => {
        // Check if feature exists
        const feature = await this.featureModel.findByPk(assignment.featureId);
        if (!feature) {
          throw new NotFoundException(
            `Feature with ID ${assignment.featureId} not found`
          );
        }

        return this.pricingFeatureModel.create({
          id: uuidv4(),
          pricingPlanId: planId,
          featureId: assignment.featureId,
          isEnabled:
            assignment.isEnabled !== undefined ? assignment.isEnabled : true,
          value: assignment.value,
          limit: assignment.limit,
          metadata: assignment.metadata,
        });
      })
    );

    // Return the updated plan with features
    return this.findPlanById(planId);
  }

  async getPlanFeatures(planId: string) {
    const plan = await this.findPlanById(planId);

    const features = await this.pricingFeatureModel.findAll({
      where: { pricingPlanId: planId },
      include: [
        {
          model: Feature,
          attributes: [
            "id",
            "name",
            "description",
            "key",
            "category",
            "type",
            "icon",
          ],
        },
      ],
      order: [[Feature, "sortOrder", "ASC"]],
    });

    return {
      plan: {
        id: plan.id,
        name: plan.name,
        tier: plan.tier,
      },
      features: features.map((pf) => ({
        id: pf.feature.id,
        name: pf.feature.name,
        description: pf.feature.description,
        key: pf.feature.key,
        category: pf.feature.category,
        type: pf.feature.type,
        icon: pf.feature.icon,
        isEnabled: pf.isEnabled,
        value: pf.value,
        limit: pf.limit,
        metadata: pf.metadata,
      })),
      total: features.length,
    };
  }

  async checkPlanHasFeature(planId: string, featureKey: string) {
    const feature = await this.featureModel.findOne({
      where: { key: featureKey },
    });

    if (!feature) {
      return {
        hasFeature: false,
        message: `Feature with key ${featureKey} not found`,
      };
    }

    const pricingFeature = await this.pricingFeatureModel.findOne({
      where: {
        pricingPlanId: planId,
        featureId: feature.id,
        isEnabled: true,
      },
    });

    if (!pricingFeature) {
      return {
        hasFeature: false,
        feature,
        message: `Plan does not include feature ${feature.name}`,
      };
    }

    return {
      hasFeature: true,
      feature,
      value: pricingFeature.value,
      limit: pricingFeature.limit,
      metadata: pricingFeature.metadata,
      message: `Plan includes feature ${feature.name}`,
    };
  }
}
