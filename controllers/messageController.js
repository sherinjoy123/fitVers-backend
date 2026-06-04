import Message from "../models/message.js";

const saveMessage = async (req,res)=>{
    try {
        
        const message = await Message.create(req.body);
       
        res.status(201).json({success:true,message,})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

const getMessage = async(req,res)=>{
    try {
        const {senderId,receiverId} = req.params;
        console.log(senderId,receiverId);

        const messages = await Message.find({
            $or:[
                {
                    senderId,
                    receiverId,
                },
                {
                    senderId:receiverId,
                    receiverId:senderId
                },
            ],
        }).sort({createdAt:1});
        console.log(messages.length);

        res.status(200).json({success:true,messages,})
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

export {saveMessage,getMessage}