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

const router = Router()
const createColaborador = new CreateColaboradorController

const autenticacaoColaborador = new AuthColaboradorController
router.post("/login", autenticacaoColaborador.autenticacao)
router.post("/cadastrarcolaborador", createColaborador.handle)

router.use(AuthMiddleware)

const readColaborador = new ReadColaboradorController
const updateColaborador = new UpdateColaboradorController
const deleteColaborador = new DeleteColaboradorController
router.get("/colaboradores", AuthMiddleware, readColaborador.colaboradores)
router.get("/colaborador/:uuid", readColaborador.colaborador)
router.put("/atualizarcolaborador/:uuid", updateColaborador.update)
router.delete("/deletarcolaborador/:uuid", deleteColaborador.delete)
router.post("/logout", autenticacaoColaborador.logout)

const createCliente = new CreateClienteController   
const readCliente = new ReadClienteController
const updateClient = new UpdateClienteController
const deleteCliente = new DeleteClienteController

router.post("/cadastrarcliente/:colaborador_uuid", createCliente.handle)
router.get("/clientes", readCliente.clientes)
router.get("/cliente/:uuid", readCliente.cliente)
router.put("/atualizarcliente/:uuid", updateClient.update)
router.delete("/deletarcliente/:uuid", deleteCliente.delete)


export {router}