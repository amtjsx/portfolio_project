import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "src/user/models/user.model";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
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
import { PricingService } from "./pricing.service";

@ApiTags("pricing")
@Controller("pricing")
export class PricingController {
  constructor(private readonly pricingService: PricingService) {}

  // Pricing Plan Endpoints
  @Get("plans")
  @ApiOperation({ summary: "Get all pricing plans" })
  @ApiResponse({
    status: 200,
    description: "Pricing plans retrieved successfully",
  })
  findAllPlans(includeInactive: boolean) {
    return this.pricingService.findAllPlans(includeInactive === true);
  }

  @Get("plans/featured")
  @ApiOperation({ summary: "Get featured pricing plans" })
  @ApiResponse({
    status: 200,
    description: "Featured pricing plans retrieved successfully",
  })
  getFeaturedPlans() {
    return this.pricingService.getFeaturedPlans();
  }

  @Get("plans/:id")
  @ApiOperation({ summary: "Get a pricing plan by ID" })
  @ApiParam({ name: "id", description: "Pricing Plan ID" })
  @ApiResponse({
    status: 200,
    description: "Pricing plan retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Pricing plan not found" })
  findPlanById(@Param("id") id: string) {
    return this.pricingService.findPlanById(id);
  }

  @Post("plans")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new pricing plan" })
  @ApiResponse({
    status: 201,
    description: "Pricing plan created successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  createPlan(@Body() createPricingPlanDto: CreatePricingPlanDto) {
    return this.pricingService.createPlan(createPricingPlanDto);
  }

  @Patch("plans/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a pricing plan" })
  @ApiParam({ name: "id", description: "Pricing Plan ID" })
  @ApiResponse({
    status: 200,
    description: "Pricing plan updated successfully",
  })
  @ApiResponse({ status: 404, description: "Pricing plan not found" })
  updatePlan(
    @Param("id") id: string,
    @Body() updatePricingPlanDto: UpdatePricingPlanDto
  ) {
    return this.pricingService.updatePlan(id, updatePricingPlanDto);
  }

