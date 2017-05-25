module.exports = function(sequelize, DataTypes) {
  var UserAndActivity = sequelize.define("UserAndActivity", {
   
  },
    {
      classMethods: {
        associate: function(models) {
          UserAndActivity.belongsTo(models.Person);
          UserAndActivity.belongsTo(models.Activity);
          
        }
      }
    });
  return UserAndActivity;
};