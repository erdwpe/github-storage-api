export default function handler(req,res){

res.setHeader("Access-Control-Allow-Origin","*")

if(req.method==="OPTIONS") return res.status(200).end()

const PIN=process.env.APP_PIN

const {pin}=req.body

if(pin===PIN){

return res.json({
success:true,
expires:Date.now()+3*60*60*1000
})

}

return res.status(401).json({success:false})

}