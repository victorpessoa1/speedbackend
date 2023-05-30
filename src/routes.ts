import { DeleteEquipeController } from './controllers/equipe/DeleteEquipeController';
import { CreateEquipeController } from './controllers/equipe/CreateEquipeController';
import { UpdateEquipeController } from './controllers/equipe/UpdateEquipeController';
import { ReadEquipeController } from './controllers/equipe/ReadEquipeController';
import { CreateBoletoController } from './controllers/boleto/CreateBoletoController';
import { DeleteColaboradorController } from './controllers/colaborador/DeleteColaboradorController';
import { ReadColaboradorController } from './controllers/colaborador/ReadColaboradorController';
import { Router } from "express";
import { CreateClienteController } from "./controllers/cliente/CreateClienteController";
import { CreateColaboradorController } from "./controllers/colaborador/CreateColaboradorController";
import { ReadClienteController } from "./controllers/cliente/ReadClienteController";
import { DeleteClienteController } from "./controllers/cliente/DeleteClienteController";
import { UpdateClienteController } from "./controllers/cliente/UpdateClienteController";
import { UpdateColaboradorController } from './controllers/colaborador/UpdateColaboradorController';
import { AuthColaboradorController } from './controllers/auth/AuthController';
import { AuthMiddleware } from './middlewares/auth';
import { DeleteBoletoController } from './controllers/boleto/DeleteBoletoController';
import { ReadBoletoController } from './controllers/boleto/ReadBoletoController';
import { UpdateBoletoController } from './controllers/boleto/UpdateBoletoController';
import { CreateContemplacaoController } from './controllers/contemplacao/CreateContemplacaoController';
import { DeleteContemplacaoController } from './controllers/contemplacao/DeleteContemplacaoController';
import { ReadContemplacaoController } from './controllers/contemplacao/ReadContemplacaoController';
import { UpdateContemplacaoController } from './controllers/contemplacao/UpdateContemplacaoController';
import { CreateContratoController } from './controllers/contrato/CreateContratoController';
import { DeleteContratoController } from './controllers/contrato/DeleteContratoController';
import { ReadContratoController } from './controllers/contrato/ReadContratoController';
import { UpdateContratoController } from './controllers/contrato/UpdateContratoController';
import { CreateFinanceiraController } from './controllers/financeira/CreateFinanceiraController';
import { DeleteFinanceiraController } from './controllers/financeira/DeleteFinanceiraController';
import { ReadFinanceiraController } from './controllers/financeira/ReadFinanceiraController';
import { UpdateFinanceiraController } from './controllers/financeira/UpdateFinanceiraController';
import { CreateTipoConsorcioController } from './controllers/tipoConsorcio/CreateTipoConsorcioController';
import { DeleteTipoConsorcioController } from './controllers/tipoConsorcio/DeleteTipoConsorcioController';
import { ReadTipoConsorcioController } from './controllers/tipoConsorcio/ReadTipoConsorcioController';
import { UpdateTipoConsorcioController } from './controllers/tipoConsorcio/UpdateTipoConsorcioController';
import { CreateAgendaClienteController } from './controllers/agendaCliente/CreateAgendaClienteController';
import { DeleteAgendaClienteController } from './controllers/agendaCliente/DeleteAgendaClienteController';
import { ReadAgendaClienteController } from './controllers/agendaCliente/ReadAgendaClienteController';
import { UpdateAgendaClienteController } from './controllers/agendaCliente/UpdateAgendaClienteController';
import { UpdateTarefaController } from './controllers/tarefas/UpdateTarefaController';
import { CreateTarefaController } from './controllers/tarefas/CreateTarefaController';
import { DeleteTarefaController } from './controllers/tarefas/DeleteTarefaController';
import { ReadTarefaController } from './controllers/tarefas/ReadTarefaController';
import path from 'path'
import fs from 'fs-extra';
import { UpdateLoginController } from './controllers/auth/UpdateLoginController';
import { CreateHistoricoTarefaController } from './controllers/historicotarefas/CreateHistoricoTarefaController';
import { DeleteHistoricoTarefaController } from './controllers/historicotarefas/DeleteHistoricoTarefaController';
import { ReadHistoricoTarefaController } from './controllers/historicotarefas/ReadHistoricoTarefaController';
import { UpdateHistoricoTarefaController } from './controllers/historicotarefas/UpdateHistoricoTarefaController';
import { CreateGrupoController } from './controllers/grupo/CreateGrupoController';
import { DeleteGrupoController } from './controllers/grupo/DeleteGrupoController';
import { ReadGrupoController } from './controllers/grupo/ReadGrupoController';
import { UpdateGrupoController } from './controllers/grupo/UpdateGrupoController';
import { CreateCotaController } from './controllers/cota/CreateCotaController';
import { DeleteCotaController } from './controllers/cota/DeleteCotaController';
import { ReadCotaController } from './controllers/cota/ReadCotaController';
import { UpdateCotaController } from './controllers/cota/UpdateCotaController';

