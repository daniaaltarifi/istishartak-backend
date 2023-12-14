const db=require("../config/config")
const translate = require('node-google-translate-skidz');

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

const add = async (req, res) => {
    const { title, paragraph } = req.body;
   
        const sourceLanguage = "en"; // The source language of the data
    const targetLanguage = "ar"; // The target language (e.g., Arabic)

    try {
        // Translate the title to Arabic
        const arabicTitle = await translateAsync(title, sourceLanguage, targetLanguage);
        const arabicDescription=await translateAsync(paragraph,sourceLanguage,targetLanguage)
        console.log("Translated Title (Arabic):", arabicTitle);
        console.log("Translated Title (Arabic):", arabicDescription);

        // Insert the user's data and both title versions into the database.
        const sqlInsert = "INSERT INTO privacypolicy (title, title_ar, paragraph,paragraph_ar) VALUES (?, ?, ?, ?)";
        db.query(sqlInsert, [title, arabicTitle, paragraph,arabicDescription], (err, result) => {
            if (err) {
                console.error('Error inserting data: ' + err.message);
                return res.json({ message: "Error" });
            }
            return res.json({ status: "success" });
        });
    } catch (error) {
        console.error('Translation error:', error);
        return res.json({ message: "Error" });
    }
};

async function translateAsync(text, sourceLanguage, targetLanguage) {
    return new Promise((resolve, reject) => {
        translate({
            text,
            source: sourceLanguage,
            target: targetLanguage,
        }, (result) => {
            if (result.error) {
                reject(result.error);
            } else {
                resolve(result.translation);
            }
        });
    });
}


const get = async (req, res) => {
    const sqlSelect = 'SELECT * FROM privacypolicy';
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




const deletePrivacyPolicy=async(req,res)=>{
    const id=req.params.id
    const sqlDelete="DELETE FROM privacypolicy WHERE id = ? ";
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
    const paragraph = req.body.paragraph;

    // Check if the row with the specified 'id' exists
    const checkSql = 'SELECT * FROM privacypolicy WHERE id = ?';
    db.query(checkSql, [id], async(checkErr, checkResult) => {
        if (checkErr) {
            console.log(checkErr);
            res.json({ error: 'Error checking data' });
        } else {
            if (checkResult.length === 0) {
                // No matching row found, return an error
                res.json({ error: 'No data found for the specified ID' });
            } else {
                // Row exists, proceed with the update
                const arabicTitle= await translateAsync(title,'en',"ar")
                const arabicDescription=await translateAsync(paragraph,"en","ar")
                const sqlUpdate = 'UPDATE privacypolicy SET title = ?, title_ar = ?, paragraph = ?,paragraph_ar = ? WHERE id = ?';
                db.query(sqlUpdate, [title,arabicTitle, paragraph,arabicDescription, id], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.log(updateErr);
                        res.json({ error: 'Error updating data' });
                    } else {
                        console.log(updateResult);
                        res.json({ id, title, paragraph  });
                    }
                });
            }
        }
    });
};

module.exports={add,get,update,deletePrivacyPolicy}