const Progress=require("../../models/progress.model");

exports.getAll=async(req,res)=>{

    try{

        const data=await Progress.getAll();

        res.json(data);

    }
    catch(err){

        res.status(500).json(err);

    }

}

exports.getById=async(req,res)=>{

    try{

        const data=await Progress.getById(req.params.id);

        res.json(data);

    }
    catch(err){

        res.status(500).json(err);

    }

}

exports.create=async(req,res)=>{

    try{

        const {

            topic_id,
            description,
            lecturer_comment

        }=req.body;

        const result=await Progress.create([

            topic_id,

            description,

            lecturer_comment

        ]);

        res.json({

            message:"Create success",

            id:result.insertId

        });

    }
    catch(err){

        res.status(500).json(err);

    }

}

exports.update=async(req,res)=>{

    try{

        await Progress.update(

            req.params.id,

            [

                req.body.description,

                req.body.lecturer_comment

            ]

        );

        res.json({

            message:"Update success"

        });

    }
    catch(err){

        res.status(500).json(err);

    }

}

exports.delete=async(req,res)=>{

    try{

        await Progress.delete(req.params.id);

        res.json({

            message:"Delete success"

        });

    }
    catch(err){

        res.status(500).json(err);

    }

}