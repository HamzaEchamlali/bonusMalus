/**
 * Class representing the bonus-malus of a client. 
 * This class is used in composition in the Client class.
 */
class BonusMalus {

  // Private property bringing together the elements of a bonus-malus
  #amountOfDrivingYears;
  #amountOfAccidentsAtFault;
  #usage;
  #minimumBonusMalus = -2;
  #maximumBonusMalus = 22;
  #penality = 5;

  /**
   * Constructor to initialize BonusMalus object.
   * @param {number} amountOfDrivingYears - Number of years the client has been driving.
   * @param {number} amountOfAccidentsAtFault - Number of accidents at fault the client has had. (between 0 and 2)
   * @param {number} usage - Usage type, where 0 represents private use and 1 represents professional use.
   */
  constructor(amountOfDrivingYears, amountOfAccidentsAtFault, usage) {
    this.#amountOfDrivingYears = this.#validateDrivingYears(amountOfDrivingYears); 
    this.#amountOfAccidentsAtFault = this.#validateAccidentsAtFault(amountOfAccidentsAtFault); 
    this.#usage = this.#validateUsage(usage); 
  }

  // Getters

  /**
   * Get the amount of driving years.
   * @returns {number} - The number of driving years.
   */
  get amountOfDrivingYears() {
    return this.#amountOfDrivingYears;
  }

  /**
   * Get the amount of accidents at fault.
   * @returns {number} - The number of accidents at fault.
   */
  get amountOfAccidentsAtFault() {
    return this.#amountOfAccidentsAtFault;
  }

  /**
   * Get the usage type.
   * @returns {number} - The usage type.
   */
  get usage() {
    return this.#usage;
  }

  // Setters

  /**
   * Set the amount of driving years.
   * @param {number} yearsAmount - The number of driving years.
   */
  set amountOfDrivingYears(yearsAmount) {
    this.#amountOfDrivingYears = this.#validateDrivingYears(yearsAmount);
  }

  /**
   * Set the amount of accidents at fault.
   * @param {number} accidentsAmount - The number of accidents at fault.
   */
  set amountOfAccidentsAtFault(accidentsAmount) {
    this.#amountOfAccidentsAtFault = this.#validateAccidentsAtFault(accidentsAmount);
  }

  /**
   * Set the usage type.
   * @param {number} type - The usage type.
   */
  set usage(type) {
    this.#usage = this.#validateUsage(type);
  }

  // Data validation methods

