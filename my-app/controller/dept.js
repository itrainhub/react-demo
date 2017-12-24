var DeptModel = require('./../model/department.js');
exports.deptList =  function (req, res) {
  DeptModel
    .find()
    .exec(function (err, depts) {
      if(err){
        res.status(err.status).json({code:122,msg:'部门列表获取失败'});
      } else{
        res.json({data:depts,code:0,msg:'部门列表获取成功'});
      }
    });
}
exports.addDept = function (req, res) {
  const reqBody = req.body;
  if(!reqBody.department_name){
    res.status(200).send('缺少部门名称，添加失败').end();
  }
  // 获得现在存在的部门数
    DeptModel.find({}).exec()
        .then(data => {
          const dept = new DeptModel({
              department_name:reqBody.department_name,
              department_pid:reqBody.department_pid,
              department_id:(data.length || 0) + 1
          });
          dept.save(function (err) {
              if(!err){
                  res.status(200).send({code:0,msg:'部门添加成功'}).end();
              }
              else{
                  res.status(200).send({code:111,msg:'部门添加成功'}).end();
              }
          });
        })
        .catch(() => {
          res
            .status(200)
            .send({
              code:123,
              msg:'获取部门数量失败'
            })
            .end()
        })
};
exports.editDept = function (req, res) {
    const resBody = req.body;
    if(!resBody.department_id){
        res.status(200).send({code:123,msg:'缺少部门id，编辑失败'}).end();
    }
    DeptModel.findOneAndUpdate({department_id:resBody.department_id},{department_name:resBody.department_name},{new:false},function (err,result) {
      if(!err){
        res.status(200).send({code:0,msg:'部门编辑成功',data:result}).end();
      }else{
        res.status(200).send({code:125,msg:err+'部门编辑失败'}).end()
      }
    })
};
exports.delDept = function (req, res) {
  const resBody = req.body;
  if(!resBody.department_id){
    res.status(200).send({code:123,msg:'缺少部门id，删除失败'}).end();
  }
  DeptModel.remove({
    department_id:resBody.department_id
  },function (err) {
    if(err){
      res.status(200).send({code:124,msg:err+'删除部门失败'}).end();
    } else {
      res.status(200).send({code:0,msg:'删除部门成功'}).end();
    }
  });
}