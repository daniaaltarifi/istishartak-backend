//import db
// const dataTrade= require("../Module/allData"); 
// const tablename
const add=async (req,res)=>{
const sqlInsert="INSERT INTO tablename (colname,colname) VALUES (?,?)" ;
db.query(sqlInsert,[colname,colname],(err,result)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(result)
    }
})
}
const get=async(req,res)=>{
    const sqlSelect='SELECT * from tablename';
    db.query(sqlSelect,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
            res.json(result)
        }
    })
}
const deleteStayingHealth=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM tablenamae WHERE id = ? ";
    db.query(sqlDelete,id,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
}
// const update=async(req,res)=>{
//     const id=req.params.id;
//     const {colname,colname,colname}=req.body
//     const sqlUpdate='UPDATE tablename SET colname = ? WHERE id = ?';
//     db.query(sqlUpdate,[colname,colname],(err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log(result)
//         }
//     })
// }
module.exports={add,get,deleteStayingHealth,update}