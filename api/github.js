export default async function handler(req,res){

res.setHeader("Access-Control-Allow-Origin","*")

const token=process.env.GITHUB_TOKEN
const repo="wagedev/github-storage"

const {action,path,content,message,sha}=req.body

if(action==="list"){

const r=await fetch(
`https://api.github.com/repos/${repo}/git/trees/main?recursive=1`,
{headers:{Authorization:`token ${token}`}}
)

return res.json(await r.json())

}

if(action==="upload"){

const r=await fetch(
`https://api.github.com/repos/${repo}/contents/${path}`,
{
method:"PUT",
headers:{
Authorization:`token ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"upload file",
content
})
})

return res.json(await r.json())

}

if(action==="delete"){

const r=await fetch(
`https://api.github.com/repos/${repo}/contents/${path}`,
{
method:"DELETE",
headers:{
Authorization:`token ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({message,sha})
})

return res.json(await r.json())

}

}