  @Delete("plans/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a pricing plan" })
  @ApiParam({ name: "id", description: "Pricing Plan ID" })
  @ApiResponse({
    status: 200,
    description: "Pricing plan deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Pricing plan not found" })
  @ApiResponse({
    status: 400,
    description: "Cannot delete plan with active subscriptions",
  })
  removePlan(@Param("id") id: string) {
    return this.pricingService.removePlan(id);
  }

  // Subscription Endpoints
  @Get("subscriptions")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all subscriptions" })
  @ApiResponse({
    status: 200,
    description: "Subscriptions retrieved successfully",
  })
  findAllSubscriptions(userId?: string, status?: string, planId?: string) {
    return this.pricingService.findAllSubscriptions({ userId, status, planId });
  }

  @Get("subscriptions/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a subscription by ID" })
  @ApiParam({ name: "id", description: "Subscription ID" })
  @ApiResponse({
    status: 200,
    description: "Subscription retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Subscription not found" })
  findSubscriptionById(@Param("id") id: string, @CurrentUser() user: any) {
    return this.pricingService.findSubscriptionById(id);
  }

  @Get("user/subscriptions")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user's subscriptions" })
  @ApiResponse({
    status: 200,
    description: "User subscriptions retrieved successfully",
  })
  findUserSubscriptions(@CurrentUser() user: any) {
    return this.pricingService.findUserSubscriptions(user.id);
  }

  @Post("subscriptions")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new subscription" })
  @ApiResponse({
    status: 201,
    description: "Subscription created successfully",
  })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 404, description: "User or pricing plan not found" })
  @ApiResponse({
    status: 409,
    description: "User already has an active subscription for this plan",
  })
  createSubscription(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @CurrentUser() user: User
  ) {
    return this.pricingService.createSubscription(createSubscriptionDto, user);
  }

  @Patch("subscriptions/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a subscription" })
  @ApiParam({ name: "id", description: "Subscription ID" })
  @ApiResponse({
    status: 200,
    description: "Subscription updated successfully",
  })
  @ApiResponse({ status: 404, description: "Subscription not found" })
  updateSubscription(
    @Param("id") id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @CurrentUser() user: any
  ) {
    return this.pricingService.updateSubscription(id, updateSubscriptionDto);
  }

  @Post("subscriptions/:id/cancel")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Cancel a subscription" })
  @ApiParam({ name: "id", description: "Subscription ID" })
  @ApiResponse({
    status: 200,
    description: "Subscription canceled successfully",
  })
  @ApiResponse({ status: 404, description: "Subscription not found" })
  @ApiResponse({ status: 400, description: "Subscription is already canceled" })
  cancelSubscription(
    @Param("id") id: string,
    @Body("reason") reason: string,
    @CurrentUser() user: any
  ) {
    return this.pricingService.cancelSubscription(id, reason);
  }

  @Post("subscriptions/:id/renew")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Manually renew a subscription" })
  @ApiParam({ name: "id", description: "Subscription ID" })
  @ApiResponse({
    status: 200,
    description: "Subscription renewed successfully",
  })
  @ApiResponse({ status: 404, description: "Subscription not found" })
  @ApiResponse({ status: 400, description: "Cannot renew subscription" })
  renewSubscription(@Param("id") id: string, @CurrentUser() user: any) {
    return this.pricingService.renewSubscription(id, user);
  }

  @Delete("subscriptions/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a subscription" })
  @ApiParam({ name: "id", description: "Subscription ID" })
  @ApiResponse({
    status: 200,
    description: "Subscription deleted successfully",
  })
  @ApiResponse({ status: 404, description: "Subscription not found" })
  deleteSubscription(@Param("id") id: string) {
    return this.pricingService.deleteSubscription(id);
  }

  // Payment Endpoints
  @Get("payments")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({ status: 200, description: "Payments retrieved successfully" })
  findAllPayments(userId?: string, subscriptionId?: string, status?: string) {
    return this.pricingService.findAllPayments({
      userId,
      subscriptionId,
      status,
    });
  }

  @Get("payments/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get a payment by ID" })
  @ApiParam({ name: "id", description: "Payment ID" })
  @ApiResponse({ status: 200, description: "Payment retrieved successfully" })
  @ApiResponse({ status: 404, description: "Payment not found" })
  findPaymentById(@Param("id") id: string, @CurrentUser() user: any) {
    return this.pricingService.findPaymentById(id);
  }

  @Get("user/payments")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get current user's payments" })
  @ApiResponse({
    status: 200,
    description: "User payments retrieved successfully",
  })
  findUserPayments(@CurrentUser() user: any) {
    return this.pricingService.findAllPayments({ userId: user.id });
  }

  @Post("payments")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new payment" })
  @ApiResponse({ status: 201, description: "Payment created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 404, description: "User or subscription not found" })
  createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
    @CurrentUser() user: User
  ) {
    return this.pricingService.createPayment(createPaymentDto, user);
  }

  @Patch("payments/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a payment" })
  @ApiParam({ name: "id", description: "Payment ID" })
  @ApiResponse({ status: 200, description: "Payment updated successfully" })
  @ApiResponse({ status: 404, description: "Payment not found" })
  updatePayment(
    @Param("id") id: string,
    @Body() updatePaymentDto: UpdatePaymentDto
  ) {
    return this.pricingService.updatePayment(id, updatePaymentDto);
  }

  @Delete("payments/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a payment" })
  @ApiParam({ name: "id", description: "Payment ID" })
  @ApiResponse({ status: 200, description: "Payment deleted successfully" })
  @ApiResponse({ status: 404, description: "Payment not found" })
  deletePayment(@Param("id") id: string) {
    return this.pricingService.deletePayment(id);
  }

  // Coupon Endpoints
  @Get("coupons")
  @ApiOperation({ summary: "Get all coupons" })
  @ApiResponse({ status: 200, description: "Coupons retrieved successfully" })
  findAllCoupons(includeInactive: boolean) {
    return this.pricingService.findAllCoupons(includeInactive === true);
  }

  @Get("coupons/:id")
  @ApiOperation({ summary: "Get a coupon by ID" })
  @ApiParam({ name: "id", description: "Coupon ID" })
  @ApiResponse({ status: 200, description: "Coupon retrieved successfully" })
  @ApiResponse({ status: 404, description: "Coupon not found" })
  findCouponById(@Param("id") id: string) {
    return this.pricingService.findCouponById(id);
  }

  @Get("coupons/code/:code")
  @ApiOperation({ summary: "Get a coupon by code" })
  @ApiParam({ name: "code", description: "Coupon Code" })
  @ApiResponse({ status: 200, description: "Coupon retrieved successfully" })
  @ApiResponse({ status: 404, description: "Coupon not found" })
  findCouponByCode(@Param("code") code: string) {
    return this.pricingService.findCouponByCode(code);
  }

  @Post("coupons")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new coupon" })
  @ApiResponse({ status: 201, description: "Coupon created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({
    status: 409,
    description: "Coupon with this code already exists",
  })
  createCoupon(@Body() createCouponDto: CreateCouponDto) {
    return this.pricingService.createCoupon(createCouponDto);
  }

  @Patch("coupons/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a coupon" })
  @ApiParam({ name: "id", description: "Coupon ID" })
  @ApiResponse({ status: 200, description: "Coupon updated successfully" })
  @ApiResponse({ status: 404, description: "Coupon not found" })
  @ApiResponse({
    status: 409,
    description: "Coupon with this code already exists",
  })
  updateCoupon(
    @Param("id") id: string,
    @Body() updateCouponDto: UpdateCouponDto
  ) {
    return this.pricingService.updateCoupon(id, updateCouponDto);
  }

  @Delete("coupons/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a coupon" })
  @ApiParam({ name: "id", description: "Coupon ID" })
  @ApiResponse({ status: 200, description: "Coupon deleted successfully" })
  @ApiResponse({ status: 404, description: "Coupon not found" })
  deleteCoupon(@Param("id") id: string) {
    return this.pricingService.deleteCoupon(id);
  }

  @Post("coupons/apply")
  @ApiOperation({ summary: "Apply a coupon" })
  @ApiResponse({ status: 200, description: "Coupon applied successfully" })
  @ApiResponse({ status: 404, description: "Coupon not found" })
  @ApiResponse({
    status: 400,
    description: "Coupon is expired or not applicable",
  })
  applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    return this.pricingService.applyCoupon(applyCouponDto);
  }

  // Utility Endpoints
  @Get("user/subscription/access/:feature")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Check if user has access to a feature" })
  @ApiParam({ name: "feature", description: "Feature name" })
  @ApiResponse({ status: 200, description: "Access check completed" })
  checkUserAccess(@Param("feature") feature: string, @CurrentUser() user: any) {
    return this.pricingService.checkUserSubscriptionAccess(user.id, feature);
  }

  // Feature Endpoints
  @Get("features")
  @ApiOperation({ summary: "Get all features" })
  @ApiResponse({ status: 200, description: "Features retrieved successfully" })
  findAllFeatures(includeInactive: boolean) {
    return this.pricingService.findAllFeatures(includeInactive === true);
  }

  @Get("features/:id")
  @ApiOperation({ summary: "Get a feature by ID" })
  @ApiParam({ name: "id", description: "Feature ID" })
  @ApiResponse({ status: 200, description: "Feature retrieved successfully" })
  @ApiResponse({ status: 404, description: "Feature not found" })
  findFeatureById(@Param("id") id: string) {
    return this.pricingService.findFeatureById(id);
  }

  @Get("features/key/:key")
  @ApiOperation({ summary: "Get a feature by key" })
  @ApiParam({ name: "key", description: "Feature Key" })
  @ApiResponse({ status: 200, description: "Feature retrieved successfully" })
  @ApiResponse({ status: 404, description: "Feature not found" })
  findFeatureByKey(@Param("key") key: string) {
    return this.pricingService.findFeatureByKey(key);
  }

  @Post("features")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new feature" })
  @ApiResponse({ status: 201, description: "Feature created successfully" })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({
    status: 409,
    description: "Feature with this key already exists",
  })
  createFeature(@Body() createFeatureDto: CreateFeatureDto) {
    return this.pricingService.createFeature(createFeatureDto);
  }

  @Patch("features/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update a feature" })
  @ApiParam({ name: "id", description: "Feature ID" })
  @ApiResponse({ status: 200, description: "Feature updated successfully" })
  @ApiResponse({ status: 404, description: "Feature not found" })
  @ApiResponse({
    status: 409,
    description: "Feature with this key already exists",
  })
  updateFeature(
    @Param("id") id: string,
    @Body() updateFeatureDto: UpdateFeatureDto
  ) {
    return this.pricingService.updateFeature(id, updateFeatureDto);
  }

  @Delete("features/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a feature" })
  @ApiParam({ name: "id", description: "Feature ID" })
  @ApiResponse({ status: 200, description: "Feature deleted successfully" })
  @ApiResponse({ status: 404, description: "Feature not found" })
  deleteFeature(@Param("id") id: string) {
    return this.pricingService.deleteFeature(id);
  }

  @Post("plans/:planId/features")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Assign features to a pricing plan" })
  @ApiParam({ name: "planId", description: "Pricing Plan ID" })
  @ApiResponse({ status: 200, description: "Features assigned successfully" })
  @ApiResponse({
    status: 404,
    description: "Pricing plan or feature not found",
  })
  assignFeaturesToPlan(
    @Param("planId") planId: string,
    @Body() assignFeaturesDto: AssignFeaturesDto
  ) {
    return this.pricingService.assignFeaturesToPlan(planId, assignFeaturesDto);
  }

  @Get("plans/:planId/features")
  @ApiOperation({ summary: "Get features for a pricing plan" })
  @ApiParam({ name: "planId", description: "Pricing Plan ID" })
  @ApiResponse({
    status: 200,
    description: "Plan features retrieved successfully",
  })
  @ApiResponse({ status: 404, description: "Pricing plan not found" })
  getPlanFeatures(@Param("planId") planId: string) {
    return this.pricingService.getPlanFeatures(planId);
  }

  @Get("plans/:planId/features/:featureKey")
  @ApiOperation({ summary: "Check if a plan has a specific feature" })
  @ApiParam({ name: "planId", description: "Pricing Plan ID" })
  @ApiParam({ name: "featureKey", description: "Feature Key" })
  @ApiResponse({ status: 200, description: "Feature check completed" })
  checkPlanHasFeature(
    @Param("planId") planId: string,
    @Param("featureKey") featureKey: string
  ) {
    return this.pricingService.checkPlanHasFeature(planId, featureKey);
  }
}
