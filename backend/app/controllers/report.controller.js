const { signAccessToken } = require("../helpers/jwt_helpers");
const db = require("../models");
const { createReportValidation } = require("../validations/report.validation");
const ReportModel = db.reports;
const UserModel = db.users;
const Op = db.Sequelize.Op;
const moment = require('moment-timezone');
const sequelize = db.sequelize;


exports.beLate = async (req, res) => {
    const { duration } = req.body;
    const response = {
        statusCode: 422,
        message: 'Request failed',
        content: null
    };
    try {
        console.log(
            `[REPORT] >> [CREATE] payload ${JSON.stringify(req.body)}`
        );
        // LETS VALIDATE THE DATA
        const { error } = createReportValidation(req.body);

        if (error) {
            response.message = error.details[0].message;
            return res.status(response.statusCode).send(response);
        }

        const userAction = {
            id: Number(req.user.aud)
        };

        const user = await UserModel.findOne({ where: { id: userAction.id } });
        if (!user) {
            console.log(
                '[ERROR REPORT] [CREATE] User not found!'
            );
            response.message = 'User not found!';
            return res.status(response.statusCode).send(response);
        }

        const startDay = moment().startOf('day').toDate();
        const endDay = moment().endOf('day').toDate();
        const existRecordToday = await ReportModel.findOne({ where: {
            user_id: user.id,
            createdAt: {
                [Op.between]: [startDay, endDay]
            }
        } });
        if (existRecordToday) {
            await ReportModel.update(
                { duration },
                {
                    where: { id: existRecordToday.id }
                }
            );
            return res.send('success');
        }

        const reportData = {
            user_id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            duration,
        }
        await ReportModel.create(reportData);
        return res.send('success');
    } catch (err) {
        console.log(`[ERROR REPORT] [CREATE] ${JSON.stringify(err.message)}`);
        response.statusCode = 500;
        response.message = err.message || 'Internal Server Error';
        return res.status(response.statusCode).send(response);
    }
}

exports.getByMonth = async (req, res) => {
    const response = {
        statusCode: 500,
        message: 'Request failed',
        content: null
    };
    try {
        const startOfMonth = moment().startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();
        const [result] = await sequelize.query(`
            SELECT r.user_id, COUNT(*) AS count, SUM(r.duration) AS sum_duration, u.first_name, u.last_name, u.email
            FROM reports AS r
                INNER JOIN users AS u ON r.user_id = u.id
            WHERE r.createdAt BETWEEN :startDate AND :endDate
            GROUP BY r.user_id
        `, {
            replacements: {
                startDate: startOfMonth,
                endDate: endOfMonth
            }
        });
        return res.send(result);
    } catch (err) {
        console.log(`[ERROR REPORT] [GET LIST MONTH] ${JSON.stringify(err.message)}`);
        response.statusCode = 500;
        response.message = err.message || 'Internal Server Error';
        return res.status(response.statusCode).send(response);
    }
}
