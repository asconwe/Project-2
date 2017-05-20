module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    itemname: {
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
      allowNull: false,
      default: false
    },
    completeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    },
    wantFriend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    },
    location: {
      type: DataTypes.STRING
    }
  },
    {
      classMethods: {
        associate: function(models) {
          Activity.belongsToMany(models.Person, {through: 'friends'});
        }
      }
    });
  return Activity;
};
