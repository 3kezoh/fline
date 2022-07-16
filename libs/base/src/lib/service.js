export class Service {
  constructor(model) {
    this.model = model;
  }

  /**
   * @description Create a new instance of the model
   * @param {*} data
   * @returns {Promise<*>}
   */
  async create(data) {
    return this.model.create(data);
  }

  /**
   * @description Find all instances of the model
   * @returns {Promise<*>}
   */
  async findAll() {
    return this.model.findAll();
  }

  /**
   * @description Find one instance of the model
   * @param {string} id
   * @returns
   */
  async findOne(id) {
    return this.model.findByPk(id);
  }

  /**
   * @description Update an instance of the model
   * @param {string} id
   * @param {*} data
   * @returns {Promise<*>}
   */
  async update(id, data) {
    return this.model.update(data, {
      where: {
        id,
      },
    });
  }

  /**
   * @description Destroy an instance of the model
   * @param {string} id
   * @returns {Promise<*>}
   */
  async destroy(id) {
    return this.model.destroy({
      where: {
        id,
      },
    });
  }
}
