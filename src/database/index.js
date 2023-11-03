const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Provincia = require("../models/Provincia");
const Municipio = require("../models/Municipio");
const Matricula = require("../models/Matricula");
const Curso = require("../models/Curso");
const Estado = require("../models/Estado");
const EstadoCivil = require("../models/EstadoCivil");
const Genero = require("../models/Genero");
const GrauAcademico = require("../models/GrauAcademico");
const Turno = require("../models/Turno");
const Turma = require("../models/Turma");
const Usuario = require("../models/Usuario");
const Categoria = require("../models/Categoria");
const Permissao = require("../models/Permissao");
const Estudante = require("../models/Estudante");
const InscricaoExameAcesso = require("../models/InscricaoExameAcesso");
const SolicitacaoHistoricoNotas = require("../models/SolicitacaoHistoricoNotas");
const SolicitacaoRequerimento = require("../models/SolicitacaoRequerimento");
const SolicitacaoDeclaracaoEstudos = require("../models/SolicitacaoDeclaracaoEstudos");
const DuracaoDeclaracao = require("../models/DuracaoDeclaracao");
const TipoDeclaracao = require("../models/TipoDeclaracao");
const EfeitoDeclaracao = require("../models/EfeitoDeclaracao");
const Disciplina = require("../models/Disciplina");
const Semestre = require("../models/Semestre");
const PautaParcelar = require("../models/PautaParcelar");
const PautaExame = require("../models/PautaExame");
const PautaRecurso = require("../models/PautaRecurso");
const PautaRecuperacao = require("../models/PautaRecuperacao");
const connection = new Sequelize(dbConfig);

//Connection
Provincia.init(connection);
Municipio.init(connection);
Matricula.init(connection);
Curso.init(connection);
Estado.init(connection);
EstadoCivil.init(connection);
Genero.init(connection);
GrauAcademico.init(connection);
Turno.init(connection);
Turma.init(connection);
Usuario.init(connection);
Categoria.init(connection);
Permissao.init(connection);
Estudante.init(connection);
InscricaoExameAcesso.init(connection);
SolicitacaoHistoricoNotas.init(connection);
SolicitacaoRequerimento.init(connection);
SolicitacaoDeclaracaoEstudos.init(connection);
DuracaoDeclaracao.init(connection);
TipoDeclaracao.init(connection);
EfeitoDeclaracao.init(connection);
Disciplina.init(connection);
Semestre.init(connection);
PautaParcelar.init(connection);
PautaExame.init(connection);
PautaRecurso.init(connection);
PautaRecuperacao.init(connection);

//Association
Provincia.associate(connection.models);
Municipio.associate(connection.models);
Matricula.associate(connection.models);
Curso.associate(connection.models);
Estado.associate(connection.models);
EstadoCivil.associate(connection.models);
Genero.associate(connection.models);
GrauAcademico.associate(connection.models);
Turno.associate(connection.models);
Turma.associate(connection.models);
Usuario.associate(connection.models);
Categoria.associate(connection.models);
Permissao.associate(connection.models);
Estudante.associate(connection.models);
InscricaoExameAcesso.associate(connection.models);
SolicitacaoHistoricoNotas.associate(connection.models);
SolicitacaoRequerimento.associate(connection.models);
SolicitacaoDeclaracaoEstudos.associate(connection.models);
DuracaoDeclaracao.associate(connection.models);
TipoDeclaracao.associate(connection.models);
EfeitoDeclaracao.associate(connection.models);
Disciplina.associate(connection.models);
Semestre.associate(connection.models);
PautaParcelar.associate(connection.models);
PautaExame.associate(connection.models);
PautaRecurso.associate(connection.models);
PautaRecuperacao.associate(connection.models);

module.exports = connection;
