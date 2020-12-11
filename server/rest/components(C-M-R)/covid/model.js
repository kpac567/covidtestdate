const { db } = require('../../../config/database');

class Covid {
  isValidType(type) {
    const authorizedTypes = ['id', 'name'];
    return authorizedTypes.some(authorizedType => {
      return type === authorizedType;
    });
  }

  async getBy(type, value) {
    try {
      if (!this.isValidType(type)) {
        if (process.env.VERBOSE === 'true')
          console.log(`Covid.getBy(): ${type} is not an authorized type`);
        return null;
      }
      if (process.env.VERBOSE === 'true')
        console.log(`SELECT * FROM public."Covid" WHERE ${type} = ${value}`);
      const result = await db.any(
        `SELECT * FROM public."Covid" WHERE $1:name = $2`,
        [type, value],
      );
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Covid.getBy()');
      return null;
    }
  }

  async getAll() {
    try {
      if (process.env.VERBOSE === 'true')
        console.log('SELECT * FROM public."Covid"');
      const result = await db.any('SELECT * FROM public."Covid"');
      return result;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Covid.getAll()');
      return null;
    }
  }

  async exists(type, value) {
    try {
      if (!value) return false;
      if (!this.isValidType(type)) {
        if (process.env.VERBOSE === 'true')
          console.log(`Covid.exists(): ${type} is not an authorized type`);
        return null;
      }
      if (process.env.VERBOSE === 'true')
        console.log(
          `SELECT exists(SELECT from public."Covid" WHERE ${type} = ${value})`,
        );
      const result = await db.none(
        `SELECT exists(SELECT from public."Covid" WHERE id = ALL($2));`,
        [value],
      );
      return result[0].exists;
    } catch (err) {
      if (process.env.VERBOSE === 'true')
        console.log(err, 'in model Covid.exists()');
      return null;
    }
  }
}

module.exports = Covid;
