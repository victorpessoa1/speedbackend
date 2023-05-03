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
router.get("/colaboradores", AuthMiddleware, readColaborador.colaboradores)
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
router.get("/clientestotal", readCliente.clientestotal)
router.get("/cliente/:uuid", readCliente.cliente)
router.put("/atualizarcliente/:uuid", upload.array('fotoDocumento', 7) , updateCliente.updateCliente)
router.delete("/deletarcliente/:uuid", deleteCliente.delete)

const createAgendaCliente = new CreateAgendaClienteController   
const readAgendaCliente = new ReadAgendaClienteController
const updateAgendaCliente = new UpdateAgendaClienteController
const deleteAgendaCliente = new DeleteAgendaClienteController

router.post("/cadastraragendacliente", createAgendaCliente.handle)
router.get("/agendaclientes", readAgendaCliente.exibirClientes)
router.get("/agendacliente/:uuid", readAgendaCliente.exibirCliente)
router.put("/atualizaragendacliente/:uuid", updateAgendaCliente.update)
router.delete("/deletaragendacliente/:uuid", deleteAgendaCliente.delete)

const createTarefa = new CreateTarefaController   
const readTarefa = new ReadTarefaController
const updateTarefa = new UpdateTarefaController
const deleteTarefa = new DeleteTarefaController

router.post("/cadastrartarefa/:colaborador_uuid", createTarefa.handle)
router.get("/tarefas", readTarefa.exibirTarefas)
router.get("/tarefa/:uuid", readTarefa.exibirTarefa)
router.put("/atualizartarefa/:uuid", updateTarefa.update)
router.delete("/deletartarefa/:uuid", deleteTarefa.delete)

const createBoleto = new CreateBoletoController
const readBoleto = new ReadBoletoController
const updateBoleto = new UpdateBoletoController
const deleteBoleto = new DeleteBoletoController

router.post("/cadastrarboleto", createBoleto.handle)
router.get("/boletos", readBoleto.exibirBoleto)
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
router.get("/contratos/:uuid", readContrato.exibirContratosPorColaborador)
router.get("/contratos/:cliente_uuid", readContrato.exibirContratosPorCliente)
router.get("/contratos/tempo", readContrato.exibirContratosPorTempo)
router.put("/atualizarcontrato/:nContrato", updateContrato.update)
router.delete("/deletarcontrato/:nContrato", deleteContrato.delete)

const createFinanceira = new CreateFinanceiraController
const readFinanceira = new ReadFinanceiraController
const updateFinanceira = new UpdateFinanceiraController
const deleteFinanceira = new DeleteFinanceiraController

router.post("/cadastrarfinanceira", createFinanceira.handle)
router.get("/financeiras", readFinanceira.exibirFinanceira)
router.put("/atualizarfinanceira/:financeira_id", updateFinanceira.update)
router.delete("/deletarfinanceira/:financeira_id", deleteFinanceira.delete)


const createTipoConsorcio = new CreateTipoConsorcioController
const readTipoConsorcio = new ReadTipoConsorcioController
const updateTipoConsorcio = new UpdateTipoConsorcioController
const deleteTipoConsorcio = new DeleteTipoConsorcioController

router.post("/cadastrartipoconsorcio", createTipoConsorcio.handle)
router.get("/tiposconsorcio", readTipoConsorcio.exibirTipoConsorcio)
router.put("/atualizartipoconsorcio/:id", updateTipoConsorcio.update)
router.delete("/deletartipoconsorcio/:id", deleteTipoConsorcio.delete)

export {router}