
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
 * Model Brand
 * 
 */
export type Brand = $Result.DefaultSelection<Prisma.$BrandPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model ItemFavorite
 * 
 */
export type ItemFavorite = $Result.DefaultSelection<Prisma.$ItemFavoritePayload>
/**
 * Model ItemLike
 * 
 */
export type ItemLike = $Result.DefaultSelection<Prisma.$ItemLikePayload>
/**
 * Model RegisterInProgress
 * 
 */
export type RegisterInProgress = $Result.DefaultSelection<Prisma.$RegisterInProgressPayload>
/**
 * Model ResetPasswordInProgress
 * 
 */
export type ResetPasswordInProgress = $Result.DefaultSelection<Prisma.$ResetPasswordInProgressPayload>
/**
 * Model InspoItems
 * 
 */
export type InspoItems = $Result.DefaultSelection<Prisma.$InspoItemsPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model Files
 * 
 */
export type Files = $Result.DefaultSelection<Prisma.$FilesPayload>
/**
 * Model account
 * 
 */
export type account = $Result.DefaultSelection<Prisma.$accountPayload>
/**
 * Model session
 * 
 */
export type session = $Result.DefaultSelection<Prisma.$sessionPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model verification
 * 
 */
export type verification = $Result.DefaultSelection<Prisma.$verificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Brands
 * const brands = await prisma.brand.findMany()
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
   * // Fetch zero or more Brands
   * const brands = await prisma.brand.findMany()
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
   * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Brands
    * const brands = await prisma.brand.findMany()
    * ```
    */
  get brand(): Prisma.BrandDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.itemFavorite`: Exposes CRUD operations for the **ItemFavorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemFavorites
    * const itemFavorites = await prisma.itemFavorite.findMany()
    * ```
    */
  get itemFavorite(): Prisma.ItemFavoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemLike`: Exposes CRUD operations for the **ItemLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemLikes
    * const itemLikes = await prisma.itemLike.findMany()
    * ```
    */
  get itemLike(): Prisma.ItemLikeDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.resetPasswordInProgress`: Exposes CRUD operations for the **ResetPasswordInProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ResetPasswordInProgresses
    * const resetPasswordInProgresses = await prisma.resetPasswordInProgress.findMany()
    * ```
    */
  get resetPasswordInProgress(): Prisma.ResetPasswordInProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inspoItems`: Exposes CRUD operations for the **InspoItems** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InspoItems
    * const inspoItems = await prisma.inspoItems.findMany()
    * ```
    */
  get inspoItems(): Prisma.InspoItemsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.files`: Exposes CRUD operations for the **Files** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.files.findMany()
    * ```
    */
  get files(): Prisma.FilesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.accountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.sessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.verificationDelegate<ExtArgs, ClientOptions>;
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
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
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
    Brand: 'Brand',
    Client: 'Client',
    ItemFavorite: 'ItemFavorite',
    ItemLike: 'ItemLike',
    RegisterInProgress: 'RegisterInProgress',
    ResetPasswordInProgress: 'ResetPasswordInProgress',
    InspoItems: 'InspoItems',
    Item: 'Item',
    Files: 'Files',
    account: 'account',
    session: 'session',
    user: 'user',
    verification: 'verification'
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
      modelProps: "brand" | "client" | "itemFavorite" | "itemLike" | "registerInProgress" | "resetPasswordInProgress" | "inspoItems" | "item" | "files" | "account" | "session" | "user" | "verification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
          updateManyAndReturn: {
            args: Prisma.BrandUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BrandPayload>[]
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
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
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
      ItemFavorite: {
        payload: Prisma.$ItemFavoritePayload<ExtArgs>
        fields: Prisma.ItemFavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>
          }
          findFirst: {
            args: Prisma.ItemFavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>
          }
          findMany: {
            args: Prisma.ItemFavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>[]
          }
          create: {
            args: Prisma.ItemFavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>
          }
          createMany: {
            args: Prisma.ItemFavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemFavoriteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>[]
          }
          delete: {
            args: Prisma.ItemFavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>
          }
          update: {
            args: Prisma.ItemFavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>
          }
          deleteMany: {
            args: Prisma.ItemFavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemFavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemFavoriteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>[]
          }
          upsert: {
            args: Prisma.ItemFavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFavoritePayload>
          }
          aggregate: {
            args: Prisma.ItemFavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemFavorite>
          }
          groupBy: {
            args: Prisma.ItemFavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemFavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemFavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<ItemFavoriteCountAggregateOutputType> | number
          }
        }
      }
      ItemLike: {
        payload: Prisma.$ItemLikePayload<ExtArgs>
        fields: Prisma.ItemLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>
          }
          findFirst: {
            args: Prisma.ItemLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>
          }
          findMany: {
            args: Prisma.ItemLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>[]
          }
          create: {
            args: Prisma.ItemLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>
          }
          createMany: {
            args: Prisma.ItemLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>[]
          }
          delete: {
            args: Prisma.ItemLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>
          }
          update: {
            args: Prisma.ItemLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>
          }
          deleteMany: {
            args: Prisma.ItemLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>[]
          }
          upsert: {
            args: Prisma.ItemLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemLikePayload>
          }
          aggregate: {
            args: Prisma.ItemLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemLike>
          }
          groupBy: {
            args: Prisma.ItemLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemLikeCountArgs<ExtArgs>
            result: $Utils.Optional<ItemLikeCountAggregateOutputType> | number
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
          updateManyAndReturn: {
            args: Prisma.RegisterInProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegisterInProgressPayload>[]
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
      ResetPasswordInProgress: {
        payload: Prisma.$ResetPasswordInProgressPayload<ExtArgs>
        fields: Prisma.ResetPasswordInProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResetPasswordInProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResetPasswordInProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>
          }
          findFirst: {
            args: Prisma.ResetPasswordInProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResetPasswordInProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>
          }
          findMany: {
            args: Prisma.ResetPasswordInProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>[]
          }
          create: {
            args: Prisma.ResetPasswordInProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>
          }
          createMany: {
            args: Prisma.ResetPasswordInProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResetPasswordInProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>[]
          }
          delete: {
            args: Prisma.ResetPasswordInProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>
          }
          update: {
            args: Prisma.ResetPasswordInProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>
          }
          deleteMany: {
            args: Prisma.ResetPasswordInProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResetPasswordInProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResetPasswordInProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>[]
          }
          upsert: {
            args: Prisma.ResetPasswordInProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResetPasswordInProgressPayload>
          }
          aggregate: {
            args: Prisma.ResetPasswordInProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResetPasswordInProgress>
          }
          groupBy: {
            args: Prisma.ResetPasswordInProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResetPasswordInProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResetPasswordInProgressCountArgs<ExtArgs>
            result: $Utils.Optional<ResetPasswordInProgressCountAggregateOutputType> | number
          }
        }
      }
      InspoItems: {
        payload: Prisma.$InspoItemsPayload<ExtArgs>
        fields: Prisma.InspoItemsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InspoItemsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InspoItemsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>
          }
          findFirst: {
            args: Prisma.InspoItemsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InspoItemsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>
          }
          findMany: {
            args: Prisma.InspoItemsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>[]
          }
          create: {
            args: Prisma.InspoItemsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>
          }
          createMany: {
            args: Prisma.InspoItemsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InspoItemsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>[]
          }
          delete: {
            args: Prisma.InspoItemsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>
          }
          update: {
            args: Prisma.InspoItemsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>
          }
          deleteMany: {
            args: Prisma.InspoItemsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InspoItemsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InspoItemsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>[]
          }
          upsert: {
            args: Prisma.InspoItemsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InspoItemsPayload>
          }
          aggregate: {
            args: Prisma.InspoItemsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInspoItems>
          }
          groupBy: {
            args: Prisma.InspoItemsGroupByArgs<ExtArgs>
            result: $Utils.Optional<InspoItemsGroupByOutputType>[]
          }
          count: {
            args: Prisma.InspoItemsCountArgs<ExtArgs>
            result: $Utils.Optional<InspoItemsCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      Files: {
        payload: Prisma.$FilesPayload<ExtArgs>
        fields: Prisma.FilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>
          }
          findFirst: {
            args: Prisma.FilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>
          }
          findMany: {
            args: Prisma.FilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>[]
          }
          create: {
            args: Prisma.FilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>
          }
          createMany: {
            args: Prisma.FilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>[]
          }
          delete: {
            args: Prisma.FilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>
          }
          update: {
            args: Prisma.FilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>
          }
          deleteMany: {
            args: Prisma.FilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FilesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>[]
          }
          upsert: {
            args: Prisma.FilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilesPayload>
          }
          aggregate: {
            args: Prisma.FilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFiles>
          }
          groupBy: {
            args: Prisma.FilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<FilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.FilesCountArgs<ExtArgs>
            result: $Utils.Optional<FilesCountAggregateOutputType> | number
          }
        }
      }
      account: {
        payload: Prisma.$accountPayload<ExtArgs>
        fields: Prisma.accountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.accountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.accountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          findFirst: {
            args: Prisma.accountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.accountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          findMany: {
            args: Prisma.accountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>[]
          }
          create: {
            args: Prisma.accountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          createMany: {
            args: Prisma.accountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.accountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>[]
          }
          delete: {
            args: Prisma.accountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          update: {
            args: Prisma.accountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          deleteMany: {
            args: Prisma.accountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.accountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.accountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>[]
          }
          upsert: {
            args: Prisma.accountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.accountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.accountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      session: {
        payload: Prisma.$sessionPayload<ExtArgs>
        fields: Prisma.sessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findFirst: {
            args: Prisma.sessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findMany: {
            args: Prisma.sessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          create: {
            args: Prisma.sessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          createMany: {
            args: Prisma.sessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.sessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          delete: {
            args: Prisma.sessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          update: {
            args: Prisma.sessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          deleteMany: {
            args: Prisma.sessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.sessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          upsert: {
            args: Prisma.sessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.sessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.sessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      verification: {
        payload: Prisma.$verificationPayload<ExtArgs>
        fields: Prisma.verificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.verificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.verificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          findFirst: {
            args: Prisma.verificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.verificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          findMany: {
            args: Prisma.verificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>[]
          }
          create: {
            args: Prisma.verificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          createMany: {
            args: Prisma.verificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.verificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>[]
          }
          delete: {
            args: Prisma.verificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          update: {
            args: Prisma.verificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          deleteMany: {
            args: Prisma.verificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.verificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.verificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>[]
          }
          upsert: {
            args: Prisma.verificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.verificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.verificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
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
    brand?: BrandOmit
    client?: ClientOmit
    itemFavorite?: ItemFavoriteOmit
    itemLike?: ItemLikeOmit
    registerInProgress?: RegisterInProgressOmit
    resetPasswordInProgress?: ResetPasswordInProgressOmit
    inspoItems?: InspoItemsOmit
    item?: ItemOmit
    files?: FilesOmit
    account?: accountOmit
    session?: sessionOmit
    user?: userOmit
    verification?: verificationOmit
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
   * Count Type BrandCountOutputType
   */

  export type BrandCountOutputType = {
    item: number
  }

  export type BrandCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | BrandCountOutputTypeCountItemArgs
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
  export type BrandCountOutputTypeCountItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    favorites: number
    likes: number
    inspoItems: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    favorites?: boolean | ItemCountOutputTypeCountFavoritesArgs
    likes?: boolean | ItemCountOutputTypeCountLikesArgs
    inspoItems?: boolean | ItemCountOutputTypeCountInspoItemsArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFavoriteWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemLikeWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountInspoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InspoItemsWhereInput
  }


  /**
   * Count Type FilesCountOutputType
   */

  export type FilesCountOutputType = {
    brand: number
    item: number
  }

  export type FilesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | FilesCountOutputTypeCountBrandArgs
    item?: boolean | FilesCountOutputTypeCountItemArgs
  }

  // Custom InputTypes
  /**
   * FilesCountOutputType without action
   */
  export type FilesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FilesCountOutputType
     */
    select?: FilesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FilesCountOutputType without action
   */
  export type FilesCountOutputTypeCountBrandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BrandWhereInput
  }

  /**
   * FilesCountOutputType without action
   */
  export type FilesCountOutputTypeCountItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    account: number
    session: number
    itemFavorites: number
    itemLikes: number
    RegisterInProgress: number
    ResetPasswordInProgress: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | UserCountOutputTypeCountAccountArgs
    session?: boolean | UserCountOutputTypeCountSessionArgs
    itemFavorites?: boolean | UserCountOutputTypeCountItemFavoritesArgs
    itemLikes?: boolean | UserCountOutputTypeCountItemLikesArgs
    RegisterInProgress?: boolean | UserCountOutputTypeCountRegisterInProgressArgs
    ResetPasswordInProgress?: boolean | UserCountOutputTypeCountResetPasswordInProgressArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: accountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFavoriteWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItemLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRegisterInProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegisterInProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountResetPasswordInProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetPasswordInProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Brand
   */

  export type AggregateBrand = {
    _count: BrandCountAggregateOutputType | null
    _min: BrandMinAggregateOutputType | null
    _max: BrandMaxAggregateOutputType | null
  }

  export type BrandMinAggregateOutputType = {
    userId: string | null
    name: string | null
    description: string | null
    url: string | null
    logoId: string | null
  }

  export type BrandMaxAggregateOutputType = {
    userId: string | null
    name: string | null
    description: string | null
    url: string | null
    logoId: string | null
  }

  export type BrandCountAggregateOutputType = {
    userId: number
    name: number
    description: number
    url: number
    logoId: number
    _all: number
  }


  export type BrandMinAggregateInputType = {
    userId?: true
    name?: true
    description?: true
    url?: true
    logoId?: true
  }

  export type BrandMaxAggregateInputType = {
    userId?: true
    name?: true
    description?: true
    url?: true
    logoId?: true
  }

  export type BrandCountAggregateInputType = {
    userId?: true
    name?: true
    description?: true
    url?: true
    logoId?: true
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
    userId: string
    name: string
    description: string
    url: string
    logoId: string
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
    userId?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    logoId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | Brand$itemArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>

  export type BrandSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    logoId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>

  export type BrandSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    logoId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brand"]>

  export type BrandSelectScalar = {
    userId?: boolean
    name?: boolean
    description?: boolean
    url?: boolean
    logoId?: boolean
  }

  export type BrandOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "name" | "description" | "url" | "logoId", ExtArgs["result"]["brand"]>
  export type BrandInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | Brand$itemArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
    _count?: boolean | BrandCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BrandIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }
  export type BrandIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }

  export type $BrandPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Brand"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>[]
      files: Prisma.$FilesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      name: string
      description: string
      url: string
      logoId: string
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
     * // Only select the `userId`
     * const brandWithUserIdOnly = await prisma.brand.findMany({ select: { userId: true } })
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
     * // Create many Brands and only return the `userId`
     * const brandWithUserIdOnly = await prisma.brand.createManyAndReturn({
     *   select: { userId: true },
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
     * Update zero or more Brands and returns the data updated in the database.
     * @param {BrandUpdateManyAndReturnArgs} args - Arguments to update many Brands.
     * @example
     * // Update many Brands
     * const brand = await prisma.brand.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Brands and only return the `userId`
     * const brandWithUserIdOnly = await prisma.brand.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BrandUpdateManyAndReturnArgs>(args: SelectSubset<T, BrandUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends Brand$itemArgs<ExtArgs> = {}>(args?: Subset<T, Brand$itemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    files<T extends FilesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FilesDefaultArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly userId: FieldRef<"Brand", 'String'>
    readonly name: FieldRef<"Brand", 'String'>
    readonly description: FieldRef<"Brand", 'String'>
    readonly url: FieldRef<"Brand", 'String'>
    readonly logoId: FieldRef<"Brand", 'String'>
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandIncludeCreateManyAndReturn<ExtArgs> | null
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
    /**
     * Limit how many Brands to update.
     */
    limit?: number
  }

  /**
   * Brand updateManyAndReturn
   */
  export type BrandUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brand
     */
    select?: BrandSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Brand
     */
    omit?: BrandOmit<ExtArgs> | null
    /**
     * The data used to update Brands.
     */
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyInput>
    /**
     * Filter which Brands to update
     */
    where?: BrandWhereInput
    /**
     * Limit how many Brands to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BrandIncludeUpdateManyAndReturn<ExtArgs> | null
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
    /**
     * Limit how many Brands to delete.
     */
    limit?: number
  }

  /**
   * Brand.item
   */
  export type Brand$itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
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
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    userId: string | null
    name: string | null
    dateOfBirth: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    userId: string | null
    name: string | null
    dateOfBirth: Date | null
  }

  export type ClientCountAggregateOutputType = {
    userId: number
    name: number
    dateOfBirth: number
    preferences: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    userId?: true
    name?: true
    dateOfBirth?: true
  }

  export type ClientMaxAggregateInputType = {
    userId?: true
    name?: true
    dateOfBirth?: true
  }

  export type ClientCountAggregateInputType = {
    userId?: true
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
    userId: string
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
    userId?: boolean
    name?: boolean
    dateOfBirth?: boolean
    preferences?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    name?: boolean
    dateOfBirth?: boolean
    preferences?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    name?: boolean
    dateOfBirth?: boolean
    preferences?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    userId?: boolean
    name?: boolean
    dateOfBirth?: boolean
    preferences?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "name" | "dateOfBirth" | "preferences", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
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
     * // Only select the `userId`
     * const clientWithUserIdOnly = await prisma.client.findMany({ select: { userId: true } })
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
     * // Create many Clients and only return the `userId`
     * const clientWithUserIdOnly = await prisma.client.createManyAndReturn({
     *   select: { userId: true },
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
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `userId`
     * const clientWithUserIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly userId: FieldRef<"Client", 'String'>
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
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
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
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
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
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
   * Model ItemFavorite
   */

  export type AggregateItemFavorite = {
    _count: ItemFavoriteCountAggregateOutputType | null
    _min: ItemFavoriteMinAggregateOutputType | null
    _max: ItemFavoriteMaxAggregateOutputType | null
  }

  export type ItemFavoriteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemFavoriteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemFavoriteCountAggregateOutputType = {
    id: number
    userId: number
    itemUuid: number
    createdAt: number
    _all: number
  }


  export type ItemFavoriteMinAggregateInputType = {
    id?: true
    userId?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemFavoriteMaxAggregateInputType = {
    id?: true
    userId?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemFavoriteCountAggregateInputType = {
    id?: true
    userId?: true
    itemUuid?: true
    createdAt?: true
    _all?: true
  }

  export type ItemFavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFavorite to aggregate.
     */
    where?: ItemFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavorites to fetch.
     */
    orderBy?: ItemFavoriteOrderByWithRelationInput | ItemFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemFavorites
    **/
    _count?: true | ItemFavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemFavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemFavoriteMaxAggregateInputType
  }

  export type GetItemFavoriteAggregateType<T extends ItemFavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateItemFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemFavorite[P]>
      : GetScalarType<T[P], AggregateItemFavorite[P]>
  }




  export type ItemFavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFavoriteWhereInput
    orderBy?: ItemFavoriteOrderByWithAggregationInput | ItemFavoriteOrderByWithAggregationInput[]
    by: ItemFavoriteScalarFieldEnum[] | ItemFavoriteScalarFieldEnum
    having?: ItemFavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemFavoriteCountAggregateInputType | true
    _min?: ItemFavoriteMinAggregateInputType
    _max?: ItemFavoriteMaxAggregateInputType
  }

  export type ItemFavoriteGroupByOutputType = {
    id: string
    userId: string
    itemUuid: string
    createdAt: Date | null
    _count: ItemFavoriteCountAggregateOutputType | null
    _min: ItemFavoriteMinAggregateOutputType | null
    _max: ItemFavoriteMaxAggregateOutputType | null
  }

  type GetItemFavoriteGroupByPayload<T extends ItemFavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemFavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemFavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemFavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], ItemFavoriteGroupByOutputType[P]>
        }
      >
    >


  export type ItemFavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFavorite"]>

  export type ItemFavoriteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFavorite"]>

  export type ItemFavoriteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFavorite"]>

  export type ItemFavoriteSelectScalar = {
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
  }

  export type ItemFavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "itemUuid" | "createdAt", ExtArgs["result"]["itemFavorite"]>
  export type ItemFavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type ItemFavoriteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type ItemFavoriteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $ItemFavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemFavorite"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      itemUuid: string
      createdAt: Date | null
    }, ExtArgs["result"]["itemFavorite"]>
    composites: {}
  }

  type ItemFavoriteGetPayload<S extends boolean | null | undefined | ItemFavoriteDefaultArgs> = $Result.GetResult<Prisma.$ItemFavoritePayload, S>

  type ItemFavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemFavoriteCountAggregateInputType | true
    }

  export interface ItemFavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemFavorite'], meta: { name: 'ItemFavorite' } }
    /**
     * Find zero or one ItemFavorite that matches the filter.
     * @param {ItemFavoriteFindUniqueArgs} args - Arguments to find a ItemFavorite
     * @example
     * // Get one ItemFavorite
     * const itemFavorite = await prisma.itemFavorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFavoriteFindUniqueArgs>(args: SelectSubset<T, ItemFavoriteFindUniqueArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemFavorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFavoriteFindUniqueOrThrowArgs} args - Arguments to find a ItemFavorite
     * @example
     * // Get one ItemFavorite
     * const itemFavorite = await prisma.itemFavorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFavorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteFindFirstArgs} args - Arguments to find a ItemFavorite
     * @example
     * // Get one ItemFavorite
     * const itemFavorite = await prisma.itemFavorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFavoriteFindFirstArgs>(args?: SelectSubset<T, ItemFavoriteFindFirstArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFavorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteFindFirstOrThrowArgs} args - Arguments to find a ItemFavorite
     * @example
     * // Get one ItemFavorite
     * const itemFavorite = await prisma.itemFavorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemFavorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemFavorites
     * const itemFavorites = await prisma.itemFavorite.findMany()
     * 
     * // Get first 10 ItemFavorites
     * const itemFavorites = await prisma.itemFavorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemFavoriteWithIdOnly = await prisma.itemFavorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFavoriteFindManyArgs>(args?: SelectSubset<T, ItemFavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemFavorite.
     * @param {ItemFavoriteCreateArgs} args - Arguments to create a ItemFavorite.
     * @example
     * // Create one ItemFavorite
     * const ItemFavorite = await prisma.itemFavorite.create({
     *   data: {
     *     // ... data to create a ItemFavorite
     *   }
     * })
     * 
     */
    create<T extends ItemFavoriteCreateArgs>(args: SelectSubset<T, ItemFavoriteCreateArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemFavorites.
     * @param {ItemFavoriteCreateManyArgs} args - Arguments to create many ItemFavorites.
     * @example
     * // Create many ItemFavorites
     * const itemFavorite = await prisma.itemFavorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemFavoriteCreateManyArgs>(args?: SelectSubset<T, ItemFavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemFavorites and returns the data saved in the database.
     * @param {ItemFavoriteCreateManyAndReturnArgs} args - Arguments to create many ItemFavorites.
     * @example
     * // Create many ItemFavorites
     * const itemFavorite = await prisma.itemFavorite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemFavorites and only return the `id`
     * const itemFavoriteWithIdOnly = await prisma.itemFavorite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemFavoriteCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemFavoriteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemFavorite.
     * @param {ItemFavoriteDeleteArgs} args - Arguments to delete one ItemFavorite.
     * @example
     * // Delete one ItemFavorite
     * const ItemFavorite = await prisma.itemFavorite.delete({
     *   where: {
     *     // ... filter to delete one ItemFavorite
     *   }
     * })
     * 
     */
    delete<T extends ItemFavoriteDeleteArgs>(args: SelectSubset<T, ItemFavoriteDeleteArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemFavorite.
     * @param {ItemFavoriteUpdateArgs} args - Arguments to update one ItemFavorite.
     * @example
     * // Update one ItemFavorite
     * const itemFavorite = await prisma.itemFavorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemFavoriteUpdateArgs>(args: SelectSubset<T, ItemFavoriteUpdateArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemFavorites.
     * @param {ItemFavoriteDeleteManyArgs} args - Arguments to filter ItemFavorites to delete.
     * @example
     * // Delete a few ItemFavorites
     * const { count } = await prisma.itemFavorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemFavoriteDeleteManyArgs>(args?: SelectSubset<T, ItemFavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemFavorites
     * const itemFavorite = await prisma.itemFavorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemFavoriteUpdateManyArgs>(args: SelectSubset<T, ItemFavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFavorites and returns the data updated in the database.
     * @param {ItemFavoriteUpdateManyAndReturnArgs} args - Arguments to update many ItemFavorites.
     * @example
     * // Update many ItemFavorites
     * const itemFavorite = await prisma.itemFavorite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemFavorites and only return the `id`
     * const itemFavoriteWithIdOnly = await prisma.itemFavorite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemFavoriteUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemFavoriteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemFavorite.
     * @param {ItemFavoriteUpsertArgs} args - Arguments to update or create a ItemFavorite.
     * @example
     * // Update or create a ItemFavorite
     * const itemFavorite = await prisma.itemFavorite.upsert({
     *   create: {
     *     // ... data to create a ItemFavorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemFavorite we want to update
     *   }
     * })
     */
    upsert<T extends ItemFavoriteUpsertArgs>(args: SelectSubset<T, ItemFavoriteUpsertArgs<ExtArgs>>): Prisma__ItemFavoriteClient<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteCountArgs} args - Arguments to filter ItemFavorites to count.
     * @example
     * // Count the number of ItemFavorites
     * const count = await prisma.itemFavorite.count({
     *   where: {
     *     // ... the filter for the ItemFavorites we want to count
     *   }
     * })
    **/
    count<T extends ItemFavoriteCountArgs>(
      args?: Subset<T, ItemFavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemFavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ItemFavoriteAggregateArgs>(args: Subset<T, ItemFavoriteAggregateArgs>): Prisma.PrismaPromise<GetItemFavoriteAggregateType<T>>

    /**
     * Group by ItemFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFavoriteGroupByArgs} args - Group by arguments.
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
      T extends ItemFavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemFavoriteGroupByArgs['orderBy'] }
        : { orderBy?: ItemFavoriteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ItemFavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemFavorite model
   */
  readonly fields: ItemFavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemFavorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemFavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ItemFavorite model
   */
  interface ItemFavoriteFieldRefs {
    readonly id: FieldRef<"ItemFavorite", 'String'>
    readonly userId: FieldRef<"ItemFavorite", 'String'>
    readonly itemUuid: FieldRef<"ItemFavorite", 'String'>
    readonly createdAt: FieldRef<"ItemFavorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemFavorite findUnique
   */
  export type ItemFavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavorite to fetch.
     */
    where: ItemFavoriteWhereUniqueInput
  }

  /**
   * ItemFavorite findUniqueOrThrow
   */
  export type ItemFavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavorite to fetch.
     */
    where: ItemFavoriteWhereUniqueInput
  }

  /**
   * ItemFavorite findFirst
   */
  export type ItemFavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavorite to fetch.
     */
    where?: ItemFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavorites to fetch.
     */
    orderBy?: ItemFavoriteOrderByWithRelationInput | ItemFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFavorites.
     */
    cursor?: ItemFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFavorites.
     */
    distinct?: ItemFavoriteScalarFieldEnum | ItemFavoriteScalarFieldEnum[]
  }

  /**
   * ItemFavorite findFirstOrThrow
   */
  export type ItemFavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavorite to fetch.
     */
    where?: ItemFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavorites to fetch.
     */
    orderBy?: ItemFavoriteOrderByWithRelationInput | ItemFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFavorites.
     */
    cursor?: ItemFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFavorites.
     */
    distinct?: ItemFavoriteScalarFieldEnum | ItemFavoriteScalarFieldEnum[]
  }

  /**
   * ItemFavorite findMany
   */
  export type ItemFavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ItemFavorites to fetch.
     */
    where?: ItemFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFavorites to fetch.
     */
    orderBy?: ItemFavoriteOrderByWithRelationInput | ItemFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemFavorites.
     */
    cursor?: ItemFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFavorites.
     */
    skip?: number
    distinct?: ItemFavoriteScalarFieldEnum | ItemFavoriteScalarFieldEnum[]
  }

  /**
   * ItemFavorite create
   */
  export type ItemFavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemFavorite.
     */
    data: XOR<ItemFavoriteCreateInput, ItemFavoriteUncheckedCreateInput>
  }

  /**
   * ItemFavorite createMany
   */
  export type ItemFavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemFavorites.
     */
    data: ItemFavoriteCreateManyInput | ItemFavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemFavorite createManyAndReturn
   */
  export type ItemFavoriteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * The data used to create many ItemFavorites.
     */
    data: ItemFavoriteCreateManyInput | ItemFavoriteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFavorite update
   */
  export type ItemFavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemFavorite.
     */
    data: XOR<ItemFavoriteUpdateInput, ItemFavoriteUncheckedUpdateInput>
    /**
     * Choose, which ItemFavorite to update.
     */
    where: ItemFavoriteWhereUniqueInput
  }

  /**
   * ItemFavorite updateMany
   */
  export type ItemFavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemFavorites.
     */
    data: XOR<ItemFavoriteUpdateManyMutationInput, ItemFavoriteUncheckedUpdateManyInput>
    /**
     * Filter which ItemFavorites to update
     */
    where?: ItemFavoriteWhereInput
    /**
     * Limit how many ItemFavorites to update.
     */
    limit?: number
  }

  /**
   * ItemFavorite updateManyAndReturn
   */
  export type ItemFavoriteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * The data used to update ItemFavorites.
     */
    data: XOR<ItemFavoriteUpdateManyMutationInput, ItemFavoriteUncheckedUpdateManyInput>
    /**
     * Filter which ItemFavorites to update
     */
    where?: ItemFavoriteWhereInput
    /**
     * Limit how many ItemFavorites to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFavorite upsert
   */
  export type ItemFavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemFavorite to update in case it exists.
     */
    where: ItemFavoriteWhereUniqueInput
    /**
     * In case the ItemFavorite found by the `where` argument doesn't exist, create a new ItemFavorite with this data.
     */
    create: XOR<ItemFavoriteCreateInput, ItemFavoriteUncheckedCreateInput>
    /**
     * In case the ItemFavorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemFavoriteUpdateInput, ItemFavoriteUncheckedUpdateInput>
  }

  /**
   * ItemFavorite delete
   */
  export type ItemFavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    /**
     * Filter which ItemFavorite to delete.
     */
    where: ItemFavoriteWhereUniqueInput
  }

  /**
   * ItemFavorite deleteMany
   */
  export type ItemFavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFavorites to delete
     */
    where?: ItemFavoriteWhereInput
    /**
     * Limit how many ItemFavorites to delete.
     */
    limit?: number
  }

  /**
   * ItemFavorite without action
   */
  export type ItemFavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
  }


  /**
   * Model ItemLike
   */

  export type AggregateItemLike = {
    _count: ItemLikeCountAggregateOutputType | null
    _min: ItemLikeMinAggregateOutputType | null
    _max: ItemLikeMaxAggregateOutputType | null
  }

  export type ItemLikeMinAggregateOutputType = {
    id: string | null
    userId: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemLikeMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    itemUuid: string | null
    createdAt: Date | null
  }

  export type ItemLikeCountAggregateOutputType = {
    id: number
    userId: number
    itemUuid: number
    createdAt: number
    _all: number
  }


  export type ItemLikeMinAggregateInputType = {
    id?: true
    userId?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemLikeMaxAggregateInputType = {
    id?: true
    userId?: true
    itemUuid?: true
    createdAt?: true
  }

  export type ItemLikeCountAggregateInputType = {
    id?: true
    userId?: true
    itemUuid?: true
    createdAt?: true
    _all?: true
  }

  export type ItemLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemLike to aggregate.
     */
    where?: ItemLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikes to fetch.
     */
    orderBy?: ItemLikeOrderByWithRelationInput | ItemLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemLikes
    **/
    _count?: true | ItemLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemLikeMaxAggregateInputType
  }

  export type GetItemLikeAggregateType<T extends ItemLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateItemLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemLike[P]>
      : GetScalarType<T[P], AggregateItemLike[P]>
  }




  export type ItemLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemLikeWhereInput
    orderBy?: ItemLikeOrderByWithAggregationInput | ItemLikeOrderByWithAggregationInput[]
    by: ItemLikeScalarFieldEnum[] | ItemLikeScalarFieldEnum
    having?: ItemLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemLikeCountAggregateInputType | true
    _min?: ItemLikeMinAggregateInputType
    _max?: ItemLikeMaxAggregateInputType
  }

  export type ItemLikeGroupByOutputType = {
    id: string
    userId: string
    itemUuid: string
    createdAt: Date | null
    _count: ItemLikeCountAggregateOutputType | null
    _min: ItemLikeMinAggregateOutputType | null
    _max: ItemLikeMaxAggregateOutputType | null
  }

  type GetItemLikeGroupByPayload<T extends ItemLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemLikeGroupByOutputType[P]>
            : GetScalarType<T[P], ItemLikeGroupByOutputType[P]>
        }
      >
    >


  export type ItemLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemLike"]>

  export type ItemLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemLike"]>

  export type ItemLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemLike"]>

  export type ItemLikeSelectScalar = {
    id?: boolean
    userId?: boolean
    itemUuid?: boolean
    createdAt?: boolean
  }

  export type ItemLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "itemUuid" | "createdAt", ExtArgs["result"]["itemLike"]>
  export type ItemLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type ItemLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type ItemLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $ItemLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemLike"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      itemUuid: string
      createdAt: Date | null
    }, ExtArgs["result"]["itemLike"]>
    composites: {}
  }

  type ItemLikeGetPayload<S extends boolean | null | undefined | ItemLikeDefaultArgs> = $Result.GetResult<Prisma.$ItemLikePayload, S>

  type ItemLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemLikeCountAggregateInputType | true
    }

  export interface ItemLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemLike'], meta: { name: 'ItemLike' } }
    /**
     * Find zero or one ItemLike that matches the filter.
     * @param {ItemLikeFindUniqueArgs} args - Arguments to find a ItemLike
     * @example
     * // Get one ItemLike
     * const itemLike = await prisma.itemLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemLikeFindUniqueArgs>(args: SelectSubset<T, ItemLikeFindUniqueArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemLikeFindUniqueOrThrowArgs} args - Arguments to find a ItemLike
     * @example
     * // Get one ItemLike
     * const itemLike = await prisma.itemLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeFindFirstArgs} args - Arguments to find a ItemLike
     * @example
     * // Get one ItemLike
     * const itemLike = await prisma.itemLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemLikeFindFirstArgs>(args?: SelectSubset<T, ItemLikeFindFirstArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeFindFirstOrThrowArgs} args - Arguments to find a ItemLike
     * @example
     * // Get one ItemLike
     * const itemLike = await prisma.itemLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemLikes
     * const itemLikes = await prisma.itemLike.findMany()
     * 
     * // Get first 10 ItemLikes
     * const itemLikes = await prisma.itemLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemLikeWithIdOnly = await prisma.itemLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemLikeFindManyArgs>(args?: SelectSubset<T, ItemLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemLike.
     * @param {ItemLikeCreateArgs} args - Arguments to create a ItemLike.
     * @example
     * // Create one ItemLike
     * const ItemLike = await prisma.itemLike.create({
     *   data: {
     *     // ... data to create a ItemLike
     *   }
     * })
     * 
     */
    create<T extends ItemLikeCreateArgs>(args: SelectSubset<T, ItemLikeCreateArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemLikes.
     * @param {ItemLikeCreateManyArgs} args - Arguments to create many ItemLikes.
     * @example
     * // Create many ItemLikes
     * const itemLike = await prisma.itemLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemLikeCreateManyArgs>(args?: SelectSubset<T, ItemLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemLikes and returns the data saved in the database.
     * @param {ItemLikeCreateManyAndReturnArgs} args - Arguments to create many ItemLikes.
     * @example
     * // Create many ItemLikes
     * const itemLike = await prisma.itemLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemLikes and only return the `id`
     * const itemLikeWithIdOnly = await prisma.itemLike.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemLike.
     * @param {ItemLikeDeleteArgs} args - Arguments to delete one ItemLike.
     * @example
     * // Delete one ItemLike
     * const ItemLike = await prisma.itemLike.delete({
     *   where: {
     *     // ... filter to delete one ItemLike
     *   }
     * })
     * 
     */
    delete<T extends ItemLikeDeleteArgs>(args: SelectSubset<T, ItemLikeDeleteArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemLike.
     * @param {ItemLikeUpdateArgs} args - Arguments to update one ItemLike.
     * @example
     * // Update one ItemLike
     * const itemLike = await prisma.itemLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemLikeUpdateArgs>(args: SelectSubset<T, ItemLikeUpdateArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemLikes.
     * @param {ItemLikeDeleteManyArgs} args - Arguments to filter ItemLikes to delete.
     * @example
     * // Delete a few ItemLikes
     * const { count } = await prisma.itemLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemLikeDeleteManyArgs>(args?: SelectSubset<T, ItemLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemLikes
     * const itemLike = await prisma.itemLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemLikeUpdateManyArgs>(args: SelectSubset<T, ItemLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemLikes and returns the data updated in the database.
     * @param {ItemLikeUpdateManyAndReturnArgs} args - Arguments to update many ItemLikes.
     * @example
     * // Update many ItemLikes
     * const itemLike = await prisma.itemLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemLikes and only return the `id`
     * const itemLikeWithIdOnly = await prisma.itemLike.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemLike.
     * @param {ItemLikeUpsertArgs} args - Arguments to update or create a ItemLike.
     * @example
     * // Update or create a ItemLike
     * const itemLike = await prisma.itemLike.upsert({
     *   create: {
     *     // ... data to create a ItemLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemLike we want to update
     *   }
     * })
     */
    upsert<T extends ItemLikeUpsertArgs>(args: SelectSubset<T, ItemLikeUpsertArgs<ExtArgs>>): Prisma__ItemLikeClient<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeCountArgs} args - Arguments to filter ItemLikes to count.
     * @example
     * // Count the number of ItemLikes
     * const count = await prisma.itemLike.count({
     *   where: {
     *     // ... the filter for the ItemLikes we want to count
     *   }
     * })
    **/
    count<T extends ItemLikeCountArgs>(
      args?: Subset<T, ItemLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ItemLikeAggregateArgs>(args: Subset<T, ItemLikeAggregateArgs>): Prisma.PrismaPromise<GetItemLikeAggregateType<T>>

    /**
     * Group by ItemLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemLikeGroupByArgs} args - Group by arguments.
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
      T extends ItemLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemLikeGroupByArgs['orderBy'] }
        : { orderBy?: ItemLikeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ItemLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemLike model
   */
  readonly fields: ItemLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ItemLike model
   */
  interface ItemLikeFieldRefs {
    readonly id: FieldRef<"ItemLike", 'String'>
    readonly userId: FieldRef<"ItemLike", 'String'>
    readonly itemUuid: FieldRef<"ItemLike", 'String'>
    readonly createdAt: FieldRef<"ItemLike", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemLike findUnique
   */
  export type ItemLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * Filter, which ItemLike to fetch.
     */
    where: ItemLikeWhereUniqueInput
  }

  /**
   * ItemLike findUniqueOrThrow
   */
  export type ItemLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * Filter, which ItemLike to fetch.
     */
    where: ItemLikeWhereUniqueInput
  }

  /**
   * ItemLike findFirst
   */
  export type ItemLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * Filter, which ItemLike to fetch.
     */
    where?: ItemLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikes to fetch.
     */
    orderBy?: ItemLikeOrderByWithRelationInput | ItemLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemLikes.
     */
    cursor?: ItemLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemLikes.
     */
    distinct?: ItemLikeScalarFieldEnum | ItemLikeScalarFieldEnum[]
  }

  /**
   * ItemLike findFirstOrThrow
   */
  export type ItemLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * Filter, which ItemLike to fetch.
     */
    where?: ItemLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikes to fetch.
     */
    orderBy?: ItemLikeOrderByWithRelationInput | ItemLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemLikes.
     */
    cursor?: ItemLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemLikes.
     */
    distinct?: ItemLikeScalarFieldEnum | ItemLikeScalarFieldEnum[]
  }

  /**
   * ItemLike findMany
   */
  export type ItemLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * Filter, which ItemLikes to fetch.
     */
    where?: ItemLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemLikes to fetch.
     */
    orderBy?: ItemLikeOrderByWithRelationInput | ItemLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemLikes.
     */
    cursor?: ItemLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemLikes.
     */
    skip?: number
    distinct?: ItemLikeScalarFieldEnum | ItemLikeScalarFieldEnum[]
  }

  /**
   * ItemLike create
   */
  export type ItemLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemLike.
     */
    data: XOR<ItemLikeCreateInput, ItemLikeUncheckedCreateInput>
  }

  /**
   * ItemLike createMany
   */
  export type ItemLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemLikes.
     */
    data: ItemLikeCreateManyInput | ItemLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemLike createManyAndReturn
   */
  export type ItemLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * The data used to create many ItemLikes.
     */
    data: ItemLikeCreateManyInput | ItemLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemLike update
   */
  export type ItemLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemLike.
     */
    data: XOR<ItemLikeUpdateInput, ItemLikeUncheckedUpdateInput>
    /**
     * Choose, which ItemLike to update.
     */
    where: ItemLikeWhereUniqueInput
  }

  /**
   * ItemLike updateMany
   */
  export type ItemLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemLikes.
     */
    data: XOR<ItemLikeUpdateManyMutationInput, ItemLikeUncheckedUpdateManyInput>
    /**
     * Filter which ItemLikes to update
     */
    where?: ItemLikeWhereInput
    /**
     * Limit how many ItemLikes to update.
     */
    limit?: number
  }

  /**
   * ItemLike updateManyAndReturn
   */
  export type ItemLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * The data used to update ItemLikes.
     */
    data: XOR<ItemLikeUpdateManyMutationInput, ItemLikeUncheckedUpdateManyInput>
    /**
     * Filter which ItemLikes to update
     */
    where?: ItemLikeWhereInput
    /**
     * Limit how many ItemLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemLike upsert
   */
  export type ItemLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemLike to update in case it exists.
     */
    where: ItemLikeWhereUniqueInput
    /**
     * In case the ItemLike found by the `where` argument doesn't exist, create a new ItemLike with this data.
     */
    create: XOR<ItemLikeCreateInput, ItemLikeUncheckedCreateInput>
    /**
     * In case the ItemLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemLikeUpdateInput, ItemLikeUncheckedUpdateInput>
  }

  /**
   * ItemLike delete
   */
  export type ItemLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    /**
     * Filter which ItemLike to delete.
     */
    where: ItemLikeWhereUniqueInput
  }

  /**
   * ItemLike deleteMany
   */
  export type ItemLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemLikes to delete
     */
    where?: ItemLikeWhereInput
    /**
     * Limit how many ItemLikes to delete.
     */
    limit?: number
  }

  /**
   * ItemLike without action
   */
  export type ItemLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
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
    id: string | null
    userId: string | null
    verificationCode: string | null
    verificationCodeExpiration: string | null
    token: string | null
  }

  export type RegisterInProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    verificationCode: string | null
    verificationCodeExpiration: string | null
    token: string | null
  }

  export type RegisterInProgressCountAggregateOutputType = {
    id: number
    userId: number
    verificationCode: number
    verificationCodeExpiration: number
    token: number
    _all: number
  }


  export type RegisterInProgressMinAggregateInputType = {
    id?: true
    userId?: true
    verificationCode?: true
    verificationCodeExpiration?: true
    token?: true
  }

  export type RegisterInProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    verificationCode?: true
    verificationCodeExpiration?: true
    token?: true
  }

  export type RegisterInProgressCountAggregateInputType = {
    id?: true
    userId?: true
    verificationCode?: true
    verificationCodeExpiration?: true
    token?: true
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
    id: string
    userId: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
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
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registerInProgress"]>

  export type RegisterInProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registerInProgress"]>

  export type RegisterInProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["registerInProgress"]>

  export type RegisterInProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
  }

  export type RegisterInProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "verificationCode" | "verificationCodeExpiration" | "token", ExtArgs["result"]["registerInProgress"]>
  export type RegisterInProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type RegisterInProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type RegisterInProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $RegisterInProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RegisterInProgress"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      verificationCode: string
      verificationCodeExpiration: string
      token: string
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
     * // Only select the `id`
     * const registerInProgressWithIdOnly = await prisma.registerInProgress.findMany({ select: { id: true } })
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
     * // Create many RegisterInProgresses and only return the `id`
     * const registerInProgressWithIdOnly = await prisma.registerInProgress.createManyAndReturn({
     *   select: { id: true },
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
     * Update zero or more RegisterInProgresses and returns the data updated in the database.
     * @param {RegisterInProgressUpdateManyAndReturnArgs} args - Arguments to update many RegisterInProgresses.
     * @example
     * // Update many RegisterInProgresses
     * const registerInProgress = await prisma.registerInProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RegisterInProgresses and only return the `id`
     * const registerInProgressWithIdOnly = await prisma.registerInProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegisterInProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, RegisterInProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
    readonly id: FieldRef<"RegisterInProgress", 'String'>
    readonly userId: FieldRef<"RegisterInProgress", 'String'>
    readonly verificationCode: FieldRef<"RegisterInProgress", 'String'>
    readonly verificationCodeExpiration: FieldRef<"RegisterInProgress", 'String'>
    readonly token: FieldRef<"RegisterInProgress", 'String'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressIncludeCreateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
    /**
     * Limit how many RegisterInProgresses to update.
     */
    limit?: number
  }

  /**
   * RegisterInProgress updateManyAndReturn
   */
  export type RegisterInProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * The data used to update RegisterInProgresses.
     */
    data: XOR<RegisterInProgressUpdateManyMutationInput, RegisterInProgressUncheckedUpdateManyInput>
    /**
     * Filter which RegisterInProgresses to update
     */
    where?: RegisterInProgressWhereInput
    /**
     * Limit how many RegisterInProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressIncludeUpdateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
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
    /**
     * Limit how many RegisterInProgresses to delete.
     */
    limit?: number
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
  }


  /**
   * Model ResetPasswordInProgress
   */

  export type AggregateResetPasswordInProgress = {
    _count: ResetPasswordInProgressCountAggregateOutputType | null
    _min: ResetPasswordInProgressMinAggregateOutputType | null
    _max: ResetPasswordInProgressMaxAggregateOutputType | null
  }

  export type ResetPasswordInProgressMinAggregateOutputType = {
    id: string | null
    userId: string | null
    verificationCode: string | null
    verificationCodeExpiration: string | null
    token: string | null
  }

  export type ResetPasswordInProgressMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    verificationCode: string | null
    verificationCodeExpiration: string | null
    token: string | null
  }

  export type ResetPasswordInProgressCountAggregateOutputType = {
    id: number
    userId: number
    verificationCode: number
    verificationCodeExpiration: number
    token: number
    _all: number
  }


  export type ResetPasswordInProgressMinAggregateInputType = {
    id?: true
    userId?: true
    verificationCode?: true
    verificationCodeExpiration?: true
    token?: true
  }

  export type ResetPasswordInProgressMaxAggregateInputType = {
    id?: true
    userId?: true
    verificationCode?: true
    verificationCodeExpiration?: true
    token?: true
  }

  export type ResetPasswordInProgressCountAggregateInputType = {
    id?: true
    userId?: true
    verificationCode?: true
    verificationCodeExpiration?: true
    token?: true
    _all?: true
  }

  export type ResetPasswordInProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetPasswordInProgress to aggregate.
     */
    where?: ResetPasswordInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordInProgresses to fetch.
     */
    orderBy?: ResetPasswordInProgressOrderByWithRelationInput | ResetPasswordInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResetPasswordInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordInProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ResetPasswordInProgresses
    **/
    _count?: true | ResetPasswordInProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResetPasswordInProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResetPasswordInProgressMaxAggregateInputType
  }

  export type GetResetPasswordInProgressAggregateType<T extends ResetPasswordInProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateResetPasswordInProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResetPasswordInProgress[P]>
      : GetScalarType<T[P], AggregateResetPasswordInProgress[P]>
  }




  export type ResetPasswordInProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResetPasswordInProgressWhereInput
    orderBy?: ResetPasswordInProgressOrderByWithAggregationInput | ResetPasswordInProgressOrderByWithAggregationInput[]
    by: ResetPasswordInProgressScalarFieldEnum[] | ResetPasswordInProgressScalarFieldEnum
    having?: ResetPasswordInProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResetPasswordInProgressCountAggregateInputType | true
    _min?: ResetPasswordInProgressMinAggregateInputType
    _max?: ResetPasswordInProgressMaxAggregateInputType
  }

  export type ResetPasswordInProgressGroupByOutputType = {
    id: string
    userId: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
    _count: ResetPasswordInProgressCountAggregateOutputType | null
    _min: ResetPasswordInProgressMinAggregateOutputType | null
    _max: ResetPasswordInProgressMaxAggregateOutputType | null
  }

  type GetResetPasswordInProgressGroupByPayload<T extends ResetPasswordInProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResetPasswordInProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResetPasswordInProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResetPasswordInProgressGroupByOutputType[P]>
            : GetScalarType<T[P], ResetPasswordInProgressGroupByOutputType[P]>
        }
      >
    >


  export type ResetPasswordInProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetPasswordInProgress"]>

  export type ResetPasswordInProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetPasswordInProgress"]>

  export type ResetPasswordInProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resetPasswordInProgress"]>

  export type ResetPasswordInProgressSelectScalar = {
    id?: boolean
    userId?: boolean
    verificationCode?: boolean
    verificationCodeExpiration?: boolean
    token?: boolean
  }

  export type ResetPasswordInProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "verificationCode" | "verificationCodeExpiration" | "token", ExtArgs["result"]["resetPasswordInProgress"]>
  export type ResetPasswordInProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type ResetPasswordInProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type ResetPasswordInProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $ResetPasswordInProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ResetPasswordInProgress"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      verificationCode: string
      verificationCodeExpiration: string
      token: string
    }, ExtArgs["result"]["resetPasswordInProgress"]>
    composites: {}
  }

  type ResetPasswordInProgressGetPayload<S extends boolean | null | undefined | ResetPasswordInProgressDefaultArgs> = $Result.GetResult<Prisma.$ResetPasswordInProgressPayload, S>

  type ResetPasswordInProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResetPasswordInProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResetPasswordInProgressCountAggregateInputType | true
    }

  export interface ResetPasswordInProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ResetPasswordInProgress'], meta: { name: 'ResetPasswordInProgress' } }
    /**
     * Find zero or one ResetPasswordInProgress that matches the filter.
     * @param {ResetPasswordInProgressFindUniqueArgs} args - Arguments to find a ResetPasswordInProgress
     * @example
     * // Get one ResetPasswordInProgress
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResetPasswordInProgressFindUniqueArgs>(args: SelectSubset<T, ResetPasswordInProgressFindUniqueArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ResetPasswordInProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResetPasswordInProgressFindUniqueOrThrowArgs} args - Arguments to find a ResetPasswordInProgress
     * @example
     * // Get one ResetPasswordInProgress
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResetPasswordInProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, ResetPasswordInProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetPasswordInProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordInProgressFindFirstArgs} args - Arguments to find a ResetPasswordInProgress
     * @example
     * // Get one ResetPasswordInProgress
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResetPasswordInProgressFindFirstArgs>(args?: SelectSubset<T, ResetPasswordInProgressFindFirstArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ResetPasswordInProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordInProgressFindFirstOrThrowArgs} args - Arguments to find a ResetPasswordInProgress
     * @example
     * // Get one ResetPasswordInProgress
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResetPasswordInProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, ResetPasswordInProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ResetPasswordInProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordInProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResetPasswordInProgresses
     * const resetPasswordInProgresses = await prisma.resetPasswordInProgress.findMany()
     * 
     * // Get first 10 ResetPasswordInProgresses
     * const resetPasswordInProgresses = await prisma.resetPasswordInProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resetPasswordInProgressWithIdOnly = await prisma.resetPasswordInProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResetPasswordInProgressFindManyArgs>(args?: SelectSubset<T, ResetPasswordInProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ResetPasswordInProgress.
     * @param {ResetPasswordInProgressCreateArgs} args - Arguments to create a ResetPasswordInProgress.
     * @example
     * // Create one ResetPasswordInProgress
     * const ResetPasswordInProgress = await prisma.resetPasswordInProgress.create({
     *   data: {
     *     // ... data to create a ResetPasswordInProgress
     *   }
     * })
     * 
     */
    create<T extends ResetPasswordInProgressCreateArgs>(args: SelectSubset<T, ResetPasswordInProgressCreateArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ResetPasswordInProgresses.
     * @param {ResetPasswordInProgressCreateManyArgs} args - Arguments to create many ResetPasswordInProgresses.
     * @example
     * // Create many ResetPasswordInProgresses
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResetPasswordInProgressCreateManyArgs>(args?: SelectSubset<T, ResetPasswordInProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ResetPasswordInProgresses and returns the data saved in the database.
     * @param {ResetPasswordInProgressCreateManyAndReturnArgs} args - Arguments to create many ResetPasswordInProgresses.
     * @example
     * // Create many ResetPasswordInProgresses
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ResetPasswordInProgresses and only return the `id`
     * const resetPasswordInProgressWithIdOnly = await prisma.resetPasswordInProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResetPasswordInProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, ResetPasswordInProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ResetPasswordInProgress.
     * @param {ResetPasswordInProgressDeleteArgs} args - Arguments to delete one ResetPasswordInProgress.
     * @example
     * // Delete one ResetPasswordInProgress
     * const ResetPasswordInProgress = await prisma.resetPasswordInProgress.delete({
     *   where: {
     *     // ... filter to delete one ResetPasswordInProgress
     *   }
     * })
     * 
     */
    delete<T extends ResetPasswordInProgressDeleteArgs>(args: SelectSubset<T, ResetPasswordInProgressDeleteArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ResetPasswordInProgress.
     * @param {ResetPasswordInProgressUpdateArgs} args - Arguments to update one ResetPasswordInProgress.
     * @example
     * // Update one ResetPasswordInProgress
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResetPasswordInProgressUpdateArgs>(args: SelectSubset<T, ResetPasswordInProgressUpdateArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ResetPasswordInProgresses.
     * @param {ResetPasswordInProgressDeleteManyArgs} args - Arguments to filter ResetPasswordInProgresses to delete.
     * @example
     * // Delete a few ResetPasswordInProgresses
     * const { count } = await prisma.resetPasswordInProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResetPasswordInProgressDeleteManyArgs>(args?: SelectSubset<T, ResetPasswordInProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetPasswordInProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordInProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResetPasswordInProgresses
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResetPasswordInProgressUpdateManyArgs>(args: SelectSubset<T, ResetPasswordInProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ResetPasswordInProgresses and returns the data updated in the database.
     * @param {ResetPasswordInProgressUpdateManyAndReturnArgs} args - Arguments to update many ResetPasswordInProgresses.
     * @example
     * // Update many ResetPasswordInProgresses
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ResetPasswordInProgresses and only return the `id`
     * const resetPasswordInProgressWithIdOnly = await prisma.resetPasswordInProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResetPasswordInProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, ResetPasswordInProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ResetPasswordInProgress.
     * @param {ResetPasswordInProgressUpsertArgs} args - Arguments to update or create a ResetPasswordInProgress.
     * @example
     * // Update or create a ResetPasswordInProgress
     * const resetPasswordInProgress = await prisma.resetPasswordInProgress.upsert({
     *   create: {
     *     // ... data to create a ResetPasswordInProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResetPasswordInProgress we want to update
     *   }
     * })
     */
    upsert<T extends ResetPasswordInProgressUpsertArgs>(args: SelectSubset<T, ResetPasswordInProgressUpsertArgs<ExtArgs>>): Prisma__ResetPasswordInProgressClient<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ResetPasswordInProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordInProgressCountArgs} args - Arguments to filter ResetPasswordInProgresses to count.
     * @example
     * // Count the number of ResetPasswordInProgresses
     * const count = await prisma.resetPasswordInProgress.count({
     *   where: {
     *     // ... the filter for the ResetPasswordInProgresses we want to count
     *   }
     * })
    **/
    count<T extends ResetPasswordInProgressCountArgs>(
      args?: Subset<T, ResetPasswordInProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResetPasswordInProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ResetPasswordInProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordInProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResetPasswordInProgressAggregateArgs>(args: Subset<T, ResetPasswordInProgressAggregateArgs>): Prisma.PrismaPromise<GetResetPasswordInProgressAggregateType<T>>

    /**
     * Group by ResetPasswordInProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResetPasswordInProgressGroupByArgs} args - Group by arguments.
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
      T extends ResetPasswordInProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResetPasswordInProgressGroupByArgs['orderBy'] }
        : { orderBy?: ResetPasswordInProgressGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ResetPasswordInProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResetPasswordInProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ResetPasswordInProgress model
   */
  readonly fields: ResetPasswordInProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ResetPasswordInProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResetPasswordInProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ResetPasswordInProgress model
   */
  interface ResetPasswordInProgressFieldRefs {
    readonly id: FieldRef<"ResetPasswordInProgress", 'String'>
    readonly userId: FieldRef<"ResetPasswordInProgress", 'String'>
    readonly verificationCode: FieldRef<"ResetPasswordInProgress", 'String'>
    readonly verificationCodeExpiration: FieldRef<"ResetPasswordInProgress", 'String'>
    readonly token: FieldRef<"ResetPasswordInProgress", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ResetPasswordInProgress findUnique
   */
  export type ResetPasswordInProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordInProgress to fetch.
     */
    where: ResetPasswordInProgressWhereUniqueInput
  }

  /**
   * ResetPasswordInProgress findUniqueOrThrow
   */
  export type ResetPasswordInProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordInProgress to fetch.
     */
    where: ResetPasswordInProgressWhereUniqueInput
  }

  /**
   * ResetPasswordInProgress findFirst
   */
  export type ResetPasswordInProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordInProgress to fetch.
     */
    where?: ResetPasswordInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordInProgresses to fetch.
     */
    orderBy?: ResetPasswordInProgressOrderByWithRelationInput | ResetPasswordInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetPasswordInProgresses.
     */
    cursor?: ResetPasswordInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordInProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetPasswordInProgresses.
     */
    distinct?: ResetPasswordInProgressScalarFieldEnum | ResetPasswordInProgressScalarFieldEnum[]
  }

  /**
   * ResetPasswordInProgress findFirstOrThrow
   */
  export type ResetPasswordInProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordInProgress to fetch.
     */
    where?: ResetPasswordInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordInProgresses to fetch.
     */
    orderBy?: ResetPasswordInProgressOrderByWithRelationInput | ResetPasswordInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ResetPasswordInProgresses.
     */
    cursor?: ResetPasswordInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordInProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ResetPasswordInProgresses.
     */
    distinct?: ResetPasswordInProgressScalarFieldEnum | ResetPasswordInProgressScalarFieldEnum[]
  }

  /**
   * ResetPasswordInProgress findMany
   */
  export type ResetPasswordInProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * Filter, which ResetPasswordInProgresses to fetch.
     */
    where?: ResetPasswordInProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ResetPasswordInProgresses to fetch.
     */
    orderBy?: ResetPasswordInProgressOrderByWithRelationInput | ResetPasswordInProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ResetPasswordInProgresses.
     */
    cursor?: ResetPasswordInProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ResetPasswordInProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ResetPasswordInProgresses.
     */
    skip?: number
    distinct?: ResetPasswordInProgressScalarFieldEnum | ResetPasswordInProgressScalarFieldEnum[]
  }

  /**
   * ResetPasswordInProgress create
   */
  export type ResetPasswordInProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a ResetPasswordInProgress.
     */
    data: XOR<ResetPasswordInProgressCreateInput, ResetPasswordInProgressUncheckedCreateInput>
  }

  /**
   * ResetPasswordInProgress createMany
   */
  export type ResetPasswordInProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResetPasswordInProgresses.
     */
    data: ResetPasswordInProgressCreateManyInput | ResetPasswordInProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ResetPasswordInProgress createManyAndReturn
   */
  export type ResetPasswordInProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * The data used to create many ResetPasswordInProgresses.
     */
    data: ResetPasswordInProgressCreateManyInput | ResetPasswordInProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetPasswordInProgress update
   */
  export type ResetPasswordInProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a ResetPasswordInProgress.
     */
    data: XOR<ResetPasswordInProgressUpdateInput, ResetPasswordInProgressUncheckedUpdateInput>
    /**
     * Choose, which ResetPasswordInProgress to update.
     */
    where: ResetPasswordInProgressWhereUniqueInput
  }

  /**
   * ResetPasswordInProgress updateMany
   */
  export type ResetPasswordInProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ResetPasswordInProgresses.
     */
    data: XOR<ResetPasswordInProgressUpdateManyMutationInput, ResetPasswordInProgressUncheckedUpdateManyInput>
    /**
     * Filter which ResetPasswordInProgresses to update
     */
    where?: ResetPasswordInProgressWhereInput
    /**
     * Limit how many ResetPasswordInProgresses to update.
     */
    limit?: number
  }

  /**
   * ResetPasswordInProgress updateManyAndReturn
   */
  export type ResetPasswordInProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * The data used to update ResetPasswordInProgresses.
     */
    data: XOR<ResetPasswordInProgressUpdateManyMutationInput, ResetPasswordInProgressUncheckedUpdateManyInput>
    /**
     * Filter which ResetPasswordInProgresses to update
     */
    where?: ResetPasswordInProgressWhereInput
    /**
     * Limit how many ResetPasswordInProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ResetPasswordInProgress upsert
   */
  export type ResetPasswordInProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the ResetPasswordInProgress to update in case it exists.
     */
    where: ResetPasswordInProgressWhereUniqueInput
    /**
     * In case the ResetPasswordInProgress found by the `where` argument doesn't exist, create a new ResetPasswordInProgress with this data.
     */
    create: XOR<ResetPasswordInProgressCreateInput, ResetPasswordInProgressUncheckedCreateInput>
    /**
     * In case the ResetPasswordInProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResetPasswordInProgressUpdateInput, ResetPasswordInProgressUncheckedUpdateInput>
  }

  /**
   * ResetPasswordInProgress delete
   */
  export type ResetPasswordInProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    /**
     * Filter which ResetPasswordInProgress to delete.
     */
    where: ResetPasswordInProgressWhereUniqueInput
  }

  /**
   * ResetPasswordInProgress deleteMany
   */
  export type ResetPasswordInProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ResetPasswordInProgresses to delete
     */
    where?: ResetPasswordInProgressWhereInput
    /**
     * Limit how many ResetPasswordInProgresses to delete.
     */
    limit?: number
  }

  /**
   * ResetPasswordInProgress without action
   */
  export type ResetPasswordInProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
  }


  /**
   * Model InspoItems
   */

  export type AggregateInspoItems = {
    _count: InspoItemsCountAggregateOutputType | null
    _avg: InspoItemsAvgAggregateOutputType | null
    _sum: InspoItemsSumAggregateOutputType | null
    _min: InspoItemsMinAggregateOutputType | null
    _max: InspoItemsMaxAggregateOutputType | null
  }

  export type InspoItemsAvgAggregateOutputType = {
    index: number | null
  }

  export type InspoItemsSumAggregateOutputType = {
    index: number | null
  }

  export type InspoItemsMinAggregateOutputType = {
    id: string | null
    itemUuid: string | null
    category: string | null
    index: number | null
  }

  export type InspoItemsMaxAggregateOutputType = {
    id: string | null
    itemUuid: string | null
    category: string | null
    index: number | null
  }

  export type InspoItemsCountAggregateOutputType = {
    id: number
    itemUuid: number
    category: number
    index: number
    _all: number
  }


  export type InspoItemsAvgAggregateInputType = {
    index?: true
  }

  export type InspoItemsSumAggregateInputType = {
    index?: true
  }

  export type InspoItemsMinAggregateInputType = {
    id?: true
    itemUuid?: true
    category?: true
    index?: true
  }

  export type InspoItemsMaxAggregateInputType = {
    id?: true
    itemUuid?: true
    category?: true
    index?: true
  }

  export type InspoItemsCountAggregateInputType = {
    id?: true
    itemUuid?: true
    category?: true
    index?: true
    _all?: true
  }

  export type InspoItemsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InspoItems to aggregate.
     */
    where?: InspoItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspoItems to fetch.
     */
    orderBy?: InspoItemsOrderByWithRelationInput | InspoItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InspoItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InspoItems
    **/
    _count?: true | InspoItemsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InspoItemsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InspoItemsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InspoItemsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InspoItemsMaxAggregateInputType
  }

  export type GetInspoItemsAggregateType<T extends InspoItemsAggregateArgs> = {
        [P in keyof T & keyof AggregateInspoItems]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInspoItems[P]>
      : GetScalarType<T[P], AggregateInspoItems[P]>
  }




  export type InspoItemsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InspoItemsWhereInput
    orderBy?: InspoItemsOrderByWithAggregationInput | InspoItemsOrderByWithAggregationInput[]
    by: InspoItemsScalarFieldEnum[] | InspoItemsScalarFieldEnum
    having?: InspoItemsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InspoItemsCountAggregateInputType | true
    _avg?: InspoItemsAvgAggregateInputType
    _sum?: InspoItemsSumAggregateInputType
    _min?: InspoItemsMinAggregateInputType
    _max?: InspoItemsMaxAggregateInputType
  }

  export type InspoItemsGroupByOutputType = {
    id: string
    itemUuid: string
    category: string
    index: number
    _count: InspoItemsCountAggregateOutputType | null
    _avg: InspoItemsAvgAggregateOutputType | null
    _sum: InspoItemsSumAggregateOutputType | null
    _min: InspoItemsMinAggregateOutputType | null
    _max: InspoItemsMaxAggregateOutputType | null
  }

  type GetInspoItemsGroupByPayload<T extends InspoItemsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InspoItemsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InspoItemsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InspoItemsGroupByOutputType[P]>
            : GetScalarType<T[P], InspoItemsGroupByOutputType[P]>
        }
      >
    >


  export type InspoItemsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemUuid?: boolean
    category?: boolean
    index?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inspoItems"]>

  export type InspoItemsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemUuid?: boolean
    category?: boolean
    index?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inspoItems"]>

  export type InspoItemsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    itemUuid?: boolean
    category?: boolean
    index?: boolean
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inspoItems"]>

  export type InspoItemsSelectScalar = {
    id?: boolean
    itemUuid?: boolean
    category?: boolean
    index?: boolean
  }

  export type InspoItemsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "itemUuid" | "category" | "index", ExtArgs["result"]["inspoItems"]>
  export type InspoItemsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type InspoItemsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }
  export type InspoItemsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | ItemDefaultArgs<ExtArgs>
  }

  export type $InspoItemsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InspoItems"
    objects: {
      item: Prisma.$ItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      itemUuid: string
      category: string
      index: number
    }, ExtArgs["result"]["inspoItems"]>
    composites: {}
  }

  type InspoItemsGetPayload<S extends boolean | null | undefined | InspoItemsDefaultArgs> = $Result.GetResult<Prisma.$InspoItemsPayload, S>

  type InspoItemsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InspoItemsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InspoItemsCountAggregateInputType | true
    }

  export interface InspoItemsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InspoItems'], meta: { name: 'InspoItems' } }
    /**
     * Find zero or one InspoItems that matches the filter.
     * @param {InspoItemsFindUniqueArgs} args - Arguments to find a InspoItems
     * @example
     * // Get one InspoItems
     * const inspoItems = await prisma.inspoItems.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InspoItemsFindUniqueArgs>(args: SelectSubset<T, InspoItemsFindUniqueArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InspoItems that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InspoItemsFindUniqueOrThrowArgs} args - Arguments to find a InspoItems
     * @example
     * // Get one InspoItems
     * const inspoItems = await prisma.inspoItems.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InspoItemsFindUniqueOrThrowArgs>(args: SelectSubset<T, InspoItemsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InspoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspoItemsFindFirstArgs} args - Arguments to find a InspoItems
     * @example
     * // Get one InspoItems
     * const inspoItems = await prisma.inspoItems.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InspoItemsFindFirstArgs>(args?: SelectSubset<T, InspoItemsFindFirstArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InspoItems that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspoItemsFindFirstOrThrowArgs} args - Arguments to find a InspoItems
     * @example
     * // Get one InspoItems
     * const inspoItems = await prisma.inspoItems.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InspoItemsFindFirstOrThrowArgs>(args?: SelectSubset<T, InspoItemsFindFirstOrThrowArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InspoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspoItemsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InspoItems
     * const inspoItems = await prisma.inspoItems.findMany()
     * 
     * // Get first 10 InspoItems
     * const inspoItems = await prisma.inspoItems.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inspoItemsWithIdOnly = await prisma.inspoItems.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InspoItemsFindManyArgs>(args?: SelectSubset<T, InspoItemsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InspoItems.
     * @param {InspoItemsCreateArgs} args - Arguments to create a InspoItems.
     * @example
     * // Create one InspoItems
     * const InspoItems = await prisma.inspoItems.create({
     *   data: {
     *     // ... data to create a InspoItems
     *   }
     * })
     * 
     */
    create<T extends InspoItemsCreateArgs>(args: SelectSubset<T, InspoItemsCreateArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InspoItems.
     * @param {InspoItemsCreateManyArgs} args - Arguments to create many InspoItems.
     * @example
     * // Create many InspoItems
     * const inspoItems = await prisma.inspoItems.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InspoItemsCreateManyArgs>(args?: SelectSubset<T, InspoItemsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InspoItems and returns the data saved in the database.
     * @param {InspoItemsCreateManyAndReturnArgs} args - Arguments to create many InspoItems.
     * @example
     * // Create many InspoItems
     * const inspoItems = await prisma.inspoItems.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InspoItems and only return the `id`
     * const inspoItemsWithIdOnly = await prisma.inspoItems.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InspoItemsCreateManyAndReturnArgs>(args?: SelectSubset<T, InspoItemsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InspoItems.
     * @param {InspoItemsDeleteArgs} args - Arguments to delete one InspoItems.
     * @example
     * // Delete one InspoItems
     * const InspoItems = await prisma.inspoItems.delete({
     *   where: {
     *     // ... filter to delete one InspoItems
     *   }
     * })
     * 
     */
    delete<T extends InspoItemsDeleteArgs>(args: SelectSubset<T, InspoItemsDeleteArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InspoItems.
     * @param {InspoItemsUpdateArgs} args - Arguments to update one InspoItems.
     * @example
     * // Update one InspoItems
     * const inspoItems = await prisma.inspoItems.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InspoItemsUpdateArgs>(args: SelectSubset<T, InspoItemsUpdateArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InspoItems.
     * @param {InspoItemsDeleteManyArgs} args - Arguments to filter InspoItems to delete.
     * @example
     * // Delete a few InspoItems
     * const { count } = await prisma.inspoItems.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InspoItemsDeleteManyArgs>(args?: SelectSubset<T, InspoItemsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InspoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspoItemsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InspoItems
     * const inspoItems = await prisma.inspoItems.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InspoItemsUpdateManyArgs>(args: SelectSubset<T, InspoItemsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InspoItems and returns the data updated in the database.
     * @param {InspoItemsUpdateManyAndReturnArgs} args - Arguments to update many InspoItems.
     * @example
     * // Update many InspoItems
     * const inspoItems = await prisma.inspoItems.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InspoItems and only return the `id`
     * const inspoItemsWithIdOnly = await prisma.inspoItems.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InspoItemsUpdateManyAndReturnArgs>(args: SelectSubset<T, InspoItemsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InspoItems.
     * @param {InspoItemsUpsertArgs} args - Arguments to update or create a InspoItems.
     * @example
     * // Update or create a InspoItems
     * const inspoItems = await prisma.inspoItems.upsert({
     *   create: {
     *     // ... data to create a InspoItems
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InspoItems we want to update
     *   }
     * })
     */
    upsert<T extends InspoItemsUpsertArgs>(args: SelectSubset<T, InspoItemsUpsertArgs<ExtArgs>>): Prisma__InspoItemsClient<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InspoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspoItemsCountArgs} args - Arguments to filter InspoItems to count.
     * @example
     * // Count the number of InspoItems
     * const count = await prisma.inspoItems.count({
     *   where: {
     *     // ... the filter for the InspoItems we want to count
     *   }
     * })
    **/
    count<T extends InspoItemsCountArgs>(
      args?: Subset<T, InspoItemsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InspoItemsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InspoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspoItemsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InspoItemsAggregateArgs>(args: Subset<T, InspoItemsAggregateArgs>): Prisma.PrismaPromise<GetInspoItemsAggregateType<T>>

    /**
     * Group by InspoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InspoItemsGroupByArgs} args - Group by arguments.
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
      T extends InspoItemsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InspoItemsGroupByArgs['orderBy'] }
        : { orderBy?: InspoItemsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InspoItemsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInspoItemsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InspoItems model
   */
  readonly fields: InspoItemsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InspoItems.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InspoItemsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends ItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ItemDefaultArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the InspoItems model
   */
  interface InspoItemsFieldRefs {
    readonly id: FieldRef<"InspoItems", 'String'>
    readonly itemUuid: FieldRef<"InspoItems", 'String'>
    readonly category: FieldRef<"InspoItems", 'String'>
    readonly index: FieldRef<"InspoItems", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * InspoItems findUnique
   */
  export type InspoItemsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * Filter, which InspoItems to fetch.
     */
    where: InspoItemsWhereUniqueInput
  }

  /**
   * InspoItems findUniqueOrThrow
   */
  export type InspoItemsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * Filter, which InspoItems to fetch.
     */
    where: InspoItemsWhereUniqueInput
  }

  /**
   * InspoItems findFirst
   */
  export type InspoItemsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * Filter, which InspoItems to fetch.
     */
    where?: InspoItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspoItems to fetch.
     */
    orderBy?: InspoItemsOrderByWithRelationInput | InspoItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InspoItems.
     */
    cursor?: InspoItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InspoItems.
     */
    distinct?: InspoItemsScalarFieldEnum | InspoItemsScalarFieldEnum[]
  }

  /**
   * InspoItems findFirstOrThrow
   */
  export type InspoItemsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * Filter, which InspoItems to fetch.
     */
    where?: InspoItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspoItems to fetch.
     */
    orderBy?: InspoItemsOrderByWithRelationInput | InspoItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InspoItems.
     */
    cursor?: InspoItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InspoItems.
     */
    distinct?: InspoItemsScalarFieldEnum | InspoItemsScalarFieldEnum[]
  }

  /**
   * InspoItems findMany
   */
  export type InspoItemsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * Filter, which InspoItems to fetch.
     */
    where?: InspoItemsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InspoItems to fetch.
     */
    orderBy?: InspoItemsOrderByWithRelationInput | InspoItemsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InspoItems.
     */
    cursor?: InspoItemsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InspoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InspoItems.
     */
    skip?: number
    distinct?: InspoItemsScalarFieldEnum | InspoItemsScalarFieldEnum[]
  }

  /**
   * InspoItems create
   */
  export type InspoItemsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * The data needed to create a InspoItems.
     */
    data: XOR<InspoItemsCreateInput, InspoItemsUncheckedCreateInput>
  }

  /**
   * InspoItems createMany
   */
  export type InspoItemsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InspoItems.
     */
    data: InspoItemsCreateManyInput | InspoItemsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InspoItems createManyAndReturn
   */
  export type InspoItemsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * The data used to create many InspoItems.
     */
    data: InspoItemsCreateManyInput | InspoItemsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InspoItems update
   */
  export type InspoItemsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * The data needed to update a InspoItems.
     */
    data: XOR<InspoItemsUpdateInput, InspoItemsUncheckedUpdateInput>
    /**
     * Choose, which InspoItems to update.
     */
    where: InspoItemsWhereUniqueInput
  }

  /**
   * InspoItems updateMany
   */
  export type InspoItemsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InspoItems.
     */
    data: XOR<InspoItemsUpdateManyMutationInput, InspoItemsUncheckedUpdateManyInput>
    /**
     * Filter which InspoItems to update
     */
    where?: InspoItemsWhereInput
    /**
     * Limit how many InspoItems to update.
     */
    limit?: number
  }

  /**
   * InspoItems updateManyAndReturn
   */
  export type InspoItemsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * The data used to update InspoItems.
     */
    data: XOR<InspoItemsUpdateManyMutationInput, InspoItemsUncheckedUpdateManyInput>
    /**
     * Filter which InspoItems to update
     */
    where?: InspoItemsWhereInput
    /**
     * Limit how many InspoItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InspoItems upsert
   */
  export type InspoItemsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * The filter to search for the InspoItems to update in case it exists.
     */
    where: InspoItemsWhereUniqueInput
    /**
     * In case the InspoItems found by the `where` argument doesn't exist, create a new InspoItems with this data.
     */
    create: XOR<InspoItemsCreateInput, InspoItemsUncheckedCreateInput>
    /**
     * In case the InspoItems was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InspoItemsUpdateInput, InspoItemsUncheckedUpdateInput>
  }

  /**
   * InspoItems delete
   */
  export type InspoItemsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    /**
     * Filter which InspoItems to delete.
     */
    where: InspoItemsWhereUniqueInput
  }

  /**
   * InspoItems deleteMany
   */
  export type InspoItemsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InspoItems to delete
     */
    where?: InspoItemsWhereInput
    /**
     * Limit how many InspoItems to delete.
     */
    limit?: number
  }

  /**
   * InspoItems without action
   */
  export type InspoItemsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    price: number | null
  }

  export type ItemSumAggregateOutputType = {
    price: number | null
  }

  export type ItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    url: string | null
    brandId: string | null
    imageId: string | null
  }

  export type ItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    url: string | null
    brandId: string | null
    imageId: string | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    url: number
    brandId: number
    imageId: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    price?: true
  }

  export type ItemSumAggregateInputType = {
    price?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    url?: true
    brandId?: true
    imageId?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    url?: true
    brandId?: true
    imageId?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    url?: true
    brandId?: true
    imageId?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
    imageId: string
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    url?: boolean
    brandId?: boolean
    imageId?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
    favorites?: boolean | Item$favoritesArgs<ExtArgs>
    likes?: boolean | Item$likesArgs<ExtArgs>
    inspoItems?: boolean | Item$inspoItemsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    url?: boolean
    brandId?: boolean
    imageId?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    url?: boolean
    brandId?: boolean
    imageId?: boolean
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    url?: boolean
    brandId?: boolean
    imageId?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "url" | "brandId" | "imageId", ExtArgs["result"]["item"]>
  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
    favorites?: boolean | Item$favoritesArgs<ExtArgs>
    likes?: boolean | Item$likesArgs<ExtArgs>
    inspoItems?: boolean | Item$inspoItemsArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }
  export type ItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | BrandDefaultArgs<ExtArgs>
    files?: boolean | FilesDefaultArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs>
      files: Prisma.$FilesPayload<ExtArgs>
      favorites: Prisma.$ItemFavoritePayload<ExtArgs>[]
      likes: Prisma.$ItemLikePayload<ExtArgs>[]
      inspoItems: Prisma.$InspoItemsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      price: number
      url: string
      brandId: string
      imageId: string
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items and returns the data updated in the database.
     * @param {ItemUpdateManyAndReturnArgs} args - Arguments to update many Items.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
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
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends BrandDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BrandDefaultArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    files<T extends FilesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FilesDefaultArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    favorites<T extends Item$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Item$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Item$likesArgs<ExtArgs> = {}>(args?: Subset<T, Item$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inspoItems<T extends Item$inspoItemsArgs<ExtArgs> = {}>(args?: Subset<T, Item$inspoItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InspoItemsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'String'>
    readonly name: FieldRef<"Item", 'String'>
    readonly description: FieldRef<"Item", 'String'>
    readonly price: FieldRef<"Item", 'Float'>
    readonly url: FieldRef<"Item", 'String'>
    readonly brandId: FieldRef<"Item", 'String'>
    readonly imageId: FieldRef<"Item", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item createManyAndReturn
   */
  export type ItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Item updateManyAndReturn
   */
  export type ItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Item.favorites
   */
  export type Item$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    where?: ItemFavoriteWhereInput
    orderBy?: ItemFavoriteOrderByWithRelationInput | ItemFavoriteOrderByWithRelationInput[]
    cursor?: ItemFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFavoriteScalarFieldEnum | ItemFavoriteScalarFieldEnum[]
  }

  /**
   * Item.likes
   */
  export type Item$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    where?: ItemLikeWhereInput
    orderBy?: ItemLikeOrderByWithRelationInput | ItemLikeOrderByWithRelationInput[]
    cursor?: ItemLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemLikeScalarFieldEnum | ItemLikeScalarFieldEnum[]
  }

  /**
   * Item.inspoItems
   */
  export type Item$inspoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InspoItems
     */
    select?: InspoItemsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InspoItems
     */
    omit?: InspoItemsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InspoItemsInclude<ExtArgs> | null
    where?: InspoItemsWhereInput
    orderBy?: InspoItemsOrderByWithRelationInput | InspoItemsOrderByWithRelationInput[]
    cursor?: InspoItemsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InspoItemsScalarFieldEnum | InspoItemsScalarFieldEnum[]
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model Files
   */

  export type AggregateFiles = {
    _count: FilesCountAggregateOutputType | null
    _avg: FilesAvgAggregateOutputType | null
    _sum: FilesSumAggregateOutputType | null
    _min: FilesMinAggregateOutputType | null
    _max: FilesMaxAggregateOutputType | null
  }

  export type FilesAvgAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type FilesSumAggregateOutputType = {
    width: number | null
    height: number | null
  }

  export type FilesMinAggregateOutputType = {
    id: string | null
    name: string | null
    contentType: string | null
    bucket: string | null
    url: string | null
    uploadUrl: string | null
    width: number | null
    height: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FilesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    contentType: string | null
    bucket: string | null
    url: string | null
    uploadUrl: string | null
    width: number | null
    height: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FilesCountAggregateOutputType = {
    id: number
    name: number
    contentType: number
    bucket: number
    url: number
    uploadUrl: number
    width: number
    height: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FilesAvgAggregateInputType = {
    width?: true
    height?: true
  }

  export type FilesSumAggregateInputType = {
    width?: true
    height?: true
  }

  export type FilesMinAggregateInputType = {
    id?: true
    name?: true
    contentType?: true
    bucket?: true
    url?: true
    uploadUrl?: true
    width?: true
    height?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FilesMaxAggregateInputType = {
    id?: true
    name?: true
    contentType?: true
    bucket?: true
    url?: true
    uploadUrl?: true
    width?: true
    height?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FilesCountAggregateInputType = {
    id?: true
    name?: true
    contentType?: true
    bucket?: true
    url?: true
    uploadUrl?: true
    width?: true
    height?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Files to aggregate.
     */
    where?: FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FilesOrderByWithRelationInput | FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    _count?: true | FilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FilesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FilesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FilesMaxAggregateInputType
  }

  export type GetFilesAggregateType<T extends FilesAggregateArgs> = {
        [P in keyof T & keyof AggregateFiles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFiles[P]>
      : GetScalarType<T[P], AggregateFiles[P]>
  }




  export type FilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FilesWhereInput
    orderBy?: FilesOrderByWithAggregationInput | FilesOrderByWithAggregationInput[]
    by: FilesScalarFieldEnum[] | FilesScalarFieldEnum
    having?: FilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FilesCountAggregateInputType | true
    _avg?: FilesAvgAggregateInputType
    _sum?: FilesSumAggregateInputType
    _min?: FilesMinAggregateInputType
    _max?: FilesMaxAggregateInputType
  }

  export type FilesGroupByOutputType = {
    id: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width: number | null
    height: number | null
    metadata: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: FilesCountAggregateOutputType | null
    _avg: FilesAvgAggregateOutputType | null
    _sum: FilesSumAggregateOutputType | null
    _min: FilesMinAggregateOutputType | null
    _max: FilesMaxAggregateOutputType | null
  }

  type GetFilesGroupByPayload<T extends FilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FilesGroupByOutputType[P]>
            : GetScalarType<T[P], FilesGroupByOutputType[P]>
        }
      >
    >


  export type FilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contentType?: boolean
    bucket?: boolean
    url?: boolean
    uploadUrl?: boolean
    width?: boolean
    height?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    brand?: boolean | Files$brandArgs<ExtArgs>
    item?: boolean | Files$itemArgs<ExtArgs>
    _count?: boolean | FilesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["files"]>

  export type FilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contentType?: boolean
    bucket?: boolean
    url?: boolean
    uploadUrl?: boolean
    width?: boolean
    height?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["files"]>

  export type FilesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    contentType?: boolean
    bucket?: boolean
    url?: boolean
    uploadUrl?: boolean
    width?: boolean
    height?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["files"]>

  export type FilesSelectScalar = {
    id?: boolean
    name?: boolean
    contentType?: boolean
    bucket?: boolean
    url?: boolean
    uploadUrl?: boolean
    width?: boolean
    height?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FilesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "contentType" | "bucket" | "url" | "uploadUrl" | "width" | "height" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["files"]>
  export type FilesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    brand?: boolean | Files$brandArgs<ExtArgs>
    item?: boolean | Files$itemArgs<ExtArgs>
    _count?: boolean | FilesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FilesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FilesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Files"
    objects: {
      brand: Prisma.$BrandPayload<ExtArgs>[]
      item: Prisma.$ItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      contentType: string
      bucket: string
      url: string
      uploadUrl: string
      width: number | null
      height: number | null
      metadata: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["files"]>
    composites: {}
  }

  type FilesGetPayload<S extends boolean | null | undefined | FilesDefaultArgs> = $Result.GetResult<Prisma.$FilesPayload, S>

  type FilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FilesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FilesCountAggregateInputType | true
    }

  export interface FilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Files'], meta: { name: 'Files' } }
    /**
     * Find zero or one Files that matches the filter.
     * @param {FilesFindUniqueArgs} args - Arguments to find a Files
     * @example
     * // Get one Files
     * const files = await prisma.files.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FilesFindUniqueArgs>(args: SelectSubset<T, FilesFindUniqueArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Files that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FilesFindUniqueOrThrowArgs} args - Arguments to find a Files
     * @example
     * // Get one Files
     * const files = await prisma.files.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FilesFindUniqueOrThrowArgs>(args: SelectSubset<T, FilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilesFindFirstArgs} args - Arguments to find a Files
     * @example
     * // Get one Files
     * const files = await prisma.files.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FilesFindFirstArgs>(args?: SelectSubset<T, FilesFindFirstArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Files that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilesFindFirstOrThrowArgs} args - Arguments to find a Files
     * @example
     * // Get one Files
     * const files = await prisma.files.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FilesFindFirstOrThrowArgs>(args?: SelectSubset<T, FilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.files.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.files.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const filesWithIdOnly = await prisma.files.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FilesFindManyArgs>(args?: SelectSubset<T, FilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Files.
     * @param {FilesCreateArgs} args - Arguments to create a Files.
     * @example
     * // Create one Files
     * const Files = await prisma.files.create({
     *   data: {
     *     // ... data to create a Files
     *   }
     * })
     * 
     */
    create<T extends FilesCreateArgs>(args: SelectSubset<T, FilesCreateArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Files.
     * @param {FilesCreateManyArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const files = await prisma.files.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FilesCreateManyArgs>(args?: SelectSubset<T, FilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Files and returns the data saved in the database.
     * @param {FilesCreateManyAndReturnArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const files = await prisma.files.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Files and only return the `id`
     * const filesWithIdOnly = await prisma.files.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FilesCreateManyAndReturnArgs>(args?: SelectSubset<T, FilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Files.
     * @param {FilesDeleteArgs} args - Arguments to delete one Files.
     * @example
     * // Delete one Files
     * const Files = await prisma.files.delete({
     *   where: {
     *     // ... filter to delete one Files
     *   }
     * })
     * 
     */
    delete<T extends FilesDeleteArgs>(args: SelectSubset<T, FilesDeleteArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Files.
     * @param {FilesUpdateArgs} args - Arguments to update one Files.
     * @example
     * // Update one Files
     * const files = await prisma.files.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FilesUpdateArgs>(args: SelectSubset<T, FilesUpdateArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Files.
     * @param {FilesDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.files.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FilesDeleteManyArgs>(args?: SelectSubset<T, FilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const files = await prisma.files.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FilesUpdateManyArgs>(args: SelectSubset<T, FilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files and returns the data updated in the database.
     * @param {FilesUpdateManyAndReturnArgs} args - Arguments to update many Files.
     * @example
     * // Update many Files
     * const files = await prisma.files.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Files and only return the `id`
     * const filesWithIdOnly = await prisma.files.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FilesUpdateManyAndReturnArgs>(args: SelectSubset<T, FilesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Files.
     * @param {FilesUpsertArgs} args - Arguments to update or create a Files.
     * @example
     * // Update or create a Files
     * const files = await prisma.files.upsert({
     *   create: {
     *     // ... data to create a Files
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Files we want to update
     *   }
     * })
     */
    upsert<T extends FilesUpsertArgs>(args: SelectSubset<T, FilesUpsertArgs<ExtArgs>>): Prisma__FilesClient<$Result.GetResult<Prisma.$FilesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilesCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.files.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FilesCountArgs>(
      args?: Subset<T, FilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FilesAggregateArgs>(args: Subset<T, FilesAggregateArgs>): Prisma.PrismaPromise<GetFilesAggregateType<T>>

    /**
     * Group by Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FilesGroupByArgs} args - Group by arguments.
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
      T extends FilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FilesGroupByArgs['orderBy'] }
        : { orderBy?: FilesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Files model
   */
  readonly fields: FilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Files.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    brand<T extends Files$brandArgs<ExtArgs> = {}>(args?: Subset<T, Files$brandArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    item<T extends Files$itemArgs<ExtArgs> = {}>(args?: Subset<T, Files$itemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Files model
   */
  interface FilesFieldRefs {
    readonly id: FieldRef<"Files", 'String'>
    readonly name: FieldRef<"Files", 'String'>
    readonly contentType: FieldRef<"Files", 'String'>
    readonly bucket: FieldRef<"Files", 'String'>
    readonly url: FieldRef<"Files", 'String'>
    readonly uploadUrl: FieldRef<"Files", 'String'>
    readonly width: FieldRef<"Files", 'Int'>
    readonly height: FieldRef<"Files", 'Int'>
    readonly metadata: FieldRef<"Files", 'Json'>
    readonly createdAt: FieldRef<"Files", 'DateTime'>
    readonly updatedAt: FieldRef<"Files", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Files findUnique
   */
  export type FilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where: FilesWhereUniqueInput
  }

  /**
   * Files findUniqueOrThrow
   */
  export type FilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where: FilesWhereUniqueInput
  }

  /**
   * Files findFirst
   */
  export type FilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where?: FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FilesOrderByWithRelationInput | FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FilesScalarFieldEnum | FilesScalarFieldEnum[]
  }

  /**
   * Files findFirstOrThrow
   */
  export type FilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where?: FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FilesOrderByWithRelationInput | FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FilesScalarFieldEnum | FilesScalarFieldEnum[]
  }

  /**
   * Files findMany
   */
  export type FilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where?: FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FilesOrderByWithRelationInput | FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
     */
    cursor?: FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    distinct?: FilesScalarFieldEnum | FilesScalarFieldEnum[]
  }

  /**
   * Files create
   */
  export type FilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * The data needed to create a Files.
     */
    data: XOR<FilesCreateInput, FilesUncheckedCreateInput>
  }

  /**
   * Files createMany
   */
  export type FilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Files.
     */
    data: FilesCreateManyInput | FilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Files createManyAndReturn
   */
  export type FilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * The data used to create many Files.
     */
    data: FilesCreateManyInput | FilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Files update
   */
  export type FilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * The data needed to update a Files.
     */
    data: XOR<FilesUpdateInput, FilesUncheckedUpdateInput>
    /**
     * Choose, which Files to update.
     */
    where: FilesWhereUniqueInput
  }

  /**
   * Files updateMany
   */
  export type FilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Files.
     */
    data: XOR<FilesUpdateManyMutationInput, FilesUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FilesWhereInput
    /**
     * Limit how many Files to update.
     */
    limit?: number
  }

  /**
   * Files updateManyAndReturn
   */
  export type FilesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * The data used to update Files.
     */
    data: XOR<FilesUpdateManyMutationInput, FilesUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FilesWhereInput
    /**
     * Limit how many Files to update.
     */
    limit?: number
  }

  /**
   * Files upsert
   */
  export type FilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * The filter to search for the Files to update in case it exists.
     */
    where: FilesWhereUniqueInput
    /**
     * In case the Files found by the `where` argument doesn't exist, create a new Files with this data.
     */
    create: XOR<FilesCreateInput, FilesUncheckedCreateInput>
    /**
     * In case the Files was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FilesUpdateInput, FilesUncheckedUpdateInput>
  }

  /**
   * Files delete
   */
  export type FilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
    /**
     * Filter which Files to delete.
     */
    where: FilesWhereUniqueInput
  }

  /**
   * Files deleteMany
   */
  export type FilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Files to delete
     */
    where?: FilesWhereInput
    /**
     * Limit how many Files to delete.
     */
    limit?: number
  }

  /**
   * Files.brand
   */
  export type Files$brandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: BrandWhereInput
    orderBy?: BrandOrderByWithRelationInput | BrandOrderByWithRelationInput[]
    cursor?: BrandWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BrandScalarFieldEnum | BrandScalarFieldEnum[]
  }

  /**
   * Files.item
   */
  export type Files$itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Files without action
   */
  export type FilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Files
     */
    select?: FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Files
     */
    omit?: FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FilesInclude<ExtArgs> | null
  }


  /**
   * Model account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which account to aggregate.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type accountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: accountWhereInput
    orderBy?: accountOrderByWithAggregationInput | accountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: accountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends accountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type accountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type accountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type accountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type accountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type accountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type accountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type accountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type accountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $accountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "account"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type accountGetPayload<S extends boolean | null | undefined | accountDefaultArgs> = $Result.GetResult<Prisma.$accountPayload, S>

  type accountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<accountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface accountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['account'], meta: { name: 'account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {accountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends accountFindUniqueArgs>(args: SelectSubset<T, accountFindUniqueArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {accountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends accountFindUniqueOrThrowArgs>(args: SelectSubset<T, accountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends accountFindFirstArgs>(args?: SelectSubset<T, accountFindFirstArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends accountFindFirstOrThrowArgs>(args?: SelectSubset<T, accountFindFirstOrThrowArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends accountFindManyArgs>(args?: SelectSubset<T, accountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {accountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends accountCreateArgs>(args: SelectSubset<T, accountCreateArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {accountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends accountCreateManyArgs>(args?: SelectSubset<T, accountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {accountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends accountCreateManyAndReturnArgs>(args?: SelectSubset<T, accountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {accountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends accountDeleteArgs>(args: SelectSubset<T, accountDeleteArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {accountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends accountUpdateArgs>(args: SelectSubset<T, accountUpdateArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {accountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends accountDeleteManyArgs>(args?: SelectSubset<T, accountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends accountUpdateManyArgs>(args: SelectSubset<T, accountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {accountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends accountUpdateManyAndReturnArgs>(args: SelectSubset<T, accountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {accountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends accountUpsertArgs>(args: SelectSubset<T, accountUpsertArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends accountCountArgs>(
      args?: Subset<T, accountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountGroupByArgs} args - Group by arguments.
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
      T extends accountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: accountGroupByArgs['orderBy'] }
        : { orderBy?: accountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, accountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the account model
   */
  readonly fields: accountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__accountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the account model
   */
  interface accountFieldRefs {
    readonly id: FieldRef<"account", 'String'>
    readonly accountId: FieldRef<"account", 'String'>
    readonly providerId: FieldRef<"account", 'String'>
    readonly userId: FieldRef<"account", 'String'>
    readonly accessToken: FieldRef<"account", 'String'>
    readonly refreshToken: FieldRef<"account", 'String'>
    readonly idToken: FieldRef<"account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"account", 'DateTime'>
    readonly scope: FieldRef<"account", 'String'>
    readonly password: FieldRef<"account", 'String'>
    readonly createdAt: FieldRef<"account", 'DateTime'>
    readonly updatedAt: FieldRef<"account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * account findUnique
   */
  export type accountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account findUniqueOrThrow
   */
  export type accountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account findFirst
   */
  export type accountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account findFirstOrThrow
   */
  export type accountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account findMany
   */
  export type accountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account create
   */
  export type accountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * The data needed to create a account.
     */
    data: XOR<accountCreateInput, accountUncheckedCreateInput>
  }

  /**
   * account createMany
   */
  export type accountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many accounts.
     */
    data: accountCreateManyInput | accountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * account createManyAndReturn
   */
  export type accountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * The data used to create many accounts.
     */
    data: accountCreateManyInput | accountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * account update
   */
  export type accountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * The data needed to update a account.
     */
    data: XOR<accountUpdateInput, accountUncheckedUpdateInput>
    /**
     * Choose, which account to update.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account updateMany
   */
  export type accountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update accounts.
     */
    data: XOR<accountUpdateManyMutationInput, accountUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to update.
     */
    limit?: number
  }

  /**
   * account updateManyAndReturn
   */
  export type accountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * The data used to update accounts.
     */
    data: XOR<accountUpdateManyMutationInput, accountUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * account upsert
   */
  export type accountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * The filter to search for the account to update in case it exists.
     */
    where: accountWhereUniqueInput
    /**
     * In case the account found by the `where` argument doesn't exist, create a new account with this data.
     */
    create: XOR<accountCreateInput, accountUncheckedCreateInput>
    /**
     * In case the account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<accountUpdateInput, accountUncheckedUpdateInput>
  }

  /**
   * account delete
   */
  export type accountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    /**
     * Filter which account to delete.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account deleteMany
   */
  export type accountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which accounts to delete
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to delete.
     */
    limit?: number
  }

  /**
   * account without action
   */
  export type accountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
  }


  /**
   * Model session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which session to aggregate.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type sessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionWhereInput
    orderBy?: sessionOrderByWithAggregationInput | sessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: sessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends sessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type sessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type sessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type sessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type sessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type sessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type sessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type sessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type sessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $sessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "session"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type sessionGetPayload<S extends boolean | null | undefined | sessionDefaultArgs> = $Result.GetResult<Prisma.$sessionPayload, S>

  type sessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface sessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['session'], meta: { name: 'session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {sessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sessionFindUniqueArgs>(args: SelectSubset<T, sessionFindUniqueArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sessionFindUniqueOrThrowArgs>(args: SelectSubset<T, sessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sessionFindFirstArgs>(args?: SelectSubset<T, sessionFindFirstArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sessionFindFirstOrThrowArgs>(args?: SelectSubset<T, sessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sessionFindManyArgs>(args?: SelectSubset<T, sessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {sessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends sessionCreateArgs>(args: SelectSubset<T, sessionCreateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {sessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sessionCreateManyArgs>(args?: SelectSubset<T, sessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {sessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends sessionCreateManyAndReturnArgs>(args?: SelectSubset<T, sessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {sessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends sessionDeleteArgs>(args: SelectSubset<T, sessionDeleteArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {sessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sessionUpdateArgs>(args: SelectSubset<T, sessionUpdateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {sessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sessionDeleteManyArgs>(args?: SelectSubset<T, sessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sessionUpdateManyArgs>(args: SelectSubset<T, sessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {sessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends sessionUpdateManyAndReturnArgs>(args: SelectSubset<T, sessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {sessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends sessionUpsertArgs>(args: SelectSubset<T, sessionUpsertArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends sessionCountArgs>(
      args?: Subset<T, sessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionGroupByArgs} args - Group by arguments.
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
      T extends sessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sessionGroupByArgs['orderBy'] }
        : { orderBy?: sessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, sessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the session model
   */
  readonly fields: sessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the session model
   */
  interface sessionFieldRefs {
    readonly id: FieldRef<"session", 'String'>
    readonly expiresAt: FieldRef<"session", 'DateTime'>
    readonly token: FieldRef<"session", 'String'>
    readonly createdAt: FieldRef<"session", 'DateTime'>
    readonly updatedAt: FieldRef<"session", 'DateTime'>
    readonly ipAddress: FieldRef<"session", 'String'>
    readonly userAgent: FieldRef<"session", 'String'>
    readonly userId: FieldRef<"session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * session findUnique
   */
  export type sessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findUniqueOrThrow
   */
  export type sessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findFirst
   */
  export type sessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findFirstOrThrow
   */
  export type sessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findMany
   */
  export type sessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session create
   */
  export type sessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The data needed to create a session.
     */
    data: XOR<sessionCreateInput, sessionUncheckedCreateInput>
  }

  /**
   * session createMany
   */
  export type sessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sessions.
     */
    data: sessionCreateManyInput | sessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * session createManyAndReturn
   */
  export type sessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * The data used to create many sessions.
     */
    data: sessionCreateManyInput | sessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * session update
   */
  export type sessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The data needed to update a session.
     */
    data: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
    /**
     * Choose, which session to update.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session updateMany
   */
  export type sessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to update.
     */
    limit?: number
  }

  /**
   * session updateManyAndReturn
   */
  export type sessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * session upsert
   */
  export type sessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * The filter to search for the session to update in case it exists.
     */
    where: sessionWhereUniqueInput
    /**
     * In case the session found by the `where` argument doesn't exist, create a new session with this data.
     */
    create: XOR<sessionCreateInput, sessionUncheckedCreateInput>
    /**
     * In case the session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
  }

  /**
   * session delete
   */
  export type sessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    /**
     * Filter which session to delete.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session deleteMany
   */
  export type sessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessions to delete
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to delete.
     */
    limit?: number
  }

  /**
   * session without action
   */
  export type sessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userType: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userType: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    userType: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    userType?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    userType?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    userType?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    userType: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userType?: boolean
    account?: boolean | user$accountArgs<ExtArgs>
    session?: boolean | user$sessionArgs<ExtArgs>
    brand?: boolean | user$brandArgs<ExtArgs>
    client?: boolean | user$clientArgs<ExtArgs>
    itemFavorites?: boolean | user$itemFavoritesArgs<ExtArgs>
    itemLikes?: boolean | user$itemLikesArgs<ExtArgs>
    RegisterInProgress?: boolean | user$RegisterInProgressArgs<ExtArgs>
    ResetPasswordInProgress?: boolean | user$ResetPasswordInProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userType?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userType?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userType?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt" | "userType", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | user$accountArgs<ExtArgs>
    session?: boolean | user$sessionArgs<ExtArgs>
    brand?: boolean | user$brandArgs<ExtArgs>
    client?: boolean | user$clientArgs<ExtArgs>
    itemFavorites?: boolean | user$itemFavoritesArgs<ExtArgs>
    itemLikes?: boolean | user$itemLikesArgs<ExtArgs>
    RegisterInProgress?: boolean | user$RegisterInProgressArgs<ExtArgs>
    ResetPasswordInProgress?: boolean | user$ResetPasswordInProgressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type userIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      account: Prisma.$accountPayload<ExtArgs>[]
      session: Prisma.$sessionPayload<ExtArgs>[]
      brand: Prisma.$BrandPayload<ExtArgs> | null
      client: Prisma.$ClientPayload<ExtArgs> | null
      itemFavorites: Prisma.$ItemFavoritePayload<ExtArgs>[]
      itemLikes: Prisma.$ItemLikePayload<ExtArgs>[]
      RegisterInProgress: Prisma.$RegisterInProgressPayload<ExtArgs>[]
      ResetPasswordInProgress: Prisma.$ResetPasswordInProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
      userType: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
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
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends user$accountArgs<ExtArgs> = {}>(args?: Subset<T, user$accountArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    session<T extends user$sessionArgs<ExtArgs> = {}>(args?: Subset<T, user$sessionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    brand<T extends user$brandArgs<ExtArgs> = {}>(args?: Subset<T, user$brandArgs<ExtArgs>>): Prisma__BrandClient<$Result.GetResult<Prisma.$BrandPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    client<T extends user$clientArgs<ExtArgs> = {}>(args?: Subset<T, user$clientArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    itemFavorites<T extends user$itemFavoritesArgs<ExtArgs> = {}>(args?: Subset<T, user$itemFavoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    itemLikes<T extends user$itemLikesArgs<ExtArgs> = {}>(args?: Subset<T, user$itemLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    RegisterInProgress<T extends user$RegisterInProgressArgs<ExtArgs> = {}>(args?: Subset<T, user$RegisterInProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegisterInProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ResetPasswordInProgress<T extends user$ResetPasswordInProgressArgs<ExtArgs> = {}>(args?: Subset<T, user$ResetPasswordInProgressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResetPasswordInProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly emailVerified: FieldRef<"user", 'Boolean'>
    readonly image: FieldRef<"user", 'String'>
    readonly createdAt: FieldRef<"user", 'DateTime'>
    readonly updatedAt: FieldRef<"user", 'DateTime'>
    readonly userType: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.account
   */
  export type user$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: accountInclude<ExtArgs> | null
    where?: accountWhereInput
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    cursor?: accountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * user.session
   */
  export type user$sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sessionInclude<ExtArgs> | null
    where?: sessionWhereInput
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    cursor?: sessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * user.brand
   */
  export type user$brandArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: BrandWhereInput
  }

  /**
   * user.client
   */
  export type user$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: ClientWhereInput
  }

  /**
   * user.itemFavorites
   */
  export type user$itemFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFavorite
     */
    select?: ItemFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFavorite
     */
    omit?: ItemFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFavoriteInclude<ExtArgs> | null
    where?: ItemFavoriteWhereInput
    orderBy?: ItemFavoriteOrderByWithRelationInput | ItemFavoriteOrderByWithRelationInput[]
    cursor?: ItemFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFavoriteScalarFieldEnum | ItemFavoriteScalarFieldEnum[]
  }

  /**
   * user.itemLikes
   */
  export type user$itemLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemLike
     */
    select?: ItemLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemLike
     */
    omit?: ItemLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemLikeInclude<ExtArgs> | null
    where?: ItemLikeWhereInput
    orderBy?: ItemLikeOrderByWithRelationInput | ItemLikeOrderByWithRelationInput[]
    cursor?: ItemLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemLikeScalarFieldEnum | ItemLikeScalarFieldEnum[]
  }

  /**
   * user.RegisterInProgress
   */
  export type user$RegisterInProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegisterInProgress
     */
    select?: RegisterInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RegisterInProgress
     */
    omit?: RegisterInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegisterInProgressInclude<ExtArgs> | null
    where?: RegisterInProgressWhereInput
    orderBy?: RegisterInProgressOrderByWithRelationInput | RegisterInProgressOrderByWithRelationInput[]
    cursor?: RegisterInProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegisterInProgressScalarFieldEnum | RegisterInProgressScalarFieldEnum[]
  }

  /**
   * user.ResetPasswordInProgress
   */
  export type user$ResetPasswordInProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResetPasswordInProgress
     */
    select?: ResetPasswordInProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ResetPasswordInProgress
     */
    omit?: ResetPasswordInProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResetPasswordInProgressInclude<ExtArgs> | null
    where?: ResetPasswordInProgressWhereInput
    orderBy?: ResetPasswordInProgressOrderByWithRelationInput | ResetPasswordInProgressOrderByWithRelationInput[]
    cursor?: ResetPasswordInProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResetPasswordInProgressScalarFieldEnum | ResetPasswordInProgressScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verification to aggregate.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type verificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: verificationWhereInput
    orderBy?: verificationOrderByWithAggregationInput | verificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: verificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends verificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type verificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type verificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type verificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type verificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type verificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $verificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type verificationGetPayload<S extends boolean | null | undefined | verificationDefaultArgs> = $Result.GetResult<Prisma.$verificationPayload, S>

  type verificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<verificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface verificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['verification'], meta: { name: 'verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {verificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends verificationFindUniqueArgs>(args: SelectSubset<T, verificationFindUniqueArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {verificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends verificationFindUniqueOrThrowArgs>(args: SelectSubset<T, verificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends verificationFindFirstArgs>(args?: SelectSubset<T, verificationFindFirstArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends verificationFindFirstOrThrowArgs>(args?: SelectSubset<T, verificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends verificationFindManyArgs>(args?: SelectSubset<T, verificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {verificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends verificationCreateArgs>(args: SelectSubset<T, verificationCreateArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {verificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends verificationCreateManyArgs>(args?: SelectSubset<T, verificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {verificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends verificationCreateManyAndReturnArgs>(args?: SelectSubset<T, verificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {verificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends verificationDeleteArgs>(args: SelectSubset<T, verificationDeleteArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {verificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends verificationUpdateArgs>(args: SelectSubset<T, verificationUpdateArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {verificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends verificationDeleteManyArgs>(args?: SelectSubset<T, verificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends verificationUpdateManyArgs>(args: SelectSubset<T, verificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {verificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends verificationUpdateManyAndReturnArgs>(args: SelectSubset<T, verificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {verificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends verificationUpsertArgs>(args: SelectSubset<T, verificationUpsertArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends verificationCountArgs>(
      args?: Subset<T, verificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationGroupByArgs} args - Group by arguments.
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
      T extends verificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: verificationGroupByArgs['orderBy'] }
        : { orderBy?: verificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, verificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the verification model
   */
  readonly fields: verificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__verificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the verification model
   */
  interface verificationFieldRefs {
    readonly id: FieldRef<"verification", 'String'>
    readonly identifier: FieldRef<"verification", 'String'>
    readonly value: FieldRef<"verification", 'String'>
    readonly expiresAt: FieldRef<"verification", 'DateTime'>
    readonly createdAt: FieldRef<"verification", 'DateTime'>
    readonly updatedAt: FieldRef<"verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * verification findUnique
   */
  export type verificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification findUniqueOrThrow
   */
  export type verificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification findFirst
   */
  export type verificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification findFirstOrThrow
   */
  export type verificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification findMany
   */
  export type verificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verifications to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification create
   */
  export type verificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data needed to create a verification.
     */
    data: XOR<verificationCreateInput, verificationUncheckedCreateInput>
  }

  /**
   * verification createMany
   */
  export type verificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many verifications.
     */
    data: verificationCreateManyInput | verificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification createManyAndReturn
   */
  export type verificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data used to create many verifications.
     */
    data: verificationCreateManyInput | verificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification update
   */
  export type verificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data needed to update a verification.
     */
    data: XOR<verificationUpdateInput, verificationUncheckedUpdateInput>
    /**
     * Choose, which verification to update.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification updateMany
   */
  export type verificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update verifications.
     */
    data: XOR<verificationUpdateManyMutationInput, verificationUncheckedUpdateManyInput>
    /**
     * Filter which verifications to update
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to update.
     */
    limit?: number
  }

  /**
   * verification updateManyAndReturn
   */
  export type verificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data used to update verifications.
     */
    data: XOR<verificationUpdateManyMutationInput, verificationUncheckedUpdateManyInput>
    /**
     * Filter which verifications to update
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to update.
     */
    limit?: number
  }

  /**
   * verification upsert
   */
  export type verificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The filter to search for the verification to update in case it exists.
     */
    where: verificationWhereUniqueInput
    /**
     * In case the verification found by the `where` argument doesn't exist, create a new verification with this data.
     */
    create: XOR<verificationCreateInput, verificationUncheckedCreateInput>
    /**
     * In case the verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<verificationUpdateInput, verificationUncheckedUpdateInput>
  }

  /**
   * verification delete
   */
  export type verificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter which verification to delete.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification deleteMany
   */
  export type verificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verifications to delete
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to delete.
     */
    limit?: number
  }

  /**
   * verification without action
   */
  export type verificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
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


  export const BrandScalarFieldEnum: {
    userId: 'userId',
    name: 'name',
    description: 'description',
    url: 'url',
    logoId: 'logoId'
  };

  export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    userId: 'userId',
    name: 'name',
    dateOfBirth: 'dateOfBirth',
    preferences: 'preferences'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ItemFavoriteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    itemUuid: 'itemUuid',
    createdAt: 'createdAt'
  };

  export type ItemFavoriteScalarFieldEnum = (typeof ItemFavoriteScalarFieldEnum)[keyof typeof ItemFavoriteScalarFieldEnum]


  export const ItemLikeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    itemUuid: 'itemUuid',
    createdAt: 'createdAt'
  };

  export type ItemLikeScalarFieldEnum = (typeof ItemLikeScalarFieldEnum)[keyof typeof ItemLikeScalarFieldEnum]


  export const RegisterInProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    verificationCode: 'verificationCode',
    verificationCodeExpiration: 'verificationCodeExpiration',
    token: 'token'
  };

  export type RegisterInProgressScalarFieldEnum = (typeof RegisterInProgressScalarFieldEnum)[keyof typeof RegisterInProgressScalarFieldEnum]


  export const ResetPasswordInProgressScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    verificationCode: 'verificationCode',
    verificationCodeExpiration: 'verificationCodeExpiration',
    token: 'token'
  };

  export type ResetPasswordInProgressScalarFieldEnum = (typeof ResetPasswordInProgressScalarFieldEnum)[keyof typeof ResetPasswordInProgressScalarFieldEnum]


  export const InspoItemsScalarFieldEnum: {
    id: 'id',
    itemUuid: 'itemUuid',
    category: 'category',
    index: 'index'
  };

  export type InspoItemsScalarFieldEnum = (typeof InspoItemsScalarFieldEnum)[keyof typeof InspoItemsScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    url: 'url',
    brandId: 'brandId',
    imageId: 'imageId'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const FilesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    contentType: 'contentType',
    bucket: 'bucket',
    url: 'url',
    uploadUrl: 'uploadUrl',
    width: 'width',
    height: 'height',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FilesScalarFieldEnum = (typeof FilesScalarFieldEnum)[keyof typeof FilesScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userType: 'userType'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


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


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type BrandWhereInput = {
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    userId?: UuidFilter<"Brand"> | string
    name?: StringFilter<"Brand"> | string
    description?: StringFilter<"Brand"> | string
    url?: StringFilter<"Brand"> | string
    logoId?: UuidFilter<"Brand"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: ItemListRelationFilter
    files?: XOR<FilesScalarRelationFilter, FilesWhereInput>
  }

  export type BrandOrderByWithRelationInput = {
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoId?: SortOrder
    user?: userOrderByWithRelationInput
    item?: ItemOrderByRelationAggregateInput
    files?: FilesOrderByWithRelationInput
  }

  export type BrandWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: BrandWhereInput | BrandWhereInput[]
    OR?: BrandWhereInput[]
    NOT?: BrandWhereInput | BrandWhereInput[]
    name?: StringFilter<"Brand"> | string
    description?: StringFilter<"Brand"> | string
    url?: StringFilter<"Brand"> | string
    logoId?: UuidFilter<"Brand"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: ItemListRelationFilter
    files?: XOR<FilesScalarRelationFilter, FilesWhereInput>
  }, "userId">

  export type BrandOrderByWithAggregationInput = {
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoId?: SortOrder
    _count?: BrandCountOrderByAggregateInput
    _max?: BrandMaxOrderByAggregateInput
    _min?: BrandMinOrderByAggregateInput
  }

  export type BrandScalarWhereWithAggregatesInput = {
    AND?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    OR?: BrandScalarWhereWithAggregatesInput[]
    NOT?: BrandScalarWhereWithAggregatesInput | BrandScalarWhereWithAggregatesInput[]
    userId?: UuidWithAggregatesFilter<"Brand"> | string
    name?: StringWithAggregatesFilter<"Brand"> | string
    description?: StringWithAggregatesFilter<"Brand"> | string
    url?: StringWithAggregatesFilter<"Brand"> | string
    logoId?: UuidWithAggregatesFilter<"Brand"> | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    userId?: UuidFilter<"Client"> | string
    name?: StringFilter<"Client"> | string
    dateOfBirth?: DateTimeNullableFilter<"Client"> | Date | string | null
    preferences?: JsonNullableFilter<"Client">
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type ClientOrderByWithRelationInput = {
    userId?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    preferences?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    dateOfBirth?: DateTimeNullableFilter<"Client"> | Date | string | null
    preferences?: JsonNullableFilter<"Client">
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "userId">

  export type ClientOrderByWithAggregationInput = {
    userId?: SortOrder
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
    userId?: UuidWithAggregatesFilter<"Client"> | string
    name?: StringWithAggregatesFilter<"Client"> | string
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    preferences?: JsonNullableWithAggregatesFilter<"Client">
  }

  export type ItemFavoriteWhereInput = {
    AND?: ItemFavoriteWhereInput | ItemFavoriteWhereInput[]
    OR?: ItemFavoriteWhereInput[]
    NOT?: ItemFavoriteWhereInput | ItemFavoriteWhereInput[]
    id?: UuidFilter<"ItemFavorite"> | string
    userId?: UuidFilter<"ItemFavorite"> | string
    itemUuid?: UuidFilter<"ItemFavorite"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavorite"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }

  export type ItemFavoriteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
  }

  export type ItemFavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_itemUuid?: ItemFavoriteUserIdItemUuidCompoundUniqueInput
    AND?: ItemFavoriteWhereInput | ItemFavoriteWhereInput[]
    OR?: ItemFavoriteWhereInput[]
    NOT?: ItemFavoriteWhereInput | ItemFavoriteWhereInput[]
    userId?: UuidFilter<"ItemFavorite"> | string
    itemUuid?: UuidFilter<"ItemFavorite"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavorite"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }, "id" | "userId_itemUuid">

  export type ItemFavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: ItemFavoriteCountOrderByAggregateInput
    _max?: ItemFavoriteMaxOrderByAggregateInput
    _min?: ItemFavoriteMinOrderByAggregateInput
  }

  export type ItemFavoriteScalarWhereWithAggregatesInput = {
    AND?: ItemFavoriteScalarWhereWithAggregatesInput | ItemFavoriteScalarWhereWithAggregatesInput[]
    OR?: ItemFavoriteScalarWhereWithAggregatesInput[]
    NOT?: ItemFavoriteScalarWhereWithAggregatesInput | ItemFavoriteScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ItemFavorite"> | string
    userId?: UuidWithAggregatesFilter<"ItemFavorite"> | string
    itemUuid?: UuidWithAggregatesFilter<"ItemFavorite"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ItemFavorite"> | Date | string | null
  }

  export type ItemLikeWhereInput = {
    AND?: ItemLikeWhereInput | ItemLikeWhereInput[]
    OR?: ItemLikeWhereInput[]
    NOT?: ItemLikeWhereInput | ItemLikeWhereInput[]
    id?: UuidFilter<"ItemLike"> | string
    userId?: UuidFilter<"ItemLike"> | string
    itemUuid?: UuidFilter<"ItemLike"> | string
    createdAt?: DateTimeNullableFilter<"ItemLike"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }

  export type ItemLikeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
    item?: ItemOrderByWithRelationInput
  }

  export type ItemLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_itemUuid?: ItemLikeUserIdItemUuidCompoundUniqueInput
    AND?: ItemLikeWhereInput | ItemLikeWhereInput[]
    OR?: ItemLikeWhereInput[]
    NOT?: ItemLikeWhereInput | ItemLikeWhereInput[]
    userId?: UuidFilter<"ItemLike"> | string
    itemUuid?: UuidFilter<"ItemLike"> | string
    createdAt?: DateTimeNullableFilter<"ItemLike"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }, "id" | "userId_itemUuid">

  export type ItemLikeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: ItemLikeCountOrderByAggregateInput
    _max?: ItemLikeMaxOrderByAggregateInput
    _min?: ItemLikeMinOrderByAggregateInput
  }

  export type ItemLikeScalarWhereWithAggregatesInput = {
    AND?: ItemLikeScalarWhereWithAggregatesInput | ItemLikeScalarWhereWithAggregatesInput[]
    OR?: ItemLikeScalarWhereWithAggregatesInput[]
    NOT?: ItemLikeScalarWhereWithAggregatesInput | ItemLikeScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ItemLike"> | string
    userId?: UuidWithAggregatesFilter<"ItemLike"> | string
    itemUuid?: UuidWithAggregatesFilter<"ItemLike"> | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"ItemLike"> | Date | string | null
  }

  export type RegisterInProgressWhereInput = {
    AND?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    OR?: RegisterInProgressWhereInput[]
    NOT?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    id?: UuidFilter<"RegisterInProgress"> | string
    userId?: UuidFilter<"RegisterInProgress"> | string
    verificationCode?: StringFilter<"RegisterInProgress"> | string
    verificationCodeExpiration?: StringFilter<"RegisterInProgress"> | string
    token?: StringFilter<"RegisterInProgress"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type RegisterInProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type RegisterInProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    token?: string
    AND?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    OR?: RegisterInProgressWhereInput[]
    NOT?: RegisterInProgressWhereInput | RegisterInProgressWhereInput[]
    verificationCode?: StringFilter<"RegisterInProgress"> | string
    verificationCodeExpiration?: StringFilter<"RegisterInProgress"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "userId" | "token">

  export type RegisterInProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
    _count?: RegisterInProgressCountOrderByAggregateInput
    _max?: RegisterInProgressMaxOrderByAggregateInput
    _min?: RegisterInProgressMinOrderByAggregateInput
  }

  export type RegisterInProgressScalarWhereWithAggregatesInput = {
    AND?: RegisterInProgressScalarWhereWithAggregatesInput | RegisterInProgressScalarWhereWithAggregatesInput[]
    OR?: RegisterInProgressScalarWhereWithAggregatesInput[]
    NOT?: RegisterInProgressScalarWhereWithAggregatesInput | RegisterInProgressScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"RegisterInProgress"> | string
    userId?: UuidWithAggregatesFilter<"RegisterInProgress"> | string
    verificationCode?: StringWithAggregatesFilter<"RegisterInProgress"> | string
    verificationCodeExpiration?: StringWithAggregatesFilter<"RegisterInProgress"> | string
    token?: StringWithAggregatesFilter<"RegisterInProgress"> | string
  }

  export type ResetPasswordInProgressWhereInput = {
    AND?: ResetPasswordInProgressWhereInput | ResetPasswordInProgressWhereInput[]
    OR?: ResetPasswordInProgressWhereInput[]
    NOT?: ResetPasswordInProgressWhereInput | ResetPasswordInProgressWhereInput[]
    id?: UuidFilter<"ResetPasswordInProgress"> | string
    userId?: UuidFilter<"ResetPasswordInProgress"> | string
    verificationCode?: StringFilter<"ResetPasswordInProgress"> | string
    verificationCodeExpiration?: StringFilter<"ResetPasswordInProgress"> | string
    token?: StringFilter<"ResetPasswordInProgress"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type ResetPasswordInProgressOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type ResetPasswordInProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    token?: string
    AND?: ResetPasswordInProgressWhereInput | ResetPasswordInProgressWhereInput[]
    OR?: ResetPasswordInProgressWhereInput[]
    NOT?: ResetPasswordInProgressWhereInput | ResetPasswordInProgressWhereInput[]
    verificationCode?: StringFilter<"ResetPasswordInProgress"> | string
    verificationCodeExpiration?: StringFilter<"ResetPasswordInProgress"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "userId" | "token">

  export type ResetPasswordInProgressOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
    _count?: ResetPasswordInProgressCountOrderByAggregateInput
    _max?: ResetPasswordInProgressMaxOrderByAggregateInput
    _min?: ResetPasswordInProgressMinOrderByAggregateInput
  }

  export type ResetPasswordInProgressScalarWhereWithAggregatesInput = {
    AND?: ResetPasswordInProgressScalarWhereWithAggregatesInput | ResetPasswordInProgressScalarWhereWithAggregatesInput[]
    OR?: ResetPasswordInProgressScalarWhereWithAggregatesInput[]
    NOT?: ResetPasswordInProgressScalarWhereWithAggregatesInput | ResetPasswordInProgressScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ResetPasswordInProgress"> | string
    userId?: UuidWithAggregatesFilter<"ResetPasswordInProgress"> | string
    verificationCode?: StringWithAggregatesFilter<"ResetPasswordInProgress"> | string
    verificationCodeExpiration?: StringWithAggregatesFilter<"ResetPasswordInProgress"> | string
    token?: StringWithAggregatesFilter<"ResetPasswordInProgress"> | string
  }

  export type InspoItemsWhereInput = {
    AND?: InspoItemsWhereInput | InspoItemsWhereInput[]
    OR?: InspoItemsWhereInput[]
    NOT?: InspoItemsWhereInput | InspoItemsWhereInput[]
    id?: UuidFilter<"InspoItems"> | string
    itemUuid?: UuidFilter<"InspoItems"> | string
    category?: StringFilter<"InspoItems"> | string
    index?: IntFilter<"InspoItems"> | number
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }

  export type InspoItemsOrderByWithRelationInput = {
    id?: SortOrder
    itemUuid?: SortOrder
    category?: SortOrder
    index?: SortOrder
    item?: ItemOrderByWithRelationInput
  }

  export type InspoItemsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InspoItemsWhereInput | InspoItemsWhereInput[]
    OR?: InspoItemsWhereInput[]
    NOT?: InspoItemsWhereInput | InspoItemsWhereInput[]
    itemUuid?: UuidFilter<"InspoItems"> | string
    category?: StringFilter<"InspoItems"> | string
    index?: IntFilter<"InspoItems"> | number
    item?: XOR<ItemScalarRelationFilter, ItemWhereInput>
  }, "id">

  export type InspoItemsOrderByWithAggregationInput = {
    id?: SortOrder
    itemUuid?: SortOrder
    category?: SortOrder
    index?: SortOrder
    _count?: InspoItemsCountOrderByAggregateInput
    _avg?: InspoItemsAvgOrderByAggregateInput
    _max?: InspoItemsMaxOrderByAggregateInput
    _min?: InspoItemsMinOrderByAggregateInput
    _sum?: InspoItemsSumOrderByAggregateInput
  }

  export type InspoItemsScalarWhereWithAggregatesInput = {
    AND?: InspoItemsScalarWhereWithAggregatesInput | InspoItemsScalarWhereWithAggregatesInput[]
    OR?: InspoItemsScalarWhereWithAggregatesInput[]
    NOT?: InspoItemsScalarWhereWithAggregatesInput | InspoItemsScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"InspoItems"> | string
    itemUuid?: UuidWithAggregatesFilter<"InspoItems"> | string
    category?: StringWithAggregatesFilter<"InspoItems"> | string
    index?: IntWithAggregatesFilter<"InspoItems"> | number
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: UuidFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    description?: StringFilter<"Item"> | string
    price?: FloatFilter<"Item"> | number
    url?: StringFilter<"Item"> | string
    brandId?: UuidFilter<"Item"> | string
    imageId?: UuidFilter<"Item"> | string
    brand?: XOR<BrandScalarRelationFilter, BrandWhereInput>
    files?: XOR<FilesScalarRelationFilter, FilesWhereInput>
    favorites?: ItemFavoriteListRelationFilter
    likes?: ItemLikeListRelationFilter
    inspoItems?: InspoItemsListRelationFilter
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    url?: SortOrder
    brandId?: SortOrder
    imageId?: SortOrder
    brand?: BrandOrderByWithRelationInput
    files?: FilesOrderByWithRelationInput
    favorites?: ItemFavoriteOrderByRelationAggregateInput
    likes?: ItemLikeOrderByRelationAggregateInput
    inspoItems?: InspoItemsOrderByRelationAggregateInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    name?: StringFilter<"Item"> | string
    description?: StringFilter<"Item"> | string
    price?: FloatFilter<"Item"> | number
    url?: StringFilter<"Item"> | string
    brandId?: UuidFilter<"Item"> | string
    imageId?: UuidFilter<"Item"> | string
    brand?: XOR<BrandScalarRelationFilter, BrandWhereInput>
    files?: XOR<FilesScalarRelationFilter, FilesWhereInput>
    favorites?: ItemFavoriteListRelationFilter
    likes?: ItemLikeListRelationFilter
    inspoItems?: InspoItemsListRelationFilter
  }, "id">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    url?: SortOrder
    brandId?: SortOrder
    imageId?: SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Item"> | string
    name?: StringWithAggregatesFilter<"Item"> | string
    description?: StringWithAggregatesFilter<"Item"> | string
    price?: FloatWithAggregatesFilter<"Item"> | number
    url?: StringWithAggregatesFilter<"Item"> | string
    brandId?: UuidWithAggregatesFilter<"Item"> | string
    imageId?: UuidWithAggregatesFilter<"Item"> | string
  }

  export type FilesWhereInput = {
    AND?: FilesWhereInput | FilesWhereInput[]
    OR?: FilesWhereInput[]
    NOT?: FilesWhereInput | FilesWhereInput[]
    id?: UuidFilter<"Files"> | string
    name?: StringFilter<"Files"> | string
    contentType?: StringFilter<"Files"> | string
    bucket?: StringFilter<"Files"> | string
    url?: StringFilter<"Files"> | string
    uploadUrl?: StringFilter<"Files"> | string
    width?: IntNullableFilter<"Files"> | number | null
    height?: IntNullableFilter<"Files"> | number | null
    metadata?: JsonFilter<"Files">
    createdAt?: DateTimeFilter<"Files"> | Date | string
    updatedAt?: DateTimeFilter<"Files"> | Date | string
    brand?: BrandListRelationFilter
    item?: ItemListRelationFilter
  }

  export type FilesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    bucket?: SortOrder
    url?: SortOrder
    uploadUrl?: SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    brand?: BrandOrderByRelationAggregateInput
    item?: ItemOrderByRelationAggregateInput
  }

  export type FilesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FilesWhereInput | FilesWhereInput[]
    OR?: FilesWhereInput[]
    NOT?: FilesWhereInput | FilesWhereInput[]
    name?: StringFilter<"Files"> | string
    contentType?: StringFilter<"Files"> | string
    bucket?: StringFilter<"Files"> | string
    url?: StringFilter<"Files"> | string
    uploadUrl?: StringFilter<"Files"> | string
    width?: IntNullableFilter<"Files"> | number | null
    height?: IntNullableFilter<"Files"> | number | null
    metadata?: JsonFilter<"Files">
    createdAt?: DateTimeFilter<"Files"> | Date | string
    updatedAt?: DateTimeFilter<"Files"> | Date | string
    brand?: BrandListRelationFilter
    item?: ItemListRelationFilter
  }, "id">

  export type FilesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    bucket?: SortOrder
    url?: SortOrder
    uploadUrl?: SortOrder
    width?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FilesCountOrderByAggregateInput
    _avg?: FilesAvgOrderByAggregateInput
    _max?: FilesMaxOrderByAggregateInput
    _min?: FilesMinOrderByAggregateInput
    _sum?: FilesSumOrderByAggregateInput
  }

  export type FilesScalarWhereWithAggregatesInput = {
    AND?: FilesScalarWhereWithAggregatesInput | FilesScalarWhereWithAggregatesInput[]
    OR?: FilesScalarWhereWithAggregatesInput[]
    NOT?: FilesScalarWhereWithAggregatesInput | FilesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Files"> | string
    name?: StringWithAggregatesFilter<"Files"> | string
    contentType?: StringWithAggregatesFilter<"Files"> | string
    bucket?: StringWithAggregatesFilter<"Files"> | string
    url?: StringWithAggregatesFilter<"Files"> | string
    uploadUrl?: StringWithAggregatesFilter<"Files"> | string
    width?: IntNullableWithAggregatesFilter<"Files"> | number | null
    height?: IntNullableWithAggregatesFilter<"Files"> | number | null
    metadata?: JsonWithAggregatesFilter<"Files">
    createdAt?: DateTimeWithAggregatesFilter<"Files"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Files"> | Date | string
  }

  export type accountWhereInput = {
    AND?: accountWhereInput | accountWhereInput[]
    OR?: accountWhereInput[]
    NOT?: accountWhereInput | accountWhereInput[]
    id?: StringFilter<"account"> | string
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: UuidFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type accountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type accountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: accountWhereInput | accountWhereInput[]
    OR?: accountWhereInput[]
    NOT?: accountWhereInput | accountWhereInput[]
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: UuidFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type accountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: accountCountOrderByAggregateInput
    _max?: accountMaxOrderByAggregateInput
    _min?: accountMinOrderByAggregateInput
  }

  export type accountScalarWhereWithAggregatesInput = {
    AND?: accountScalarWhereWithAggregatesInput | accountScalarWhereWithAggregatesInput[]
    OR?: accountScalarWhereWithAggregatesInput[]
    NOT?: accountScalarWhereWithAggregatesInput | accountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"account"> | string
    accountId?: StringWithAggregatesFilter<"account"> | string
    providerId?: StringWithAggregatesFilter<"account"> | string
    userId?: UuidWithAggregatesFilter<"account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"account"> | string | null
    password?: StringNullableWithAggregatesFilter<"account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"account"> | Date | string
  }

  export type sessionWhereInput = {
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    id?: StringFilter<"session"> | string
    expiresAt?: DateTimeFilter<"session"> | Date | string
    token?: StringFilter<"session"> | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: UuidFilter<"session"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type sessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type sessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    expiresAt?: DateTimeFilter<"session"> | Date | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: UuidFilter<"session"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "token">

  export type sessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: sessionCountOrderByAggregateInput
    _max?: sessionMaxOrderByAggregateInput
    _min?: sessionMinOrderByAggregateInput
  }

  export type sessionScalarWhereWithAggregatesInput = {
    AND?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    OR?: sessionScalarWhereWithAggregatesInput[]
    NOT?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    token?: StringWithAggregatesFilter<"session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"session"> | string | null
    userId?: UuidWithAggregatesFilter<"session"> | string
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: UuidFilter<"user"> | string
    name?: StringFilter<"user"> | string
    email?: StringFilter<"user"> | string
    emailVerified?: BoolFilter<"user"> | boolean
    image?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    userType?: StringFilter<"user"> | string
    account?: AccountListRelationFilter
    session?: SessionListRelationFilter
    brand?: XOR<BrandNullableScalarRelationFilter, BrandWhereInput> | null
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    itemFavorites?: ItemFavoriteListRelationFilter
    itemLikes?: ItemLikeListRelationFilter
    RegisterInProgress?: RegisterInProgressListRelationFilter
    ResetPasswordInProgress?: ResetPasswordInProgressListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userType?: SortOrder
    account?: accountOrderByRelationAggregateInput
    session?: sessionOrderByRelationAggregateInput
    brand?: BrandOrderByWithRelationInput
    client?: ClientOrderByWithRelationInput
    itemFavorites?: ItemFavoriteOrderByRelationAggregateInput
    itemLikes?: ItemLikeOrderByRelationAggregateInput
    RegisterInProgress?: RegisterInProgressOrderByRelationAggregateInput
    ResetPasswordInProgress?: ResetPasswordInProgressOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringFilter<"user"> | string
    emailVerified?: BoolFilter<"user"> | boolean
    image?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    userType?: StringFilter<"user"> | string
    account?: AccountListRelationFilter
    session?: SessionListRelationFilter
    brand?: XOR<BrandNullableScalarRelationFilter, BrandWhereInput> | null
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    itemFavorites?: ItemFavoriteListRelationFilter
    itemLikes?: ItemLikeListRelationFilter
    RegisterInProgress?: RegisterInProgressListRelationFilter
    ResetPasswordInProgress?: ResetPasswordInProgressListRelationFilter
  }, "id" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userType?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"user"> | string
    name?: StringWithAggregatesFilter<"user"> | string
    email?: StringWithAggregatesFilter<"user"> | string
    emailVerified?: BoolWithAggregatesFilter<"user"> | boolean
    image?: StringNullableWithAggregatesFilter<"user"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    userType?: StringWithAggregatesFilter<"user"> | string
  }

  export type verificationWhereInput = {
    AND?: verificationWhereInput | verificationWhereInput[]
    OR?: verificationWhereInput[]
    NOT?: verificationWhereInput | verificationWhereInput[]
    id?: StringFilter<"verification"> | string
    identifier?: StringFilter<"verification"> | string
    value?: StringFilter<"verification"> | string
    expiresAt?: DateTimeFilter<"verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"verification"> | Date | string | null
  }

  export type verificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type verificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: verificationWhereInput | verificationWhereInput[]
    OR?: verificationWhereInput[]
    NOT?: verificationWhereInput | verificationWhereInput[]
    identifier?: StringFilter<"verification"> | string
    value?: StringFilter<"verification"> | string
    expiresAt?: DateTimeFilter<"verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"verification"> | Date | string | null
  }, "id">

  export type verificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: verificationCountOrderByAggregateInput
    _max?: verificationMaxOrderByAggregateInput
    _min?: verificationMinOrderByAggregateInput
  }

  export type verificationScalarWhereWithAggregatesInput = {
    AND?: verificationScalarWhereWithAggregatesInput | verificationScalarWhereWithAggregatesInput[]
    OR?: verificationScalarWhereWithAggregatesInput[]
    NOT?: verificationScalarWhereWithAggregatesInput | verificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"verification"> | string
    identifier?: StringWithAggregatesFilter<"verification"> | string
    value?: StringWithAggregatesFilter<"verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"verification"> | Date | string | null
  }

  export type BrandCreateInput = {
    name: string
    description: string
    url: string
    user: userCreateNestedOneWithoutBrandInput
    item?: ItemCreateNestedManyWithoutBrandInput
    files: FilesCreateNestedOneWithoutBrandInput
  }

  export type BrandUncheckedCreateInput = {
    userId: string
    name: string
    description: string
    url: string
    logoId: string
    item?: ItemUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutBrandNestedInput
    item?: ItemUpdateManyWithoutBrandNestedInput
    files?: FilesUpdateOneRequiredWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoId?: StringFieldUpdateOperationsInput | string
    item?: ItemUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandCreateManyInput = {
    userId: string
    name: string
    description: string
    url: string
    logoId: string
  }

  export type BrandUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type BrandUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoId?: StringFieldUpdateOperationsInput | string
  }

  export type ClientCreateInput = {
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    user: userCreateNestedOneWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    userId: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
    user?: userUpdateOneRequiredWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientCreateManyInput = {
    userId: string
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ItemFavoriteCreateInput = {
    id?: string
    createdAt?: Date | string | null
    user: userCreateNestedOneWithoutItemFavoritesInput
    item: ItemCreateNestedOneWithoutFavoritesInput
  }

  export type ItemFavoriteUncheckedCreateInput = {
    id?: string
    userId: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutItemFavoritesNestedInput
    item?: ItemUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type ItemFavoriteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteCreateManyInput = {
    id?: string
    userId: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeCreateInput = {
    id?: string
    createdAt?: Date | string | null
    user: userCreateNestedOneWithoutItemLikesInput
    item: ItemCreateNestedOneWithoutLikesInput
  }

  export type ItemLikeUncheckedCreateInput = {
    id?: string
    userId: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutItemLikesNestedInput
    item?: ItemUpdateOneRequiredWithoutLikesNestedInput
  }

  export type ItemLikeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeCreateManyInput = {
    id?: string
    userId: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RegisterInProgressCreateInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
    user: userCreateNestedOneWithoutRegisterInProgressInput
  }

  export type RegisterInProgressUncheckedCreateInput = {
    id?: string
    userId: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type RegisterInProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutRegisterInProgressNestedInput
  }

  export type RegisterInProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type RegisterInProgressCreateManyInput = {
    id?: string
    userId: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type RegisterInProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type RegisterInProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type ResetPasswordInProgressCreateInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
    user: userCreateNestedOneWithoutResetPasswordInProgressInput
  }

  export type ResetPasswordInProgressUncheckedCreateInput = {
    id?: string
    userId: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type ResetPasswordInProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutResetPasswordInProgressNestedInput
  }

  export type ResetPasswordInProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type ResetPasswordInProgressCreateManyInput = {
    id?: string
    userId: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type ResetPasswordInProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type ResetPasswordInProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type InspoItemsCreateInput = {
    id?: string
    category: string
    index: number
    item: ItemCreateNestedOneWithoutInspoItemsInput
  }

  export type InspoItemsUncheckedCreateInput = {
    id?: string
    itemUuid: string
    category: string
    index: number
  }

  export type InspoItemsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
    item?: ItemUpdateOneRequiredWithoutInspoItemsNestedInput
  }

  export type InspoItemsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
  }

  export type InspoItemsCreateManyInput = {
    id?: string
    itemUuid: string
    category: string
    index: number
  }

  export type InspoItemsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
  }

  export type InspoItemsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
  }

  export type ItemCreateInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brand: BrandCreateNestedOneWithoutItemInput
    files: FilesCreateNestedOneWithoutItemInput
    favorites?: ItemFavoriteCreateNestedManyWithoutItemInput
    likes?: ItemLikeCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
    imageId: string
    favorites?: ItemFavoriteUncheckedCreateNestedManyWithoutItemInput
    likes?: ItemLikeUncheckedCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutItemNestedInput
    files?: FilesUpdateOneRequiredWithoutItemNestedInput
    favorites?: ItemFavoriteUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    imageId?: StringFieldUpdateOperationsInput | string
    favorites?: ItemFavoriteUncheckedUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUncheckedUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemCreateManyInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
    imageId: string
  }

  export type ItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    imageId?: StringFieldUpdateOperationsInput | string
  }

  export type FilesCreateInput = {
    id?: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width?: number | null
    height?: number | null
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedManyWithoutFilesInput
    item?: ItemCreateNestedManyWithoutFilesInput
  }

  export type FilesUncheckedCreateInput = {
    id?: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width?: number | null
    height?: number | null
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandUncheckedCreateNestedManyWithoutFilesInput
    item?: ItemUncheckedCreateNestedManyWithoutFilesInput
  }

  export type FilesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateManyWithoutFilesNestedInput
    item?: ItemUpdateManyWithoutFilesNestedInput
  }

  export type FilesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUncheckedUpdateManyWithoutFilesNestedInput
    item?: ItemUncheckedUpdateManyWithoutFilesNestedInput
  }

  export type FilesCreateManyInput = {
    id?: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width?: number | null
    height?: number | null
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FilesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FilesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    user: userCreateNestedOneWithoutAccountInput
  }

  export type accountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type accountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutAccountNestedInput
  }

  export type accountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type accountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: userCreateNestedOneWithoutSessionInput
  }

  export type sessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type sessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutSessionNestedInput
  }

  export type sessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type sessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type sessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type userCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
  }

  export type verificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type verificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type verificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type verificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type verificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type verificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type verificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type ItemListRelationFilter = {
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
  }

  export type FilesScalarRelationFilter = {
    is?: FilesWhereInput
    isNot?: FilesWhereInput
  }

  export type ItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BrandCountOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoId?: SortOrder
  }

  export type BrandMaxOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoId?: SortOrder
  }

  export type BrandMinOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    url?: SortOrder
    logoId?: SortOrder
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
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ClientCountOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
    preferences?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    userId?: SortOrder
    name?: SortOrder
    dateOfBirth?: SortOrder
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
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type ItemScalarRelationFilter = {
    is?: ItemWhereInput
    isNot?: ItemWhereInput
  }

  export type ItemFavoriteUserIdItemUuidCompoundUniqueInput = {
    userId: string
    itemUuid: string
  }

  export type ItemFavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemFavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemLikeUserIdItemUuidCompoundUniqueInput = {
    userId: string
    itemUuid: string
  }

  export type ItemLikeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type ItemLikeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    itemUuid?: SortOrder
    createdAt?: SortOrder
  }

  export type RegisterInProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
  }

  export type RegisterInProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
  }

  export type RegisterInProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
  }

  export type ResetPasswordInProgressCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
  }

  export type ResetPasswordInProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
  }

  export type ResetPasswordInProgressMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    verificationCode?: SortOrder
    verificationCodeExpiration?: SortOrder
    token?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type InspoItemsCountOrderByAggregateInput = {
    id?: SortOrder
    itemUuid?: SortOrder
    category?: SortOrder
    index?: SortOrder
  }

  export type InspoItemsAvgOrderByAggregateInput = {
    index?: SortOrder
  }

  export type InspoItemsMaxOrderByAggregateInput = {
    id?: SortOrder
    itemUuid?: SortOrder
    category?: SortOrder
    index?: SortOrder
  }

  export type InspoItemsMinOrderByAggregateInput = {
    id?: SortOrder
    itemUuid?: SortOrder
    category?: SortOrder
    index?: SortOrder
  }

  export type InspoItemsSumOrderByAggregateInput = {
    index?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BrandScalarRelationFilter = {
    is?: BrandWhereInput
    isNot?: BrandWhereInput
  }

  export type ItemFavoriteListRelationFilter = {
    every?: ItemFavoriteWhereInput
    some?: ItemFavoriteWhereInput
    none?: ItemFavoriteWhereInput
  }

  export type ItemLikeListRelationFilter = {
    every?: ItemLikeWhereInput
    some?: ItemLikeWhereInput
    none?: ItemLikeWhereInput
  }

  export type InspoItemsListRelationFilter = {
    every?: InspoItemsWhereInput
    some?: InspoItemsWhereInput
    none?: InspoItemsWhereInput
  }

  export type ItemFavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InspoItemsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    url?: SortOrder
    brandId?: SortOrder
    imageId?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    url?: SortOrder
    brandId?: SortOrder
    imageId?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    url?: SortOrder
    brandId?: SortOrder
    imageId?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BrandListRelationFilter = {
    every?: BrandWhereInput
    some?: BrandWhereInput
    none?: BrandWhereInput
  }

  export type BrandOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FilesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    bucket?: SortOrder
    url?: SortOrder
    uploadUrl?: SortOrder
    width?: SortOrder
    height?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FilesAvgOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type FilesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    bucket?: SortOrder
    url?: SortOrder
    uploadUrl?: SortOrder
    width?: SortOrder
    height?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FilesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    contentType?: SortOrder
    bucket?: SortOrder
    url?: SortOrder
    uploadUrl?: SortOrder
    width?: SortOrder
    height?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FilesSumOrderByAggregateInput = {
    width?: SortOrder
    height?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type accountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type accountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type accountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type sessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type sessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type sessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AccountListRelationFilter = {
    every?: accountWhereInput
    some?: accountWhereInput
    none?: accountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: sessionWhereInput
    some?: sessionWhereInput
    none?: sessionWhereInput
  }

  export type BrandNullableScalarRelationFilter = {
    is?: BrandWhereInput | null
    isNot?: BrandWhereInput | null
  }

  export type ClientNullableScalarRelationFilter = {
    is?: ClientWhereInput | null
    isNot?: ClientWhereInput | null
  }

  export type RegisterInProgressListRelationFilter = {
    every?: RegisterInProgressWhereInput
    some?: RegisterInProgressWhereInput
    none?: RegisterInProgressWhereInput
  }

  export type ResetPasswordInProgressListRelationFilter = {
    every?: ResetPasswordInProgressWhereInput
    some?: ResetPasswordInProgressWhereInput
    none?: ResetPasswordInProgressWhereInput
  }

  export type accountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegisterInProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResetPasswordInProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userType?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userType?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userType?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type verificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type verificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type verificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userCreateNestedOneWithoutBrandInput = {
    create?: XOR<userCreateWithoutBrandInput, userUncheckedCreateWithoutBrandInput>
    connectOrCreate?: userCreateOrConnectWithoutBrandInput
    connect?: userWhereUniqueInput
  }

  export type ItemCreateNestedManyWithoutBrandInput = {
    create?: XOR<ItemCreateWithoutBrandInput, ItemUncheckedCreateWithoutBrandInput> | ItemCreateWithoutBrandInput[] | ItemUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutBrandInput | ItemCreateOrConnectWithoutBrandInput[]
    createMany?: ItemCreateManyBrandInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type FilesCreateNestedOneWithoutBrandInput = {
    create?: XOR<FilesCreateWithoutBrandInput, FilesUncheckedCreateWithoutBrandInput>
    connectOrCreate?: FilesCreateOrConnectWithoutBrandInput
    connect?: FilesWhereUniqueInput
  }

  export type ItemUncheckedCreateNestedManyWithoutBrandInput = {
    create?: XOR<ItemCreateWithoutBrandInput, ItemUncheckedCreateWithoutBrandInput> | ItemCreateWithoutBrandInput[] | ItemUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutBrandInput | ItemCreateOrConnectWithoutBrandInput[]
    createMany?: ItemCreateManyBrandInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type userUpdateOneRequiredWithoutBrandNestedInput = {
    create?: XOR<userCreateWithoutBrandInput, userUncheckedCreateWithoutBrandInput>
    connectOrCreate?: userCreateOrConnectWithoutBrandInput
    upsert?: userUpsertWithoutBrandInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutBrandInput, userUpdateWithoutBrandInput>, userUncheckedUpdateWithoutBrandInput>
  }

  export type ItemUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ItemCreateWithoutBrandInput, ItemUncheckedCreateWithoutBrandInput> | ItemCreateWithoutBrandInput[] | ItemUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutBrandInput | ItemCreateOrConnectWithoutBrandInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutBrandInput | ItemUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ItemCreateManyBrandInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutBrandInput | ItemUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutBrandInput | ItemUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type FilesUpdateOneRequiredWithoutBrandNestedInput = {
    create?: XOR<FilesCreateWithoutBrandInput, FilesUncheckedCreateWithoutBrandInput>
    connectOrCreate?: FilesCreateOrConnectWithoutBrandInput
    upsert?: FilesUpsertWithoutBrandInput
    connect?: FilesWhereUniqueInput
    update?: XOR<XOR<FilesUpdateToOneWithWhereWithoutBrandInput, FilesUpdateWithoutBrandInput>, FilesUncheckedUpdateWithoutBrandInput>
  }

  export type ItemUncheckedUpdateManyWithoutBrandNestedInput = {
    create?: XOR<ItemCreateWithoutBrandInput, ItemUncheckedCreateWithoutBrandInput> | ItemCreateWithoutBrandInput[] | ItemUncheckedCreateWithoutBrandInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutBrandInput | ItemCreateOrConnectWithoutBrandInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutBrandInput | ItemUpsertWithWhereUniqueWithoutBrandInput[]
    createMany?: ItemCreateManyBrandInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutBrandInput | ItemUpdateWithWhereUniqueWithoutBrandInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutBrandInput | ItemUpdateManyWithWhereWithoutBrandInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutClientInput = {
    create?: XOR<userCreateWithoutClientInput, userUncheckedCreateWithoutClientInput>
    connectOrCreate?: userCreateOrConnectWithoutClientInput
    connect?: userWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type userUpdateOneRequiredWithoutClientNestedInput = {
    create?: XOR<userCreateWithoutClientInput, userUncheckedCreateWithoutClientInput>
    connectOrCreate?: userCreateOrConnectWithoutClientInput
    upsert?: userUpsertWithoutClientInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutClientInput, userUpdateWithoutClientInput>, userUncheckedUpdateWithoutClientInput>
  }

  export type userCreateNestedOneWithoutItemFavoritesInput = {
    create?: XOR<userCreateWithoutItemFavoritesInput, userUncheckedCreateWithoutItemFavoritesInput>
    connectOrCreate?: userCreateOrConnectWithoutItemFavoritesInput
    connect?: userWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutFavoritesInput
    connect?: ItemWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutItemFavoritesNestedInput = {
    create?: XOR<userCreateWithoutItemFavoritesInput, userUncheckedCreateWithoutItemFavoritesInput>
    connectOrCreate?: userCreateOrConnectWithoutItemFavoritesInput
    upsert?: userUpsertWithoutItemFavoritesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutItemFavoritesInput, userUpdateWithoutItemFavoritesInput>, userUncheckedUpdateWithoutItemFavoritesInput>
  }

  export type ItemUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutFavoritesInput
    upsert?: ItemUpsertWithoutFavoritesInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutFavoritesInput, ItemUpdateWithoutFavoritesInput>, ItemUncheckedUpdateWithoutFavoritesInput>
  }

  export type userCreateNestedOneWithoutItemLikesInput = {
    create?: XOR<userCreateWithoutItemLikesInput, userUncheckedCreateWithoutItemLikesInput>
    connectOrCreate?: userCreateOrConnectWithoutItemLikesInput
    connect?: userWhereUniqueInput
  }

  export type ItemCreateNestedOneWithoutLikesInput = {
    create?: XOR<ItemCreateWithoutLikesInput, ItemUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutLikesInput
    connect?: ItemWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutItemLikesNestedInput = {
    create?: XOR<userCreateWithoutItemLikesInput, userUncheckedCreateWithoutItemLikesInput>
    connectOrCreate?: userCreateOrConnectWithoutItemLikesInput
    upsert?: userUpsertWithoutItemLikesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutItemLikesInput, userUpdateWithoutItemLikesInput>, userUncheckedUpdateWithoutItemLikesInput>
  }

  export type ItemUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<ItemCreateWithoutLikesInput, ItemUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ItemCreateOrConnectWithoutLikesInput
    upsert?: ItemUpsertWithoutLikesInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutLikesInput, ItemUpdateWithoutLikesInput>, ItemUncheckedUpdateWithoutLikesInput>
  }

  export type userCreateNestedOneWithoutRegisterInProgressInput = {
    create?: XOR<userCreateWithoutRegisterInProgressInput, userUncheckedCreateWithoutRegisterInProgressInput>
    connectOrCreate?: userCreateOrConnectWithoutRegisterInProgressInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutRegisterInProgressNestedInput = {
    create?: XOR<userCreateWithoutRegisterInProgressInput, userUncheckedCreateWithoutRegisterInProgressInput>
    connectOrCreate?: userCreateOrConnectWithoutRegisterInProgressInput
    upsert?: userUpsertWithoutRegisterInProgressInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutRegisterInProgressInput, userUpdateWithoutRegisterInProgressInput>, userUncheckedUpdateWithoutRegisterInProgressInput>
  }

  export type userCreateNestedOneWithoutResetPasswordInProgressInput = {
    create?: XOR<userCreateWithoutResetPasswordInProgressInput, userUncheckedCreateWithoutResetPasswordInProgressInput>
    connectOrCreate?: userCreateOrConnectWithoutResetPasswordInProgressInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutResetPasswordInProgressNestedInput = {
    create?: XOR<userCreateWithoutResetPasswordInProgressInput, userUncheckedCreateWithoutResetPasswordInProgressInput>
    connectOrCreate?: userCreateOrConnectWithoutResetPasswordInProgressInput
    upsert?: userUpsertWithoutResetPasswordInProgressInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutResetPasswordInProgressInput, userUpdateWithoutResetPasswordInProgressInput>, userUncheckedUpdateWithoutResetPasswordInProgressInput>
  }

  export type ItemCreateNestedOneWithoutInspoItemsInput = {
    create?: XOR<ItemCreateWithoutInspoItemsInput, ItemUncheckedCreateWithoutInspoItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutInspoItemsInput
    connect?: ItemWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ItemUpdateOneRequiredWithoutInspoItemsNestedInput = {
    create?: XOR<ItemCreateWithoutInspoItemsInput, ItemUncheckedCreateWithoutInspoItemsInput>
    connectOrCreate?: ItemCreateOrConnectWithoutInspoItemsInput
    upsert?: ItemUpsertWithoutInspoItemsInput
    connect?: ItemWhereUniqueInput
    update?: XOR<XOR<ItemUpdateToOneWithWhereWithoutInspoItemsInput, ItemUpdateWithoutInspoItemsInput>, ItemUncheckedUpdateWithoutInspoItemsInput>
  }

  export type BrandCreateNestedOneWithoutItemInput = {
    create?: XOR<BrandCreateWithoutItemInput, BrandUncheckedCreateWithoutItemInput>
    connectOrCreate?: BrandCreateOrConnectWithoutItemInput
    connect?: BrandWhereUniqueInput
  }

  export type FilesCreateNestedOneWithoutItemInput = {
    create?: XOR<FilesCreateWithoutItemInput, FilesUncheckedCreateWithoutItemInput>
    connectOrCreate?: FilesCreateOrConnectWithoutItemInput
    connect?: FilesWhereUniqueInput
  }

  export type ItemFavoriteCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemFavoriteCreateWithoutItemInput, ItemFavoriteUncheckedCreateWithoutItemInput> | ItemFavoriteCreateWithoutItemInput[] | ItemFavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutItemInput | ItemFavoriteCreateOrConnectWithoutItemInput[]
    createMany?: ItemFavoriteCreateManyItemInputEnvelope
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
  }

  export type ItemLikeCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemLikeCreateWithoutItemInput, ItemLikeUncheckedCreateWithoutItemInput> | ItemLikeCreateWithoutItemInput[] | ItemLikeUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutItemInput | ItemLikeCreateOrConnectWithoutItemInput[]
    createMany?: ItemLikeCreateManyItemInputEnvelope
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
  }

  export type InspoItemsCreateNestedManyWithoutItemInput = {
    create?: XOR<InspoItemsCreateWithoutItemInput, InspoItemsUncheckedCreateWithoutItemInput> | InspoItemsCreateWithoutItemInput[] | InspoItemsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InspoItemsCreateOrConnectWithoutItemInput | InspoItemsCreateOrConnectWithoutItemInput[]
    createMany?: InspoItemsCreateManyItemInputEnvelope
    connect?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
  }

  export type ItemFavoriteUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemFavoriteCreateWithoutItemInput, ItemFavoriteUncheckedCreateWithoutItemInput> | ItemFavoriteCreateWithoutItemInput[] | ItemFavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutItemInput | ItemFavoriteCreateOrConnectWithoutItemInput[]
    createMany?: ItemFavoriteCreateManyItemInputEnvelope
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
  }

  export type ItemLikeUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<ItemLikeCreateWithoutItemInput, ItemLikeUncheckedCreateWithoutItemInput> | ItemLikeCreateWithoutItemInput[] | ItemLikeUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutItemInput | ItemLikeCreateOrConnectWithoutItemInput[]
    createMany?: ItemLikeCreateManyItemInputEnvelope
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
  }

  export type InspoItemsUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<InspoItemsCreateWithoutItemInput, InspoItemsUncheckedCreateWithoutItemInput> | InspoItemsCreateWithoutItemInput[] | InspoItemsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InspoItemsCreateOrConnectWithoutItemInput | InspoItemsCreateOrConnectWithoutItemInput[]
    createMany?: InspoItemsCreateManyItemInputEnvelope
    connect?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BrandUpdateOneRequiredWithoutItemNestedInput = {
    create?: XOR<BrandCreateWithoutItemInput, BrandUncheckedCreateWithoutItemInput>
    connectOrCreate?: BrandCreateOrConnectWithoutItemInput
    upsert?: BrandUpsertWithoutItemInput
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutItemInput, BrandUpdateWithoutItemInput>, BrandUncheckedUpdateWithoutItemInput>
  }

  export type FilesUpdateOneRequiredWithoutItemNestedInput = {
    create?: XOR<FilesCreateWithoutItemInput, FilesUncheckedCreateWithoutItemInput>
    connectOrCreate?: FilesCreateOrConnectWithoutItemInput
    upsert?: FilesUpsertWithoutItemInput
    connect?: FilesWhereUniqueInput
    update?: XOR<XOR<FilesUpdateToOneWithWhereWithoutItemInput, FilesUpdateWithoutItemInput>, FilesUncheckedUpdateWithoutItemInput>
  }

  export type ItemFavoriteUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemFavoriteCreateWithoutItemInput, ItemFavoriteUncheckedCreateWithoutItemInput> | ItemFavoriteCreateWithoutItemInput[] | ItemFavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutItemInput | ItemFavoriteCreateOrConnectWithoutItemInput[]
    upsert?: ItemFavoriteUpsertWithWhereUniqueWithoutItemInput | ItemFavoriteUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemFavoriteCreateManyItemInputEnvelope
    set?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    disconnect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    delete?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    update?: ItemFavoriteUpdateWithWhereUniqueWithoutItemInput | ItemFavoriteUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemFavoriteUpdateManyWithWhereWithoutItemInput | ItemFavoriteUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemFavoriteScalarWhereInput | ItemFavoriteScalarWhereInput[]
  }

  export type ItemLikeUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemLikeCreateWithoutItemInput, ItemLikeUncheckedCreateWithoutItemInput> | ItemLikeCreateWithoutItemInput[] | ItemLikeUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutItemInput | ItemLikeCreateOrConnectWithoutItemInput[]
    upsert?: ItemLikeUpsertWithWhereUniqueWithoutItemInput | ItemLikeUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemLikeCreateManyItemInputEnvelope
    set?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    disconnect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    delete?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    update?: ItemLikeUpdateWithWhereUniqueWithoutItemInput | ItemLikeUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemLikeUpdateManyWithWhereWithoutItemInput | ItemLikeUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemLikeScalarWhereInput | ItemLikeScalarWhereInput[]
  }

  export type InspoItemsUpdateManyWithoutItemNestedInput = {
    create?: XOR<InspoItemsCreateWithoutItemInput, InspoItemsUncheckedCreateWithoutItemInput> | InspoItemsCreateWithoutItemInput[] | InspoItemsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InspoItemsCreateOrConnectWithoutItemInput | InspoItemsCreateOrConnectWithoutItemInput[]
    upsert?: InspoItemsUpsertWithWhereUniqueWithoutItemInput | InspoItemsUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: InspoItemsCreateManyItemInputEnvelope
    set?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    disconnect?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    delete?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    connect?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    update?: InspoItemsUpdateWithWhereUniqueWithoutItemInput | InspoItemsUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: InspoItemsUpdateManyWithWhereWithoutItemInput | InspoItemsUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: InspoItemsScalarWhereInput | InspoItemsScalarWhereInput[]
  }

  export type ItemFavoriteUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemFavoriteCreateWithoutItemInput, ItemFavoriteUncheckedCreateWithoutItemInput> | ItemFavoriteCreateWithoutItemInput[] | ItemFavoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutItemInput | ItemFavoriteCreateOrConnectWithoutItemInput[]
    upsert?: ItemFavoriteUpsertWithWhereUniqueWithoutItemInput | ItemFavoriteUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemFavoriteCreateManyItemInputEnvelope
    set?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    disconnect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    delete?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    update?: ItemFavoriteUpdateWithWhereUniqueWithoutItemInput | ItemFavoriteUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemFavoriteUpdateManyWithWhereWithoutItemInput | ItemFavoriteUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemFavoriteScalarWhereInput | ItemFavoriteScalarWhereInput[]
  }

  export type ItemLikeUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<ItemLikeCreateWithoutItemInput, ItemLikeUncheckedCreateWithoutItemInput> | ItemLikeCreateWithoutItemInput[] | ItemLikeUncheckedCreateWithoutItemInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutItemInput | ItemLikeCreateOrConnectWithoutItemInput[]
    upsert?: ItemLikeUpsertWithWhereUniqueWithoutItemInput | ItemLikeUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: ItemLikeCreateManyItemInputEnvelope
    set?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    disconnect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    delete?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    update?: ItemLikeUpdateWithWhereUniqueWithoutItemInput | ItemLikeUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: ItemLikeUpdateManyWithWhereWithoutItemInput | ItemLikeUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: ItemLikeScalarWhereInput | ItemLikeScalarWhereInput[]
  }

  export type InspoItemsUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<InspoItemsCreateWithoutItemInput, InspoItemsUncheckedCreateWithoutItemInput> | InspoItemsCreateWithoutItemInput[] | InspoItemsUncheckedCreateWithoutItemInput[]
    connectOrCreate?: InspoItemsCreateOrConnectWithoutItemInput | InspoItemsCreateOrConnectWithoutItemInput[]
    upsert?: InspoItemsUpsertWithWhereUniqueWithoutItemInput | InspoItemsUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: InspoItemsCreateManyItemInputEnvelope
    set?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    disconnect?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    delete?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    connect?: InspoItemsWhereUniqueInput | InspoItemsWhereUniqueInput[]
    update?: InspoItemsUpdateWithWhereUniqueWithoutItemInput | InspoItemsUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: InspoItemsUpdateManyWithWhereWithoutItemInput | InspoItemsUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: InspoItemsScalarWhereInput | InspoItemsScalarWhereInput[]
  }

  export type BrandCreateNestedManyWithoutFilesInput = {
    create?: XOR<BrandCreateWithoutFilesInput, BrandUncheckedCreateWithoutFilesInput> | BrandCreateWithoutFilesInput[] | BrandUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: BrandCreateOrConnectWithoutFilesInput | BrandCreateOrConnectWithoutFilesInput[]
    createMany?: BrandCreateManyFilesInputEnvelope
    connect?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutFilesInput = {
    create?: XOR<ItemCreateWithoutFilesInput, ItemUncheckedCreateWithoutFilesInput> | ItemCreateWithoutFilesInput[] | ItemUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutFilesInput | ItemCreateOrConnectWithoutFilesInput[]
    createMany?: ItemCreateManyFilesInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type BrandUncheckedCreateNestedManyWithoutFilesInput = {
    create?: XOR<BrandCreateWithoutFilesInput, BrandUncheckedCreateWithoutFilesInput> | BrandCreateWithoutFilesInput[] | BrandUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: BrandCreateOrConnectWithoutFilesInput | BrandCreateOrConnectWithoutFilesInput[]
    createMany?: BrandCreateManyFilesInputEnvelope
    connect?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutFilesInput = {
    create?: XOR<ItemCreateWithoutFilesInput, ItemUncheckedCreateWithoutFilesInput> | ItemCreateWithoutFilesInput[] | ItemUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutFilesInput | ItemCreateOrConnectWithoutFilesInput[]
    createMany?: ItemCreateManyFilesInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BrandUpdateManyWithoutFilesNestedInput = {
    create?: XOR<BrandCreateWithoutFilesInput, BrandUncheckedCreateWithoutFilesInput> | BrandCreateWithoutFilesInput[] | BrandUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: BrandCreateOrConnectWithoutFilesInput | BrandCreateOrConnectWithoutFilesInput[]
    upsert?: BrandUpsertWithWhereUniqueWithoutFilesInput | BrandUpsertWithWhereUniqueWithoutFilesInput[]
    createMany?: BrandCreateManyFilesInputEnvelope
    set?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    disconnect?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    delete?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    connect?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    update?: BrandUpdateWithWhereUniqueWithoutFilesInput | BrandUpdateWithWhereUniqueWithoutFilesInput[]
    updateMany?: BrandUpdateManyWithWhereWithoutFilesInput | BrandUpdateManyWithWhereWithoutFilesInput[]
    deleteMany?: BrandScalarWhereInput | BrandScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutFilesNestedInput = {
    create?: XOR<ItemCreateWithoutFilesInput, ItemUncheckedCreateWithoutFilesInput> | ItemCreateWithoutFilesInput[] | ItemUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutFilesInput | ItemCreateOrConnectWithoutFilesInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutFilesInput | ItemUpsertWithWhereUniqueWithoutFilesInput[]
    createMany?: ItemCreateManyFilesInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutFilesInput | ItemUpdateWithWhereUniqueWithoutFilesInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutFilesInput | ItemUpdateManyWithWhereWithoutFilesInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type BrandUncheckedUpdateManyWithoutFilesNestedInput = {
    create?: XOR<BrandCreateWithoutFilesInput, BrandUncheckedCreateWithoutFilesInput> | BrandCreateWithoutFilesInput[] | BrandUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: BrandCreateOrConnectWithoutFilesInput | BrandCreateOrConnectWithoutFilesInput[]
    upsert?: BrandUpsertWithWhereUniqueWithoutFilesInput | BrandUpsertWithWhereUniqueWithoutFilesInput[]
    createMany?: BrandCreateManyFilesInputEnvelope
    set?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    disconnect?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    delete?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    connect?: BrandWhereUniqueInput | BrandWhereUniqueInput[]
    update?: BrandUpdateWithWhereUniqueWithoutFilesInput | BrandUpdateWithWhereUniqueWithoutFilesInput[]
    updateMany?: BrandUpdateManyWithWhereWithoutFilesInput | BrandUpdateManyWithWhereWithoutFilesInput[]
    deleteMany?: BrandScalarWhereInput | BrandScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutFilesNestedInput = {
    create?: XOR<ItemCreateWithoutFilesInput, ItemUncheckedCreateWithoutFilesInput> | ItemCreateWithoutFilesInput[] | ItemUncheckedCreateWithoutFilesInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutFilesInput | ItemCreateOrConnectWithoutFilesInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutFilesInput | ItemUpsertWithWhereUniqueWithoutFilesInput[]
    createMany?: ItemCreateManyFilesInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutFilesInput | ItemUpdateWithWhereUniqueWithoutFilesInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutFilesInput | ItemUpdateManyWithWhereWithoutFilesInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutAccountInput = {
    create?: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
    connectOrCreate?: userCreateOrConnectWithoutAccountInput
    connect?: userWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type userUpdateOneRequiredWithoutAccountNestedInput = {
    create?: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
    connectOrCreate?: userCreateOrConnectWithoutAccountInput
    upsert?: userUpsertWithoutAccountInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutAccountInput, userUpdateWithoutAccountInput>, userUncheckedUpdateWithoutAccountInput>
  }

  export type userCreateNestedOneWithoutSessionInput = {
    create?: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
    connectOrCreate?: userCreateOrConnectWithoutSessionInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutSessionNestedInput = {
    create?: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
    connectOrCreate?: userCreateOrConnectWithoutSessionInput
    upsert?: userUpsertWithoutSessionInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutSessionInput, userUpdateWithoutSessionInput>, userUncheckedUpdateWithoutSessionInput>
  }

  export type accountCreateNestedManyWithoutUserInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
  }

  export type sessionCreateNestedManyWithoutUserInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
  }

  export type BrandCreateNestedOneWithoutUserInput = {
    create?: XOR<BrandCreateWithoutUserInput, BrandUncheckedCreateWithoutUserInput>
    connectOrCreate?: BrandCreateOrConnectWithoutUserInput
    connect?: BrandWhereUniqueInput
  }

  export type ClientCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    connect?: ClientWhereUniqueInput
  }

  export type ItemFavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemFavoriteCreateWithoutUserInput, ItemFavoriteUncheckedCreateWithoutUserInput> | ItemFavoriteCreateWithoutUserInput[] | ItemFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutUserInput | ItemFavoriteCreateOrConnectWithoutUserInput[]
    createMany?: ItemFavoriteCreateManyUserInputEnvelope
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
  }

  export type ItemLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemLikeCreateWithoutUserInput, ItemLikeUncheckedCreateWithoutUserInput> | ItemLikeCreateWithoutUserInput[] | ItemLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutUserInput | ItemLikeCreateOrConnectWithoutUserInput[]
    createMany?: ItemLikeCreateManyUserInputEnvelope
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
  }

  export type RegisterInProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<RegisterInProgressCreateWithoutUserInput, RegisterInProgressUncheckedCreateWithoutUserInput> | RegisterInProgressCreateWithoutUserInput[] | RegisterInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegisterInProgressCreateOrConnectWithoutUserInput | RegisterInProgressCreateOrConnectWithoutUserInput[]
    createMany?: RegisterInProgressCreateManyUserInputEnvelope
    connect?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
  }

  export type ResetPasswordInProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetPasswordInProgressCreateWithoutUserInput, ResetPasswordInProgressUncheckedCreateWithoutUserInput> | ResetPasswordInProgressCreateWithoutUserInput[] | ResetPasswordInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordInProgressCreateOrConnectWithoutUserInput | ResetPasswordInProgressCreateOrConnectWithoutUserInput[]
    createMany?: ResetPasswordInProgressCreateManyUserInputEnvelope
    connect?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
  }

  export type accountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
  }

  export type sessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
  }

  export type BrandUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<BrandCreateWithoutUserInput, BrandUncheckedCreateWithoutUserInput>
    connectOrCreate?: BrandCreateOrConnectWithoutUserInput
    connect?: BrandWhereUniqueInput
  }

  export type ClientUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    connect?: ClientWhereUniqueInput
  }

  export type ItemFavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemFavoriteCreateWithoutUserInput, ItemFavoriteUncheckedCreateWithoutUserInput> | ItemFavoriteCreateWithoutUserInput[] | ItemFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutUserInput | ItemFavoriteCreateOrConnectWithoutUserInput[]
    createMany?: ItemFavoriteCreateManyUserInputEnvelope
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
  }

  export type ItemLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ItemLikeCreateWithoutUserInput, ItemLikeUncheckedCreateWithoutUserInput> | ItemLikeCreateWithoutUserInput[] | ItemLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutUserInput | ItemLikeCreateOrConnectWithoutUserInput[]
    createMany?: ItemLikeCreateManyUserInputEnvelope
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
  }

  export type RegisterInProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RegisterInProgressCreateWithoutUserInput, RegisterInProgressUncheckedCreateWithoutUserInput> | RegisterInProgressCreateWithoutUserInput[] | RegisterInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegisterInProgressCreateOrConnectWithoutUserInput | RegisterInProgressCreateOrConnectWithoutUserInput[]
    createMany?: RegisterInProgressCreateManyUserInputEnvelope
    connect?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
  }

  export type ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ResetPasswordInProgressCreateWithoutUserInput, ResetPasswordInProgressUncheckedCreateWithoutUserInput> | ResetPasswordInProgressCreateWithoutUserInput[] | ResetPasswordInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordInProgressCreateOrConnectWithoutUserInput | ResetPasswordInProgressCreateOrConnectWithoutUserInput[]
    createMany?: ResetPasswordInProgressCreateManyUserInputEnvelope
    connect?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type accountUpdateManyWithoutUserNestedInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    upsert?: accountUpsertWithWhereUniqueWithoutUserInput | accountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    set?: accountWhereUniqueInput | accountWhereUniqueInput[]
    disconnect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    delete?: accountWhereUniqueInput | accountWhereUniqueInput[]
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    update?: accountUpdateWithWhereUniqueWithoutUserInput | accountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: accountUpdateManyWithWhereWithoutUserInput | accountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: accountScalarWhereInput | accountScalarWhereInput[]
  }

  export type sessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    upsert?: sessionUpsertWithWhereUniqueWithoutUserInput | sessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    set?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    disconnect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    delete?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    update?: sessionUpdateWithWhereUniqueWithoutUserInput | sessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sessionUpdateManyWithWhereWithoutUserInput | sessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sessionScalarWhereInput | sessionScalarWhereInput[]
  }

  export type BrandUpdateOneWithoutUserNestedInput = {
    create?: XOR<BrandCreateWithoutUserInput, BrandUncheckedCreateWithoutUserInput>
    connectOrCreate?: BrandCreateOrConnectWithoutUserInput
    upsert?: BrandUpsertWithoutUserInput
    disconnect?: BrandWhereInput | boolean
    delete?: BrandWhereInput | boolean
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutUserInput, BrandUpdateWithoutUserInput>, BrandUncheckedUpdateWithoutUserInput>
  }

  export type ClientUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    upsert?: ClientUpsertWithoutUserInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutUserInput, ClientUpdateWithoutUserInput>, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ItemFavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemFavoriteCreateWithoutUserInput, ItemFavoriteUncheckedCreateWithoutUserInput> | ItemFavoriteCreateWithoutUserInput[] | ItemFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutUserInput | ItemFavoriteCreateOrConnectWithoutUserInput[]
    upsert?: ItemFavoriteUpsertWithWhereUniqueWithoutUserInput | ItemFavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemFavoriteCreateManyUserInputEnvelope
    set?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    disconnect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    delete?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    update?: ItemFavoriteUpdateWithWhereUniqueWithoutUserInput | ItemFavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemFavoriteUpdateManyWithWhereWithoutUserInput | ItemFavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemFavoriteScalarWhereInput | ItemFavoriteScalarWhereInput[]
  }

  export type ItemLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemLikeCreateWithoutUserInput, ItemLikeUncheckedCreateWithoutUserInput> | ItemLikeCreateWithoutUserInput[] | ItemLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutUserInput | ItemLikeCreateOrConnectWithoutUserInput[]
    upsert?: ItemLikeUpsertWithWhereUniqueWithoutUserInput | ItemLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemLikeCreateManyUserInputEnvelope
    set?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    disconnect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    delete?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    update?: ItemLikeUpdateWithWhereUniqueWithoutUserInput | ItemLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemLikeUpdateManyWithWhereWithoutUserInput | ItemLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemLikeScalarWhereInput | ItemLikeScalarWhereInput[]
  }

  export type RegisterInProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<RegisterInProgressCreateWithoutUserInput, RegisterInProgressUncheckedCreateWithoutUserInput> | RegisterInProgressCreateWithoutUserInput[] | RegisterInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegisterInProgressCreateOrConnectWithoutUserInput | RegisterInProgressCreateOrConnectWithoutUserInput[]
    upsert?: RegisterInProgressUpsertWithWhereUniqueWithoutUserInput | RegisterInProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RegisterInProgressCreateManyUserInputEnvelope
    set?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    disconnect?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    delete?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    connect?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    update?: RegisterInProgressUpdateWithWhereUniqueWithoutUserInput | RegisterInProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RegisterInProgressUpdateManyWithWhereWithoutUserInput | RegisterInProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RegisterInProgressScalarWhereInput | RegisterInProgressScalarWhereInput[]
  }

  export type ResetPasswordInProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetPasswordInProgressCreateWithoutUserInput, ResetPasswordInProgressUncheckedCreateWithoutUserInput> | ResetPasswordInProgressCreateWithoutUserInput[] | ResetPasswordInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordInProgressCreateOrConnectWithoutUserInput | ResetPasswordInProgressCreateOrConnectWithoutUserInput[]
    upsert?: ResetPasswordInProgressUpsertWithWhereUniqueWithoutUserInput | ResetPasswordInProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetPasswordInProgressCreateManyUserInputEnvelope
    set?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    disconnect?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    delete?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    connect?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    update?: ResetPasswordInProgressUpdateWithWhereUniqueWithoutUserInput | ResetPasswordInProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetPasswordInProgressUpdateManyWithWhereWithoutUserInput | ResetPasswordInProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetPasswordInProgressScalarWhereInput | ResetPasswordInProgressScalarWhereInput[]
  }

  export type accountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput> | accountCreateWithoutUserInput[] | accountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: accountCreateOrConnectWithoutUserInput | accountCreateOrConnectWithoutUserInput[]
    upsert?: accountUpsertWithWhereUniqueWithoutUserInput | accountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: accountCreateManyUserInputEnvelope
    set?: accountWhereUniqueInput | accountWhereUniqueInput[]
    disconnect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    delete?: accountWhereUniqueInput | accountWhereUniqueInput[]
    connect?: accountWhereUniqueInput | accountWhereUniqueInput[]
    update?: accountUpdateWithWhereUniqueWithoutUserInput | accountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: accountUpdateManyWithWhereWithoutUserInput | accountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: accountScalarWhereInput | accountScalarWhereInput[]
  }

  export type sessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput> | sessionCreateWithoutUserInput[] | sessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sessionCreateOrConnectWithoutUserInput | sessionCreateOrConnectWithoutUserInput[]
    upsert?: sessionUpsertWithWhereUniqueWithoutUserInput | sessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sessionCreateManyUserInputEnvelope
    set?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    disconnect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    delete?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    connect?: sessionWhereUniqueInput | sessionWhereUniqueInput[]
    update?: sessionUpdateWithWhereUniqueWithoutUserInput | sessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sessionUpdateManyWithWhereWithoutUserInput | sessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sessionScalarWhereInput | sessionScalarWhereInput[]
  }

  export type BrandUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<BrandCreateWithoutUserInput, BrandUncheckedCreateWithoutUserInput>
    connectOrCreate?: BrandCreateOrConnectWithoutUserInput
    upsert?: BrandUpsertWithoutUserInput
    disconnect?: BrandWhereInput | boolean
    delete?: BrandWhereInput | boolean
    connect?: BrandWhereUniqueInput
    update?: XOR<XOR<BrandUpdateToOneWithWhereWithoutUserInput, BrandUpdateWithoutUserInput>, BrandUncheckedUpdateWithoutUserInput>
  }

  export type ClientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    upsert?: ClientUpsertWithoutUserInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutUserInput, ClientUpdateWithoutUserInput>, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemFavoriteCreateWithoutUserInput, ItemFavoriteUncheckedCreateWithoutUserInput> | ItemFavoriteCreateWithoutUserInput[] | ItemFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemFavoriteCreateOrConnectWithoutUserInput | ItemFavoriteCreateOrConnectWithoutUserInput[]
    upsert?: ItemFavoriteUpsertWithWhereUniqueWithoutUserInput | ItemFavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemFavoriteCreateManyUserInputEnvelope
    set?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    disconnect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    delete?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    connect?: ItemFavoriteWhereUniqueInput | ItemFavoriteWhereUniqueInput[]
    update?: ItemFavoriteUpdateWithWhereUniqueWithoutUserInput | ItemFavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemFavoriteUpdateManyWithWhereWithoutUserInput | ItemFavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemFavoriteScalarWhereInput | ItemFavoriteScalarWhereInput[]
  }

  export type ItemLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ItemLikeCreateWithoutUserInput, ItemLikeUncheckedCreateWithoutUserInput> | ItemLikeCreateWithoutUserInput[] | ItemLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ItemLikeCreateOrConnectWithoutUserInput | ItemLikeCreateOrConnectWithoutUserInput[]
    upsert?: ItemLikeUpsertWithWhereUniqueWithoutUserInput | ItemLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ItemLikeCreateManyUserInputEnvelope
    set?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    disconnect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    delete?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    connect?: ItemLikeWhereUniqueInput | ItemLikeWhereUniqueInput[]
    update?: ItemLikeUpdateWithWhereUniqueWithoutUserInput | ItemLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ItemLikeUpdateManyWithWhereWithoutUserInput | ItemLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ItemLikeScalarWhereInput | ItemLikeScalarWhereInput[]
  }

  export type RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RegisterInProgressCreateWithoutUserInput, RegisterInProgressUncheckedCreateWithoutUserInput> | RegisterInProgressCreateWithoutUserInput[] | RegisterInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RegisterInProgressCreateOrConnectWithoutUserInput | RegisterInProgressCreateOrConnectWithoutUserInput[]
    upsert?: RegisterInProgressUpsertWithWhereUniqueWithoutUserInput | RegisterInProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RegisterInProgressCreateManyUserInputEnvelope
    set?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    disconnect?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    delete?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    connect?: RegisterInProgressWhereUniqueInput | RegisterInProgressWhereUniqueInput[]
    update?: RegisterInProgressUpdateWithWhereUniqueWithoutUserInput | RegisterInProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RegisterInProgressUpdateManyWithWhereWithoutUserInput | RegisterInProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RegisterInProgressScalarWhereInput | RegisterInProgressScalarWhereInput[]
  }

  export type ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ResetPasswordInProgressCreateWithoutUserInput, ResetPasswordInProgressUncheckedCreateWithoutUserInput> | ResetPasswordInProgressCreateWithoutUserInput[] | ResetPasswordInProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ResetPasswordInProgressCreateOrConnectWithoutUserInput | ResetPasswordInProgressCreateOrConnectWithoutUserInput[]
    upsert?: ResetPasswordInProgressUpsertWithWhereUniqueWithoutUserInput | ResetPasswordInProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ResetPasswordInProgressCreateManyUserInputEnvelope
    set?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    disconnect?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    delete?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    connect?: ResetPasswordInProgressWhereUniqueInput | ResetPasswordInProgressWhereUniqueInput[]
    update?: ResetPasswordInProgressUpdateWithWhereUniqueWithoutUserInput | ResetPasswordInProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ResetPasswordInProgressUpdateManyWithWhereWithoutUserInput | ResetPasswordInProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ResetPasswordInProgressScalarWhereInput | ResetPasswordInProgressScalarWhereInput[]
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
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type userCreateWithoutBrandInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutBrandInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutBrandInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutBrandInput, userUncheckedCreateWithoutBrandInput>
  }

  export type ItemCreateWithoutBrandInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    files: FilesCreateNestedOneWithoutItemInput
    favorites?: ItemFavoriteCreateNestedManyWithoutItemInput
    likes?: ItemLikeCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutBrandInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    imageId: string
    favorites?: ItemFavoriteUncheckedCreateNestedManyWithoutItemInput
    likes?: ItemLikeUncheckedCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutBrandInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutBrandInput, ItemUncheckedCreateWithoutBrandInput>
  }

  export type ItemCreateManyBrandInputEnvelope = {
    data: ItemCreateManyBrandInput | ItemCreateManyBrandInput[]
    skipDuplicates?: boolean
  }

  export type FilesCreateWithoutBrandInput = {
    id?: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width?: number | null
    height?: number | null
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    item?: ItemCreateNestedManyWithoutFilesInput
  }

  export type FilesUncheckedCreateWithoutBrandInput = {
    id?: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width?: number | null
    height?: number | null
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    item?: ItemUncheckedCreateNestedManyWithoutFilesInput
  }

  export type FilesCreateOrConnectWithoutBrandInput = {
    where: FilesWhereUniqueInput
    create: XOR<FilesCreateWithoutBrandInput, FilesUncheckedCreateWithoutBrandInput>
  }

  export type userUpsertWithoutBrandInput = {
    update: XOR<userUpdateWithoutBrandInput, userUncheckedUpdateWithoutBrandInput>
    create: XOR<userCreateWithoutBrandInput, userUncheckedCreateWithoutBrandInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutBrandInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutBrandInput, userUncheckedUpdateWithoutBrandInput>
  }

  export type userUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemUpsertWithWhereUniqueWithoutBrandInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutBrandInput, ItemUncheckedUpdateWithoutBrandInput>
    create: XOR<ItemCreateWithoutBrandInput, ItemUncheckedCreateWithoutBrandInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutBrandInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutBrandInput, ItemUncheckedUpdateWithoutBrandInput>
  }

  export type ItemUpdateManyWithWhereWithoutBrandInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutBrandInput>
  }

  export type ItemScalarWhereInput = {
    AND?: ItemScalarWhereInput | ItemScalarWhereInput[]
    OR?: ItemScalarWhereInput[]
    NOT?: ItemScalarWhereInput | ItemScalarWhereInput[]
    id?: UuidFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    description?: StringFilter<"Item"> | string
    price?: FloatFilter<"Item"> | number
    url?: StringFilter<"Item"> | string
    brandId?: UuidFilter<"Item"> | string
    imageId?: UuidFilter<"Item"> | string
  }

  export type FilesUpsertWithoutBrandInput = {
    update: XOR<FilesUpdateWithoutBrandInput, FilesUncheckedUpdateWithoutBrandInput>
    create: XOR<FilesCreateWithoutBrandInput, FilesUncheckedCreateWithoutBrandInput>
    where?: FilesWhereInput
  }

  export type FilesUpdateToOneWithWhereWithoutBrandInput = {
    where?: FilesWhereInput
    data: XOR<FilesUpdateWithoutBrandInput, FilesUncheckedUpdateWithoutBrandInput>
  }

  export type FilesUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUpdateManyWithoutFilesNestedInput
  }

  export type FilesUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    item?: ItemUncheckedUpdateManyWithoutFilesNestedInput
  }

  export type userCreateWithoutClientInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutClientInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutClientInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutClientInput, userUncheckedCreateWithoutClientInput>
  }

  export type userUpsertWithoutClientInput = {
    update: XOR<userUpdateWithoutClientInput, userUncheckedUpdateWithoutClientInput>
    create: XOR<userCreateWithoutClientInput, userUncheckedCreateWithoutClientInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutClientInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutClientInput, userUncheckedUpdateWithoutClientInput>
  }

  export type userUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateWithoutItemFavoritesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutItemFavoritesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutItemFavoritesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutItemFavoritesInput, userUncheckedCreateWithoutItemFavoritesInput>
  }

  export type ItemCreateWithoutFavoritesInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brand: BrandCreateNestedOneWithoutItemInput
    files: FilesCreateNestedOneWithoutItemInput
    likes?: ItemLikeCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutFavoritesInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
    imageId: string
    likes?: ItemLikeUncheckedCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutFavoritesInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
  }

  export type userUpsertWithoutItemFavoritesInput = {
    update: XOR<userUpdateWithoutItemFavoritesInput, userUncheckedUpdateWithoutItemFavoritesInput>
    create: XOR<userCreateWithoutItemFavoritesInput, userUncheckedCreateWithoutItemFavoritesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutItemFavoritesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutItemFavoritesInput, userUncheckedUpdateWithoutItemFavoritesInput>
  }

  export type userUpdateWithoutItemFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutItemFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemUpsertWithoutFavoritesInput = {
    update: XOR<ItemUpdateWithoutFavoritesInput, ItemUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ItemCreateWithoutFavoritesInput, ItemUncheckedCreateWithoutFavoritesInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutFavoritesInput, ItemUncheckedUpdateWithoutFavoritesInput>
  }

  export type ItemUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutItemNestedInput
    files?: FilesUpdateOneRequiredWithoutItemNestedInput
    likes?: ItemLikeUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutFavoritesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    imageId?: StringFieldUpdateOperationsInput | string
    likes?: ItemLikeUncheckedUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUncheckedUpdateManyWithoutItemNestedInput
  }

  export type userCreateWithoutItemLikesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutItemLikesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutItemLikesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutItemLikesInput, userUncheckedCreateWithoutItemLikesInput>
  }

  export type ItemCreateWithoutLikesInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brand: BrandCreateNestedOneWithoutItemInput
    files: FilesCreateNestedOneWithoutItemInput
    favorites?: ItemFavoriteCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutLikesInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
    imageId: string
    favorites?: ItemFavoriteUncheckedCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutLikesInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutLikesInput, ItemUncheckedCreateWithoutLikesInput>
  }

  export type userUpsertWithoutItemLikesInput = {
    update: XOR<userUpdateWithoutItemLikesInput, userUncheckedUpdateWithoutItemLikesInput>
    create: XOR<userCreateWithoutItemLikesInput, userUncheckedCreateWithoutItemLikesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutItemLikesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutItemLikesInput, userUncheckedUpdateWithoutItemLikesInput>
  }

  export type userUpdateWithoutItemLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutItemLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemUpsertWithoutLikesInput = {
    update: XOR<ItemUpdateWithoutLikesInput, ItemUncheckedUpdateWithoutLikesInput>
    create: XOR<ItemCreateWithoutLikesInput, ItemUncheckedCreateWithoutLikesInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutLikesInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutLikesInput, ItemUncheckedUpdateWithoutLikesInput>
  }

  export type ItemUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutItemNestedInput
    files?: FilesUpdateOneRequiredWithoutItemNestedInput
    favorites?: ItemFavoriteUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    imageId?: StringFieldUpdateOperationsInput | string
    favorites?: ItemFavoriteUncheckedUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUncheckedUpdateManyWithoutItemNestedInput
  }

  export type userCreateWithoutRegisterInProgressInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutRegisterInProgressInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutRegisterInProgressInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutRegisterInProgressInput, userUncheckedCreateWithoutRegisterInProgressInput>
  }

  export type userUpsertWithoutRegisterInProgressInput = {
    update: XOR<userUpdateWithoutRegisterInProgressInput, userUncheckedUpdateWithoutRegisterInProgressInput>
    create: XOR<userCreateWithoutRegisterInProgressInput, userUncheckedCreateWithoutRegisterInProgressInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutRegisterInProgressInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutRegisterInProgressInput, userUncheckedUpdateWithoutRegisterInProgressInput>
  }

  export type userUpdateWithoutRegisterInProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutRegisterInProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateWithoutResetPasswordInProgressInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    session?: sessionCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutResetPasswordInProgressInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutResetPasswordInProgressInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutResetPasswordInProgressInput, userUncheckedCreateWithoutResetPasswordInProgressInput>
  }

  export type userUpsertWithoutResetPasswordInProgressInput = {
    update: XOR<userUpdateWithoutResetPasswordInProgressInput, userUncheckedUpdateWithoutResetPasswordInProgressInput>
    create: XOR<userCreateWithoutResetPasswordInProgressInput, userUncheckedCreateWithoutResetPasswordInProgressInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutResetPasswordInProgressInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutResetPasswordInProgressInput, userUncheckedUpdateWithoutResetPasswordInProgressInput>
  }

  export type userUpdateWithoutResetPasswordInProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    session?: sessionUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutResetPasswordInProgressInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ItemCreateWithoutInspoItemsInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brand: BrandCreateNestedOneWithoutItemInput
    files: FilesCreateNestedOneWithoutItemInput
    favorites?: ItemFavoriteCreateNestedManyWithoutItemInput
    likes?: ItemLikeCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutInspoItemsInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
    imageId: string
    favorites?: ItemFavoriteUncheckedCreateNestedManyWithoutItemInput
    likes?: ItemLikeUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutInspoItemsInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutInspoItemsInput, ItemUncheckedCreateWithoutInspoItemsInput>
  }

  export type ItemUpsertWithoutInspoItemsInput = {
    update: XOR<ItemUpdateWithoutInspoItemsInput, ItemUncheckedUpdateWithoutInspoItemsInput>
    create: XOR<ItemCreateWithoutInspoItemsInput, ItemUncheckedCreateWithoutInspoItemsInput>
    where?: ItemWhereInput
  }

  export type ItemUpdateToOneWithWhereWithoutInspoItemsInput = {
    where?: ItemWhereInput
    data: XOR<ItemUpdateWithoutInspoItemsInput, ItemUncheckedUpdateWithoutInspoItemsInput>
  }

  export type ItemUpdateWithoutInspoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutItemNestedInput
    files?: FilesUpdateOneRequiredWithoutItemNestedInput
    favorites?: ItemFavoriteUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutInspoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    imageId?: StringFieldUpdateOperationsInput | string
    favorites?: ItemFavoriteUncheckedUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUncheckedUpdateManyWithoutItemNestedInput
  }

  export type BrandCreateWithoutItemInput = {
    name: string
    description: string
    url: string
    user: userCreateNestedOneWithoutBrandInput
    files: FilesCreateNestedOneWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutItemInput = {
    userId: string
    name: string
    description: string
    url: string
    logoId: string
  }

  export type BrandCreateOrConnectWithoutItemInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutItemInput, BrandUncheckedCreateWithoutItemInput>
  }

  export type FilesCreateWithoutItemInput = {
    id?: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width?: number | null
    height?: number | null
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandCreateNestedManyWithoutFilesInput
  }

  export type FilesUncheckedCreateWithoutItemInput = {
    id?: string
    name: string
    contentType: string
    bucket: string
    url: string
    uploadUrl: string
    width?: number | null
    height?: number | null
    metadata: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    brand?: BrandUncheckedCreateNestedManyWithoutFilesInput
  }

  export type FilesCreateOrConnectWithoutItemInput = {
    where: FilesWhereUniqueInput
    create: XOR<FilesCreateWithoutItemInput, FilesUncheckedCreateWithoutItemInput>
  }

  export type ItemFavoriteCreateWithoutItemInput = {
    id?: string
    createdAt?: Date | string | null
    user: userCreateNestedOneWithoutItemFavoritesInput
  }

  export type ItemFavoriteUncheckedCreateWithoutItemInput = {
    id?: string
    userId: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteCreateOrConnectWithoutItemInput = {
    where: ItemFavoriteWhereUniqueInput
    create: XOR<ItemFavoriteCreateWithoutItemInput, ItemFavoriteUncheckedCreateWithoutItemInput>
  }

  export type ItemFavoriteCreateManyItemInputEnvelope = {
    data: ItemFavoriteCreateManyItemInput | ItemFavoriteCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type ItemLikeCreateWithoutItemInput = {
    id?: string
    createdAt?: Date | string | null
    user: userCreateNestedOneWithoutItemLikesInput
  }

  export type ItemLikeUncheckedCreateWithoutItemInput = {
    id?: string
    userId: string
    createdAt?: Date | string | null
  }

  export type ItemLikeCreateOrConnectWithoutItemInput = {
    where: ItemLikeWhereUniqueInput
    create: XOR<ItemLikeCreateWithoutItemInput, ItemLikeUncheckedCreateWithoutItemInput>
  }

  export type ItemLikeCreateManyItemInputEnvelope = {
    data: ItemLikeCreateManyItemInput | ItemLikeCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type InspoItemsCreateWithoutItemInput = {
    id?: string
    category: string
    index: number
  }

  export type InspoItemsUncheckedCreateWithoutItemInput = {
    id?: string
    category: string
    index: number
  }

  export type InspoItemsCreateOrConnectWithoutItemInput = {
    where: InspoItemsWhereUniqueInput
    create: XOR<InspoItemsCreateWithoutItemInput, InspoItemsUncheckedCreateWithoutItemInput>
  }

  export type InspoItemsCreateManyItemInputEnvelope = {
    data: InspoItemsCreateManyItemInput | InspoItemsCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type BrandUpsertWithoutItemInput = {
    update: XOR<BrandUpdateWithoutItemInput, BrandUncheckedUpdateWithoutItemInput>
    create: XOR<BrandCreateWithoutItemInput, BrandUncheckedCreateWithoutItemInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutItemInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutItemInput, BrandUncheckedUpdateWithoutItemInput>
  }

  export type BrandUpdateWithoutItemInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutBrandNestedInput
    files?: FilesUpdateOneRequiredWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutItemInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoId?: StringFieldUpdateOperationsInput | string
  }

  export type FilesUpsertWithoutItemInput = {
    update: XOR<FilesUpdateWithoutItemInput, FilesUncheckedUpdateWithoutItemInput>
    create: XOR<FilesCreateWithoutItemInput, FilesUncheckedCreateWithoutItemInput>
    where?: FilesWhereInput
  }

  export type FilesUpdateToOneWithWhereWithoutItemInput = {
    where?: FilesWhereInput
    data: XOR<FilesUpdateWithoutItemInput, FilesUncheckedUpdateWithoutItemInput>
  }

  export type FilesUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUpdateManyWithoutFilesNestedInput
  }

  export type FilesUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contentType?: StringFieldUpdateOperationsInput | string
    bucket?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    uploadUrl?: StringFieldUpdateOperationsInput | string
    width?: NullableIntFieldUpdateOperationsInput | number | null
    height?: NullableIntFieldUpdateOperationsInput | number | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    brand?: BrandUncheckedUpdateManyWithoutFilesNestedInput
  }

  export type ItemFavoriteUpsertWithWhereUniqueWithoutItemInput = {
    where: ItemFavoriteWhereUniqueInput
    update: XOR<ItemFavoriteUpdateWithoutItemInput, ItemFavoriteUncheckedUpdateWithoutItemInput>
    create: XOR<ItemFavoriteCreateWithoutItemInput, ItemFavoriteUncheckedCreateWithoutItemInput>
  }

  export type ItemFavoriteUpdateWithWhereUniqueWithoutItemInput = {
    where: ItemFavoriteWhereUniqueInput
    data: XOR<ItemFavoriteUpdateWithoutItemInput, ItemFavoriteUncheckedUpdateWithoutItemInput>
  }

  export type ItemFavoriteUpdateManyWithWhereWithoutItemInput = {
    where: ItemFavoriteScalarWhereInput
    data: XOR<ItemFavoriteUpdateManyMutationInput, ItemFavoriteUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemFavoriteScalarWhereInput = {
    AND?: ItemFavoriteScalarWhereInput | ItemFavoriteScalarWhereInput[]
    OR?: ItemFavoriteScalarWhereInput[]
    NOT?: ItemFavoriteScalarWhereInput | ItemFavoriteScalarWhereInput[]
    id?: UuidFilter<"ItemFavorite"> | string
    userId?: UuidFilter<"ItemFavorite"> | string
    itemUuid?: UuidFilter<"ItemFavorite"> | string
    createdAt?: DateTimeNullableFilter<"ItemFavorite"> | Date | string | null
  }

  export type ItemLikeUpsertWithWhereUniqueWithoutItemInput = {
    where: ItemLikeWhereUniqueInput
    update: XOR<ItemLikeUpdateWithoutItemInput, ItemLikeUncheckedUpdateWithoutItemInput>
    create: XOR<ItemLikeCreateWithoutItemInput, ItemLikeUncheckedCreateWithoutItemInput>
  }

  export type ItemLikeUpdateWithWhereUniqueWithoutItemInput = {
    where: ItemLikeWhereUniqueInput
    data: XOR<ItemLikeUpdateWithoutItemInput, ItemLikeUncheckedUpdateWithoutItemInput>
  }

  export type ItemLikeUpdateManyWithWhereWithoutItemInput = {
    where: ItemLikeScalarWhereInput
    data: XOR<ItemLikeUpdateManyMutationInput, ItemLikeUncheckedUpdateManyWithoutItemInput>
  }

  export type ItemLikeScalarWhereInput = {
    AND?: ItemLikeScalarWhereInput | ItemLikeScalarWhereInput[]
    OR?: ItemLikeScalarWhereInput[]
    NOT?: ItemLikeScalarWhereInput | ItemLikeScalarWhereInput[]
    id?: UuidFilter<"ItemLike"> | string
    userId?: UuidFilter<"ItemLike"> | string
    itemUuid?: UuidFilter<"ItemLike"> | string
    createdAt?: DateTimeNullableFilter<"ItemLike"> | Date | string | null
  }

  export type InspoItemsUpsertWithWhereUniqueWithoutItemInput = {
    where: InspoItemsWhereUniqueInput
    update: XOR<InspoItemsUpdateWithoutItemInput, InspoItemsUncheckedUpdateWithoutItemInput>
    create: XOR<InspoItemsCreateWithoutItemInput, InspoItemsUncheckedCreateWithoutItemInput>
  }

  export type InspoItemsUpdateWithWhereUniqueWithoutItemInput = {
    where: InspoItemsWhereUniqueInput
    data: XOR<InspoItemsUpdateWithoutItemInput, InspoItemsUncheckedUpdateWithoutItemInput>
  }

  export type InspoItemsUpdateManyWithWhereWithoutItemInput = {
    where: InspoItemsScalarWhereInput
    data: XOR<InspoItemsUpdateManyMutationInput, InspoItemsUncheckedUpdateManyWithoutItemInput>
  }

  export type InspoItemsScalarWhereInput = {
    AND?: InspoItemsScalarWhereInput | InspoItemsScalarWhereInput[]
    OR?: InspoItemsScalarWhereInput[]
    NOT?: InspoItemsScalarWhereInput | InspoItemsScalarWhereInput[]
    id?: UuidFilter<"InspoItems"> | string
    itemUuid?: UuidFilter<"InspoItems"> | string
    category?: StringFilter<"InspoItems"> | string
    index?: IntFilter<"InspoItems"> | number
  }

  export type BrandCreateWithoutFilesInput = {
    name: string
    description: string
    url: string
    user: userCreateNestedOneWithoutBrandInput
    item?: ItemCreateNestedManyWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutFilesInput = {
    userId: string
    name: string
    description: string
    url: string
    item?: ItemUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutFilesInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutFilesInput, BrandUncheckedCreateWithoutFilesInput>
  }

  export type BrandCreateManyFilesInputEnvelope = {
    data: BrandCreateManyFilesInput | BrandCreateManyFilesInput[]
    skipDuplicates?: boolean
  }

  export type ItemCreateWithoutFilesInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brand: BrandCreateNestedOneWithoutItemInput
    favorites?: ItemFavoriteCreateNestedManyWithoutItemInput
    likes?: ItemLikeCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsCreateNestedManyWithoutItemInput
  }

  export type ItemUncheckedCreateWithoutFilesInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
    favorites?: ItemFavoriteUncheckedCreateNestedManyWithoutItemInput
    likes?: ItemLikeUncheckedCreateNestedManyWithoutItemInput
    inspoItems?: InspoItemsUncheckedCreateNestedManyWithoutItemInput
  }

  export type ItemCreateOrConnectWithoutFilesInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutFilesInput, ItemUncheckedCreateWithoutFilesInput>
  }

  export type ItemCreateManyFilesInputEnvelope = {
    data: ItemCreateManyFilesInput | ItemCreateManyFilesInput[]
    skipDuplicates?: boolean
  }

  export type BrandUpsertWithWhereUniqueWithoutFilesInput = {
    where: BrandWhereUniqueInput
    update: XOR<BrandUpdateWithoutFilesInput, BrandUncheckedUpdateWithoutFilesInput>
    create: XOR<BrandCreateWithoutFilesInput, BrandUncheckedCreateWithoutFilesInput>
  }

  export type BrandUpdateWithWhereUniqueWithoutFilesInput = {
    where: BrandWhereUniqueInput
    data: XOR<BrandUpdateWithoutFilesInput, BrandUncheckedUpdateWithoutFilesInput>
  }

  export type BrandUpdateManyWithWhereWithoutFilesInput = {
    where: BrandScalarWhereInput
    data: XOR<BrandUpdateManyMutationInput, BrandUncheckedUpdateManyWithoutFilesInput>
  }

  export type BrandScalarWhereInput = {
    AND?: BrandScalarWhereInput | BrandScalarWhereInput[]
    OR?: BrandScalarWhereInput[]
    NOT?: BrandScalarWhereInput | BrandScalarWhereInput[]
    userId?: UuidFilter<"Brand"> | string
    name?: StringFilter<"Brand"> | string
    description?: StringFilter<"Brand"> | string
    url?: StringFilter<"Brand"> | string
    logoId?: UuidFilter<"Brand"> | string
  }

  export type ItemUpsertWithWhereUniqueWithoutFilesInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutFilesInput, ItemUncheckedUpdateWithoutFilesInput>
    create: XOR<ItemCreateWithoutFilesInput, ItemUncheckedCreateWithoutFilesInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutFilesInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutFilesInput, ItemUncheckedUpdateWithoutFilesInput>
  }

  export type ItemUpdateManyWithWhereWithoutFilesInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutFilesInput>
  }

  export type userCreateWithoutAccountInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    session?: sessionCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutAccountInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    session?: sessionUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutAccountInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
  }

  export type userUpsertWithoutAccountInput = {
    update: XOR<userUpdateWithoutAccountInput, userUncheckedUpdateWithoutAccountInput>
    create: XOR<userCreateWithoutAccountInput, userUncheckedCreateWithoutAccountInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutAccountInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutAccountInput, userUncheckedUpdateWithoutAccountInput>
  }

  export type userUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    session?: sessionUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    session?: sessionUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateWithoutSessionInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountCreateNestedManyWithoutUserInput
    brand?: BrandCreateNestedOneWithoutUserInput
    client?: ClientCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutSessionInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userType?: string
    account?: accountUncheckedCreateNestedManyWithoutUserInput
    brand?: BrandUncheckedCreateNestedOneWithoutUserInput
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    itemFavorites?: ItemFavoriteUncheckedCreateNestedManyWithoutUserInput
    itemLikes?: ItemLikeUncheckedCreateNestedManyWithoutUserInput
    RegisterInProgress?: RegisterInProgressUncheckedCreateNestedManyWithoutUserInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutSessionInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
  }

  export type userUpsertWithoutSessionInput = {
    update: XOR<userUpdateWithoutSessionInput, userUncheckedUpdateWithoutSessionInput>
    create: XOR<userCreateWithoutSessionInput, userUncheckedCreateWithoutSessionInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutSessionInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutSessionInput, userUncheckedUpdateWithoutSessionInput>
  }

  export type userUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUpdateManyWithoutUserNestedInput
    brand?: BrandUpdateOneWithoutUserNestedInput
    client?: ClientUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userType?: StringFieldUpdateOperationsInput | string
    account?: accountUncheckedUpdateManyWithoutUserNestedInput
    brand?: BrandUncheckedUpdateOneWithoutUserNestedInput
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    itemFavorites?: ItemFavoriteUncheckedUpdateManyWithoutUserNestedInput
    itemLikes?: ItemLikeUncheckedUpdateManyWithoutUserNestedInput
    RegisterInProgress?: RegisterInProgressUncheckedUpdateManyWithoutUserNestedInput
    ResetPasswordInProgress?: ResetPasswordInProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type accountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type accountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type accountCreateOrConnectWithoutUserInput = {
    where: accountWhereUniqueInput
    create: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput>
  }

  export type accountCreateManyUserInputEnvelope = {
    data: accountCreateManyUserInput | accountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type sessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type sessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type sessionCreateOrConnectWithoutUserInput = {
    where: sessionWhereUniqueInput
    create: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput>
  }

  export type sessionCreateManyUserInputEnvelope = {
    data: sessionCreateManyUserInput | sessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BrandCreateWithoutUserInput = {
    name: string
    description: string
    url: string
    item?: ItemCreateNestedManyWithoutBrandInput
    files: FilesCreateNestedOneWithoutBrandInput
  }

  export type BrandUncheckedCreateWithoutUserInput = {
    name: string
    description: string
    url: string
    logoId: string
    item?: ItemUncheckedCreateNestedManyWithoutBrandInput
  }

  export type BrandCreateOrConnectWithoutUserInput = {
    where: BrandWhereUniqueInput
    create: XOR<BrandCreateWithoutUserInput, BrandUncheckedCreateWithoutUserInput>
  }

  export type ClientCreateWithoutUserInput = {
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientUncheckedCreateWithoutUserInput = {
    name: string
    dateOfBirth?: Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientCreateOrConnectWithoutUserInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
  }

  export type ItemFavoriteCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string | null
    item: ItemCreateNestedOneWithoutFavoritesInput
  }

  export type ItemFavoriteUncheckedCreateWithoutUserInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemFavoriteCreateOrConnectWithoutUserInput = {
    where: ItemFavoriteWhereUniqueInput
    create: XOR<ItemFavoriteCreateWithoutUserInput, ItemFavoriteUncheckedCreateWithoutUserInput>
  }

  export type ItemFavoriteCreateManyUserInputEnvelope = {
    data: ItemFavoriteCreateManyUserInput | ItemFavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ItemLikeCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string | null
    item: ItemCreateNestedOneWithoutLikesInput
  }

  export type ItemLikeUncheckedCreateWithoutUserInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeCreateOrConnectWithoutUserInput = {
    where: ItemLikeWhereUniqueInput
    create: XOR<ItemLikeCreateWithoutUserInput, ItemLikeUncheckedCreateWithoutUserInput>
  }

  export type ItemLikeCreateManyUserInputEnvelope = {
    data: ItemLikeCreateManyUserInput | ItemLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RegisterInProgressCreateWithoutUserInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type RegisterInProgressUncheckedCreateWithoutUserInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type RegisterInProgressCreateOrConnectWithoutUserInput = {
    where: RegisterInProgressWhereUniqueInput
    create: XOR<RegisterInProgressCreateWithoutUserInput, RegisterInProgressUncheckedCreateWithoutUserInput>
  }

  export type RegisterInProgressCreateManyUserInputEnvelope = {
    data: RegisterInProgressCreateManyUserInput | RegisterInProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ResetPasswordInProgressCreateWithoutUserInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type ResetPasswordInProgressUncheckedCreateWithoutUserInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type ResetPasswordInProgressCreateOrConnectWithoutUserInput = {
    where: ResetPasswordInProgressWhereUniqueInput
    create: XOR<ResetPasswordInProgressCreateWithoutUserInput, ResetPasswordInProgressUncheckedCreateWithoutUserInput>
  }

  export type ResetPasswordInProgressCreateManyUserInputEnvelope = {
    data: ResetPasswordInProgressCreateManyUserInput | ResetPasswordInProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type accountUpsertWithWhereUniqueWithoutUserInput = {
    where: accountWhereUniqueInput
    update: XOR<accountUpdateWithoutUserInput, accountUncheckedUpdateWithoutUserInput>
    create: XOR<accountCreateWithoutUserInput, accountUncheckedCreateWithoutUserInput>
  }

  export type accountUpdateWithWhereUniqueWithoutUserInput = {
    where: accountWhereUniqueInput
    data: XOR<accountUpdateWithoutUserInput, accountUncheckedUpdateWithoutUserInput>
  }

  export type accountUpdateManyWithWhereWithoutUserInput = {
    where: accountScalarWhereInput
    data: XOR<accountUpdateManyMutationInput, accountUncheckedUpdateManyWithoutUserInput>
  }

  export type accountScalarWhereInput = {
    AND?: accountScalarWhereInput | accountScalarWhereInput[]
    OR?: accountScalarWhereInput[]
    NOT?: accountScalarWhereInput | accountScalarWhereInput[]
    id?: StringFilter<"account"> | string
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: UuidFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
  }

  export type sessionUpsertWithWhereUniqueWithoutUserInput = {
    where: sessionWhereUniqueInput
    update: XOR<sessionUpdateWithoutUserInput, sessionUncheckedUpdateWithoutUserInput>
    create: XOR<sessionCreateWithoutUserInput, sessionUncheckedCreateWithoutUserInput>
  }

  export type sessionUpdateWithWhereUniqueWithoutUserInput = {
    where: sessionWhereUniqueInput
    data: XOR<sessionUpdateWithoutUserInput, sessionUncheckedUpdateWithoutUserInput>
  }

  export type sessionUpdateManyWithWhereWithoutUserInput = {
    where: sessionScalarWhereInput
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyWithoutUserInput>
  }

  export type sessionScalarWhereInput = {
    AND?: sessionScalarWhereInput | sessionScalarWhereInput[]
    OR?: sessionScalarWhereInput[]
    NOT?: sessionScalarWhereInput | sessionScalarWhereInput[]
    id?: StringFilter<"session"> | string
    expiresAt?: DateTimeFilter<"session"> | Date | string
    token?: StringFilter<"session"> | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: UuidFilter<"session"> | string
  }

  export type BrandUpsertWithoutUserInput = {
    update: XOR<BrandUpdateWithoutUserInput, BrandUncheckedUpdateWithoutUserInput>
    create: XOR<BrandCreateWithoutUserInput, BrandUncheckedCreateWithoutUserInput>
    where?: BrandWhereInput
  }

  export type BrandUpdateToOneWithWhereWithoutUserInput = {
    where?: BrandWhereInput
    data: XOR<BrandUpdateWithoutUserInput, BrandUncheckedUpdateWithoutUserInput>
  }

  export type BrandUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    item?: ItemUpdateManyWithoutBrandNestedInput
    files?: FilesUpdateOneRequiredWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoId?: StringFieldUpdateOperationsInput | string
    item?: ItemUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type ClientUpsertWithoutUserInput = {
    update: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutUserInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ClientUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ClientUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferences?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ItemFavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: ItemFavoriteWhereUniqueInput
    update: XOR<ItemFavoriteUpdateWithoutUserInput, ItemFavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<ItemFavoriteCreateWithoutUserInput, ItemFavoriteUncheckedCreateWithoutUserInput>
  }

  export type ItemFavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: ItemFavoriteWhereUniqueInput
    data: XOR<ItemFavoriteUpdateWithoutUserInput, ItemFavoriteUncheckedUpdateWithoutUserInput>
  }

  export type ItemFavoriteUpdateManyWithWhereWithoutUserInput = {
    where: ItemFavoriteScalarWhereInput
    data: XOR<ItemFavoriteUpdateManyMutationInput, ItemFavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type ItemLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: ItemLikeWhereUniqueInput
    update: XOR<ItemLikeUpdateWithoutUserInput, ItemLikeUncheckedUpdateWithoutUserInput>
    create: XOR<ItemLikeCreateWithoutUserInput, ItemLikeUncheckedCreateWithoutUserInput>
  }

  export type ItemLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: ItemLikeWhereUniqueInput
    data: XOR<ItemLikeUpdateWithoutUserInput, ItemLikeUncheckedUpdateWithoutUserInput>
  }

  export type ItemLikeUpdateManyWithWhereWithoutUserInput = {
    where: ItemLikeScalarWhereInput
    data: XOR<ItemLikeUpdateManyMutationInput, ItemLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type RegisterInProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: RegisterInProgressWhereUniqueInput
    update: XOR<RegisterInProgressUpdateWithoutUserInput, RegisterInProgressUncheckedUpdateWithoutUserInput>
    create: XOR<RegisterInProgressCreateWithoutUserInput, RegisterInProgressUncheckedCreateWithoutUserInput>
  }

  export type RegisterInProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: RegisterInProgressWhereUniqueInput
    data: XOR<RegisterInProgressUpdateWithoutUserInput, RegisterInProgressUncheckedUpdateWithoutUserInput>
  }

  export type RegisterInProgressUpdateManyWithWhereWithoutUserInput = {
    where: RegisterInProgressScalarWhereInput
    data: XOR<RegisterInProgressUpdateManyMutationInput, RegisterInProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type RegisterInProgressScalarWhereInput = {
    AND?: RegisterInProgressScalarWhereInput | RegisterInProgressScalarWhereInput[]
    OR?: RegisterInProgressScalarWhereInput[]
    NOT?: RegisterInProgressScalarWhereInput | RegisterInProgressScalarWhereInput[]
    id?: UuidFilter<"RegisterInProgress"> | string
    userId?: UuidFilter<"RegisterInProgress"> | string
    verificationCode?: StringFilter<"RegisterInProgress"> | string
    verificationCodeExpiration?: StringFilter<"RegisterInProgress"> | string
    token?: StringFilter<"RegisterInProgress"> | string
  }

  export type ResetPasswordInProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: ResetPasswordInProgressWhereUniqueInput
    update: XOR<ResetPasswordInProgressUpdateWithoutUserInput, ResetPasswordInProgressUncheckedUpdateWithoutUserInput>
    create: XOR<ResetPasswordInProgressCreateWithoutUserInput, ResetPasswordInProgressUncheckedCreateWithoutUserInput>
  }

  export type ResetPasswordInProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: ResetPasswordInProgressWhereUniqueInput
    data: XOR<ResetPasswordInProgressUpdateWithoutUserInput, ResetPasswordInProgressUncheckedUpdateWithoutUserInput>
  }

  export type ResetPasswordInProgressUpdateManyWithWhereWithoutUserInput = {
    where: ResetPasswordInProgressScalarWhereInput
    data: XOR<ResetPasswordInProgressUpdateManyMutationInput, ResetPasswordInProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type ResetPasswordInProgressScalarWhereInput = {
    AND?: ResetPasswordInProgressScalarWhereInput | ResetPasswordInProgressScalarWhereInput[]
    OR?: ResetPasswordInProgressScalarWhereInput[]
    NOT?: ResetPasswordInProgressScalarWhereInput | ResetPasswordInProgressScalarWhereInput[]
    id?: UuidFilter<"ResetPasswordInProgress"> | string
    userId?: UuidFilter<"ResetPasswordInProgress"> | string
    verificationCode?: StringFilter<"ResetPasswordInProgress"> | string
    verificationCodeExpiration?: StringFilter<"ResetPasswordInProgress"> | string
    token?: StringFilter<"ResetPasswordInProgress"> | string
  }

  export type ItemCreateManyBrandInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    imageId: string
  }

  export type ItemUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    files?: FilesUpdateOneRequiredWithoutItemNestedInput
    favorites?: ItemFavoriteUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    imageId?: StringFieldUpdateOperationsInput | string
    favorites?: ItemFavoriteUncheckedUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUncheckedUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutBrandInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    imageId?: StringFieldUpdateOperationsInput | string
  }

  export type ItemFavoriteCreateManyItemInput = {
    id?: string
    userId: string
    createdAt?: Date | string | null
  }

  export type ItemLikeCreateManyItemInput = {
    id?: string
    userId: string
    createdAt?: Date | string | null
  }

  export type InspoItemsCreateManyItemInput = {
    id?: string
    category: string
    index: number
  }

  export type ItemFavoriteUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutItemFavoritesNestedInput
  }

  export type ItemFavoriteUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutItemLikesNestedInput
  }

  export type ItemLikeUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InspoItemsUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
  }

  export type InspoItemsUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
  }

  export type InspoItemsUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    index?: IntFieldUpdateOperationsInput | number
  }

  export type BrandCreateManyFilesInput = {
    userId: string
    name: string
    description: string
    url: string
  }

  export type ItemCreateManyFilesInput = {
    id?: string
    name: string
    description: string
    price: number
    url: string
    brandId: string
  }

  export type BrandUpdateWithoutFilesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutBrandNestedInput
    item?: ItemUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateWithoutFilesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    item?: ItemUncheckedUpdateManyWithoutBrandNestedInput
  }

  export type BrandUncheckedUpdateManyWithoutFilesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type ItemUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brand?: BrandUpdateOneRequiredWithoutItemNestedInput
    favorites?: ItemFavoriteUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
    favorites?: ItemFavoriteUncheckedUpdateManyWithoutItemNestedInput
    likes?: ItemLikeUncheckedUpdateManyWithoutItemNestedInput
    inspoItems?: InspoItemsUncheckedUpdateManyWithoutItemNestedInput
  }

  export type ItemUncheckedUpdateManyWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    brandId?: StringFieldUpdateOperationsInput | string
  }

  export type accountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type sessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type ItemFavoriteCreateManyUserInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type ItemLikeCreateManyUserInput = {
    id?: string
    itemUuid: string
    createdAt?: Date | string | null
  }

  export type RegisterInProgressCreateManyUserInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type ResetPasswordInProgressCreateManyUserInput = {
    id?: string
    verificationCode: string
    verificationCodeExpiration: string
    token: string
  }

  export type accountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type sessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type sessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ItemFavoriteUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item?: ItemUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type ItemFavoriteUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemFavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item?: ItemUpdateOneRequiredWithoutLikesNestedInput
  }

  export type ItemLikeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ItemLikeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemUuid?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RegisterInProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type RegisterInProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type RegisterInProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type ResetPasswordInProgressUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type ResetPasswordInProgressUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
  }

  export type ResetPasswordInProgressUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    verificationCode?: StringFieldUpdateOperationsInput | string
    verificationCodeExpiration?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
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