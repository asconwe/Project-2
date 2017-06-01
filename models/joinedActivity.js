module.exports = function(sequelize, DataTypes) {
  var JoinedActivity = sequelize.define("JoinedActivity", {
   
  },
    {
      classMethods: {
        associate: function(models) {
          JoinedActivity.belongsTo(models.Person);
          JoinedActivity.belongsTo(models.Activity);
          
        }
      }
    });
  return JoinedActivity;
};