  /**
   * Validate the amount of driving years.
   * @param {number} yearsAmount - The number of driving years.
   * @returns {number} - The validated number of driving years.
   * @throws Will throw an error if the input is not a non-negative number.
   */
  #validateDrivingYears(yearsAmount) {
    if (typeof yearsAmount !== 'number' || yearsAmount < 0) {
      throw new Error("Amount of driving years must be a non-negative number.");
    }else{
      return yearsAmount;
    }
  }

  /**
   * Validate the amount of accidents at fault.
   * @param {number} accidentsAmount - The number of accidents at fault.
   * @returns {number} - The validated number of accidents at fault.
   * @throws Will throw an error if the input is not a non-negative number between 0 and 2.
   */
  #validateAccidentsAtFault(accidentsAmount) {
    if (typeof accidentsAmount !== 'number' || accidentsAmount < 0  || accidentsAmount > 2) {
      throw new Error("Amount of accidents at fault must be a non-negative number and between 0 - 2.");
    }else{
      return accidentsAmount;
    }
  }

  /**
   * Validate the usage type.
   * @param {number} usage - The usage type.
   * @returns {number} - The validated usage type.
   * @throws Will throw an error if the input is not 0 or 1.
   */
  #validateUsage(usage) {
    if (usage !== 0 && usage !== 1) {
      throw new Error("Usage must be 0 or 1.");
    }else{
      return usage;
    }
  }

  /**
   * Static method to validate a BonusMalus object.
   * @param {BonusMalus} bonusMalus - The BonusMalus object to validate.
   * @returns {BonusMalus} - The validated BonusMalus object.
   * @throws Will throw an error if the input is not a valid BonusMalus object.
   */
  static validateBonusMalus(bonusMalus) {
    if (!(bonusMalus instanceof BonusMalus)) {
      throw new Error("Invalid BonusMalus object");
    }else{
      return bonusMalus;
    }
  }

  // Set of methods for calculating the bonus-malus

  /**
   * Define the starting bonus-malus based on usage.
   * @param {number} usage - The usage type.
   * @returns {number} - The starting bonus-malus value.
   */
  #defineStartBonusMalus(usage){
    let startBonusMalus = usage ? 11 : 14;
    return this.#startBonusMalusOverYears(startBonusMalus);
  }

  /**
   * Adjust the starting bonus-malus based on the number of driving years.
   * @param {number} startBonusMalus - The starting bonus-malus value.
   * @returns {number} - The adjusted bonus-malus value.
   */
  #startBonusMalusOverYears(startBonusMalus){
    return this.#amountOfDrivingYears >= 1 ? startBonusMalus - this.#amountOfDrivingYears : startBonusMalus;
  }

  /**
   * Process the bonus-malus for private clients.
   * @param {number} startBonusMalus - The starting bonus-malus value.
   * @returns {number} - The calculated bonus-malus value.
   */
  #processBonusMalusPrivate(startBonusMalus){
    if(this.#amountOfDrivingYears <= 13){
      return (startBonusMalus) + (this.#amountOfAccidentsAtFault * this.#penality);
    }else if(this.#amountOfDrivingYears >= 14 && this.#amountOfAccidentsAtFault > 0){
      return (startBonusMalus) + (this.#amountOfAccidentsAtFault * this.#penality);
    }else{
      return this.#minimumBonusMalus;
    }
  }

  /**
   * Process the bonus-malus for professional clients.
   * @param {number} startBonusMalus - The starting bonus-malus value.
   * @returns {number} - The calculated bonus-malus value.
   */
  #processBonusMalusProfessional(startBonusMalus){
    if(this.#amountOfDrivingYears > 17 && this.#amountOfAccidentsAtFault > 0){
      return (startBonusMalus) + (this.#amountOfAccidentsAtFault * this.#penality);
    }else if(this.#amountOfDrivingYears > 17 && this.#amountOfAccidentsAtFault === 0){
      return this.#minimumBonusMalus;
    }else{
      return (startBonusMalus) + (this.#amountOfAccidentsAtFault * this.#penality);
    }
  }

  /**
   * Ensure the bonus-malus does not fall below a minimum value if there are multiple accidents.
   * @param {number} bonusMalus - The current bonus-malus value.
   * @returns {number} - The adjusted bonus-malus value.
   */
  #checkMinimumBonusMalusOverAccidents(bonusMalus){
    if(this.#amountOfAccidentsAtFault == 2 && bonusMalus <= 3){
      bonusMalus = 3;
    }
    return bonusMalus;
  }

  /**
   * Ensure the bonus-malus value is within the allowed range.
   * @param {number} bonusMalus - The current bonus-malus value.
   * @returns {number} - The adjusted bonus-malus value.
   */
  #checkBonusMalusRange(bonusMalus){
    if(bonusMalus < this.#minimumBonusMalus){
      return this.#minimumBonusMalus;
    }else if(bonusMalus > this.#maximumBonusMalus){
      return this.#maximumBonusMalus;
    }else{
      return bonusMalus;
    }
  }

  /**
   * Calculate the bonus-malus score based on the client's driving history and usage type.
   * @returns {number} - The calculated bonus-malus score.
   */
  calculateBonusMalus() {
    let bonusMalus;
    let startBonusMalus = this.#defineStartBonusMalus(this.#usage);

    if(this.#usage){
      bonusMalus = this.#processBonusMalusPrivate(startBonusMalus);
    }else{
      bonusMalus = this.#processBonusMalusProfessional(startBonusMalus);
    }

    bonusMalus = this.#checkMinimumBonusMalusOverAccidents(bonusMalus);

    bonusMalus = this.#checkBonusMalusRange(bonusMalus);

    return bonusMalus;
  }  
}

export { BonusMalus };