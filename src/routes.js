const express = require("express");
const ProvinciaController = require("./controllers/provinciaController");
const MunicipioController = require("./controllers/municipioController");
const GeneroController = require("./controllers/generoController");
const EstadoCivilController = require("./controllers/estadoCivilController");
const EstadoController = require("./controllers/estadoController");
const CursoController = require("./controllers/cursoController");
const GrauAcademicoController = require("./controllers/grauAcademicoController");
const TurnoController = require("./controllers/turnoController");
const TurmaController = require("./controllers/turmaController");
const UsuarioController = require("./controllers/usuarioController");
const PermissaoController = require("./controllers/permissaoController");
const CategoriaController = require("./controllers/categoriaController");
const MatriculaController = require("./controllers/matriculaController");
const SessaoController = require("./controllers/sessaoController");
const EstudanteController = require("./controllers/estudanteController");
const InscricaoExameAcessoController = require("./controllers/inscricaoExameAcessoController");
const SolicitacaoHistoricoNotasController = require("./controllers/solicitacaoHistoricoNotasController");
const SolicitacaoRequerimentoController = require("./controllers/solicitacaoRequerimentoController");
const SolicitacaoDeclaracaoEstudosController = require("./controllers/solicitacaoDeclaracaoEstudosController");
const EfeitoDeclaracaoController = require("./controllers/efeitoDeclaracaoController");
const TipoDeclaracaoController = require("./controllers/tipoDeclaracaoController");
const DuracaoDeclaracaoController = require("./controllers/duracaoDeclaracaoController");
const SemestreController = require("./controllers/semestreController");
const DisciplinaController = require("./controllers/disciplinaController");

const { authUsuario } = require("./midlewares/authUsuario");

const routes = express.Router();

//sessao
routes.post("/login", SessaoController.sessaoUsuario);

//usuario
routes.get("/usuarioAll", authUsuario, UsuarioController.getUsuarios);
routes.post(
  "/usuarioCreate/:categoriaId",
  authUsuario,
  UsuarioController.createUsuario
);
routes.get("/usuario/:id", authUsuario, UsuarioController.getUsuario);
routes.delete(
  "/usuarioDelete/:id",
  authUsuario,
  UsuarioController.deleteUsuario
);
routes.patch(
  "/usuarioUpdate/:id",
  authUsuario,
  UsuarioController.updateUsuario
);

//permissao
routes.get(
  "/permissaoCategoria/:categoriaId",
  authUsuario,
  PermissaoController.getPermissoesByCategoria
);
routes.post(
  "/permissaoCreate",
  authUsuario,
  PermissaoController.createPermissao
);

//categoria
routes.post(
  "/categoriaCreate",
  authUsuario,
  CategoriaController.createCategoria
);

//provincia
routes.get("/provinciaAll", ProvinciaController.index);
routes.post("/provinciaCreate", authUsuario, ProvinciaController.store);
routes.delete("/provinciaDelete/:id", authUsuario, ProvinciaController.delete);
routes.patch("/provinciaUpdate/:id", authUsuario, ProvinciaController.update);

//municipio
routes.get(
  "/municipio/:provinciaId",
  MunicipioController.getMunicipiosByProvincia
);
routes.get("/municipioAll", MunicipioController.getMunicipios);
routes.post(
  "/municipioCreate",
  authUsuario,
  MunicipioController.createMunicipio
);
routes.delete("/municipioDelete", authUsuario, MunicipioController.delete);
routes.patch("/municipioUpdate", authUsuario, MunicipioController.update);

//genero
routes.get("/generoAll", GeneroController.getGeneros);

//estadoCivil
routes.get("/estadoCivilAll", EstadoCivilController.getEstadoCivil);

//estado
routes.get("/estadoAll", authUsuario, EstadoController.getEstado);

//curso
routes.get("/cursoAll", CursoController.getCursos);
routes.get("/curso/:id", CursoController.getCurso);
routes.post("/cursoCreate", authUsuario, CursoController.createCurso);
routes.patch("/cursoUpdate/:id", authUsuario, CursoController.updateCurso);
routes.delete("/cursoDelete/:id", authUsuario, CursoController.deleteCurso);

