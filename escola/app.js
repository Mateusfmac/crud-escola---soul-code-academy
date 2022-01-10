var express = require("express")
var mongoose = require("mongoose")
const app = express()

const port = 3000

mongoose.connect("YOUR DB !", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const Aluno = mongoose.model("aluno", {
  nome: String,
  dataNasc: String,
  turma: String,
  nota: Number,
  matricula: Number,
  tel: Number
})

app.set("view engine", "ejs")
app.set("views", __dirname, "/views")
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.get("/", (req, res) => {
  res.render("index")
})

// ADD ROTA PARA LISTAR DADOS DO ALUNO 
app.get("/listaAlunos", (req, res) => {
  Aluno.find({}, (err, dados) => { //dados vai como parametro na funcao do for each e recebe os dados do aluno, aluno recebe dados 
    if (err)
      return res.status(500).send("Erro ao consultar alunos")

    res.render("listaAlunos", {
      aluno: dados
    })
  })
})

//rota pag cadastro
app.get("/cadastro", (req, res) => {
  res.render("cadastro")
})


app.post("/cadastroAluno", (req, res) => {

  let dado_aluno = new Aluno()
  dado_aluno.nome = req.body.nome
  dado_aluno.dataNasc = req.body.dataNasc
  dado_aluno.turma = req.body.turma
  dado_aluno.nota = req.body.nota
  dado_aluno.matricula = req.body.matricula
  dado_aluno.tel = req.body.tel

  dado_aluno.save(err => {
    if (err)
      return res.status(500).send("Erro ao cadastrar aluno no banco de dados")

    return res.redirect("/listaAlunos")

  })
})

app.get("/deletarAluno/:id", (req, res) => {
  var chave = req.params.id

  Aluno.deleteOne({
    _id: chave
  }, (err, result) => {
    if (err)
      return res.status(500).send("Erro ao Excluir registro")
  })
  res.redirect("/listaAlunos")
})




app.listen(port, () => {
  console.log(`Conectado ao servidor na pora ${port}`)
})