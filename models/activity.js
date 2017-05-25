module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    complete: {
      type: DataTypes.BOOLEAN,
      default: false
    },
     location: {
      type: DataTypes.STRING
    }
  },
    {
      classMethods: {
        associate: function(models) {
          // Activity.belongsToMany(models.Person, {through: 'JoinedActivity', foreignKey: "ActivityId"});
          Activity.belongsTo(models.Person);
          Activity.hasMany(models.JoinedActivity);
        }
      }
    });
  return Activity;
};