const router = Router()

////////////////////////////////////////////
try{
    const multer = require("multer")
    
    const storage = multer.diskStorage({
        destination: async (req: any, file: any, cb: any) => {
            console.log(req.body)
            console.log("//////////////////////////");
            
            const nomeCompleto = req.body.nomeCompleto.replaceAll(' ', '');
            const pasta = path.join(__dirname, '..', 'uploads', nomeCompleto);
            
            try {
                await fs.ensureDir(pasta); // Verifica se a pasta existe e cria caso não exista
                cb(null, pasta);
              } catch (err) {
                cb(err, null);
              }        
            
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, file.originalname);
        }
    })
    
    var upload = multer ({ 
        storage: storage,
     })
}catch(error) {
    console.log(
        { 
        error: error,
        message: "Falha ao criar cliente"
        })
}
    

///////////////////////////////////////////////

const createColaborador = new CreateColaboradorController

const autenticacaoColaborador = new AuthColaboradorController
router.post("/login", autenticacaoColaborador.autenticacao)
router.post("/cadastrarcolaborador", createColaborador.handle)

router.use(AuthMiddleware)

const readColaborador = new ReadColaboradorController
const updateColaborador = new UpdateColaboradorController
const deleteColaborador = new DeleteColaboradorController
const atualizalogin = new UpdateLoginController
router.get("/colaboradores", readColaborador.colaboradores)
router.get("/colaboradoresativos", readColaborador.colaboradoresAtivos)
router.get("/colaboradoresinativos", readColaborador.colaboradoresInativos)
router.get("/colaborador/:uuid", readColaborador.colaborador)
router.put("/atualizarcolaborador/:uuid", updateColaborador.update)
router.put("/atualizalogin/:uuid", atualizalogin.update)
router.delete("/deletarcolaborador/:uuid", deleteColaborador.delete)
router.post("/logout", autenticacaoColaborador.logout)

const createEquipe = new CreateEquipeController
const readEquipe = new ReadEquipeController
const UpdateEquipe = new UpdateEquipeController
const deleteEquipe = new DeleteEquipeController

router.post('/cadastrarequipe', createEquipe.handle)
router.get('/equipes', readEquipe.equipes)
router.put('/atualizarequipe/:uuid', UpdateEquipe.update)
router.delete('/deletarcolaborador/:uuid', deleteEquipe.delete)

const createCliente = new CreateClienteController   
const readCliente = new ReadClienteController
const updateCliente = new UpdateClienteController
const deleteCliente = new DeleteClienteController

router.post("/cadastrarcliente/:colaborador_uuid", upload.array('fotoDocumento', 7) , createCliente.handle)
router.get("/clientes", readCliente.clientes)
router.get("/clientesativos", readCliente.clientesAtivos)
router.get("/clientesinativos", readCliente.clientesInativos)
router.get("/clientestotal", readCliente.clientestotal)
router.get("/cliente/:uuid", readCliente.cliente)

router.put("/atualizarcliente/:uuid", upload.array('fotoDocumento', 7) , updateCliente.updateCliente)
router.delete("/deletarcliente/:uuid", deleteCliente.delete)

const createAgendaCliente = new CreateAgendaClienteController   
const readAgendaCliente = new ReadAgendaClienteController
const updateAgendaCliente = new UpdateAgendaClienteController
const deleteAgendaCliente = new DeleteAgendaClienteController

router.post("/cadastraragendacliente", createAgendaCliente.handle)
router.get("/agendaclientes", readAgendaCliente.exibirClientesGlobal) // TODOS os clientes
router.get("/agendaclientespessoal", readAgendaCliente.exibirClientesDoColaborador) // clientes públicos e criados colaborador
router.get("/agendacliente/:uuid", readAgendaCliente.exibirCliente)
router.put("/atualizaragendacliente/:uuid", updateAgendaCliente.update)
router.delete("/deletaragendacliente/:uuid", deleteAgendaCliente.delete)

const createTarefa = new CreateTarefaController   
const readTarefa = new ReadTarefaController
const updateTarefa = new UpdateTarefaController
const deleteTarefa = new DeleteTarefaController

router.post("/cadastrartarefa/:colaborador_uuid", createTarefa.criarumatarefa)
router.post("/cadastrartarefas", createTarefa.criarvariastarefas)
router.get("/tarefas", readTarefa.exibirTarefas)
router.get("/tarefa/:uuid", readTarefa.exibirTarefa)
router.get("/tarefasemespera", readTarefa.exibirTarefasEmEspera)
router.get("/tarefasaceitas", readTarefa.exibirTarefasAceitas)
router.get("/tarefasconcluidas", readTarefa.exibirTarefasConcluidas)
router.get("/tarefasnaoconcluidas", readTarefa.exibirTarefasNaoConcluidas)
router.put("/atualizartarefa/:uuid", updateTarefa.update)
router.put("/atualizartarefanegada/:uuid", updateTarefa.updatenegando)
router.delete("/deletartarefa/:uuid", deleteTarefa.delete)