//grauAcademico
routes.get(
  "/grauAcademico/:cursoId",
  authUsuario,
  GrauAcademicoController.getGrauByCurso
);
routes.get(
  "/grauAcademicoAll",
  authUsuario,
  GrauAcademicoController.getGrauAcademico
);
routes.post(
  "/grauAcademicoCreate",
  authUsuario,
  GrauAcademicoController.createGrauAcademico
);
routes.patch(
  "/grauAcademicoUpdate/:id",
  authUsuario,
  GrauAcademicoController.updateGrauAcademico
);
routes.delete(
  "/grauAcademicoDelete/:id",
  authUsuario,
  GrauAcademicoController.deleteGrauAcademico
);

//turno
routes.get("/turnoAll", authUsuario, TurnoController.getTurnos);

//turma
routes.get("/turmaAll", authUsuario, TurmaController.getTurmas);
routes.get(
  "/turma/grauAcademico/:grauAcademicoId",
  authUsuario,
  TurmaController.getTurmasByGrauAcademico
);
routes.get(
  "/turma/turno/:turnoId",
  authUsuario,
  TurmaController.getTurmasByTurno
);
routes.get(
  "/turma/curso/:cursoId",
  authUsuario,
  TurmaController.getTurmasByCurso
);
routes.get(
  "/turma/anolectivo/:inicioAnoLectivo",
  authUsuario,
  TurmaController.getTurmasByAnoLectivo
);
routes.get("/turma/:id", authUsuario, TurmaController.getTurma);
routes.post("/turmaCreate", authUsuario, TurmaController.createTurma);
routes.delete("/turmaDelete/:id", authUsuario, TurmaController.deleteTurma);
routes.patch("/turmaUpdate/:id", authUsuario, TurmaController.updateTurma);

//inscricaoExameAcesso
routes.get(
  "/inscricaoAll",
  authUsuario,
  InscricaoExameAcessoController.getInscricoes
);
routes.get(
  "/inscricoesPendentes",
  authUsuario,
  InscricaoExameAcessoController.getInscricoesPendentes
);
routes.get(
  "/inscricoesAprovadas",
  authUsuario,
  InscricaoExameAcessoController.getInscricoesAprovadas
);
routes.get(
  "/inscricoesRejeitadas",
  authUsuario,
  InscricaoExameAcessoController.getInscricoesRejeitadas
);
routes.get(
  "/inscricao/:id",
  authUsuario,
  InscricaoExameAcessoController.getInscricao
);
routes.post("/inscricaoCreate", InscricaoExameAcessoController.createInscricao);
routes.patch(
  "/inscricaoUpdate/:id",
  authUsuario,
  InscricaoExameAcessoController.updateInscricao
);
routes.delete(
  "/inscricaoDelete/:id",
  authUsuario,
  InscricaoExameAcessoController.deleteInscricao
);

//matricula
routes.get("/matriculaAll", authUsuario, MatriculaController.getMatriculas);
routes.get(
  "/matriculasPendentes",
  authUsuario,
  MatriculaController.getMatriculasPendentes
);
routes.get(
  "/matriculasAprovadas",
  authUsuario,
  MatriculaController.getMatriculasAprovadas
);
routes.get(
  "/matriculasRejeitadas",
  authUsuario,
  MatriculaController.getMatriculasRejeitadas
);
routes.get("/matricula/:id", authUsuario, MatriculaController.getMatricula);
routes.post(
  "/matriculaCreate/:inscricaoExameAcessoId",
  MatriculaController.createMatricula
);
routes.delete(
  "/matriculaDelete/:id",
  authUsuario,
  MatriculaController.deleteMatricula
);
routes.patch(
  "/matriculaUpdate/:id",
  authUsuario,
  MatriculaController.updateMatricula
);

//estudante
routes.get("/estudanteAll", authUsuario, EstudanteController.getEstudantes);
routes.get("/estudante/:id", authUsuario, EstudanteController.getEstudante);
routes.get(
  "/estudantesTurma/:turmaId",
  authUsuario,
  EstudanteController.getEstudantesByTurma
);
routes.post(
  "/estudanteCreate/:matriculaId",
  authUsuario,
  EstudanteController.createEstudante
);
routes.patch(
  "/estudanteUpdate/:id",
  authUsuario,
  EstudanteController.updateEstudante
);
routes.delete(
  "/estudanteDelete/:id",
  authUsuario,
  EstudanteController.deleteEstudante
);

