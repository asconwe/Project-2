module.exports = function(sequelize, DataTypes) {
  var TagActivity = sequelize.define("TagActivity", {
   
  },
    {
      classMethods: {
        associate: function(models) {
          TagActivity.belongsTo(models.Tag);
          TagActivity.belongsTo(models.Activity);
        }
      }
    });
  return TagActivity;
};