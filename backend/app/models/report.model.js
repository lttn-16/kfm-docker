module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("report", {
        email: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.INTEGER
        }
    });
  
    return Report;
  };
  