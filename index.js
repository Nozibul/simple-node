const { response } = require('express')
const express = require('express') // step 1: express k import kora holo
const app = express() // step 2: app create korbo then upore express er moddhe express k rakbo
const port = process.env.port || 5000  // sep 3 : then port likbo

//middleware // module 63-6
var cors = require('cors') // ata use koro react er sathe etar data pathete jate data gulo open thake
app.use(cors())

// body parse middelware for stringfy to json converter
app.use(express.json())


app.get('/', (request, response)=>{  //step 4 : app k get korbo
 // kew kisu kono kisur jonno request korle 1st e resposone korbo then jeta chaibe seta send korbo
  response.send('My first Node learning Express with nodemon') ;
})  

// 63-4 Create dynamic api, api parameter, access params
// app.get('/users', (req, res)=>{
//     res.send({id:1, name:"nj", phone:"01393242"})
// })

const users=[
    // {id:0, name:"nj", phone:"01393242"},
    {id:1, name:"nj", phone:"01393242"},
    {id:2, name:"islam", phone:"43672242"},
    {id:3, name:"Md", phone:"36293242"},
    {id:4, name:"Nozibul", phone:"0790242"},
    {id:5, name:"Nozib", phone:"7624790242"},
    {id:6, name:"Nozibulla", phone:"276790242"}
];

app.get('/users', (req, res)=>{
    res.send(users)
})

// dynamic api parameter access params
app.get('/users/:id', (req, res)=>{
    // console.log(req.params.id)

 // 1st step id ta pete hole user k bolte hobe ba request korte hobe then seta k kono var e rakbo
    const id = req.params.id ;

// 2nd step req kora id ta amar users array te ase kina check korbo
   const user = users[id-1];
   
// jodi id ta match kore tahole user er dea id er moddhe thaka data kogu thake dia dibo UI te
   res.send(user)
})


//63-5 Access query parameter and return search result
 app.get('/fruits/mango/himshagor', (req, res)=>{
   res.send('yummy yummy testy')
 })

 app.get('/fruits', (req, res)=>{
   res.send(['mango', 'banana', 'apple', 'guava'])
 })

 // search query result

 const friends=[
  // {id:0, name:"nj", phone:"01393242"},
  {id:0, name:"njj", phone:"01393242"},
  {id:1, name:"nj", phone:"01393242"},
  {id:2, name:"Islam", phone:"43672242"},
  {id:3, name:"md", phone:"36293242"},
  {id:4, name:"nozibul", phone:"0790242"},
  {id:5, name:"inozb", phone:"7624790242"}
];
app.get('/friends', (req, res)=>{
// console.log(req.query.search)
// 1st step e user e j value dia search dibe ter property & query avabe set orte hobe
  const search =(req.query.search)
  
// 2nd step codition use korte pari , user jeta search korbe seta jodi data te thee thole seta dekhabe r na thake sob data dekhabe
  if(search){
    // 3rd step jodi search er kono result pai tahole seta k filter kore then send korbo
    const searchResult = friends.filter(friend=> friend.name.toLocaleLowerCase().includes(search) )
    res.send(searchResult)
  }
  else{
     res.send(friends)
  }
})

// 63-7 Create Post API and set fetch with post method
app.post('/friends', (req, res)=>{
  const newFriend = req.body ;
  newFriend.id = friends.length;
  friends.push(newFriend)
  console.log('hitting he data', req.body)
  // res.send(JSON.stringify(newFriend)) // atar poribirte nicer line tao lekha jai
  res.json(newFriend)
})

app.listen(port,()=>{  // last step 5
  console.log('Listen port', port)
}) 