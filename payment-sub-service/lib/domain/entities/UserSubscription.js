export default class UserSubscriptionType {
  constructor({
    id = null,
    userId,
    plan,
    startDate,
    endDate,
    status,
    sessionLimit,
  }) {
    this.id = id;
    this.userId = userId;
    this.plan = plan;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.sessionLimit = sessionLimit;
    this.createdAt = new Date();
  }
}
