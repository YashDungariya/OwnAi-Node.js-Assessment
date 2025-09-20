const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar',
      length: 255
    },
    email: {
      type: 'varchar',
      length: 255,
      unique: true
    },
    password: {
      type: 'varchar',
      length: 255
    },
    role: {
      type: 'varchar',
      length: 50,
      default: 'Staff'
    },
    phone: {
      type: 'varchar',
      length: 50,
      nullable: true
    },
    city: {
      type: 'varchar',
      length: 100,
      nullable: true
    },
    country: {
      type: 'varchar',
      length: 100,
      nullable: true
    },
    createdAt: {
      type: 'timestamp',
      createDate: true
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true
    }
  }
});
