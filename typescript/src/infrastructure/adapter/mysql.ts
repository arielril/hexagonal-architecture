import {
  MysqlDatabase,
  MysqlAdapterConfig,
  IMysqlAdapter,
} from '../../types/infrastructure';

export class MysqlAdapter implements IMysqlAdapter {
  private _tbName: string;
  private database: MysqlDatabase;

  constructor({ dbConn }: MysqlAdapterConfig) {
    this.database = dbConn;
    this._tbName = '';
  }

  get db() {
    return this.database(this._tbName);
  }

  set tableName(name: string) {
    this._tbName = name;
  }
}
