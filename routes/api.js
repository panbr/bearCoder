/**
 * API 接口
 */

// 查询学校列表
exports.schoolList = function(req, res) {
    let SQL = '';
    if(req.query.pageNum) {
        const pageNum = req.query.pageNum || 10;
        const pageIndex = req.query.pageIndex || 0;
        SQL = `SELECT * FROM school LIMIT ${pageNum} OFFSET ${pageIndex}`;
    } else {
        SQL = 'SELECT * FROM school';
    }
    req.db.serialize(function() {
        req.db.all(SQL, function(err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send({
                    status: 500,
                    message: 'Field',
                    data: err.toString(),
                })
            } else {
                res.status(200).send({
                    status: 200,
                    message: 'Success',
                    data: rows,
                })
            }
        })
    })
}

// 申请人信息
// POST 方式
exports.application = function(req, res) {
    let SQL = `INSERT INTO application (
                            apply_name,
                            phone,
                            grade,
                            message,
                            student,
                            parent,
                            age,
                            create_time,
                            remark
                        )
                        VALUES (
                            '${req.body.name}',
                            '${req.body.phone}',
                            '${req.body.grade}',
                            '${req.body.message}',
                            NULL,
                            NULL,
                            NULL,
                            datetime(CURRENT_TIMESTAMP,'localtime'),
                            NULL
                        );`
    req.db.serialize(() => {
        req.db.run(SQL, (err) => {
            if(err) {
                console.error(err);
                res.status(500).send({
                    status: 500,
                    message: 'Field',
                    data: err.toString(),
                })
            } else {
                res.status(200).send({
                    status: 200,
                    message: 'Success',
                    data: null,
                })
            }  
        })
    })
}

// 查询申请表
exports.applyList = function(req, res) {
    let SQL = '';
    if(req.query.pageNum) {
        const pageNum = req.query.pageNum || 10;
        const pageIndex = req.query.pageIndex || 0;
        SQL = `SELECT * FROM application LIMIT ${pageNum} OFFSET ${pageIndex}`;
    } else {
        SQL = 'SELECT * FROM application';
    }
    req.db.serialize(function() {
        req.db.all(SQL, function(err, rows) {
            if (err) {
                console.error(err);
                res.status(500).send({
                    status: 500,
                    message: 'Field',
                    data: err.toString(),
                })
            } else {
                res.status(200).send({
                    status: 200,
                    message: 'Success',
                    data: rows,
                })
            }
        })
    })
}