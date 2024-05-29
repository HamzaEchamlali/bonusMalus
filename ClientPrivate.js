import { Client } from './Client.js';

/**
 * Class representing a private client. 
 * This class inherits from Client so we can imagine here future properties and methods specific to the private client.
 * @extends Client
 */
class ClientPrivate extends Client {
    
    /**
     * Constructor to initialize ClientPrivate object.
     * @param {string} firstName - The first name of the client.
     * @param {string} lastName - The last name of the client.
     * @param {number} age - The age of the client.
     * @param {BonusMalus} bonusMalus - The bonus-malus object associated with the client.
     */
    constructor(firstName, lastName, age, bonusMalus) {
        super(firstName, lastName, age, bonusMalus);
    }
}

export { ClientPrivate };