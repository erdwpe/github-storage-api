export default async function handler(req,res){

res.setHeader("Access-Control-Allow-Origin","*")
res.setHeader("Access-Control-Allow-Headers","Content-Type")
res.setHeader("Access-Control-Allow-Methods","POST,OPTIONS")

if(req.method==="OPTIONS"){
return res.status(200).end()
}

if(req.method!=="POST"){
return res.status(405).json({error:"Method not allowed"})
}

const token = process.env.GITHUB_TOKEN
const repo = "wagedev/github-storage"

const body = req.body || {}

const action = body.action
const path = body.path
const content = body.content
const message = body.message
const sha = body.sha

if(!action){
return res.status(400).json({error:"Missing action"})
}

try{

// LIST FILE
if(action==="list"){

const r = await fetch(
`https://api.github.com/repos/${repo}/git/trees/main?recursive=1`,
{headers:{Authorization:`token ${token}`}}
)

return res.json(await r.json())

}


// UPLOAD
if(action==="upload"){

const r = await fetch(
`https://api.github.com/repos/${repo}/contents/${path}`,
{
method:"PUT",
headers:{
Authorization:`token ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message: message || "upload file",
content
})
})

return res.json(await r.json())

}


// GET FILE
if(action==="get"){

const r = await fetch(
`https://api.github.com/repos/${repo}/contents/${path}`,
{headers:{Authorization:`token ${token}`}}
)

return res.json(await r.json())

}


// DELETE
if(action==="delete"){

const r = await fetch(
`https://api.github.com/repos/${repo}/contents/${path}`,
{
method:"DELETE",
headers:{
Authorization:`token ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message: message || "delete file",
sha
})
})

return res.json(await r.json())

}

return res.status(400).json({error:"Invalid action"})

}catch(err){

return res.status(500).json({error:err.message})

}

}