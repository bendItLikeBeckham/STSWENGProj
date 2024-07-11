export enum functions {
  mongoFindOne = "mongoFindOne",
  mongoFindMany = "mongoFindMany",
  mongoInsertOne = "mongoInsertOne",
  mongoInsertMany = "mongoInsertMany",
  mongoDeleteMany = "mongoDeleteMany",
  mongoDeleteOne = "mongoDeleteOne",
  mongoUpdateMany = "mongoUpdateMany",
  mongoUpdateOne = "mongoUpdateOne",
}

export { default as mongoSetup } from "./src/setup";
export { default as mongoFunctions } from "./src/functions";

export declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      mongoFindMany(
        collection: string,
        filter?: Filter<Document>,
        options?: FindOptions
      ): Promise<WithId<Document>[]>;
      mongoFindOne(
        collection: string,
        filter?: Filter<Document>,
        options?: FindOptions
      ): Promise<Document | null>;
      mongoInsertOne(
        collection: string,
        item: OptionalId<Document>,
        options?: InsertOneOptions
      ): Promise<InsertOneResult<Document>>;
      mongoInsertMany(
        collection: string,
        item: OptionalId<Document>[],
        options?: BulkWriteOptions
      ): Promise<InsertManyResult<Document>>;
      mongoDeleteMany(
        collection: string,
        filter?: Filter<Document>
      ): Promise<DeleteResult>;
      mongoDeleteOne(
        collection: string,
        filter?: Filter<Document>
      ): Promise<DeleteResult>;
      mongoUpdateMany(
        collection: string,
        filter: Filter<Document>,
        update: UpdateFilter<Document>
      ): Promise<UpdateResult>;
      mongoUpdateOne(
        collection: string,
        filter: Filter<Document>,
        update: UpdateFilter<Document>
      ): Promise<UpdateResult>;
    }
  }
}
