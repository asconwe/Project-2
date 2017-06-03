module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define("Tag", {
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        }
    },
        {
            classMethods: {
                associate: function (models) {
                    Tag.hasMany(models.TagActivity);
                }
            }
        });
    return Tag;
};
