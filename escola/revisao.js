var express = require("express")
const app = express()
var mongoose = require("mongoose")
const port = 8000

mongoose.connect("mongodb+srv://mateus_machado:mateus_machado@cluster0.nobsl.mongodb.net/escola?retryWrites=true&w=majority", {useNewUrlParser: true,
  useUnifiedTopology: true})

app.set("view engine", "view")
app.set("views", __dirname, "/views")
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static("public")) // colocar arquivos ejs

const Alunos = mongoose.model("alunos", {
  nome: String,
  datNasc: Date,
  turma: String
})

app.get("/", (req,res)=>{
  res.send("Pag inicial")
})

app.get("/alunos", ()=>{
  let verifica = Alunos.find({}, ()=>{
    if(err)
      return res.status(500).send("Erro ao listar alunos")
      res.render("alunos", {listaAlunos:aluno})
  })
})

app.get("/cadastroAlunos", (req,res)=>{
  res.render("formAlunos")
})

app.post("/cadastroAluno", (res,res)=>{
  let aluno = new Alunos()

  aluno.nome = req.body.nome
  aluno.datNasc = req.body.dataNasc
  aluno.turma = req.body.turma

  //falta validacao

  aluno.save((err)=>{
    if(err)
      return res.statusCode(500).send("errroooo")
    return res.redirect("/alunos")
  })
})



