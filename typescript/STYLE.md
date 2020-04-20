# Style Guide (pt-BR)

## Imports

1.  Pacotes externos
2.  Pacotes/arquivos internos
3.  Arquivos de tipos (apenas para TypeScript)
```typescript
  import * as R from 'ramda';

  import { maskEmail } from '../../helpers/mask';
  import { Uuid } from '../../helpers/uuid';

  import { IServiceContext, MySQLTransaction } from '../../types';
  import {
    IGetPersonParams, IPersonService, Person,
    PersonId,
    GetPersonRecord,
    FormattedPerson,
    PersonModelUpdateParams,
  } from '../../types/Person';
  import { Document } from '../../types/Document';
```

## Type Definition (TypeScript)

-   Usar **interface** para definição de interfaces para as classes
```typescript
interface IPersonModel {
  create(
    data: Pick<Person, 'email' | 'birthDate'>,
    trx?: MySQLTransaction,
  ): Promise<PersonId>;
  getPerson(getPersonParams: IGetPersonParams): Promise<(GetPersonRecord | Person)[]>;
  update(params: PersonModelUpdateParams, trx?: MySQLTransaction): Promise<void>;
}
```

- Tipos básicos da aplicação, definir usando **type**
- Caso uma propriedade seja uma reutilização de um outro tipo, utilizar a referência do outro tipo usando a funcionalidade de objetos `Object[key]` para não ter duplicidade na definição
   
<table>
<thead><tr><th>Bad</th><th>Good</th></tr></thead>
<tbody>
<tr><td>

```typescript
interface IPersonRequestFilters {
  id?: string;
  email?: string;
  documentType?: string;
  documentNumber?: string;
  documentEmitter?: string;
}
```

</td><td>

```typescript
type PersonRequest = Partial<{
  name: object;
  birthDate: Person['birthDate'];
  email: Person['email'];
  documents: Omit<Document, 'personId'>[];
  phone: Phone;
}>;
```

</td></tr>
</tbody></table>

- **TypeScript** - Criar arquivos de definição de tipos `.d.ts` para os tipos das entidades, normalmente os "maiores" tipos da aplicação

<table>
<thead><tr><th>Bad</th><th>Good</th></tr></thead>
<tbody>
<tr><td>

![](https://storage.googleapis.com/slite-api-files-production/files/e650c8fc-5a0b-4dc5-a801-b0a0508d5056/Screen%2520Shot%25202020-01-02%2520at%252010.25.41%2520AM.png)

</td><td>

![](https://storage.googleapis.com/slite-api-files-production/files/e05f306a-d37d-48b8-9098-229b936b8de4/Screen%2520Shot%25202020-01-02%2520at%252010.25.58%2520AM.png)

</td></tr>
</tbody></table>

## Code Documentation

- Documentar o código utilizando JSDoc (https://jsdoc.app/index.html)

![](https://storage.googleapis.com/slite-api-files-production/files/1c253b34-1d59-4f56-8144-392a8a103999/Screen%2520Shot%25202020-01-02%2520at%252010.34.36%2520AM.png)

## Tests
- Testes unitarios em um arquivo com o nome no formato `*.unit.test.*` 
- Testes de integração em arquivos com o nome no formato `*.test.*` , sem `.unit.` 
- Cada teste deve possuir a criação do ambiente necessário para o teste (definição de objetos, criação de registros no banco de dados, ...) no escopo do teste (dentro do `it`)
- Cada teste deve possuir a remoção do ambiente necessário para o teste no escopo do teste (dentro do `it` )

<table>
<thead><tr><th>Bad</th><th>Good</th></tr></thead>
<tbody>
<tr><td>

```typescript
describe('#update', () => {
  beforeAll(async () => {
    // Criação do ambiente necessário

    await db('person').insert(createPerson);
    await db('document').insert(createDocument);
    await db('phone').insert(createPhone);
  });

  afterAll(async () => {
    // Remoção do ambiente criado

    await db('document').whereIn('personId', [firstPersonId, secondPersonId]).del();
    await db('phone').whereIn('personId', [firstPersonId, secondPersonId]).del();
    await db('person').whereIn('id', [firstPersonId, secondPersonId]).del();
  });
});
```

</td><td>

```typescript
describe('Update document', () => {
  it('update test', async () => {
    // Criação do ambiente necessário

    const person = makePerson();
    const personId = await personService.create(person) as string;
    const doc = makeDocument(personId);
    await documentService.create(doc);

    const binaryId = Uuid.stringToBinary(personId);
    const [insertedDocument] = await docModel.db.where({
      ...doc,
      personId: binaryId,
    }).then(R.map(docModel.fromDatabase));
    .
    .
    .
    expect(updatedDoc).not.toHaveProperty('number', insertedDocument.number);
    expect(updatedDoc).not.toHaveProperty('expirationDate', insertedDocument.expirationDate);

    // Remoção do ambiente criado
    await documentService.delete(personId);
    return personService.delete(personId);
  })
})
```

</td></tr>
</tbody></table>
 

## Database Migrations

- Create table - Criar um arquivo de migração para cada tabela
- Caso uma coluna de uma tabela guarde uma informação complexa, adicionar um comentário

```typescript
export async function up(knex: Knex): Promise<any> {
  return knex.schema.alterTable('user', (t) => {
    t.json('filled')
      .comment('This field has all properties that the user already filled in the account')
  });
}
```

## Resource Links
- <https://medium.com/better-programming/kiss-dry-and-code-principles-every-developer-should-follow-b77d89f51d74>