const createHistoricoTarefa = new CreateHistoricoTarefaController   
const readHistoricoTarefa = new ReadHistoricoTarefaController
const updateHistoricoTarefa = new UpdateHistoricoTarefaController
const deleteHistoricoTarefa = new DeleteHistoricoTarefaController

router.get("/historicotarefas", readHistoricoTarefa.exibirHistoricoTarefas)
router.delete("/deletarhistoricotarefa/:uuid", deleteHistoricoTarefa.delete)

const createBoleto = new CreateBoletoController
const readBoleto = new ReadBoletoController
const updateBoleto = new UpdateBoletoController
const deleteBoleto = new DeleteBoletoController

router.post("/cadastrarboleto", createBoleto.handle)
router.post("/cadastrarboletos/", createBoleto.criarvariosboletos)
router.get("/boletos", readBoleto.exibirBoletos)
router.get("/boletosabertosdecolaborador/:colaborador_uuid", readBoleto.exibirBoletosAbertosDeUmColaborador)
router.get("/boletosabertosdecliente/:cliente_uuid", readBoleto.exibirBoletosAbertosDeUmCliente)
router.put("/atualizarboleto/:boleto_id", updateBoleto.update)
router.delete("/deletarboleto/:boleto_id", deleteBoleto.delete)

const createContemplacao = new CreateContemplacaoController
const readContemplacao = new ReadContemplacaoController
const updateContemplacao = new UpdateContemplacaoController
const deleteContemplacao = new DeleteContemplacaoController

router.post("/cadastrarcontemplacao", createContemplacao.handle)
router.get("/contemplacoes", readContemplacao.exibirContemplacao)
router.put("/atualizarcontemplacao/:contemplacao_id", updateContemplacao.update)
router.delete("/deletarcontemplacao/:contemplacao_id", deleteContemplacao.delete)

const createContrato = new CreateContratoController
const readContrato = new ReadContratoController
const updateContrato = new UpdateContratoController
const deleteContrato = new DeleteContratoController

router.post("/cadastrarcontrato", createContrato.handle)
router.get("/contratos", readContrato.exibirContrato)
router.get("/contratostotal", readContrato.exibirContratos)
router.get("/contratosativos", readContrato.exibirContratosAtivos)
router.get("/contratosinativos", readContrato.exibirContratosInativos)
router.get("/contratosporcolaborador/:uuid", readContrato.exibirContratosPorColaborador)
router.get("/contratosporcliente/:cliente_uuid", readContrato.exibirContratosPorCliente)
router.get("/contratos/tempo", readContrato.exibirContratosPorTempo)
router.put("/atualizarcontrato/:nContrato", updateContrato.update)
router.delete("/deletarcontrato/:nContrato", deleteContrato.delete)

const createFinanceira = new CreateFinanceiraController
const readFinanceira = new ReadFinanceiraController
const updateFinanceira = new UpdateFinanceiraController
const deleteFinanceira = new DeleteFinanceiraController

router.post("/cadastrarfinanceira", createFinanceira.handle)
router.get("/financeiras", readFinanceira.exibirFinanceiras)
router.get("/financeira/id", readFinanceira.exibirFinanceira)
router.put("/atualizarfinanceira/:financeira_id", updateFinanceira.update)
router.delete("/deletarfinanceira/:financeira_id", deleteFinanceira.delete)

const createGrupo = new CreateGrupoController
const readGrupo = new ReadGrupoController
const updateGrupo = new UpdateGrupoController
const deleteGrupo = new DeleteGrupoController

router.post("/cadastrargrupo", createGrupo.handle)
router.get("/grupos", readGrupo.exibirGrupos)
router.get("/grupo/id", readGrupo.exibirGrupo)
router.put("/atualizargrupo/:uuid", updateGrupo.update)
router.delete("/deletargrupo/:uuid", deleteGrupo.delete)

const createCota = new CreateCotaController
const readCota = new ReadCotaController
const updateCota = new UpdateCotaController
const deleteCota = new DeleteCotaController

router.post("/cadastrarcota", createCota.handle)
router.get("/cotas", readCota.exibirCotas)
router.get("/cota/id", readCota.exibirCota)
router.put("/atualizarcota/:uuid", updateCota.update)
router.delete("/deletarcota/:uuid", deleteCota.delete)


const createTipoConsorcio = new CreateTipoConsorcioController
const readTipoConsorcio = new ReadTipoConsorcioController
const updateTipoConsorcio = new UpdateTipoConsorcioController
const deleteTipoConsorcio = new DeleteTipoConsorcioController

router.post("/cadastrartipoconsorcio", createTipoConsorcio.handle)
router.get("/tiposconsorcio", readTipoConsorcio.exibirTipoConsorcio)
router.put("/atualizartipoconsorcio/:id", updateTipoConsorcio.update)
router.delete("/deletartipoconsorcio/:id", deleteTipoConsorcio.delete)

export {router}