import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, AlquilerCompra} from '../models';
import {AlquilerCompraRepository} from './alquiler-compra.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly alquilerCompras: HasManyRepositoryFactory<AlquilerCompra, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AlquilerCompraRepository') protected alquilerCompraRepositoryGetter: Getter<AlquilerCompraRepository>,
  ) {
    super(Cliente, dataSource);
    this.alquilerCompras = this.createHasManyRepositoryFactoryFor('alquilerCompras', alquilerCompraRepositoryGetter,);
    this.registerInclusionResolver('alquilerCompras', this.alquilerCompras.inclusionResolver);
  }
}
