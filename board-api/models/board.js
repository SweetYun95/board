const Sequelize = require('sequelize')

module.exports = class Board extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: Sequelize.STRING(15),
               allowNull: false,
               unique: true,
            },
            content: {
               type: Sequelize.TEXT,
               allowNull: false,
            },
            img: {
               type: Sequelize.STRING(15),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: true, // delectAt 자동생성, 소프트 삭제 기능
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Board.belongsTo(db.Member, {
         foreignKey: `member_Id`,
         targetKey: `id`,
      })
   }
}
