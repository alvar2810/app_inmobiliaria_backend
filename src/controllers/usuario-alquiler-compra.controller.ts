import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  AlquilerCompra,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioAlquilerCompraController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Array of Usuario has many AlquilerCompra',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AlquilerCompra)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AlquilerCompra>,
  ): Promise<AlquilerCompra[]> {
    return this.usuarioRepository.alquilerCompras(id).find(filter);
  }

  @post('/usuarios/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(AlquilerCompra)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {
            title: 'NewAlquilerCompraInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) alquilerCompra: Omit<AlquilerCompra, 'id'>,
  ): Promise<AlquilerCompra> {
    return this.usuarioRepository.alquilerCompras(id).create(alquilerCompra);
  }

  @patch('/usuarios/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Usuario.AlquilerCompra PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlquilerCompra, {partial: true}),
        },
      },
    })
    alquilerCompra: Partial<AlquilerCompra>,
    @param.query.object('where', getWhereSchemaFor(AlquilerCompra)) where?: Where<AlquilerCompra>,
  ): Promise<Count> {
    return this.usuarioRepository.alquilerCompras(id).patch(alquilerCompra, where);
  }

  @del('/usuarios/{id}/alquiler-compras', {
    responses: {
      '200': {
        description: 'Usuario.AlquilerCompra DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AlquilerCompra)) where?: Where<AlquilerCompra>,
  ): Promise<Count> {
    return this.usuarioRepository.alquilerCompras(id).delete(where);
  }
}
