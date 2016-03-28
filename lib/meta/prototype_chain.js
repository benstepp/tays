/**
 * The PrototypeChain is a class used to determine the chain of
 * protoypes for a given class. It returns all prototypes down to null
 * for a given class.
 * @class
*/
class PrototypeChain {

  /**
   * The Constructor
   * @constructor
   * @param {Function} klass - This is a class (function in javascript
   * land) that will be the first item of the returned PrototypeChain
   * @returns {Array} - An array of the prototypes for a given class
   * down to null.
  */
  constructor(klass) {
    this.klass = klass
    this.generate_chain()
    return this.chain
  }

  /**
   * A convenience method to create a new PrototypeChain.
  */
  static new(klass) {
    return new this(klass)
  }

  /**
   * Generates the prototype chain for a class
  */
  generate_chain() {
    let current_klass = this.klass
    this.chain = [current_klass]

    while (this.chain_has_prototype) {
      current_klass = this.next_prototype(current_klass)
      this.add_to_chain(current_klass)
    }
  }

  /**
   * Gets the next prototpye of a given class
  */
  next_prototype(klass) {
    return Reflect.getPrototypeOf(klass)
  }

  /**
   * Adds a given class to the current prototype chain at the end.
  */
  add_to_chain(klass) {
    this.chain.push(klass)
  }

  /**
   * Checks if the chain has another prototype object.
  */
  get chain_has_prototype() {
    return this.chain.indexOf(null) === -1
  }

}

export { PrototypeChain }
