
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model RegisterInProgress
 * 
 */
export type RegisterInProgress = $Result.DefaultSelection<Prisma.$RegisterInProgressPayload>
/**
 * Model Brand
 * 
 */
export type Brand = $Result.DefaultSelection<Prisma.$BrandPayload>
/**
 * Model ItemLikeClient
 * 
 */
export type ItemLikeClient = $Result.DefaultSelection<Prisma.$ItemLikeClientPayload>
/**
 * Model ItemFavoriteClient
 * 
 */
export type ItemFavoriteClient = $Result.DefaultSelection<Prisma.$ItemFavoriteClientPayload>
/**
 * Model ItemLikeBrand
 * 
 */
export type ItemLikeBrand = $Result.DefaultSelection<Prisma.$ItemLikeBrandPayload>
/**
 * Model ItemFavoriteBrand
 * 
 */
export type ItemFavoriteBrand = $Result.DefaultSelection<Prisma.$ItemFavoriteBrandPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clients
 * const clients = await prisma.client.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.registerInProgress`: Exposes CRUD operations for the **RegisterInProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RegisterInProgresses
    * const registerInProgresses = await prisma.registerInProgress.findMany()
    * ```
    */
  get registerInProgress(): Prisma.RegisterInProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.BrandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemLikeClient`: Exposes CRUD operations for the **ItemLikeClient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemLikeClients
    * const itemLikeClients = await prisma.itemLikeClient.findMany()
    * ```
    */
  get itemLikeClient(): Prisma.ItemLikeClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemFavoriteClient`: Exposes CRUD operations for the **ItemFavoriteClient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemFavoriteClients
    * const itemFavoriteClients = await prisma.itemFavoriteClient.findMany()
    * ```
    */
  get itemFavoriteClient(): Prisma.ItemFavoriteClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemLikeBrand`: Exposes CRUD operations for the **ItemLikeBrand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemLikeBrands
    * const itemLikeBrands = await prisma.itemLikeBrand.findMany()
    * ```
    */
  get itemLikeBrand(): Prisma.ItemLikeBrandDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemFavoriteBrand`: Exposes CRUD operations for the **ItemFavoriteBrand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemFavoriteBrands
    * const itemFavoriteBrands = await prisma.itemFavoriteBrand.findMany()
    * ```
    */
  get itemFavoriteBrand(): Prisma.ItemFavoriteBrandDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Client: 'Client',
    RegisterInProgress: 'RegisterInProgress',
    Brand: 'Brand',
    ItemLikeClient: 'ItemLikeClient',
    ItemFavoriteClient: 'ItemFavoriteClient',
    ItemLikeBrand: 'ItemLikeBrand',
    ItemFavoriteBrand: 'ItemFavoriteBrand'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "client" | "registerInProgress" | "brand" | "itemLikeClient" | "itemFavoriteClient" | "itemLikeBrand" | "itemFavoriteBrand"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      RegisterInProgress: {
        payload: Prisma.$RegisterInProgressPayload<ExtArgs>
        fields: Prisma.RegisterInProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegisterInProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegisterInProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>
          }
          findFirst: {
            args: Prisma.RegisterInProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegisterInProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>
          }
          findMany: {
            args: Prisma.RegisterInProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>[]
          }
          create: {
            args: Prisma.RegisterInProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>
          }
          createMany: {
            args: Prisma.RegisterInProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegisterInProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>[]
          }
          delete: {
            args: Prisma.RegisterInProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>
          }
          update: {
            args: Prisma.RegisterInProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>
          }
          deleteMany: {
            args: Prisma.RegisterInProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegisterInProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RegisterInProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>
          }
          aggregate: {
            args: Prisma.RegisterInProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegisterInProgress>
          }
          groupBy: {
            args: Prisma.RegisterInProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegisterInProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegisterInProgressCountArgs<ExtArgs>
            result: $Utils.Optional<RegisterInProgressCountAggregateOutputType> | number
          }
        }
      }
      Brand: {
        payload: Prisma.$BrandPayload<ExtArgs>
        fields: Prisma.BrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findFirst: {
            args: Prisma.BrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          findMany: {
            args: Prisma.BrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          create: {
            args: Prisma.BrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          createMany: {
            args: Prisma.BrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BrandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
          }
          delete: {
            args: Prisma.BrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          update: {
            args: Prisma.BrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          deleteMany: {
            args: Prisma.BrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>
          }
          aggregate: {
            args: Prisma.BrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrand>
          }
          groupBy: {
            args: Prisma.BrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<BrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.BrandCountArgs<ExtArgs>
            result: $Utils.Optional<BrandCountAggregateOutputType> | number
          }
        }
      }
      ItemLikeClient: {
        payload: Prisma.$ItemLikeClientPayload<ExtArgs>
        fields: Prisma.ItemLikeClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemLikeClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemLikeClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>
          }
          findFirst: {
            args: Prisma.ItemLikeClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemLikeClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>
          }
          findMany: {
            args: Prisma.ItemLikeClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>[]
          }
          create: {
            args: Prisma.ItemLikeClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>
          }
          createMany: {
            args: Prisma.ItemLikeClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemLikeClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>[]
          }
          delete: {
            args: Prisma.ItemLikeClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>
          }
          update: {
            args: Prisma.ItemLikeClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>
          }
          deleteMany: {
            args: Prisma.ItemLikeClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemLikeClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemLikeClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeClientPayload>
          }
          aggregate: {
            args: Prisma.ItemLikeClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemLikeClient>
          }
          groupBy: {
            args: Prisma.ItemLikeClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemLikeClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemLikeClientCountArgs<ExtArgs>
            result: $Utils.Optional<ItemLikeClientCountAggregateOutputType> | number
          }
        }
      }
      ItemFavoriteClient: {
        payload: Prisma.$ItemFavoriteClientPayload<ExtArgs>
        fields: Prisma.ItemFavoriteClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFavoriteClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFavoriteClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>
          }
          findFirst: {
            args: Prisma.ItemFavoriteClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFavoriteClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>
          }
          findMany: {
            args: Prisma.ItemFavoriteClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>[]
          }
          create: {
            args: Prisma.ItemFavoriteClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>
          }
          createMany: {
            args: Prisma.ItemFavoriteClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemFavoriteClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>[]
          }
          delete: {
            args: Prisma.ItemFavoriteClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>
          }
          update: {
            args: Prisma.ItemFavoriteClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>
          }
          deleteMany: {
            args: Prisma.ItemFavoriteClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemFavoriteClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemFavoriteClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteClientPayload>
          }
          aggregate: {
            args: Prisma.ItemFavoriteClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemFavoriteClient>
          }
          groupBy: {
            args: Prisma.ItemFavoriteClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemFavoriteClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemFavoriteClientCountArgs<ExtArgs>
            result: $Utils.Optional<ItemFavoriteClientCountAggregateOutputType> | number
          }
        }
      }
      ItemLikeBrand: {
        payload: Prisma.$ItemLikeBrandPayload<ExtArgs>
        fields: Prisma.ItemLikeBrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemLikeBrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemLikeBrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>
          }
          findFirst: {
            args: Prisma.ItemLikeBrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemLikeBrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>
          }
          findMany: {
            args: Prisma.ItemLikeBrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>[]
          }
          create: {
            args: Prisma.ItemLikeBrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>
          }
          createMany: {
            args: Prisma.ItemLikeBrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemLikeBrandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>[]
          }
          delete: {
            args: Prisma.ItemLikeBrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>
          }
          update: {
            args: Prisma.ItemLikeBrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>
          }
          deleteMany: {
            args: Prisma.ItemLikeBrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemLikeBrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemLikeBrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikeBrandPayload>
          }
          aggregate: {
            args: Prisma.ItemLikeBrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemLikeBrand>
          }
          groupBy: {
            args: Prisma.ItemLikeBrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemLikeBrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemLikeBrandCountArgs<ExtArgs>
            result: $Utils.Optional<ItemLikeBrandCountAggregateOutputType> | number
          }
        }
      }
      ItemFavoriteBrand: {
        payload: Prisma.$ItemFavoriteBrandPayload<ExtArgs>
        fields: Prisma.ItemFavoriteBrandFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFavoriteBrandFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFavoriteBrandFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>
          }
          findFirst: {
            args: Prisma.ItemFavoriteBrandFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFavoriteBrandFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>
          }
          findMany: {
            args: Prisma.ItemFavoriteBrandFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>[]
          }
          create: {
            args: Prisma.ItemFavoriteBrandCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>
          }
          createMany: {
            args: Prisma.ItemFavoriteBrandCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemFavoriteBrandCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>[]
          }
          delete: {
            args: Prisma.ItemFavoriteBrandDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>
          }
          update: {
            args: Prisma.ItemFavoriteBrandUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>
          }
          deleteMany: {
            args: Prisma.ItemFavoriteBrandDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemFavoriteBrandUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ItemFavoriteBrandUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoriteBrandPayload>
          }
          aggregate: {
            args: Prisma.ItemFavoriteBrandAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemFavoriteBrand>
          }
          groupBy: {
            args: Prisma.ItemFavoriteBrandGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemFavoriteBrandGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemFavoriteBrandCountArgs<ExtArgs>
            result: $Utils.Optional<ItemFavoriteBrandCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    client?: ClientOmit
    registerInProgress?: RegisterInProgressOmit
    brand?: BrandOmit
    itemLikeClient?: ItemLikeClientOmit
    itemFavoriteClient?: ItemFavoriteClientOmit
    itemLikeBrand?: ItemLikeBrandOmit
    itemFavoriteBrand?: ItemFavoriteBrandOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    itemFavorites: number
    itemLikes: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemFavorites?: boolean | ClientCountOutputTypeCountItemFavoritesArgs
    itemLikes?: boolean | ClientCountOutputTypeCountItemLikesArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountItemFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFavoriteClientWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountItemLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemLikeClientWhereInput
  }


  /**
   * Count Type BrandCountOutputType
   */

  export type BrandCountOutputType = {
    itemFavorites: number
    itemLikes: number
  }

  export type BrandCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemFavorites?: boolean | BrandCountOutputTypeCountItemFavoritesArgs
    itemLikes?: boolean | BrandCountOutputTypeCountItemLikesArgs
  }

  // Custom InputTypes
  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BrandCountOutputType
     */
    select?: BrandCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountItemFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFavoriteBrandWhereInput
  }

  /**
   * BrandCountOutputType without action
   */
  export type BrandCountOutputTypeCountItemLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemLikeBrandWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    email: string | null
    name: string | null
    dateOfBirth: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    email: string | null
    name: string | null
    dateOfBirth: Date | null
  }

  export type ClientCountAggregateOutputType = {
    email: number
    name: number
    dateOfBirth: number
    preferences: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    email?: true
    name?: true
    dateOfBirth?: true
  }

  export type ClientMaxAggregateInputType = {
    email?: true
    name?: true
    dateOfBirth?: true
  }

  export type ClientCountAggregateInputType = {
    email?: true
    name?: true
    dateOfBirth?: true
    preferences?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    email: string
    name: string
    dateOfBirth: Date | null
    preferences: JsonValue | null
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    name?: boolean
    dateOfBirth?: boolean
    preferences?: boolean
    itemFavorites?: boolean | Client$itemFavoritesArgs<ExtArgs>
    itemLikes?: boolean | Client$itemLikesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    name?: boolean
    dateOfBirth?: boolean
    preferences?: boolean
  }, ExtArgs["result"]["client"]>


  export type ClientSelectScalar = {
    email?: boolean
    name?: boolean
    dateOfBirth?: boolean
    preferences?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"email" | "name" | "dateOfBirth" | "preferences", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemFavorites?: boolean | Client$itemFavoritesArgs<ExtArgs>
    itemLikes?: boolean | Client$itemLikesArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      itemFavorites: Prisma.$ItemFavoriteClientPayload<ExtArgs>[]
      itemLikes: Prisma.$ItemLikeClientPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      email: string
      name: string
      dateOfBirth: Date | null
      preferences: Prisma.JsonValue | null
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `email`
     * const clientWithEmailOnly = await prisma.client.findMany({ select: { email: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `email`
     * const clientWithEmailOnly = await prisma.client.createManyAndReturn({
     *   select: { email: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itemFavorites<T extends Client$itemFavoritesArgs<ExtArgs> = {}>(args?: Subset<T, Client$itemFavoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    itemLikes<T extends Client$itemLikesArgs<ExtArgs> = {}>(args?: Subset<T, Client$itemLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly email: FieldRef<"Client", 'String'>
    readonly name: FieldRef<"Client", 'String'>
    readonly dateOfBirth: FieldRef<"Client", 'DateTime'>
    readonly preferences: FieldRef<"Client", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
  }

  /**
   * Client.itemFavorites
   */
  export type Client$itemFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    where?: ItemFavoriteClientWhereInput
    orderBy?: ItemFavoriteClientOrderByWithRelationInput | ItemFavoriteClientOrderByWithRelationInput[]
    cursor?: ItemFavoriteClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFavoriteClientScalarFieldEnum | ItemFavoriteClientScalarFieldEnum[]
  }

  /**
   * Client.itemLikes
   */
  export type Client$itemLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    where?: ItemLikeClientWhereInput
    orderBy?: ItemLikeClientOrderByWithRelationInput | ItemLikeClientOrderByWithRelationInput[]
    cursor?: ItemLikeClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemLikeClientScalarFieldEnum | ItemLikeClientScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model RegisterInProgress
   */

  export type AggregateRegisterInProgress = {
    _count: RegisterInProgressCountAggregateOutputType | null
    _min: RegisterInProgressMinAggregateOutputType | null
    _max: RegisterInProgressMaxAggregateOutputType | null
  }

  export type RegisterInProgressMinAggregateOutputType = {
    email: string | null
    verificationCode: string | null
    verificationCodeExpiration: string | null
  }

  export type RegisterInProgressMaxAggregateOutputType = {
    email: string | null
    verificationCode: string | null
    verificationCodeExpiration: string | null
  }

  export type RegisterInProgressCountAggregateOutputType = {
    email: number
    verificationCode: number
    verificationCodeExpiration: number
    _all: number
  }


  export type RegisterInProgressMinAggregateInputType = {
    email?: true
    verificationCode?: true
    verificationCodeExpiration?: true
  }

  export type RegisterInProgressMaxAggregateInputType = {
    email?: true
    verificationCode?: true
    verificationCodeExpiration?: true
  }

  export type RegisterInProgressCountAggregateInputType = {
    email?: true
    verificationCode?: true
    verificationCodeExpiration?: true
    _all?: true
  }

  export type RegisterInProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegisterInProgress to aggregate.
     */
    where?: RegisterInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegisterInProgresses to fetch.
     */
    orderBy?: RegisterInProgressOrderByWithRelationInput | RegisterInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegisterInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegisterInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegisterInProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RegisterInProgresses
    **/
    _count?: true | RegisterInProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegisterInProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegisterInProgressMaxAggregateInputType
  }

  export type GetRegisterInProgressAggregateType<T extends RegisterInProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateRegisterInProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegisterInProgress[P]>
      : GetScalarType<T[P], AggregateRegisterInProgress[P]>
  }




  export type RegisterInProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegisterInProgressWhereInput
    orderBy?: RegisterInProgressOrderByWithAggregationInput | RegisterInProgressOrderByWithAggregationInput[]
    by: RegisterInProgressScalarFieldEnum[] | RegisterInProgressScalarFieldEnum
    having?: RegisterInProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegisterInProgressCountAggregateInputType | true
    _min?: RegisterInProgressMinAggregateInputType
    _max?: RegisterInProgressMaxAggregateInputType
  }

  export type RegisterInProgressGroupByOutputType = {
    email: string
    verificationCode: string
    verificationCodeExpiration: string
    _count: RegisterInProgressCountAggregateOutputType | null
    _min: RegisterInProgressMinAggregateOutputType | null
    _max: RegisterInProgressMaxAggregateOutputType | null
  }

  type GetRegisterInProgressGroupByPayload<T extends RegisterInProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegisterInProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegisterInProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegisterInProgressGroupByOutputType[P]>
            : GetScalarType<T[P], RegisterInProgressGroupByOutputType[P]>
        }
      >
    >


  export type RegisterInProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
  }, ExtArgs["result"]["registerInProgress"]>

  export type RegisterInProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
  }, ExtArgs["result"]["registerInProgress"]>


  export type RegisterInProgressSelectScalar = {
    email?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
  }

  export type RegisterInProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"email" | "verificationCode" | "verificationCodeExpiration", ExtArgs["result"]["registerInProgress"]>

  export type $RegisterInProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegisterInProgress"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      email: string
      verificationCode: string
      verificationCodeExpiration: string
    }, ExtArgs["result"]["registerInProgress"]>
    composites: {}
  }

  type RegisterInProgressGetPayload<S extends boolean | null | undefined | RegisterInProgressDefaultArgs> = $Result.GetResult<Prisma.$RegisterInProgressPayload, S>

  type RegisterInProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegisterInProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegisterInProgressCountAggregateInputType | true
    }

  export interface RegisterInProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RegisterInProgress'], meta: { name: 'RegisterInProgress' } }
    /**
     * Find zero or one RegisterInProgress that matches the filter.
     * @param {RegisterInProgressFindUniqueArgs} args - Arguments to find a RegisterInProgress
     * @example
     * // Get one RegisterInProgress
     * const registerInProgress = await prisma.registerInProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegisterInProgressFindUniqueArgs>(args: SelectSubset<T, RegisterInProgressFindUniqueArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RegisterInProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegisterInProgressFindUniqueOrThrowArgs} args - Arguments to find a RegisterInProgress
     * @example
     * // Get one RegisterInProgress
     * const registerInProgress = await prisma.registerInProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegisterInProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, RegisterInProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegisterInProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegisterInProgressFindFirstArgs} args - Arguments to find a RegisterInProgress
     * @example
     * // Get one RegisterInProgress
     * const registerInProgress = await prisma.registerInProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegisterInProgressFindFirstArgs>(args?: SelectSubset<T, RegisterInProgressFindFirstArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RegisterInProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegisterInProgressFindFirstOrThrowArgs} args - Arguments to find a RegisterInProgress
     * @example
     * // Get one RegisterInProgress
     * const registerInProgress = await prisma.registerInProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegisterInProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, RegisterInProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RegisterInProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegisterInProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RegisterInProgresses
     * const registerInProgresses = await prisma.registerInProgress.findMany()
     * 
     * // Get first 10 RegisterInProgresses
     * const registerInProgresses = await prisma.registerInProgress.findMany({ take: 10 })
     * 
     * // Only select the `email`
     * const registerInProgressWithEmailOnly = await prisma.registerInProgress.findMany({ select: { email: true } })
     * 
     */
    findMany<T extends RegisterInProgressFindManyArgs>(args?: SelectSubset<T, RegisterInProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RegisterInProgress.
     * @param {RegisterInProgressCreateArgs} args - Arguments to create a RegisterInProgress.
     * @example
     * // Create one RegisterInProgress
     * const RegisterInProgress = await prisma.registerInProgress.create({
     *   data: {
     *     // ... data to create a RegisterInProgress
     *   }
     * })
     * 
     */
    create<T extends RegisterInProgressCreateArgs>(args: SelectSubset<T, RegisterInProgressCreateArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RegisterInProgresses.
     * @param {RegisterInProgressCreateManyArgs} args - Arguments to create many RegisterInProgresses.
     * @example
     * // Create many RegisterInProgresses
     * const registerInProgress = await prisma.registerInProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegisterInProgressCreateManyArgs>(args?: SelectSubset<T, RegisterInProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RegisterInProgresses and returns the data saved in the database.
     * @param {RegisterInProgressCreateManyAndReturnArgs} args - Arguments to create many RegisterInProgresses.
     * @example
     * // Create many RegisterInProgresses
     * const registerInProgress = await prisma.registerInProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RegisterInProgresses and only return the `email`
     * const registerInProgressWithEmailOnly = await prisma.registerInProgress.createManyAndReturn({
     *   select: { email: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegisterInProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, RegisterInProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RegisterInProgress.
     * @param {RegisterInProgressDeleteArgs} args - Arguments to delete one RegisterInProgress.
     * @example
     * // Delete one RegisterInProgress
     * const RegisterInProgress = await prisma.registerInProgress.delete({
     *   where: {
     *     // ... filter to delete one RegisterInProgress
     *   }
     * })
     * 
     */
    delete<T extends RegisterInProgressDeleteArgs>(args: SelectSubset<T, RegisterInProgressDeleteArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RegisterInProgress.
     * @param {RegisterInProgressUpdateArgs} args - Arguments to update one RegisterInProgress.
     * @example
     * // Update one RegisterInProgress
     * const registerInProgress = await prisma.registerInProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegisterInProgressUpdateArgs>(args: SelectSubset<T, RegisterInProgressUpdateArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RegisterInProgresses.
     * @param {RegisterInProgressDeleteManyArgs} args - Arguments to filter RegisterInProgresses to delete.
     * @example
     * // Delete a few RegisterInProgresses
     * const { count } = await prisma.registerInProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegisterInProgressDeleteManyArgs>(args?: SelectSubset<T, RegisterInProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RegisterInProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegisterInProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RegisterInProgresses
     * const registerInProgress = await prisma.registerInProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegisterInProgressUpdateManyArgs>(args: SelectSubset<T, RegisterInProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RegisterInProgress.
     * @param {RegisterInProgressUpsertArgs} args - Arguments to update or create a RegisterInProgress.
     * @example
     * // Update or create a RegisterInProgress
     * const registerInProgress = await prisma.registerInProgress.upsert({
     *   create: {
     *     // ... data to create a RegisterInProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RegisterInProgress we want to update
     *   }
     * })
     */
    upsert<T extends RegisterInProgressUpsertArgs>(args: SelectSubset<T, RegisterInProgressUpsertArgs<ExtArgs>>): Prisma__RegisterInProgressClient<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RegisterInProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegisterInProgressCountArgs} args - Arguments to filter RegisterInProgresses to count.
     * @example
     * // Count the number of RegisterInProgresses
     * const count = await prisma.registerInProgress.count({
     *   where: {
     *     // ... the filter for the RegisterInProgresses we want to count
     *   }
     * })
    **/
    count<T extends RegisterInProgressCountArgs>(
      args?: Subset<T, RegisterInProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegisterInProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RegisterInProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegisterInProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegisterInProgressAggregateArgs>(args: Subset<T, RegisterInProgressAggregateArgs>): Prisma.PrismaPromise<GetRegisterInProgressAggregateType<T>>

    /**
     * Group by RegisterInProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegisterInProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegisterInProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegisterInProgressGroupByArgs['orderBy'] }
        : { orderBy?: RegisterInProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegisterInProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegisterInProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RegisterInProgress model
   */
  readonly fields: RegisterInProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RegisterInProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegisterInProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RegisterInProgress model
   */
  interface RegisterInProgressFieldRefs {
    readonly email: FieldRef<"RegisterInProgress", 'String'>
    readonly verificationCode: FieldRef<"RegisterInProgress", 'String'>
    readonly verificationCodeExpiration: FieldRef<"RegisterInProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RegisterInProgress findUnique
   */
  export type RegisterInProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * Filter, which RegisterInProgress to fetch.
     */
    where: RegisterInProgressWhereUniqueInput
  }

  /**
   * RegisterInProgress findUniqueOrThrow
   */
  export type RegisterInProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * Filter, which RegisterInProgress to fetch.
     */
    where: RegisterInProgressWhereUniqueInput
  }

  /**
   * RegisterInProgress findFirst
   */
  export type RegisterInProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * Filter, which RegisterInProgress to fetch.
     */
    where?: RegisterInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegisterInProgresses to fetch.
     */
    orderBy?: RegisterInProgressOrderByWithRelationInput | RegisterInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegisterInProgresses.
     */
    cursor?: RegisterInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegisterInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegisterInProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegisterInProgresses.
     */
    distinct?: RegisterInProgressScalarFieldEnum | RegisterInProgressScalarFieldEnum[]
  }

  /**
   * RegisterInProgress findFirstOrThrow
   */
  export type RegisterInProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * Filter, which RegisterInProgress to fetch.
     */
    where?: RegisterInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegisterInProgresses to fetch.
     */
    orderBy?: RegisterInProgressOrderByWithRelationInput | RegisterInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RegisterInProgresses.
     */
    cursor?: RegisterInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegisterInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegisterInProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RegisterInProgresses.
     */
    distinct?: RegisterInProgressScalarFieldEnum | RegisterInProgressScalarFieldEnum[]
  }

  /**
   * RegisterInProgress findMany
   */
  export type RegisterInProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * Filter, which RegisterInProgresses to fetch.
     */
    where?: RegisterInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RegisterInProgresses to fetch.
     */
    orderBy?: RegisterInProgressOrderByWithRelationInput | RegisterInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RegisterInProgresses.
     */
    cursor?: RegisterInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RegisterInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RegisterInProgresses.
     */
    skip?: number
    distinct?: RegisterInProgressScalarFieldEnum | RegisterInProgressScalarFieldEnum[]
  }

  /**
   * RegisterInProgress create
   */
  export type RegisterInProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * The data needed to create a RegisterInProgress.
     */
    data: XOR<RegisterInProgressCreateInput, RegisterInProgressUncheckedCreateInput>
  }

  /**
   * RegisterInProgress createMany
   */
  export type RegisterInProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RegisterInProgresses.
     */
    data: RegisterInProgressCreateManyInput | RegisterInProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegisterInProgress createManyAndReturn
   */
  export type RegisterInProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * The data used to create many RegisterInProgresses.
     */
    data: RegisterInProgressCreateManyInput | RegisterInProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RegisterInProgress update
   */
  export type RegisterInProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * The data needed to update a RegisterInProgress.
     */
    data: XOR<RegisterInProgressUpdateInput, RegisterInProgressUncheckedUpdateInput>
    /**
     * Choose, which RegisterInProgress to update.
     */
    where: RegisterInProgressWhereUniqueInput
  }

  /**
   * RegisterInProgress updateMany
   */
  export type RegisterInProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RegisterInProgresses.
     */
    data: XOR<RegisterInProgressUpdateManyMutationInput, RegisterInProgressUncheckedUpdateManyInput>
    /**
     * Filter which RegisterInProgresses to update
     */
    where?: RegisterInProgressWhereInput
  }

  /**
   * RegisterInProgress upsert
   */
  export type RegisterInProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * The filter to search for the RegisterInProgress to update in case it exists.
     */
    where: RegisterInProgressWhereUniqueInput
    /**
     * In case the RegisterInProgress found by the `where` argument doesn't exist, create a new RegisterInProgress with this data.
     */
    create: XOR<RegisterInProgressCreateInput, RegisterInProgressUncheckedCreateInput>
    /**
     * In case the RegisterInProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegisterInProgressUpdateInput, RegisterInProgressUncheckedUpdateInput>
  }

  /**
   * RegisterInProgress delete
   */
  export type RegisterInProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * Filter which RegisterInProgress to delete.
     */
    where: RegisterInProgressWhereUniqueInput
  }

  /**
   * RegisterInProgress deleteMany
   */
  export type RegisterInProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RegisterInProgresses to delete
     */
    where?: RegisterInProgressWhereInput
  }

  /**
   * RegisterInProgress without action
   */
  export type RegisterInProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
  }


  /**
   * Model Brand
   */

  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    description: string | null
    url: string | null
    logoUrl: string | null
  }

  export type BrandMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    description: string | null
    url: string | null
    logoUrl: string | null
  }

  export type BrandCountAggregateOutputType = {
    id: number
    email: number
    name: number
    description: number
    url: number
    logoUrl: number
    _all: number
  }


  export type BrandMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    description?: true
    url?: true
    logoUrl?: true
  }

  export type BrandMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    description?: true
    url?: true
    logoUrl?: true
  }

  export type BrandCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    description?: true
    url?: true
    logoUrl?: true
    _all?: true
  }

  export type BrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brand to aggregate.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Brands
    **/
    _count?: true | BrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BrandMaxAggregateInputType
  }

  export type GetBrandAggregateType<T extends BrandAggregateArgs> = {
        [P in keyof T & keyof AggregateBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrand[P]>
      : GetScalarType<T[P], AggregateBrand[P]>
  }




  export type BrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandWhereInput
    orderBy?: BrandOrderByWithAggregationInput | BrandOrderByWithAggregationInput[]
    by: BrandScalarFieldEnum[] | BrandScalarFieldEnum
    having?: BrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BrandCountAggregateInputType | true
    _min?: BrandMinAggregateInputType
    _max?: BrandMaxAggregateInputType
  }

  export type BrandGroupByOutputType = {
    id: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
    _count: BrandCountAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  type GetBrandGroupByPayload<T extends BrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BrandGroupByOutputType[P]>
            : GetScalarType<T[P], BrandGroupByOutputType[P]>
        }
      >
    >


  export type BrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    logoUrl?: boolean
    itemFavorites?: boolean | Brand$itemFavoritesArgs<ExtArgs>
    itemLikes?: boolean | Brand$itemLikesArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>

  export type BrandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    logoUrl?: boolean
  }, ExtArgs["result"]["brand"]>


  export type BrandSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    logoUrl?: boolean
  }

  export type BrandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "description" | "url" | "logoUrl", ExtArgs["result"]["brand"]>
  export type BrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemFavorites?: boolean | Brand$itemFavoritesArgs<ExtArgs>
    itemLikes?: boolean | Brand$itemLikesArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BrandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Brand"
    objects: {
      itemFavorites: Prisma.$ItemFavoriteBrandPayload<ExtArgs>[]
      itemLikes: Prisma.$ItemLikeBrandPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      description: string
      url: string
      logoUrl: string
    }, ExtArgs["result"]["brand"]>
    composites: {}
  }

  type BrandGetPayload<S extends boolean | null | undefined | BrandDefaultArgs> = $Result.GetResult<Prisma.$BrandPayload, S>

  type BrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BrandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BrandCountAggregateInputType | true
    }

  export interface BrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Brand'], meta: { name: 'Brand' } }
    /**
     * Find zero or one Brand that matches the filter.
     * @param {BrandFindUniqueArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BrandFindUniqueArgs>(args: SelectSubset<T, BrandFindUniqueArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Brand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BrandFindUniqueOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BrandFindUniqueOrThrowArgs>(args: SelectSubset<T, BrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BrandFindFirstArgs>(args?: SelectSubset<T, BrandFindFirstArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindFirstOrThrowArgs} args - Arguments to find a Brand
     * @example
     * // Get one Brand
     * const brand = await prisma.brand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BrandFindFirstOrThrowArgs>(args?: SelectSubset<T, BrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Brands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Brands
     * const brands = await prisma.brand.findMany()
     * 
     * // Get first 10 Brands
     * const brands = await prisma.brand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const brandWithIdOnly = await prisma.brand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BrandFindManyArgs>(args?: SelectSubset<T, BrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Brand.
     * @param {BrandCreateArgs} args - Arguments to create a Brand.
     * @example
     * // Create one Brand
     * const Brand = await prisma.brand.create({
     *   data: {
     *     // ... data to create a Brand
     *   }
     * })
     * 
     */
    create<T extends BrandCreateArgs>(args: SelectSubset<T, BrandCreateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Brands.
     * @param {BrandCreateManyArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BrandCreateManyArgs>(args?: SelectSubset<T, BrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Brands and returns the data saved in the database.
     * @param {BrandCreateManyAndReturnArgs} args - Arguments to create many Brands.
     * @example
     * // Create many Brands
     * const brand = await prisma.brand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Brands and only return the `id`
     * const brandWithIdOnly = await prisma.brand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BrandCreateManyAndReturnArgs>(args?: SelectSubset<T, BrandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Brand.
     * @param {BrandDeleteArgs} args - Arguments to delete one Brand.
     * @example
     * // Delete one Brand
     * const Brand = await prisma.brand.delete({
     *   where: {
     *     // ... filter to delete one Brand
     *   }
     * })
     * 
     */
    delete<T extends BrandDeleteArgs>(args: SelectSubset<T, BrandDeleteArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Brand.
     * @param {BrandUpdateArgs} args - Arguments to update one Brand.
     * @example
     * // Update one Brand
     * const brand = await prisma.brand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BrandUpdateArgs>(args: SelectSubset<T, BrandUpdateArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Brands.
     * @param {BrandDeleteManyArgs} args - Arguments to filter Brands to delete.
     * @example
     * // Delete a few Brands
     * const { count } = await prisma.brand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BrandDeleteManyArgs>(args?: SelectSubset<T, BrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BrandUpdateManyArgs>(args: SelectSubset<T, BrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Brand.
     * @param {BrandUpsertArgs} args - Arguments to update or create a Brand.
     * @example
     * // Update or create a Brand
     * const brand = await prisma.brand.upsert({
     *   create: {
     *     // ... data to create a Brand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brand we want to update
     *   }
     * })
     */
    upsert<T extends BrandUpsertArgs>(args: SelectSubset<T, BrandUpsertArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Brands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandCountArgs} args - Arguments to filter Brands to count.
     * @example
     * // Count the number of Brands
     * const count = await prisma.brand.count({
     *   where: {
     *     // ... the filter for the Brands we want to count
     *   }
     * })
    **/
    count<T extends BrandCountArgs>(
      args?: Subset<T, BrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BrandAggregateArgs>(args: Subset<T, BrandAggregateArgs>): Prisma.PrismaPromise<GetBrandAggregateType<T>>

    /**
     * Group by Brand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BrandGroupByArgs['orderBy'] }
        : { orderBy?: BrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Brand model
   */
  readonly fields: BrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Brand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    itemFavorites<T extends Brand$itemFavoritesArgs<ExtArgs> = {}>(args?: Subset<T, Brand$itemFavoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    itemLikes<T extends Brand$itemLikesArgs<ExtArgs> = {}>(args?: Subset<T, Brand$itemLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Brand model
   */
  interface BrandFieldRefs {
    readonly id: FieldRef<"Brand", 'String'>
    readonly email: FieldRef<"Brand", 'String'>
    readonly name: FieldRef<"Brand", 'String'>
    readonly description: FieldRef<"Brand", 'String'>
    readonly url: FieldRef<"Brand", 'String'>
    readonly logoUrl: FieldRef<"Brand", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Brand findUnique
   */
  export type BrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findUniqueOrThrow
   */
  export type BrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand findFirst
   */
  export type BrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findFirstOrThrow
   */
  export type BrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brand to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Brands.
     */
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand findMany
   */
  export type BrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter, which Brands to fetch.
     */
    where?: BrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Brands to fetch.
     */
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Brands.
     */
    cursor?: BrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Brands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Brands.
     */
    skip?: number
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Brand create
   */
  export type BrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to create a Brand.
     */
    data: XOR<BrandCreateInput, BrandUncheckedCreateInput>
  }

  /**
   * Brand createMany
   */
  export type BrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Brands.
     */
    data: BrandCreateManyInput | BrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brand createManyAndReturn
   */
  export type BrandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * The data used to create many Brands.
     */
    data: BrandCreateManyInput | BrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brand update
   */
  export type BrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The data needed to update a Brand.
     */
    data: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
    /**
     * Choose, which Brand to update.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand updateMany
   */
  export type BrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Brands.
     */
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     */
    where?: BrandWhereInput
  }

  /**
   * Brand upsert
   */
  export type BrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * The filter to search for the Brand to update in case it exists.
     */
    where: BrandWhereUniqueInput
    /**
     * In case the Brand found by the `where` argument doesn't exist, create a new Brand with this data.
     */
    create: XOR<BrandCreateInput, BrandUncheckedCreateInput>
    /**
     * In case the Brand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BrandUpdateInput, BrandUncheckedUpdateInput>
  }

  /**
   * Brand delete
   */
  export type BrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
    /**
     * Filter which Brand to delete.
     */
    where: BrandWhereUniqueInput
  }

  /**
   * Brand deleteMany
   */
  export type BrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brands to delete
     */
    where?: BrandWhereInput
  }

  /**
   * Brand.itemFavorites
   */
  export type Brand$itemFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    where?: ItemFavoriteBrandWhereInput
    orderBy?: ItemFavoriteBrandOrderByWithRelationInput | ItemFavoriteBrandOrderByWithRelationInput[]
    cursor?: ItemFavoriteBrandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFavoriteBrandScalarFieldEnum | ItemFavoriteBrandScalarFieldEnum[]
  }

  /**
   * Brand.itemLikes
   */
  export type Brand$itemLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    where?: ItemLikeBrandWhereInput
    orderBy?: ItemLikeBrandOrderByWithRelationInput | ItemLikeBrandOrderByWithRelationInput[]
    cursor?: ItemLikeBrandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemLikeBrandScalarFieldEnum | ItemLikeBrandScalarFieldEnum[]
  }

  /**
   * Brand without action
   */
  export type BrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandInclude<ExtArgs> | null
  }


  /**
   * Model ItemLikeClient
   */

  export type AggregateItemLikeClient = {
    _count: ItemLikeClientCountAggregateOutputType | null
    _min: ItemLikeClientMinAggregateOutputType | null
    _max: ItemLikeClientMaxAggregateOutputType | null
  }

  export type ItemLikeClientMinAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemLikeClientMaxAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemLikeClientCountAggregateOutputType = {
    id: number
    userEmail: number
    itemUuid: number
    createdAt: number
    _all: number
  }


  export type ItemLikeClientMinAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemLikeClientMaxAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemLikeClientCountAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
    _all?: true
  }

  export type ItemLikeClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemLikeClient to aggregate.
     */
    where?: ItemLikeClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeClients to fetch.
     */
    orderBy?: ItemLikeClientOrderByWithRelationInput | ItemLikeClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemLikeClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemLikeClients
    **/
    _count?: true | ItemLikeClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemLikeClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemLikeClientMaxAggregateInputType
  }

  export type GetItemLikeClientAggregateType<T extends ItemLikeClientAggregateArgs> = {
        [P in keyof T & keyof AggregateItemLikeClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemLikeClient[P]>
      : GetScalarType<T[P], AggregateItemLikeClient[P]>
  }




  export type ItemLikeClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemLikeClientWhereInput
    orderBy?: ItemLikeClientOrderByWithAggregationInput | ItemLikeClientOrderByWithAggregationInput[]
    by: ItemLikeClientScalarFieldEnum[] | ItemLikeClientScalarFieldEnum
    having?: ItemLikeClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemLikeClientCountAggregateInputType | true
    _min?: ItemLikeClientMinAggregateInputType
    _max?: ItemLikeClientMaxAggregateInputType
  }

  export type ItemLikeClientGroupByOutputType = {
    id: string
    userEmail: string
    itemUuid: string
    createdAt: Date | null
    _count: ItemLikeClientCountAggregateOutputType | null
    _min: ItemLikeClientMinAggregateOutputType | null
    _max: ItemLikeClientMaxAggregateOutputType | null
  }

  type GetItemLikeClientGroupByPayload<T extends ItemLikeClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemLikeClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemLikeClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemLikeClientGroupByOutputType[P]>
            : GetScalarType<T[P], ItemLikeClientGroupByOutputType[P]>
        }
      >
    >


  export type ItemLikeClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemLikeClient"]>

  export type ItemLikeClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemLikeClient"]>


  export type ItemLikeClientSelectScalar = {
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
  }

  export type ItemLikeClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "itemUuid" | "createdAt", ExtArgs["result"]["itemLikeClient"]>
  export type ItemLikeClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ItemLikeClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $ItemLikeClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemLikeClient"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userEmail: string
      itemUuid: string
      createdAt: Date | null
    }, ExtArgs["result"]["itemLikeClient"]>
    composites: {}
  }

  type ItemLikeClientGetPayload<S extends boolean | null | undefined | ItemLikeClientDefaultArgs> = $Result.GetResult<Prisma.$ItemLikeClientPayload, S>

  type ItemLikeClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemLikeClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemLikeClientCountAggregateInputType | true
    }

  export interface ItemLikeClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemLikeClient'], meta: { name: 'ItemLikeClient' } }
    /**
     * Find zero or one ItemLikeClient that matches the filter.
     * @param {ItemLikeClientFindUniqueArgs} args - Arguments to find a ItemLikeClient
     * @example
     * // Get one ItemLikeClient
     * const itemLikeClient = await prisma.itemLikeClient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemLikeClientFindUniqueArgs>(args: SelectSubset<T, ItemLikeClientFindUniqueArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemLikeClient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemLikeClientFindUniqueOrThrowArgs} args - Arguments to find a ItemLikeClient
     * @example
     * // Get one ItemLikeClient
     * const itemLikeClient = await prisma.itemLikeClient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemLikeClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemLikeClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemLikeClient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeClientFindFirstArgs} args - Arguments to find a ItemLikeClient
     * @example
     * // Get one ItemLikeClient
     * const itemLikeClient = await prisma.itemLikeClient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemLikeClientFindFirstArgs>(args?: SelectSubset<T, ItemLikeClientFindFirstArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemLikeClient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeClientFindFirstOrThrowArgs} args - Arguments to find a ItemLikeClient
     * @example
     * // Get one ItemLikeClient
     * const itemLikeClient = await prisma.itemLikeClient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemLikeClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemLikeClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemLikeClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemLikeClients
     * const itemLikeClients = await prisma.itemLikeClient.findMany()
     * 
     * // Get first 10 ItemLikeClients
     * const itemLikeClients = await prisma.itemLikeClient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemLikeClientWithIdOnly = await prisma.itemLikeClient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemLikeClientFindManyArgs>(args?: SelectSubset<T, ItemLikeClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemLikeClient.
     * @param {ItemLikeClientCreateArgs} args - Arguments to create a ItemLikeClient.
     * @example
     * // Create one ItemLikeClient
     * const ItemLikeClient = await prisma.itemLikeClient.create({
     *   data: {
     *     // ... data to create a ItemLikeClient
     *   }
     * })
     * 
     */
    create<T extends ItemLikeClientCreateArgs>(args: SelectSubset<T, ItemLikeClientCreateArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemLikeClients.
     * @param {ItemLikeClientCreateManyArgs} args - Arguments to create many ItemLikeClients.
     * @example
     * // Create many ItemLikeClients
     * const itemLikeClient = await prisma.itemLikeClient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemLikeClientCreateManyArgs>(args?: SelectSubset<T, ItemLikeClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemLikeClients and returns the data saved in the database.
     * @param {ItemLikeClientCreateManyAndReturnArgs} args - Arguments to create many ItemLikeClients.
     * @example
     * // Create many ItemLikeClients
     * const itemLikeClient = await prisma.itemLikeClient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemLikeClients and only return the `id`
     * const itemLikeClientWithIdOnly = await prisma.itemLikeClient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemLikeClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemLikeClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemLikeClient.
     * @param {ItemLikeClientDeleteArgs} args - Arguments to delete one ItemLikeClient.
     * @example
     * // Delete one ItemLikeClient
     * const ItemLikeClient = await prisma.itemLikeClient.delete({
     *   where: {
     *     // ... filter to delete one ItemLikeClient
     *   }
     * })
     * 
     */
    delete<T extends ItemLikeClientDeleteArgs>(args: SelectSubset<T, ItemLikeClientDeleteArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemLikeClient.
     * @param {ItemLikeClientUpdateArgs} args - Arguments to update one ItemLikeClient.
     * @example
     * // Update one ItemLikeClient
     * const itemLikeClient = await prisma.itemLikeClient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemLikeClientUpdateArgs>(args: SelectSubset<T, ItemLikeClientUpdateArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemLikeClients.
     * @param {ItemLikeClientDeleteManyArgs} args - Arguments to filter ItemLikeClients to delete.
     * @example
     * // Delete a few ItemLikeClients
     * const { count } = await prisma.itemLikeClient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemLikeClientDeleteManyArgs>(args?: SelectSubset<T, ItemLikeClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemLikeClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemLikeClients
     * const itemLikeClient = await prisma.itemLikeClient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemLikeClientUpdateManyArgs>(args: SelectSubset<T, ItemLikeClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemLikeClient.
     * @param {ItemLikeClientUpsertArgs} args - Arguments to update or create a ItemLikeClient.
     * @example
     * // Update or create a ItemLikeClient
     * const itemLikeClient = await prisma.itemLikeClient.upsert({
     *   create: {
     *     // ... data to create a ItemLikeClient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemLikeClient we want to update
     *   }
     * })
     */
    upsert<T extends ItemLikeClientUpsertArgs>(args: SelectSubset<T, ItemLikeClientUpsertArgs<ExtArgs>>): Prisma__ItemLikeClientClient<$Result.GetResult<Prisma.$ItemLikeClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemLikeClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeClientCountArgs} args - Arguments to filter ItemLikeClients to count.
     * @example
     * // Count the number of ItemLikeClients
     * const count = await prisma.itemLikeClient.count({
     *   where: {
     *     // ... the filter for the ItemLikeClients we want to count
     *   }
     * })
    **/
    count<T extends ItemLikeClientCountArgs>(
      args?: Subset<T, ItemLikeClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemLikeClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemLikeClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemLikeClientAggregateArgs>(args: Subset<T, ItemLikeClientAggregateArgs>): Prisma.PrismaPromise<GetItemLikeClientAggregateType<T>>

    /**
     * Group by ItemLikeClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemLikeClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemLikeClientGroupByArgs['orderBy'] }
        : { orderBy?: ItemLikeClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemLikeClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemLikeClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemLikeClient model
   */
  readonly fields: ItemLikeClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemLikeClient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemLikeClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemLikeClient model
   */
  interface ItemLikeClientFieldRefs {
    readonly id: FieldRef<"ItemLikeClient", 'String'>
    readonly userEmail: FieldRef<"ItemLikeClient", 'String'>
    readonly itemUuid: FieldRef<"ItemLikeClient", 'String'>
    readonly createdAt: FieldRef<"ItemLikeClient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemLikeClient findUnique
   */
  export type ItemLikeClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeClient to fetch.
     */
    where: ItemLikeClientWhereUniqueInput
  }

  /**
   * ItemLikeClient findUniqueOrThrow
   */
  export type ItemLikeClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeClient to fetch.
     */
    where: ItemLikeClientWhereUniqueInput
  }

  /**
   * ItemLikeClient findFirst
   */
  export type ItemLikeClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeClient to fetch.
     */
    where?: ItemLikeClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeClients to fetch.
     */
    orderBy?: ItemLikeClientOrderByWithRelationInput | ItemLikeClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemLikeClients.
     */
    cursor?: ItemLikeClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemLikeClients.
     */
    distinct?: ItemLikeClientScalarFieldEnum | ItemLikeClientScalarFieldEnum[]
  }

  /**
   * ItemLikeClient findFirstOrThrow
   */
  export type ItemLikeClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeClient to fetch.
     */
    where?: ItemLikeClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeClients to fetch.
     */
    orderBy?: ItemLikeClientOrderByWithRelationInput | ItemLikeClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemLikeClients.
     */
    cursor?: ItemLikeClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemLikeClients.
     */
    distinct?: ItemLikeClientScalarFieldEnum | ItemLikeClientScalarFieldEnum[]
  }

  /**
   * ItemLikeClient findMany
   */
  export type ItemLikeClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeClients to fetch.
     */
    where?: ItemLikeClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeClients to fetch.
     */
    orderBy?: ItemLikeClientOrderByWithRelationInput | ItemLikeClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemLikeClients.
     */
    cursor?: ItemLikeClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeClients.
     */
    skip?: number
    distinct?: ItemLikeClientScalarFieldEnum | ItemLikeClientScalarFieldEnum[]
  }

  /**
   * ItemLikeClient create
   */
  export type ItemLikeClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemLikeClient.
     */
    data: XOR<ItemLikeClientCreateInput, ItemLikeClientUncheckedCreateInput>
  }

  /**
   * ItemLikeClient createMany
   */
  export type ItemLikeClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemLikeClients.
     */
    data: ItemLikeClientCreateManyInput | ItemLikeClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemLikeClient createManyAndReturn
   */
  export type ItemLikeClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * The data used to create many ItemLikeClients.
     */
    data: ItemLikeClientCreateManyInput | ItemLikeClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemLikeClient update
   */
  export type ItemLikeClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemLikeClient.
     */
    data: XOR<ItemLikeClientUpdateInput, ItemLikeClientUncheckedUpdateInput>
    /**
     * Choose, which ItemLikeClient to update.
     */
    where: ItemLikeClientWhereUniqueInput
  }

  /**
   * ItemLikeClient updateMany
   */
  export type ItemLikeClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemLikeClients.
     */
    data: XOR<ItemLikeClientUpdateManyMutationInput, ItemLikeClientUncheckedUpdateManyInput>
    /**
     * Filter which ItemLikeClients to update
     */
    where?: ItemLikeClientWhereInput
  }

  /**
   * ItemLikeClient upsert
   */
  export type ItemLikeClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemLikeClient to update in case it exists.
     */
    where: ItemLikeClientWhereUniqueInput
    /**
     * In case the ItemLikeClient found by the `where` argument doesn't exist, create a new ItemLikeClient with this data.
     */
    create: XOR<ItemLikeClientCreateInput, ItemLikeClientUncheckedCreateInput>
    /**
     * In case the ItemLikeClient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemLikeClientUpdateInput, ItemLikeClientUncheckedUpdateInput>
  }

  /**
   * ItemLikeClient delete
   */
  export type ItemLikeClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
    /**
     * Filter which ItemLikeClient to delete.
     */
    where: ItemLikeClientWhereUniqueInput
  }

  /**
   * ItemLikeClient deleteMany
   */
  export type ItemLikeClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemLikeClients to delete
     */
    where?: ItemLikeClientWhereInput
  }

  /**
   * ItemLikeClient without action
   */
  export type ItemLikeClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeClient
     */
    select?: ItemLikeClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeClient
     */
    omit?: ItemLikeClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeClientInclude<ExtArgs> | null
  }


  /**
   * Model ItemFavoriteClient
   */

  export type AggregateItemFavoriteClient = {
    _count: ItemFavoriteClientCountAggregateOutputType | null
    _min: ItemFavoriteClientMinAggregateOutputType | null
    _max: ItemFavoriteClientMaxAggregateOutputType | null
  }

  export type ItemFavoriteClientMinAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemFavoriteClientMaxAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemFavoriteClientCountAggregateOutputType = {
    id: number
    userEmail: number
    itemUuid: number
    createdAt: number
    _all: number
  }


  export type ItemFavoriteClientMinAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemFavoriteClientMaxAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemFavoriteClientCountAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
    _all?: true
  }

  export type ItemFavoriteClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFavoriteClient to aggregate.
     */
    where?: ItemFavoriteClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteClients to fetch.
     */
    orderBy?: ItemFavoriteClientOrderByWithRelationInput | ItemFavoriteClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemFavoriteClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemFavoriteClients
    **/
    _count?: true | ItemFavoriteClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemFavoriteClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemFavoriteClientMaxAggregateInputType
  }

  export type GetItemFavoriteClientAggregateType<T extends ItemFavoriteClientAggregateArgs> = {
        [P in keyof T & keyof AggregateItemFavoriteClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemFavoriteClient[P]>
      : GetScalarType<T[P], AggregateItemFavoriteClient[P]>
  }




  export type ItemFavoriteClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFavoriteClientWhereInput
    orderBy?: ItemFavoriteClientOrderByWithAggregationInput | ItemFavoriteClientOrderByWithAggregationInput[]
    by: ItemFavoriteClientScalarFieldEnum[] | ItemFavoriteClientScalarFieldEnum
    having?: ItemFavoriteClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemFavoriteClientCountAggregateInputType | true
    _min?: ItemFavoriteClientMinAggregateInputType
    _max?: ItemFavoriteClientMaxAggregateInputType
  }

  export type ItemFavoriteClientGroupByOutputType = {
    id: string
    userEmail: string
    itemUuid: string
    createdAt: Date | null
    _count: ItemFavoriteClientCountAggregateOutputType | null
    _min: ItemFavoriteClientMinAggregateOutputType | null
    _max: ItemFavoriteClientMaxAggregateOutputType | null
  }

  type GetItemFavoriteClientGroupByPayload<T extends ItemFavoriteClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemFavoriteClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemFavoriteClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemFavoriteClientGroupByOutputType[P]>
            : GetScalarType<T[P], ItemFavoriteClientGroupByOutputType[P]>
        }
      >
    >


  export type ItemFavoriteClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFavoriteClient"]>

  export type ItemFavoriteClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFavoriteClient"]>


  export type ItemFavoriteClientSelectScalar = {
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
  }

  export type ItemFavoriteClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "itemUuid" | "createdAt", ExtArgs["result"]["itemFavoriteClient"]>
  export type ItemFavoriteClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type ItemFavoriteClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $ItemFavoriteClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemFavoriteClient"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userEmail: string
      itemUuid: string
      createdAt: Date | null
    }, ExtArgs["result"]["itemFavoriteClient"]>
    composites: {}
  }

  type ItemFavoriteClientGetPayload<S extends boolean | null | undefined | ItemFavoriteClientDefaultArgs> = $Result.GetResult<Prisma.$ItemFavoriteClientPayload, S>

  type ItemFavoriteClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFavoriteClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemFavoriteClientCountAggregateInputType | true
    }

  export interface ItemFavoriteClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemFavoriteClient'], meta: { name: 'ItemFavoriteClient' } }
    /**
     * Find zero or one ItemFavoriteClient that matches the filter.
     * @param {ItemFavoriteClientFindUniqueArgs} args - Arguments to find a ItemFavoriteClient
     * @example
     * // Get one ItemFavoriteClient
     * const itemFavoriteClient = await prisma.itemFavoriteClient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFavoriteClientFindUniqueArgs>(args: SelectSubset<T, ItemFavoriteClientFindUniqueArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemFavoriteClient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFavoriteClientFindUniqueOrThrowArgs} args - Arguments to find a ItemFavoriteClient
     * @example
     * // Get one ItemFavoriteClient
     * const itemFavoriteClient = await prisma.itemFavoriteClient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFavoriteClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFavoriteClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFavoriteClient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteClientFindFirstArgs} args - Arguments to find a ItemFavoriteClient
     * @example
     * // Get one ItemFavoriteClient
     * const itemFavoriteClient = await prisma.itemFavoriteClient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFavoriteClientFindFirstArgs>(args?: SelectSubset<T, ItemFavoriteClientFindFirstArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFavoriteClient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteClientFindFirstOrThrowArgs} args - Arguments to find a ItemFavoriteClient
     * @example
     * // Get one ItemFavoriteClient
     * const itemFavoriteClient = await prisma.itemFavoriteClient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFavoriteClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFavoriteClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemFavoriteClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemFavoriteClients
     * const itemFavoriteClients = await prisma.itemFavoriteClient.findMany()
     * 
     * // Get first 10 ItemFavoriteClients
     * const itemFavoriteClients = await prisma.itemFavoriteClient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemFavoriteClientWithIdOnly = await prisma.itemFavoriteClient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFavoriteClientFindManyArgs>(args?: SelectSubset<T, ItemFavoriteClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemFavoriteClient.
     * @param {ItemFavoriteClientCreateArgs} args - Arguments to create a ItemFavoriteClient.
     * @example
     * // Create one ItemFavoriteClient
     * const ItemFavoriteClient = await prisma.itemFavoriteClient.create({
     *   data: {
     *     // ... data to create a ItemFavoriteClient
     *   }
     * })
     * 
     */
    create<T extends ItemFavoriteClientCreateArgs>(args: SelectSubset<T, ItemFavoriteClientCreateArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemFavoriteClients.
     * @param {ItemFavoriteClientCreateManyArgs} args - Arguments to create many ItemFavoriteClients.
     * @example
     * // Create many ItemFavoriteClients
     * const itemFavoriteClient = await prisma.itemFavoriteClient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemFavoriteClientCreateManyArgs>(args?: SelectSubset<T, ItemFavoriteClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemFavoriteClients and returns the data saved in the database.
     * @param {ItemFavoriteClientCreateManyAndReturnArgs} args - Arguments to create many ItemFavoriteClients.
     * @example
     * // Create many ItemFavoriteClients
     * const itemFavoriteClient = await prisma.itemFavoriteClient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemFavoriteClients and only return the `id`
     * const itemFavoriteClientWithIdOnly = await prisma.itemFavoriteClient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemFavoriteClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemFavoriteClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemFavoriteClient.
     * @param {ItemFavoriteClientDeleteArgs} args - Arguments to delete one ItemFavoriteClient.
     * @example
     * // Delete one ItemFavoriteClient
     * const ItemFavoriteClient = await prisma.itemFavoriteClient.delete({
     *   where: {
     *     // ... filter to delete one ItemFavoriteClient
     *   }
     * })
     * 
     */
    delete<T extends ItemFavoriteClientDeleteArgs>(args: SelectSubset<T, ItemFavoriteClientDeleteArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemFavoriteClient.
     * @param {ItemFavoriteClientUpdateArgs} args - Arguments to update one ItemFavoriteClient.
     * @example
     * // Update one ItemFavoriteClient
     * const itemFavoriteClient = await prisma.itemFavoriteClient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemFavoriteClientUpdateArgs>(args: SelectSubset<T, ItemFavoriteClientUpdateArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemFavoriteClients.
     * @param {ItemFavoriteClientDeleteManyArgs} args - Arguments to filter ItemFavoriteClients to delete.
     * @example
     * // Delete a few ItemFavoriteClients
     * const { count } = await prisma.itemFavoriteClient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemFavoriteClientDeleteManyArgs>(args?: SelectSubset<T, ItemFavoriteClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFavoriteClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemFavoriteClients
     * const itemFavoriteClient = await prisma.itemFavoriteClient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemFavoriteClientUpdateManyArgs>(args: SelectSubset<T, ItemFavoriteClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemFavoriteClient.
     * @param {ItemFavoriteClientUpsertArgs} args - Arguments to update or create a ItemFavoriteClient.
     * @example
     * // Update or create a ItemFavoriteClient
     * const itemFavoriteClient = await prisma.itemFavoriteClient.upsert({
     *   create: {
     *     // ... data to create a ItemFavoriteClient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemFavoriteClient we want to update
     *   }
     * })
     */
    upsert<T extends ItemFavoriteClientUpsertArgs>(args: SelectSubset<T, ItemFavoriteClientUpsertArgs<ExtArgs>>): Prisma__ItemFavoriteClientClient<$Result.GetResult<Prisma.$ItemFavoriteClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemFavoriteClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteClientCountArgs} args - Arguments to filter ItemFavoriteClients to count.
     * @example
     * // Count the number of ItemFavoriteClients
     * const count = await prisma.itemFavoriteClient.count({
     *   where: {
     *     // ... the filter for the ItemFavoriteClients we want to count
     *   }
     * })
    **/
    count<T extends ItemFavoriteClientCountArgs>(
      args?: Subset<T, ItemFavoriteClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemFavoriteClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemFavoriteClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemFavoriteClientAggregateArgs>(args: Subset<T, ItemFavoriteClientAggregateArgs>): Prisma.PrismaPromise<GetItemFavoriteClientAggregateType<T>>

    /**
     * Group by ItemFavoriteClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemFavoriteClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemFavoriteClientGroupByArgs['orderBy'] }
        : { orderBy?: ItemFavoriteClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemFavoriteClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemFavoriteClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemFavoriteClient model
   */
  readonly fields: ItemFavoriteClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemFavoriteClient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemFavoriteClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemFavoriteClient model
   */
  interface ItemFavoriteClientFieldRefs {
    readonly id: FieldRef<"ItemFavoriteClient", 'String'>
    readonly userEmail: FieldRef<"ItemFavoriteClient", 'String'>
    readonly itemUuid: FieldRef<"ItemFavoriteClient", 'String'>
    readonly createdAt: FieldRef<"ItemFavoriteClient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemFavoriteClient findUnique
   */
  export type ItemFavoriteClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteClient to fetch.
     */
    where: ItemFavoriteClientWhereUniqueInput
  }

  /**
   * ItemFavoriteClient findUniqueOrThrow
   */
  export type ItemFavoriteClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteClient to fetch.
     */
    where: ItemFavoriteClientWhereUniqueInput
  }

  /**
   * ItemFavoriteClient findFirst
   */
  export type ItemFavoriteClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteClient to fetch.
     */
    where?: ItemFavoriteClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteClients to fetch.
     */
    orderBy?: ItemFavoriteClientOrderByWithRelationInput | ItemFavoriteClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFavoriteClients.
     */
    cursor?: ItemFavoriteClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFavoriteClients.
     */
    distinct?: ItemFavoriteClientScalarFieldEnum | ItemFavoriteClientScalarFieldEnum[]
  }

  /**
   * ItemFavoriteClient findFirstOrThrow
   */
  export type ItemFavoriteClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteClient to fetch.
     */
    where?: ItemFavoriteClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteClients to fetch.
     */
    orderBy?: ItemFavoriteClientOrderByWithRelationInput | ItemFavoriteClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFavoriteClients.
     */
    cursor?: ItemFavoriteClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFavoriteClients.
     */
    distinct?: ItemFavoriteClientScalarFieldEnum | ItemFavoriteClientScalarFieldEnum[]
  }

  /**
   * ItemFavoriteClient findMany
   */
  export type ItemFavoriteClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteClients to fetch.
     */
    where?: ItemFavoriteClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteClients to fetch.
     */
    orderBy?: ItemFavoriteClientOrderByWithRelationInput | ItemFavoriteClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemFavoriteClients.
     */
    cursor?: ItemFavoriteClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteClients.
     */
    skip?: number
    distinct?: ItemFavoriteClientScalarFieldEnum | ItemFavoriteClientScalarFieldEnum[]
  }

  /**
   * ItemFavoriteClient create
   */
  export type ItemFavoriteClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemFavoriteClient.
     */
    data: XOR<ItemFavoriteClientCreateInput, ItemFavoriteClientUncheckedCreateInput>
  }

  /**
   * ItemFavoriteClient createMany
   */
  export type ItemFavoriteClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemFavoriteClients.
     */
    data: ItemFavoriteClientCreateManyInput | ItemFavoriteClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemFavoriteClient createManyAndReturn
   */
  export type ItemFavoriteClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * The data used to create many ItemFavoriteClients.
     */
    data: ItemFavoriteClientCreateManyInput | ItemFavoriteClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFavoriteClient update
   */
  export type ItemFavoriteClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemFavoriteClient.
     */
    data: XOR<ItemFavoriteClientUpdateInput, ItemFavoriteClientUncheckedUpdateInput>
    /**
     * Choose, which ItemFavoriteClient to update.
     */
    where: ItemFavoriteClientWhereUniqueInput
  }

  /**
   * ItemFavoriteClient updateMany
   */
  export type ItemFavoriteClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemFavoriteClients.
     */
    data: XOR<ItemFavoriteClientUpdateManyMutationInput, ItemFavoriteClientUncheckedUpdateManyInput>
    /**
     * Filter which ItemFavoriteClients to update
     */
    where?: ItemFavoriteClientWhereInput
  }

  /**
   * ItemFavoriteClient upsert
   */
  export type ItemFavoriteClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemFavoriteClient to update in case it exists.
     */
    where: ItemFavoriteClientWhereUniqueInput
    /**
     * In case the ItemFavoriteClient found by the `where` argument doesn't exist, create a new ItemFavoriteClient with this data.
     */
    create: XOR<ItemFavoriteClientCreateInput, ItemFavoriteClientUncheckedCreateInput>
    /**
     * In case the ItemFavoriteClient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemFavoriteClientUpdateInput, ItemFavoriteClientUncheckedUpdateInput>
  }

  /**
   * ItemFavoriteClient delete
   */
  export type ItemFavoriteClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
    /**
     * Filter which ItemFavoriteClient to delete.
     */
    where: ItemFavoriteClientWhereUniqueInput
  }

  /**
   * ItemFavoriteClient deleteMany
   */
  export type ItemFavoriteClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFavoriteClients to delete
     */
    where?: ItemFavoriteClientWhereInput
  }

  /**
   * ItemFavoriteClient without action
   */
  export type ItemFavoriteClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteClient
     */
    select?: ItemFavoriteClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteClient
     */
    omit?: ItemFavoriteClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteClientInclude<ExtArgs> | null
  }


  /**
   * Model ItemLikeBrand
   */

  export type AggregateItemLikeBrand = {
    _count: ItemLikeBrandCountAggregateOutputType | null
    _min: ItemLikeBrandMinAggregateOutputType | null
    _max: ItemLikeBrandMaxAggregateOutputType | null
  }

  export type ItemLikeBrandMinAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemLikeBrandMaxAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemLikeBrandCountAggregateOutputType = {
    id: number
    userEmail: number
    itemUuid: number
    createdAt: number
    _all: number
  }


  export type ItemLikeBrandMinAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemLikeBrandMaxAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemLikeBrandCountAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
    _all?: true
  }

  export type ItemLikeBrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemLikeBrand to aggregate.
     */
    where?: ItemLikeBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeBrands to fetch.
     */
    orderBy?: ItemLikeBrandOrderByWithRelationInput | ItemLikeBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemLikeBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemLikeBrands
    **/
    _count?: true | ItemLikeBrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemLikeBrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemLikeBrandMaxAggregateInputType
  }

  export type GetItemLikeBrandAggregateType<T extends ItemLikeBrandAggregateArgs> = {
        [P in keyof T & keyof AggregateItemLikeBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemLikeBrand[P]>
      : GetScalarType<T[P], AggregateItemLikeBrand[P]>
  }




  export type ItemLikeBrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemLikeBrandWhereInput
    orderBy?: ItemLikeBrandOrderByWithAggregationInput | ItemLikeBrandOrderByWithAggregationInput[]
    by: ItemLikeBrandScalarFieldEnum[] | ItemLikeBrandScalarFieldEnum
    having?: ItemLikeBrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemLikeBrandCountAggregateInputType | true
    _min?: ItemLikeBrandMinAggregateInputType
    _max?: ItemLikeBrandMaxAggregateInputType
  }

  export type ItemLikeBrandGroupByOutputType = {
    id: string
    userEmail: string
    itemUuid: string
    createdAt: Date | null
    _count: ItemLikeBrandCountAggregateOutputType | null
    _min: ItemLikeBrandMinAggregateOutputType | null
    _max: ItemLikeBrandMaxAggregateOutputType | null
  }

  type GetItemLikeBrandGroupByPayload<T extends ItemLikeBrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemLikeBrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemLikeBrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemLikeBrandGroupByOutputType[P]>
            : GetScalarType<T[P], ItemLikeBrandGroupByOutputType[P]>
        }
      >
    >


  export type ItemLikeBrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemLikeBrand"]>

  export type ItemLikeBrandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemLikeBrand"]>


  export type ItemLikeBrandSelectScalar = {
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
  }

  export type ItemLikeBrandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "itemUuid" | "createdAt", ExtArgs["result"]["itemLikeBrand"]>
  export type ItemLikeBrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }
  export type ItemLikeBrandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }

  export type $ItemLikeBrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemLikeBrand"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userEmail: string
      itemUuid: string
      createdAt: Date | null
    }, ExtArgs["result"]["itemLikeBrand"]>
    composites: {}
  }

  type ItemLikeBrandGetPayload<S extends boolean | null | undefined | ItemLikeBrandDefaultArgs> = $Result.GetResult<Prisma.$ItemLikeBrandPayload, S>

  type ItemLikeBrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemLikeBrandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemLikeBrandCountAggregateInputType | true
    }

  export interface ItemLikeBrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemLikeBrand'], meta: { name: 'ItemLikeBrand' } }
    /**
     * Find zero or one ItemLikeBrand that matches the filter.
     * @param {ItemLikeBrandFindUniqueArgs} args - Arguments to find a ItemLikeBrand
     * @example
     * // Get one ItemLikeBrand
     * const itemLikeBrand = await prisma.itemLikeBrand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemLikeBrandFindUniqueArgs>(args: SelectSubset<T, ItemLikeBrandFindUniqueArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemLikeBrand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemLikeBrandFindUniqueOrThrowArgs} args - Arguments to find a ItemLikeBrand
     * @example
     * // Get one ItemLikeBrand
     * const itemLikeBrand = await prisma.itemLikeBrand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemLikeBrandFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemLikeBrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemLikeBrand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeBrandFindFirstArgs} args - Arguments to find a ItemLikeBrand
     * @example
     * // Get one ItemLikeBrand
     * const itemLikeBrand = await prisma.itemLikeBrand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemLikeBrandFindFirstArgs>(args?: SelectSubset<T, ItemLikeBrandFindFirstArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemLikeBrand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeBrandFindFirstOrThrowArgs} args - Arguments to find a ItemLikeBrand
     * @example
     * // Get one ItemLikeBrand
     * const itemLikeBrand = await prisma.itemLikeBrand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemLikeBrandFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemLikeBrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemLikeBrands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeBrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemLikeBrands
     * const itemLikeBrands = await prisma.itemLikeBrand.findMany()
     * 
     * // Get first 10 ItemLikeBrands
     * const itemLikeBrands = await prisma.itemLikeBrand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemLikeBrandWithIdOnly = await prisma.itemLikeBrand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemLikeBrandFindManyArgs>(args?: SelectSubset<T, ItemLikeBrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemLikeBrand.
     * @param {ItemLikeBrandCreateArgs} args - Arguments to create a ItemLikeBrand.
     * @example
     * // Create one ItemLikeBrand
     * const ItemLikeBrand = await prisma.itemLikeBrand.create({
     *   data: {
     *     // ... data to create a ItemLikeBrand
     *   }
     * })
     * 
     */
    create<T extends ItemLikeBrandCreateArgs>(args: SelectSubset<T, ItemLikeBrandCreateArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemLikeBrands.
     * @param {ItemLikeBrandCreateManyArgs} args - Arguments to create many ItemLikeBrands.
     * @example
     * // Create many ItemLikeBrands
     * const itemLikeBrand = await prisma.itemLikeBrand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemLikeBrandCreateManyArgs>(args?: SelectSubset<T, ItemLikeBrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemLikeBrands and returns the data saved in the database.
     * @param {ItemLikeBrandCreateManyAndReturnArgs} args - Arguments to create many ItemLikeBrands.
     * @example
     * // Create many ItemLikeBrands
     * const itemLikeBrand = await prisma.itemLikeBrand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemLikeBrands and only return the `id`
     * const itemLikeBrandWithIdOnly = await prisma.itemLikeBrand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemLikeBrandCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemLikeBrandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemLikeBrand.
     * @param {ItemLikeBrandDeleteArgs} args - Arguments to delete one ItemLikeBrand.
     * @example
     * // Delete one ItemLikeBrand
     * const ItemLikeBrand = await prisma.itemLikeBrand.delete({
     *   where: {
     *     // ... filter to delete one ItemLikeBrand
     *   }
     * })
     * 
     */
    delete<T extends ItemLikeBrandDeleteArgs>(args: SelectSubset<T, ItemLikeBrandDeleteArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemLikeBrand.
     * @param {ItemLikeBrandUpdateArgs} args - Arguments to update one ItemLikeBrand.
     * @example
     * // Update one ItemLikeBrand
     * const itemLikeBrand = await prisma.itemLikeBrand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemLikeBrandUpdateArgs>(args: SelectSubset<T, ItemLikeBrandUpdateArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemLikeBrands.
     * @param {ItemLikeBrandDeleteManyArgs} args - Arguments to filter ItemLikeBrands to delete.
     * @example
     * // Delete a few ItemLikeBrands
     * const { count } = await prisma.itemLikeBrand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemLikeBrandDeleteManyArgs>(args?: SelectSubset<T, ItemLikeBrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemLikeBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeBrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemLikeBrands
     * const itemLikeBrand = await prisma.itemLikeBrand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemLikeBrandUpdateManyArgs>(args: SelectSubset<T, ItemLikeBrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemLikeBrand.
     * @param {ItemLikeBrandUpsertArgs} args - Arguments to update or create a ItemLikeBrand.
     * @example
     * // Update or create a ItemLikeBrand
     * const itemLikeBrand = await prisma.itemLikeBrand.upsert({
     *   create: {
     *     // ... data to create a ItemLikeBrand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemLikeBrand we want to update
     *   }
     * })
     */
    upsert<T extends ItemLikeBrandUpsertArgs>(args: SelectSubset<T, ItemLikeBrandUpsertArgs<ExtArgs>>): Prisma__ItemLikeBrandClient<$Result.GetResult<Prisma.$ItemLikeBrandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemLikeBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeBrandCountArgs} args - Arguments to filter ItemLikeBrands to count.
     * @example
     * // Count the number of ItemLikeBrands
     * const count = await prisma.itemLikeBrand.count({
     *   where: {
     *     // ... the filter for the ItemLikeBrands we want to count
     *   }
     * })
    **/
    count<T extends ItemLikeBrandCountArgs>(
      args?: Subset<T, ItemLikeBrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemLikeBrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemLikeBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeBrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemLikeBrandAggregateArgs>(args: Subset<T, ItemLikeBrandAggregateArgs>): Prisma.PrismaPromise<GetItemLikeBrandAggregateType<T>>

    /**
     * Group by ItemLikeBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeBrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemLikeBrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemLikeBrandGroupByArgs['orderBy'] }
        : { orderBy?: ItemLikeBrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemLikeBrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemLikeBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemLikeBrand model
   */
  readonly fields: ItemLikeBrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemLikeBrand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemLikeBrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends BrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrandDefaultArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemLikeBrand model
   */
  interface ItemLikeBrandFieldRefs {
    readonly id: FieldRef<"ItemLikeBrand", 'String'>
    readonly userEmail: FieldRef<"ItemLikeBrand", 'String'>
    readonly itemUuid: FieldRef<"ItemLikeBrand", 'String'>
    readonly createdAt: FieldRef<"ItemLikeBrand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemLikeBrand findUnique
   */
  export type ItemLikeBrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeBrand to fetch.
     */
    where: ItemLikeBrandWhereUniqueInput
  }

  /**
   * ItemLikeBrand findUniqueOrThrow
   */
  export type ItemLikeBrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeBrand to fetch.
     */
    where: ItemLikeBrandWhereUniqueInput
  }

  /**
   * ItemLikeBrand findFirst
   */
  export type ItemLikeBrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeBrand to fetch.
     */
    where?: ItemLikeBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeBrands to fetch.
     */
    orderBy?: ItemLikeBrandOrderByWithRelationInput | ItemLikeBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemLikeBrands.
     */
    cursor?: ItemLikeBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemLikeBrands.
     */
    distinct?: ItemLikeBrandScalarFieldEnum | ItemLikeBrandScalarFieldEnum[]
  }

  /**
   * ItemLikeBrand findFirstOrThrow
   */
  export type ItemLikeBrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeBrand to fetch.
     */
    where?: ItemLikeBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeBrands to fetch.
     */
    orderBy?: ItemLikeBrandOrderByWithRelationInput | ItemLikeBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemLikeBrands.
     */
    cursor?: ItemLikeBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemLikeBrands.
     */
    distinct?: ItemLikeBrandScalarFieldEnum | ItemLikeBrandScalarFieldEnum[]
  }

  /**
   * ItemLikeBrand findMany
   */
  export type ItemLikeBrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikeBrands to fetch.
     */
    where?: ItemLikeBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikeBrands to fetch.
     */
    orderBy?: ItemLikeBrandOrderByWithRelationInput | ItemLikeBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemLikeBrands.
     */
    cursor?: ItemLikeBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikeBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikeBrands.
     */
    skip?: number
    distinct?: ItemLikeBrandScalarFieldEnum | ItemLikeBrandScalarFieldEnum[]
  }

  /**
   * ItemLikeBrand create
   */
  export type ItemLikeBrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemLikeBrand.
     */
    data: XOR<ItemLikeBrandCreateInput, ItemLikeBrandUncheckedCreateInput>
  }

  /**
   * ItemLikeBrand createMany
   */
  export type ItemLikeBrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemLikeBrands.
     */
    data: ItemLikeBrandCreateManyInput | ItemLikeBrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemLikeBrand createManyAndReturn
   */
  export type ItemLikeBrandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * The data used to create many ItemLikeBrands.
     */
    data: ItemLikeBrandCreateManyInput | ItemLikeBrandCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemLikeBrand update
   */
  export type ItemLikeBrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemLikeBrand.
     */
    data: XOR<ItemLikeBrandUpdateInput, ItemLikeBrandUncheckedUpdateInput>
    /**
     * Choose, which ItemLikeBrand to update.
     */
    where: ItemLikeBrandWhereUniqueInput
  }

  /**
   * ItemLikeBrand updateMany
   */
  export type ItemLikeBrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemLikeBrands.
     */
    data: XOR<ItemLikeBrandUpdateManyMutationInput, ItemLikeBrandUncheckedUpdateManyInput>
    /**
     * Filter which ItemLikeBrands to update
     */
    where?: ItemLikeBrandWhereInput
  }

  /**
   * ItemLikeBrand upsert
   */
  export type ItemLikeBrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemLikeBrand to update in case it exists.
     */
    where: ItemLikeBrandWhereUniqueInput
    /**
     * In case the ItemLikeBrand found by the `where` argument doesn't exist, create a new ItemLikeBrand with this data.
     */
    create: XOR<ItemLikeBrandCreateInput, ItemLikeBrandUncheckedCreateInput>
    /**
     * In case the ItemLikeBrand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemLikeBrandUpdateInput, ItemLikeBrandUncheckedUpdateInput>
  }

  /**
   * ItemLikeBrand delete
   */
  export type ItemLikeBrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
    /**
     * Filter which ItemLikeBrand to delete.
     */
    where: ItemLikeBrandWhereUniqueInput
  }

  /**
   * ItemLikeBrand deleteMany
   */
  export type ItemLikeBrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemLikeBrands to delete
     */
    where?: ItemLikeBrandWhereInput
  }

  /**
   * ItemLikeBrand without action
   */
  export type ItemLikeBrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLikeBrand
     */
    select?: ItemLikeBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLikeBrand
     */
    omit?: ItemLikeBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeBrandInclude<ExtArgs> | null
  }


  /**
   * Model ItemFavoriteBrand
   */

  export type AggregateItemFavoriteBrand = {
    _count: ItemFavoriteBrandCountAggregateOutputType | null
    _min: ItemFavoriteBrandMinAggregateOutputType | null
    _max: ItemFavoriteBrandMaxAggregateOutputType | null
  }

  export type ItemFavoriteBrandMinAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemFavoriteBrandMaxAggregateOutputType = {
    id: string | null
    userEmail: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemFavoriteBrandCountAggregateOutputType = {
    id: number
    userEmail: number
    itemUuid: number
    createdAt: number
    _all: number
  }


  export type ItemFavoriteBrandMinAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemFavoriteBrandMaxAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemFavoriteBrandCountAggregateInputType = {
    id?: true
    userEmail?: true
    itemUuid?: true
    createdAt?: true
    _all?: true
  }

  export type ItemFavoriteBrandAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFavoriteBrand to aggregate.
     */
    where?: ItemFavoriteBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteBrands to fetch.
     */
    orderBy?: ItemFavoriteBrandOrderByWithRelationInput | ItemFavoriteBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemFavoriteBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemFavoriteBrands
    **/
    _count?: true | ItemFavoriteBrandCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemFavoriteBrandMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemFavoriteBrandMaxAggregateInputType
  }

  export type GetItemFavoriteBrandAggregateType<T extends ItemFavoriteBrandAggregateArgs> = {
        [P in keyof T & keyof AggregateItemFavoriteBrand]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemFavoriteBrand[P]>
      : GetScalarType<T[P], AggregateItemFavoriteBrand[P]>
  }




  export type ItemFavoriteBrandGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFavoriteBrandWhereInput
    orderBy?: ItemFavoriteBrandOrderByWithAggregationInput | ItemFavoriteBrandOrderByWithAggregationInput[]
    by: ItemFavoriteBrandScalarFieldEnum[] | ItemFavoriteBrandScalarFieldEnum
    having?: ItemFavoriteBrandScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemFavoriteBrandCountAggregateInputType | true
    _min?: ItemFavoriteBrandMinAggregateInputType
    _max?: ItemFavoriteBrandMaxAggregateInputType
  }

  export type ItemFavoriteBrandGroupByOutputType = {
    id: string
    userEmail: string
    itemUuid: string
    createdAt: Date | null
    _count: ItemFavoriteBrandCountAggregateOutputType | null
    _min: ItemFavoriteBrandMinAggregateOutputType | null
    _max: ItemFavoriteBrandMaxAggregateOutputType | null
  }

  type GetItemFavoriteBrandGroupByPayload<T extends ItemFavoriteBrandGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemFavoriteBrandGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemFavoriteBrandGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemFavoriteBrandGroupByOutputType[P]>
            : GetScalarType<T[P], ItemFavoriteBrandGroupByOutputType[P]>
        }
      >
    >


  export type ItemFavoriteBrandSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFavoriteBrand"]>

  export type ItemFavoriteBrandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFavoriteBrand"]>


  export type ItemFavoriteBrandSelectScalar = {
    id?: boolean
    userEmail?: boolean
    itemUuid?: boolean
    createdAt?: boolean
  }

  export type ItemFavoriteBrandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userEmail" | "itemUuid" | "createdAt", ExtArgs["result"]["itemFavoriteBrand"]>
  export type ItemFavoriteBrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }
  export type ItemFavoriteBrandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
  }

  export type $ItemFavoriteBrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemFavoriteBrand"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userEmail: string
      itemUuid: string
      createdAt: Date | null
    }, ExtArgs["result"]["itemFavoriteBrand"]>
    composites: {}
  }

  type ItemFavoriteBrandGetPayload<S extends boolean | null | undefined | ItemFavoriteBrandDefaultArgs> = $Result.GetResult<Prisma.$ItemFavoriteBrandPayload, S>

  type ItemFavoriteBrandCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFavoriteBrandFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemFavoriteBrandCountAggregateInputType | true
    }

  export interface ItemFavoriteBrandDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemFavoriteBrand'], meta: { name: 'ItemFavoriteBrand' } }
    /**
     * Find zero or one ItemFavoriteBrand that matches the filter.
     * @param {ItemFavoriteBrandFindUniqueArgs} args - Arguments to find a ItemFavoriteBrand
     * @example
     * // Get one ItemFavoriteBrand
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFavoriteBrandFindUniqueArgs>(args: SelectSubset<T, ItemFavoriteBrandFindUniqueArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemFavoriteBrand that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFavoriteBrandFindUniqueOrThrowArgs} args - Arguments to find a ItemFavoriteBrand
     * @example
     * // Get one ItemFavoriteBrand
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFavoriteBrandFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFavoriteBrandFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFavoriteBrand that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteBrandFindFirstArgs} args - Arguments to find a ItemFavoriteBrand
     * @example
     * // Get one ItemFavoriteBrand
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFavoriteBrandFindFirstArgs>(args?: SelectSubset<T, ItemFavoriteBrandFindFirstArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFavoriteBrand that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteBrandFindFirstOrThrowArgs} args - Arguments to find a ItemFavoriteBrand
     * @example
     * // Get one ItemFavoriteBrand
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFavoriteBrandFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFavoriteBrandFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemFavoriteBrands that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteBrandFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemFavoriteBrands
     * const itemFavoriteBrands = await prisma.itemFavoriteBrand.findMany()
     * 
     * // Get first 10 ItemFavoriteBrands
     * const itemFavoriteBrands = await prisma.itemFavoriteBrand.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemFavoriteBrandWithIdOnly = await prisma.itemFavoriteBrand.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFavoriteBrandFindManyArgs>(args?: SelectSubset<T, ItemFavoriteBrandFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemFavoriteBrand.
     * @param {ItemFavoriteBrandCreateArgs} args - Arguments to create a ItemFavoriteBrand.
     * @example
     * // Create one ItemFavoriteBrand
     * const ItemFavoriteBrand = await prisma.itemFavoriteBrand.create({
     *   data: {
     *     // ... data to create a ItemFavoriteBrand
     *   }
     * })
     * 
     */
    create<T extends ItemFavoriteBrandCreateArgs>(args: SelectSubset<T, ItemFavoriteBrandCreateArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemFavoriteBrands.
     * @param {ItemFavoriteBrandCreateManyArgs} args - Arguments to create many ItemFavoriteBrands.
     * @example
     * // Create many ItemFavoriteBrands
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemFavoriteBrandCreateManyArgs>(args?: SelectSubset<T, ItemFavoriteBrandCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemFavoriteBrands and returns the data saved in the database.
     * @param {ItemFavoriteBrandCreateManyAndReturnArgs} args - Arguments to create many ItemFavoriteBrands.
     * @example
     * // Create many ItemFavoriteBrands
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemFavoriteBrands and only return the `id`
     * const itemFavoriteBrandWithIdOnly = await prisma.itemFavoriteBrand.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemFavoriteBrandCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemFavoriteBrandCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemFavoriteBrand.
     * @param {ItemFavoriteBrandDeleteArgs} args - Arguments to delete one ItemFavoriteBrand.
     * @example
     * // Delete one ItemFavoriteBrand
     * const ItemFavoriteBrand = await prisma.itemFavoriteBrand.delete({
     *   where: {
     *     // ... filter to delete one ItemFavoriteBrand
     *   }
     * })
     * 
     */
    delete<T extends ItemFavoriteBrandDeleteArgs>(args: SelectSubset<T, ItemFavoriteBrandDeleteArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemFavoriteBrand.
     * @param {ItemFavoriteBrandUpdateArgs} args - Arguments to update one ItemFavoriteBrand.
     * @example
     * // Update one ItemFavoriteBrand
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemFavoriteBrandUpdateArgs>(args: SelectSubset<T, ItemFavoriteBrandUpdateArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemFavoriteBrands.
     * @param {ItemFavoriteBrandDeleteManyArgs} args - Arguments to filter ItemFavoriteBrands to delete.
     * @example
     * // Delete a few ItemFavoriteBrands
     * const { count } = await prisma.itemFavoriteBrand.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemFavoriteBrandDeleteManyArgs>(args?: SelectSubset<T, ItemFavoriteBrandDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFavoriteBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteBrandUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemFavoriteBrands
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemFavoriteBrandUpdateManyArgs>(args: SelectSubset<T, ItemFavoriteBrandUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ItemFavoriteBrand.
     * @param {ItemFavoriteBrandUpsertArgs} args - Arguments to update or create a ItemFavoriteBrand.
     * @example
     * // Update or create a ItemFavoriteBrand
     * const itemFavoriteBrand = await prisma.itemFavoriteBrand.upsert({
     *   create: {
     *     // ... data to create a ItemFavoriteBrand
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemFavoriteBrand we want to update
     *   }
     * })
     */
    upsert<T extends ItemFavoriteBrandUpsertArgs>(args: SelectSubset<T, ItemFavoriteBrandUpsertArgs<ExtArgs>>): Prisma__ItemFavoriteBrandClient<$Result.GetResult<Prisma.$ItemFavoriteBrandPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemFavoriteBrands.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteBrandCountArgs} args - Arguments to filter ItemFavoriteBrands to count.
     * @example
     * // Count the number of ItemFavoriteBrands
     * const count = await prisma.itemFavoriteBrand.count({
     *   where: {
     *     // ... the filter for the ItemFavoriteBrands we want to count
     *   }
     * })
    **/
    count<T extends ItemFavoriteBrandCountArgs>(
      args?: Subset<T, ItemFavoriteBrandCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemFavoriteBrandCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemFavoriteBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteBrandAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemFavoriteBrandAggregateArgs>(args: Subset<T, ItemFavoriteBrandAggregateArgs>): Prisma.PrismaPromise<GetItemFavoriteBrandAggregateType<T>>

    /**
     * Group by ItemFavoriteBrand.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteBrandGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemFavoriteBrandGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemFavoriteBrandGroupByArgs['orderBy'] }
        : { orderBy?: ItemFavoriteBrandGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemFavoriteBrandGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemFavoriteBrandGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemFavoriteBrand model
   */
  readonly fields: ItemFavoriteBrandFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemFavoriteBrand.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemFavoriteBrandClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends BrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrandDefaultArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemFavoriteBrand model
   */
  interface ItemFavoriteBrandFieldRefs {
    readonly id: FieldRef<"ItemFavoriteBrand", 'String'>
    readonly userEmail: FieldRef<"ItemFavoriteBrand", 'String'>
    readonly itemUuid: FieldRef<"ItemFavoriteBrand", 'String'>
    readonly createdAt: FieldRef<"ItemFavoriteBrand", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemFavoriteBrand findUnique
   */
  export type ItemFavoriteBrandFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteBrand to fetch.
     */
    where: ItemFavoriteBrandWhereUniqueInput
  }

  /**
   * ItemFavoriteBrand findUniqueOrThrow
   */
  export type ItemFavoriteBrandFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteBrand to fetch.
     */
    where: ItemFavoriteBrandWhereUniqueInput
  }

  /**
   * ItemFavoriteBrand findFirst
   */
  export type ItemFavoriteBrandFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteBrand to fetch.
     */
    where?: ItemFavoriteBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteBrands to fetch.
     */
    orderBy?: ItemFavoriteBrandOrderByWithRelationInput | ItemFavoriteBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFavoriteBrands.
     */
    cursor?: ItemFavoriteBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFavoriteBrands.
     */
    distinct?: ItemFavoriteBrandScalarFieldEnum | ItemFavoriteBrandScalarFieldEnum[]
  }

  /**
   * ItemFavoriteBrand findFirstOrThrow
   */
  export type ItemFavoriteBrandFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteBrand to fetch.
     */
    where?: ItemFavoriteBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteBrands to fetch.
     */
    orderBy?: ItemFavoriteBrandOrderByWithRelationInput | ItemFavoriteBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFavoriteBrands.
     */
    cursor?: ItemFavoriteBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteBrands.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFavoriteBrands.
     */
    distinct?: ItemFavoriteBrandScalarFieldEnum | ItemFavoriteBrandScalarFieldEnum[]
  }

  /**
   * ItemFavoriteBrand findMany
   */
  export type ItemFavoriteBrandFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavoriteBrands to fetch.
     */
    where?: ItemFavoriteBrandWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavoriteBrands to fetch.
     */
    orderBy?: ItemFavoriteBrandOrderByWithRelationInput | ItemFavoriteBrandOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemFavoriteBrands.
     */
    cursor?: ItemFavoriteBrandWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavoriteBrands from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavoriteBrands.
     */
    skip?: number
    distinct?: ItemFavoriteBrandScalarFieldEnum | ItemFavoriteBrandScalarFieldEnum[]
  }

  /**
   * ItemFavoriteBrand create
   */
  export type ItemFavoriteBrandCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemFavoriteBrand.
     */
    data: XOR<ItemFavoriteBrandCreateInput, ItemFavoriteBrandUncheckedCreateInput>
  }

  /**
   * ItemFavoriteBrand createMany
   */
  export type ItemFavoriteBrandCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemFavoriteBrands.
     */
    data: ItemFavoriteBrandCreateManyInput | ItemFavoriteBrandCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemFavoriteBrand createManyAndReturn
   */
  export type ItemFavoriteBrandCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * The data used to create many ItemFavoriteBrands.
     */
    data: ItemFavoriteBrandCreateManyInput | ItemFavoriteBrandCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFavoriteBrand update
   */
  export type ItemFavoriteBrandUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemFavoriteBrand.
     */
    data: XOR<ItemFavoriteBrandUpdateInput, ItemFavoriteBrandUncheckedUpdateInput>
    /**
     * Choose, which ItemFavoriteBrand to update.
     */
    where: ItemFavoriteBrandWhereUniqueInput
  }

  /**
   * ItemFavoriteBrand updateMany
   */
  export type ItemFavoriteBrandUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemFavoriteBrands.
     */
    data: XOR<ItemFavoriteBrandUpdateManyMutationInput, ItemFavoriteBrandUncheckedUpdateManyInput>
    /**
     * Filter which ItemFavoriteBrands to update
     */
    where?: ItemFavoriteBrandWhereInput
  }

  /**
   * ItemFavoriteBrand upsert
   */
  export type ItemFavoriteBrandUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemFavoriteBrand to update in case it exists.
     */
    where: ItemFavoriteBrandWhereUniqueInput
    /**
     * In case the ItemFavoriteBrand found by the `where` argument doesn't exist, create a new ItemFavoriteBrand with this data.
     */
    create: XOR<ItemFavoriteBrandCreateInput, ItemFavoriteBrandUncheckedCreateInput>
    /**
     * In case the ItemFavoriteBrand was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemFavoriteBrandUpdateInput, ItemFavoriteBrandUncheckedUpdateInput>
  }

  /**
   * ItemFavoriteBrand delete
   */
  export type ItemFavoriteBrandDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
    /**
     * Filter which ItemFavoriteBrand to delete.
     */
    where: ItemFavoriteBrandWhereUniqueInput
  }

  /**
   * ItemFavoriteBrand deleteMany
   */
  export type ItemFavoriteBrandDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFavoriteBrands to delete
     */
    where?: ItemFavoriteBrandWhereInput
  }

  /**
   * ItemFavoriteBrand without action
   */
  export type ItemFavoriteBrandDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavoriteBrand
     */
    select?: ItemFavoriteBrandSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavoriteBrand
     */
    omit?: ItemFavoriteBrandOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteBrandInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClientScalarFieldEnum: {
    email: 'email',
    name: 'name',
    dateOfBirth: 'dateOfBirth',
    preferences: 'preferences'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const RegisterInProgressScalarFieldEnum: {
    email: 'email',
    verificationCode: 'verificationCode',
    verificationCodeExpiration: 'verificationCodeExpiration'
  };

  export type RegisterInProgressScalarFieldEnum = (typeof RegisterInProgressScalarFieldEnum)[keyof typeof RegisterInProgressScalarFieldEnum]


  export const BrandScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    description: 'description',
    url: 'url',
    logoUrl: 'logoUrl'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const ItemLikeClientScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    itemUuid: 'itemUuid',
    createdAt: 'createdAt'
  };

  export type ItemLikeClientScalarFieldEnum = (typeof ItemLikeClientScalarFieldEnum)[keyof typeof ItemLikeClientScalarFieldEnum]


  export const ItemFavoriteClientScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    itemUuid: 'itemUuid',
    createdAt: 'createdAt'
  };

  export type ItemFavoriteClientScalarFieldEnum = (typeof ItemFavoriteClientScalarFieldEnum)[keyof typeof ItemFavoriteClientScalarFieldEnum]


  export const ItemLikeBrandScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    itemUuid: 'itemUuid',
    createdAt: 'createdAt'
  };

  export type ItemLikeBrandScalarFieldEnum = (typeof ItemLikeBrandScalarFieldEnum)[keyof typeof ItemLikeBrandScalarFieldEnum]


  export const ItemFavoriteBrandScalarFieldEnum: {
    id: 'id',
    userEmail: 'userEmail',
    itemUuid: 'itemUuid',
    createdAt: 'createdAt'
  };

  export type ItemFavoriteBrandScalarFieldEnum = (typeof ItemFavoriteBrandScalarFieldEnum)[keyof typeof ItemFavoriteBrandScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    email?: StringFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    dateOfBirth?: DateTimeNullableFilter<"Client"> | Date | string | null
    preferences?: JsonNullableFilter<"Client">
    itemFavorites?: ItemFavoriteClientListRelationFilter
    itemLikes?: ItemLikeClientListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    email?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    preferences?: SortOrderInput | SortOrder
    itemFavorites?: ItemFavoriteClientOrderByRelationAggregateInput
    itemLikes?: ItemLikeClientOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    email?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    dateOfBirth?: DateTimeNullableFilter<"Client"> | Date | string | null
    preferences?: JsonNullableFilter<"Client">
    itemFavorites?: ItemFavoriteClientListRelationFilter
    itemLikes?: ItemLikeClientListRelationFilter
  }, "email">

  export type ClientOrderByWithAggregationInput = {
    email?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    preferences?: SortOrderInput | SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    email?: StringWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    preferences?: JsonNullableWithAggregatesFilter<"Client">
  }

  export type RegisterInProgressWhereInput = {
    AND?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    OR?: RegisterInProgressWhereInput[]
    NOT?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    email?: StringFilter<"RegisterInProgress"> | string
    verificationCode?: StringFilter<"RegisterInProgress"> | string
    verificationCodeExpiration?: StringFilter<"RegisterInProgress"> | string
  }

  export type RegisterInProgressOrderByWithRelationInput = {
    email?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
  }

  export type RegisterInProgressWhereUniqueInput = Prisma.AtLeast<{
    email?: string
    AND?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    OR?: RegisterInProgressWhereInput[]
    NOT?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    verificationCode?: StringFilter<"RegisterInProgress"> | string
    verificationCodeExpiration?: StringFilter<"RegisterInProgress"> | string
  }, "email">

  export type RegisterInProgressOrderByWithAggregationInput = {
    email?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    _count?: RegisterInProgressCountOrderByAggregateInput
    _max?: RegisterInProgressMaxOrderByAggregateInput
    _min?: RegisterInProgressMinOrderByAggregateInput
  }

  export type RegisterInProgressScalarWhereWithAggregatesInput = {
    AND?: RegisterInProgressScalarWhereWithAggregatesInput | RegisterInProgressScalarWhereWithAggregatesInput[]
    OR?: RegisterInProgressScalarWhereWithAggregatesInput[]
    NOT?: RegisterInProgressScalarWhereWithAggregatesInput | RegisterInProgressScalarWhereWithAggregatesInput[]
    email?: StringWithAggregatesFilter<"RegisterInProgress"> | string
    verificationCode?: StringWithAggregatesFilter<"RegisterInProgress"> | string
    verificationCodeExpiration?: StringWithAggregatesFilter<"RegisterInProgress"> | string
  }

  export type BrandWhereInput = {
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    id?: UuidFilter<"Brand"> | string
    email?: StringFilter<"Brand"> | string
    name?: StringFilter<"Brand"> | string
    description?: StringFilter<"Brand"> | string
    url?: StringFilter<"Brand"> | string
    logoUrl?: StringFilter<"Brand"> | string
    itemFavorites?: ItemFavoriteBrandListRelationFilter
    itemLikes?: ItemLikeBrandListRelationFilter
  }

  export type BrandOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    itemFavorites?: ItemFavoriteBrandOrderByRelationAggregateInput
    itemLikes?: ItemLikeBrandOrderByRelationAggregateInput
  }

  export type BrandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    name?: StringFilter<"Brand"> | string
    description?: StringFilter<"Brand"> | string
    url?: StringFilter<"Brand"> | string
    logoUrl?: StringFilter<"Brand"> | string
    itemFavorites?: ItemFavoriteBrandListRelationFilter
    itemLikes?: ItemLikeBrandListRelationFilter
  }, "id" | "email">

  export type BrandOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    _count?: BrandCountOrderByAggregateInput
    _max?: BrandMaxOrderByAggregateInput
    _min?: BrandMinOrderByAggregateInput
  }

  export type BrandScalarWhereWithAggregatesInput = {
    AND?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    OR?: BrandScalarWhereWithAggregatesInput[]
    NOT?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Brand"> | string
    email?: StringWithAggregatesFilter<"Brand"> | string
    name?: StringWithAggregatesFilter<"Brand"> | string
    description?: StringWithAggregatesFilter<"Brand"> | string
    url?: StringWithAggregatesFilter<"Brand"> | string
    logoUrl?: StringWithAggregatesFilter<"Brand"> | string
  }

  export type ItemLikeClientWhereInput = {
    AND?: ItemLikeClientWhereInput | ItemLikeClientWhereInput[]
    OR?: ItemLikeClientWhereInput[]
    NOT?: ItemLikeClientWhereInput | ItemLikeClientWhereInput[]
    id?: UuidFilter<"ItemLikeClient"> | string
    userEmail?: StringFilter<"ItemLikeClient"> | string
    itemUuid?: StringFilter<"ItemLikeClient"> | string
    createdAt?: DateTimeNullableFilter<"ItemLikeClient"> | Date | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }

  export type ItemLikeClientOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    client?: ClientOrderByWithRelationInput
  }

  export type ItemLikeClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userEmail_itemUuid?: ItemLikeClientUserEmailItemUuidCompoundUniqueInput
    AND?: ItemLikeClientWhereInput | ItemLikeClientWhereInput[]
    OR?: ItemLikeClientWhereInput[]
    NOT?: ItemLikeClientWhereInput | ItemLikeClientWhereInput[]
    userEmail?: StringFilter<"ItemLikeClient"> | string
    itemUuid?: StringFilter<"ItemLikeClient"> | string
    createdAt?: DateTimeNullableFilter<"ItemLikeClient"> | Date | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }, "id" | "userEmail_itemUuid">

  export type ItemLikeClientOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: ItemLikeClientCountOrderByAggregateInput
    _max?: ItemLikeClientMaxOrderByAggregateInput
    _min?: ItemLikeClientMinOrderByAggregateInput
  }

  export type ItemLikeClientScalarWhereWithAggregatesInput = {
    AND?: ItemLikeClientScalarWhereWithAggregatesInput | ItemLikeClientScalarWhereWithAggregatesInput[]
    OR?: ItemLikeClientScalarWhereWithAggregatesInput[]
    NOT?: ItemLikeClientScalarWhereWithAggregatesInput | ItemLikeClientScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ItemLikeClient"> | string
    userEmail?: StringWithAggregatesFilter<"ItemLikeClient"> | string
    itemUuid?: StringWithAggregatesFilter<"ItemLikeClient"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ItemLikeClient"> | Date | string | null
  }

  export type ItemFavoriteClientWhereInput = {
    AND?: ItemFavoriteClientWhereInput | ItemFavoriteClientWhereInput[]
    OR?: ItemFavoriteClientWhereInput[]
    NOT?: ItemFavoriteClientWhereInput | ItemFavoriteClientWhereInput[]
    id?: UuidFilter<"ItemFavoriteClient"> | string
    userEmail?: StringFilter<"ItemFavoriteClient"> | string
    itemUuid?: StringFilter<"ItemFavoriteClient"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavoriteClient"> | Date | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }

  export type ItemFavoriteClientOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    client?: ClientOrderByWithRelationInput
  }

  export type ItemFavoriteClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userEmail_itemUuid?: ItemFavoriteClientUserEmailItemUuidCompoundUniqueInput
    AND?: ItemFavoriteClientWhereInput | ItemFavoriteClientWhereInput[]
    OR?: ItemFavoriteClientWhereInput[]
    NOT?: ItemFavoriteClientWhereInput | ItemFavoriteClientWhereInput[]
    userEmail?: StringFilter<"ItemFavoriteClient"> | string
    itemUuid?: StringFilter<"ItemFavoriteClient"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavoriteClient"> | Date | string | null
    client?: XOR<ClientRelationFilter, ClientWhereInput>
  }, "id" | "userEmail_itemUuid">

  export type ItemFavoriteClientOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: ItemFavoriteClientCountOrderByAggregateInput
    _max?: ItemFavoriteClientMaxOrderByAggregateInput
    _min?: ItemFavoriteClientMinOrderByAggregateInput
  }

  export type ItemFavoriteClientScalarWhereWithAggregatesInput = {
    AND?: ItemFavoriteClientScalarWhereWithAggregatesInput | ItemFavoriteClientScalarWhereWithAggregatesInput[]
    OR?: ItemFavoriteClientScalarWhereWithAggregatesInput[]
    NOT?: ItemFavoriteClientScalarWhereWithAggregatesInput | ItemFavoriteClientScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ItemFavoriteClient"> | string
    userEmail?: StringWithAggregatesFilter<"ItemFavoriteClient"> | string
    itemUuid?: StringWithAggregatesFilter<"ItemFavoriteClient"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ItemFavoriteClient"> | Date | string | null
  }

  export type ItemLikeBrandWhereInput = {
    AND?: ItemLikeBrandWhereInput | ItemLikeBrandWhereInput[]
    OR?: ItemLikeBrandWhereInput[]
    NOT?: ItemLikeBrandWhereInput | ItemLikeBrandWhereInput[]
    id?: UuidFilter<"ItemLikeBrand"> | string
    userEmail?: StringFilter<"ItemLikeBrand"> | string
    itemUuid?: StringFilter<"ItemLikeBrand"> | string
    createdAt?: DateTimeNullableFilter<"ItemLikeBrand"> | Date | string | null
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
  }

  export type ItemLikeBrandOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    brand?: BrandOrderByWithRelationInput
  }

  export type ItemLikeBrandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userEmail_itemUuid?: ItemLikeBrandUserEmailItemUuidCompoundUniqueInput
    AND?: ItemLikeBrandWhereInput | ItemLikeBrandWhereInput[]
    OR?: ItemLikeBrandWhereInput[]
    NOT?: ItemLikeBrandWhereInput | ItemLikeBrandWhereInput[]
    userEmail?: StringFilter<"ItemLikeBrand"> | string
    itemUuid?: StringFilter<"ItemLikeBrand"> | string
    createdAt?: DateTimeNullableFilter<"ItemLikeBrand"> | Date | string | null
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
  }, "id" | "userEmail_itemUuid">

  export type ItemLikeBrandOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: ItemLikeBrandCountOrderByAggregateInput
    _max?: ItemLikeBrandMaxOrderByAggregateInput
    _min?: ItemLikeBrandMinOrderByAggregateInput
  }

  export type ItemLikeBrandScalarWhereWithAggregatesInput = {
    AND?: ItemLikeBrandScalarWhereWithAggregatesInput | ItemLikeBrandScalarWhereWithAggregatesInput[]
    OR?: ItemLikeBrandScalarWhereWithAggregatesInput[]
    NOT?: ItemLikeBrandScalarWhereWithAggregatesInput | ItemLikeBrandScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ItemLikeBrand"> | string
    userEmail?: StringWithAggregatesFilter<"ItemLikeBrand"> | string
    itemUuid?: StringWithAggregatesFilter<"ItemLikeBrand"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ItemLikeBrand"> | Date | string | null
  }

  export type ItemFavoriteBrandWhereInput = {
    AND?: ItemFavoriteBrandWhereInput | ItemFavoriteBrandWhereInput[]
    OR?: ItemFavoriteBrandWhereInput[]
    NOT?: ItemFavoriteBrandWhereInput | ItemFavoriteBrandWhereInput[]
    id?: UuidFilter<"ItemFavoriteBrand"> | string
    userEmail?: StringFilter<"ItemFavoriteBrand"> | string
    itemUuid?: StringFilter<"ItemFavoriteBrand"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavoriteBrand"> | Date | string | null
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
  }

  export type ItemFavoriteBrandOrderByWithRelationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    brand?: BrandOrderByWithRelationInput
  }

  export type ItemFavoriteBrandWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userEmail_itemUuid?: ItemFavoriteBrandUserEmailItemUuidCompoundUniqueInput
    AND?: ItemFavoriteBrandWhereInput | ItemFavoriteBrandWhereInput[]
    OR?: ItemFavoriteBrandWhereInput[]
    NOT?: ItemFavoriteBrandWhereInput | ItemFavoriteBrandWhereInput[]
    userEmail?: StringFilter<"ItemFavoriteBrand"> | string
    itemUuid?: StringFilter<"ItemFavoriteBrand"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavoriteBrand"> | Date | string | null
    brand?: XOR<BrandRelationFilter, BrandWhereInput>
  }, "id" | "userEmail_itemUuid">

  export type ItemFavoriteBrandOrderByWithAggregationInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: ItemFavoriteBrandCountOrderByAggregateInput
    _max?: ItemFavoriteBrandMaxOrderByAggregateInput
    _min?: ItemFavoriteBrandMinOrderByAggregateInput
  }

  export type ItemFavoriteBrandScalarWhereWithAggregatesInput = {
    AND?: ItemFavoriteBrandScalarWhereWithAggregatesInput | ItemFavoriteBrandScalarWhereWithAggregatesInput[]
    OR?: ItemFavoriteBrandScalarWhereWithAggregatesInput[]
    NOT?: ItemFavoriteBrandScalarWhereWithAggregatesInput | ItemFavoriteBrandScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ItemFavoriteBrand"> | string
    userEmail?: StringWithAggregatesFilter<"ItemFavoriteBrand"> | string
    itemUuid?: StringWithAggregatesFilter<"ItemFavoriteBrand"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ItemFavoriteBrand"> | Date | string | null
  }

  export type ClientCreateInput = {
    email: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientCreateNestedManyWithoutClientInput
    itemLikes?: ItemLikeClientCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    email: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientUncheckedCreateNestedManyWithoutClientInput
    itemLikes?: ItemLikeClientUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientUpdateManyWithoutClientNestedInput
    itemLikes?: ItemLikeClientUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientUncheckedUpdateManyWithoutClientNestedInput
    itemLikes?: ItemLikeClientUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    email: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type RegisterInProgressCreateInput = {
    email: string
    verificationCode: string
    verificationCodeExpiration: string
  }

  export type RegisterInProgressUncheckedCreateInput = {
    email: string
    verificationCode: string
    verificationCodeExpiration: string
  }

  export type RegisterInProgressUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
  }

  export type RegisterInProgressUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
  }

  export type RegisterInProgressCreateManyInput = {
    email: string
    verificationCode: string
    verificationCodeExpiration: string
  }

  export type RegisterInProgressUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
  }

  export type RegisterInProgressUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
  }

  export type BrandCreateInput = {
    id?: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
    itemFavorites?: ItemFavoriteBrandCreateNestedManyWithoutBrandInput
    itemLikes?: ItemLikeBrandCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
    itemFavorites?: ItemFavoriteBrandUncheckedCreateNestedManyWithoutBrandInput
    itemLikes?: ItemLikeBrandUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    itemFavorites?: ItemFavoriteBrandUpdateManyWithoutBrandNestedInput
    itemLikes?: ItemLikeBrandUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    itemFavorites?: ItemFavoriteBrandUncheckedUpdateManyWithoutBrandNestedInput
    itemLikes?: ItemLikeBrandUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateManyInput = {
    id?: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
  }

  export type BrandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
  }

  export type BrandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
  }

  export type ItemLikeClientCreateInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
    client: ClientCreateNestedOneWithoutItemLikesInput
  }

  export type ItemLikeClientUncheckedCreateInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client?: ClientUpdateOneRequiredWithoutItemLikesNestedInput
  }

  export type ItemLikeClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeClientCreateManyInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteClientCreateInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
    client: ClientCreateNestedOneWithoutItemFavoritesInput
  }

  export type ItemFavoriteClientUncheckedCreateInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    client?: ClientUpdateOneRequiredWithoutItemFavoritesNestedInput
  }

  export type ItemFavoriteClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteClientCreateManyInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeBrandCreateInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
    brand: BrandCreateNestedOneWithoutItemLikesInput
  }

  export type ItemLikeBrandUncheckedCreateInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeBrandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    brand?: BrandUpdateOneRequiredWithoutItemLikesNestedInput
  }

  export type ItemLikeBrandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeBrandCreateManyInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeBrandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeBrandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteBrandCreateInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
    brand: BrandCreateNestedOneWithoutItemFavoritesInput
  }

  export type ItemFavoriteBrandUncheckedCreateInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteBrandUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    brand?: BrandUpdateOneRequiredWithoutItemFavoritesNestedInput
  }

  export type ItemFavoriteBrandUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteBrandCreateManyInput = {
    id?: string
    userEmail: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteBrandUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteBrandUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userEmail?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ItemFavoriteClientListRelationFilter = {
    every?: ItemFavoriteClientWhereInput
    some?: ItemFavoriteClientWhereInput
    none?: ItemFavoriteClientWhereInput
  }

  export type ItemLikeClientListRelationFilter = {
    every?: ItemLikeClientWhereInput
    some?: ItemLikeClientWhereInput
    none?: ItemLikeClientWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ItemFavoriteClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemLikeClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    email?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
    preferences?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    email?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    email?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type RegisterInProgressCountOrderByAggregateInput = {
    email?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
  }

  export type RegisterInProgressMaxOrderByAggregateInput = {
    email?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
  }

  export type RegisterInProgressMinOrderByAggregateInput = {
    email?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type ItemFavoriteBrandListRelationFilter = {
    every?: ItemFavoriteBrandWhereInput
    some?: ItemFavoriteBrandWhereInput
    none?: ItemFavoriteBrandWhereInput
  }

  export type ItemLikeBrandListRelationFilter = {
    every?: ItemLikeBrandWhereInput
    some?: ItemLikeBrandWhereInput
    none?: ItemLikeBrandWhereInput
  }

  export type ItemFavoriteBrandOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemLikeBrandOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BrandCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
  }

  export type BrandMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
  }

  export type BrandMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type ClientRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type ItemLikeClientUserEmailItemUuidCompoundUniqueInput = {
    userEmail: string
    itemUuid: string
  }

  export type ItemLikeClientCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemLikeClientMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemLikeClientMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteClientUserEmailItemUuidCompoundUniqueInput = {
    userEmail: string
    itemUuid: string
  }

  export type ItemFavoriteClientCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteClientMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteClientMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type BrandRelationFilter = {
    is?: BrandWhereInput
    isNot?: BrandWhereInput
  }

  export type ItemLikeBrandUserEmailItemUuidCompoundUniqueInput = {
    userEmail: string
    itemUuid: string
  }

  export type ItemLikeBrandCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemLikeBrandMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemLikeBrandMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteBrandUserEmailItemUuidCompoundUniqueInput = {
    userEmail: string
    itemUuid: string
  }

  export type ItemFavoriteBrandCountOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteBrandMaxOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteBrandMinOrderByAggregateInput = {
    id?: SortOrder
    userEmail?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteClientCreateNestedManyWithoutClientInput = {
    create?: XOR<ItemFavoriteClientCreateWithoutClientInput, ItemFavoriteClientUncheckedCreateWithoutClientInput> | ItemFavoriteClientCreateWithoutClientInput[] | ItemFavoriteClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemFavoriteClientCreateOrConnectWithoutClientInput | ItemFavoriteClientCreateOrConnectWithoutClientInput[]
    createMany?: ItemFavoriteClientCreateManyClientInputEnvelope
    connect?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
  }

  export type ItemLikeClientCreateNestedManyWithoutClientInput = {
    create?: XOR<ItemLikeClientCreateWithoutClientInput, ItemLikeClientUncheckedCreateWithoutClientInput> | ItemLikeClientCreateWithoutClientInput[] | ItemLikeClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemLikeClientCreateOrConnectWithoutClientInput | ItemLikeClientCreateOrConnectWithoutClientInput[]
    createMany?: ItemLikeClientCreateManyClientInputEnvelope
    connect?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
  }

  export type ItemFavoriteClientUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ItemFavoriteClientCreateWithoutClientInput, ItemFavoriteClientUncheckedCreateWithoutClientInput> | ItemFavoriteClientCreateWithoutClientInput[] | ItemFavoriteClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemFavoriteClientCreateOrConnectWithoutClientInput | ItemFavoriteClientCreateOrConnectWithoutClientInput[]
    createMany?: ItemFavoriteClientCreateManyClientInputEnvelope
    connect?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
  }

  export type ItemLikeClientUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<ItemLikeClientCreateWithoutClientInput, ItemLikeClientUncheckedCreateWithoutClientInput> | ItemLikeClientCreateWithoutClientInput[] | ItemLikeClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemLikeClientCreateOrConnectWithoutClientInput | ItemLikeClientCreateOrConnectWithoutClientInput[]
    createMany?: ItemLikeClientCreateManyClientInputEnvelope
    connect?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ItemFavoriteClientUpdateManyWithoutClientNestedInput = {
    create?: XOR<ItemFavoriteClientCreateWithoutClientInput, ItemFavoriteClientUncheckedCreateWithoutClientInput> | ItemFavoriteClientCreateWithoutClientInput[] | ItemFavoriteClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemFavoriteClientCreateOrConnectWithoutClientInput | ItemFavoriteClientCreateOrConnectWithoutClientInput[]
    upsert?: ItemFavoriteClientUpsertWithWhereUniqueWithoutClientInput | ItemFavoriteClientUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ItemFavoriteClientCreateManyClientInputEnvelope
    set?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    disconnect?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    delete?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    connect?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    update?: ItemFavoriteClientUpdateWithWhereUniqueWithoutClientInput | ItemFavoriteClientUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ItemFavoriteClientUpdateManyWithWhereWithoutClientInput | ItemFavoriteClientUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ItemFavoriteClientScalarWhereInput | ItemFavoriteClientScalarWhereInput[]
  }

  export type ItemLikeClientUpdateManyWithoutClientNestedInput = {
    create?: XOR<ItemLikeClientCreateWithoutClientInput, ItemLikeClientUncheckedCreateWithoutClientInput> | ItemLikeClientCreateWithoutClientInput[] | ItemLikeClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemLikeClientCreateOrConnectWithoutClientInput | ItemLikeClientCreateOrConnectWithoutClientInput[]
    upsert?: ItemLikeClientUpsertWithWhereUniqueWithoutClientInput | ItemLikeClientUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ItemLikeClientCreateManyClientInputEnvelope
    set?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    disconnect?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    delete?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    connect?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    update?: ItemLikeClientUpdateWithWhereUniqueWithoutClientInput | ItemLikeClientUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ItemLikeClientUpdateManyWithWhereWithoutClientInput | ItemLikeClientUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ItemLikeClientScalarWhereInput | ItemLikeClientScalarWhereInput[]
  }

  export type ItemFavoriteClientUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ItemFavoriteClientCreateWithoutClientInput, ItemFavoriteClientUncheckedCreateWithoutClientInput> | ItemFavoriteClientCreateWithoutClientInput[] | ItemFavoriteClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemFavoriteClientCreateOrConnectWithoutClientInput | ItemFavoriteClientCreateOrConnectWithoutClientInput[]
    upsert?: ItemFavoriteClientUpsertWithWhereUniqueWithoutClientInput | ItemFavoriteClientUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ItemFavoriteClientCreateManyClientInputEnvelope
    set?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    disconnect?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    delete?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    connect?: ItemFavoriteClientWhereUniqueInput | ItemFavoriteClientWhereUniqueInput[]
    update?: ItemFavoriteClientUpdateWithWhereUniqueWithoutClientInput | ItemFavoriteClientUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ItemFavoriteClientUpdateManyWithWhereWithoutClientInput | ItemFavoriteClientUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ItemFavoriteClientScalarWhereInput | ItemFavoriteClientScalarWhereInput[]
  }

  export type ItemLikeClientUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<ItemLikeClientCreateWithoutClientInput, ItemLikeClientUncheckedCreateWithoutClientInput> | ItemLikeClientCreateWithoutClientInput[] | ItemLikeClientUncheckedCreateWithoutClientInput[]
    connectOrCreate?: ItemLikeClientCreateOrConnectWithoutClientInput | ItemLikeClientCreateOrConnectWithoutClientInput[]
    upsert?: ItemLikeClientUpsertWithWhereUniqueWithoutClientInput | ItemLikeClientUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: ItemLikeClientCreateManyClientInputEnvelope
    set?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    disconnect?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    delete?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    connect?: ItemLikeClientWhereUniqueInput | ItemLikeClientWhereUniqueInput[]
    update?: ItemLikeClientUpdateWithWhereUniqueWithoutClientInput | ItemLikeClientUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: ItemLikeClientUpdateManyWithWhereWithoutClientInput | ItemLikeClientUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: ItemLikeClientScalarWhereInput | ItemLikeClientScalarWhereInput[]
  }

  export type ItemFavoriteBrandCreateNestedManyWithoutBrandInput = {
    create?: XOR<ItemFavoriteBrandCreateWithoutBrandInput, ItemFavoriteBrandUncheckedCreateWithoutBrandInput> | ItemFavoriteBrandCreateWithoutBrandInput[] | ItemFavoriteBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemFavoriteBrandCreateOrConnectWithoutBrandInput | ItemFavoriteBrandCreateOrConnectWithoutBrandInput[]
    createMany?: ItemFavoriteBrandCreateManyBrandInputEnvelope
    connect?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
  }

  export type ItemLikeBrandCreateNestedManyWithoutBrandInput = {
    create?: XOR<ItemLikeBrandCreateWithoutBrandInput, ItemLikeBrandUncheckedCreateWithoutBrandInput> | ItemLikeBrandCreateWithoutBrandInput[] | ItemLikeBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemLikeBrandCreateOrConnectWithoutBrandInput | ItemLikeBrandCreateOrConnectWithoutBrandInput[]
    createMany?: ItemLikeBrandCreateManyBrandInputEnvelope
    connect?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
  }

  export type ItemFavoriteBrandUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<ItemFavoriteBrandCreateWithoutBrandInput, ItemFavoriteBrandUncheckedCreateWithoutBrandInput> | ItemFavoriteBrandCreateWithoutBrandInput[] | ItemFavoriteBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemFavoriteBrandCreateOrConnectWithoutBrandInput | ItemFavoriteBrandCreateOrConnectWithoutBrandInput[]
    createMany?: ItemFavoriteBrandCreateManyBrandInputEnvelope
    connect?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
  }

  export type ItemLikeBrandUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<ItemLikeBrandCreateWithoutBrandInput, ItemLikeBrandUncheckedCreateWithoutBrandInput> | ItemLikeBrandCreateWithoutBrandInput[] | ItemLikeBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemLikeBrandCreateOrConnectWithoutBrandInput | ItemLikeBrandCreateOrConnectWithoutBrandInput[]
    createMany?: ItemLikeBrandCreateManyBrandInputEnvelope
    connect?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
  }

  export type ItemFavoriteBrandUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ItemFavoriteBrandCreateWithoutBrandInput, ItemFavoriteBrandUncheckedCreateWithoutBrandInput> | ItemFavoriteBrandCreateWithoutBrandInput[] | ItemFavoriteBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemFavoriteBrandCreateOrConnectWithoutBrandInput | ItemFavoriteBrandCreateOrConnectWithoutBrandInput[]
    upsert?: ItemFavoriteBrandUpsertWithWhereUniqueWithoutBrandInput | ItemFavoriteBrandUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ItemFavoriteBrandCreateManyBrandInputEnvelope
    set?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    disconnect?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    delete?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    connect?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    update?: ItemFavoriteBrandUpdateWithWhereUniqueWithoutBrandInput | ItemFavoriteBrandUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ItemFavoriteBrandUpdateManyWithWhereWithoutBrandInput | ItemFavoriteBrandUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ItemFavoriteBrandScalarWhereInput | ItemFavoriteBrandScalarWhereInput[]
  }

  export type ItemLikeBrandUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ItemLikeBrandCreateWithoutBrandInput, ItemLikeBrandUncheckedCreateWithoutBrandInput> | ItemLikeBrandCreateWithoutBrandInput[] | ItemLikeBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemLikeBrandCreateOrConnectWithoutBrandInput | ItemLikeBrandCreateOrConnectWithoutBrandInput[]
    upsert?: ItemLikeBrandUpsertWithWhereUniqueWithoutBrandInput | ItemLikeBrandUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ItemLikeBrandCreateManyBrandInputEnvelope
    set?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    disconnect?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    delete?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    connect?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    update?: ItemLikeBrandUpdateWithWhereUniqueWithoutBrandInput | ItemLikeBrandUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ItemLikeBrandUpdateManyWithWhereWithoutBrandInput | ItemLikeBrandUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ItemLikeBrandScalarWhereInput | ItemLikeBrandScalarWhereInput[]
  }

  export type ItemFavoriteBrandUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ItemFavoriteBrandCreateWithoutBrandInput, ItemFavoriteBrandUncheckedCreateWithoutBrandInput> | ItemFavoriteBrandCreateWithoutBrandInput[] | ItemFavoriteBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemFavoriteBrandCreateOrConnectWithoutBrandInput | ItemFavoriteBrandCreateOrConnectWithoutBrandInput[]
    upsert?: ItemFavoriteBrandUpsertWithWhereUniqueWithoutBrandInput | ItemFavoriteBrandUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ItemFavoriteBrandCreateManyBrandInputEnvelope
    set?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    disconnect?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    delete?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    connect?: ItemFavoriteBrandWhereUniqueInput | ItemFavoriteBrandWhereUniqueInput[]
    update?: ItemFavoriteBrandUpdateWithWhereUniqueWithoutBrandInput | ItemFavoriteBrandUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ItemFavoriteBrandUpdateManyWithWhereWithoutBrandInput | ItemFavoriteBrandUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ItemFavoriteBrandScalarWhereInput | ItemFavoriteBrandScalarWhereInput[]
  }

  export type ItemLikeBrandUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ItemLikeBrandCreateWithoutBrandInput, ItemLikeBrandUncheckedCreateWithoutBrandInput> | ItemLikeBrandCreateWithoutBrandInput[] | ItemLikeBrandUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemLikeBrandCreateOrConnectWithoutBrandInput | ItemLikeBrandCreateOrConnectWithoutBrandInput[]
    upsert?: ItemLikeBrandUpsertWithWhereUniqueWithoutBrandInput | ItemLikeBrandUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ItemLikeBrandCreateManyBrandInputEnvelope
    set?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    disconnect?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    delete?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    connect?: ItemLikeBrandWhereUniqueInput | ItemLikeBrandWhereUniqueInput[]
    update?: ItemLikeBrandUpdateWithWhereUniqueWithoutBrandInput | ItemLikeBrandUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ItemLikeBrandUpdateManyWithWhereWithoutBrandInput | ItemLikeBrandUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ItemLikeBrandScalarWhereInput | ItemLikeBrandScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutItemLikesInput = {
    create?: XOR<ClientCreateWithoutItemLikesInput, ClientUncheckedCreateWithoutItemLikesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutItemLikesInput
    connect?: ClientWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutItemLikesNestedInput = {
    create?: XOR<ClientCreateWithoutItemLikesInput, ClientUncheckedCreateWithoutItemLikesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutItemLikesInput
    upsert?: ClientUpsertWithoutItemLikesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutItemLikesInput, ClientUpdateWithoutItemLikesInput>, ClientUncheckedUpdateWithoutItemLikesInput>
  }

  export type ClientCreateNestedOneWithoutItemFavoritesInput = {
    create?: XOR<ClientCreateWithoutItemFavoritesInput, ClientUncheckedCreateWithoutItemFavoritesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutItemFavoritesInput
    connect?: ClientWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutItemFavoritesNestedInput = {
    create?: XOR<ClientCreateWithoutItemFavoritesInput, ClientUncheckedCreateWithoutItemFavoritesInput>
    connectOrCreate?: ClientCreateOrConnectWithoutItemFavoritesInput
    upsert?: ClientUpsertWithoutItemFavoritesInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutItemFavoritesInput, ClientUpdateWithoutItemFavoritesInput>, ClientUncheckedUpdateWithoutItemFavoritesInput>
  }

  export type BrandCreateNestedOneWithoutItemLikesInput = {
    create?: XOR<BrandCreateWithoutItemLikesInput, BrandUncheckedCreateWithoutItemLikesInput>
    connectOrCreate?: BrandCreateOrConnectWithoutItemLikesInput
    connect?: BrandWhereUniqueInput
  }

  export type BrandUpdateOneRequiredWithoutItemLikesNestedInput = {
    create?: XOR<BrandCreateWithoutItemLikesInput, BrandUncheckedCreateWithoutItemLikesInput>
    connectOrCreate?: BrandCreateOrConnectWithoutItemLikesInput
    upsert?: BrandUpsertWithoutItemLikesInput
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutItemLikesInput, BrandUpdateWithoutItemLikesInput>, BrandUncheckedUpdateWithoutItemLikesInput>
  }

  export type BrandCreateNestedOneWithoutItemFavoritesInput = {
    create?: XOR<BrandCreateWithoutItemFavoritesInput, BrandUncheckedCreateWithoutItemFavoritesInput>
    connectOrCreate?: BrandCreateOrConnectWithoutItemFavoritesInput
    connect?: BrandWhereUniqueInput
  }

  export type BrandUpdateOneRequiredWithoutItemFavoritesNestedInput = {
    create?: XOR<BrandCreateWithoutItemFavoritesInput, BrandUncheckedCreateWithoutItemFavoritesInput>
    connectOrCreate?: BrandCreateOrConnectWithoutItemFavoritesInput
    upsert?: BrandUpsertWithoutItemFavoritesInput
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutItemFavoritesInput, BrandUpdateWithoutItemFavoritesInput>, BrandUncheckedUpdateWithoutItemFavoritesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type ItemFavoriteClientCreateWithoutClientInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteClientUncheckedCreateWithoutClientInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteClientCreateOrConnectWithoutClientInput = {
    where: ItemFavoriteClientWhereUniqueInput
    create: XOR<ItemFavoriteClientCreateWithoutClientInput, ItemFavoriteClientUncheckedCreateWithoutClientInput>
  }

  export type ItemFavoriteClientCreateManyClientInputEnvelope = {
    data: ItemFavoriteClientCreateManyClientInput | ItemFavoriteClientCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ItemLikeClientCreateWithoutClientInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeClientUncheckedCreateWithoutClientInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeClientCreateOrConnectWithoutClientInput = {
    where: ItemLikeClientWhereUniqueInput
    create: XOR<ItemLikeClientCreateWithoutClientInput, ItemLikeClientUncheckedCreateWithoutClientInput>
  }

  export type ItemLikeClientCreateManyClientInputEnvelope = {
    data: ItemLikeClientCreateManyClientInput | ItemLikeClientCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type ItemFavoriteClientUpsertWithWhereUniqueWithoutClientInput = {
    where: ItemFavoriteClientWhereUniqueInput
    update: XOR<ItemFavoriteClientUpdateWithoutClientInput, ItemFavoriteClientUncheckedUpdateWithoutClientInput>
    create: XOR<ItemFavoriteClientCreateWithoutClientInput, ItemFavoriteClientUncheckedCreateWithoutClientInput>
  }

  export type ItemFavoriteClientUpdateWithWhereUniqueWithoutClientInput = {
    where: ItemFavoriteClientWhereUniqueInput
    data: XOR<ItemFavoriteClientUpdateWithoutClientInput, ItemFavoriteClientUncheckedUpdateWithoutClientInput>
  }

  export type ItemFavoriteClientUpdateManyWithWhereWithoutClientInput = {
    where: ItemFavoriteClientScalarWhereInput
    data: XOR<ItemFavoriteClientUpdateManyMutationInput, ItemFavoriteClientUncheckedUpdateManyWithoutClientInput>
  }

  export type ItemFavoriteClientScalarWhereInput = {
    AND?: ItemFavoriteClientScalarWhereInput | ItemFavoriteClientScalarWhereInput[]
    OR?: ItemFavoriteClientScalarWhereInput[]
    NOT?: ItemFavoriteClientScalarWhereInput | ItemFavoriteClientScalarWhereInput[]
    id?: UuidFilter<"ItemFavoriteClient"> | string
    userEmail?: StringFilter<"ItemFavoriteClient"> | string
    itemUuid?: StringFilter<"ItemFavoriteClient"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavoriteClient"> | Date | string | null
  }

  export type ItemLikeClientUpsertWithWhereUniqueWithoutClientInput = {
    where: ItemLikeClientWhereUniqueInput
    update: XOR<ItemLikeClientUpdateWithoutClientInput, ItemLikeClientUncheckedUpdateWithoutClientInput>
    create: XOR<ItemLikeClientCreateWithoutClientInput, ItemLikeClientUncheckedCreateWithoutClientInput>
  }

  export type ItemLikeClientUpdateWithWhereUniqueWithoutClientInput = {
    where: ItemLikeClientWhereUniqueInput
    data: XOR<ItemLikeClientUpdateWithoutClientInput, ItemLikeClientUncheckedUpdateWithoutClientInput>
  }

  export type ItemLikeClientUpdateManyWithWhereWithoutClientInput = {
    where: ItemLikeClientScalarWhereInput
    data: XOR<ItemLikeClientUpdateManyMutationInput, ItemLikeClientUncheckedUpdateManyWithoutClientInput>
  }

  export type ItemLikeClientScalarWhereInput = {
    AND?: ItemLikeClientScalarWhereInput | ItemLikeClientScalarWhereInput[]
    OR?: ItemLikeClientScalarWhereInput[]
    NOT?: ItemLikeClientScalarWhereInput | ItemLikeClientScalarWhereInput[]
    id?: UuidFilter<"ItemLikeClient"> | string
    userEmail?: StringFilter<"ItemLikeClient"> | string
    itemUuid?: StringFilter<"ItemLikeClient"> | string
    createdAt?: DateTimeNullableFilter<"ItemLikeClient"> | Date | string | null
  }

  export type ItemFavoriteBrandCreateWithoutBrandInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteBrandUncheckedCreateWithoutBrandInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteBrandCreateOrConnectWithoutBrandInput = {
    where: ItemFavoriteBrandWhereUniqueInput
    create: XOR<ItemFavoriteBrandCreateWithoutBrandInput, ItemFavoriteBrandUncheckedCreateWithoutBrandInput>
  }

  export type ItemFavoriteBrandCreateManyBrandInputEnvelope = {
    data: ItemFavoriteBrandCreateManyBrandInput | ItemFavoriteBrandCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type ItemLikeBrandCreateWithoutBrandInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeBrandUncheckedCreateWithoutBrandInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeBrandCreateOrConnectWithoutBrandInput = {
    where: ItemLikeBrandWhereUniqueInput
    create: XOR<ItemLikeBrandCreateWithoutBrandInput, ItemLikeBrandUncheckedCreateWithoutBrandInput>
  }

  export type ItemLikeBrandCreateManyBrandInputEnvelope = {
    data: ItemLikeBrandCreateManyBrandInput | ItemLikeBrandCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type ItemFavoriteBrandUpsertWithWhereUniqueWithoutBrandInput = {
    where: ItemFavoriteBrandWhereUniqueInput
    update: XOR<ItemFavoriteBrandUpdateWithoutBrandInput, ItemFavoriteBrandUncheckedUpdateWithoutBrandInput>
    create: XOR<ItemFavoriteBrandCreateWithoutBrandInput, ItemFavoriteBrandUncheckedCreateWithoutBrandInput>
  }

  export type ItemFavoriteBrandUpdateWithWhereUniqueWithoutBrandInput = {
    where: ItemFavoriteBrandWhereUniqueInput
    data: XOR<ItemFavoriteBrandUpdateWithoutBrandInput, ItemFavoriteBrandUncheckedUpdateWithoutBrandInput>
  }

  export type ItemFavoriteBrandUpdateManyWithWhereWithoutBrandInput = {
    where: ItemFavoriteBrandScalarWhereInput
    data: XOR<ItemFavoriteBrandUpdateManyMutationInput, ItemFavoriteBrandUncheckedUpdateManyWithoutBrandInput>
  }

  export type ItemFavoriteBrandScalarWhereInput = {
    AND?: ItemFavoriteBrandScalarWhereInput | ItemFavoriteBrandScalarWhereInput[]
    OR?: ItemFavoriteBrandScalarWhereInput[]
    NOT?: ItemFavoriteBrandScalarWhereInput | ItemFavoriteBrandScalarWhereInput[]
    id?: UuidFilter<"ItemFavoriteBrand"> | string
    userEmail?: StringFilter<"ItemFavoriteBrand"> | string
    itemUuid?: StringFilter<"ItemFavoriteBrand"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavoriteBrand"> | Date | string | null
  }

  export type ItemLikeBrandUpsertWithWhereUniqueWithoutBrandInput = {
    where: ItemLikeBrandWhereUniqueInput
    update: XOR<ItemLikeBrandUpdateWithoutBrandInput, ItemLikeBrandUncheckedUpdateWithoutBrandInput>
    create: XOR<ItemLikeBrandCreateWithoutBrandInput, ItemLikeBrandUncheckedCreateWithoutBrandInput>
  }

  export type ItemLikeBrandUpdateWithWhereUniqueWithoutBrandInput = {
    where: ItemLikeBrandWhereUniqueInput
    data: XOR<ItemLikeBrandUpdateWithoutBrandInput, ItemLikeBrandUncheckedUpdateWithoutBrandInput>
  }

  export type ItemLikeBrandUpdateManyWithWhereWithoutBrandInput = {
    where: ItemLikeBrandScalarWhereInput
    data: XOR<ItemLikeBrandUpdateManyMutationInput, ItemLikeBrandUncheckedUpdateManyWithoutBrandInput>
  }

  export type ItemLikeBrandScalarWhereInput = {
    AND?: ItemLikeBrandScalarWhereInput | ItemLikeBrandScalarWhereInput[]
    OR?: ItemLikeBrandScalarWhereInput[]
    NOT?: ItemLikeBrandScalarWhereInput | ItemLikeBrandScalarWhereInput[]
    id?: UuidFilter<"ItemLikeBrand"> | string
    userEmail?: StringFilter<"ItemLikeBrand"> | string
    itemUuid?: StringFilter<"ItemLikeBrand"> | string
    createdAt?: DateTimeNullableFilter<"ItemLikeBrand"> | Date | string | null
  }

  export type ClientCreateWithoutItemLikesInput = {
    email: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutItemLikesInput = {
    email: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutItemLikesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutItemLikesInput, ClientUncheckedCreateWithoutItemLikesInput>
  }

  export type ClientUpsertWithoutItemLikesInput = {
    update: XOR<ClientUpdateWithoutItemLikesInput, ClientUncheckedUpdateWithoutItemLikesInput>
    create: XOR<ClientCreateWithoutItemLikesInput, ClientUncheckedCreateWithoutItemLikesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutItemLikesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutItemLikesInput, ClientUncheckedUpdateWithoutItemLikesInput>
  }

  export type ClientUpdateWithoutItemLikesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutItemLikesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemFavorites?: ItemFavoriteClientUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateWithoutItemFavoritesInput = {
    email: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemLikes?: ItemLikeClientCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutItemFavoritesInput = {
    email: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemLikes?: ItemLikeClientUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutItemFavoritesInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutItemFavoritesInput, ClientUncheckedCreateWithoutItemFavoritesInput>
  }

  export type ClientUpsertWithoutItemFavoritesInput = {
    update: XOR<ClientUpdateWithoutItemFavoritesInput, ClientUncheckedUpdateWithoutItemFavoritesInput>
    create: XOR<ClientCreateWithoutItemFavoritesInput, ClientUncheckedCreateWithoutItemFavoritesInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutItemFavoritesInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutItemFavoritesInput, ClientUncheckedUpdateWithoutItemFavoritesInput>
  }

  export type ClientUpdateWithoutItemFavoritesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemLikes?: ItemLikeClientUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutItemFavoritesInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    itemLikes?: ItemLikeClientUncheckedUpdateManyWithoutClientNestedInput
  }

  export type BrandCreateWithoutItemLikesInput = {
    id?: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
    itemFavorites?: ItemFavoriteBrandCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutItemLikesInput = {
    id?: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
    itemFavorites?: ItemFavoriteBrandUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutItemLikesInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutItemLikesInput, BrandUncheckedCreateWithoutItemLikesInput>
  }

  export type BrandUpsertWithoutItemLikesInput = {
    update: XOR<BrandUpdateWithoutItemLikesInput, BrandUncheckedUpdateWithoutItemLikesInput>
    create: XOR<BrandCreateWithoutItemLikesInput, BrandUncheckedCreateWithoutItemLikesInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutItemLikesInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutItemLikesInput, BrandUncheckedUpdateWithoutItemLikesInput>
  }

  export type BrandUpdateWithoutItemLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    itemFavorites?: ItemFavoriteBrandUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutItemLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    itemFavorites?: ItemFavoriteBrandUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateWithoutItemFavoritesInput = {
    id?: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
    itemLikes?: ItemLikeBrandCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutItemFavoritesInput = {
    id?: string
    email: string
    name: string
    description: string
    url: string
    logoUrl: string
    itemLikes?: ItemLikeBrandUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutItemFavoritesInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutItemFavoritesInput, BrandUncheckedCreateWithoutItemFavoritesInput>
  }

  export type BrandUpsertWithoutItemFavoritesInput = {
    update: XOR<BrandUpdateWithoutItemFavoritesInput, BrandUncheckedUpdateWithoutItemFavoritesInput>
    create: XOR<BrandCreateWithoutItemFavoritesInput, BrandUncheckedCreateWithoutItemFavoritesInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutItemFavoritesInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutItemFavoritesInput, BrandUncheckedUpdateWithoutItemFavoritesInput>
  }

  export type BrandUpdateWithoutItemFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    itemLikes?: ItemLikeBrandUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutItemFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: StringFieldUpdateOperationsInput | string
    itemLikes?: ItemLikeBrandUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type ItemFavoriteClientCreateManyClientInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeClientCreateManyClientInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteClientUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteClientUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteClientUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeClientUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeClientUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeClientUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteBrandCreateManyBrandInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeBrandCreateManyBrandInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteBrandUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteBrandUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteBrandUncheckedUpdateManyWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeBrandUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeBrandUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeBrandUncheckedUpdateManyWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}