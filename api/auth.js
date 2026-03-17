export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin","*")
res.setHeader("Access-Control-Allow-Headers","Content-Type")
res.setHeader("Access-Control-Allow-Methods","POST,OPTIONS")

if(req.method === "OPTIONS"){
return res.status(200).end()
}

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

const PIN = process.env.APP_PIN

const body = req.body || {}
const pin = body.pin

if(!pin){
return res.status(400).json({error:"Missing pin"})
}

if(pin === PIN){

return res.json({
success:true,
expires: Date.now() + (3*60*60*1000)
})

}

return res.status(401).json({success:false})

}