//SolicitacaoHistoricoNotas
routes.get(
  "/solicitacaoHNAll",
  authUsuario,
  SolicitacaoHistoricoNotasController.getSolicitacaoHistoricoNotas
);
routes.get(
  "/solicitacaoHNPendentes",
  authUsuario,
  SolicitacaoHistoricoNotasController.getHNPendentes
);
routes.get(
  "/solicitacaoHNAprovadas",
  authUsuario,
  SolicitacaoHistoricoNotasController.getHNAprovadas
);
routes.get(
  "/solicitacaoHNRejeitadas",
  authUsuario,
  SolicitacaoHistoricoNotasController.getHNRejeitadas
);
routes.get(
  "/historicoNotas/:id",
  authUsuario,
  SolicitacaoHistoricoNotasController.getHistoricoNotas
);
routes.post(
  "/solicitacaohnCreate",
  authUsuario,
  SolicitacaoHistoricoNotasController.createSolicitacao
);
routes.delete(
  "/solicitacaoHNDelete/:id",
  authUsuario,
  SolicitacaoHistoricoNotasController.deleteSolicitacao
);
routes.patch(
  "/solicitacaoHNUpdate/:id",
  authUsuario,
  SolicitacaoHistoricoNotasController.updateSolicitacao
);

//SolicitacaoRequerimento
routes.get(
  "/reqAll",
  authUsuario,
  SolicitacaoRequerimentoController.getSolicitacaoRequerimentos
);
routes.get(
  "/reqPendentes",
  authUsuario,
  SolicitacaoRequerimentoController.getReqPendentes
);
routes.get(
  "/reqAprovados",
  authUsuario,
  SolicitacaoRequerimentoController.getReqAprovados
);
routes.get(
  "/reqRejeitados",
  authUsuario,
  SolicitacaoRequerimentoController.getReqRejeitados
);
routes.get(
  "/requerimento/:id",
  authUsuario,
  SolicitacaoRequerimentoController.getRequerimento
);
routes.post(
  "/reqCreate",
  authUsuario,
  SolicitacaoRequerimentoController.createSolicitacao
);
routes.delete(
  "/reqDelete/:id",
  authUsuario,
  SolicitacaoRequerimentoController.deleteSolicitacao
);
routes.patch(
  "/reqUpdate/:id",
  authUsuario,
  SolicitacaoRequerimentoController.updateSolicitacao
);

//SolicitacaoDeclaracaoEstudos
routes.get(
  "/declaracaoAll",
  authUsuario,
  SolicitacaoDeclaracaoEstudosController.getSolicitacaoDeclaracaoEstudos
);
routes.get(
  "/declaracaoPendentes",
  authUsuario,
  SolicitacaoDeclaracaoEstudosController.getDeclaracoesPendentes
);
routes.get(
  "/declaracaoAprovadas",
  authUsuario,
  SolicitacaoDeclaracaoEstudosController.getDeclaracoesAprovadas
);
routes.get(
  "/declaracaoRejeitadas",
  authUsuario,
  SolicitacaoDeclaracaoEstudosController.getDeclaracoesRejeitadas
);
routes.post(
  "/declaracaoCreate",
  authUsuario,
  SolicitacaoDeclaracaoEstudosController.createSolicitacao
);
routes.delete(
  "/declaracaoDelete/:id",
  authUsuario,
  SolicitacaoDeclaracaoEstudosController.deleteSolicitacao
);
routes.patch(
  "/declaracaoUpdate/:id",
  authUsuario,
  SolicitacaoDeclaracaoEstudosController.updateSolicitacao
);

//Tipo
routes.get(
  "/tipoDeclaracao",
  authUsuario,
  TipoDeclaracaoController.getTipoDeclaracao
);

//Efeito
routes.get(
  "/efeitoDeclaracao",
  authUsuario,
  EfeitoDeclaracaoController.getEfeitoDeclaracao
);

//Duração
routes.get(
  "/duracaoDeclaracao",
  authUsuario,
  DuracaoDeclaracaoController.getDuracaoDeclaracao
);

//Semestre
routes.get("/semestreAll", authUsuario, SemestreController.getSemestres);

//Disciplina
routes.get("/disciplinaAll", authUsuario, DisciplinaController.getDisciplinas);
routes.get("/disciplina/:id", authUsuario, DisciplinaController.getDisciplina);
routes.get(
  "/disciplinasByGrau/:id",
  authUsuario,
  DisciplinaController.getDisciplinasByGrauAcademico
);
routes.post(
  "/disciplinaCreate",
  authUsuario,
  DisciplinaController.createDisciplina
);
routes.patch(
  "/disciplinaUpdate/:id",
  authUsuario,
  DisciplinaController.updateDisciplina
);
routes.delete(
  "/disciplinaDelete/:id",
  authUsuario,
  DisciplinaController.deleteDisciplina
);

module.exports = routes;
