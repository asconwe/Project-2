module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define("Person", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,10]
      }
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,20]
      }
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    realFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [1]
      }
    },
    realLastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [1]
      }
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true,
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    online: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false
    } 
  },
    { 
      classMethods: {
        associate: function(models) {
          Person.belongsToMany(models.Activity, {through: 'friends'});
        }
      }
    }
);
  return Person;
};
