import {Entity, model, property} from '@loopback/repository';

@model()
export class AlquilerCompra extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  estado_solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  constructor(data?: Partial<AlquilerCompra>) {
    super(data);
  }
}

export interface AlquilerCompraRelations {
  // describe navigational properties here
}

export type AlquilerCompraWithRelations = AlquilerCompra & AlquilerCompraRelations;
