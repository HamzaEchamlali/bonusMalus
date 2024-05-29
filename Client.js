import { BonusMalus } from './BonusMalus.js';

/**
 * Class representing a client. 
 * This class aims to provide a foundation for children through inheritance as well as composition.
 */
class Client {

    // Private property including basic customer information as well as a bonus-malus object used in composition
    #firstName;
    #lastName;
    #age;
    #bonusMalus;
  
    /**
     * Constructor to initialize Client object.
     * @param {string} firstName - The first name of the client.
     * @param {string} lastName - The last name of the client.
     * @param {number} age - The age of the client.
     * @param {BonusMalus} bonusMalus - The bonus-malus object associated with the client.
     */
    constructor(firstName, lastName, age, bonusMalus) {
      this.#firstName = this.#validateFirstName(firstName); 
      this.#lastName = this.#validateLastName(lastName); 
      this.#age = this.#validateAge(age); 

      if (BonusMalus.validateBonusMalus(bonusMalus)) {
        this.#bonusMalus = bonusMalus;
      }
    }
  
    // Getters

    /**
     * Get the first name of the client.
     * @return {string} The first name of the client.
     */
    get firstName() {
      return this.#firstName;
    }

    /**
     * Get the last name of the client.
     * @return {string} The last name of the client.
     */
    get lastName() {
        return this.#lastName;
    }

    /**
     * Get the age of the client.
     * @return {number} The age of the client.
     */
    get age() {
        return this.#age;
    }

    /**
     * Get the bonus-malus of the client.
     * @return {BonusMalus} The bonus-malus object.
     */
    get bonusMalus() {
        return this.#bonusMalus;
    }

    // Setters

    /**
     * Set the first name of the client.
     * @param {string} firstName - The new first name of the client.
     */
    set firstName(firstName) {
      this.#firstName = this.#validateFirstName(firstName);
    }

    /**
     * Set the last name of the client.
     * @param {string} lastName - The new last name of the client.
     */
    set lastName(lastName) {
        this.#lastName = this.#validateLastName(lastName);
    }

    /**
     * Set the age of the client.
     * @param {number} age - The new age of the client.
     */
    set age(age) {
        this.#age = this.#validateAge(age);
    }

    /**
     * Set the bonus-malus of the client.
     * @param {BonusMalus} bonusMalus - The new bonus-malus object.
     */
    set bonusMalus(bonusMalus) {
      if (BonusMalus.validateBonusMalus(bonusMalus)) {
        this.#bonusMalus = bonusMalus;
      }
    }
  
    // Private data validation methods

    /**
     * Validate the first name of the client.
     * @param {string} firstName - The first name to validate.
     * @return {string} The validated first name.
     * @throws Will throw an error if the first name is not a non-empty string with a maximum size of 20 characters.
     */
    #validateFirstName(firstName) {
        if (typeof firstName !== 'string' || firstName.trim() === '' || firstName.length >= 20) {
            throw new Error("The first name must be a non-empty string with a maximum size of 20 characters.");
            } else {
            return firstName;
            }
    }

    /**
     * Validate the last name of the client.
     * @param {string} lastName - The last name to validate.
     * @return {string} The validated last name.
     * @throws Will throw an error if the last name is not a non-empty string with a maximum size of 50 characters.
     */
    #validateLastName(lastName) {
        if (typeof lastName !== 'string' || lastName.trim() === '' || lastName.length >= 50) {
            throw new Error("Last name must be a non-empty string with a maximum size of 50 characters.");
          } else {
            return lastName;
          }
    }

    /**
     * Validate the age of the client.
     * @param {number} age - The age to validate.
     * @return {number} The validated age.
     * @throws Will throw an error if the age is not an integer between 18 and 80.
     */
    #validateAge(age) {
        if (typeof age !== 'number' || age < 18 || age > 80 || !Number.isInteger(age)) {
            throw new Error("Age must be an integer between 18 and 80.");
        } else {
            return age;
        }
    }
  }

  export { Client };