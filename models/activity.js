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
    tagId: {
      type: DataTypes.TEXT,
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
          Activity.hasMany(models.TagActivity);
          Activity.belongsTo(models.Person);
          Activity.hasMany(models.JoinedActivity);
        }
      }
    });
  return Activity;
};
