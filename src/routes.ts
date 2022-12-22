import { ReadColaboradorController } from './controllers/colaborador/ReadColaboradorController';
import { Router } from "express";
import { CreateClienteController } from "./controllers/cliente/CreateClienteController";
import { CreateColaboradorController } from "./controllers/colaborador/CreateColaboradorController";
import { ReadClienteController } from "./controllers/cliente/ReadClienteController";
import { DeleteClienteController } from "./controllers/cliente/DeleteClienteController";
import { UpdateClienteController } from "./controllers/cliente/UpdateClienteController";

const router = Router()

const createColaborador = new CreateColaboradorController()
const readColaborador = new ReadColaboradorController()

router.post("/cadastrarcolaborador", createColaborador.handle)
router.get("/colaboradores", readColaborador.colaboradores)
router.get("/colaborador/:uuid", readColaborador.colaborador)


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