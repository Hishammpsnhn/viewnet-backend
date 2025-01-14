export default class SubscriptionType {
  constructor(
    id = null,
    name,
    description,
    price,
    sessionLimit,
    duration,
    features,
    isActive
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.sessionLimit = sessionLimit;
    this.duration = duration;
    this.isActive = isActive;
    this.features = features;
    this.createdAt = new Date();
    this._modifiedFields = {};
  }

  setName(name) {
    if (name === this.name) return;
    this.name = name;

    this._modifiedFields.name = true;
  }
  setActive(isActive) {
    console.log("setActive caling..........",isActive)
    if (isActive === this.isActive) return;
    this.isActive = isActive;
    this._modifiedFields.isActive = true;
  }

  setDescription(description) {
    if (description === this.description) return;
    this.description = description;

    this._modifiedFields.description = true;
  }

  setPrice(price) {
    if (price === this.price) return;
    this.price = price;

    this._modifiedFields.price = true;
  }

  setSessionLimit(limit) {
    if (limit === this.sessionLimit) return;
    this.sessionLimit = limit;

    this._modifiedFields.sessionLimit = true;
  }

  setDuration(duration) {
    if (duration === this.duration) return;
    this.duration = duration;

    this._modifiedFields.duration = true;
  }

  setFeatures(features) {
    if (JSON.stringify(features) === JSON.stringify(this.features)) return;
    this.features = features;

    this._modifiedFields.features = true;
  }

  activate() {
    if (this.isActive) return;
    this.isActive = true;

    this._modifiedFields.isActive = true;
  }

  deactivate() {
    if (!this.isActive) return;
    this.isActive = false;

    this._modifiedFields.isActive = true;
  }

  getModifiedFields() {
    return this._modifiedFields;
  }

  clearModifiedFields() {
    this._modifiedFields = {};
  }
}
