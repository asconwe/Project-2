module.exports = function(sequelize, DataTypes) {
  var Person = sequelize.define("Person", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,10]
      }
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      len: [1]
    },
    online: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  },
    {
      classMethods: {
        associate: function(models) {
          // Person.belongsToMany(models.Activity, {through: 'JoinedActivity', foreignKey: "PersonId"});
          Person.hasMany(models.Activity);
          Person.hasMany(models.JoinedActivity);
        }
      }
    }
);
  return Person;
};
