import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, AlquilerCompra} from '../models';
import {AlquilerCompraRepository} from './alquiler-compra.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly alquilerCompras: HasManyRepositoryFactory<AlquilerCompra, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AlquilerCompraRepository') protected alquilerCompraRepositoryGetter: Getter<AlquilerCompraRepository>,
  ) {
    super(Usuario, dataSource);
    this.alquilerCompras = this.createHasManyRepositoryFactoryFor('alquilerCompras', alquilerCompraRepositoryGetter,);
    this.registerInclusionResolver('alquilerCompras', this.alquilerCompras.inclusionResolver);
  }
}
