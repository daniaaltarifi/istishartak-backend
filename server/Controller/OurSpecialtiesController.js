const db=require("../config/config")

// const add = async (req, res) => {
//     const { title, description,image } = req.body;
//     const sqlInsert = "INSERT INTO stayinghealth (title, description ,image) VALUES (?,?,?)";
//     db.query(sqlInsert, [title,description,image], (err, result) => {
//         if (err) {
//             console.log(err);
//             res.json({ error: "Error inserting data" });
//         } else {
//             console.log(result);
//             res.json({ status: "success" });
//         }
//     });
// };

const add=async(req,res)=>{
    const { title, description } = req.body;
    const image = req.file.filename;

    // Insert the user's data and image into the database.
    const sqlInsert = "INSERT INTO stayinghealth (title, description, image) VALUES (?, ?, ?)";
    db.query(sqlInsert, [title, description, image], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.message);
            return res.json({ message: "Error" });
        }
        return res.json({ status: "success" });
    });
};

const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM stayinghealth';
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ error: "Error fetching data" });
        } else {
            console.log(result);
            res.json(result);
        }
    });
};




const deleteStayingHealth=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM stayinghealth WHERE id = ? ";
    db.query(sqlDelete,[id],(err,result)=>{
        if(err){
            console.log(err)
            res.json("Error Deleted")
        }
        else{
            console.log(result)
            res.json("Deleted Succsesfully")
        }
    })
}
const update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file.filename;

    // Check if the row with the specified 'id' exists
    const checkSql = 'SELECT * FROM stayinghealth WHERE id = ?';
    db.query(checkSql, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.log(checkErr);
            res.json({ error: 'Error checking data' });
        } else {
            if (checkResult.length === 0) {
                // No matching row found, return an error
                res.json({ error: 'No data found for the specified ID' });
            } else {
                // Row exists, proceed with the update
                const sqlUpdate = 'UPDATE stayinghealth SET title = ?, description = ?, image = ? WHERE id = ?';
                db.query(sqlUpdate, [title, description, image, id], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.log(updateErr);
                        res.json({ error: 'Error updating data' });
                    } else {
                        console.log(updateResult);
                        res.json({ id, title, description, image  });
                    }
                });
            }
        }
    });
};

module.exports={add,get,update,deleteStayingHealth}