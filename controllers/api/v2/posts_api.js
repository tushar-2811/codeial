
module.exports.index = (req,res)=>{

    return res.status(200).json({
        message : "version2",
        posts : []
    })
}