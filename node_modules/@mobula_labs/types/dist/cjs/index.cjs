var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// ../../node_modules/@asteasolutions/zod-to-openapi/dist/index.cjs
var require_dist = __commonJS((exports2) => {
  function __rest(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function isZodType(schema, typeName) {
    var _a;
    return ((_a = schema === null || schema === undefined ? undefined : schema._def) === null || _a === undefined ? undefined : _a.typeName) === typeName;
  }
  function isAnyZodType(schema) {
    return "_def" in schema;
  }
  function preserveMetadataFromModifier(zod, modifier) {
    const zodModifier = zod.ZodType.prototype[modifier];
    zod.ZodType.prototype[modifier] = function(...args) {
      const result = zodModifier.apply(this, args);
      result._def.openapi = this._def.openapi;
      return result;
    };
  }
  function extendZodWithOpenApi(zod) {
    if (typeof zod.ZodType.prototype.openapi !== "undefined") {
      return;
    }
    zod.ZodType.prototype.openapi = function(refOrOpenapi, metadata) {
      var _a, _b, _c, _d, _e, _f;
      const openapi = typeof refOrOpenapi === "string" ? metadata : refOrOpenapi;
      const _g = openapi !== null && openapi !== undefined ? openapi : {}, { param } = _g, restOfOpenApi = __rest(_g, ["param"]);
      const _internal = Object.assign(Object.assign({}, (_a = this._def.openapi) === null || _a === undefined ? undefined : _a._internal), typeof refOrOpenapi === "string" ? { refId: refOrOpenapi } : undefined);
      const resultMetadata = Object.assign(Object.assign(Object.assign({}, (_b = this._def.openapi) === null || _b === undefined ? undefined : _b.metadata), restOfOpenApi), ((_d = (_c = this._def.openapi) === null || _c === undefined ? undefined : _c.metadata) === null || _d === undefined ? undefined : _d.param) || param ? {
        param: Object.assign(Object.assign({}, (_f = (_e = this._def.openapi) === null || _e === undefined ? undefined : _e.metadata) === null || _f === undefined ? undefined : _f.param), param)
      } : undefined);
      const result = new this.constructor(Object.assign(Object.assign({}, this._def), { openapi: Object.assign(Object.assign({}, Object.keys(_internal).length > 0 ? { _internal } : undefined), Object.keys(resultMetadata).length > 0 ? { metadata: resultMetadata } : undefined) }));
      if (isZodType(this, "ZodObject")) {
        const originalExtend = this.extend;
        result.extend = function(...args) {
          var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
          const extendedResult = originalExtend.apply(this, args);
          extendedResult._def.openapi = {
            _internal: {
              extendedFrom: ((_b2 = (_a2 = this._def.openapi) === null || _a2 === undefined ? undefined : _a2._internal) === null || _b2 === undefined ? undefined : _b2.refId) ? { refId: (_d2 = (_c2 = this._def.openapi) === null || _c2 === undefined ? undefined : _c2._internal) === null || _d2 === undefined ? undefined : _d2.refId, schema: this } : (_f2 = (_e2 = this._def.openapi) === null || _e2 === undefined ? undefined : _e2._internal) === null || _f2 === undefined ? undefined : _f2.extendedFrom
            },
            metadata: (_g2 = extendedResult._def.openapi) === null || _g2 === undefined ? undefined : _g2.metadata
          };
          return extendedResult;
        };
      }
      return result;
    };
    preserveMetadataFromModifier(zod, "optional");
    preserveMetadataFromModifier(zod, "nullable");
    preserveMetadataFromModifier(zod, "default");
    preserveMetadataFromModifier(zod, "transform");
    preserveMetadataFromModifier(zod, "refine");
    const zodDeepPartial = zod.ZodObject.prototype.deepPartial;
    zod.ZodObject.prototype.deepPartial = function() {
      const initialShape = this._def.shape();
      const result = zodDeepPartial.apply(this);
      const resultShape = result._def.shape();
      Object.entries(resultShape).forEach(([key, value]) => {
        var _a, _b;
        value._def.openapi = (_b = (_a = initialShape[key]) === null || _a === undefined ? undefined : _a._def) === null || _b === undefined ? undefined : _b.openapi;
      });
      result._def.openapi = undefined;
      return result;
    };
    const zodPick = zod.ZodObject.prototype.pick;
    zod.ZodObject.prototype.pick = function(...args) {
      const result = zodPick.apply(this, args);
      result._def.openapi = undefined;
      return result;
    };
    const zodOmit = zod.ZodObject.prototype.omit;
    zod.ZodObject.prototype.omit = function(...args) {
      const result = zodOmit.apply(this, args);
      result._def.openapi = undefined;
      return result;
    };
  }
  function isEqual(x, y) {
    if (x === null || x === undefined || y === null || y === undefined) {
      return x === y;
    }
    if (x === y || x.valueOf() === y.valueOf()) {
      return true;
    }
    if (Array.isArray(x)) {
      if (!Array.isArray(y)) {
        return false;
      }
      if (x.length !== y.length) {
        return false;
      }
    }
    if (!(x instanceof Object) || !(y instanceof Object)) {
      return false;
    }
    const keysX = Object.keys(x);
    return Object.keys(y).every((keyY) => keysX.indexOf(keyY) !== -1) && keysX.every((key) => isEqual(x[key], y[key]));
  }

  class ObjectSet {
    constructor() {
      this.buckets = new Map;
    }
    put(value) {
      const hashCode = this.hashCodeOf(value);
      const itemsByCode = this.buckets.get(hashCode);
      if (!itemsByCode) {
        this.buckets.set(hashCode, [value]);
        return;
      }
      const alreadyHasItem = itemsByCode.some((_) => isEqual(_, value));
      if (!alreadyHasItem) {
        itemsByCode.push(value);
      }
    }
    contains(value) {
      const hashCode = this.hashCodeOf(value);
      const itemsByCode = this.buckets.get(hashCode);
      if (!itemsByCode) {
        return false;
      }
      return itemsByCode.some((_) => isEqual(_, value));
    }
    values() {
      return [...this.buckets.values()].flat();
    }
    stats() {
      let totalBuckets = 0;
      let totalValues = 0;
      let collisions = 0;
      for (const bucket of this.buckets.values()) {
        totalBuckets += 1;
        totalValues += bucket.length;
        if (bucket.length > 1) {
          collisions += 1;
        }
      }
      const hashEffectiveness = totalBuckets / totalValues;
      return { totalBuckets, collisions, totalValues, hashEffectiveness };
    }
    hashCodeOf(object) {
      let hashCode = 0;
      if (Array.isArray(object)) {
        for (let i = 0;i < object.length; i++) {
          hashCode ^= this.hashCodeOf(object[i]) * i;
        }
        return hashCode;
      }
      if (typeof object === "string") {
        for (let i = 0;i < object.length; i++) {
          hashCode ^= object.charCodeAt(i) * i;
        }
        return hashCode;
      }
      if (typeof object === "number") {
        return object;
      }
      if (typeof object === "object") {
        for (const [key, value] of Object.entries(object)) {
          hashCode ^= this.hashCodeOf(key) + this.hashCodeOf(value !== null && value !== undefined ? value : "");
        }
      }
      return hashCode;
    }
  }
  function isUndefined(value) {
    return value === undefined;
  }
  function mapValues(object, mapper) {
    const result = {};
    Object.entries(object).forEach(([key, value]) => {
      result[key] = mapper(value);
    });
    return result;
  }
  function omit(object, keys) {
    const result = {};
    Object.entries(object).forEach(([key, value]) => {
      if (!keys.some((keyToOmit) => keyToOmit === key)) {
        result[key] = value;
      }
    });
    return result;
  }
  function omitBy(object, predicate) {
    const result = {};
    Object.entries(object).forEach(([key, value]) => {
      if (!predicate(value, key)) {
        result[key] = value;
      }
    });
    return result;
  }
  function compact(arr) {
    return arr.filter((elem) => !isUndefined(elem));
  }
  var objectEquals = isEqual;
  function uniq(values) {
    const set = new ObjectSet;
    values.forEach((value) => set.put(value));
    return [...set.values()];
  }
  function isString(val) {
    return typeof val === "string";
  }
  function getOpenApiMetadata(zodSchema) {
    var _a, _b;
    return omitBy((_b = (_a = zodSchema._def.openapi) === null || _a === undefined ? undefined : _a.metadata) !== null && _b !== undefined ? _b : {}, isUndefined);
  }

  class OpenAPIRegistry {
    constructor(parents) {
      this.parents = parents;
      this._definitions = [];
    }
    get definitions() {
      var _a, _b;
      const parentDefinitions = (_b = (_a = this.parents) === null || _a === undefined ? undefined : _a.flatMap((par) => par.definitions)) !== null && _b !== undefined ? _b : [];
      return [...parentDefinitions, ...this._definitions];
    }
    register(refId, zodSchema) {
      const schemaWithRefId = this.schemaWithRefId(refId, zodSchema);
      this._definitions.push({ type: "schema", schema: schemaWithRefId });
      return schemaWithRefId;
    }
    registerParameter(refId, zodSchema) {
      var _a, _b, _c;
      const schemaWithRefId = this.schemaWithRefId(refId, zodSchema);
      const currentMetadata = (_a = schemaWithRefId._def.openapi) === null || _a === undefined ? undefined : _a.metadata;
      const schemaWithMetadata = schemaWithRefId.openapi(Object.assign(Object.assign({}, currentMetadata), { param: Object.assign(Object.assign({}, currentMetadata === null || currentMetadata === undefined ? undefined : currentMetadata.param), { name: (_c = (_b = currentMetadata === null || currentMetadata === undefined ? undefined : currentMetadata.param) === null || _b === undefined ? undefined : _b.name) !== null && _c !== undefined ? _c : refId }) }));
      this._definitions.push({
        type: "parameter",
        schema: schemaWithMetadata
      });
      return schemaWithMetadata;
    }
    registerPath(route) {
      this._definitions.push({
        type: "route",
        route
      });
    }
    registerWebhook(webhook) {
      this._definitions.push({
        type: "webhook",
        webhook
      });
    }
    registerComponent(type, name, component) {
      this._definitions.push({
        type: "component",
        componentType: type,
        name,
        component
      });
      return {
        name,
        ref: { $ref: `#/components/${type}/${name}` }
      };
    }
    schemaWithRefId(refId, zodSchema) {
      return zodSchema.openapi(refId);
    }
  }

  class ZodToOpenAPIError {
    constructor(message) {
      this.message = message;
    }
  }

  class ConflictError extends ZodToOpenAPIError {
    constructor(message, data) {
      super(message);
      this.data = data;
    }
  }

  class MissingParameterDataError extends ZodToOpenAPIError {
    constructor(data) {
      super(`Missing parameter data, please specify \`${data.missingField}\` and other OpenAPI parameter props using the \`param\` field of \`ZodSchema.openapi\``);
      this.data = data;
    }
  }
  function enhanceMissingParametersError(action, paramsToAdd) {
    try {
      return action();
    } catch (error) {
      if (error instanceof MissingParameterDataError) {
        throw new MissingParameterDataError(Object.assign(Object.assign({}, error.data), paramsToAdd));
      }
      throw error;
    }
  }

  class UnknownZodTypeError extends ZodToOpenAPIError {
    constructor(data) {
      super(`Unknown zod object type, please specify \`type\` and other OpenAPI props using \`ZodSchema.openapi\`.`);
      this.data = data;
    }
  }

  class Metadata {
    static getMetadata(zodSchema) {
      var _a;
      const innerSchema = this.unwrapChained(zodSchema);
      const metadata = zodSchema._def.openapi ? zodSchema._def.openapi : innerSchema._def.openapi;
      const zodDescription = (_a = zodSchema.description) !== null && _a !== undefined ? _a : innerSchema.description;
      return {
        _internal: metadata === null || metadata === undefined ? undefined : metadata._internal,
        metadata: Object.assign({ description: zodDescription }, metadata === null || metadata === undefined ? undefined : metadata.metadata)
      };
    }
    static getInternalMetadata(zodSchema) {
      const innerSchema = this.unwrapChained(zodSchema);
      const openapi = zodSchema._def.openapi ? zodSchema._def.openapi : innerSchema._def.openapi;
      return openapi === null || openapi === undefined ? undefined : openapi._internal;
    }
    static getParamMetadata(zodSchema) {
      var _a, _b;
      const innerSchema = this.unwrapChained(zodSchema);
      const metadata = zodSchema._def.openapi ? zodSchema._def.openapi : innerSchema._def.openapi;
      const zodDescription = (_a = zodSchema.description) !== null && _a !== undefined ? _a : innerSchema.description;
      return {
        _internal: metadata === null || metadata === undefined ? undefined : metadata._internal,
        metadata: Object.assign(Object.assign({}, metadata === null || metadata === undefined ? undefined : metadata.metadata), {
          param: Object.assign({ description: zodDescription }, (_b = metadata === null || metadata === undefined ? undefined : metadata.metadata) === null || _b === undefined ? undefined : _b.param)
        })
      };
    }
    static buildSchemaMetadata(metadata) {
      return omitBy(omit(metadata, ["param"]), isUndefined);
    }
    static buildParameterMetadata(metadata) {
      return omitBy(metadata, isUndefined);
    }
    static applySchemaMetadata(initialData, metadata) {
      return omitBy(Object.assign(Object.assign({}, initialData), this.buildSchemaMetadata(metadata)), isUndefined);
    }
    static getRefId(zodSchema) {
      var _a;
      return (_a = this.getInternalMetadata(zodSchema)) === null || _a === undefined ? undefined : _a.refId;
    }
    static unwrapChained(schema) {
      return this.unwrapUntil(schema);
    }
    static getDefaultValue(zodSchema) {
      const unwrapped = this.unwrapUntil(zodSchema, "ZodDefault");
      return unwrapped === null || unwrapped === undefined ? undefined : unwrapped._def.defaultValue();
    }
    static unwrapUntil(schema, typeName) {
      if (typeName && isZodType(schema, typeName)) {
        return schema;
      }
      if (isZodType(schema, "ZodOptional") || isZodType(schema, "ZodNullable") || isZodType(schema, "ZodBranded")) {
        return this.unwrapUntil(schema.unwrap(), typeName);
      }
      if (isZodType(schema, "ZodDefault") || isZodType(schema, "ZodReadonly")) {
        return this.unwrapUntil(schema._def.innerType, typeName);
      }
      if (isZodType(schema, "ZodEffects")) {
        return this.unwrapUntil(schema._def.schema, typeName);
      }
      if (isZodType(schema, "ZodPipeline")) {
        return this.unwrapUntil(schema._def.in, typeName);
      }
      return typeName ? undefined : schema;
    }
    static isOptionalSchema(zodSchema) {
      return zodSchema.isOptional();
    }
  }

  class ArrayTransformer {
    transform(zodSchema, mapNullableType, mapItems) {
      var _a, _b;
      const itemType = zodSchema._def.type;
      return Object.assign(Object.assign({}, mapNullableType("array")), { items: mapItems(itemType), minItems: (_a = zodSchema._def.minLength) === null || _a === undefined ? undefined : _a.value, maxItems: (_b = zodSchema._def.maxLength) === null || _b === undefined ? undefined : _b.value });
    }
  }

  class BigIntTransformer {
    transform(mapNullableType) {
      return Object.assign(Object.assign({}, mapNullableType("string")), { pattern: `^d+$` });
    }
  }

  class DiscriminatedUnionTransformer {
    transform(zodSchema, isNullable, mapNullableOfArray, mapItem, generateSchemaRef) {
      const options = [...zodSchema.options.values()];
      const optionSchema = options.map(mapItem);
      if (isNullable) {
        return {
          oneOf: mapNullableOfArray(optionSchema, isNullable)
        };
      }
      return {
        oneOf: optionSchema,
        discriminator: this.mapDiscriminator(options, zodSchema.discriminator, generateSchemaRef)
      };
    }
    mapDiscriminator(zodObjects, discriminator, generateSchemaRef) {
      if (zodObjects.some((obj) => Metadata.getRefId(obj) === undefined)) {
        return;
      }
      const mapping = {};
      zodObjects.forEach((obj) => {
        var _a;
        const refId = Metadata.getRefId(obj);
        const value = (_a = obj.shape) === null || _a === undefined ? undefined : _a[discriminator];
        if (isZodType(value, "ZodEnum") || isZodType(value, "ZodNativeEnum")) {
          const keys = Object.values(value.enum).filter(isString);
          keys.forEach((enumValue) => {
            mapping[enumValue] = generateSchemaRef(refId);
          });
          return;
        }
        const literalValue = value === null || value === undefined ? undefined : value._def.value;
        if (typeof literalValue !== "string") {
          throw new Error(`Discriminator ${discriminator} could not be found in one of the values of a discriminated union`);
        }
        mapping[literalValue] = generateSchemaRef(refId);
      });
      return {
        propertyName: discriminator,
        mapping
      };
    }
  }

  class EnumTransformer {
    transform(zodSchema, mapNullableType) {
      return Object.assign(Object.assign({}, mapNullableType("string")), { enum: zodSchema._def.values });
    }
  }

  class IntersectionTransformer {
    transform(zodSchema, isNullable, mapNullableOfArray, mapItem) {
      const subtypes = this.flattenIntersectionTypes(zodSchema);
      const allOfSchema = {
        allOf: subtypes.map(mapItem)
      };
      if (isNullable) {
        return {
          anyOf: mapNullableOfArray([allOfSchema], isNullable)
        };
      }
      return allOfSchema;
    }
    flattenIntersectionTypes(schema) {
      if (!isZodType(schema, "ZodIntersection")) {
        return [schema];
      }
      const leftSubTypes = this.flattenIntersectionTypes(schema._def.left);
      const rightSubTypes = this.flattenIntersectionTypes(schema._def.right);
      return [...leftSubTypes, ...rightSubTypes];
    }
  }

  class LiteralTransformer {
    transform(zodSchema, mapNullableType) {
      return Object.assign(Object.assign({}, mapNullableType(typeof zodSchema._def.value)), { enum: [zodSchema._def.value] });
    }
  }
  function enumInfo(enumObject) {
    const keysExceptReverseMappings = Object.keys(enumObject).filter((key) => typeof enumObject[enumObject[key]] !== "number");
    const values = keysExceptReverseMappings.map((key) => enumObject[key]);
    const numericCount = values.filter((_) => typeof _ === "number").length;
    const type = numericCount === 0 ? "string" : numericCount === values.length ? "numeric" : "mixed";
    return { values, type };
  }

  class NativeEnumTransformer {
    transform(zodSchema, mapNullableType) {
      const { type, values } = enumInfo(zodSchema._def.values);
      if (type === "mixed") {
        throw new ZodToOpenAPIError("Enum has mixed string and number values, please specify the OpenAPI type manually");
      }
      return Object.assign(Object.assign({}, mapNullableType(type === "numeric" ? "integer" : "string")), { enum: values });
    }
  }

  class NumberTransformer {
    transform(zodSchema, mapNullableType, getNumberChecks) {
      return Object.assign(Object.assign({}, mapNullableType(zodSchema.isInt ? "integer" : "number")), getNumberChecks(zodSchema._def.checks));
    }
  }

  class ObjectTransformer {
    transform(zodSchema, defaultValue, mapNullableType, mapItem) {
      var _a;
      const extendedFrom = (_a = Metadata.getInternalMetadata(zodSchema)) === null || _a === undefined ? undefined : _a.extendedFrom;
      const required = this.requiredKeysOf(zodSchema);
      const properties = mapValues(zodSchema._def.shape(), mapItem);
      if (!extendedFrom) {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, mapNullableType("object")), { properties, default: defaultValue }), required.length > 0 ? { required } : {}), this.generateAdditionalProperties(zodSchema, mapItem));
      }
      const parent = extendedFrom.schema;
      mapItem(parent);
      const keysRequiredByParent = this.requiredKeysOf(parent);
      const propsOfParent = mapValues(parent === null || parent === undefined ? undefined : parent._def.shape(), mapItem);
      const propertiesToAdd = Object.fromEntries(Object.entries(properties).filter(([key, type]) => {
        return !objectEquals(propsOfParent[key], type);
      }));
      const additionallyRequired = required.filter((prop) => !keysRequiredByParent.includes(prop));
      const objectData = Object.assign(Object.assign(Object.assign(Object.assign({}, mapNullableType("object")), { default: defaultValue, properties: propertiesToAdd }), additionallyRequired.length > 0 ? { required: additionallyRequired } : {}), this.generateAdditionalProperties(zodSchema, mapItem));
      return {
        allOf: [
          { $ref: `#/components/schemas/${extendedFrom.refId}` },
          objectData
        ]
      };
    }
    generateAdditionalProperties(zodSchema, mapItem) {
      const unknownKeysOption = zodSchema._def.unknownKeys;
      const catchallSchema = zodSchema._def.catchall;
      if (isZodType(catchallSchema, "ZodNever")) {
        if (unknownKeysOption === "strict") {
          return { additionalProperties: false };
        }
        return {};
      }
      return { additionalProperties: mapItem(catchallSchema) };
    }
    requiredKeysOf(objectSchema) {
      return Object.entries(objectSchema._def.shape()).filter(([_key, type]) => !Metadata.isOptionalSchema(type)).map(([key, _type]) => key);
    }
  }

  class RecordTransformer {
    transform(zodSchema, mapNullableType, mapItem) {
      const propertiesType = zodSchema._def.valueType;
      const keyType = zodSchema._def.keyType;
      const propertiesSchema = mapItem(propertiesType);
      if (isZodType(keyType, "ZodEnum") || isZodType(keyType, "ZodNativeEnum")) {
        const keys = Object.values(keyType.enum).filter(isString);
        const properties = keys.reduce((acc, curr) => Object.assign(Object.assign({}, acc), { [curr]: propertiesSchema }), {});
        return Object.assign(Object.assign({}, mapNullableType("object")), { properties });
      }
      return Object.assign(Object.assign({}, mapNullableType("object")), { additionalProperties: propertiesSchema });
    }
  }

  class StringTransformer {
    transform(zodSchema, mapNullableType) {
      var _a, _b, _c;
      const regexCheck = this.getZodStringCheck(zodSchema, "regex");
      const length = (_a = this.getZodStringCheck(zodSchema, "length")) === null || _a === undefined ? undefined : _a.value;
      const maxLength = Number.isFinite(zodSchema.minLength) ? (_b = zodSchema.minLength) !== null && _b !== undefined ? _b : undefined : undefined;
      const minLength = Number.isFinite(zodSchema.maxLength) ? (_c = zodSchema.maxLength) !== null && _c !== undefined ? _c : undefined : undefined;
      return Object.assign(Object.assign({}, mapNullableType("string")), {
        minLength: length !== null && length !== undefined ? length : maxLength,
        maxLength: length !== null && length !== undefined ? length : minLength,
        format: this.mapStringFormat(zodSchema),
        pattern: regexCheck === null || regexCheck === undefined ? undefined : regexCheck.regex.source
      });
    }
    mapStringFormat(zodString) {
      if (zodString.isUUID)
        return "uuid";
      if (zodString.isEmail)
        return "email";
      if (zodString.isURL)
        return "uri";
      if (zodString.isDate)
        return "date";
      if (zodString.isDatetime)
        return "date-time";
      if (zodString.isCUID)
        return "cuid";
      if (zodString.isCUID2)
        return "cuid2";
      if (zodString.isULID)
        return "ulid";
      if (zodString.isIP)
        return "ip";
      if (zodString.isEmoji)
        return "emoji";
      return;
    }
    getZodStringCheck(zodString, kind) {
      return zodString._def.checks.find((check) => {
        return check.kind === kind;
      });
    }
  }

  class TupleTransformer {
    constructor(versionSpecifics) {
      this.versionSpecifics = versionSpecifics;
    }
    transform(zodSchema, mapNullableType, mapItem) {
      const { items } = zodSchema._def;
      const schemas = items.map(mapItem);
      return Object.assign(Object.assign({}, mapNullableType("array")), this.versionSpecifics.mapTupleItems(schemas));
    }
  }

  class UnionTransformer {
    transform(zodSchema, mapNullableOfArray, mapItem) {
      const options = this.flattenUnionTypes(zodSchema);
      const schemas = options.map((schema) => {
        const optionToGenerate = this.unwrapNullable(schema);
        return mapItem(optionToGenerate);
      });
      return {
        anyOf: mapNullableOfArray(schemas)
      };
    }
    flattenUnionTypes(schema) {
      if (!isZodType(schema, "ZodUnion")) {
        return [schema];
      }
      const options = schema._def.options;
      return options.flatMap((option) => this.flattenUnionTypes(option));
    }
    unwrapNullable(schema) {
      if (isZodType(schema, "ZodNullable")) {
        return this.unwrapNullable(schema.unwrap());
      }
      return schema;
    }
  }

  class OpenApiTransformer {
    constructor(versionSpecifics) {
      this.versionSpecifics = versionSpecifics;
      this.objectTransformer = new ObjectTransformer;
      this.stringTransformer = new StringTransformer;
      this.numberTransformer = new NumberTransformer;
      this.bigIntTransformer = new BigIntTransformer;
      this.literalTransformer = new LiteralTransformer;
      this.enumTransformer = new EnumTransformer;
      this.nativeEnumTransformer = new NativeEnumTransformer;
      this.arrayTransformer = new ArrayTransformer;
      this.unionTransformer = new UnionTransformer;
      this.discriminatedUnionTransformer = new DiscriminatedUnionTransformer;
      this.intersectionTransformer = new IntersectionTransformer;
      this.recordTransformer = new RecordTransformer;
      this.tupleTransformer = new TupleTransformer(versionSpecifics);
    }
    transform(zodSchema, isNullable, mapItem, generateSchemaRef, defaultValue) {
      if (isZodType(zodSchema, "ZodNull")) {
        return this.versionSpecifics.nullType;
      }
      if (isZodType(zodSchema, "ZodUnknown") || isZodType(zodSchema, "ZodAny")) {
        return this.versionSpecifics.mapNullableType(undefined, isNullable);
      }
      if (isZodType(zodSchema, "ZodObject")) {
        return this.objectTransformer.transform(zodSchema, defaultValue, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
      }
      const schema = this.transformSchemaWithoutDefault(zodSchema, isNullable, mapItem, generateSchemaRef);
      return Object.assign(Object.assign({}, schema), { default: defaultValue });
    }
    transformSchemaWithoutDefault(zodSchema, isNullable, mapItem, generateSchemaRef) {
      if (isZodType(zodSchema, "ZodUnknown") || isZodType(zodSchema, "ZodAny")) {
        return this.versionSpecifics.mapNullableType(undefined, isNullable);
      }
      if (isZodType(zodSchema, "ZodString")) {
        return this.stringTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
      }
      if (isZodType(zodSchema, "ZodNumber")) {
        return this.numberTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable), (_) => this.versionSpecifics.getNumberChecks(_));
      }
      if (isZodType(zodSchema, "ZodBigInt")) {
        return this.bigIntTransformer.transform((schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
      }
      if (isZodType(zodSchema, "ZodBoolean")) {
        return this.versionSpecifics.mapNullableType("boolean", isNullable);
      }
      if (isZodType(zodSchema, "ZodLiteral")) {
        return this.literalTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
      }
      if (isZodType(zodSchema, "ZodEnum")) {
        return this.enumTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
      }
      if (isZodType(zodSchema, "ZodNativeEnum")) {
        return this.nativeEnumTransformer.transform(zodSchema, (schema) => this.versionSpecifics.mapNullableType(schema, isNullable));
      }
      if (isZodType(zodSchema, "ZodArray")) {
        return this.arrayTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
      }
      if (isZodType(zodSchema, "ZodTuple")) {
        return this.tupleTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
      }
      if (isZodType(zodSchema, "ZodUnion")) {
        return this.unionTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableOfArray(_, isNullable), mapItem);
      }
      if (isZodType(zodSchema, "ZodDiscriminatedUnion")) {
        return this.discriminatedUnionTransformer.transform(zodSchema, isNullable, (_) => this.versionSpecifics.mapNullableOfArray(_, isNullable), mapItem, generateSchemaRef);
      }
      if (isZodType(zodSchema, "ZodIntersection")) {
        return this.intersectionTransformer.transform(zodSchema, isNullable, (_) => this.versionSpecifics.mapNullableOfArray(_, isNullable), mapItem);
      }
      if (isZodType(zodSchema, "ZodRecord")) {
        return this.recordTransformer.transform(zodSchema, (_) => this.versionSpecifics.mapNullableType(_, isNullable), mapItem);
      }
      if (isZodType(zodSchema, "ZodDate")) {
        return this.versionSpecifics.mapNullableType("string", isNullable);
      }
      const refId = Metadata.getRefId(zodSchema);
      throw new UnknownZodTypeError({
        currentSchema: zodSchema._def,
        schemaName: refId
      });
    }
  }

  class OpenAPIGenerator {
    constructor(definitions, versionSpecifics) {
      this.definitions = definitions;
      this.versionSpecifics = versionSpecifics;
      this.schemaRefs = {};
      this.paramRefs = {};
      this.pathRefs = {};
      this.rawComponents = [];
      this.openApiTransformer = new OpenApiTransformer(versionSpecifics);
      this.sortDefinitions();
    }
    generateDocumentData() {
      this.definitions.forEach((definition) => this.generateSingle(definition));
      return {
        components: this.buildComponents(),
        paths: this.pathRefs
      };
    }
    generateComponents() {
      this.definitions.forEach((definition) => this.generateSingle(definition));
      return {
        components: this.buildComponents()
      };
    }
    buildComponents() {
      var _a, _b;
      const rawComponents = {};
      this.rawComponents.forEach(({ componentType, name, component }) => {
        var _a2;
        (_a2 = rawComponents[componentType]) !== null && _a2 !== undefined || (rawComponents[componentType] = {});
        rawComponents[componentType][name] = component;
      });
      return Object.assign(Object.assign({}, rawComponents), { schemas: Object.assign(Object.assign({}, (_a = rawComponents.schemas) !== null && _a !== undefined ? _a : {}), this.schemaRefs), parameters: Object.assign(Object.assign({}, (_b = rawComponents.parameters) !== null && _b !== undefined ? _b : {}), this.paramRefs) });
    }
    sortDefinitions() {
      const generationOrder = [
        "schema",
        "parameter",
        "component",
        "route"
      ];
      this.definitions.sort((left, right) => {
        if (!("type" in left)) {
          if (!("type" in right)) {
            return 0;
          }
          return -1;
        }
        if (!("type" in right)) {
          return 1;
        }
        const leftIndex = generationOrder.findIndex((type) => type === left.type);
        const rightIndex = generationOrder.findIndex((type) => type === right.type);
        return leftIndex - rightIndex;
      });
    }
    generateSingle(definition) {
      if (!("type" in definition)) {
        this.generateSchemaWithRef(definition);
        return;
      }
      switch (definition.type) {
        case "parameter":
          this.generateParameterDefinition(definition.schema);
          return;
        case "schema":
          this.generateSchemaWithRef(definition.schema);
          return;
        case "route":
          this.generateSingleRoute(definition.route);
          return;
        case "component":
          this.rawComponents.push(definition);
          return;
      }
    }
    generateParameterDefinition(zodSchema) {
      const refId = Metadata.getRefId(zodSchema);
      const result = this.generateParameter(zodSchema);
      if (refId) {
        this.paramRefs[refId] = result;
      }
      return result;
    }
    getParameterRef(schemaMetadata, external) {
      var _a, _b, _c, _d, _e;
      const parameterMetadata = (_a = schemaMetadata === null || schemaMetadata === undefined ? undefined : schemaMetadata.metadata) === null || _a === undefined ? undefined : _a.param;
      const existingRef = ((_b = schemaMetadata === null || schemaMetadata === undefined ? undefined : schemaMetadata._internal) === null || _b === undefined ? undefined : _b.refId) ? this.paramRefs[(_c = schemaMetadata._internal) === null || _c === undefined ? undefined : _c.refId] : undefined;
      if (!((_d = schemaMetadata === null || schemaMetadata === undefined ? undefined : schemaMetadata._internal) === null || _d === undefined ? undefined : _d.refId) || !existingRef) {
        return;
      }
      if (parameterMetadata && existingRef.in !== parameterMetadata.in || (external === null || external === undefined ? undefined : external.in) && existingRef.in !== external.in) {
        throw new ConflictError(`Conflicting location for parameter ${existingRef.name}`, {
          key: "in",
          values: compact([
            existingRef.in,
            external === null || external === undefined ? undefined : external.in,
            parameterMetadata === null || parameterMetadata === undefined ? undefined : parameterMetadata.in
          ])
        });
      }
      if (parameterMetadata && existingRef.name !== parameterMetadata.name || (external === null || external === undefined ? undefined : external.name) && existingRef.name !== (external === null || external === undefined ? undefined : external.name)) {
        throw new ConflictError(`Conflicting names for parameter`, {
          key: "name",
          values: compact([
            existingRef.name,
            external === null || external === undefined ? undefined : external.name,
            parameterMetadata === null || parameterMetadata === undefined ? undefined : parameterMetadata.name
          ])
        });
      }
      return {
        $ref: `#/components/parameters/${(_e = schemaMetadata._internal) === null || _e === undefined ? undefined : _e.refId}`
      };
    }
    generateInlineParameters(zodSchema, location) {
      var _a;
      const metadata = Metadata.getMetadata(zodSchema);
      const parameterMetadata = (_a = metadata === null || metadata === undefined ? undefined : metadata.metadata) === null || _a === undefined ? undefined : _a.param;
      const referencedSchema = this.getParameterRef(metadata, { in: location });
      if (referencedSchema) {
        return [referencedSchema];
      }
      if (isZodType(zodSchema, "ZodObject")) {
        const propTypes = zodSchema._def.shape();
        const parameters = Object.entries(propTypes).map(([key, schema]) => {
          var _a2, _b;
          const innerMetadata = Metadata.getMetadata(schema);
          const referencedSchema2 = this.getParameterRef(innerMetadata, {
            in: location,
            name: key
          });
          if (referencedSchema2) {
            return referencedSchema2;
          }
          const innerParameterMetadata = (_a2 = innerMetadata === null || innerMetadata === undefined ? undefined : innerMetadata.metadata) === null || _a2 === undefined ? undefined : _a2.param;
          if ((innerParameterMetadata === null || innerParameterMetadata === undefined ? undefined : innerParameterMetadata.name) && innerParameterMetadata.name !== key) {
            throw new ConflictError(`Conflicting names for parameter`, {
              key: "name",
              values: [key, innerParameterMetadata.name]
            });
          }
          if ((innerParameterMetadata === null || innerParameterMetadata === undefined ? undefined : innerParameterMetadata.in) && innerParameterMetadata.in !== location) {
            throw new ConflictError(`Conflicting location for parameter ${(_b = innerParameterMetadata.name) !== null && _b !== undefined ? _b : key}`, {
              key: "in",
              values: [location, innerParameterMetadata.in]
            });
          }
          return this.generateParameter(schema.openapi({ param: { name: key, in: location } }));
        });
        return parameters;
      }
      if ((parameterMetadata === null || parameterMetadata === undefined ? undefined : parameterMetadata.in) && parameterMetadata.in !== location) {
        throw new ConflictError(`Conflicting location for parameter ${parameterMetadata.name}`, {
          key: "in",
          values: [location, parameterMetadata.in]
        });
      }
      return [
        this.generateParameter(zodSchema.openapi({ param: { in: location } }))
      ];
    }
    generateSimpleParameter(zodSchema) {
      var _a;
      const metadata = Metadata.getParamMetadata(zodSchema);
      const paramMetadata = (_a = metadata === null || metadata === undefined ? undefined : metadata.metadata) === null || _a === undefined ? undefined : _a.param;
      const required = !Metadata.isOptionalSchema(zodSchema) && !zodSchema.isNullable();
      const schema = this.generateSchemaWithRef(zodSchema);
      return Object.assign({
        schema,
        required
      }, paramMetadata ? Metadata.buildParameterMetadata(paramMetadata) : {});
    }
    generateParameter(zodSchema) {
      var _a;
      const metadata = Metadata.getMetadata(zodSchema);
      const paramMetadata = (_a = metadata === null || metadata === undefined ? undefined : metadata.metadata) === null || _a === undefined ? undefined : _a.param;
      const paramName = paramMetadata === null || paramMetadata === undefined ? undefined : paramMetadata.name;
      const paramLocation = paramMetadata === null || paramMetadata === undefined ? undefined : paramMetadata.in;
      if (!paramName) {
        throw new MissingParameterDataError({ missingField: "name" });
      }
      if (!paramLocation) {
        throw new MissingParameterDataError({
          missingField: "in",
          paramName
        });
      }
      const baseParameter = this.generateSimpleParameter(zodSchema);
      return Object.assign(Object.assign({}, baseParameter), { in: paramLocation, name: paramName });
    }
    generateSchemaWithMetadata(zodSchema) {
      var _a;
      const innerSchema = Metadata.unwrapChained(zodSchema);
      const metadata = Metadata.getMetadata(zodSchema);
      const defaultValue = Metadata.getDefaultValue(zodSchema);
      const result = ((_a = metadata === null || metadata === undefined ? undefined : metadata.metadata) === null || _a === undefined ? undefined : _a.type) ? { type: metadata === null || metadata === undefined ? undefined : metadata.metadata.type } : this.toOpenAPISchema(innerSchema, zodSchema.isNullable(), defaultValue);
      return (metadata === null || metadata === undefined ? undefined : metadata.metadata) ? Metadata.applySchemaMetadata(result, metadata.metadata) : omitBy(result, isUndefined);
    }
    constructReferencedOpenAPISchema(zodSchema) {
      var _a;
      const metadata = Metadata.getMetadata(zodSchema);
      const innerSchema = Metadata.unwrapChained(zodSchema);
      const defaultValue = Metadata.getDefaultValue(zodSchema);
      const isNullableSchema = zodSchema.isNullable();
      if ((_a = metadata === null || metadata === undefined ? undefined : metadata.metadata) === null || _a === undefined ? undefined : _a.type) {
        return this.versionSpecifics.mapNullableType(metadata.metadata.type, isNullableSchema);
      }
      return this.toOpenAPISchema(innerSchema, isNullableSchema, defaultValue);
    }
    generateSimpleSchema(zodSchema) {
      var _a;
      const metadata = Metadata.getMetadata(zodSchema);
      const refId = Metadata.getRefId(zodSchema);
      if (!refId || !this.schemaRefs[refId]) {
        return this.generateSchemaWithMetadata(zodSchema);
      }
      const schemaRef = this.schemaRefs[refId];
      const referenceObject = {
        $ref: this.generateSchemaRef(refId)
      };
      const newMetadata = omitBy(Metadata.buildSchemaMetadata((_a = metadata === null || metadata === undefined ? undefined : metadata.metadata) !== null && _a !== undefined ? _a : {}), (value, key) => value === undefined || objectEquals(value, schemaRef[key]));
      if (newMetadata.type) {
        return {
          allOf: [referenceObject, newMetadata]
        };
      }
      const newSchemaMetadata = omitBy(this.constructReferencedOpenAPISchema(zodSchema), (value, key) => value === undefined || objectEquals(value, schemaRef[key]));
      const appliedMetadata = Metadata.applySchemaMetadata(newSchemaMetadata, newMetadata);
      if (Object.keys(appliedMetadata).length > 0) {
        return {
          allOf: [referenceObject, appliedMetadata]
        };
      }
      return referenceObject;
    }
    generateSchemaWithRef(zodSchema) {
      const refId = Metadata.getRefId(zodSchema);
      const result = this.generateSimpleSchema(zodSchema);
      if (refId && this.schemaRefs[refId] === undefined) {
        this.schemaRefs[refId] = result;
        return { $ref: this.generateSchemaRef(refId) };
      }
      return result;
    }
    generateSchemaRef(refId) {
      return `#/components/schemas/${refId}`;
    }
    getRequestBody(requestBody) {
      if (!requestBody) {
        return;
      }
      const { content } = requestBody, rest = __rest(requestBody, ["content"]);
      const requestBodyContent = this.getBodyContent(content);
      return Object.assign(Object.assign({}, rest), { content: requestBodyContent });
    }
    getParameters(request) {
      if (!request) {
        return [];
      }
      const { headers } = request;
      const query = this.cleanParameter(request.query);
      const params = this.cleanParameter(request.params);
      const cookies = this.cleanParameter(request.cookies);
      const queryParameters = enhanceMissingParametersError(() => query ? this.generateInlineParameters(query, "query") : [], { location: "query" });
      const pathParameters = enhanceMissingParametersError(() => params ? this.generateInlineParameters(params, "path") : [], { location: "path" });
      const cookieParameters = enhanceMissingParametersError(() => cookies ? this.generateInlineParameters(cookies, "cookie") : [], { location: "cookie" });
      const headerParameters = enhanceMissingParametersError(() => {
        if (Array.isArray(headers)) {
          return headers.flatMap((header) => this.generateInlineParameters(header, "header"));
        }
        const cleanHeaders = this.cleanParameter(headers);
        return cleanHeaders ? this.generateInlineParameters(cleanHeaders, "header") : [];
      }, { location: "header" });
      return [
        ...pathParameters,
        ...queryParameters,
        ...headerParameters,
        ...cookieParameters
      ];
    }
    cleanParameter(schema) {
      if (!schema) {
        return;
      }
      return isZodType(schema, "ZodEffects") ? this.cleanParameter(schema._def.schema) : schema;
    }
    generatePath(route) {
      const { method, path, request, responses } = route, pathItemConfig = __rest(route, ["method", "path", "request", "responses"]);
      const generatedResponses = mapValues(responses, (response) => {
        return this.getResponse(response);
      });
      const parameters = enhanceMissingParametersError(() => this.getParameters(request), { route: `${method} ${path}` });
      const requestBody = this.getRequestBody(request === null || request === undefined ? undefined : request.body);
      const routeDoc = {
        [method]: Object.assign(Object.assign(Object.assign(Object.assign({}, pathItemConfig), parameters.length > 0 ? {
          parameters: [...pathItemConfig.parameters || [], ...parameters]
        } : {}), requestBody ? { requestBody } : {}), { responses: generatedResponses })
      };
      return routeDoc;
    }
    generateSingleRoute(route) {
      const routeDoc = this.generatePath(route);
      this.pathRefs[route.path] = Object.assign(Object.assign({}, this.pathRefs[route.path]), routeDoc);
      return routeDoc;
    }
    getResponse(response) {
      if (this.isReferenceObject(response)) {
        return response;
      }
      const { content, headers } = response, rest = __rest(response, ["content", "headers"]);
      const responseContent = content ? { content: this.getBodyContent(content) } : {};
      if (!headers) {
        return Object.assign(Object.assign({}, rest), responseContent);
      }
      const responseHeaders = isZodType(headers, "ZodObject") ? this.getResponseHeaders(headers) : headers;
      return Object.assign(Object.assign(Object.assign({}, rest), { headers: responseHeaders }), responseContent);
    }
    isReferenceObject(schema) {
      return "$ref" in schema;
    }
    getResponseHeaders(headers) {
      const schemaShape = headers._def.shape();
      const responseHeaders = mapValues(schemaShape, (_) => this.generateSimpleParameter(_));
      return responseHeaders;
    }
    getBodyContent(content) {
      return mapValues(content, (config) => {
        if (!config || !isAnyZodType(config.schema)) {
          return config;
        }
        const { schema: configSchema } = config, rest = __rest(config, ["schema"]);
        const schema = this.generateSchemaWithRef(configSchema);
        return Object.assign({ schema }, rest);
      });
    }
    toOpenAPISchema(zodSchema, isNullable, defaultValue) {
      return this.openApiTransformer.transform(zodSchema, isNullable, (_) => this.generateSchemaWithRef(_), (_) => this.generateSchemaRef(_), defaultValue);
    }
  }

  class OpenApiGeneratorV30Specifics {
    get nullType() {
      return { nullable: true };
    }
    mapNullableOfArray(objects, isNullable) {
      if (isNullable) {
        return [...objects, this.nullType];
      }
      return objects;
    }
    mapNullableType(type, isNullable) {
      return Object.assign(Object.assign({}, type ? { type } : undefined), isNullable ? this.nullType : undefined);
    }
    mapTupleItems(schemas) {
      const uniqueSchemas = uniq(schemas);
      return {
        items: uniqueSchemas.length === 1 ? uniqueSchemas[0] : { anyOf: uniqueSchemas },
        minItems: schemas.length,
        maxItems: schemas.length
      };
    }
    getNumberChecks(checks) {
      return Object.assign({}, ...checks.map((check) => {
        switch (check.kind) {
          case "min":
            return check.inclusive ? { minimum: Number(check.value) } : { minimum: Number(check.value), exclusiveMinimum: true };
          case "max":
            return check.inclusive ? { maximum: Number(check.value) } : { maximum: Number(check.value), exclusiveMaximum: true };
          default:
            return {};
        }
      }));
    }
  }

  class OpenApiGeneratorV3 {
    constructor(definitions) {
      const specifics = new OpenApiGeneratorV30Specifics;
      this.generator = new OpenAPIGenerator(definitions, specifics);
    }
    generateDocument(config) {
      const baseData = this.generator.generateDocumentData();
      return Object.assign(Object.assign({}, config), baseData);
    }
    generateComponents() {
      return this.generator.generateComponents();
    }
  }

  class OpenApiGeneratorV31Specifics {
    get nullType() {
      return { type: "null" };
    }
    mapNullableOfArray(objects, isNullable) {
      if (isNullable) {
        return [...objects, this.nullType];
      }
      return objects;
    }
    mapNullableType(type, isNullable) {
      if (!type) {
        return {};
      }
      if (isNullable) {
        return {
          type: Array.isArray(type) ? [...type, "null"] : [type, "null"]
        };
      }
      return {
        type
      };
    }
    mapTupleItems(schemas) {
      return {
        prefixItems: schemas
      };
    }
    getNumberChecks(checks) {
      return Object.assign({}, ...checks.map((check) => {
        switch (check.kind) {
          case "min":
            return check.inclusive ? { minimum: Number(check.value) } : { exclusiveMinimum: Number(check.value) };
          case "max":
            return check.inclusive ? { maximum: Number(check.value) } : { exclusiveMaximum: Number(check.value) };
          default:
            return {};
        }
      }));
    }
  }
  function isWebhookDefinition(definition) {
    return "type" in definition && definition.type === "webhook";
  }

  class OpenApiGeneratorV31 {
    constructor(definitions) {
      this.definitions = definitions;
      this.webhookRefs = {};
      const specifics = new OpenApiGeneratorV31Specifics;
      this.generator = new OpenAPIGenerator(this.definitions, specifics);
    }
    generateDocument(config) {
      const baseDocument = this.generator.generateDocumentData();
      this.definitions.filter(isWebhookDefinition).forEach((definition) => this.generateSingleWebhook(definition.webhook));
      return Object.assign(Object.assign(Object.assign({}, config), baseDocument), { webhooks: this.webhookRefs });
    }
    generateComponents() {
      return this.generator.generateComponents();
    }
    generateSingleWebhook(route) {
      const routeDoc = this.generator.generatePath(route);
      this.webhookRefs[route.path] = Object.assign(Object.assign({}, this.webhookRefs[route.path]), routeDoc);
      return routeDoc;
    }
  }
  exports2.OpenAPIRegistry = OpenAPIRegistry;
  exports2.OpenApiGeneratorV3 = OpenApiGeneratorV3;
  exports2.OpenApiGeneratorV31 = OpenApiGeneratorV31;
  exports2.extendZodWithOpenApi = extendZodWithOpenApi;
  exports2.getOpenApiMetadata = getOpenApiMetadata;
});

// src/index.ts
var exports_src = {};
__export(exports_src, {
  walletSchema: () => walletSchema,
  updateWebhookResponseSchema: () => updateWebhookResponseSchema,
  updatePoolMessageSchema: () => updatePoolMessageSchema,
  tokenHoldingSchema: () => tokenHoldingSchema,
  tokenDataSchema: () => tokenDataSchema,
  tokenDataKeys: () => tokenDataKeys,
  syncMessageSchema: () => syncMessageSchema,
  singlePositionOutputSchema: () => singlePositionOutputSchema,
  selectCategoryTokenVsCategory: () => selectCategoryTokenVsCategory,
  selectAssetTokenVsCategory: () => selectAssetTokenVsCategory,
  removePoolMessageSchema: () => removePoolMessageSchema,
  poolDataSchema: () => poolDataSchema,
  poolDataKeys: () => poolDataKeys,
  nonNumericValues: () => nonNumericValues,
  nonNumericPoolValues: () => nonNumericPoolValues,
  newPoolMessageSchema: () => newPoolMessageSchema,
  logoUrlSchema: () => logoUrlSchema,
  listWebhooksQueryParams: () => listWebhooksQueryParams,
  listWebhookResponseSchema: () => listWebhookResponseSchema,
  keysToRemoveTokenToPulse: () => keysToRemoveTokenToPulse,
  keysToRemovePoolToPulse: () => keysToRemovePoolToPulse,
  getZodSchemaKeys: () => getZodSchemaKeys,
  getZodKeysAdvanced: () => getZodKeysAdvanced,
  getZodDefaultValue: () => getZodDefaultValue,
  getPeriodSeconds: () => getPeriodSeconds,
  getBucketExpression: () => getBucketExpression,
  generateMinimalistMapping: () => generateMinimalistMapping,
  generateDefaultFromSchema: () => generateDefaultFromSchema,
  generateAutomaticMinimalistParser: () => generateAutomaticMinimalistParser,
  formattedJSONSchema: () => formattedJSONSchema,
  extractZodSchemaKeys: () => extractZodSchemaKeys,
  extractAllZodKeys: () => extractAllZodKeys,
  deleteWebhookResponseSchema: () => deleteWebhookResponseSchema,
  deleteWebhookParams: () => deleteWebhookParams,
  dateFields: () => dateFields,
  createFeedQuery: () => createFeedQuery,
  countOperations: () => countOperations,
  bigintAbs: () => bigintAbs,
  batchPositionItemSchema: () => batchPositionItemSchema,
  WebhookResponseSchema: () => WebhookResponseSchema,
  WebSocketMessageSchema: () => WebSocketMessageSchema,
  WalletV2DeployerResponseSchema: () => WalletV2DeployerResponseSchema,
  WalletV2DeployerParamsSchema: () => WalletV2DeployerParamsSchema,
  WalletV1DeployerResponseSchema: () => WalletV1DeployerResponseSchema,
  WalletV1DeployerParamsSchema: () => WalletV1DeployerParamsSchema,
  WalletTransactionsResponseSchema: () => WalletTransactionsResponseSchema,
  WalletTransactionsParamsSchema: () => WalletTransactionsParamsSchema,
  WalletTradesResponseSchema: () => WalletTradesResponseSchema,
  WalletTradesParamsSchema: () => WalletTradesParamsSchema,
  WalletSmartMoneyResponseSchema: () => WalletSmartMoneyResponseSchema,
  WalletRawTransactionsResponseSchema: () => WalletRawTransactionsResponseSchema,
  WalletRawTransactionsParamsSchema: () => WalletRawTransactionsParamsSchema,
  WalletPositionsResponseSchema: () => WalletPositionsResponseSchema,
  WalletPositionsParamsSchema: () => WalletPositionsParamsSchema,
  WalletPerpsPositionsResponseSchema: () => WalletPerpsPositionsResponseSchema,
  WalletPerpsPositionsNonExecutedResponseSchema: () => WalletPerpsPositionsNonExecutedResponseSchema,
  WalletNFTTransactionsResponseSchema: () => WalletNFTTransactionsResponseSchema,
  WalletNFTResponseSchema: () => WalletNFTResponseSchema,
  WalletNFTParamsSchema: () => WalletNFTParamsSchema,
  WalletLabelsResponseSchema: () => WalletLabelsResponseSchema,
  WalletLabelsParamsSchema: () => WalletLabelsParamsSchema,
  WalletHoldingsResponseSchema: () => WalletHoldingsResponseSchema,
  WalletHistoryResponseSchema: () => WalletHistoryResponseSchema,
  WalletHistoryParamsSchema: () => WalletHistoryParamsSchema,
  WalletFundingResponseSchema: () => WalletFundingResponseSchema,
  WalletFundingParamsSchema: () => WalletFundingParamsSchema,
  WalletDefiPositionsParamsSchema: () => WalletDefiPositionsParamsSchema,
  WalletBalanceUSDResponseSchema: () => WalletBalanceUSDResponseSchema,
  WalletBalanceUSDParamsSchema: () => WalletBalanceUSDParamsSchema,
  WalletAnalysisResponseSchemaOpenAPI: () => WalletAnalysisResponseSchemaOpenAPI,
  WalletAnalysisResponseSchema: () => WalletAnalysisResponseSchema,
  WalletAnalysisParamsSchemaOpenAPI: () => WalletAnalysisParamsSchemaOpenAPI,
  WalletAnalysisParamsSchema: () => WalletAnalysisParamsSchema,
  WalletActivityV2TransactionSchema: () => WalletActivityV2TransactionSchema,
  WalletActivityV2TransactionActivitySchema: () => WalletActivityV2TransactionActivitySchema,
  WalletActivityV2ResponseSchema: () => WalletActivityV2ResponseSchema,
  WalletActivityV2ParamsSchema: () => WalletActivityV2ParamsSchema,
  WalletActivityV2OutputPaginationSchema: () => WalletActivityV2OutputPaginationSchema,
  WalletActivityV2OutputDataSchema: () => WalletActivityV2OutputDataSchema,
  UpdateWebhook: () => UpdateWebhook,
  UpdateStreamPayloadSchema: () => UpdateStreamPayloadSchema,
  UnsubscribeStreamPayloadSchema: () => UnsubscribeStreamPayloadSchema,
  TokenTypeValues: () => TokenTypeValues,
  TokenTypeSchema: () => TokenTypeSchema,
  TokenTradesParamsSchema: () => TokenTradesParamsSchema,
  TokenTradeResponseSchema: () => TokenTradeResponseSchema,
  TokenTradeParamsSchemaOpenAPI: () => TokenTradeParamsSchemaOpenAPI,
  TokenTradeParamsSchema: () => TokenTradeParamsSchema,
  TokenTradeOutputOpenAPI: () => TokenTradeOutputOpenAPI,
  TokenTradeOutput: () => TokenTradeOutput,
  TokenStatsSchema: () => TokenStatsSchema,
  TokenSecurityResponseSchema: () => TokenSecurityResponseSchema,
  TokenSecurityQuery: () => TokenSecurityQuery,
  TokenSecurityParamsSchema: () => TokenSecurityQuery,
  TokenSecurityOutput: () => TokenSecurityOutput,
  TokenPriceResponseSchema: () => TokenPriceResponseSchema,
  TokenPriceParamsSchema: () => TokenPriceParamsSchema,
  TokenPriceBatchResponseSchema: () => TokenPriceBatchResponseSchema,
  TokenPriceBatchParamsSchema: () => TokenPriceBatchParamsSchema,
  TokenPositionsResponseSchema: () => TokenPositionsResponseSchema,
  TokenPositionsParamsSchema: () => TokenPositionsParamsSchema,
  TokenPositionOutput: () => TokenPositionOutput,
  TokenOHLCVHistoryResponseSchema: () => TokenOHLCVHistoryResponseSchema,
  TokenOHLCVHistoryParamsSchema: () => TokenOHLCVHistoryParamsSchema,
  TokenOHLCVHistoryBatchResponseSchema: () => TokenOHLCVHistoryBatchResponseSchema,
  TokenOHLCVHistoryBatchParamsSchema: () => TokenOHLCVHistoryBatchParamsSchema,
  TokenMarketsResponseSchema: () => TokenMarketsResponseSchema,
  TokenMarketsParamsSchema: () => TokenMarketsParamsSchema,
  TokenMarketsOutput: () => TokenMarketsOutput,
  TokenKlineBsPointResponseSchema: () => TokenKlineBsPointResponseSchema,
  TokenKlineBsPointParamsSchema: () => TokenKlineBsPointParamsSchema,
  TokenKlineBsBubblePoint: () => TokenKlineBsBubblePoint,
  TokenFirstBuyersResponseSchema: () => TokenFirstBuyersResponseSchema,
  TokenFirstBuyersParamsSchema: () => TokenFirstBuyersParamsSchema,
  TokenDetailsResponseSchema: () => TokenDetailsResponseSchema,
  TokenDetailsPayloadSchema: () => TokenDetailsPayloadSchema,
  TokenDetailsParamsSchema: () => TokenDetailsParamsSchema,
  TokenDetailsBatchResponseSchema: () => TokenDetailsBatchResponseSchema,
  TokenDetailsBatchParamsSchema: () => TokenDetailsBatchParamsSchema,
  TokenData: () => TokenData,
  Tags: () => Tags,
  TOKEN_METADATA_KEYS: () => TOKEN_METADATA_KEYS,
  SystemMetadataResponseSchema: () => SystemMetadataResponseSchema,
  SwapType: () => SwapType,
  SwapSendSchema: () => SwapSendSchema,
  SwapSendResponseSchema: () => SwapSendResponseSchema,
  SwapQuotingQuerySchema: () => SwapQuotingQuerySchema,
  SwapQuotingOutputSchema: () => SwapQuotingOutputSchema,
  SwapQuotingInstructionsOutputSchema: () => SwapQuotingInstructionsOutputSchema,
  SwapQuotingInstructionsDataSchema: () => SwapQuotingInstructionsDataSchema,
  SwapQuotingDataSchema: () => SwapQuotingDataSchema,
  SwapQuotingBatchOutputSchema: () => SwapQuotingBatchOutputSchema,
  SwapQuotingBatchBodySchema: () => SwapQuotingBatchBodySchema,
  SupportedCurrency: () => SupportedCurrency,
  StreamPayloadSchema: () => StreamPayloadSchema,
  StaticAnalysisStatusEnum: () => StaticAnalysisStatusEnum,
  SolanaInstructionsSchema: () => SolanaInstructionsSchema,
  SolanaInstructionSchema: () => SolanaInstructionSchema,
  SingleTokenTradeResponseSchemaOpenAPI: () => SingleTokenTradeResponseSchemaOpenAPI,
  SingleTokenTradeResponseSchema: () => SingleTokenTradeResponseSchema,
  SinglePositionQuery: () => SinglePositionQuery,
  SinglePositionBatchResponseSchema: () => SinglePositionBatchResponseSchema,
  SinglePositionBatchParamsSchema: () => SinglePositionBatchParamsSchema,
  SecuritySourcesSchema: () => SecuritySourcesSchema,
  SearchResponseSchema: () => SearchResponseSchema,
  SearchParamsSchema: () => SearchParamsSchema,
  SearchFastResponseSchema: () => SearchFastResponseSchema,
  PulseQuerySchema: () => PulseQuerySchema,
  PulsePayloadParamsSchema: () => PulsePayloadParamsSchema,
  PulsePaginationResponseSchema: () => PulsePaginationResponseSchema,
  PulseOutputSchema: () => PulseOutputSchema,
  PulseEnrichedTokenDataSchema: () => PulseEnrichedTokenDataSchema,
  PulseEnrichedPoolDataSchema: () => PulseEnrichedPoolDataSchema,
  PositionsPayloadSchema: () => PositionsPayloadSchema,
  PositionSchema: () => PositionSchema,
  PositionPayloadSchema: () => PositionPayloadSchema,
  PortfolioResponseSchema: () => PortfolioResponseSchema,
  PortfolioParamsSchema: () => PortfolioParamsSchema,
  PortfolioDefiParamsSchema: () => PortfolioDefiParamsSchema,
  PoolStatsSchema: () => PoolStatsSchema,
  PoolData: () => PoolData,
  PerpsPositionSchema: () => PerpsPositionSchema,
  PerpsPositionNonExecutedSchema: () => PerpsPositionNonExecutedSchema,
  PerpOrderQuotingParamsSchema: () => PerpOrderQuotingParamsSchema,
  PerpBlocksResponseSchema: () => PerpBlocksResponseSchema,
  PerpBlocksQueryParamsSchema: () => PerpBlocksQueryParamsSchema,
  PerpBlockSchema: () => PerpBlockSchema,
  PausePulsePayloadSchema: () => PausePulsePayloadSchema,
  PausePulsePayloadParamsSchema: () => PausePulsePayloadParamsSchema,
  PairsPayloadSchema: () => PairsPayloadSchema,
  OhlcvPayloadSchema: () => OhlcvPayloadSchema,
  NON_USD_CURRENCIES: () => NON_USD_CURRENCIES,
  NFTMetadataResponseSchema: () => NFTMetadataResponseSchema,
  NFTMetadataParamsSchema: () => NFTMetadataParamsSchema,
  MultiPortfolioResponseSchema: () => MultiPortfolioResponseSchema,
  MultiMetadataResponseSchema: () => MultiMetadataResponseSchema,
  MultiMetadataParamsSchema: () => MultiMetadataParamsSchema,
  MetadataTrendingsResponseSchema: () => MetadataTrendingsResponseSchema,
  MetadataTrendingsParamsSchema: () => MetadataTrendingsParamsSchema,
  MetadataResponseSchema: () => MetadataResponseSchema,
  MetadataParamsSchema: () => MetadataParamsSchema,
  MetadataNewsResponseSchema: () => MetadataNewsResponseSchema,
  MetadataNewsParamsSchema: () => MetadataNewsParamsSchema,
  MetadataCategoriesResponseSchema: () => MetadataCategoriesResponseSchema,
  MarketTradesPairResponseSchema: () => MarketTradesPairResponseSchema,
  MarketTradesPairParamsSchema: () => MarketTradesPairParamsSchema,
  MarketTotalResponseSchema: () => MarketTotalResponseSchema,
  MarketTokenVsMarketResponseSchema: () => MarketTokenVsMarketResponseSchema,
  MarketTokenVsMarketParamsSchema: () => MarketTokenVsMarketParamsSchema,
  MarketTokenHoldersResponseSchema: () => MarketTokenHoldersResponseSchema,
  MarketTokenHoldersParamsSchema: () => MarketTokenHoldersParamsSchema,
  MarketSparklineResponseSchema: () => MarketSparklineResponseSchema,
  MarketSparklineParamsSchema: () => MarketSparklineParamsSchema,
  MarketQueryResponseSchema: () => MarketQueryResponseSchema,
  MarketQueryParamsSchema: () => MarketQueryParamsSchema,
  MarketPayloadSchema: () => MarketPayloadSchema,
  MarketPairsResponseSchema: () => MarketPairsResponseSchema,
  MarketPairsParamsSchema: () => MarketPairsParamsSchema,
  MarketPairResponseSchema: () => MarketPairResponseSchema,
  MarketPairParamsSchema: () => MarketPairParamsSchema,
  MarketOHLCVHistoryResponseSchema: () => MarketOHLCVHistoryResponseSchema,
  MarketOHLCVHistoryParamsSchema: () => MarketOHLCVHistoryParamsSchema,
  MarketOHLCVHistoryBatchResponseSchema: () => MarketOHLCVHistoryBatchResponseSchema,
  MarketOHLCVHistoryBatchParamsSchema: () => MarketOHLCVHistoryBatchParamsSchema,
  MarketNftResponseSchema: () => MarketNftResponseSchema,
  MarketNftParamsSchema: () => MarketNftParamsSchema,
  MarketMultiPricesResponseSchema: () => MarketMultiPricesResponseSchema,
  MarketMultiPricesParamsSchema: () => MarketMultiPricesParamsSchema,
  MarketMultiHistoryResponseSchema: () => MarketMultiHistoryResponseSchema,
  MarketMultiHistoryParamsSchema: () => MarketMultiHistoryParamsSchema,
  MarketMultiDataResponseSchema: () => MarketMultiDataResponseSchema,
  MarketMultiDataAssetParamsSchema: () => MarketMultiDataAssetParamsSchema,
  MarketHistoryResponseSchema: () => MarketHistoryResponseSchema,
  MarketHistoryParamsSchema: () => MarketHistoryParamsSchema,
  MarketHistoryPairResponseSchema: () => MarketHistoryPairResponseSchema,
  MarketHistoryPairParamsSchema: () => MarketHistoryPairParamsSchema,
  MarketDetailsResponseSchema: () => MarketDetailsResponseSchema,
  MarketDetailsPayloadSchema: () => MarketDetailsPayloadSchema,
  MarketDetailsParamsSchema: () => MarketDetailsParamsSchema,
  MarketDetailsBatchResponseSchema: () => MarketDetailsBatchResponseSchema,
  MarketDetailsBatchParamsSchema: () => MarketDetailsBatchParamsSchema,
  MarketDataResponseSchema: () => MarketDataResponseSchema,
  MarketBlockchainStatsResponseSchema: () => MarketBlockchainStatsResponseSchema,
  MarketBlockchainStatsParamsSchema: () => MarketBlockchainStatsParamsSchema,
  MarketBlockchainPairsResponseSchema: () => MarketBlockchainPairsResponseSchema,
  MarketBlockchainPairsParamsSchema: () => MarketBlockchainPairsParamsSchema,
  LLMSecurityFlagsSchema: () => LLMSecurityFlagsSchema,
  HoldersStreamNewTokenPayload: () => HoldersStreamNewTokenPayload,
  HoldersStatsSchema: () => HoldersStatsSchema,
  HoldersPayloadSchema: () => HoldersPayloadSchema,
  HolderSchema: () => HolderSchema,
  FundingRateResponseSchema: () => FundingRateResponseSchema,
  FundingRateParamsSchema: () => FundingRateParamsSchema,
  FundingPayloadSchema: () => FundingPayloadSchema,
  FormattedTokenTradeResponseSchema: () => FormattedTokenTradeResponseSchema,
  FormattedTokenTradeOutput: () => FormattedTokenTradeOutput,
  FeedTokenSchema: () => FeedTokenSchema,
  FeedPayloadSchema: () => FeedPayloadSchema,
  FeedAssetIdSchema: () => FeedAssetIdSchema,
  FastTradesPayloadSchema: () => FastTradesPayloadSchema,
  ExchangesIds: () => ExchangesIds,
  EnrichedTokenDataSchema: () => EnrichedTokenDataSchema,
  EnrichedPoolDataSchema: () => EnrichedPoolDataSchema,
  DefiPositionsResponseSchema: () => DefiPositionsResponseSchema,
  DebugPulseViewsResponseSchema: () => DebugPulseViewsResponseSchema,
  DEFAULT_CURRENCY: () => DEFAULT_CURRENCY,
  CurrenciesParamSchema: () => CurrenciesParamSchema,
  CryptoNewsDataSchema: () => CryptoNewsDataSchema,
  CreateWebhookResponseSchema: () => CreateWebhookResponseSchema,
  CreateWebhook: () => CreateWebhook,
  BlockchainsResponseSchema: () => BlockchainsResponseSchema,
  BlockQueryParamsSchema: () => BlockQueryParamsSchema,
  BalancePayloadSchema: () => BalancePayloadSchema,
  AssetTokenDetailsOutput: () => AssetTokenDetailsOutput,
  AssetQuery: () => AssetQuery,
  AssetPriceHistoryResponseSchema: () => AssetPriceHistoryResponseSchema,
  AssetPriceHistoryParamsSchema: () => AssetPriceHistoryParamsSchema,
  AssetPriceHistoryBatchResponseSchema: () => AssetPriceHistoryBatchResponseSchema,
  AssetPriceHistoryBatchParamsSchema: () => AssetPriceHistoryBatchParamsSchema,
  AssetDetailsResponseSchema: () => AssetDetailsResponseSchema,
  AssetDetailsParamsSchema: () => AssetDetailsParamsSchema,
  AssetDetailsDataOutput: () => AssetDetailsDataOutput,
  AssetDetailsBatchResponseSchema: () => AssetDetailsBatchResponseSchema,
  AssetDetailsBatchParamsSchema: () => AssetDetailsBatchParamsSchema,
  AssetDataOutput: () => AssetDataOutput,
  AllAssetsResponseSchema: () => AllAssetsResponseSchema,
  AllAssetsParamsSchema: () => AllAssetsParamsSchema,
  API_KEYS_QUERIES: () => API_KEYS_QUERIES
});
module.exports = __toCommonJS(exports_src);

// src/misc/ApiKeysQueries.ts
var API_KEYS_QUERIES = {
  SELECT_BY_NAME_AND_OWNER: `
    SELECT key FROM misc.api_keys
    WHERE name = $1
    AND (
      ($2::text IS NULL AND organization_id IS NULL AND customer_id = $3)
      OR
      (organization_id = $2)
    )
    LIMIT 1
  `,
  INSERT: `
    INSERT INTO misc.api_keys
      (key, customer_id, organization_id, name, total_calls, metrics)
    VALUES
      ($1, $2, $3, $4, 0, $5)
  `
};
// src/utils/constants/constants.ts
var Tags;
((Tags2) => {
  Tags2["SNIPER"] = "sniper";
  Tags2["INSIDER"] = "insider";
  Tags2["BUNDLER"] = "bundler";
  Tags2["PRO_TRADER"] = "proTrader";
  Tags2["SMART_TRADER"] = "smartTrader";
  Tags2["FRESH_TRADER"] = "freshTrader";
  Tags2["DEV"] = "dev";
  Tags2["LIQUIDITY_POOL"] = "liquidityPool";
})(Tags ||= {});
var SwapType;
((SwapType2) => {
  SwapType2["REGULAR"] = "REGULAR";
  SwapType2["MEV"] = "MEV";
  SwapType2["MEV_SANDWICHED"] = "MEV_SANDWICHED";
  SwapType2["WITHDRAWAL"] = "WITHDRAWAL";
  SwapType2["DEPOSIT"] = "DEPOSIT";
  SwapType2["BOND"] = "BOND";
})(SwapType ||= {});
// src/utils/functions/bigintAbs.ts
function bigintAbs(value) {
  return value < 0n ? -value : value;
}
// src/utils/functions/period.ts
function normalizePeriod(period, defaultPeriod = "1h") {
  switch (period.toLowerCase()) {
    case "1s":
      return "1s";
    case "5s":
      return "5s";
    case "15s":
      return "15s";
    case "30s":
      return "30s";
    case "1":
    case "1m":
    case "1min":
      return "1m";
    case "5":
    case "5m":
    case "5min":
      return "5m";
    case "15":
    case "15m":
    case "15min":
      return "15m";
    case "60":
    case "1h":
      return "1h";
    case "1d":
      return "1d";
    case "1w":
      return "1w";
    case "1month":
      return "1M";
    default:
      return defaultPeriod;
  }
}
function getPeriodSeconds(period) {
  switch (period) {
    case "1s":
      return 1;
    case "5s":
      return 5;
    case "15s":
      return 15;
    case "30s":
      return 30;
    case "1m":
      return 60;
    case "5m":
      return 5 * 60;
    case "15m":
      return 15 * 60;
    case "1h":
      return 60 * 60;
    case "1d":
      return 24 * 60 * 60;
    case "1w":
      return 7 * 24 * 60 * 60;
    case "1M":
      return 30 * 24 * 60 * 60;
    default:
      throw new Error("Invalid bar value");
  }
}
function getBucketExpression(period) {
  switch (period) {
    case "1s":
      return `date_trunc('second', date)`;
    case "5s":
      return `
        date_trunc('minute', date)
        + floor(extract(second from date)::int / 5) * interval '5 second'
      `;
    case "15s":
      return `
        date_trunc('minute', date)
        + floor(extract(second from date)::int / 15) * interval '15 second'
      `;
    case "30s":
      return `
        date_trunc('minute', date)
        + floor(extract(second from date)::int / 30) * interval '30 second'
      `;
    case "1m":
      return `date_trunc('minute', date)`;
    case "5m":
      return `
        date_trunc('hour', date)
        + floor(extract(minute from date)::int / 5) * interval '5 minute'
      `;
    case "15m":
      return `
        date_trunc('hour', date)
        + floor(extract(minute from date)::int / 15) * interval '15 minute'
      `;
    case "1h":
      return `date_trunc('hour', date)`;
    case "1d":
      return `date_trunc('day', date)`;
    case "1w":
      return `date_trunc('week', date)`;
    case "1M":
      return `date_trunc('month', date)`;
    default:
      throw new Error("Invalid period value");
  }
}
// src/utils/functions/zodUtils.ts
function extractZodSchemaKeys(schema) {
  const schemaDef = schema._def;
  if (!schemaDef || typeof schemaDef !== "object" || !("typeName" in schemaDef) || schemaDef.typeName !== "ZodObject" || !("shape" in schemaDef)) {
    throw new Error("Provided schema is not a valid ZodObject schema");
  }
  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== "function") {
    throw new Error("Schema shape is not a function");
  }
  const shape = shapeFn();
  if (!shape || typeof shape !== "object") {
    throw new Error("Schema shape function did not return a valid object");
  }
  const keys = Object.keys(shape);
  return keys;
}
function getZodKeysAdvanced(schema) {
  const schemaDef = schema._def;
  if (!schemaDef || typeof schemaDef !== "object" || !("typeName" in schemaDef) || schemaDef.typeName !== "ZodObject" || !("shape" in schemaDef)) {
    return [];
  }
  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== "function") {
    return [];
  }
  const shape = shapeFn();
  if (!shape || typeof shape !== "object") {
    return [];
  }
  return Object.keys(shape);
}
function extractAllZodKeys(schema, includeNested = false) {
  const schemaDef = schema._def;
  if (!schemaDef || typeof schemaDef !== "object" || !("typeName" in schemaDef) || schemaDef.typeName !== "ZodObject" || !("shape" in schemaDef)) {
    return [];
  }
  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== "function") {
    return [];
  }
  const shape = shapeFn();
  if (!shape || typeof shape !== "object") {
    return [];
  }
  const keys = [];
  function extractKeys(obj, prefix = "") {
    for (const [key, zodType] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.push(fullKey);
      if (includeNested && zodType && typeof zodType === "object" && "_def" in zodType) {
        const def = zodType._def;
        if (def && typeof def === "object" && "typeName" in def && def.typeName === "ZodObject" && "shape" in def && typeof def.shape === "function") {
          const nestedShape = def.shape();
          if (nestedShape && typeof nestedShape === "object") {
            extractKeys(nestedShape, fullKey);
          }
        }
      }
    }
  }
  extractKeys(shape);
  return keys;
}
var getZodDefaultValue = (zodType) => {
  if (!zodType || typeof zodType !== "object" || !("_def" in zodType) || !zodType._def) {
    return 0;
  }
  const def = zodType._def;
  if (def["typeName"] === "ZodDefault") {
    const defaultValue = def["defaultValue"];
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  }
  if (def["typeName"] === "ZodNullable") {
    return null;
  }
  if (def["typeName"] === "ZodOptional") {
    return getZodDefaultValue(def["innerType"]);
  }
  if (def["typeName"] === "ZodEffects") {
    return getZodDefaultValue(def["schema"]);
  }
  switch (def["typeName"]) {
    case "ZodString":
      return "";
    case "ZodNumber":
      return 0;
    case "ZodBoolean":
      return false;
    case "ZodDate":
      return null;
    case "ZodArray":
      return [];
    case "ZodObject":
      return {};
    default:
      return 0;
  }
};
var generateDefaultFromSchema = (schema) => {
  const result = {};
  if (schema && typeof schema === "object" && "_def" in schema && schema._def && typeof schema._def === "object" && "typeName" in schema._def && schema._def.typeName === "ZodObject" && "shape" in schema._def) {
    const shapeFn = schema._def.shape;
    const shape = shapeFn();
    for (const [key, zodType] of Object.entries(shape)) {
      result[key] = getZodDefaultValue(zodType);
    }
  }
  return result;
};
var getZodSchemaKeys = (schema) => {
  if (schema && typeof schema === "object" && "_def" in schema && schema._def && typeof schema._def === "object" && "typeName" in schema._def && schema._def.typeName === "ZodObject" && "shape" in schema._def) {
    const shapeFn = schema._def.shape;
    const shape = shapeFn();
    return Object.keys(shape);
  }
  return [];
};
var generateMinimalistMapping = (schema, data) => {
  const keys = getZodSchemaKeys(schema);
  const result = {};
  for (let i = 0;i < keys.length; i++) {
    const key = keys[i];
    if (key) {
      const value = data[i] ?? null;
      result[key] = value;
    }
  }
  return result;
};
var generateAutomaticMinimalistParser = (schema, data) => {
  const keys = getZodSchemaKeys(schema);
  const result = {};
  for (let i = 0;i < keys.length; i++) {
    const key = keys[i];
    if (key) {
      const value = data[i];
      if (value === null || value === undefined) {
        result[key] = null;
      } else if (typeof value === "string") {
        if (key.includes("date") || key.includes("created") || key.includes("bonded_at")) {
          result[key] = new Date(value);
        } else {
          result[key] = value;
        }
      } else if (typeof value === "number") {
        result[key] = value;
      } else if (typeof value === "boolean") {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = value;
      } else {
        result[key] = value;
      }
    }
  }
  return result;
};
// src/utils/schemas/BigIntLax.ts
var import_zod = require("zod");
function scientificToInteger(value) {
  const match = value.match(/^(-?)(\d+)\.?(\d*)e([+-]?)(\d+)$/i);
  if (!match) {
    return value;
  }
  try {
    const [, sign, integerPart, decimalPart, expSign, exponentStr] = match;
    const exponent = Number.parseInt(exponentStr, 10);
    if (expSign === "-") {
      return sign === "-" ? "-0" : "0";
    }
    const digits = integerPart + (decimalPart || "");
    const decimalPosition = integerPart.length;
    const newLength = decimalPosition + exponent;
    if (newLength <= 0) {
      return sign === "-" ? "-0" : "0";
    }
    if (newLength >= digits.length) {
      const zerosToAdd = newLength - digits.length;
      return sign + digits + "0".repeat(zerosToAdd);
    }
    return sign + digits.slice(0, newLength);
  } catch {
    return value;
  }
}
var BigIntLax = import_zod.z.union([
  import_zod.z.string().transform((v, ctx) => {
    let value;
    try {
      const normalizedValue = scientificToInteger(v);
      value = BigInt(normalizedValue);
    } catch (_) {
      ctx.addIssue({
        code: import_zod.z.ZodIssueCode.custom,
        message: "Cannot parse to BigInt"
      });
      return import_zod.z.NEVER;
    }
    return value;
  }),
  import_zod.z.number().transform((v, ctx) => {
    if (!Number.isSafeInteger(v)) {
      ctx.addIssue({
        code: import_zod.z.ZodIssueCode.custom,
        message: "Number is not a safe integer"
      });
      return import_zod.z.NEVER;
    }
    return BigInt(v);
  }),
  import_zod.z.bigint(),
  import_zod.z.null().transform(() => 0n)
]);
var BigIntLax_default = BigIntLax;
// src/utils/schemas/CurrencySchema.ts
var import_zod2 = require("zod");
var SupportedCurrency = import_zod2.z.enum(["USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "KRW", "INR", "BRL"]);
var DEFAULT_CURRENCY = "USD";
var CurrenciesParamSchema = import_zod2.z.string().optional().default("USD").transform((val) => {
  const currencies = val.split(",").map((c) => c.trim().toUpperCase()).filter((c) => SupportedCurrency.safeParse(c).success);
  if (!currencies.includes("USD")) {
    currencies.unshift("USD");
  }
  return [...new Set(currencies)];
});
var NON_USD_CURRENCIES = SupportedCurrency.options.filter((c) => c !== "USD");
// src/utils/schemas/EnrichedHoldersData.ts
var import_zod3 = require("zod");
var HolderSchema = import_zod3.z.object({
  address: import_zod3.z.string(),
  balanceRaw: BigIntLax_default,
  nativeBalanceRaw: BigIntLax_default,
  balance: import_zod3.z.coerce.number(),
  nativeBalance: import_zod3.z.coerce.number(),
  balanceUSD: import_zod3.z.coerce.number(),
  boughtAmountRaw: BigIntLax_default,
  boughtAmount: import_zod3.z.coerce.number(),
  boughtAmountUSD: import_zod3.z.coerce.number(),
  soldAmount: import_zod3.z.coerce.number(),
  soldAmountRaw: BigIntLax_default,
  soldAmountUSD: import_zod3.z.coerce.number(),
  realizedPnlUSD: import_zod3.z.coerce.number(),
  unrealizedPnlUSD: import_zod3.z.coerce.number(),
  tags: import_zod3.z.string().array(),
  createdAt: import_zod3.z.coerce.date().nullable(),
  updatedAt: import_zod3.z.coerce.date().nullable()
});
var HoldersStatsSchema = import_zod3.z.object({
  holdersCount: import_zod3.z.coerce.number().nullable().optional(),
  top10HoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  top50HoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  top100HoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  top200HoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  devHoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  insidersHoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  bundlersHoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  snipersHoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  proTradersHoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  freshTradersHoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  smartTradersHoldingsPercentage: import_zod3.z.coerce.number().nullable().optional(),
  insidersCount: import_zod3.z.coerce.number().nullable().optional(),
  bundlersCount: import_zod3.z.coerce.number().nullable().optional(),
  snipersCount: import_zod3.z.coerce.number().nullable().optional(),
  freshTradersCount: import_zod3.z.coerce.number().nullable().optional(),
  proTradersCount: import_zod3.z.coerce.number().nullable().optional(),
  smartTradersCount: import_zod3.z.coerce.number().nullable().optional(),
  freshTradersBuys: import_zod3.z.coerce.number().nullable().optional(),
  proTradersBuys: import_zod3.z.coerce.number().nullable().optional(),
  smartTradersBuys: import_zod3.z.coerce.number().nullable().optional()
});
var HoldersStreamNewTokenPayload = HoldersStatsSchema.extend({
  holders: import_zod3.z.array(HolderSchema)
});
// src/utils/schemas/EnrichedMarketData.ts
var import_zod5 = require("zod");

// src/utils/schemas/SecuritySchemas.ts
var import_zod4 = require("zod");
var EVMSecurityFlagsSchema = import_zod4.z.object({
  buyTax: import_zod4.z.string().optional(),
  sellTax: import_zod4.z.string().optional(),
  transferPausable: import_zod4.z.boolean().optional(),
  top10Holders: import_zod4.z.string().optional(),
  isBlacklisted: import_zod4.z.boolean().optional(),
  isHoneypot: import_zod4.z.boolean().optional(),
  isNotOpenSource: import_zod4.z.boolean().optional(),
  renounced: import_zod4.z.boolean().optional(),
  locked: import_zod4.z.string().optional(),
  isWhitelisted: import_zod4.z.boolean().optional(),
  balanceMutable: import_zod4.z.boolean().optional(),
  lowLiquidity: import_zod4.z.string().optional(),
  burnRate: import_zod4.z.string().optional(),
  isMintable: import_zod4.z.boolean().optional(),
  modifyableTax: import_zod4.z.boolean().optional(),
  selfDestruct: import_zod4.z.boolean().optional()
});
var SolanaSecurityFlagsSchema = import_zod4.z.object({
  buyTax: import_zod4.z.string().optional(),
  sellTax: import_zod4.z.string().optional(),
  transferPausable: import_zod4.z.boolean().optional(),
  top10Holders: import_zod4.z.string().optional(),
  isBlacklisted: import_zod4.z.boolean().optional(),
  noMintAuthority: import_zod4.z.boolean().optional(),
  balanceMutable: import_zod4.z.boolean().optional(),
  lowLiquidity: import_zod4.z.string().optional(),
  burnRate: import_zod4.z.string().optional()
});
var SecurityFlagsSchema = SolanaSecurityFlagsSchema.merge(EVMSecurityFlagsSchema);

// src/utils/schemas/EnrichedMarketData.ts
var TokenTypeValues = ["2020", "2022"];
var TokenTypeSchema = import_zod5.z.enum(TokenTypeValues).nullable().optional();
var keysToRemovePoolToPulse = {
  token0: true,
  token1: true,
  volume24h: true,
  blockchain: true,
  address: true,
  createdAt: true,
  type: true,
  baseToken: true,
  exchange: true,
  factory: true,
  quoteToken: true,
  priceToken: true,
  priceTokenString: true,
  athToken0: true,
  athToken1: true,
  atlToken0: true,
  atlToken1: true,
  athDateToken0: true,
  athDateToken1: true,
  atlDateToken0: true,
  atlDateToken1: true
};
var TOKEN_METADATA_KEYS = [
  "twitter",
  "telegram",
  "website",
  "others",
  "security",
  "logo",
  "twitterRenameCount",
  "twitterRenameHistory",
  "dexscreenerListed",
  "dexscreenerHeader",
  "dexscreenerAdPaid",
  "liveStatus",
  "liveThumbnail",
  "livestreamTitle",
  "liveReplyCount",
  "deployer",
  "bonded_at",
  "description"
];
var TokenData = import_zod5.z.object({
  address: import_zod5.z.string(),
  chainId: import_zod5.z.string(),
  symbol: import_zod5.z.string().nullable(),
  name: import_zod5.z.string().nullable(),
  decimals: import_zod5.z.coerce.number().default(0),
  id: import_zod5.z.number().nullable().optional().default(null),
  price: import_zod5.z.coerce.number().default(0),
  priceToken: import_zod5.z.coerce.number().default(0),
  priceTokenString: import_zod5.z.string(),
  approximateReserveUSD: import_zod5.z.coerce.number().default(0),
  approximateReserveTokenRaw: import_zod5.z.string(),
  approximateReserveToken: import_zod5.z.coerce.number().default(0),
  totalSupply: import_zod5.z.coerce.number().default(0),
  circulatingSupply: import_zod5.z.coerce.number().default(0),
  marketCap: import_zod5.z.coerce.number().optional().default(0),
  marketCapDiluted: import_zod5.z.coerce.number().optional().default(0),
  logo: import_zod5.z.string().nullable(),
  exchange: import_zod5.z.object({
    name: import_zod5.z.string(),
    logo: import_zod5.z.string()
  }).optional(),
  factory: import_zod5.z.string().nullable().optional(),
  source: import_zod5.z.string().nullable().optional(),
  sourceFactory: import_zod5.z.string().nullable().optional(),
  liquidity: import_zod5.z.coerce.number().optional(),
  liquidityMax: import_zod5.z.coerce.number().optional(),
  bonded: import_zod5.z.boolean().optional(),
  bondingPercentage: import_zod5.z.coerce.number().optional(),
  bondingCurveAddress: import_zod5.z.string().nullable().optional(),
  preBondingFactory: import_zod5.z.string().optional(),
  poolAddress: import_zod5.z.string().optional(),
  blockchain: import_zod5.z.string().optional(),
  type: import_zod5.z.string().optional(),
  tokenType: TokenTypeSchema,
  deployer: import_zod5.z.string().nullable().optional(),
  createdAt: import_zod5.z.string().optional(),
  bonded_at: import_zod5.z.coerce.date().nullable(),
  ath: import_zod5.z.coerce.number().optional(),
  atl: import_zod5.z.coerce.number().optional(),
  athDate: import_zod5.z.coerce.date().optional(),
  atlDate: import_zod5.z.coerce.date().optional()
}).merge(HoldersStatsSchema);
var keysToKeepInPulseToken = new Set([
  "bonded_at"
]);
var allTokenDataKeys = extractAllZodKeys(TokenData);
var keysToRemoveTokenToPulse = allTokenDataKeys.filter((key) => !keysToKeepInPulseToken.has(key)).reduce((acc, key) => {
  acc[key] = true;
  return acc;
}, {});
var PoolData = import_zod5.z.object({
  token0: TokenData,
  token1: TokenData,
  volume24h: import_zod5.z.coerce.number().default(0),
  liquidity: import_zod5.z.coerce.number().default(0),
  blockchain: import_zod5.z.string(),
  address: import_zod5.z.string(),
  createdAt: import_zod5.z.coerce.date().nullable(),
  type: import_zod5.z.string(),
  baseToken: import_zod5.z.string(),
  exchange: import_zod5.z.object({
    name: import_zod5.z.string(),
    logo: import_zod5.z.string()
  }),
  factory: import_zod5.z.string().nullable(),
  quoteToken: import_zod5.z.string(),
  price: import_zod5.z.coerce.number().optional(),
  priceToken: import_zod5.z.coerce.number().optional(),
  priceTokenString: import_zod5.z.string().optional(),
  athToken0: import_zod5.z.coerce.number().default(0),
  athToken1: import_zod5.z.coerce.number().default(0),
  atlToken0: import_zod5.z.coerce.number().default(0),
  atlToken1: import_zod5.z.coerce.number().default(0),
  athDateToken0: import_zod5.z.coerce.date().optional(),
  athDateToken1: import_zod5.z.coerce.date().optional(),
  atlDateToken0: import_zod5.z.coerce.date().optional(),
  atlDateToken1: import_zod5.z.coerce.date().optional(),
  bonded: import_zod5.z.coerce.boolean(),
  bondingPercentage: import_zod5.z.coerce.number().nullable(),
  bondingCurveAddress: import_zod5.z.string().nullable(),
  sourceFactory: import_zod5.z.string().nullable().optional(),
  totalFeesPaidUSD: import_zod5.z.coerce.number().optional(),
  totalFeesPaidNativeRaw: import_zod5.z.coerce.bigint().default(0n),
  extraData: import_zod5.z.record(import_zod5.z.any()).optional()
});
var poolDataKeys = extractAllZodKeys(PoolData);
var tokenDataKeys = extractAllZodKeys(TokenData);
var PoolStatsSchema = import_zod5.z.object({
  price_change_1min: import_zod5.z.coerce.number().default(0),
  price_change_5min: import_zod5.z.coerce.number().default(0),
  price_change_1h: import_zod5.z.coerce.number().default(0),
  price_change_4h: import_zod5.z.coerce.number().default(0),
  price_change_6h: import_zod5.z.coerce.number().default(0),
  price_change_12h: import_zod5.z.coerce.number().default(0),
  price_change_24h: import_zod5.z.coerce.number().default(0),
  price_1min_ago: import_zod5.z.coerce.number().default(0),
  price_5min_ago: import_zod5.z.coerce.number().default(0),
  price_1h_ago: import_zod5.z.coerce.number().default(0),
  price_4h_ago: import_zod5.z.coerce.number().default(0),
  price_6h_ago: import_zod5.z.coerce.number().default(0),
  price_12h_ago: import_zod5.z.coerce.number().default(0),
  price_24h_ago: import_zod5.z.coerce.number().default(0),
  volume_1min: import_zod5.z.coerce.number().default(0),
  volume_5min: import_zod5.z.coerce.number().default(0),
  volume_15min: import_zod5.z.coerce.number().default(0),
  volume_1h: import_zod5.z.coerce.number().default(0),
  volume_4h: import_zod5.z.coerce.number().default(0),
  volume_6h: import_zod5.z.coerce.number().default(0),
  volume_12h: import_zod5.z.coerce.number().default(0),
  volume_24h: import_zod5.z.coerce.number().default(0),
  volume_buy_1min: import_zod5.z.coerce.number().default(0),
  volume_buy_5min: import_zod5.z.coerce.number().default(0),
  volume_buy_15min: import_zod5.z.coerce.number().default(0),
  volume_buy_1h: import_zod5.z.coerce.number().default(0),
  volume_buy_4h: import_zod5.z.coerce.number().default(0),
  volume_buy_6h: import_zod5.z.coerce.number().default(0),
  volume_buy_12h: import_zod5.z.coerce.number().default(0),
  volume_buy_24h: import_zod5.z.coerce.number().default(0),
  volume_sell_1min: import_zod5.z.coerce.number().default(0),
  volume_sell_5min: import_zod5.z.coerce.number().default(0),
  volume_sell_15min: import_zod5.z.coerce.number().default(0),
  volume_sell_1h: import_zod5.z.coerce.number().default(0),
  volume_sell_4h: import_zod5.z.coerce.number().default(0),
  volume_sell_6h: import_zod5.z.coerce.number().default(0),
  volume_sell_12h: import_zod5.z.coerce.number().default(0),
  volume_sell_24h: import_zod5.z.coerce.number().default(0),
  trades_1min: import_zod5.z.coerce.number().default(0),
  trades_5min: import_zod5.z.coerce.number().default(0),
  trades_15min: import_zod5.z.coerce.number().default(0),
  trades_1h: import_zod5.z.coerce.number().default(0),
  trades_4h: import_zod5.z.coerce.number().default(0),
  trades_6h: import_zod5.z.coerce.number().default(0),
  trades_12h: import_zod5.z.coerce.number().default(0),
  trades_24h: import_zod5.z.coerce.number().default(0),
  buys_1min: import_zod5.z.coerce.number().default(0),
  buys_5min: import_zod5.z.coerce.number().default(0),
  buys_15min: import_zod5.z.coerce.number().default(0),
  buys_1h: import_zod5.z.coerce.number().default(0),
  buys_4h: import_zod5.z.coerce.number().default(0),
  buys_6h: import_zod5.z.coerce.number().default(0),
  buys_12h: import_zod5.z.coerce.number().default(0),
  buys_24h: import_zod5.z.coerce.number().default(0),
  sells_1min: import_zod5.z.coerce.number().default(0),
  sells_5min: import_zod5.z.coerce.number().default(0),
  sells_15min: import_zod5.z.coerce.number().default(0),
  sells_1h: import_zod5.z.coerce.number().default(0),
  sells_4h: import_zod5.z.coerce.number().default(0),
  sells_6h: import_zod5.z.coerce.number().default(0),
  sells_12h: import_zod5.z.coerce.number().default(0),
  sells_24h: import_zod5.z.coerce.number().default(0),
  buyers_1min: import_zod5.z.coerce.number().default(0),
  buyers_5min: import_zod5.z.coerce.number().default(0),
  buyers_15min: import_zod5.z.coerce.number().default(0),
  buyers_1h: import_zod5.z.coerce.number().default(0),
  buyers_4h: import_zod5.z.coerce.number().default(0),
  buyers_6h: import_zod5.z.coerce.number().default(0),
  buyers_12h: import_zod5.z.coerce.number().default(0),
  buyers_24h: import_zod5.z.coerce.number().default(0),
  sellers_1min: import_zod5.z.coerce.number().default(0),
  sellers_5min: import_zod5.z.coerce.number().default(0),
  sellers_15min: import_zod5.z.coerce.number().default(0),
  sellers_1h: import_zod5.z.coerce.number().default(0),
  sellers_4h: import_zod5.z.coerce.number().default(0),
  sellers_6h: import_zod5.z.coerce.number().default(0),
  sellers_12h: import_zod5.z.coerce.number().default(0),
  sellers_24h: import_zod5.z.coerce.number().default(0),
  traders_1min: import_zod5.z.coerce.number().default(0),
  traders_5min: import_zod5.z.coerce.number().default(0),
  traders_15min: import_zod5.z.coerce.number().default(0),
  traders_1h: import_zod5.z.coerce.number().default(0),
  traders_4h: import_zod5.z.coerce.number().default(0),
  traders_6h: import_zod5.z.coerce.number().default(0),
  traders_12h: import_zod5.z.coerce.number().default(0),
  traders_24h: import_zod5.z.coerce.number().default(0),
  fees_paid_1min: import_zod5.z.coerce.number().default(0),
  fees_paid_5min: import_zod5.z.coerce.number().default(0),
  fees_paid_15min: import_zod5.z.coerce.number().default(0),
  fees_paid_1h: import_zod5.z.coerce.number().default(0),
  fees_paid_4h: import_zod5.z.coerce.number().default(0),
  fees_paid_6h: import_zod5.z.coerce.number().default(0),
  fees_paid_12h: import_zod5.z.coerce.number().default(0),
  fees_paid_24h: import_zod5.z.coerce.number().default(0)
});
var EnrichedPoolDataSchema = PoolData.merge(PoolStatsSchema.merge(import_zod5.z.object({
  price: import_zod5.z.coerce.number().default(0),
  market_cap: import_zod5.z.coerce.number().default(0),
  created_at: import_zod5.z.coerce.date().nullable(),
  holders_count: import_zod5.z.coerce.number().default(0),
  latest_trade_date: import_zod5.z.coerce.date().nullable().default(null),
  latest_price: import_zod5.z.coerce.number().default(0),
  source: import_zod5.z.string().nullable(),
  deployer: import_zod5.z.string().nullable(),
  tokenSymbol: import_zod5.z.string().nullable(),
  tokenName: import_zod5.z.string().nullable(),
  dexscreenerListed: import_zod5.z.coerce.boolean().nullable(),
  deployerMigrations: import_zod5.z.coerce.number().default(0),
  socials: import_zod5.z.object({
    twitter: import_zod5.z.string().nullable(),
    website: import_zod5.z.string().nullable(),
    telegram: import_zod5.z.string().nullable(),
    others: import_zod5.z.record(import_zod5.z.unknown()).nullable(),
    uri: import_zod5.z.string().optional()
  }),
  description: import_zod5.z.string().nullable(),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: import_zod5.z.coerce.number().default(0),
  twitterRenameCount: import_zod5.z.coerce.number().default(0),
  twitterRenameHistory: import_zod5.z.array(import_zod5.z.object({
    username: import_zod5.z.string(),
    last_checked: import_zod5.z.string()
  })).optional(),
  holders_list: import_zod5.z.array(HolderSchema),
  totalFeesPaidUSD: import_zod5.z.coerce.number().default(0),
  totalFeesPaidNativeRaw: import_zod5.z.coerce.bigint().default(0n)
})).merge(HoldersStatsSchema));
var PulseEnrichedPoolDataSchema = EnrichedPoolDataSchema;
var TokenStatsSchema = import_zod5.z.object({
  latest_trade_date: import_zod5.z.coerce.date().nullable(),
  price_change_1min: import_zod5.z.coerce.number().default(0),
  price_change_5min: import_zod5.z.coerce.number().default(0),
  price_change_1h: import_zod5.z.coerce.number().default(0),
  price_change_4h: import_zod5.z.coerce.number().default(0),
  price_change_6h: import_zod5.z.coerce.number().default(0),
  price_change_12h: import_zod5.z.coerce.number().default(0),
  price_change_24h: import_zod5.z.coerce.number().default(0),
  price_1min_ago: import_zod5.z.coerce.number().default(0),
  price_5min_ago: import_zod5.z.coerce.number().default(0),
  price_1h_ago: import_zod5.z.coerce.number().default(0),
  price_4h_ago: import_zod5.z.coerce.number().default(0),
  price_6h_ago: import_zod5.z.coerce.number().default(0),
  price_12h_ago: import_zod5.z.coerce.number().default(0),
  price_24h_ago: import_zod5.z.coerce.number().default(0),
  volume_1min: import_zod5.z.coerce.number().default(0),
  volume_5min: import_zod5.z.coerce.number().default(0),
  volume_15min: import_zod5.z.coerce.number().default(0),
  volume_1h: import_zod5.z.coerce.number().default(0),
  volume_4h: import_zod5.z.coerce.number().default(0),
  volume_6h: import_zod5.z.coerce.number().default(0),
  volume_12h: import_zod5.z.coerce.number().default(0),
  volume_24h: import_zod5.z.coerce.number().default(0),
  volume_buy_1min: import_zod5.z.coerce.number().default(0),
  volume_buy_5min: import_zod5.z.coerce.number().default(0),
  volume_buy_15min: import_zod5.z.coerce.number().default(0),
  volume_buy_1h: import_zod5.z.coerce.number().default(0),
  volume_buy_4h: import_zod5.z.coerce.number().default(0),
  volume_buy_6h: import_zod5.z.coerce.number().default(0),
  volume_buy_12h: import_zod5.z.coerce.number().default(0),
  volume_buy_24h: import_zod5.z.coerce.number().default(0),
  volume_sell_1min: import_zod5.z.coerce.number().default(0),
  volume_sell_5min: import_zod5.z.coerce.number().default(0),
  volume_sell_15min: import_zod5.z.coerce.number().default(0),
  volume_sell_1h: import_zod5.z.coerce.number().default(0),
  volume_sell_4h: import_zod5.z.coerce.number().default(0),
  volume_sell_6h: import_zod5.z.coerce.number().default(0),
  volume_sell_12h: import_zod5.z.coerce.number().default(0),
  volume_sell_24h: import_zod5.z.coerce.number().default(0),
  trades_1min: import_zod5.z.coerce.number().default(0),
  trades_5min: import_zod5.z.coerce.number().default(0),
  trades_15min: import_zod5.z.coerce.number().default(0),
  trades_1h: import_zod5.z.coerce.number().default(0),
  trades_4h: import_zod5.z.coerce.number().default(0),
  trades_6h: import_zod5.z.coerce.number().default(0),
  trades_12h: import_zod5.z.coerce.number().default(0),
  trades_24h: import_zod5.z.coerce.number().default(0),
  buys_1min: import_zod5.z.coerce.number().default(0),
  buys_5min: import_zod5.z.coerce.number().default(0),
  buys_15min: import_zod5.z.coerce.number().default(0),
  buys_1h: import_zod5.z.coerce.number().default(0),
  buys_4h: import_zod5.z.coerce.number().default(0),
  buys_6h: import_zod5.z.coerce.number().default(0),
  buys_12h: import_zod5.z.coerce.number().default(0),
  buys_24h: import_zod5.z.coerce.number().default(0),
  sells_1min: import_zod5.z.coerce.number().default(0),
  sells_5min: import_zod5.z.coerce.number().default(0),
  sells_15min: import_zod5.z.coerce.number().default(0),
  sells_1h: import_zod5.z.coerce.number().default(0),
  sells_4h: import_zod5.z.coerce.number().default(0),
  sells_6h: import_zod5.z.coerce.number().default(0),
  sells_12h: import_zod5.z.coerce.number().default(0),
  sells_24h: import_zod5.z.coerce.number().default(0),
  buyers_1min: import_zod5.z.coerce.number().default(0),
  buyers_5min: import_zod5.z.coerce.number().default(0),
  buyers_15min: import_zod5.z.coerce.number().default(0),
  buyers_1h: import_zod5.z.coerce.number().default(0),
  buyers_4h: import_zod5.z.coerce.number().default(0),
  buyers_6h: import_zod5.z.coerce.number().default(0),
  buyers_12h: import_zod5.z.coerce.number().default(0),
  buyers_24h: import_zod5.z.coerce.number().default(0),
  sellers_1min: import_zod5.z.coerce.number().default(0),
  sellers_5min: import_zod5.z.coerce.number().default(0),
  sellers_15min: import_zod5.z.coerce.number().default(0),
  sellers_1h: import_zod5.z.coerce.number().default(0),
  sellers_4h: import_zod5.z.coerce.number().default(0),
  sellers_6h: import_zod5.z.coerce.number().default(0),
  sellers_12h: import_zod5.z.coerce.number().default(0),
  sellers_24h: import_zod5.z.coerce.number().default(0),
  traders_1min: import_zod5.z.coerce.number().default(0),
  traders_5min: import_zod5.z.coerce.number().default(0),
  traders_15min: import_zod5.z.coerce.number().default(0),
  traders_1h: import_zod5.z.coerce.number().default(0),
  traders_4h: import_zod5.z.coerce.number().default(0),
  traders_6h: import_zod5.z.coerce.number().default(0),
  traders_12h: import_zod5.z.coerce.number().default(0),
  traders_24h: import_zod5.z.coerce.number().default(0),
  fees_paid_1min: import_zod5.z.coerce.number().default(0),
  fees_paid_5min: import_zod5.z.coerce.number().default(0),
  fees_paid_15min: import_zod5.z.coerce.number().default(0),
  fees_paid_1h: import_zod5.z.coerce.number().default(0),
  fees_paid_4h: import_zod5.z.coerce.number().default(0),
  fees_paid_6h: import_zod5.z.coerce.number().default(0),
  fees_paid_12h: import_zod5.z.coerce.number().default(0),
  fees_paid_24h: import_zod5.z.coerce.number().default(0),
  totalFeesPaidUSD: import_zod5.z.coerce.number().default(0),
  totalFeesPaidNativeRaw: import_zod5.z.coerce.bigint().default(0n),
  organic_trades_1min: import_zod5.z.coerce.number().default(0),
  organic_trades_5min: import_zod5.z.coerce.number().default(0),
  organic_trades_15min: import_zod5.z.coerce.number().default(0),
  organic_trades_1h: import_zod5.z.coerce.number().default(0),
  organic_trades_4h: import_zod5.z.coerce.number().default(0),
  organic_trades_6h: import_zod5.z.coerce.number().default(0),
  organic_trades_12h: import_zod5.z.coerce.number().default(0),
  organic_trades_24h: import_zod5.z.coerce.number().default(0),
  organic_traders_1min: import_zod5.z.coerce.number().default(0),
  organic_traders_5min: import_zod5.z.coerce.number().default(0),
  organic_traders_15min: import_zod5.z.coerce.number().default(0),
  organic_traders_1h: import_zod5.z.coerce.number().default(0),
  organic_traders_4h: import_zod5.z.coerce.number().default(0),
  organic_traders_6h: import_zod5.z.coerce.number().default(0),
  organic_traders_12h: import_zod5.z.coerce.number().default(0),
  organic_traders_24h: import_zod5.z.coerce.number().default(0),
  organic_volume_1min: import_zod5.z.coerce.number().default(0),
  organic_volume_5min: import_zod5.z.coerce.number().default(0),
  organic_volume_15min: import_zod5.z.coerce.number().default(0),
  organic_volume_1h: import_zod5.z.coerce.number().default(0),
  organic_volume_4h: import_zod5.z.coerce.number().default(0),
  organic_volume_6h: import_zod5.z.coerce.number().default(0),
  organic_volume_12h: import_zod5.z.coerce.number().default(0),
  organic_volume_24h: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_1min: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_5min: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_15min: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_1h: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_4h: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_6h: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_12h: import_zod5.z.coerce.number().default(0),
  organic_volume_buy_24h: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_1min: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_5min: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_15min: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_1h: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_4h: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_6h: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_12h: import_zod5.z.coerce.number().default(0),
  organic_volume_sell_24h: import_zod5.z.coerce.number().default(0),
  organic_buys_1min: import_zod5.z.coerce.number().default(0),
  organic_buys_5min: import_zod5.z.coerce.number().default(0),
  organic_buys_15min: import_zod5.z.coerce.number().default(0),
  organic_buys_1h: import_zod5.z.coerce.number().default(0),
  organic_buys_4h: import_zod5.z.coerce.number().default(0),
  organic_buys_6h: import_zod5.z.coerce.number().default(0),
  organic_buys_12h: import_zod5.z.coerce.number().default(0),
  organic_buys_24h: import_zod5.z.coerce.number().default(0),
  organic_sells_1min: import_zod5.z.coerce.number().default(0),
  organic_sells_5min: import_zod5.z.coerce.number().default(0),
  organic_sells_15min: import_zod5.z.coerce.number().default(0),
  organic_sells_1h: import_zod5.z.coerce.number().default(0),
  organic_sells_4h: import_zod5.z.coerce.number().default(0),
  organic_sells_6h: import_zod5.z.coerce.number().default(0),
  organic_sells_12h: import_zod5.z.coerce.number().default(0),
  organic_sells_24h: import_zod5.z.coerce.number().default(0),
  organic_buyers_1min: import_zod5.z.coerce.number().default(0),
  organic_buyers_5min: import_zod5.z.coerce.number().default(0),
  organic_buyers_15min: import_zod5.z.coerce.number().default(0),
  organic_buyers_1h: import_zod5.z.coerce.number().default(0),
  organic_buyers_4h: import_zod5.z.coerce.number().default(0),
  organic_buyers_6h: import_zod5.z.coerce.number().default(0),
  organic_buyers_12h: import_zod5.z.coerce.number().default(0),
  organic_buyers_24h: import_zod5.z.coerce.number().default(0),
  organic_sellers_1min: import_zod5.z.coerce.number().default(0),
  organic_sellers_5min: import_zod5.z.coerce.number().default(0),
  organic_sellers_15min: import_zod5.z.coerce.number().default(0),
  organic_sellers_1h: import_zod5.z.coerce.number().default(0),
  organic_sellers_4h: import_zod5.z.coerce.number().default(0),
  organic_sellers_6h: import_zod5.z.coerce.number().default(0),
  organic_sellers_12h: import_zod5.z.coerce.number().default(0),
  organic_sellers_24h: import_zod5.z.coerce.number().default(0)
});
var EnrichedTokenDataSchema = TokenData.merge(TokenStatsSchema.merge(import_zod5.z.object({
  created_at: import_zod5.z.coerce.date().nullable(),
  latest_price: import_zod5.z.coerce.number().default(0),
  holders_count: import_zod5.z.coerce.number().default(0),
  market_cap: import_zod5.z.coerce.number().default(0),
  latest_market_cap: import_zod5.z.coerce.number().default(0),
  description: import_zod5.z.string().nullable(),
  socials: import_zod5.z.object({
    twitter: import_zod5.z.string().nullable(),
    website: import_zod5.z.string().nullable(),
    telegram: import_zod5.z.string().nullable(),
    others: import_zod5.z.record(import_zod5.z.unknown()).nullable(),
    uri: import_zod5.z.string().optional()
  }),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: import_zod5.z.coerce.number().nullable().default(0),
  twitterRenameCount: import_zod5.z.coerce.number().default(0),
  twitterRenameHistory: import_zod5.z.array(import_zod5.z.object({
    username: import_zod5.z.string(),
    last_checked: import_zod5.z.string()
  })).optional(),
  deployerMigrationsCount: import_zod5.z.coerce.number().default(0),
  dexscreenerListed: import_zod5.z.boolean().nullable().default(false),
  dexscreenerHeader: import_zod5.z.string().nullable().default(null),
  dexscreenerAdPaid: import_zod5.z.boolean().nullable().default(false),
  liveStatus: import_zod5.z.string().nullable(),
  liveThumbnail: import_zod5.z.string().nullable(),
  livestreamTitle: import_zod5.z.string().nullable(),
  liveReplyCount: import_zod5.z.number().nullable(),
  holders_list: import_zod5.z.array(HolderSchema)
}))).merge(HoldersStatsSchema);
var PulseEnrichedTokenDataSchema = EnrichedTokenDataSchema;
// src/utils/schemas/LLMSecuritySchemas.ts
var import_zod6 = require("zod");
var LLMSecurityFlagsSchema = import_zod6.z.object({
  balanceMutable: import_zod6.z.boolean().optional(),
  balanceMutableReason: import_zod6.z.string().optional(),
  isMintable: import_zod6.z.boolean().optional(),
  isMintableReason: import_zod6.z.string().optional(),
  transferPausable: import_zod6.z.boolean().optional(),
  transferPausableReason: import_zod6.z.string().optional(),
  isBlacklisted: import_zod6.z.boolean().optional(),
  isBlacklistedReason: import_zod6.z.string().optional(),
  isWhitelisted: import_zod6.z.boolean().optional(),
  isWhitelistedReason: import_zod6.z.string().optional(),
  modifyableTax: import_zod6.z.boolean().optional(),
  modifyableTaxReason: import_zod6.z.string().optional(),
  hasHiddenOwner: import_zod6.z.boolean().optional(),
  hasHiddenOwnerReason: import_zod6.z.string().optional(),
  canTakeBackOwnership: import_zod6.z.boolean().optional(),
  canTakeBackOwnershipReason: import_zod6.z.string().optional(),
  selfDestruct: import_zod6.z.boolean().optional(),
  selfDestructReason: import_zod6.z.string().optional(),
  hasHoneypotMechanism: import_zod6.z.boolean().optional(),
  honeypotReason: import_zod6.z.string().optional(),
  hasExternalCallRisk: import_zod6.z.boolean().optional(),
  externalCallRiskReason: import_zod6.z.string().optional(),
  analyzedAt: import_zod6.z.string(),
  contractVerified: import_zod6.z.boolean(),
  analysisConfidence: import_zod6.z.enum(["high", "medium", "low"]),
  rawAnalysis: import_zod6.z.string().optional(),
  updatedAt: import_zod6.z.string().optional()
});
var SecuritySourcesSchema = import_zod6.z.object({
  goplus: import_zod6.z.object({
    data: import_zod6.z.record(import_zod6.z.unknown()).optional(),
    updatedAt: import_zod6.z.string().optional()
  }).optional(),
  llm_analysis: LLMSecurityFlagsSchema.optional()
});
// src/v1/all/AllAssetSchema.ts
var import_zod7 = require("zod");
var AllAssetsParamsSchema = import_zod7.z.object({
  fields: import_zod7.z.string().optional().default("")
});
var AllAssetsResponseSchema = import_zod7.z.object({
  data: import_zod7.z.array(import_zod7.z.object({
    id: import_zod7.z.number(),
    name: import_zod7.z.string(),
    symbol: import_zod7.z.string(),
    logo: import_zod7.z.string().nullable().optional(),
    price: import_zod7.z.number().nullable().optional(),
    price_change_1h: import_zod7.z.number().optional(),
    price_change_24h: import_zod7.z.number().optional(),
    price_change_7d: import_zod7.z.number().optional(),
    price_change_1m: import_zod7.z.number().optional(),
    price_change_1y: import_zod7.z.number().optional(),
    market_cap: import_zod7.z.number().optional(),
    liquidity: import_zod7.z.number().optional(),
    volume: import_zod7.z.number().optional(),
    blockchains: import_zod7.z.array(import_zod7.z.string()).optional(),
    contracts: import_zod7.z.array(import_zod7.z.string()).optional(),
    decimals: import_zod7.z.array(import_zod7.z.number()).optional(),
    website: import_zod7.z.string().nullish().optional(),
    twitter: import_zod7.z.string().nullish().optional(),
    chat: import_zod7.z.string().nullish().optional()
  }))
});
// src/v1/all/BlockchainSchema.ts
var import_zod8 = require("zod");
var TokenSchema = import_zod8.z.object({
  name: import_zod8.z.string(),
  symbol: import_zod8.z.string(),
  address: import_zod8.z.string(),
  type: import_zod8.z.enum(["eth", "stable", "other"]),
  decimals: import_zod8.z.number(),
  denom: import_zod8.z.string().optional()
});
var ExtendedTokenSchema = TokenSchema.extend({
  logo: import_zod8.z.string(),
  blockchain: import_zod8.z.string(),
  blockchains: import_zod8.z.array(import_zod8.z.string()),
  contracts: import_zod8.z.array(import_zod8.z.string())
});
var BlockchainsResponseSchema = import_zod8.z.object({
  data: import_zod8.z.array(import_zod8.z.object({
    name: import_zod8.z.string(),
    shortName: import_zod8.z.string().optional(),
    explorer: import_zod8.z.string(),
    color: import_zod8.z.string(),
    chainId: import_zod8.z.string(),
    evmChainId: import_zod8.z.number().optional(),
    cosmosChainId: import_zod8.z.string().optional(),
    testnet: import_zod8.z.boolean().optional(),
    multicall_contract: import_zod8.z.string().optional(),
    uniswapV3Factory: import_zod8.z.array(import_zod8.z.string()).optional(),
    eth: TokenSchema.extend({
      logo: import_zod8.z.string(),
      id: import_zod8.z.number().optional()
    }).optional(),
    stable: ExtendedTokenSchema.optional(),
    routers: import_zod8.z.array(import_zod8.z.object({
      address: import_zod8.z.string(),
      name: import_zod8.z.string(),
      factory: import_zod8.z.string().optional(),
      fee: import_zod8.z.number().optional()
    })),
    tokens: import_zod8.z.array(import_zod8.z.object({
      address: import_zod8.z.string(),
      name: import_zod8.z.string(),
      symbol: import_zod8.z.string().optional(),
      decimals: import_zod8.z.number().optional(),
      type: import_zod8.z.string().optional()
    })),
    supportedProtocols: import_zod8.z.array(import_zod8.z.string()),
    logo: import_zod8.z.string(),
    coingeckoChain: import_zod8.z.string().optional(),
    dexscreenerChain: import_zod8.z.string().optional(),
    isLayer2: import_zod8.z.boolean().optional(),
    coverage: import_zod8.z.array(import_zod8.z.string().optional()).optional()
  }))
});
// src/v1/market/CreateFeedSchema.ts
var import_zod9 = require("zod");
var createFeedQuery = import_zod9.z.object({
  quoteId: import_zod9.z.coerce.number().optional(),
  assetId: import_zod9.z.coerce.number()
});
// src/v1/market/FundingRateSchema.ts
var import_zod10 = require("zod");
var FundingRateParamsSchema = import_zod10.z.object({
  symbol: import_zod10.z.string(),
  quote: import_zod10.z.string().optional(),
  exchange: import_zod10.z.string().optional().refine((val) => !val || /^[a-zA-Z0-9,-]+$/.test(val), 'Exchange must be a comma-separated string (e.g., "binance,bybit")')
});
var FundingRateResponseSchema = import_zod10.z.object({
  binanceFundingRate: import_zod10.z.object({
    symbol: import_zod10.z.string(),
    fundingTime: import_zod10.z.number(),
    fundingRate: import_zod10.z.number(),
    marketPrice: import_zod10.z.string(),
    epochDurationMs: import_zod10.z.number()
  }).optional(),
  deribitFundingRate: import_zod10.z.object({
    symbol: import_zod10.z.string(),
    fundingTime: import_zod10.z.number(),
    fundingRate: import_zod10.z.number(),
    marketPrice: import_zod10.z.number(),
    epochDurationMs: import_zod10.z.number()
  }).optional(),
  bybitFundingRate: import_zod10.z.object({
    symbol: import_zod10.z.string(),
    fundingTime: import_zod10.z.number(),
    fundingRate: import_zod10.z.number(),
    epochDurationMs: import_zod10.z.number()
  }).optional(),
  okxFundingRate: import_zod10.z.object({
    symbol: import_zod10.z.string(),
    fundingTime: import_zod10.z.number(),
    fundingRate: import_zod10.z.number(),
    epochDurationMs: import_zod10.z.number()
  }).optional(),
  hyperliquidFundingRate: import_zod10.z.union([
    import_zod10.z.object({
      symbol: import_zod10.z.string(),
      fundingTime: import_zod10.z.number(),
      fundingRate: import_zod10.z.number(),
      epochDurationMs: import_zod10.z.number()
    }),
    import_zod10.z.array(import_zod10.z.object({
      symbol: import_zod10.z.string(),
      fundingTime: import_zod10.z.number(),
      fundingRate: import_zod10.z.number(),
      marketPrice: import_zod10.z.number().nullable().optional(),
      epochDurationMs: import_zod10.z.number()
    }))
  ]).optional(),
  gateFundingRate: import_zod10.z.object({
    symbol: import_zod10.z.string(),
    fundingTime: import_zod10.z.number(),
    fundingRate: import_zod10.z.number(),
    epochDurationMs: import_zod10.z.number()
  }).optional(),
  queryDetails: import_zod10.z.object({
    base: import_zod10.z.string(),
    quote: import_zod10.z.string().nullable()
  })
});
// src/v1/market/HoldersSchema.ts
var import_zod11 = require("zod");
var MarketTokenHoldersParamsSchema = import_zod11.z.object({
  blockchain: import_zod11.z.string().optional(),
  asset: import_zod11.z.string().optional(),
  symbol: import_zod11.z.string().optional(),
  limit: import_zod11.z.coerce.number().max(100).optional().default(20),
  offset: import_zod11.z.coerce.number().optional().default(0),
  backfill: import_zod11.z.union([import_zod11.z.boolean(), import_zod11.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val),
  includeZeroBalance: import_zod11.z.union([import_zod11.z.boolean(), import_zod11.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
}).transform(({ blockchain, asset, symbol, limit, offset, backfill, includeZeroBalance }) => ({
  blockchain,
  asset: asset || symbol ? { name: asset, symbol } : undefined,
  limit,
  offset,
  backfill,
  includeZeroBalance
}));
var MarketTokenHoldersResponseSchema = import_zod11.z.object({
  data: import_zod11.z.array(import_zod11.z.object({
    address: import_zod11.z.string(),
    tag: import_zod11.z.string(),
    amountRaw: import_zod11.z.string(),
    amount: import_zod11.z.number(),
    chainId: import_zod11.z.string(),
    totalSupplyShare: import_zod11.z.number(),
    amountUSD: import_zod11.z.number()
  })),
  total_count: import_zod11.z.number()
});
// src/v1/market/MarketBlockchainPairsSchema.ts
var import_zod12 = require("zod");
var dateFields = ["latest_trade_date", "created_at"];
var nonNumericPoolValues = ["type", "explicit"];
var nonNumericValues = ["source", "deployer"];
var MarketBlockchainPairsParamsSchema = import_zod12.z.object({
  blockchain: import_zod12.z.string().optional(),
  blockchains: import_zod12.z.string().optional(),
  sortBy: import_zod12.z.string().optional().default("latest_trade_date"),
  sortOrder: import_zod12.z.enum(["asc", "desc"]).optional().default("desc"),
  factory: import_zod12.z.string().optional(),
  limit: import_zod12.z.coerce.number().max(100).optional().default(100),
  offset: import_zod12.z.coerce.number().optional().default(0),
  advancedFilters: import_zod12.z.string().optional().transform((val) => {
    return JSON.parse(val ?? "{}");
  }),
  filters: import_zod12.z.string().optional().transform((val) => {
    return val ? val.split(",") : [];
  }).transform((filters) => {
    const whereClause = {};
    for (const filter of filters) {
      if (filter.includes(":")) {
        const [field, filterMinValue, filterMaxValue] = filter.split(":");
        if (field && nonNumericPoolValues.includes(field)) {
          if (!whereClause.pools) {
            whereClause.pools = {};
          }
          whereClause.pools[field] = {
            equals: filterMinValue === "false" ? false : filterMinValue === "true" ? true : filterMinValue
          };
        } else if (field && nonNumericValues.includes(field)) {
          whereClause[field] = {
            equals: filterMinValue
          };
        } else if (field && dateFields.includes(field)) {
          whereClause[field] = {
            gte: filterMinValue ? new Date(Number.isNaN(Number(filterMinValue)) ? filterMinValue : Number(filterMinValue)) : undefined,
            lte: filterMaxValue ? new Date(Number.isNaN(Number(filterMaxValue)) ? filterMaxValue : Number(filterMaxValue)) : undefined
          };
        } else if (field) {
          whereClause[field] = {
            gte: filterMinValue ? Number(filterMinValue) : undefined,
            lte: filterMaxValue ? Number(filterMaxValue) : undefined
          };
        }
      }
    }
    return whereClause;
  }),
  excludeBonded: import_zod12.z.coerce.boolean().optional().default(false)
});
var MarketBlockchainPairsResponseSchema = import_zod12.z.object({
  data: import_zod12.z.array(import_zod12.z.object({
    price: import_zod12.z.number(),
    price_change_5min: import_zod12.z.number(),
    price_change_1h: import_zod12.z.number(),
    price_change_4h: import_zod12.z.number(),
    price_change_6h: import_zod12.z.number(),
    price_change_12h: import_zod12.z.number(),
    price_change_24h: import_zod12.z.number(),
    last_trade: import_zod12.z.date().nullable(),
    created_at: import_zod12.z.date().nullable(),
    holders_count: import_zod12.z.number(),
    volume_1min: import_zod12.z.number(),
    volume_5min: import_zod12.z.number(),
    volume_15min: import_zod12.z.number(),
    volume_1h: import_zod12.z.number(),
    volume_4h: import_zod12.z.number(),
    volume_6h: import_zod12.z.number(),
    volume_12h: import_zod12.z.number(),
    volume_24h: import_zod12.z.number(),
    trades_1min: import_zod12.z.number(),
    trades_5min: import_zod12.z.number(),
    trades_15min: import_zod12.z.number(),
    trades_1h: import_zod12.z.number(),
    trades_4h: import_zod12.z.number(),
    trades_6h: import_zod12.z.number(),
    trades_12h: import_zod12.z.number(),
    trades_24h: import_zod12.z.number(),
    liquidity: import_zod12.z.number(),
    pair: PoolData,
    source: import_zod12.z.string().nullable(),
    deployer: import_zod12.z.string().nullable()
  })),
  factories: import_zod12.z.record(import_zod12.z.string(), import_zod12.z.any())
});
// src/v1/market/MarketBlockchainStatsSchema.ts
var import_zod13 = require("zod");
var MarketBlockchainStatsParamsSchema = import_zod13.z.object({
  blockchain: import_zod13.z.string(),
  factory: import_zod13.z.string().optional()
});
var MarketBlockchainStatsResponseSchema = import_zod13.z.object({
  data: import_zod13.z.object({
    volume_history: import_zod13.z.array(import_zod13.z.array(import_zod13.z.number())),
    volume_change_24h: import_zod13.z.number(),
    volume_change_total: import_zod13.z.number().nullable(),
    liquidity_history: import_zod13.z.array(import_zod13.z.array(import_zod13.z.number())),
    liquidity_change_24h: import_zod13.z.number(),
    liquidity_change_total: import_zod13.z.number().nullable(),
    tokens_history: import_zod13.z.array(import_zod13.z.array(import_zod13.z.number())),
    tokens_change_24h: import_zod13.z.number(),
    tokens_change_total: import_zod13.z.number().nullable()
  })
});
// src/v1/market/MarketDataSchema.ts
var import_zod14 = require("zod");
var AssetQuery = import_zod14.z.object({
  blockchain: import_zod14.z.string().optional(),
  asset: import_zod14.z.string().optional(),
  symbol: import_zod14.z.string().optional(),
  id: import_zod14.z.coerce.number().optional(),
  shouldFetchPriceChange: import_zod14.z.union([import_zod14.z.literal("24h"), import_zod14.z.coerce.boolean()]).optional().default("24h")
}).refine((data) => {
  return !!(data.id || data.asset || data.symbol);
}, {
  message: "At least one of id, asset, or symbol must be provided."
});
var Asset = import_zod14.z.object({
  id: import_zod14.z.number().nullable(),
  name: import_zod14.z.string(),
  symbol: import_zod14.z.string(),
  decimals: import_zod14.z.number().nullable(),
  logo: import_zod14.z.string().nullable(),
  rank: import_zod14.z.number().nullable(),
  price: import_zod14.z.number().nullable(),
  market_cap: import_zod14.z.number(),
  market_cap_diluted: import_zod14.z.number(),
  volume: import_zod14.z.number().nullable(),
  volume_change_24h: import_zod14.z.number().nullable(),
  volume_7d: import_zod14.z.number().nullable(),
  liquidity: import_zod14.z.number(),
  liquidityMax: import_zod14.z.number(),
  ath: import_zod14.z.number().nullable(),
  atl: import_zod14.z.number().nullable(),
  off_chain_volume: import_zod14.z.number().nullable(),
  is_listed: import_zod14.z.boolean(),
  price_change_1h: import_zod14.z.number(),
  price_change_24h: import_zod14.z.number(),
  price_change_7d: import_zod14.z.number(),
  price_change_1m: import_zod14.z.number(),
  price_change_1y: import_zod14.z.number(),
  total_supply: import_zod14.z.number(),
  circulating_supply: import_zod14.z.number(),
  contracts: import_zod14.z.array(import_zod14.z.object({
    address: import_zod14.z.string(),
    blockchainId: import_zod14.z.string(),
    blockchain: import_zod14.z.string(),
    decimals: import_zod14.z.number()
  })),
  native: import_zod14.z.object({
    name: import_zod14.z.string(),
    symbol: import_zod14.z.string(),
    address: import_zod14.z.string(),
    type: import_zod14.z.string(),
    decimals: import_zod14.z.number(),
    logo: import_zod14.z.string()
  }).optional(),
  priceNative: import_zod14.z.number().optional()
});
var MarketDataResponseSchema = import_zod14.z.object({
  data: Asset
});
// src/v1/market/MarketHistoryPairSchema.ts
var import_zod16 = require("zod");

// src/utils/schemas/DateQuery.ts
var import_zod15 = require("zod");
var DateQuery = import_zod15.z.union([import_zod15.z.coerce.number().int().optional(), import_zod15.z.coerce.date().optional()]).transform((val) => {
  if (typeof val === "undefined") {
    return val;
  }
  if (typeof val === "number") {
    return new Date(val);
  }
  if (val instanceof Date) {
    return val;
  }
  throw new Error("Invalid date");
});
var DateQuery_default = DateQuery;

// src/v1/market/MarketHistoryPairSchema.ts
var MarketHistoryPairParamsSchema = import_zod16.z.object({
  blockchain: import_zod16.z.string().optional(),
  asset: import_zod16.z.string().optional(),
  symbol: import_zod16.z.string().optional(),
  address: import_zod16.z.string().optional(),
  baseToken: import_zod16.z.union([import_zod16.z.string(), import_zod16.z.array(import_zod16.z.string())]).optional(),
  from: DateQuery_default.transform((val) => val ?? 0),
  to: DateQuery_default.transform((val) => val ?? new Date),
  period: import_zod16.z.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return "5m";
  }),
  amount: import_zod16.z.coerce.number().optional(),
  usd: import_zod16.z.union([import_zod16.z.boolean(), import_zod16.z.string()]).optional().default(true).transform((val) => {
    if (typeof val === "boolean")
      return val;
    if (val === "false" || val === "0")
      return false;
    return true;
  }),
  mode: import_zod16.z.enum(["asset", "pool"]).optional().default("pool")
});
var MarketHistoryPairResponseSchema = import_zod16.z.object({
  data: import_zod16.z.array(import_zod16.z.object({
    volume: import_zod16.z.number(),
    open: import_zod16.z.number(),
    high: import_zod16.z.number(),
    low: import_zod16.z.number(),
    close: import_zod16.z.number(),
    time: import_zod16.z.number()
  }))
});
// src/v1/market/MarketHistorySchema.ts
var import_zod17 = require("zod");
var MarketHistoryParamsSchema = import_zod17.z.object({
  blockchain: import_zod17.z.string().optional(),
  asset: import_zod17.z.string().optional(),
  symbol: import_zod17.z.string().optional(),
  period: import_zod17.z.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return;
  }),
  id: import_zod17.z.coerce.number().optional(),
  from: import_zod17.z.coerce.number().default(0),
  to: import_zod17.z.coerce.number().default(Date.now)
});
var MarketHistoryResponseSchema = import_zod17.z.object({
  data: import_zod17.z.object({
    price_history: import_zod17.z.array(import_zod17.z.array(import_zod17.z.number().nullable())),
    volume_history: import_zod17.z.array(import_zod17.z.array(import_zod17.z.number().nullable())).optional(),
    market_cap_history: import_zod17.z.array(import_zod17.z.array(import_zod17.z.number().nullable())).optional(),
    market_cap_diluted_history: import_zod17.z.array(import_zod17.z.array(import_zod17.z.number().nullable())).optional(),
    name: import_zod17.z.string().optional(),
    symbol: import_zod17.z.string().optional(),
    blockchain: import_zod17.z.string().optional(),
    address: import_zod17.z.string().optional()
  })
});
// src/v1/market/MarketMultiDataSchema.ts
var import_zod19 = require("zod");

// src/utils/schemas/StringOrArray.ts
var import_zod18 = require("zod");
var stringOrArray = import_zod18.z.union([import_zod18.z.string(), import_zod18.z.array(import_zod18.z.string())]).transform((value) => {
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim());
  }
  return value;
});

// src/v1/market/MarketMultiDataSchema.ts
var assetEntry = import_zod19.z.object({
  type: import_zod19.z.enum(["address", "name"]),
  value: import_zod19.z.string()
});
var MarketMultiDataAssetParamsSchema = import_zod19.z.object({
  ids: stringOrArray.optional(),
  symbols: stringOrArray.optional(),
  blockchains: stringOrArray.optional(),
  assets: import_zod19.z.union([
    import_zod19.z.string(),
    import_zod19.z.array(assetEntry)
  ]).optional(),
  shouldFetchPriceChange: import_zod19.z.union([import_zod19.z.literal("24h"), import_zod19.z.coerce.boolean()]).optional().default(false)
});
var Asset2 = import_zod19.z.object({
  key: import_zod19.z.string(),
  id: import_zod19.z.number().nullable(),
  name: import_zod19.z.string(),
  symbol: import_zod19.z.string(),
  decimals: import_zod19.z.number().nullable(),
  logo: import_zod19.z.string().nullable(),
  rank: import_zod19.z.number().nullable(),
  price: import_zod19.z.number().nullable(),
  market_cap: import_zod19.z.number(),
  market_cap_diluted: import_zod19.z.number(),
  volume: import_zod19.z.number(),
  volume_change_24h: import_zod19.z.number(),
  volume_7d: import_zod19.z.number(),
  liquidity: import_zod19.z.number(),
  ath: import_zod19.z.number().nullable(),
  atl: import_zod19.z.number().nullable(),
  off_chain_volume: import_zod19.z.number(),
  is_listed: import_zod19.z.boolean(),
  price_change_1h: import_zod19.z.number(),
  price_change_24h: import_zod19.z.number(),
  price_change_7d: import_zod19.z.number(),
  price_change_1m: import_zod19.z.number(),
  price_change_1y: import_zod19.z.number(),
  total_supply: import_zod19.z.number(),
  circulating_supply: import_zod19.z.number(),
  contracts: import_zod19.z.array(import_zod19.z.object({
    address: import_zod19.z.string(),
    blockchainId: import_zod19.z.string(),
    blockchain: import_zod19.z.string(),
    decimals: import_zod19.z.number()
  }))
});
var MarketMultiDataResponseSchema = import_zod19.z.object({
  data: import_zod19.z.record(import_zod19.z.string(), Asset2),
  dataArray: import_zod19.z.array(Asset2.nullable())
});
// src/v1/market/MarketMultiHistorySchema.ts
var import_zod20 = require("zod");
var MarketMultiHistoryParamsSchema = import_zod20.z.object({
  assets: import_zod20.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",");
    }
    return [];
  }),
  period: import_zod20.z.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return;
  }),
  symbols: import_zod20.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",");
    }
    return [];
  }),
  blockchains: import_zod20.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((b) => b.trim()).filter((b) => b.length > 0);
    }
    return [];
  }),
  ids: import_zod20.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((i) => Number(i));
    }
    return [];
  }),
  from: import_zod20.z.string().optional(),
  froms: import_zod20.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((v) => Number(v));
    }
    return;
  }),
  to: import_zod20.z.string().optional(),
  tos: import_zod20.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((v) => Number(v));
    }
    return;
  })
});
var MarketMultiHistoryResponseSchema = import_zod20.z.object({
  data: import_zod20.z.array(import_zod20.z.object({
    price_history: import_zod20.z.array(import_zod20.z.array(import_zod20.z.number().nullable())).optional(),
    volume_history: import_zod20.z.array(import_zod20.z.array(import_zod20.z.number().nullable())).optional(),
    market_cap_history: import_zod20.z.array(import_zod20.z.array(import_zod20.z.number().nullable())).optional(),
    market_cap_diluted_history: import_zod20.z.array(import_zod20.z.array(import_zod20.z.number().nullable())).optional(),
    name: import_zod20.z.string(),
    symbol: import_zod20.z.string(),
    address: import_zod20.z.string(),
    id: import_zod20.z.number().nullable().optional()
  }))
});
// src/v1/market/MarketMultiPricesSchema.ts
var import_zod21 = require("zod");
var assetEntry2 = import_zod21.z.object({
  type: import_zod21.z.enum(["address", "name"]),
  value: import_zod21.z.string()
});
var MarketMultiPricesParamsSchema = import_zod21.z.object({
  blockchains: stringOrArray.optional(),
  assets: import_zod21.z.union([
    import_zod21.z.string(),
    import_zod21.z.array(assetEntry2)
  ]).optional()
});
var MarketMultiPricesResponseSchema = import_zod21.z.object({
  data: import_zod21.z.record(import_zod21.z.string(), import_zod21.z.object({
    price: import_zod21.z.number().nullable(),
    name: import_zod21.z.string().nullable(),
    symbol: import_zod21.z.string().nullable(),
    logo: import_zod21.z.string().nullable(),
    marketCap: import_zod21.z.number().nullable(),
    marketCapDiluted: import_zod21.z.number().nullable(),
    liquidity: import_zod21.z.number().nullable(),
    liquidityMax: import_zod21.z.number().nullable()
  }))
});
// src/v1/market/MarketNftSchema.ts
var import_zod22 = require("zod");
var MarketNftParamsSchema = import_zod22.z.object({
  asset: import_zod22.z.string(),
  chain: import_zod22.z.string()
});
var MarketNftResponseSchema = import_zod22.z.object({
  data: import_zod22.z.object({
    price: import_zod22.z.number(),
    priceETH: import_zod22.z.number()
  })
});
// src/v1/market/MarketPairSchema.ts
var import_zod23 = require("zod");
var MarketPairParamsSchema = import_zod23.z.object({
  blockchain: import_zod23.z.string().optional(),
  asset: import_zod23.z.string().optional(),
  symbol: import_zod23.z.string().optional(),
  address: import_zod23.z.string().optional(),
  baseToken: import_zod23.z.string().optional(),
  stats: import_zod23.z.union([import_zod23.z.boolean(), import_zod23.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val),
  force: import_zod23.z.coerce.boolean().optional().default(false)
});
var MarketPairResponseSchema = import_zod23.z.object({
  data: EnrichedPoolDataSchema
});
// src/v1/market/MarketPairsSchema.ts
var import_zod24 = require("zod");
var MarketPairsParamsSchema = import_zod24.z.object({
  limit: import_zod24.z.coerce.number().max(25).default(25),
  offset: import_zod24.z.string().default("0"),
  id: import_zod24.z.coerce.number().optional(),
  asset: import_zod24.z.string().optional(),
  symbol: import_zod24.z.string().optional(),
  blockchain: import_zod24.z.string().optional(),
  tokens: import_zod24.z.string().optional(),
  blockchains: import_zod24.z.string().optional(),
  excludeBonded: import_zod24.z.coerce.boolean().optional().default(false),
  poolType: import_zod24.z.string().optional()
});
var MarketPairsResponseSchema = import_zod24.z.object({
  data: import_zod24.z.object({
    pairs: import_zod24.z.array(EnrichedPoolDataSchema),
    total_count: import_zod24.z.number()
  })
});
// src/v1/market/MarketQuerySchema.ts
var import_zod25 = require("zod");
var allowedFields = [
  "price",
  "price_change_1h",
  "price_change_7d",
  "liquidity",
  "market_cap",
  "volume",
  "price_change_24h",
  "off_chain_volume"
];
var allowedFieldsToNewFormat = {
  price: "priceUSD",
  price_change_1h: "priceChange1hPercent",
  price_change_7d: "priceChange7dPercent",
  liquidity: "liquidityUSD",
  market_cap: "marketCapUSD",
  volume: "volume24hUSD",
  price_change_24h: "priceChange24hPercent",
  off_chain_volume: "offChainVolumeUSD"
};
var allowedFieldsNewFormat = [
  "priceUSD",
  "priceChange1hPercent",
  "priceChange7dPercent",
  "liquidityUSD",
  "marketCapUSD",
  "volume24hUSD",
  "priceChange24hPercent",
  "offChainVolumeUSD"
];
var allowedFieldsEnum = import_zod25.z.enum(allowedFields);
var allowedFieldsNewFormatEnum = import_zod25.z.enum(allowedFieldsNewFormat);
var getNewFormatField = (input) => {
  return allowedFieldsToNewFormat[input];
};
var MarketQueryParamsSchema = import_zod25.z.object({
  sortBy: import_zod25.z.string().optional().transform((val) => {
    if (val) {
      return getNewFormatField(allowedFieldsEnum.parse(val));
    }
    return null;
  }),
  sortOrder: import_zod25.z.string().default("desc"),
  filters: import_zod25.z.string().optional().transform((values) => {
    const filters = values ? values.split(",") : [];
    if (filters.length > 0) {
      const tmpSubQuery = {};
      for (const filter of filters) {
        if (filter.includes(":")) {
          const orStatements = filter.split("||");
          for (const statement of orStatements) {
            const filterPart = statement.split(":");
            if (filterPart.length === 2) {
              filterPart.push("");
            }
            const [field, min, max] = import_zod25.z.tuple([
              allowedFieldsEnum,
              import_zod25.z.coerce.string().default("0"),
              import_zod25.z.coerce.string().default("100000000000000000")
            ]).parse(filterPart);
            if (allowedFields.includes(field)) {
              tmpSubQuery[getNewFormatField(field)] = {
                gte: min ? import_zod25.z.coerce.number().parse(min) : undefined,
                lte: max ? import_zod25.z.coerce.number().parse(max) : undefined
              };
            }
          }
        }
      }
      return { AND: [tmpSubQuery] };
    }
    return {};
  }),
  blockchain: import_zod25.z.string().optional(),
  blockchains: import_zod25.z.string().optional().transform((blockchainsString) => {
    if (!blockchainsString) {
      return [];
    }
    return blockchainsString.split(",").map((blockchain) => blockchain.trim()).filter((b) => b.length > 0);
  }),
  categories: import_zod25.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",");
    }
    return [];
  }),
  limit: import_zod25.z.coerce.number().default(20),
  offset: import_zod25.z.coerce.number().default(0)
}).transform(({ filters, sortOrder, sortBy, ...data }) => ({
  where: filters,
  orderBy: sortBy ? { [sortBy]: sortOrder } : undefined,
  ...data
}));
var MarketQueryResponseSchema = import_zod25.z.array(import_zod25.z.object({
  name: import_zod25.z.string(),
  logo: import_zod25.z.string().nullable(),
  symbol: import_zod25.z.string(),
  liquidity: import_zod25.z.number(),
  market_cap: import_zod25.z.number(),
  volume: import_zod25.z.number(),
  off_chain_volume: import_zod25.z.number(),
  price: import_zod25.z.number(),
  price_change_1h: import_zod25.z.number(),
  price_change_24h: import_zod25.z.number(),
  price_change_7d: import_zod25.z.number(),
  categories: import_zod25.z.array(import_zod25.z.string().optional()),
  contracts: import_zod25.z.array(import_zod25.z.object({
    address: import_zod25.z.string(),
    blockchain: import_zod25.z.string(),
    blockchainId: import_zod25.z.string(),
    decimals: import_zod25.z.number()
  })),
  id: import_zod25.z.number(),
  rank: import_zod25.z.number().nullable()
}));
// src/v1/market/MarketSparklineSchema.ts
var import_zod26 = require("zod");
var MarketSparklineResponseSchema = import_zod26.z.object({
  url: import_zod26.z.string()
});
var MarketSparklineParamsSchema = import_zod26.z.object({
  asset: import_zod26.z.string().optional(),
  blockchain: import_zod26.z.string().optional(),
  symbol: import_zod26.z.string().optional(),
  id: import_zod26.z.string().optional(),
  timeFrame: import_zod26.z.string().optional().default("24h"),
  png: import_zod26.z.string().optional().default("false")
});
// src/v1/market/MarketTokenVsMarketSchema.ts
var import_zod27 = require("zod");
var MarketTokenVsMarketParamsSchema = import_zod27.z.object({
  tag: import_zod27.z.string()
});
var selectAssetTokenVsCategory = {
  marketCapUSD: true,
  priceUSD: true,
  priceChange1hPercent: true,
  priceChange24hPercent: true,
  priceChange7dPercent: true,
  priceChange1mPercent: true,
  name: true,
  symbol: true
};
var selectCategoryTokenVsCategory = {
  id: true,
  marketCapUSD: true,
  marketCapChange24hPercent: true,
  marketCapChange7dPercent: true,
  marketCapChange1mPercent: true,
  name: true,
  volumeUSD: true
};
var MarketTokenVsMarketResponseSchema = import_zod27.z.object({
  data: import_zod27.z.array(import_zod27.z.union([
    import_zod27.z.object({
      marketCapUSD: import_zod27.z.number(),
      priceUSD: import_zod27.z.number().nullable(),
      priceChange1hPercent: import_zod27.z.number(),
      priceChange24hPercent: import_zod27.z.number(),
      priceChange7dPercent: import_zod27.z.number(),
      priceChange1mPercent: import_zod27.z.number(),
      name: import_zod27.z.string(),
      symbol: import_zod27.z.string()
    }).nullable(),
    import_zod27.z.object({
      id: import_zod27.z.number(),
      marketCapUSD: import_zod27.z.number(),
      marketCapChange24hPercent: import_zod27.z.number(),
      marketCapChange7dPercent: import_zod27.z.number(),
      marketCapChange1mPercent: import_zod27.z.number(),
      name: import_zod27.z.string(),
      volumeUSD: import_zod27.z.number()
    }).nullable()
  ]))
});
// src/v1/market/MarketTotalSchema.ts
var import_zod28 = require("zod");
var MarketTotalResponseSchema = import_zod28.z.object({
  market_cap_history: import_zod28.z.array(import_zod28.z.tuple([import_zod28.z.number(), import_zod28.z.number()])),
  market_cap_change_24h: import_zod28.z.string(),
  btc_dominance_history: import_zod28.z.array(import_zod28.z.tuple([import_zod28.z.number(), import_zod28.z.number()]))
});
// src/v1/market/MarketTradesPairSchema.ts
var import_zod29 = require("zod");
var allowedFields2 = ["date", "amount_usd", "token_in_amount", "token_out_amount"];
var allowedFieldsToNewFormat2 = {
  date: "date",
  amount_usd: "volumeUSD",
  token_in_amount: "amount0",
  token_out_amount: "amount1"
};
var allowedFieldsNewFormat2 = ["date", "volumeUSD", "amount0", "amount1"];
var allowedFieldsEnum2 = import_zod29.z.enum(allowedFields2);
var allowedFieldsNewFormatEnum2 = import_zod29.z.enum(allowedFieldsNewFormat2);
var getNewFormatField2 = (input) => {
  return allowedFieldsToNewFormat2[input];
};
var MarketTradesPairParamsSchema = import_zod29.z.object({
  blockchain: import_zod29.z.string().optional(),
  asset: import_zod29.z.string().transform((val) => val.trim()).optional(),
  address: import_zod29.z.string().optional(),
  symbol: import_zod29.z.string().optional(),
  limit: import_zod29.z.coerce.number().optional(),
  amount: import_zod29.z.coerce.number().optional(),
  sortBy: import_zod29.z.string().optional().transform((val) => {
    if (val) {
      return getNewFormatField2(allowedFieldsEnum2.parse(val));
    }
    return "date";
  }),
  sortOrder: import_zod29.z.enum(["asc", "desc"]).default("desc"),
  offset: import_zod29.z.coerce.number().default(0),
  mode: import_zod29.z.enum(["pair", "asset"]).default("pair"),
  transactionSenderAddress: import_zod29.z.string().optional()
});
var MarketTradesPairResponseSchema = import_zod29.z.object({
  data: import_zod29.z.array(import_zod29.z.object({
    blockchain: import_zod29.z.string(),
    hash: import_zod29.z.string(),
    pair: import_zod29.z.string(),
    date: import_zod29.z.number(),
    token_price_vs: import_zod29.z.number(),
    token_price: import_zod29.z.number(),
    token_amount: import_zod29.z.number(),
    token_amount_vs: import_zod29.z.number(),
    token_amount_usd: import_zod29.z.number(),
    type: import_zod29.z.string(),
    sender: import_zod29.z.string().nullable(),
    transaction_sender_address: import_zod29.z.string().nullable(),
    token_amount_raw: import_zod29.z.string(),
    token_amount_raw_vs: import_zod29.z.string(),
    operation: import_zod29.z.string(),
    totalFeesUSD: import_zod29.z.number().nullable().optional(),
    gasFeesUSD: import_zod29.z.number().nullable().optional(),
    platformFeesUSD: import_zod29.z.number().nullable().optional(),
    mevFeesUSD: import_zod29.z.number().nullable().optional()
  }))
});
// src/v1/metadata/MetadataCategoriesSchema.ts
var import_zod30 = require("zod");
var MetadataCategoriesResponseSchema = import_zod30.z.array(import_zod30.z.object({
  name: import_zod30.z.string(),
  market_cap: import_zod30.z.number(),
  market_cap_change_24h: import_zod30.z.number(),
  market_cap_change_7d: import_zod30.z.number()
}));
// src/v1/metadata/MetadataNewsSchema.ts
var import_zod31 = require("zod");
var MetadataNewsParamsSchema = import_zod31.z.object({
  symbols: import_zod31.z.string().transform((val, ctx) => {
    const values = val.split(",");
    if (values.length > 5) {
      ctx.addIssue({
        code: import_zod31.z.ZodIssueCode.custom,
        message: "Too many symbols"
      });
    }
    return values;
  })
});
var CryptoNewsDataSchema = import_zod31.z.array(import_zod31.z.object({
  news_url: import_zod31.z.string(),
  image_url: import_zod31.z.string(),
  title: import_zod31.z.string(),
  text: import_zod31.z.string(),
  source_name: import_zod31.z.string(),
  date: import_zod31.z.string(),
  topics: import_zod31.z.array(import_zod31.z.string()),
  sentiment: import_zod31.z.string(),
  type: import_zod31.z.string(),
  tickers: import_zod31.z.array(import_zod31.z.string())
}));
var MetadataNewsResponseSchema = import_zod31.z.object({
  data: import_zod31.z.array(import_zod31.z.object({
    news_url: import_zod31.z.string(),
    image_url: import_zod31.z.string(),
    title: import_zod31.z.string(),
    text: import_zod31.z.string(),
    source_name: import_zod31.z.string(),
    date: import_zod31.z.string(),
    topics: import_zod31.z.array(import_zod31.z.string()),
    sentiment: import_zod31.z.string(),
    type: import_zod31.z.string(),
    tickers: import_zod31.z.array(import_zod31.z.string())
  }))
});
// src/v1/metadata/MetadataSchema.ts
var import_zod_to_openapi = __toESM(require_dist(), 1);
var import_zod32 = require("zod");
import_zod_to_openapi.extendZodWithOpenApi(import_zod32.z);
var MetadataParamsSchema = import_zod32.z.object({
  symbol: import_zod32.z.string().optional(),
  id: import_zod32.z.string().optional(),
  asset: import_zod32.z.string().optional(),
  blockchain: import_zod32.z.string().optional(),
  force: import_zod32.z.coerce.boolean().optional().default(false),
  full: import_zod32.z.coerce.boolean().optional().default(true)
}).strict();
var MultiMetadataParamsSchema = import_zod32.z.object({
  ids: import_zod32.z.string().optional(),
  assets: import_zod32.z.string().optional(),
  blockchains: import_zod32.z.string().optional(),
  symbols: import_zod32.z.string().optional()
}).strict().transform((data) => {
  return {
    ids: data.ids ? data.ids.split(",") : undefined,
    assets: data.assets ? data.assets.split(",") : undefined,
    blockchains: data.blockchains ? data.blockchains.split(",") : undefined,
    symbols: data.symbols ? data.symbols.split(",") : undefined
  };
});
var MetadataResponseSchema = import_zod32.z.object({
  data: import_zod32.z.object({
    id: import_zod32.z.number().nullable(),
    name: import_zod32.z.string(),
    symbol: import_zod32.z.string(),
    rank: import_zod32.z.number().nullable().optional(),
    contracts: import_zod32.z.array(import_zod32.z.string()),
    blockchains: import_zod32.z.array(import_zod32.z.string()),
    decimals: import_zod32.z.array(import_zod32.z.number()),
    twitter: import_zod32.z.string().nullable(),
    website: import_zod32.z.string().nullable(),
    logo: import_zod32.z.string().nullable(),
    price: import_zod32.z.number().nullable(),
    market_cap: import_zod32.z.number(),
    liquidity: import_zod32.z.number(),
    volume: import_zod32.z.number(),
    description: import_zod32.z.string().nullable(),
    kyc: import_zod32.z.string().nullable(),
    audit: import_zod32.z.string().nullable(),
    total_supply_contracts: import_zod32.z.array(import_zod32.z.string()),
    circulating_supply_addresses: import_zod32.z.array(import_zod32.z.string()),
    total_supply: import_zod32.z.number(),
    circulating_supply: import_zod32.z.number(),
    discord: import_zod32.z.string().nullable(),
    max_supply: import_zod32.z.number().nullable(),
    chat: import_zod32.z.string().nullable(),
    tags: import_zod32.z.array(import_zod32.z.string()),
    investors: import_zod32.z.array(import_zod32.z.object({
      lead: import_zod32.z.boolean(),
      name: import_zod32.z.string(),
      type: import_zod32.z.string(),
      image: import_zod32.z.string(),
      country_name: import_zod32.z.string(),
      description: import_zod32.z.string()
    })),
    distribution: import_zod32.z.array(import_zod32.z.object({
      percentage: import_zod32.z.number(),
      name: import_zod32.z.string()
    })),
    release_schedule: import_zod32.z.array(import_zod32.z.object({
      allocation_details: import_zod32.z.record(import_zod32.z.string(), import_zod32.z.number()),
      tokens_to_unlock: import_zod32.z.number(),
      unlock_date: import_zod32.z.number()
    })),
    cexs: import_zod32.z.array(import_zod32.z.object({
      logo: import_zod32.z.string().nullable(),
      name: import_zod32.z.string().nullable(),
      id: import_zod32.z.string()
    })),
    listed_at: import_zod32.z.date().nullable(),
    deployer: import_zod32.z.string().nullable(),
    source: import_zod32.z.string().nullable(),
    others: import_zod32.z.record(import_zod32.z.string(), import_zod32.z.unknown()).nullable().optional(),
    dexscreener_listed: import_zod32.z.boolean().nullable().optional(),
    dexscreener_header: import_zod32.z.string().nullable().optional(),
    dexscreener_ad_paid: import_zod32.z.boolean().nullable().optional(),
    live_status: import_zod32.z.string().nullable().optional(),
    live_thumbnail: import_zod32.z.string().nullable().optional(),
    livestream_title: import_zod32.z.string().nullable().optional(),
    live_reply_count: import_zod32.z.number().nullable().optional(),
    telegram: import_zod32.z.string().nullable().optional(),
    twitterRenameCount: import_zod32.z.number().nullable().optional(),
    twitterRenameHistory: import_zod32.z.array(import_zod32.z.object({
      username: import_zod32.z.string(),
      last_checked: import_zod32.z.string()
    })).nullable().optional()
  })
});
var MultiMetadataResponseSchema = import_zod32.z.object({
  data: import_zod32.z.array(MetadataResponseSchema.optional())
});
// src/v1/metadata/MetadataTrendingsSchema.ts
var import_zod33 = require("zod");
var MetadataTrendingsParamsSchema = import_zod33.z.object({
  platform: import_zod33.z.string().transform((x) => x !== undefined && x !== null ? x.toLocaleLowerCase() : x),
  blockchain: import_zod33.z.string().transform((x) => x !== undefined && x !== null ? x.toLocaleLowerCase() : x)
}).partial();
var MetadataTrendingsResponseSchema = import_zod33.z.array(import_zod33.z.object({
  name: import_zod33.z.string().nullable(),
  symbol: import_zod33.z.string().nullable(),
  contracts: import_zod33.z.array(import_zod33.z.object({
    address: import_zod33.z.string(),
    blockchain: import_zod33.z.string(),
    decimals: import_zod33.z.number()
  }).optional()),
  price_change_24h: import_zod33.z.number(),
  price: import_zod33.z.number(),
  logo: import_zod33.z.string().nullable(),
  trending_score: import_zod33.z.number(),
  pair: import_zod33.z.string().nullable(),
  platforms: import_zod33.z.array(import_zod33.z.object({
    name: import_zod33.z.string(),
    rank: import_zod33.z.number(),
    weigth: import_zod33.z.number()
  }))
}));
// src/v1/metadata/SystemMetadataSchema.ts
var import_zod34 = require("zod");
var SystemMetadataResponseSchema = import_zod34.z.object({
  data: import_zod34.z.object({
    poolTypes: import_zod34.z.array(import_zod34.z.string()),
    chains: import_zod34.z.array(import_zod34.z.object({
      id: import_zod34.z.string(),
      name: import_zod34.z.string(),
      blockExplorers: import_zod34.z.object({
        default: import_zod34.z.object({
          name: import_zod34.z.string(),
          url: import_zod34.z.string(),
          apiUrl: import_zod34.z.string().optional()
        })
      }).optional()
    })),
    factories: import_zod34.z.array(import_zod34.z.object({
      chainId: import_zod34.z.string(),
      address: import_zod34.z.string(),
      name: import_zod34.z.string().optional(),
      ui_name: import_zod34.z.string().optional(),
      logo: import_zod34.z.string().optional()
    }))
  })
});
// src/v1/misc/ListingStatusSchema.ts
var import_zod35 = require("zod");
var walletSchema = import_zod35.z.object({
  wallet: import_zod35.z.string()
});
// src/v1/misc/SubmitTokenSchema.ts
var import_zod36 = require("zod");
var formattedJSONSchema = import_zod36.z.object({
  name: import_zod36.z.string(),
  symbol: import_zod36.z.string(),
  type: import_zod36.z.string(),
  description: import_zod36.z.string(),
  categories: import_zod36.z.array(import_zod36.z.string()),
  completed: import_zod36.z.boolean(),
  links: import_zod36.z.object({
    website: import_zod36.z.string(),
    twitter: import_zod36.z.string(),
    telegram: import_zod36.z.string(),
    discord: import_zod36.z.string(),
    github: import_zod36.z.string(),
    audits: import_zod36.z.array(import_zod36.z.string()),
    kycs: import_zod36.z.array(import_zod36.z.string())
  }),
  contracts: import_zod36.z.array(import_zod36.z.object({
    address: import_zod36.z.string(),
    blockchain: import_zod36.z.string(),
    blockchain_id: import_zod36.z.number()
  })),
  totalSupplyContracts: import_zod36.z.array(import_zod36.z.object({
    address: import_zod36.z.string(),
    blockchain: import_zod36.z.string(),
    blockchain_id: import_zod36.z.number()
  })),
  excludedFromCirculationAddresses: import_zod36.z.array(import_zod36.z.string()),
  tokenomics: import_zod36.z.object({
    distribution: import_zod36.z.array(import_zod36.z.string()),
    sales: import_zod36.z.array(import_zod36.z.string()),
    vestingSchedule: import_zod36.z.array(import_zod36.z.string()),
    fees: import_zod36.z.array(import_zod36.z.string())
  }),
  init: import_zod36.z.boolean(),
  logo: import_zod36.z.string()
});
// src/v1/misc/UploadLogoSchema.ts
var import_zod37 = require("zod");
var logoUrlSchema = import_zod37.z.object({
  assetName: import_zod37.z.string(),
  logoUrl: import_zod37.z.string()
});
// src/v1/pulse/PulseSchema.ts
var import_zod38 = require("zod");
var PulsePayloadParamsSchema = import_zod38.z.object({
  model: import_zod38.z.enum(["default"]).optional(),
  subscriptionId: import_zod38.z.string().optional(),
  compressed: import_zod38.z.coerce.boolean().optional().default(false),
  assetMode: import_zod38.z.coerce.boolean().optional().default(false),
  chainId: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.array(import_zod38.z.string())]).optional(),
  poolTypes: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.array(import_zod38.z.string())]).optional(),
  excludeDuplicates: import_zod38.z.coerce.boolean().optional().default(true),
  instanceTracking: import_zod38.z.coerce.boolean().optional().default(false),
  pagination: import_zod38.z.coerce.boolean().optional(),
  views: import_zod38.z.array(import_zod38.z.object({
    name: import_zod38.z.string(),
    model: import_zod38.z.enum(["new", "bonding", "bonded"]).optional(),
    chainId: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.array(import_zod38.z.string())]).optional(),
    poolTypes: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.array(import_zod38.z.string())]).optional(),
    token: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.record(import_zod38.z.unknown())]).optional().transform((val) => {
      if (typeof val === "object" && val !== null) {
        return val;
      }
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === "object" && parsed !== null) {
            return parsed;
          }
        } catch {
          return { address: val };
        }
      }
      return;
    }),
    assets: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.array(import_zod38.z.string())]).optional(),
    sortBy: import_zod38.z.string().optional(),
    sortOrder: import_zod38.z.enum(["asc", "desc"]).optional(),
    limit: import_zod38.z.coerce.number().max(100).optional().default(30),
    offset: import_zod38.z.coerce.number().optional().default(0),
    addressToExclude: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.array(import_zod38.z.string())]).optional(),
    baseTokenToExclude: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.array(import_zod38.z.string())]).optional(),
    filters: import_zod38.z.union([import_zod38.z.string(), import_zod38.z.record(import_zod38.z.unknown())]).optional().transform((val) => {
      if (typeof val === "object" && val !== null) {
        return val;
      }
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (typeof parsed === "object" && parsed !== null) {
            return parsed;
          }
        } catch {
          const filters = val.split(",");
          const whereClause = {};
          for (const filter of filters) {
            if (filter.includes(":")) {
              const [field, filterMinValue, filterMaxValue] = filter.split(":");
              if (field && ["source", "deployer"].includes(field)) {
                whereClause[field] = {
                  equals: filterMinValue
                };
              } else if (field && ["latest_trade_date", "created_at"].includes(field)) {
                const getDateValue = (value) => {
                  if (!value || value === "null" || value === "undefined")
                    return;
                  const numValue = Number(value);
                  const date = Number.isNaN(numValue) ? new Date(value) : new Date(numValue);
                  return Number.isNaN(date.getTime()) ? undefined : date;
                };
                const gteDate = getDateValue(filterMinValue);
                const lteDate = getDateValue(filterMaxValue);
                if (gteDate || lteDate) {
                  whereClause[field] = {
                    ...gteDate && { gte: gteDate },
                    ...lteDate && { lte: lteDate }
                  };
                }
              } else if (field === "market_cap") {
                whereClause[field] = {
                  not: filterMinValue === "null" ? null : undefined,
                  gte: filterMinValue && filterMinValue !== "null" ? Number(filterMinValue) : undefined,
                  lte: filterMaxValue ? Number(filterMaxValue) : undefined
                };
              } else if (field) {
                whereClause[field] = {
                  gte: filterMinValue ? Number(filterMinValue) : undefined,
                  lte: filterMaxValue ? Number(filterMaxValue) : undefined
                };
              }
            }
          }
          return whereClause;
        }
      }
      return {};
    }),
    min_socials: import_zod38.z.union([
      import_zod38.z.number().int().min(1).max(3),
      import_zod38.z.string().transform((val) => {
        const num = Number(val);
        if (Number.isNaN(num))
          throw new Error("Invalid number");
        return num;
      }).pipe(import_zod38.z.number().int().min(1).max(3))
    ]).optional(),
    pagination: import_zod38.z.coerce.boolean().optional()
  })).max(10).optional().default([])
});
var PausePulsePayloadParamsSchema = import_zod38.z.object({
  action: import_zod38.z.enum(["pause", "unpause"]),
  views: import_zod38.z.array(import_zod38.z.string()).min(1)
});
var ViewPaginationSchema = import_zod38.z.object({
  pagination: import_zod38.z.number()
});
var PulsePaginationResponseSchema = import_zod38.z.record(ViewPaginationSchema);
var DebugPulseViewsResponseSchema = import_zod38.z.object({
  success: import_zod38.z.boolean(),
  hostname: import_zod38.z.string(),
  viewKeys: import_zod38.z.record(import_zod38.z.array(import_zod38.z.string())).optional(),
  error: import_zod38.z.string().optional(),
  redirectTo: import_zod38.z.string().optional(),
  hint: import_zod38.z.string().optional()
});
var PulseQuerySchema = import_zod38.z.object({
  blockchains: import_zod38.z.string().optional(),
  factories: import_zod38.z.string().optional()
});
var poolDataSchema = EnrichedPoolDataSchema;
var tokenDataSchema = EnrichedTokenDataSchema;
var syncMessageSchema = import_zod38.z.object({
  type: import_zod38.z.literal("sync"),
  payload: import_zod38.z.record(import_zod38.z.string(), import_zod38.z.object({
    data: import_zod38.z.array(poolDataSchema)
  }))
});
var newPoolMessageSchema = import_zod38.z.object({
  type: import_zod38.z.literal("new-pool"),
  payload: import_zod38.z.object({
    viewName: import_zod38.z.string(),
    pool: poolDataSchema
  })
});
var updatePoolMessageSchema = import_zod38.z.object({
  type: import_zod38.z.literal("update-pool"),
  payload: import_zod38.z.object({
    viewName: import_zod38.z.string(),
    pool: poolDataSchema
  })
});
var removePoolMessageSchema = import_zod38.z.object({
  type: import_zod38.z.literal("remove-pool"),
  payload: import_zod38.z.object({
    viewName: import_zod38.z.string(),
    poolAddress: import_zod38.z.string()
  })
});
var WebSocketMessageSchema = import_zod38.z.discriminatedUnion("type", [
  syncMessageSchema,
  newPoolMessageSchema,
  updatePoolMessageSchema,
  removePoolMessageSchema
]);
var PulseOutputSchema = WebSocketMessageSchema;
// src/v1/search/SearchSchema.ts
var import_zod40 = require("zod");

// src/utils/schemas/TokenDetailsOutput.ts
var import_zod39 = require("zod");
var TokenDetailsOutput = import_zod39.z.object({
  address: import_zod39.z.string(),
  chainId: import_zod39.z.string(),
  symbol: import_zod39.z.string().nullable(),
  name: import_zod39.z.string().nullable(),
  decimals: import_zod39.z.coerce.number().default(0),
  id: import_zod39.z.number().nullable().optional().default(null),
  priceUSD: import_zod39.z.coerce.number().default(0),
  priceToken: import_zod39.z.coerce.number().default(0),
  priceTokenString: import_zod39.z.string(),
  approximateReserveUSD: import_zod39.z.coerce.number().default(0),
  approximateReserveTokenRaw: import_zod39.z.string(),
  approximateReserveToken: import_zod39.z.coerce.number().default(0),
  totalSupply: import_zod39.z.coerce.number().default(0),
  circulatingSupply: import_zod39.z.coerce.number().default(0),
  marketCapUSD: import_zod39.z.coerce.number().default(0),
  marketCapDilutedUSD: import_zod39.z.coerce.number().optional().default(0),
  logo: import_zod39.z.string().nullable(),
  originLogoUrl: import_zod39.z.string().nullable().optional(),
  rank: import_zod39.z.coerce.number().nullable().default(null),
  cexs: import_zod39.z.array(import_zod39.z.string()).default([]),
  exchange: import_zod39.z.object({
    name: import_zod39.z.string(),
    logo: import_zod39.z.string()
  }).optional(),
  factory: import_zod39.z.string().nullable().optional(),
  source: import_zod39.z.string().nullable().optional(),
  sourceFactory: import_zod39.z.string().nullable().optional(),
  liquidityUSD: import_zod39.z.coerce.number().optional(),
  liquidityMaxUSD: import_zod39.z.coerce.number().optional(),
  bonded: import_zod39.z.boolean().optional(),
  bondingPercentage: import_zod39.z.coerce.number().optional(),
  bondingCurveAddress: import_zod39.z.string().nullable().optional(),
  preBondingFactory: import_zod39.z.string().optional(),
  poolAddress: import_zod39.z.string().optional(),
  blockchain: import_zod39.z.string().optional(),
  type: import_zod39.z.string().optional(),
  tokenType: TokenTypeSchema,
  deployer: import_zod39.z.string().nullable().optional(),
  bondedAt: import_zod39.z.coerce.date().nullable(),
  athUSD: import_zod39.z.coerce.number().optional(),
  atlUSD: import_zod39.z.coerce.number().optional(),
  athDate: import_zod39.z.coerce.date().optional(),
  atlDate: import_zod39.z.coerce.date().optional(),
  priceChange1minPercentage: import_zod39.z.coerce.number().default(0),
  priceChange5minPercentage: import_zod39.z.coerce.number().default(0),
  priceChange1hPercentage: import_zod39.z.coerce.number().default(0),
  priceChange4hPercentage: import_zod39.z.coerce.number().default(0),
  priceChange6hPercentage: import_zod39.z.coerce.number().default(0),
  priceChange12hPercentage: import_zod39.z.coerce.number().default(0),
  priceChange24hPercentage: import_zod39.z.coerce.number().default(0),
  volume1minUSD: import_zod39.z.coerce.number().default(0),
  volume5minUSD: import_zod39.z.coerce.number().default(0),
  volume15minUSD: import_zod39.z.coerce.number().default(0),
  volume1hUSD: import_zod39.z.coerce.number().default(0),
  volume4hUSD: import_zod39.z.coerce.number().default(0),
  volume6hUSD: import_zod39.z.coerce.number().default(0),
  volume12hUSD: import_zod39.z.coerce.number().default(0),
  volume24hUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy1minUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy5minUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy15minUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy1hUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy4hUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy6hUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy12hUSD: import_zod39.z.coerce.number().default(0),
  volumeBuy24hUSD: import_zod39.z.coerce.number().default(0),
  volumeSell1minUSD: import_zod39.z.coerce.number().default(0),
  volumeSell5minUSD: import_zod39.z.coerce.number().default(0),
  volumeSell15minUSD: import_zod39.z.coerce.number().default(0),
  volumeSell1hUSD: import_zod39.z.coerce.number().default(0),
  volumeSell4hUSD: import_zod39.z.coerce.number().default(0),
  volumeSell6hUSD: import_zod39.z.coerce.number().default(0),
  volumeSell12hUSD: import_zod39.z.coerce.number().default(0),
  volumeSell24hUSD: import_zod39.z.coerce.number().default(0),
  trades1min: import_zod39.z.coerce.number().default(0),
  trades5min: import_zod39.z.coerce.number().default(0),
  trades15min: import_zod39.z.coerce.number().default(0),
  trades1h: import_zod39.z.coerce.number().default(0),
  trades4h: import_zod39.z.coerce.number().default(0),
  trades6h: import_zod39.z.coerce.number().default(0),
  trades12h: import_zod39.z.coerce.number().default(0),
  trades24h: import_zod39.z.coerce.number().default(0),
  buys1min: import_zod39.z.coerce.number().default(0),
  buys5min: import_zod39.z.coerce.number().default(0),
  buys15min: import_zod39.z.coerce.number().default(0),
  buys1h: import_zod39.z.coerce.number().default(0),
  buys4h: import_zod39.z.coerce.number().default(0),
  buys6h: import_zod39.z.coerce.number().default(0),
  buys12h: import_zod39.z.coerce.number().default(0),
  buys24h: import_zod39.z.coerce.number().default(0),
  sells1min: import_zod39.z.coerce.number().default(0),
  sells5min: import_zod39.z.coerce.number().default(0),
  sells15min: import_zod39.z.coerce.number().default(0),
  sells1h: import_zod39.z.coerce.number().default(0),
  sells4h: import_zod39.z.coerce.number().default(0),
  sells6h: import_zod39.z.coerce.number().default(0),
  sells12h: import_zod39.z.coerce.number().default(0),
  sells24h: import_zod39.z.coerce.number().default(0),
  buyers1min: import_zod39.z.coerce.number().default(0),
  buyers5min: import_zod39.z.coerce.number().default(0),
  buyers15min: import_zod39.z.coerce.number().default(0),
  buyers1h: import_zod39.z.coerce.number().default(0),
  buyers4h: import_zod39.z.coerce.number().default(0),
  buyers6h: import_zod39.z.coerce.number().default(0),
  buyers12h: import_zod39.z.coerce.number().default(0),
  buyers24h: import_zod39.z.coerce.number().default(0),
  sellers1min: import_zod39.z.coerce.number().default(0),
  sellers5min: import_zod39.z.coerce.number().default(0),
  sellers15min: import_zod39.z.coerce.number().default(0),
  sellers1h: import_zod39.z.coerce.number().default(0),
  sellers4h: import_zod39.z.coerce.number().default(0),
  sellers6h: import_zod39.z.coerce.number().default(0),
  sellers12h: import_zod39.z.coerce.number().default(0),
  sellers24h: import_zod39.z.coerce.number().default(0),
  traders1min: import_zod39.z.coerce.number().default(0),
  traders5min: import_zod39.z.coerce.number().default(0),
  traders15min: import_zod39.z.coerce.number().default(0),
  traders1h: import_zod39.z.coerce.number().default(0),
  traders4h: import_zod39.z.coerce.number().default(0),
  traders6h: import_zod39.z.coerce.number().default(0),
  traders12h: import_zod39.z.coerce.number().default(0),
  traders24h: import_zod39.z.coerce.number().default(0),
  feesPaid1minUSD: import_zod39.z.coerce.number().default(0),
  feesPaid5minUSD: import_zod39.z.coerce.number().default(0),
  feesPaid15minUSD: import_zod39.z.coerce.number().default(0),
  feesPaid1hUSD: import_zod39.z.coerce.number().default(0),
  feesPaid4hUSD: import_zod39.z.coerce.number().default(0),
  feesPaid6hUSD: import_zod39.z.coerce.number().default(0),
  feesPaid12hUSD: import_zod39.z.coerce.number().default(0),
  feesPaid24hUSD: import_zod39.z.coerce.number().default(0),
  totalFeesPaidUSD: import_zod39.z.coerce.number().default(0),
  totalFeesPaidNativeRaw: import_zod39.z.coerce.string().default("0"),
  organicTrades1min: import_zod39.z.coerce.number().default(0),
  organicTrades5min: import_zod39.z.coerce.number().default(0),
  organicTrades15min: import_zod39.z.coerce.number().default(0),
  organicTrades1h: import_zod39.z.coerce.number().default(0),
  organicTrades4h: import_zod39.z.coerce.number().default(0),
  organicTrades6h: import_zod39.z.coerce.number().default(0),
  organicTrades12h: import_zod39.z.coerce.number().default(0),
  organicTrades24h: import_zod39.z.coerce.number().default(0),
  organicTraders1min: import_zod39.z.coerce.number().default(0),
  organicTraders5min: import_zod39.z.coerce.number().default(0),
  organicTraders15min: import_zod39.z.coerce.number().default(0),
  organicTraders1h: import_zod39.z.coerce.number().default(0),
  organicTraders4h: import_zod39.z.coerce.number().default(0),
  organicTraders6h: import_zod39.z.coerce.number().default(0),
  organicTraders12h: import_zod39.z.coerce.number().default(0),
  organicTraders24h: import_zod39.z.coerce.number().default(0),
  organicVolume1minUSD: import_zod39.z.coerce.number().default(0),
  organicVolume5minUSD: import_zod39.z.coerce.number().default(0),
  organicVolume15minUSD: import_zod39.z.coerce.number().default(0),
  organicVolume1hUSD: import_zod39.z.coerce.number().default(0),
  organicVolume4hUSD: import_zod39.z.coerce.number().default(0),
  organicVolume6hUSD: import_zod39.z.coerce.number().default(0),
  organicVolume12hUSD: import_zod39.z.coerce.number().default(0),
  organicVolume24hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy1minUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy5minUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy15minUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy1hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy4hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy6hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy12hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeBuy24hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell1minUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell5minUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell15minUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell1hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell4hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell6hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell12hUSD: import_zod39.z.coerce.number().default(0),
  organicVolumeSell24hUSD: import_zod39.z.coerce.number().default(0),
  organicBuys1min: import_zod39.z.coerce.number().default(0),
  organicBuys5min: import_zod39.z.coerce.number().default(0),
  organicBuys15min: import_zod39.z.coerce.number().default(0),
  organicBuys1h: import_zod39.z.coerce.number().default(0),
  organicBuys4h: import_zod39.z.coerce.number().default(0),
  organicBuys6h: import_zod39.z.coerce.number().default(0),
  organicBuys12h: import_zod39.z.coerce.number().default(0),
  organicBuys24h: import_zod39.z.coerce.number().default(0),
  organicSells1min: import_zod39.z.coerce.number().default(0),
  organicSells5min: import_zod39.z.coerce.number().default(0),
  organicSells15min: import_zod39.z.coerce.number().default(0),
  organicSells1h: import_zod39.z.coerce.number().default(0),
  organicSells4h: import_zod39.z.coerce.number().default(0),
  organicSells6h: import_zod39.z.coerce.number().default(0),
  organicSells12h: import_zod39.z.coerce.number().default(0),
  organicSells24h: import_zod39.z.coerce.number().default(0),
  organicBuyers1min: import_zod39.z.coerce.number().default(0),
  organicBuyers5min: import_zod39.z.coerce.number().default(0),
  organicBuyers15min: import_zod39.z.coerce.number().default(0),
  organicBuyers1h: import_zod39.z.coerce.number().default(0),
  organicBuyers4h: import_zod39.z.coerce.number().default(0),
  organicBuyers6h: import_zod39.z.coerce.number().default(0),
  organicBuyers12h: import_zod39.z.coerce.number().default(0),
  organicBuyers24h: import_zod39.z.coerce.number().default(0),
  organicSellers1min: import_zod39.z.coerce.number().default(0),
  organicSellers5min: import_zod39.z.coerce.number().default(0),
  organicSellers15min: import_zod39.z.coerce.number().default(0),
  organicSellers1h: import_zod39.z.coerce.number().default(0),
  organicSellers4h: import_zod39.z.coerce.number().default(0),
  organicSellers6h: import_zod39.z.coerce.number().default(0),
  organicSellers12h: import_zod39.z.coerce.number().default(0),
  organicSellers24h: import_zod39.z.coerce.number().default(0),
  createdAt: import_zod39.z.coerce.date().nullable(),
  latestTradeDate: import_zod39.z.coerce.date().nullable(),
  holdersCount: import_zod39.z.coerce.number().default(0),
  description: import_zod39.z.string().nullable(),
  socials: import_zod39.z.object({
    twitter: import_zod39.z.string().nullable(),
    website: import_zod39.z.string().nullable(),
    telegram: import_zod39.z.string().nullable(),
    others: import_zod39.z.record(import_zod39.z.unknown()).nullable(),
    uri: import_zod39.z.string().optional()
  }),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: import_zod39.z.coerce.number().nullable().default(0),
  twitterRenameCount: import_zod39.z.coerce.number().default(0),
  twitterRenameHistory: import_zod39.z.array(import_zod39.z.object({
    username: import_zod39.z.string(),
    lastChecked: import_zod39.z.string()
  })).default([]),
  deployerMigrationsCount: import_zod39.z.coerce.number().default(0),
  deployerTokensCount: import_zod39.z.coerce.number().default(0),
  dexscreenerListed: import_zod39.z.boolean().nullable().default(false),
  dexscreenerHeader: import_zod39.z.string().nullable().default(null),
  dexscreenerAdPaid: import_zod39.z.boolean().nullable().default(false),
  dexscreenerAdPaidDate: import_zod39.z.coerce.date().nullable().default(null),
  dexscreenerSocialPaid: import_zod39.z.boolean().nullable().default(false),
  dexscreenerSocialPaidDate: import_zod39.z.coerce.date().nullable().default(null),
  liveStatus: import_zod39.z.string().nullable(),
  liveThumbnail: import_zod39.z.string().nullable(),
  livestreamTitle: import_zod39.z.string().nullable(),
  liveReplyCount: import_zod39.z.number().nullable(),
  dexscreenerBoosted: import_zod39.z.boolean().nullable().default(false),
  dexscreenerBoostedDate: import_zod39.z.coerce.date().nullable().default(null),
  dexscreenerBoostedAmount: import_zod39.z.number().nullable().default(0),
  trendingScore1min: import_zod39.z.coerce.number().default(0),
  trendingScore5min: import_zod39.z.coerce.number().default(0),
  trendingScore15min: import_zod39.z.coerce.number().default(0),
  trendingScore1h: import_zod39.z.coerce.number().default(0),
  trendingScore4h: import_zod39.z.coerce.number().default(0),
  trendingScore6h: import_zod39.z.coerce.number().default(0),
  trendingScore12h: import_zod39.z.coerce.number().default(0),
  trendingScore24h: import_zod39.z.coerce.number().default(0)
}).merge(HoldersStatsSchema);

// src/v1/search/SearchSchema.ts
var SearchParamsSchema = import_zod40.z.object({
  input: import_zod40.z.string(),
  type: import_zod40.z.enum(["tokens", "assets", "pairs"]).optional(),
  filters: import_zod40.z.string().optional().transform((filtersString) => {
    if (!filtersString)
      return {};
    try {
      const parsed = JSON.parse(filtersString.replace(/(^|[,{]\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$2"$3:'));
      return {
        blockchains: parsed["blockchains"] || undefined,
        factory: parsed["factory"] || undefined,
        poolTypes: parsed["poolTypes"] || undefined,
        factoriesAddresses: parsed["factoriesAddresses"] || undefined,
        excludeBonded: parsed["excludeBonded"] || undefined,
        bondedOnly: parsed["bondedOnly"] || undefined
      };
    } catch {
      return {};
    }
  }).pipe(import_zod40.z.object({
    blockchains: import_zod40.z.union([import_zod40.z.string(), import_zod40.z.array(import_zod40.z.string())]).optional().transform((blockchainsInput) => {
      if (!blockchainsInput) {
        return [];
      }
      const blockchainsString = Array.isArray(blockchainsInput) ? blockchainsInput.join(",") : blockchainsInput;
      return blockchainsString.split(",").map((chain) => chain.trim()).filter((chain) => chain.length > 0);
    }),
    type: import_zod40.z.enum(["tokens", "assets", "pairs"]).optional(),
    factory: import_zod40.z.string().optional(),
    poolTypes: import_zod40.z.string().optional().transform((poolTypesString) => {
      if (poolTypesString) {
        return poolTypesString?.split(",").map((poolType) => poolType.trim());
      }
      return [];
    }),
    factoriesAddresses: import_zod40.z.string().optional().transform((factoriesAddressesString) => {
      return factoriesAddressesString?.split(",").map((factoryAddress) => factoryAddress.trim());
    }),
    excludeBonded: import_zod40.z.coerce.boolean().optional().default(false),
    bondedOnly: import_zod40.z.coerce.boolean().optional().default(false)
  })),
  mode: import_zod40.z.enum(["trendings", "og"]).optional().default("trendings"),
  sortBy: import_zod40.z.enum([
    "volume_24h",
    "market_cap",
    "created_at",
    "volume_1h",
    "fees_paid_5min",
    "fees_paid_1h",
    "fees_paid_24h",
    "volume_5min",
    "holders_count",
    "organic_volume_1h",
    "total_fees_paid_usd",
    "search_score",
    "trending_score_24h"
  ]).optional().default("search_score"),
  excludeBonded: import_zod40.z.coerce.boolean().optional(),
  limit: import_zod40.z.coerce.number().min(1).max(20).optional().default(5)
});
var TokenSchema2 = import_zod40.z.object({
  address: import_zod40.z.string(),
  price: import_zod40.z.number().nullable(),
  priceToken: import_zod40.z.number(),
  priceTokenString: import_zod40.z.string(),
  approximateReserveUSD: import_zod40.z.number(),
  approximateReserveTokenRaw: import_zod40.z.string(),
  approximateReserveToken: import_zod40.z.number(),
  symbol: import_zod40.z.string(),
  name: import_zod40.z.string(),
  id: import_zod40.z.number().nullable().optional(),
  decimals: import_zod40.z.number(),
  totalSupply: import_zod40.z.number(),
  circulatingSupply: import_zod40.z.number(),
  chainId: import_zod40.z.string(),
  logo: import_zod40.z.string().nullable()
});
var PairSchema = import_zod40.z.object({
  token0: TokenSchema2,
  token1: TokenSchema2,
  volume24h: import_zod40.z.number(),
  liquidity: import_zod40.z.number(),
  blockchain: import_zod40.z.string(),
  address: import_zod40.z.string(),
  createdAt: import_zod40.z.date().nullable(),
  type: import_zod40.z.string(),
  baseToken: import_zod40.z.string(),
  exchange: import_zod40.z.object({
    name: import_zod40.z.string(),
    logo: import_zod40.z.string()
  }),
  factory: import_zod40.z.string().nullable(),
  quoteToken: import_zod40.z.string(),
  price: import_zod40.z.number().nullable(),
  priceToken: import_zod40.z.number(),
  priceTokenString: import_zod40.z.string(),
  extraData: import_zod40.z.record(import_zod40.z.any()).nullable()
}).optional();
var TokenDataSchema = import_zod40.z.object({
  logo: import_zod40.z.string().nullable(),
  name: import_zod40.z.string(),
  symbol: import_zod40.z.string(),
  decimals: import_zod40.z.array(import_zod40.z.number().optional()),
  volume_24h: import_zod40.z.number().optional(),
  price_change_24h: import_zod40.z.number().optional(),
  price_change_1h: import_zod40.z.number().optional(),
  blockchains: import_zod40.z.array(import_zod40.z.string().optional()),
  contracts: import_zod40.z.array(import_zod40.z.string().optional()),
  price: import_zod40.z.number().nullable(),
  total_supply: import_zod40.z.number(),
  market_cap: import_zod40.z.number(),
  pairs: import_zod40.z.array(PairSchema),
  type: import_zod40.z.literal("token")
});
var AssetDataSchema = import_zod40.z.object({
  id: import_zod40.z.number(),
  name: import_zod40.z.string(),
  symbol: import_zod40.z.string(),
  contracts: import_zod40.z.array(import_zod40.z.string().optional()),
  blockchains: import_zod40.z.array(import_zod40.z.string().optional()),
  decimals: import_zod40.z.array(import_zod40.z.number().optional()),
  twitter: import_zod40.z.string().nullable().optional(),
  website: import_zod40.z.string().nullable().optional(),
  logo: import_zod40.z.string().nullable(),
  price: import_zod40.z.number().nullable(),
  market_cap: import_zod40.z.number(),
  total_supply: import_zod40.z.number(),
  liquidity: import_zod40.z.number(),
  volume: import_zod40.z.number(),
  pairs: import_zod40.z.array(PairSchema),
  type: import_zod40.z.literal("asset"),
  price_change_24h: import_zod40.z.number().nullable(),
  price_change_1h: import_zod40.z.number().nullable()
});
var SearchResponseSchema = import_zod40.z.object({
  data: import_zod40.z.array(import_zod40.z.union([TokenDataSchema, AssetDataSchema, PoolData]))
});
var SearchFastResponseSchema = import_zod40.z.object({
  data: import_zod40.z.array(TokenDetailsOutput)
});
// src/v1/token/FirstBuyerSchema.ts
var import_zod41 = require("zod");
var TokenFirstBuyersParamsSchema = import_zod41.z.object({
  blockchain: import_zod41.z.string().optional(),
  asset: import_zod41.z.string(),
  limit: import_zod41.z.coerce.number().max(100).min(1).optional().default(70)
});
var TokenFirstBuyersResponseSchema = import_zod41.z.object({
  data: import_zod41.z.array(import_zod41.z.object({
    address: import_zod41.z.string(),
    blockchain: import_zod41.z.string(),
    initialAmount: import_zod41.z.string(),
    currentBalance: import_zod41.z.string(),
    firstHoldingDate: import_zod41.z.date(),
    tags: import_zod41.z.array(import_zod41.z.string()),
    lastUpdate: import_zod41.z.date().nullable().optional()
  }))
});
// src/v1/wallet/BalanceUSDSchema.ts
var import_zod42 = require("zod");
var WalletBalanceUSDParamsSchema = import_zod42.z.object({
  portfolioId: import_zod42.z.string().min(1, "portfolioId is required").regex(/^\d+$/, "portfolioId must be a valid number")
});
var WalletBalanceUSDResponseSchema = import_zod42.z.object({
  success: import_zod42.z.number()
});
// src/utils/schemas/WalletDeployerSchema.ts
var import_zod43 = require("zod");
var tokenPositionSchema = import_zod43.z.object({
  token: TokenDetailsOutput,
  balance: import_zod43.z.number(),
  rawBalance: import_zod43.z.string(),
  amountUSD: import_zod43.z.number(),
  buys: import_zod43.z.number(),
  sells: import_zod43.z.number(),
  volumeBuyToken: import_zod43.z.number(),
  volumeSellToken: import_zod43.z.number(),
  volumeBuy: import_zod43.z.number(),
  volumeSell: import_zod43.z.number(),
  avgBuyPriceUSD: import_zod43.z.number(),
  avgSellPriceUSD: import_zod43.z.number(),
  realizedPnlUSD: import_zod43.z.number(),
  unrealizedPnlUSD: import_zod43.z.number(),
  totalPnlUSD: import_zod43.z.number(),
  firstDate: import_zod43.z.date().nullable(),
  lastDate: import_zod43.z.date().nullable()
});
var walletDeployerOutputSchema = import_zod43.z.object({
  data: import_zod43.z.array(tokenPositionSchema),
  pagination: import_zod43.z.object({
    total: import_zod43.z.number(),
    page: import_zod43.z.number(),
    offset: import_zod43.z.number(),
    limit: import_zod43.z.number()
  }).nullable()
});
var WalletDeployerQuery = import_zod43.z.object({
  wallet: import_zod43.z.string(),
  blockchain: import_zod43.z.string(),
  page: import_zod43.z.string().default("1").transform((val) => {
    const parsed = Number.parseInt(val, 10);
    return parsed > 0 ? parsed : 1;
  }),
  limit: import_zod43.z.string().default("20").transform((val) => {
    const parsed = Number.parseInt(val, 10);
    return parsed > 0 ? parsed : 20;
  })
});

// src/v1/wallet/DeployerSchema.ts
var WalletV1DeployerParamsSchema = WalletDeployerQuery;
var WalletV1DeployerResponseSchema = walletDeployerOutputSchema;
// src/v1/wallet/HistorySchema.ts
var import_zod44 = require("zod");
var WalletHistoryParamsSchema = import_zod44.z.object({
  wallet: import_zod44.z.string().optional(),
  wallets: import_zod44.z.string().optional(),
  blockchains: import_zod44.z.string().optional(),
  from: import_zod44.z.string().optional(),
  to: import_zod44.z.string().optional(),
  unlistedAssets: import_zod44.z.string().optional(),
  period: import_zod44.z.string().optional(),
  accuracy: import_zod44.z.string().optional(),
  testnet: import_zod44.z.string().optional(),
  minliq: import_zod44.z.string().optional(),
  filterSpam: import_zod44.z.string().optional(),
  fetchUntrackedHistory: import_zod44.z.string().optional(),
  fetchAllChains: import_zod44.z.string().optional(),
  shouldFetchPriceChange: import_zod44.z.string().optional(),
  backfillTransfers: import_zod44.z.string().optional()
});
var WalletHistoryResponseSchema = import_zod44.z.object({
  data: import_zod44.z.object({
    wallets: import_zod44.z.array(import_zod44.z.string()),
    balance_usd: import_zod44.z.number(),
    balance_history: import_zod44.z.array(import_zod44.z.tuple([import_zod44.z.number(), import_zod44.z.number()])),
    backfill_status: import_zod44.z.enum(["processed", "processing", "pending"]).optional()
  })
});
// src/v1/wallet/WalletLabelSchema.ts
var import_zod45 = require("zod");
var WalletLabelsParamsSchema = import_zod45.z.object({
  walletAddresses: import_zod45.z.union([import_zod45.z.string(), import_zod45.z.array(import_zod45.z.string()).max(100)]).optional(),
  tokenAddress: import_zod45.z.string().optional()
});
var WalletLabelsResponseSchema = import_zod45.z.object({
  data: import_zod45.z.array(import_zod45.z.object({
    walletAddress: import_zod45.z.string(),
    labels: import_zod45.z.array(import_zod45.z.string())
  }))
});
// src/v1/wallet/WalletNFTSchema.ts
var import_zod46 = require("zod");
var WalletNFTParamsSchema = import_zod46.z.object({
  wallet: import_zod46.z.string().min(1),
  blockchains: import_zod46.z.string().optional(),
  page: import_zod46.z.string().optional().default("1"),
  offset: import_zod46.z.string().optional().default("0"),
  limit: import_zod46.z.string().optional().default("100"),
  pagination: import_zod46.z.string().optional().default("false")
});
var WalletNFTResponseSchema = import_zod46.z.object({
  data: import_zod46.z.array(import_zod46.z.object({
    token_address: import_zod46.z.string(),
    token_id: import_zod46.z.string(),
    token_uri: import_zod46.z.string(),
    amount: import_zod46.z.string(),
    owner_of: import_zod46.z.string(),
    name: import_zod46.z.string(),
    symbol: import_zod46.z.string(),
    blockchain: import_zod46.z.string(),
    chain_id: import_zod46.z.string()
  })),
  pagination: import_zod46.z.object({
    total: import_zod46.z.number(),
    page: import_zod46.z.number(),
    offset: import_zod46.z.number(),
    limit: import_zod46.z.number()
  }).nullable()
});
var NFTMetadataParamsSchema = import_zod46.z.object({
  address: import_zod46.z.string(),
  blockchain: import_zod46.z.string()
});
var NFTMetadataResponseSchema = import_zod46.z.object({
  name: import_zod46.z.string(),
  symbol: import_zod46.z.string(),
  address: import_zod46.z.string(),
  chain_id: import_zod46.z.string(),
  logo: import_zod46.z.string(),
  website: import_zod46.z.string(),
  telegram: import_zod46.z.string(),
  twitter: import_zod46.z.string(),
  discord: import_zod46.z.string(),
  totalSupply: import_zod46.z.bigint(),
  URI: import_zod46.z.string()
});
// src/v1/wallet/WalletPortfolioSchema.ts
var import_zod47 = require("zod");
var WalletTokenTypeValues = ["2020", "2022", "erc20", "trc10", "trc20"];
var WalletTokenTypeSchema = import_zod47.z.enum(WalletTokenTypeValues).nullable().optional();
var ContractBalanceSecuritySchema = SecurityFlagsSchema.extend({
  frozen: import_zod47.z.boolean().optional()
}).nullable().optional();
var PortfolioResponseSchema = import_zod47.z.object({
  data: import_zod47.z.object({
    total_wallet_balance: import_zod47.z.number(),
    wallets: import_zod47.z.array(import_zod47.z.string()),
    assets: import_zod47.z.array(import_zod47.z.object({
      contracts_balances: import_zod47.z.array(import_zod47.z.object({
        address: import_zod47.z.string(),
        balance: import_zod47.z.number(),
        balanceRaw: import_zod47.z.string(),
        chainId: import_zod47.z.string(),
        decimals: import_zod47.z.number(),
        tokenType: WalletTokenTypeSchema,
        security: ContractBalanceSecuritySchema,
        lamports: import_zod47.z.string().nullable().optional(),
        tokenAccount: import_zod47.z.string().nullable().optional()
      })),
      cross_chain_balances: import_zod47.z.record(import_zod47.z.string(), import_zod47.z.object({
        balance: import_zod47.z.number(),
        balanceRaw: import_zod47.z.string(),
        chainId: import_zod47.z.string(),
        address: import_zod47.z.string()
      })),
      price_change_24h: import_zod47.z.number(),
      estimated_balance: import_zod47.z.number(),
      price: import_zod47.z.number(),
      liquidity: import_zod47.z.number(),
      token_balance: import_zod47.z.number(),
      allocation: import_zod47.z.number(),
      asset: import_zod47.z.object({
        id: import_zod47.z.number().nullable(),
        name: import_zod47.z.string(),
        symbol: import_zod47.z.string(),
        logo: import_zod47.z.string().nullable().optional(),
        decimals: import_zod47.z.array(import_zod47.z.bigint()),
        contracts: import_zod47.z.array(import_zod47.z.string()),
        blockchains: import_zod47.z.array(import_zod47.z.string())
      }),
      wallets: import_zod47.z.array(import_zod47.z.string()),
      realized_pnl: import_zod47.z.number().optional(),
      unrealized_pnl: import_zod47.z.number().optional(),
      price_bought: import_zod47.z.number().optional(),
      total_invested: import_zod47.z.number().optional(),
      min_buy_price: import_zod47.z.number().optional(),
      max_buy_price: import_zod47.z.number().optional()
    })),
    win_rate: import_zod47.z.number().optional(),
    tokens_distribution: import_zod47.z.object({
      "10x+": import_zod47.z.number(),
      "4x - 10x": import_zod47.z.number(),
      "2x - 4x": import_zod47.z.number(),
      "10% - 2x": import_zod47.z.number(),
      "-10% - 10%": import_zod47.z.number(),
      "-50% - -10%": import_zod47.z.number(),
      "-100% - -50%": import_zod47.z.number()
    }).optional(),
    pnl_history: import_zod47.z.object({
      "1y": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ])),
      "7d": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ])),
      "24h": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ])),
      "30d": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ]))
    }).optional(),
    total_realized_pnl: import_zod47.z.number().optional(),
    total_unrealized_pnl: import_zod47.z.number().optional(),
    total_pnl_history: import_zod47.z.object({
      "24h": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      }),
      "7d": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      }),
      "30d": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      }),
      "1y": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      })
    }).optional(),
    balances_length: import_zod47.z.number()
  }),
  backfill_status: import_zod47.z.enum(["processed", "processing", "pending"]).optional()
});
var MultiPortfolioResponseSchema = import_zod47.z.object({
  data: import_zod47.z.array(import_zod47.z.object({
    total_wallet_balance: import_zod47.z.number(),
    wallets: import_zod47.z.array(import_zod47.z.string()),
    assets: import_zod47.z.array(import_zod47.z.object({
      contracts_balances: import_zod47.z.array(import_zod47.z.object({
        address: import_zod47.z.string(),
        balance: import_zod47.z.number(),
        balanceRaw: import_zod47.z.string(),
        chainId: import_zod47.z.string(),
        decimals: import_zod47.z.number(),
        tokenType: WalletTokenTypeSchema,
        security: ContractBalanceSecuritySchema,
        lamports: import_zod47.z.string().nullable().optional(),
        tokenAccount: import_zod47.z.string().nullable().optional()
      })),
      cross_chain_balances: import_zod47.z.record(import_zod47.z.string(), import_zod47.z.object({
        balance: import_zod47.z.number(),
        balanceRaw: import_zod47.z.string(),
        chainId: import_zod47.z.string(),
        address: import_zod47.z.string()
      })),
      price_change_24h: import_zod47.z.number(),
      estimated_balance: import_zod47.z.number(),
      price: import_zod47.z.number(),
      liquidity: import_zod47.z.number(),
      token_balance: import_zod47.z.number(),
      allocation: import_zod47.z.number(),
      asset: import_zod47.z.object({
        id: import_zod47.z.number().nullable(),
        name: import_zod47.z.string(),
        symbol: import_zod47.z.string(),
        logo: import_zod47.z.string().nullable().optional(),
        decimals: import_zod47.z.array(import_zod47.z.bigint()),
        contracts: import_zod47.z.array(import_zod47.z.string()),
        blockchains: import_zod47.z.array(import_zod47.z.string())
      }),
      wallets: import_zod47.z.array(import_zod47.z.string()),
      realized_pnl: import_zod47.z.number().optional(),
      unrealized_pnl: import_zod47.z.number().optional(),
      price_bought: import_zod47.z.number().optional(),
      total_invested: import_zod47.z.number().optional(),
      min_buy_price: import_zod47.z.number().optional(),
      max_buy_price: import_zod47.z.number().optional()
    })),
    win_rate: import_zod47.z.number().optional(),
    tokens_distribution: import_zod47.z.object({
      "10x+": import_zod47.z.number(),
      "4x - 10x": import_zod47.z.number(),
      "2x - 4x": import_zod47.z.number(),
      "10% - 2x": import_zod47.z.number(),
      "-10% - 10%": import_zod47.z.number(),
      "-50% - -10%": import_zod47.z.number(),
      "-100% - -50%": import_zod47.z.number()
    }).optional(),
    pnl_history: import_zod47.z.object({
      "1y": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ])),
      "7d": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ])),
      "24h": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ])),
      "30d": import_zod47.z.array(import_zod47.z.tuple([
        import_zod47.z.date(),
        import_zod47.z.object({
          realized: import_zod47.z.number(),
          unrealized: import_zod47.z.number()
        })
      ]))
    }).optional(),
    total_realized_pnl: import_zod47.z.number().optional(),
    total_unrealized_pnl: import_zod47.z.number().optional(),
    total_pnl_history: import_zod47.z.object({
      "24h": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      }),
      "7d": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      }),
      "30d": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      }),
      "1y": import_zod47.z.object({
        realized: import_zod47.z.number(),
        unrealized: import_zod47.z.number()
      })
    }).optional(),
    balances_length: import_zod47.z.number()
  })),
  backfill_status: import_zod47.z.enum(["processed", "processing", "pending"]).optional()
});
var PositionSchema = import_zod47.z.array(import_zod47.z.object({
  type: import_zod47.z.string(),
  name: import_zod47.z.string(),
  chain_id: import_zod47.z.string(),
  contract: import_zod47.z.string(),
  created_at: import_zod47.z.string().nullable(),
  tokens: import_zod47.z.array(import_zod47.z.object({
    name: import_zod47.z.string(),
    symbol: import_zod47.z.string(),
    contract: import_zod47.z.string(),
    amount: import_zod47.z.string(),
    amountRaw: import_zod47.z.string(),
    decimals: import_zod47.z.string(),
    amount_usd: import_zod47.z.string(),
    logo: import_zod47.z.string().nullable(),
    price_usd: import_zod47.z.string().nullable()
  })),
  rewards: import_zod47.z.array(import_zod47.z.object({
    name: import_zod47.z.string(),
    symbol: import_zod47.z.string(),
    contract: import_zod47.z.string(),
    amount: import_zod47.z.string(),
    amountRaw: import_zod47.z.string(),
    decimals: import_zod47.z.string(),
    amount_usd: import_zod47.z.string(),
    price_usd: import_zod47.z.string()
  })).optional(),
  extra: import_zod47.z.object({
    lp_token_amount: import_zod47.z.string().optional(),
    position_staked_amount: import_zod47.z.string().optional(),
    factory: import_zod47.z.string().optional(),
    share_of_pool: import_zod47.z.string().optional(),
    type: import_zod47.z.enum(["supply", "borrow"]).optional(),
    health_factor: import_zod47.z.number().optional(),
    reserve0: import_zod47.z.string().optional(),
    reserve1: import_zod47.z.string().optional(),
    reserve_usd: import_zod47.z.number().optional()
  }).optional()
}));
var DefiPositionsResponseSchema = import_zod47.z.object({
  data: import_zod47.z.array(import_zod47.z.object({
    protocol: import_zod47.z.object({
      name: import_zod47.z.string(),
      id: import_zod47.z.string(),
      logo: import_zod47.z.string(),
      url: import_zod47.z.string()
    }),
    positions: PositionSchema
  })),
  wallets: import_zod47.z.array(import_zod47.z.string())
});
var PortfolioParamsSchema = import_zod47.z.object({
  wallet: import_zod47.z.string().optional(),
  wallets: import_zod47.z.string().optional(),
  portfolio: import_zod47.z.string().optional(),
  blockchains: import_zod47.z.string().optional(),
  asset: import_zod47.z.string().optional(),
  cache: import_zod47.z.string().optional(),
  stale: import_zod47.z.string().optional(),
  recheck_contract: import_zod47.z.string().optional(),
  from: import_zod47.z.string().optional(),
  to: import_zod47.z.string().optional(),
  portfolio_settings: import_zod47.z.string().optional(),
  unlistedAssets: import_zod47.z.string().optional(),
  period: import_zod47.z.string().optional(),
  accuracy: import_zod47.z.string().optional(),
  testnet: import_zod47.z.string().optional(),
  minliq: import_zod47.z.string().optional(),
  filterSpam: import_zod47.z.string().optional(),
  fetchUntrackedHistory: import_zod47.z.string().optional(),
  fetchAllChains: import_zod47.z.string().optional(),
  shouldFetchPriceChange: import_zod47.z.string().optional(),
  backfillTransfers: import_zod47.z.string().optional(),
  fetchEmptyBalances: import_zod47.z.string().optional(),
  pnl: import_zod47.z.string().optional()
});
var PortfolioDefiParamsSchema = import_zod47.z.object({
  wallet: import_zod47.z.string().optional(),
  wallets: import_zod47.z.string().optional(),
  blockchains: import_zod47.z.string().optional(),
  testnet: import_zod47.z.string().optional(),
  unlistedAssets: import_zod47.z.string().optional()
});
// src/v1/wallet/WalletSmartMoneySchema.ts
var import_zod48 = require("zod");
var WalletSmartMoneyResponseSchema = import_zod48.z.object({
  data: import_zod48.z.array(import_zod48.z.object({
    wallet_address: import_zod48.z.string(),
    realized_pnl: import_zod48.z.number(),
    unrealized_pnl: import_zod48.z.number(),
    txns_count: import_zod48.z.number(),
    volume: import_zod48.z.number(),
    blockchains: import_zod48.z.array(import_zod48.z.string()),
    win_rate: import_zod48.z.number(),
    tokens_distribution: import_zod48.z.object({
      "10x+": import_zod48.z.number(),
      "4x - 10x": import_zod48.z.number(),
      "2x - 4x": import_zod48.z.number(),
      "10% - 2x": import_zod48.z.number(),
      "-10% - 10%": import_zod48.z.number(),
      "-50% - -10%": import_zod48.z.number(),
      "-100% - -50%": import_zod48.z.number()
    }),
    top_3_tokens: import_zod48.z.array(import_zod48.z.record(import_zod48.z.string(), import_zod48.z.number()))
  }))
});
// src/v1/wallet/WalletTradesSchema.ts
var import_zod49 = require("zod");
var WalletTradesParamsSchema = import_zod49.z.object({
  limit: import_zod49.z.string().optional().default("100"),
  offset: import_zod49.z.string().optional().default("0"),
  page: import_zod49.z.string().optional().default("1"),
  order: import_zod49.z.string().optional(),
  wallet: import_zod49.z.string().optional(),
  wallets: import_zod49.z.string().optional(),
  from: import_zod49.z.string().optional(),
  to: import_zod49.z.string().optional()
});
var WalletTradesResponseSchema = import_zod49.z.object({
  data: import_zod49.z.array(import_zod49.z.object({
    chain_id: import_zod49.z.string(),
    swap_type: import_zod49.z.string(),
    raw_amount0: import_zod49.z.string(),
    raw_amount1: import_zod49.z.string(),
    raw_post_balance0: import_zod49.z.string().optional().nullable(),
    raw_post_balance1: import_zod49.z.string().optional().nullable(),
    raw_pre_balance0: import_zod49.z.string().optional().nullable(),
    raw_pre_balance1: import_zod49.z.string().optional().nullable(),
    amount0: import_zod49.z.coerce.number(),
    amount1: import_zod49.z.coerce.number(),
    ratio: import_zod49.z.number(),
    price_usd_token0: import_zod49.z.number(),
    price_usd_token1: import_zod49.z.number(),
    date: import_zod49.z.date(),
    amount_usd: import_zod49.z.number(),
    pool_address: import_zod49.z.string(),
    token0_address: import_zod49.z.string(),
    token1_address: import_zod49.z.string(),
    transaction_sender_address: import_zod49.z.string(),
    transaction_hash: import_zod49.z.string(),
    base: import_zod49.z.string(),
    quote: import_zod49.z.string(),
    side: import_zod49.z.string(),
    amount_quote: import_zod49.z.coerce.number(),
    amount_base: import_zod49.z.coerce.number(),
    amount_quote_raw: import_zod49.z.string(),
    amount_base_raw: import_zod49.z.string(),
    base_token: TokenDetailsOutput.optional().nullable(),
    labels: import_zod49.z.array(import_zod49.z.string())
  }))
});
// src/v1/wallet/WalletTransactionSchema.ts
var import_zod50 = require("zod");
var WalletTransactionsParamsSchema = import_zod50.z.object({
  limit: import_zod50.z.string().optional(),
  offset: import_zod50.z.string().optional(),
  page: import_zod50.z.string().optional(),
  order: import_zod50.z.string().optional(),
  cache: import_zod50.z.string().optional(),
  stale: import_zod50.z.string().optional(),
  wallet: import_zod50.z.string().optional(),
  wallets: import_zod50.z.string().optional(),
  recheckContract: import_zod50.z.string().optional(),
  from: import_zod50.z.string().optional(),
  to: import_zod50.z.string().optional(),
  asset: import_zod50.z.string().optional(),
  trades: import_zod50.z.string().optional(),
  transactions: import_zod50.z.string().optional(),
  blockchains: import_zod50.z.string().optional(),
  unlistedAssets: import_zod50.z.string().optional(),
  onlyAssets: import_zod50.z.string().optional(),
  pagination: import_zod50.z.string().optional(),
  filterSpam: import_zod50.z.string().optional()
});
var WalletRawTransactionsParamsSchema = import_zod50.z.object({
  limit: import_zod50.z.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  offset: import_zod50.z.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  page: import_zod50.z.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  order: import_zod50.z.string().optional(),
  cache: import_zod50.z.string().optional().transform((val) => val === "true"),
  stale: import_zod50.z.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  wallet: import_zod50.z.string().optional(),
  wallets: import_zod50.z.string().optional(),
  from: import_zod50.z.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  to: import_zod50.z.string().optional().transform((val) => val !== undefined ? Number(val) : undefined),
  blockchains: import_zod50.z.string().optional(),
  pagination: import_zod50.z.string().optional().transform((val) => val === "true")
}).strict();
var WalletTransactionsResponseSchema = import_zod50.z.object({
  data: import_zod50.z.object({
    transactions: import_zod50.z.array(import_zod50.z.object({
      id: import_zod50.z.string(),
      timestamp: import_zod50.z.number(),
      from: import_zod50.z.string().nullable(),
      to: import_zod50.z.string().nullable(),
      contract: import_zod50.z.string().nullable(),
      hash: import_zod50.z.string(),
      amount_usd: import_zod50.z.number(),
      amount: import_zod50.z.number(),
      block_number: import_zod50.z.number(),
      type: import_zod50.z.string(),
      blockchain: import_zod50.z.string(),
      tx_cost: import_zod50.z.number(),
      transaction: import_zod50.z.object({
        hash: import_zod50.z.string(),
        chainId: import_zod50.z.string(),
        fees: import_zod50.z.string(),
        feesUSD: import_zod50.z.number(),
        date: import_zod50.z.date()
      }),
      asset: import_zod50.z.object({
        id: import_zod50.z.number().nullable(),
        name: import_zod50.z.string(),
        symbol: import_zod50.z.string(),
        decimals: import_zod50.z.number(),
        totalSupply: import_zod50.z.number(),
        circulatingSupply: import_zod50.z.number(),
        price: import_zod50.z.number(),
        liquidity: import_zod50.z.number(),
        priceChange24hPercent: import_zod50.z.number(),
        marketCapUSD: import_zod50.z.number(),
        logo: import_zod50.z.string().nullable(),
        nativeChainId: import_zod50.z.string().nullable(),
        contract: import_zod50.z.string().nullable()
      })
    })),
    wallets: import_zod50.z.array(import_zod50.z.string())
  }),
  details: import_zod50.z.null(),
  pagination: import_zod50.z.object({
    total: import_zod50.z.number(),
    page: import_zod50.z.number(),
    offset: import_zod50.z.number(),
    limit: import_zod50.z.number()
  }).nullable()
});
var RawTransactionSchema = import_zod50.z.object({
  id: import_zod50.z.bigint(),
  timestamp: import_zod50.z.number(),
  from: import_zod50.z.string().nullable(),
  to: import_zod50.z.string().nullable(),
  contract: import_zod50.z.string().nullable(),
  hash: import_zod50.z.string(),
  amount_usd: import_zod50.z.number(),
  amount: import_zod50.z.number(),
  block_number: import_zod50.z.number(),
  type: import_zod50.z.string(),
  blockchain: import_zod50.z.string(),
  tx_cost: import_zod50.z.number(),
  transaction: import_zod50.z.object({
    hash: import_zod50.z.string(),
    chainId: import_zod50.z.string(),
    fees: import_zod50.z.string(),
    feesUSD: import_zod50.z.number(),
    date: import_zod50.z.date()
  }),
  asset: import_zod50.z.object({
    id: import_zod50.z.number().nullable(),
    name: import_zod50.z.string(),
    symbol: import_zod50.z.string(),
    totalSupply: import_zod50.z.number(),
    circulatingSupply: import_zod50.z.number(),
    price: import_zod50.z.number(),
    liquidity: import_zod50.z.number(),
    priceChange24hPercent: import_zod50.z.number(),
    marketCapUSD: import_zod50.z.number(),
    logo: import_zod50.z.string().nullable(),
    nativeChainId: import_zod50.z.string().nullable(),
    contract: import_zod50.z.string().nullable()
  })
});
var UnifiedTransactionSchema = import_zod50.z.object({
  chain_id: import_zod50.z.string(),
  hash: import_zod50.z.string().default(""),
  method: import_zod50.z.string().optional(),
  from: import_zod50.z.string().default(""),
  to: import_zod50.z.string().default(""),
  native_amount: import_zod50.z.string().default("0"),
  name: import_zod50.z.string().default("Unknown"),
  logo: import_zod50.z.string().optional(),
  amount: import_zod50.z.string().default("0"),
  token: import_zod50.z.string().default(""),
  symbol: import_zod50.z.string().optional(),
  timestamp: import_zod50.z.string().default(""),
  block_number: import_zod50.z.number().optional(),
  txn_fees: import_zod50.z.string().default("0"),
  status: import_zod50.z.boolean()
});
var WalletRawTransactionsResponseSchema = import_zod50.z.object({
  raw: import_zod50.z.array(RawTransactionSchema),
  unified: import_zod50.z.array(UnifiedTransactionSchema),
  wallets: import_zod50.z.string().array(),
  pagination: import_zod50.z.object({
    total: import_zod50.z.number(),
    page: import_zod50.z.number(),
    offset: import_zod50.z.number(),
    limit: import_zod50.z.number()
  }).nullable()
});
var RawNFTTransactionSchema = import_zod50.z.object({
  combined_id: import_zod50.z.string(),
  combined_date: import_zod50.z.date().transform((d) => d.toISOString()),
  contract_address: import_zod50.z.string().nullable(),
  from_address: import_zod50.z.string().nullable(),
  to_address: import_zod50.z.string().nullable(),
  chain_id: import_zod50.z.string(),
  token_id: import_zod50.z.string().nullable(),
  fees: import_zod50.z.string().nullable(),
  fees_usd: import_zod50.z.number().nullable(),
  block_height: import_zod50.z.number().nullable(),
  transaction_hash: import_zod50.z.string(),
  raw_type: import_zod50.z.enum(["sell", "buy"])
});
var UnifiedNFTTransactionSchema = import_zod50.z.object({
  chain_id: import_zod50.z.string(),
  hash: import_zod50.z.string(),
  method: import_zod50.z.string().optional(),
  from: import_zod50.z.string(),
  to: import_zod50.z.string(),
  amount: import_zod50.z.string().optional(),
  token: import_zod50.z.string(),
  symbol: import_zod50.z.string().optional(),
  tokenId: import_zod50.z.string().nullable(),
  timestamp: import_zod50.z.date().transform((d) => d.toISOString()),
  block_number: import_zod50.z.number().nullable(),
  txn_fees: import_zod50.z.string().nullable(),
  status: import_zod50.z.boolean()
});
var WalletNFTTransactionsResponseSchema = import_zod50.z.object({
  raw: import_zod50.z.array(RawNFTTransactionSchema),
  unified: import_zod50.z.array(UnifiedNFTTransactionSchema),
  wallets: import_zod50.z.string().array(),
  pagination: import_zod50.z.object({
    total: import_zod50.z.number(),
    page: import_zod50.z.number(),
    offset: import_zod50.z.number(),
    limit: import_zod50.z.number()
  }).nullable()
}).strict();
// src/v1/webhook/WebhookSchema.ts
var import_zod51 = require("zod");
var BaseFilter = import_zod51.z.object({
  eq: import_zod51.z.tuple([import_zod51.z.string(), import_zod51.z.union([import_zod51.z.string(), import_zod51.z.number(), import_zod51.z.boolean(), import_zod51.z.null()])]).optional(),
  neq: import_zod51.z.tuple([import_zod51.z.string(), import_zod51.z.union([import_zod51.z.string(), import_zod51.z.number(), import_zod51.z.boolean(), import_zod51.z.null()])]).optional(),
  lt: import_zod51.z.tuple([import_zod51.z.string(), import_zod51.z.coerce.number()]).optional(),
  lte: import_zod51.z.tuple([import_zod51.z.string(), import_zod51.z.coerce.number()]).optional(),
  gt: import_zod51.z.tuple([import_zod51.z.string(), import_zod51.z.coerce.number()]).optional(),
  gte: import_zod51.z.tuple([import_zod51.z.string(), import_zod51.z.coerce.number()]).optional(),
  in: import_zod51.z.tuple([import_zod51.z.string(), import_zod51.z.union([import_zod51.z.string(), import_zod51.z.number(), import_zod51.z.boolean(), import_zod51.z.null()])]).optional()
});
var Filter = BaseFilter.and(import_zod51.z.union([
  BaseFilter.extend({ and: import_zod51.z.undefined(), or: import_zod51.z.undefined() }),
  BaseFilter.extend({ and: import_zod51.z.array(import_zod51.z.lazy(() => Filter)), or: import_zod51.z.undefined() }),
  BaseFilter.extend({ and: import_zod51.z.undefined(), or: import_zod51.z.array(import_zod51.z.lazy(() => Filter)) })
]));
function countOperations(filter) {
  if (!filter)
    return 0;
  let count = 0;
  for (const key of ["eq", "neq", "lt", "lte", "gt", "gte", "in"]) {
    if (filter[key])
      count += 1;
  }
  if ("and" in filter && Array.isArray(filter.and)) {
    for (const child of filter.and) {
      count += countOperations(child);
    }
  }
  if ("or" in filter && Array.isArray(filter.or)) {
    for (const child of filter.or) {
      count += countOperations(child);
    }
  }
  return count;
}
var FilterWithLimit = Filter.superRefine((val, ctx) => {
  const total = countOperations(val);
  const max = 1000;
  if (total > max) {
    ctx.addIssue({
      code: import_zod51.z.ZodIssueCode.custom,
      message: `Your filter contains ${total} leaf operations, exceeding the maximum of ${max}. Only leaf conditions like "eq", "neq", "lt", "lte", "gt", "gte", "in" are counted; logical operators ("and", "or") are ignored.`
    });
  }
});
var UpdateWebhook = import_zod51.z.object({
  streamId: import_zod51.z.string(),
  apiKey: import_zod51.z.string(),
  mode: import_zod51.z.enum(["replace", "merge"]).default("replace"),
  filters: FilterWithLimit.optional()
});
var CreateWebhook = import_zod51.z.object({
  name: import_zod51.z.string(),
  chainIds: import_zod51.z.array(import_zod51.z.string()),
  events: import_zod51.z.array(import_zod51.z.string()),
  apiKey: import_zod51.z.string(),
  filters: FilterWithLimit.optional(),
  url: import_zod51.z.string().url()
}).strict();
var listWebhooksQueryParams = import_zod51.z.object({
  apiKey: import_zod51.z.string().trim().min(1, { message: "API key is required" })
});
var deleteWebhookParams = import_zod51.z.object({
  id: import_zod51.z.string().trim().min(1, { message: "Webhook ID is required" })
});
var WebhookResponseSchema = import_zod51.z.object({
  id: import_zod51.z.string(),
  name: import_zod51.z.string(),
  chainIds: import_zod51.z.array(import_zod51.z.string()),
  events: import_zod51.z.array(import_zod51.z.string()),
  filters: import_zod51.z.any().nullable().optional(),
  webhookUrl: import_zod51.z.string().url(),
  apiKey: import_zod51.z.string(),
  createdAt: import_zod51.z.union([import_zod51.z.string(), import_zod51.z.date()]).transform((val) => val instanceof Date ? val.toISOString() : val)
});
var CreateWebhookResponseSchema = WebhookResponseSchema.extend({
  webhookSecret: import_zod51.z.string()
});
var listWebhookResponseSchema = import_zod51.z.object({
  success: import_zod51.z.boolean(),
  count: import_zod51.z.number(),
  data: import_zod51.z.array(WebhookResponseSchema)
});
var updateWebhookResponseSchema = import_zod51.z.object({
  success: import_zod51.z.boolean(),
  message: import_zod51.z.string(),
  data: WebhookResponseSchema
});
var deleteWebhookResponseSchema = import_zod51.z.object({
  success: import_zod51.z.boolean(),
  message: import_zod51.z.string(),
  id: import_zod51.z.string()
});
// src/v2/asset/AssetDetailsSchema.ts
var import_zod52 = require("zod");
var AssetTokenDetailsOutput = TokenDetailsOutput;
var AssetDataOutput = import_zod52.z.object({
  id: import_zod52.z.number(),
  name: import_zod52.z.string(),
  symbol: import_zod52.z.string(),
  logo: import_zod52.z.string().nullable(),
  description: import_zod52.z.string().nullable(),
  rank: import_zod52.z.number().nullable(),
  nativeChainId: import_zod52.z.string().nullable(),
  priceUSD: import_zod52.z.number().nullable(),
  totalSupply: import_zod52.z.number().default(0),
  circulatingSupply: import_zod52.z.number().default(0),
  marketCapUSD: import_zod52.z.number().default(0),
  marketCapDilutedUSD: import_zod52.z.number().default(0),
  athPriceDate: import_zod52.z.coerce.date().nullable(),
  athPriceUSD: import_zod52.z.number().nullable(),
  atlPriceDate: import_zod52.z.coerce.date().nullable(),
  atlPriceUSD: import_zod52.z.number().nullable(),
  isStablecoin: import_zod52.z.boolean().default(false),
  createdAt: import_zod52.z.coerce.date(),
  listedAt: import_zod52.z.coerce.date().nullable(),
  socials: import_zod52.z.object({
    audit: import_zod52.z.string().nullable(),
    github: import_zod52.z.string().nullable(),
    twitter: import_zod52.z.string().nullable(),
    website: import_zod52.z.string().nullable(),
    kyc: import_zod52.z.string().nullable(),
    chat: import_zod52.z.string().nullable(),
    discord: import_zod52.z.string().nullable()
  }).nullable()
});
var AssetDetailsDataOutput = import_zod52.z.object({
  asset: AssetDataOutput,
  tokens: import_zod52.z.array(TokenDetailsOutput.or(import_zod52.z.object({ error: import_zod52.z.string().optional() })).nullable()),
  tokensCount: import_zod52.z.number()
});
var AssetDetailsParamsSchema = import_zod52.z.object({
  id: import_zod52.z.coerce.number().optional(),
  address: import_zod52.z.string().optional(),
  blockchain: import_zod52.z.string().optional(),
  tokensLimit: import_zod52.z.coerce.number().min(1).max(50).default(10),
  instanceTracking: import_zod52.z.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, import_zod52.z.boolean().optional())
}).refine((data) => data.id !== undefined || data.address !== undefined && data.blockchain !== undefined, {
  message: "Either id OR (address AND blockchain) must be provided"
});
var AssetDetailsResponseSchema = import_zod52.z.object({
  data: AssetDetailsDataOutput,
  hostname: import_zod52.z.string().optional()
});
var AssetDetailsItemSchema = import_zod52.z.object({
  id: import_zod52.z.coerce.number().optional(),
  address: import_zod52.z.string().optional(),
  blockchain: import_zod52.z.string().optional(),
  tokensLimit: import_zod52.z.coerce.number().min(1).max(50).default(10)
});
var AssetDetailsBatchParamsSchema = import_zod52.z.array(AssetDetailsItemSchema).min(1, "At least one asset is required").max(10, "Maximum 10 assets per request");
var AssetDetailsBatchResponseSchema = import_zod52.z.object({
  payload: import_zod52.z.array(AssetDetailsDataOutput.or(import_zod52.z.object({ error: import_zod52.z.string().optional() })).nullable()),
  hostname: import_zod52.z.string().optional()
});
// src/v2/asset/AssetPriceHistorySchema.ts
var import_zod53 = require("zod");
var AssetPriceHistoryItemSchema = import_zod53.z.object({
  address: import_zod53.z.string().optional(),
  chainId: import_zod53.z.string().optional(),
  id: import_zod53.z.coerce.number().optional(),
  period: import_zod53.z.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return;
  }),
  from: import_zod53.z.coerce.number().default(0),
  to: import_zod53.z.coerce.number().default(Date.now)
});
var AssetPriceHistoryParamsSchema = AssetPriceHistoryItemSchema.refine((data) => {
  return data.id !== undefined || data.address !== undefined;
}, {
  message: "Either id or address must be provided"
}).refine((data) => {
  if (data.address !== undefined && data.chainId === undefined) {
    return false;
  }
  return true;
}, {
  message: "chainId is required when using address"
});
var AssetPriceHistoryArraySchema = import_zod53.z.array(AssetPriceHistoryItemSchema).min(1, "At least one asset is required").max(10, "Maximum 10 assets per request").refine((assets) => {
  return assets.every((asset) => asset.id !== undefined || asset.address !== undefined);
}, {
  message: "Each asset must have either id or address"
}).refine((assets) => {
  return assets.every((asset) => {
    if (asset.address !== undefined && asset.chainId === undefined) {
      return false;
    }
    return true;
  });
}, {
  message: "chainId is required when using address"
});
var AssetPriceHistoryBatchParamsSchema = import_zod53.z.union([
  AssetPriceHistoryArraySchema,
  import_zod53.z.object({ assets: AssetPriceHistoryArraySchema })
]);
var AssetPriceHistoryDataSchema = import_zod53.z.object({
  priceHistory: import_zod53.z.array(import_zod53.z.array(import_zod53.z.number().nullable())),
  id: import_zod53.z.number().optional(),
  name: import_zod53.z.string().optional(),
  symbol: import_zod53.z.string().optional(),
  chainId: import_zod53.z.string().optional(),
  address: import_zod53.z.string().optional(),
  error: import_zod53.z.string().optional()
});
var AssetPriceHistoryResponseSchema = import_zod53.z.object({
  data: AssetPriceHistoryDataSchema
});
var AssetPriceHistoryBatchResponseSchema = import_zod53.z.object({
  data: import_zod53.z.array(AssetPriceHistoryDataSchema)
});
// src/v2/explorer/BlockQuerySchema.ts
var import_zod54 = require("zod");
var BlockQueryParams = import_zod54.z.object({
  address: import_zod54.z.string(),
  blockchain: import_zod54.z.string()
});
var BlockQueryParamsSchema = BlockQueryParams;
// src/v2/market/MarketDetailsSchema.ts
var import_zod57 = require("zod");

// src/utils/schemas/MarketDetailsOutput.ts
var import_zod56 = require("zod");

// src/v2/perp/PerpModels.ts
var import_zod55 = require("zod");
var PerpDataRedisSchemaBase = import_zod55.z.object({
  markPriceUSD: import_zod55.z.coerce.number().default(0),
  markPriceQuote: import_zod55.z.coerce.number().default(0),
  oraclePriceUSD: import_zod55.z.coerce.number().default(0),
  isDisabled: import_zod55.z.coerce.boolean(),
  isOpen: import_zod55.z.coerce.boolean(),
  assetClass: import_zod55.z.string().transform((value) => !value ? "crypto" : value),
  spreadPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeShort1hPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeShort1hPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeLong1hPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeLong1hPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeShort8hPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeShort8hPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeLong8hPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeLong8hPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeShort24hPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeShort24hPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeLong24hPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeLong24hPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeShort1yPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeShort1yPercentage: import_zod55.z.coerce.number().default(0),
  fundingFeeLong1yPercentage: import_zod55.z.coerce.number().default(0),
  totalFeeLong1yPercentage: import_zod55.z.coerce.number().default(0),
  collateral: import_zod55.z.string().optional(),
  marketId: import_zod55.z.string()
});
var PerpDataRedisSchemaFlatten = PerpDataRedisSchemaBase.extend({
  oiCollateral_oiLong: import_zod55.z.coerce.number().default(0),
  oiCollateral_oiShort: import_zod55.z.coerce.number().default(0),
  oiCollateral_max: import_zod55.z.coerce.number().optional(),
  leverage_min: import_zod55.z.coerce.number().default(0),
  leverage_max: import_zod55.z.coerce.number().default(0),
  defaultTradingFees_makerFeeBps: import_zod55.z.coerce.number().default(0),
  defaultTradingFees_takerFeeBps: import_zod55.z.coerce.number().default(0),
  liquidationParams_maxLiqSpreadPercentage: import_zod55.z.coerce.number().default(0),
  liquidationParams_startLiqThresholdPercentage: import_zod55.z.coerce.number().default(0),
  liquidationParams_endLiqThresholdPercentage: import_zod55.z.coerce.number().default(0),
  liquidationParams_startLeverage: import_zod55.z.coerce.number().default(0),
  liquidationParams_endLeverage: import_zod55.z.coerce.number().default(0)
});
var PerpDataRedisSchemaNested = PerpDataRedisSchemaBase.extend({
  defaultTradingFees: import_zod55.z.object({
    makerFeeBps: import_zod55.z.number().default(0),
    takerFeeBps: import_zod55.z.number().default(0)
  }),
  oiCollateral: import_zod55.z.object({
    oiLong: import_zod55.z.number().default(0),
    oiShort: import_zod55.z.number().default(0),
    max: import_zod55.z.number().optional()
  }),
  leverage: import_zod55.z.object({
    min: import_zod55.z.number().default(0),
    max: import_zod55.z.number().default(0)
  }),
  liquidationParams: import_zod55.z.object({
    maxLiqSpreadPercentage: import_zod55.z.number().default(0),
    startLiqThresholdPercentage: import_zod55.z.number().default(0),
    endLiqThresholdPercentage: import_zod55.z.number().default(0),
    startLeverage: import_zod55.z.number().default(0),
    endLeverage: import_zod55.z.number().default(0)
  })
});
var PerpDataMarketDetailsOutputSchema = PerpDataRedisSchemaNested.omit({ oiCollateral: true }).extend({
  openInterest: import_zod55.z.object({
    longUSD: import_zod55.z.number().default(0),
    longQuoteToken: import_zod55.z.number().default(0),
    shortUSD: import_zod55.z.number().default(0),
    shortQuoteToken: import_zod55.z.number().default(0),
    maxUSD: import_zod55.z.number().optional(),
    maxQuoteToken: import_zod55.z.number().optional()
  })
});

// src/utils/schemas/MarketDetailsOutput.ts
var TokenDetailsSchema = import_zod56.z.object({
  address: import_zod56.z.string(),
  chainId: import_zod56.z.string(),
  symbol: import_zod56.z.string().nullable(),
  name: import_zod56.z.string().nullable(),
  decimals: import_zod56.z.coerce.number().default(0),
  id: import_zod56.z.number().nullable().optional().default(null),
  priceUSD: import_zod56.z.coerce.number().default(0),
  priceToken: import_zod56.z.coerce.number().default(0),
  priceTokenString: import_zod56.z.string(),
  approximateReserveUSD: import_zod56.z.coerce.number().default(0),
  approximateReserveTokenRaw: import_zod56.z.string(),
  approximateReserveToken: import_zod56.z.coerce.number().default(0),
  totalSupply: import_zod56.z.coerce.number().default(0),
  circulatingSupply: import_zod56.z.coerce.number().default(0),
  marketCapUSD: import_zod56.z.coerce.number().optional().default(0),
  marketCapDilutedUSD: import_zod56.z.coerce.number().optional().default(0),
  logo: import_zod56.z.string().nullable(),
  exchange: import_zod56.z.object({
    name: import_zod56.z.string(),
    logo: import_zod56.z.string()
  }).optional(),
  factory: import_zod56.z.string().nullable().optional(),
  source: import_zod56.z.string().nullable().optional(),
  sourceFactory: import_zod56.z.string().nullable().optional(),
  liquidityUSD: import_zod56.z.coerce.number().optional(),
  liquidityMaxUSD: import_zod56.z.coerce.number().optional(),
  bonded: import_zod56.z.boolean().optional(),
  bondingPercentage: import_zod56.z.coerce.number().optional(),
  bondingCurveAddress: import_zod56.z.string().nullable().optional(),
  preBondingFactory: import_zod56.z.string().optional(),
  poolAddress: import_zod56.z.string().optional(),
  blockchain: import_zod56.z.string().optional(),
  type: import_zod56.z.string().optional(),
  deployer: import_zod56.z.string().nullable().optional(),
  createdAt: import_zod56.z.coerce.string().optional(),
  bondedAt: import_zod56.z.coerce.date().nullable(),
  athUSD: import_zod56.z.coerce.number().optional(),
  atlUSD: import_zod56.z.coerce.number().optional(),
  athDate: import_zod56.z.coerce.date().optional(),
  atlDate: import_zod56.z.coerce.date().optional()
}).merge(HoldersStatsSchema);
var MarketDetailsOutput = import_zod56.z.object({
  token0: TokenDetailsSchema.optional(),
  token1: TokenDetailsSchema.optional(),
  base: TokenDetailsSchema,
  quote: TokenDetailsSchema,
  liquidityUSD: import_zod56.z.coerce.number().default(0),
  latestTradeDate: import_zod56.z.coerce.date().nullable(),
  blockchain: import_zod56.z.string(),
  address: import_zod56.z.string(),
  createdAt: import_zod56.z.coerce.date().nullable(),
  type: import_zod56.z.string(),
  exchange: import_zod56.z.object({
    name: import_zod56.z.string(),
    logo: import_zod56.z.string()
  }),
  factory: import_zod56.z.string().nullable(),
  priceUSD: import_zod56.z.coerce.number().optional(),
  priceToken: import_zod56.z.coerce.number().optional(),
  priceTokenString: import_zod56.z.string().optional(),
  baseToken: import_zod56.z.string(),
  quoteToken: import_zod56.z.string(),
  bonded: import_zod56.z.coerce.boolean(),
  bondingPercentage: import_zod56.z.coerce.number().nullable(),
  preBondingPoolAddress: import_zod56.z.string().nullable(),
  sourceFactory: import_zod56.z.string().nullable().optional(),
  totalFeesPaidUSD: import_zod56.z.coerce.number().nullable(),
  totalFeesPaidNativeRaw: import_zod56.z.coerce.string().default("0"),
  priceChange1minPercentage: import_zod56.z.coerce.number().default(0),
  priceChange5minPercentage: import_zod56.z.coerce.number().default(0),
  priceChange1hPercentage: import_zod56.z.coerce.number().default(0),
  priceChange4hPercentage: import_zod56.z.coerce.number().default(0),
  priceChange6hPercentage: import_zod56.z.coerce.number().default(0),
  priceChange12hPercentage: import_zod56.z.coerce.number().default(0),
  priceChange24hPercentage: import_zod56.z.coerce.number().default(0),
  volume1minUSD: import_zod56.z.coerce.number().default(0),
  volume5minUSD: import_zod56.z.coerce.number().default(0),
  volume15minUSD: import_zod56.z.coerce.number().default(0),
  volume1hUSD: import_zod56.z.coerce.number().default(0),
  volume4hUSD: import_zod56.z.coerce.number().default(0),
  volume6hUSD: import_zod56.z.coerce.number().default(0),
  volume12hUSD: import_zod56.z.coerce.number().default(0),
  volume24hUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy1minUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy5minUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy15minUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy1hUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy4hUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy6hUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy12hUSD: import_zod56.z.coerce.number().default(0),
  volumeBuy24hUSD: import_zod56.z.coerce.number().default(0),
  volumeSell1minUSD: import_zod56.z.coerce.number().default(0),
  volumeSell5minUSD: import_zod56.z.coerce.number().default(0),
  volumeSell15minUSD: import_zod56.z.coerce.number().default(0),
  volumeSell1hUSD: import_zod56.z.coerce.number().default(0),
  volumeSell4hUSD: import_zod56.z.coerce.number().default(0),
  volumeSell6hUSD: import_zod56.z.coerce.number().default(0),
  volumeSell12hUSD: import_zod56.z.coerce.number().default(0),
  volumeSell24hUSD: import_zod56.z.coerce.number().default(0),
  trades1min: import_zod56.z.coerce.number().default(0),
  trades5min: import_zod56.z.coerce.number().default(0),
  trades15min: import_zod56.z.coerce.number().default(0),
  trades1h: import_zod56.z.coerce.number().default(0),
  trades4h: import_zod56.z.coerce.number().default(0),
  trades6h: import_zod56.z.coerce.number().default(0),
  trades12h: import_zod56.z.coerce.number().default(0),
  trades24h: import_zod56.z.coerce.number().default(0),
  buys1min: import_zod56.z.coerce.number().default(0),
  buys5min: import_zod56.z.coerce.number().default(0),
  buys15min: import_zod56.z.coerce.number().default(0),
  buys1h: import_zod56.z.coerce.number().default(0),
  buys4h: import_zod56.z.coerce.number().default(0),
  buys6h: import_zod56.z.coerce.number().default(0),
  buys12h: import_zod56.z.coerce.number().default(0),
  buys24h: import_zod56.z.coerce.number().default(0),
  sells1min: import_zod56.z.coerce.number().default(0),
  sells5min: import_zod56.z.coerce.number().default(0),
  sells15min: import_zod56.z.coerce.number().default(0),
  sells1h: import_zod56.z.coerce.number().default(0),
  sells4h: import_zod56.z.coerce.number().default(0),
  sells6h: import_zod56.z.coerce.number().default(0),
  sells12h: import_zod56.z.coerce.number().default(0),
  sells24h: import_zod56.z.coerce.number().default(0),
  buyers1min: import_zod56.z.coerce.number().default(0),
  buyers5min: import_zod56.z.coerce.number().default(0),
  buyers15min: import_zod56.z.coerce.number().default(0),
  buyers1h: import_zod56.z.coerce.number().default(0),
  buyers4h: import_zod56.z.coerce.number().default(0),
  buyers6h: import_zod56.z.coerce.number().default(0),
  buyers12h: import_zod56.z.coerce.number().default(0),
  buyers24h: import_zod56.z.coerce.number().default(0),
  sellers1min: import_zod56.z.coerce.number().default(0),
  sellers5min: import_zod56.z.coerce.number().default(0),
  sellers15min: import_zod56.z.coerce.number().default(0),
  sellers1h: import_zod56.z.coerce.number().default(0),
  sellers4h: import_zod56.z.coerce.number().default(0),
  sellers6h: import_zod56.z.coerce.number().default(0),
  sellers12h: import_zod56.z.coerce.number().default(0),
  sellers24h: import_zod56.z.coerce.number().default(0),
  traders1min: import_zod56.z.coerce.number().default(0),
  traders5min: import_zod56.z.coerce.number().default(0),
  traders15min: import_zod56.z.coerce.number().default(0),
  traders1h: import_zod56.z.coerce.number().default(0),
  traders4h: import_zod56.z.coerce.number().default(0),
  traders6h: import_zod56.z.coerce.number().default(0),
  traders12h: import_zod56.z.coerce.number().default(0),
  traders24h: import_zod56.z.coerce.number().default(0),
  feesPaid1minUSD: import_zod56.z.coerce.number().default(0),
  feesPaid5minUSD: import_zod56.z.coerce.number().default(0),
  feesPaid15minUSD: import_zod56.z.coerce.number().default(0),
  feesPaid1hUSD: import_zod56.z.coerce.number().default(0),
  feesPaid4hUSD: import_zod56.z.coerce.number().default(0),
  feesPaid6hUSD: import_zod56.z.coerce.number().default(0),
  feesPaid12hUSD: import_zod56.z.coerce.number().default(0),
  feesPaid24hUSD: import_zod56.z.coerce.number().default(0),
  holdersCount: import_zod56.z.coerce.number().default(0),
  source: import_zod56.z.string().nullable(),
  deployer: import_zod56.z.string().nullable(),
  tokenSymbol: import_zod56.z.string().nullable(),
  tokenName: import_zod56.z.string().nullable(),
  dexscreenerListed: import_zod56.z.coerce.boolean().nullable(),
  deployerMigrations: import_zod56.z.coerce.number().default(0),
  socials: import_zod56.z.object({
    twitter: import_zod56.z.string().nullable(),
    website: import_zod56.z.string().nullable(),
    telegram: import_zod56.z.string().nullable(),
    others: import_zod56.z.record(import_zod56.z.unknown()).nullable(),
    uri: import_zod56.z.string().optional()
  }),
  description: import_zod56.z.string().nullable(),
  security: SecurityFlagsSchema.nullable(),
  twitterReusesCount: import_zod56.z.coerce.number().default(0),
  twitterRenameCount: import_zod56.z.coerce.number().default(0),
  twitterRenameHistory: import_zod56.z.array(import_zod56.z.object({
    username: import_zod56.z.string(),
    lastChecked: import_zod56.z.string()
  })).default([]),
  perpetuals: PerpDataMarketDetailsOutputSchema.optional(),
  extraData: import_zod56.z.record(import_zod56.z.unknown()).optional()
}).merge(HoldersStatsSchema);

// src/v2/market/MarketDetailsSchema.ts
var MarketDetailsItemParams = import_zod57.z.object({
  blockchain: import_zod57.z.string().optional(),
  address: import_zod57.z.string().optional(),
  baseToken: import_zod57.z.string().optional(),
  currencies: import_zod57.z.string().optional()
}).transform(({ blockchain, address, baseToken, currencies }) => ({
  blockchain,
  address,
  baseToken,
  currencies: CurrenciesParamSchema.parse(currencies),
  asset: address ? address : undefined
}));
var MarketDetailsParamsSchema = MarketDetailsItemParams;
var MarketDetailsBatchParamsSchema = import_zod57.z.union([
  import_zod57.z.array(MarketDetailsItemParams),
  import_zod57.z.object({
    items: import_zod57.z.array(MarketDetailsItemParams)
  })
]);
var MarketDetailsResponseSchema = import_zod57.z.object({
  data: MarketDetailsOutput,
  hostname: import_zod57.z.string().optional()
});
var MarketDetailsBatchResponseSchema = import_zod57.z.object({
  payload: import_zod57.z.array(MarketDetailsOutput.or(import_zod57.z.object({ error: import_zod57.z.string().optional() })).nullable()),
  hostname: import_zod57.z.string().optional()
});
// src/v2/market/MarketOHLCVHistorySchema.ts
var import_zod58 = require("zod");
var booleanFromString = import_zod58.z.union([import_zod58.z.boolean(), import_zod58.z.string()]).optional().default(true).transform((val) => {
  if (typeof val === "boolean")
    return val;
  if (val === "false" || val === "0")
    return false;
  return true;
});
var MarketOHLCVHistoryItemSchema = import_zod58.z.object({
  address: import_zod58.z.string(),
  chainId: import_zod58.z.string(),
  from: DateQuery_default.transform((val) => val ?? 0),
  to: DateQuery_default.transform((val) => val ?? new Date),
  period: import_zod58.z.string().optional().transform((val) => val ? normalizePeriod(val) : "5m"),
  amount: import_zod58.z.coerce.number().optional(),
  usd: booleanFromString
});
var MarketOHLCVHistoryParamsSchema = MarketOHLCVHistoryItemSchema.refine((data) => data.address && data.chainId, { message: "address and chainId are required" });
var MarketOHLCVHistoryArraySchema = import_zod58.z.array(MarketOHLCVHistoryItemSchema).min(1, "At least one market is required").max(10, "Maximum 10 markets per request");
var MarketOHLCVHistoryBatchParamsSchema = import_zod58.z.union([
  MarketOHLCVHistoryArraySchema,
  import_zod58.z.object({ markets: MarketOHLCVHistoryArraySchema })
]);
var OHLCVCandleSchema = import_zod58.z.object({
  v: import_zod58.z.number(),
  o: import_zod58.z.number(),
  h: import_zod58.z.number(),
  l: import_zod58.z.number(),
  c: import_zod58.z.number(),
  t: import_zod58.z.number()
});
var MarketOHLCVHistoryResponseSchema = import_zod58.z.object({
  data: import_zod58.z.array(OHLCVCandleSchema)
});
var MarketOHLCVHistoryDataSchema = import_zod58.z.object({
  ohlcv: import_zod58.z.array(OHLCVCandleSchema),
  address: import_zod58.z.string(),
  chainId: import_zod58.z.string(),
  error: import_zod58.z.string().optional()
});
var MarketOHLCVHistoryBatchResponseSchema = import_zod58.z.object({
  data: import_zod58.z.array(MarketOHLCVHistoryDataSchema)
});
// src/v2/perp/PerpBlocksSchema.ts
var import_zod59 = require("zod");
var PerpBlocksQueryParamsSchema = import_zod59.z.object({
  exchange: import_zod59.z.string().optional(),
  chain_id: import_zod59.z.string().optional(),
  block_number: import_zod59.z.coerce.number().optional(),
  batch_number: import_zod59.z.coerce.number().optional(),
  block_status: import_zod59.z.string().optional(),
  from_block_time: import_zod59.z.string().optional(),
  to_block_time: import_zod59.z.string().optional(),
  page: import_zod59.z.coerce.number().min(1).default(1),
  limit: import_zod59.z.coerce.number().min(1).max(100).default(25)
});
var PerpBlockSchema = import_zod59.z.object({
  exchange: import_zod59.z.string().nullable(),
  chain_id: import_zod59.z.string().nullable(),
  block_number: import_zod59.z.number(),
  batch_number: import_zod59.z.number(),
  block_status: import_zod59.z.string().nullable(),
  block_time: import_zod59.z.string(),
  total_transactions: import_zod59.z.number(),
  logs_count: import_zod59.z.number(),
  trades_count: import_zod59.z.number(),
  commit_tx_hash: import_zod59.z.string().nullable(),
  verify_tx_hash: import_zod59.z.string().nullable(),
  execute_tx_hash: import_zod59.z.string().nullable(),
  scraped_at: import_zod59.z.string()
});
var PerpBlocksResponseSchema = import_zod59.z.object({
  data: import_zod59.z.array(PerpBlockSchema),
  pagination: import_zod59.z.object({
    page: import_zod59.z.number(),
    totalPages: import_zod59.z.number(),
    totalItems: import_zod59.z.number(),
    limit: import_zod59.z.number()
  })
});
// src/v2/perp/PerpOrderQuotingSchema.ts
var import_zod60 = require("zod");
var SupportedDexSchema = import_zod60.z.enum(["gains"]);
var TradeTypeSchema = import_zod60.z.enum(["market", "limit", "stop_limit"]);
var PerpOrderQuotingParamsSchema = import_zod60.z.object({
  user: import_zod60.z.string(),
  baseToken: import_zod60.z.string(),
  quote: import_zod60.z.string(),
  leverage: import_zod60.z.coerce.number(),
  long: import_zod60.z.union([import_zod60.z.boolean(), import_zod60.z.string()]).transform((val) => typeof val === "string" ? val === "true" : val),
  collateralAmount: import_zod60.z.coerce.number(),
  openPrice: import_zod60.z.coerce.number().optional(),
  tp: import_zod60.z.coerce.number().optional(),
  sl: import_zod60.z.coerce.number().optional(),
  tradeType: TradeTypeSchema.optional().default("market"),
  amountRaw: import_zod60.z.coerce.number().optional(),
  maxSlippageP: import_zod60.z.coerce.number().optional(),
  chainId: import_zod60.z.string().optional(),
  dex: SupportedDexSchema.optional(),
  referrer: import_zod60.z.string().optional()
});
// src/v2/swap/SwapQuotingBatchOutput.ts
var import_zod62 = require("zod");

// src/v2/swap/SwapQuotingOutput.ts
var import_zod_to_openapi2 = __toESM(require_dist(), 1);
var import_zod61 = require("zod");
import_zod_to_openapi2.extendZodWithOpenApi(import_zod61.z);
var SolanaTransactionSchema = import_zod61.z.object({
  serialized: import_zod61.z.string(),
  variant: import_zod61.z.enum(["legacy", "versioned"])
});
var EVMTransactionSchema = import_zod61.z.object({
  to: import_zod61.z.string(),
  from: import_zod61.z.string(),
  data: import_zod61.z.string(),
  value: import_zod61.z.string(),
  gasLimit: import_zod61.z.string().optional(),
  gasPrice: import_zod61.z.string().optional(),
  maxFeePerGas: import_zod61.z.string().optional(),
  maxPriorityFeePerGas: import_zod61.z.string().optional(),
  nonce: import_zod61.z.number().optional(),
  chainId: import_zod61.z.number()
});
var TokenInfoSchema = import_zod61.z.object({
  address: import_zod61.z.string(),
  name: import_zod61.z.string().optional(),
  symbol: import_zod61.z.string().optional(),
  decimals: import_zod61.z.number(),
  logo: import_zod61.z.string().nullable().optional()
});
var RouteHopSchema = import_zod61.z.object({
  poolAddress: import_zod61.z.string(),
  tokenIn: TokenInfoSchema,
  tokenOut: TokenInfoSchema,
  amountInTokens: import_zod61.z.string(),
  amountOutTokens: import_zod61.z.string(),
  exchange: import_zod61.z.string().optional(),
  poolType: import_zod61.z.string().optional(),
  feePercentage: import_zod61.z.number().optional(),
  feeBps: import_zod61.z.number().optional()
});
var RouteDetailsSchema = import_zod61.z.object({
  hops: import_zod61.z.array(RouteHopSchema),
  totalFeePercentage: import_zod61.z.number().optional(),
  aggregator: import_zod61.z.string().optional()
});
var IntegrationFeeSchema = import_zod61.z.object({
  amount: import_zod61.z.string(),
  percentage: import_zod61.z.number(),
  wallet: import_zod61.z.string(),
  deductedFrom: import_zod61.z.enum(["input", "output"])
});
var BaseDataSchema = import_zod61.z.object({
  amountOutTokens: import_zod61.z.string().optional(),
  slippagePercentage: import_zod61.z.number().optional(),
  amountInUSD: import_zod61.z.number().optional(),
  amountOutUSD: import_zod61.z.number().optional(),
  marketImpactPercentage: import_zod61.z.number().optional(),
  poolFeesPercentage: import_zod61.z.number().optional(),
  tokenIn: TokenInfoSchema.optional(),
  tokenOut: TokenInfoSchema.optional(),
  requestId: import_zod61.z.string(),
  details: import_zod61.z.object({
    route: RouteDetailsSchema.optional(),
    aggregator: import_zod61.z.string().optional(),
    raw: import_zod61.z.record(import_zod61.z.unknown()).optional()
  }).optional(),
  fee: IntegrationFeeSchema.optional()
});
var DataWithSolanaSchema = BaseDataSchema.extend({
  solana: import_zod61.z.object({
    transaction: SolanaTransactionSchema,
    lastValidBlockHeight: import_zod61.z.number()
  }),
  evm: import_zod61.z.never().optional().openapi({ type: "null" })
});
var DataWithEVMSchema = BaseDataSchema.extend({
  evm: import_zod61.z.object({
    transaction: EVMTransactionSchema
  }),
  solana: import_zod61.z.never().optional().openapi({ type: "null" })
});
var DataWithErrorSchema = BaseDataSchema.extend({
  solana: import_zod61.z.never().optional().openapi({ type: "null" }),
  evm: import_zod61.z.never().optional().openapi({ type: "null" })
});
var SwapQuotingDataSchema = import_zod61.z.union([DataWithSolanaSchema, DataWithEVMSchema, DataWithErrorSchema]);
var SwapQuotingOutputSchema = import_zod61.z.object({
  data: SwapQuotingDataSchema,
  error: import_zod61.z.string().optional()
});

// src/v2/swap/SwapQuotingBatchOutput.ts
var SwapQuotingBatchResultSchema = import_zod62.z.object({
  data: SwapQuotingDataSchema,
  error: import_zod62.z.string().optional(),
  index: import_zod62.z.number()
});
var SwapQuotingBatchOutputSchema = import_zod62.z.object({
  results: import_zod62.z.array(SwapQuotingBatchResultSchema),
  totalRequests: import_zod62.z.number(),
  successCount: import_zod62.z.number(),
  errorCount: import_zod62.z.number()
});
// src/v2/swap/SwapQuotingBatchSchema.ts
var import_zod63 = require("zod");
var SwapQuotingBatchItemSchema = import_zod63.z.object({
  chainId: import_zod63.z.string(),
  tokenIn: import_zod63.z.string().min(1, "tokenIn is required"),
  tokenOut: import_zod63.z.string().min(1, "tokenOut is required"),
  amount: import_zod63.z.number().positive("Amount must be a positive number").optional(),
  amountRaw: import_zod63.z.string().regex(/^\d+$/, "amountRaw must be a positive integer string").refine((val) => BigInt(val) > 0n, "amountRaw must be positive").transform((val) => BigInt(val)).optional(),
  slippage: import_zod63.z.number().min(0).max(100, "Slippage must be between 0 and 100").default(1),
  walletAddress: import_zod63.z.string().min(1, "walletAddress is required"),
  excludedProtocols: import_zod63.z.array(import_zod63.z.string()).optional(),
  onlyProtocols: import_zod63.z.array(import_zod63.z.string()).optional(),
  poolAddress: import_zod63.z.string().optional(),
  onlyRouters: import_zod63.z.array(import_zod63.z.enum(["jupiter", "kyberswap", "lifi"])).optional().transform((val) => val?.length ? val : undefined),
  priorityFee: import_zod63.z.union([
    import_zod63.z.literal("auto"),
    import_zod63.z.number().positive(),
    import_zod63.z.object({
      preset: import_zod63.z.enum(["low", "medium", "high", "veryHigh"])
    })
  ]).optional(),
  computeUnitLimit: import_zod63.z.union([import_zod63.z.literal(true), import_zod63.z.number().positive()]).optional(),
  jitoTipLamports: import_zod63.z.number().positive().optional(),
  feePercentage: import_zod63.z.number().min(0.01).max(99).optional(),
  feeWallet: import_zod63.z.string().optional(),
  payerAddress: import_zod63.z.string().optional()
}).refine((data) => data.amount !== undefined !== (data.amountRaw !== undefined), {
  message: "Either amount or amountRaw must be provided (but not both)",
  path: ["amount"]
});
var SwapQuotingBatchBodySchema = import_zod63.z.object({
  requests: import_zod63.z.array(SwapQuotingBatchItemSchema).min(1, "At least one request is required").max(30, "Maximum 30 requests allowed per batch")
});
// src/v2/swap/SwapQuotingInstructionsOutput.ts
var import_zod64 = require("zod");
var SolanaInstructionSchema = import_zod64.z.object({
  programId: import_zod64.z.string(),
  accounts: import_zod64.z.array(import_zod64.z.object({
    pubkey: import_zod64.z.string(),
    isSigner: import_zod64.z.boolean(),
    isWritable: import_zod64.z.boolean()
  })),
  data: import_zod64.z.string()
});
var SolanaInstructionsSchema = import_zod64.z.object({
  computeBudgetInstructions: import_zod64.z.array(SolanaInstructionSchema).optional(),
  setupInstructions: import_zod64.z.array(SolanaInstructionSchema).optional(),
  swapInstructions: import_zod64.z.array(SolanaInstructionSchema),
  cleanupInstructions: import_zod64.z.array(SolanaInstructionSchema).optional(),
  addressLookupTableAddresses: import_zod64.z.array(import_zod64.z.string()).optional()
});
var TokenInfoSchema2 = import_zod64.z.object({
  address: import_zod64.z.string(),
  name: import_zod64.z.string().optional(),
  symbol: import_zod64.z.string().optional(),
  decimals: import_zod64.z.number(),
  logo: import_zod64.z.string().nullable().optional()
});
var RouteHopSchema2 = import_zod64.z.object({
  poolAddress: import_zod64.z.string(),
  tokenIn: TokenInfoSchema2,
  tokenOut: TokenInfoSchema2,
  amountInTokens: import_zod64.z.string(),
  amountOutTokens: import_zod64.z.string(),
  exchange: import_zod64.z.string().optional(),
  poolType: import_zod64.z.string().optional(),
  feePercentage: import_zod64.z.number().optional(),
  feeBps: import_zod64.z.number().optional()
});
var RouteDetailsSchema2 = import_zod64.z.object({
  hops: import_zod64.z.array(RouteHopSchema2),
  totalFeePercentage: import_zod64.z.number().optional(),
  aggregator: import_zod64.z.string().optional()
});
var IntegrationFeeSchema2 = import_zod64.z.object({
  amount: import_zod64.z.string(),
  percentage: import_zod64.z.number(),
  wallet: import_zod64.z.string(),
  deductedFrom: import_zod64.z.enum(["input", "output"])
});
var SwapQuotingInstructionsDataSchema = import_zod64.z.object({
  amountOutTokens: import_zod64.z.string().optional(),
  slippagePercentage: import_zod64.z.number().optional(),
  amountInUSD: import_zod64.z.number().optional(),
  amountOutUSD: import_zod64.z.number().optional(),
  marketImpactPercentage: import_zod64.z.number().optional(),
  poolFeesPercentage: import_zod64.z.number().optional(),
  tokenIn: TokenInfoSchema2.optional(),
  tokenOut: TokenInfoSchema2.optional(),
  requestId: import_zod64.z.string(),
  details: import_zod64.z.object({
    route: RouteDetailsSchema2.optional(),
    aggregator: import_zod64.z.string().optional(),
    raw: import_zod64.z.record(import_zod64.z.unknown()).optional()
  }).optional(),
  solana: import_zod64.z.object({
    instructions: SolanaInstructionsSchema,
    lastValidBlockHeight: import_zod64.z.number(),
    recentBlockhash: import_zod64.z.string()
  }),
  fee: IntegrationFeeSchema2.optional()
});
var SwapQuotingInstructionsOutputSchema = import_zod64.z.object({
  data: SwapQuotingInstructionsDataSchema,
  error: import_zod64.z.string().optional()
});
// src/v2/swap/SwapQuotingSchema.ts
var import_zod65 = require("zod");
var SwapQuotingQuerySchema = import_zod65.z.object({
  chainId: import_zod65.z.string(),
  tokenIn: import_zod65.z.string().min(1, "tokenIn is required"),
  tokenOut: import_zod65.z.string().min(1, "tokenOut is required"),
  amount: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    const parsed = Number.parseFloat(val);
    if (Number.isNaN(parsed) || parsed <= 0) {
      throw new Error("Amount must be a positive number");
    }
    return parsed;
  }),
  amountRaw: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    if (!/^\d+$/.test(val)) {
      throw new Error("amountRaw must be a positive integer string");
    }
    const parsed = BigInt(val);
    if (parsed <= 0n) {
      throw new Error("amountRaw must be a positive integer");
    }
    return parsed;
  }),
  slippage: import_zod65.z.string().optional().default("1").transform((val) => {
    const parsed = Number.parseFloat(val);
    if (Number.isNaN(parsed) || parsed < 0 || parsed > 100) {
      throw new Error("Slippage must be between 0 and 100");
    }
    return parsed;
  }),
  walletAddress: import_zod65.z.string().min(1, "walletAddress is required"),
  excludedProtocols: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    return val.split(",").map((f) => f.trim()).filter((f) => f.length > 0);
  }),
  onlyProtocols: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    return val.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
  }),
  poolAddress: import_zod65.z.string().optional(),
  onlyRouters: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    const supportedRouters = ["jupiter", "kyberswap", "lifi"];
    const routers = val.split(",").map((r) => r.trim().toLowerCase()).filter((r) => r.length > 0);
    for (const router of routers) {
      if (!supportedRouters.includes(router)) {
        throw new Error(`Invalid router "${router}". Supported routers: ${supportedRouters.join(", ")}`);
      }
    }
    if (routers.length === 0)
      return;
    return routers;
  }),
  priorityFee: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    if (val === "auto")
      return "auto";
    const presets = ["low", "medium", "high", "veryHigh"];
    if (presets.includes(val)) {
      return { preset: val };
    }
    const numValue = Number.parseInt(val, 10);
    if (!Number.isNaN(numValue) && numValue > 0) {
      return numValue;
    }
    throw new Error(`Invalid priorityFee "${val}". Must be 'auto', a preset (low, medium, high, veryHigh), or a positive number`);
  }),
  computeUnitLimit: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    if (val === "true")
      return true;
    const numValue = Number.parseInt(val, 10);
    if (!Number.isNaN(numValue) && numValue > 0) {
      return numValue;
    }
    throw new Error(`Invalid computeUnitLimit "${val}". Must be 'true' or a positive number`);
  }),
  jitoTipLamports: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    const numValue = Number.parseInt(val, 10);
    if (!Number.isNaN(numValue) && numValue > 0) {
      return numValue;
    }
    throw new Error(`Invalid jitoTipLamports "${val}". Must be a positive number`);
  }),
  feePercentage: import_zod65.z.string().optional().transform((val) => {
    if (!val)
      return;
    const numValue = Number.parseFloat(val);
    if (Number.isNaN(numValue) || numValue < 0.01 || numValue > 99) {
      throw new Error("feePercentage must be between 0.01 and 99");
    }
    return numValue;
  }),
  feeWallet: import_zod65.z.string().optional(),
  payerAddress: import_zod65.z.string().optional()
}).refine((data) => {
  const hasAmount = data.amount !== undefined;
  const hasAmountRaw = data.amountRaw !== undefined;
  return hasAmount !== hasAmountRaw;
}, {
  message: "Either amount or amountRaw must be provided (but not both)",
  path: ["amount"]
});
// src/v2/swap/SwapSendOutput.ts
var import_zod66 = require("zod");
var SwapSendResponseSchema = import_zod66.z.object({
  data: import_zod66.z.object({
    success: import_zod66.z.boolean(),
    transactionHash: import_zod66.z.string().optional(),
    requestId: import_zod66.z.string()
  }),
  error: import_zod66.z.string().optional()
});
// src/v2/swap/SwapSendSchema.ts
var import_zod67 = require("zod");
var SwapSendSchema = import_zod67.z.object({
  chainId: import_zod67.z.string(),
  signedTransaction: import_zod67.z.string().min(1, "signedTransaction is required").transform((val) => {
    try {
      return Buffer.from(val, "base64");
    } catch {
      throw new Error("signedTransaction must be a valid base64 string");
    }
  })
});
// src/v2/token/TokenDetailsSchema.ts
var import_zod68 = require("zod");
var TokenDetailsItemParams = import_zod68.z.object({
  blockchain: import_zod68.z.string().optional(),
  address: import_zod68.z.string().optional(),
  currencies: CurrenciesParamSchema,
  instanceTracking: import_zod68.z.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, import_zod68.z.boolean().optional())
});
var TokenDetailsParamsSchema = TokenDetailsItemParams;
var TokenDetailsBatchParamsSchema = import_zod68.z.union([
  import_zod68.z.array(TokenDetailsItemParams),
  import_zod68.z.object({
    items: import_zod68.z.array(TokenDetailsItemParams),
    instanceTracking: import_zod68.z.preprocess((val) => {
      if (val === "true")
        return true;
      if (val === "false")
        return false;
      return val;
    }, import_zod68.z.boolean().optional())
  })
]);
var TokenDetailsResponseSchema = import_zod68.z.object({
  data: TokenDetailsOutput,
  hostname: import_zod68.z.string().optional()
});
var TokenDetailsBatchResponseSchema = import_zod68.z.object({
  payload: import_zod68.z.array(TokenDetailsOutput.or(import_zod68.z.object({ error: import_zod68.z.string().optional() })).nullable()),
  hostname: import_zod68.z.string().optional()
});
// src/v2/token/TokenKlineBsPointSchema.ts
var import_zod69 = require("zod");
var TokenKlineBsPointParamsSchema = import_zod69.z.object({
  blockchain: import_zod69.z.string(),
  address: import_zod69.z.string(),
  bar: import_zod69.z.string().transform((val) => normalizePeriod(val ?? "5m", "5m")),
  fromDate: DateQuery_default.transform((val) => val ?? undefined),
  toDate: DateQuery_default.transform((val) => val ?? undefined),
  transactionSenderAddresses: stringOrArray.default([]),
  labels: stringOrArray.optional().transform((val) => val?.map((label) => String(label).trim()).filter((label) => label.length > 0) ?? [])
});
var TokenKlineBsBubblePoint = import_zod69.z.object({
  volumeBuyToken: import_zod69.z.string(),
  buys: import_zod69.z.string(),
  avgBuyPriceUSD: import_zod69.z.string(),
  volumeBuy: import_zod69.z.string(),
  volumeSellToken: import_zod69.z.string(),
  sells: import_zod69.z.string(),
  avgSellPriceUSD: import_zod69.z.string(),
  volumeSell: import_zod69.z.string(),
  fromAddress: import_zod69.z.string(),
  fromAddressTag: import_zod69.z.string(),
  time: import_zod69.z.string()
});
var TokenKlineBsPointResponseSchema = import_zod69.z.object({
  data: import_zod69.z.array(TokenKlineBsBubblePoint)
});
// src/v2/token/TokenMarketsSchema.ts
var import_zod70 = require("zod");
var DEFAULT_MARKETS_RES_LIMIT = 10;
var MARKETS_MAX__RES_LIMIT = 25;
var TokenMarketsParamsSchema = import_zod70.z.object({
  blockchain: import_zod70.z.string().optional(),
  address: import_zod70.z.string(),
  limit: import_zod70.z.coerce.number().min(1).max(MARKETS_MAX__RES_LIMIT).default(DEFAULT_MARKETS_RES_LIMIT)
});
var TokenMarketsOutput = import_zod70.z.array(MarketDetailsOutput);
var TokenMarketsResponseSchema = import_zod70.z.object({
  data: TokenMarketsOutput,
  totalCount: import_zod70.z.number()
});
// src/v2/token/TokenOHLCVHistorySchema.ts
var import_zod71 = require("zod");
var booleanFromString2 = import_zod71.z.union([import_zod71.z.boolean(), import_zod71.z.string()]).optional().default(true).transform((val) => {
  if (typeof val === "boolean")
    return val;
  if (val === "false" || val === "0")
    return false;
  return true;
});
var TokenOHLCVHistoryItemSchema = import_zod71.z.object({
  address: import_zod71.z.string(),
  chainId: import_zod71.z.string(),
  from: DateQuery_default.transform((val) => val ?? 0),
  to: DateQuery_default.transform((val) => val ?? new Date),
  period: import_zod71.z.string().optional().transform((val) => val ? normalizePeriod(val) : "5m"),
  amount: import_zod71.z.coerce.number().optional(),
  usd: booleanFromString2
});
var TokenOHLCVHistoryParamsSchema = TokenOHLCVHistoryItemSchema.refine((data) => data.address && data.chainId, { message: "address and chainId are required" });
var TokenOHLCVHistoryArraySchema = import_zod71.z.array(TokenOHLCVHistoryItemSchema).min(1, "At least one token is required").max(10, "Maximum 10 tokens per request");
var TokenOHLCVHistoryBatchParamsSchema = import_zod71.z.union([
  TokenOHLCVHistoryArraySchema,
  import_zod71.z.object({ tokens: TokenOHLCVHistoryArraySchema })
]);
var OHLCVCandleSchema2 = import_zod71.z.object({
  v: import_zod71.z.number(),
  o: import_zod71.z.number(),
  h: import_zod71.z.number(),
  l: import_zod71.z.number(),
  c: import_zod71.z.number(),
  t: import_zod71.z.number()
});
var TokenOHLCVHistoryResponseSchema = import_zod71.z.object({
  data: import_zod71.z.array(OHLCVCandleSchema2)
});
var TokenOHLCVHistoryDataSchema = import_zod71.z.object({
  ohlcv: import_zod71.z.array(OHLCVCandleSchema2),
  address: import_zod71.z.string(),
  chainId: import_zod71.z.string(),
  error: import_zod71.z.string().optional()
});
var TokenOHLCVHistoryBatchResponseSchema = import_zod71.z.object({
  data: import_zod71.z.array(TokenOHLCVHistoryDataSchema)
});
// src/v2/token/TokenPositionsSchema.ts
var import_zod72 = require("zod");
var TokenPositionsParamsSchema = import_zod72.z.object({
  blockchain: import_zod72.z.string().optional(),
  address: import_zod72.z.string().optional(),
  force: import_zod72.z.coerce.boolean().optional().default(false),
  label: import_zod72.z.nativeEnum(Tags).optional(),
  limit: import_zod72.z.coerce.number().optional().default(100),
  offset: import_zod72.z.coerce.number().optional().default(0),
  walletAddresses: stringOrArray.optional()
});
var TokenPositionOutput = import_zod72.z.object({
  chainId: import_zod72.z.string(),
  walletAddress: import_zod72.z.string(),
  tokenAddress: import_zod72.z.string(),
  tokenAmount: import_zod72.z.string(),
  tokenAmountRaw: import_zod72.z.string(),
  tokenAmountUSD: import_zod72.z.string(),
  percentageOfTotalSupply: import_zod72.z.string(),
  pnlUSD: import_zod72.z.string(),
  realizedPnlUSD: import_zod72.z.string(),
  unrealizedPnlUSD: import_zod72.z.string(),
  totalPnlUSD: import_zod72.z.string(),
  buys: import_zod72.z.number(),
  sells: import_zod72.z.number(),
  volumeBuyToken: import_zod72.z.string(),
  volumeSellToken: import_zod72.z.string(),
  volumeBuyUSD: import_zod72.z.string(),
  volumeSellUSD: import_zod72.z.string(),
  avgBuyPriceUSD: import_zod72.z.string(),
  avgSellPriceUSD: import_zod72.z.string(),
  walletFundAt: import_zod72.z.date().nullable(),
  lastActivityAt: import_zod72.z.date().nullable(),
  firstTradeAt: import_zod72.z.date().nullable(),
  lastTradeAt: import_zod72.z.date().nullable(),
  labels: import_zod72.z.array(import_zod72.z.string()).nullable().optional().default([]),
  fundingInfo: import_zod72.z.object({
    from: import_zod72.z.string().nullable(),
    date: import_zod72.z.date().nullable(),
    chainId: import_zod72.z.string().nullable(),
    txHash: import_zod72.z.string().nullable(),
    amount: import_zod72.z.string().nullable(),
    fromWalletLogo: import_zod72.z.string().nullable(),
    fromWalletTag: import_zod72.z.string().nullable()
  })
});
var TokenPositionsResponseSchema = import_zod72.z.object({
  data: import_zod72.z.array(TokenPositionOutput)
});
// src/v2/token/TokenPriceSchema.ts
var import_zod73 = require("zod");
var TokenPriceItemParams = import_zod73.z.object({
  blockchain: import_zod73.z.string().optional(),
  address: import_zod73.z.string().optional()
});
var TokenPriceParamsSchema = TokenPriceItemParams;
var TokenPriceBatchParamsSchema = import_zod73.z.union([
  import_zod73.z.array(TokenPriceItemParams),
  import_zod73.z.object({
    items: import_zod73.z.array(TokenPriceItemParams)
  })
]);
var TokenPriceItemResponseSchema = import_zod73.z.object({
  name: import_zod73.z.string().nullable(),
  symbol: import_zod73.z.string().nullable(),
  logo: import_zod73.z.string().nullable(),
  priceUSD: import_zod73.z.number().nullable(),
  marketCapUSD: import_zod73.z.number().nullable(),
  marketCapDilutedUSD: import_zod73.z.number().nullable(),
  liquidityUSD: import_zod73.z.number().nullable(),
  liquidityMaxUSD: import_zod73.z.number().nullable()
});
var TokenPriceResponseSchema = import_zod73.z.object({
  data: TokenPriceItemResponseSchema
});
var TokenPriceBatchResponseSchema = import_zod73.z.object({
  payload: import_zod73.z.array(TokenPriceItemResponseSchema.or(import_zod73.z.object({ error: import_zod73.z.string().optional() })).nullable())
});
// src/v2/token/TokenSecurityOutput.ts
var import_zod74 = require("zod");
var StaticAnalysisStatusEnum = import_zod74.z.enum([
  "completed",
  "pending",
  "not_available",
  "insufficient_liquidity",
  "not_evm"
]);
var TokenSecurityOutput = import_zod74.z.object({
  address: import_zod74.z.string(),
  chainId: import_zod74.z.string(),
  contractHoldingsPercentage: import_zod74.z.number().nullable(),
  contractBalanceRaw: import_zod74.z.string().nullable(),
  burnedHoldingsPercentage: import_zod74.z.number().nullable(),
  totalBurnedBalanceRaw: import_zod74.z.string().nullable(),
  buyFeePercentage: import_zod74.z.number(),
  sellFeePercentage: import_zod74.z.number(),
  maxWalletAmountRaw: import_zod74.z.string().nullable(),
  maxSellAmountRaw: import_zod74.z.string().nullable(),
  maxBuyAmountRaw: import_zod74.z.string().nullable(),
  maxTransferAmountRaw: import_zod74.z.string().nullable(),
  isLaunchpadToken: import_zod74.z.boolean().nullable(),
  top10HoldingsPercentage: import_zod74.z.number().nullable(),
  top50HoldingsPercentage: import_zod74.z.number().nullable(),
  top100HoldingsPercentage: import_zod74.z.number().nullable(),
  top200HoldingsPercentage: import_zod74.z.number().nullable(),
  isMintable: import_zod74.z.boolean().nullable(),
  isFreezable: import_zod74.z.boolean().nullable(),
  proTraderVolume24hPercentage: import_zod74.z.number().nullable(),
  transferPausable: import_zod74.z.boolean().nullable(),
  isBlacklisted: import_zod74.z.boolean().nullable(),
  isHoneypot: import_zod74.z.boolean().nullable(),
  isNotOpenSource: import_zod74.z.boolean().nullable(),
  renounced: import_zod74.z.boolean().nullable(),
  locked: import_zod74.z.string().nullable(),
  isWhitelisted: import_zod74.z.boolean().nullable(),
  balanceMutable: import_zod74.z.boolean().nullable(),
  lowLiquidity: import_zod74.z.string().nullable(),
  burnRate: import_zod74.z.string().nullable(),
  modifyableTax: import_zod74.z.boolean().nullable(),
  selfDestruct: import_zod74.z.boolean().nullable(),
  staticAnalysisStatus: StaticAnalysisStatusEnum.nullable(),
  staticAnalysisDate: import_zod74.z.string().nullable()
});
var TokenSecurityResponseSchema = import_zod74.z.object({
  data: TokenSecurityOutput,
  hostname: import_zod74.z.string().optional()
});
// src/v2/token/TokenSecurityQuery.ts
var import_zod75 = require("zod");
var TokenSecurityQuery = import_zod75.z.object({
  blockchain: import_zod75.z.string().optional(),
  address: import_zod75.z.string(),
  instanceTracking: import_zod75.z.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, import_zod75.z.boolean().optional()),
  _forceAnalysis: import_zod75.z.preprocess((val) => {
    if (val === "true")
      return true;
    if (val === "false")
      return false;
    return val;
  }, import_zod75.z.boolean().optional())
});
// src/v2/token/TokenTradesSchema.ts
var import_zod76 = require("zod");
var TokenTradesParamsSchema = import_zod76.z.object({
  blockchain: import_zod76.z.string().optional(),
  address: import_zod76.z.string().optional(),
  offset: import_zod76.z.coerce.number().default(0),
  limit: import_zod76.z.coerce.number().optional().default(10),
  sortOrder: import_zod76.z.enum(["asc", "desc"]).default("desc"),
  mode: import_zod76.z.enum(["pair", "asset"]).default("pair"),
  label: import_zod76.z.nativeEnum(Tags).optional(),
  swapTypes: stringOrArray.optional().transform((val) => val?.filter((v) => Object.values(SwapType).includes(v))),
  swapSenderAddresses: stringOrArray.optional().refine((arr) => !arr || arr.length <= 25, {
    message: "Maximum 25 swap sender addresses allowed"
  }),
  transactionSenderAddresses: stringOrArray.optional().refine((arr) => !arr || arr.length <= 25, {
    message: "Maximum 25 transaction sender addresses allowed"
  }),
  maxAmountUSD: import_zod76.z.coerce.number().optional(),
  minAmountUSD: import_zod76.z.coerce.number().optional(),
  fromDate: DateQuery_default.transform((val) => val ?? undefined),
  toDate: DateQuery_default.transform((val) => val ?? undefined)
});
var TokenTradeOutput = import_zod76.z.object({
  id: import_zod76.z.string(),
  operation: import_zod76.z.string(),
  type: import_zod76.z.string(),
  baseTokenAmount: import_zod76.z.number(),
  baseTokenAmountRaw: import_zod76.z.string(),
  baseTokenAmountUSD: import_zod76.z.number(),
  quoteTokenAmount: import_zod76.z.number(),
  quoteTokenAmountRaw: import_zod76.z.string(),
  quoteTokenAmountUSD: import_zod76.z.number(),
  preBalanceBaseToken: import_zod76.z.string().nullable().optional(),
  preBalanceQuoteToken: import_zod76.z.string().nullable().optional(),
  postBalanceBaseToken: import_zod76.z.string().nullable().optional(),
  postBalanceQuoteToken: import_zod76.z.string().nullable().optional(),
  date: import_zod76.z.number(),
  swapSenderAddress: import_zod76.z.string(),
  transactionSenderAddress: import_zod76.z.string(),
  blockchain: import_zod76.z.string(),
  transactionHash: import_zod76.z.string(),
  marketAddress: import_zod76.z.string(),
  marketAddresses: import_zod76.z.array(import_zod76.z.string()).optional(),
  baseTokenPriceUSD: import_zod76.z.number(),
  quoteTokenPriceUSD: import_zod76.z.number(),
  labels: import_zod76.z.array(import_zod76.z.string()).nullable().optional().default([]),
  baseToken: TokenDetailsOutput.optional(),
  quoteToken: TokenDetailsOutput.optional(),
  totalFeesUSD: import_zod76.z.number().nullable().optional(),
  gasFeesUSD: import_zod76.z.number().nullable().optional(),
  platformFeesUSD: import_zod76.z.number().nullable().optional(),
  mevFeesUSD: import_zod76.z.number().nullable().optional()
});
var TokenTradeResponseSchema = import_zod76.z.object({
  data: import_zod76.z.array(TokenTradeOutput)
});
var SingleTokenTradeResponseSchema = import_zod76.z.object({
  data: TokenTradeOutput
});
var FormattedTokenTradeOutput = import_zod76.z.object({
  labels: import_zod76.z.array(import_zod76.z.string()).nullable().optional().default([]),
  pair: import_zod76.z.string(),
  date: import_zod76.z.number(),
  tokenPrice: import_zod76.z.number(),
  tokenPriceVs: import_zod76.z.number(),
  tokenAmount: import_zod76.z.number(),
  tokenAmountVs: import_zod76.z.number(),
  tokenAmountUsd: import_zod76.z.number(),
  tokenAmountVsUsd: import_zod76.z.number(),
  type: import_zod76.z.string(),
  operation: import_zod76.z.string(),
  blockchain: import_zod76.z.string(),
  hash: import_zod76.z.string(),
  sender: import_zod76.z.string(),
  tokenAmountRaw: import_zod76.z.string(),
  tokenAmountRawVs: import_zod76.z.string(),
  totalFeesUSD: import_zod76.z.number().nullable().optional(),
  gasFeesUSD: import_zod76.z.number().nullable().optional(),
  platformFeesUSD: import_zod76.z.number().nullable().optional(),
  mevFeesUSD: import_zod76.z.number().nullable().optional()
});
var FormattedTokenTradeResponseSchema = import_zod76.z.object({
  data: import_zod76.z.array(FormattedTokenTradeOutput)
});
var TokenTradeParamsSchema = import_zod76.z.object({
  blockchain: import_zod76.z.string().optional(),
  transactionHash: import_zod76.z.string().min(1, "Transaction hash is required")
});
var TokenTradeParamsSchemaOpenAPI = import_zod76.z.object({
  blockchain: import_zod76.z.string().describe("Blockchain name or chain ID"),
  transactionHash: import_zod76.z.string().min(1).describe("Transaction hash")
});
var TokenTradeOutputOpenAPI = import_zod76.z.object({
  id: import_zod76.z.string(),
  operation: import_zod76.z.string(),
  type: import_zod76.z.string(),
  baseTokenAmount: import_zod76.z.number(),
  baseTokenAmountRaw: import_zod76.z.string(),
  baseTokenAmountUSD: import_zod76.z.number(),
  quoteTokenAmount: import_zod76.z.number(),
  quoteTokenAmountRaw: import_zod76.z.string(),
  quoteTokenAmountUSD: import_zod76.z.number(),
  date: import_zod76.z.number(),
  swapSenderAddress: import_zod76.z.string(),
  transactionSenderAddress: import_zod76.z.string(),
  blockchain: import_zod76.z.string(),
  transactionHash: import_zod76.z.string(),
  marketAddress: import_zod76.z.string(),
  marketAddresses: import_zod76.z.array(import_zod76.z.string()).optional(),
  baseTokenPriceUSD: import_zod76.z.number(),
  quoteTokenPriceUSD: import_zod76.z.number(),
  labels: import_zod76.z.array(import_zod76.z.string()).nullable().optional().default([]),
  baseToken: TokenDetailsOutput.optional(),
  quoteToken: TokenDetailsOutput.optional(),
  totalFeesUSD: import_zod76.z.number().nullable().optional(),
  gasFeesUSD: import_zod76.z.number().nullable().optional(),
  platformFeesUSD: import_zod76.z.number().nullable().optional(),
  mevFeesUSD: import_zod76.z.number().nullable().optional()
});
var SingleTokenTradeResponseSchemaOpenAPI = import_zod76.z.object({
  data: TokenTradeOutputOpenAPI
});
// src/v2/wallet/WalleAnalysisQuerySchema.ts
var import_zod77 = require("zod");
var WalletAnalysisParamsSchema = import_zod77.z.object({
  wallet: import_zod77.z.string().min(1, "Wallet address is required"),
  blockchain: import_zod77.z.string().optional(),
  period: import_zod77.z.string().optional().default("7d").transform((val) => val?.toLowerCase()).refine((val) => ["1d", "7d", "30d", "90d"].includes(val), {
    message: "Period must be one of: 1d, 7d, 30d, 90d"
  })
});
var WalletAnalysisParamsSchemaOpenAPI = import_zod77.z.object({
  wallet: import_zod77.z.string().min(1).describe("Wallet address to analyze"),
  blockchain: import_zod77.z.string().optional().describe("Blockchain ID (e.g., ethereum, base, solana:solana)"),
  period: import_zod77.z.string().optional().default("7d").describe("Analysis period: 1d, 7d, 30d, or 90d")
});
var WalletAnalysisResponseSchema = import_zod77.z.object({
  data: import_zod77.z.object({
    winRateDistribution: import_zod77.z.object({
      ">500%": import_zod77.z.number(),
      "200%-500%": import_zod77.z.number(),
      "50%-200%": import_zod77.z.number(),
      "0%-50%": import_zod77.z.number(),
      "-50%-0%": import_zod77.z.number(),
      "<-50%": import_zod77.z.number()
    }),
    marketCapDistribution: import_zod77.z.object({
      ">1000M": import_zod77.z.number(),
      ">100M": import_zod77.z.number(),
      "10M-100M": import_zod77.z.number(),
      "1M-10M": import_zod77.z.number(),
      "100k-1M": import_zod77.z.number(),
      "<100k": import_zod77.z.number()
    }),
    periodTimeframes: import_zod77.z.array(import_zod77.z.object({
      date: import_zod77.z.date(),
      realized: import_zod77.z.number()
    })),
    stat: import_zod77.z.object({
      totalValue: import_zod77.z.number(),
      periodTotalPnlUSD: import_zod77.z.number(),
      periodRealizedPnlUSD: import_zod77.z.number(),
      periodRealizedRate: import_zod77.z.number(),
      periodActiveTokensCount: import_zod77.z.number(),
      periodWinCount: import_zod77.z.number(),
      fundingInfo: import_zod77.z.object({
        from: import_zod77.z.string().nullable(),
        date: import_zod77.z.date().nullable(),
        chainId: import_zod77.z.string().nullable(),
        txHash: import_zod77.z.string().nullable(),
        amount: import_zod77.z.string().nullable(),
        fromWalletLogo: import_zod77.z.string().nullable(),
        fromWalletTag: import_zod77.z.string().nullable()
      }),
      periodVolumeBuy: import_zod77.z.number(),
      periodVolumeSell: import_zod77.z.number(),
      periodBuys: import_zod77.z.number(),
      periodSells: import_zod77.z.number(),
      nativeBalance: import_zod77.z.object({
        rawBalance: import_zod77.z.string(),
        formattedBalance: import_zod77.z.number(),
        assetId: import_zod77.z.number().nullable(),
        chainId: import_zod77.z.string(),
        address: import_zod77.z.string(),
        decimals: import_zod77.z.number(),
        name: import_zod77.z.string(),
        symbol: import_zod77.z.string(),
        logo: import_zod77.z.string().nullable(),
        price: import_zod77.z.number(),
        balanceUSD: import_zod77.z.number()
      }).nullable(),
      periodBuyTokens: import_zod77.z.number(),
      periodSellTokens: import_zod77.z.number(),
      periodTradingTokens: import_zod77.z.number(),
      holdingTokensCount: import_zod77.z.number(),
      holdingDuration: import_zod77.z.number(),
      tradingTimeFrames: import_zod77.z.number(),
      winRealizedPnl: import_zod77.z.number(),
      winRealizedPnlRate: import_zod77.z.number(),
      winToken: import_zod77.z.object({
        address: import_zod77.z.string(),
        chainId: import_zod77.z.string(),
        name: import_zod77.z.string(),
        symbol: import_zod77.z.string(),
        logo: import_zod77.z.string().nullable(),
        decimals: import_zod77.z.number()
      }).nullable()
    }),
    labels: import_zod77.z.array(import_zod77.z.string())
  })
});
var WalletAnalysisResponseSchemaOpenAPI = import_zod77.z.object({
  data: import_zod77.z.object({
    winRateDistribution: import_zod77.z.object({
      ">500%": import_zod77.z.number(),
      "200%-500%": import_zod77.z.number(),
      "50%-200%": import_zod77.z.number(),
      "0%-50%": import_zod77.z.number(),
      "-50%-0%": import_zod77.z.number(),
      "<-50%": import_zod77.z.number()
    }),
    marketCapDistribution: import_zod77.z.object({
      ">1000M": import_zod77.z.number(),
      ">100M": import_zod77.z.number(),
      "10M-100M": import_zod77.z.number(),
      "1M-10M": import_zod77.z.number(),
      "100k-1M": import_zod77.z.number(),
      "<100k": import_zod77.z.number()
    }),
    periodTimeframes: import_zod77.z.array(import_zod77.z.object({
      date: import_zod77.z.string(),
      realized: import_zod77.z.number()
    })),
    stat: import_zod77.z.object({
      totalValue: import_zod77.z.number(),
      periodTotalPnlUSD: import_zod77.z.number(),
      periodRealizedPnlUSD: import_zod77.z.number(),
      periodRealizedRate: import_zod77.z.number(),
      periodActiveTokensCount: import_zod77.z.number(),
      periodWinCount: import_zod77.z.number(),
      fundingInfo: import_zod77.z.object({
        from: import_zod77.z.string().nullable(),
        date: import_zod77.z.string().nullable(),
        chainId: import_zod77.z.string().nullable(),
        txHash: import_zod77.z.string().nullable(),
        amount: import_zod77.z.string().nullable(),
        fromWalletLogo: import_zod77.z.string().nullable(),
        fromWalletTag: import_zod77.z.string().nullable()
      }),
      periodVolumeBuy: import_zod77.z.number(),
      periodVolumeSell: import_zod77.z.number(),
      periodBuys: import_zod77.z.number(),
      periodSells: import_zod77.z.number(),
      nativeBalance: import_zod77.z.object({
        rawBalance: import_zod77.z.string(),
        formattedBalance: import_zod77.z.number(),
        assetId: import_zod77.z.number().nullable(),
        chainId: import_zod77.z.string(),
        address: import_zod77.z.string(),
        decimals: import_zod77.z.number(),
        name: import_zod77.z.string(),
        symbol: import_zod77.z.string(),
        logo: import_zod77.z.string().nullable(),
        price: import_zod77.z.number(),
        balanceUSD: import_zod77.z.number()
      }).nullable(),
      periodBuyTokens: import_zod77.z.number(),
      periodSellTokens: import_zod77.z.number(),
      periodTradingTokens: import_zod77.z.number(),
      holdingTokensCount: import_zod77.z.number(),
      holdingDuration: import_zod77.z.number(),
      tradingTimeFrames: import_zod77.z.number(),
      winRealizedPnl: import_zod77.z.number(),
      winRealizedPnlRate: import_zod77.z.number(),
      winToken: import_zod77.z.object({
        address: import_zod77.z.string(),
        chainId: import_zod77.z.string(),
        name: import_zod77.z.string(),
        symbol: import_zod77.z.string(),
        logo: import_zod77.z.string().nullable(),
        decimals: import_zod77.z.number()
      }).nullable()
    }),
    labels: import_zod77.z.array(import_zod77.z.string())
  })
});
// src/v2/wallet/WalleFundingQuerySchema.ts
var import_zod78 = require("zod");
var WalletFundingParamsSchema = import_zod78.z.object({
  wallet: import_zod78.z.string().min(1, "Wallet address is required")
});
var WalletFundingResponseSchema = import_zod78.z.object({
  data: import_zod78.z.object({
    from: import_zod78.z.string().nullable(),
    chainId: import_zod78.z.string().nullable(),
    date: import_zod78.z.date().nullable(),
    txHash: import_zod78.z.string().nullable(),
    amount: import_zod78.z.string().nullable(),
    fromWalletLogo: import_zod78.z.string().nullable(),
    fromWalletTag: import_zod78.z.string().nullable()
  })
});
// src/v2/wallet/WalletActivityV2Schema.ts
var import_zod79 = require("zod");
var WalletActivityV2ParamsSchema = import_zod79.z.object({
  wallet: import_zod79.z.string(),
  blockchains: import_zod79.z.string().optional().transform((val) => {
    if (val) {
      return val.split(",").map((b) => b.trim()).filter((b) => b.length > 0);
    }
    return [];
  }),
  blacklist: import_zod79.z.string().optional().transform((val) => val ? val.split(",").map((addr) => addr.trim().toLowerCase()) : []),
  offset: import_zod79.z.coerce.number().optional().default(0),
  limit: import_zod79.z.coerce.number().optional().default(100),
  order: import_zod79.z.enum(["asc", "desc"]).optional().default("desc"),
  pagination: import_zod79.z.union([import_zod79.z.boolean(), import_zod79.z.string()]).optional().transform((val) => val === true || val === "true").default(false),
  unlistedAssets: import_zod79.z.union([import_zod79.z.boolean(), import_zod79.z.string()]).optional().transform((val) => val === true || val === "true").default(true),
  filterSpam: import_zod79.z.union([import_zod79.z.boolean(), import_zod79.z.string()]).optional().transform((val) => val === true || val === "true").default(true),
  backfillTransfers: import_zod79.z.union([import_zod79.z.boolean(), import_zod79.z.string()]).optional().transform((val) => val === true || val === "true").default(false),
  backfillBalances: import_zod79.z.union([import_zod79.z.boolean(), import_zod79.z.string()]).optional().transform((val) => val === true || val === "true").default(false),
  cursor_hash: import_zod79.z.string().optional(),
  cursor_direction: import_zod79.z.enum(["before", "after"]).optional().default("before"),
  withTokens: import_zod79.z.union([import_zod79.z.boolean(), import_zod79.z.string()]).optional().transform((val) => val === true || val === "true").default(false)
});
var ActivityAssetSchema = import_zod79.z.object({
  id: import_zod79.z.number().nullable(),
  name: import_zod79.z.string(),
  symbol: import_zod79.z.string(),
  decimals: import_zod79.z.number(),
  totalSupply: import_zod79.z.number(),
  circulatingSupply: import_zod79.z.number(),
  price: import_zod79.z.number(),
  liquidity: import_zod79.z.number(),
  priceChange24hPercent: import_zod79.z.number(),
  marketCapUsd: import_zod79.z.number(),
  logo: import_zod79.z.string().nullable(),
  contract: import_zod79.z.string()
});
var WalletActivityV2TransactionActivitySchema = import_zod79.z.object({
  model: import_zod79.z.enum(["swap", "transfer"]),
  swapType: import_zod79.z.enum(["REGULAR", "MEV", "SANDWICHED_MEV", "DEPOSIT", "WITHDRAW"]).optional(),
  swapRawAmountOut: import_zod79.z.number().optional(),
  swapRawAmountIn: import_zod79.z.number().optional(),
  swapAmountOut: import_zod79.z.number().optional(),
  swapAmountIn: import_zod79.z.number().optional(),
  swapPriceUsdTokenOut: import_zod79.z.number().optional(),
  swapPriceUsdTokenIn: import_zod79.z.number().optional(),
  swapAmountUsd: import_zod79.z.number().optional(),
  swapTransactionSenderAddress: import_zod79.z.string().optional(),
  swapBaseAddress: import_zod79.z.string().optional(),
  swapQuoteAddress: import_zod79.z.string().optional(),
  swapAmountQuote: import_zod79.z.number().optional(),
  swapAmountBase: import_zod79.z.number().optional(),
  swapAssetIn: ActivityAssetSchema.optional(),
  swapAssetOut: ActivityAssetSchema.optional(),
  transferRawAmount: import_zod79.z.string().optional(),
  transferAmount: import_zod79.z.number().optional(),
  transferAmountUsd: import_zod79.z.number().optional(),
  transferType: import_zod79.z.enum(["VAULT_DEPOSIT", "VAULT_WITHDRAW", "VAULT_UNSTAKE", "TOKEN_IN", "TOKEN_OUT", "NATIVE_IN", "NATIVE_OUT"]).optional(),
  transferFromAddress: import_zod79.z.string().optional().nullable(),
  transferToAddress: import_zod79.z.string().optional().nullable(),
  transferAsset: ActivityAssetSchema.optional()
});
var WalletActivityV2TransactionSchema = import_zod79.z.object({
  chainId: import_zod79.z.string(),
  txDateMs: import_zod79.z.number(),
  txDateIso: import_zod79.z.string(),
  txHash: import_zod79.z.string(),
  txRawFeesNative: import_zod79.z.string(),
  txFeesNativeUsd: import_zod79.z.number(),
  txBlockNumber: import_zod79.z.number(),
  txIndex: import_zod79.z.number(),
  txAction: import_zod79.z.string().optional().nullable(),
  actions: import_zod79.z.array(WalletActivityV2TransactionActivitySchema)
});
var WalletActivityV2OutputDataSchema = import_zod79.z.array(WalletActivityV2TransactionSchema);
var WalletActivityV2OutputPaginationSchema = import_zod79.z.object({
  page: import_zod79.z.number(),
  offset: import_zod79.z.number(),
  limit: import_zod79.z.number(),
  pageEntries: import_zod79.z.number()
});
var WalletActivityV2ResponseSchema = import_zod79.z.object({
  data: WalletActivityV2OutputDataSchema,
  pagination: WalletActivityV2OutputPaginationSchema,
  backfillStatus: import_zod79.z.enum(["processed", "processing", "pending"]).optional(),
  tokens: import_zod79.z.array(TokenDetailsOutput).optional()
});
// src/v2/wallet/WalletDefiPositionsSchema.ts
var import_zod80 = require("zod");
var walletAddressSchema = import_zod80.z.string().min(32, "Invalid wallet address").max(44, "Invalid wallet address").or(import_zod80.z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM wallet address"));
var WalletDefiPositionsParamsSchema = import_zod80.z.object({
  wallet: walletAddressSchema.describe("Wallet address (EVM or Solana)"),
  blockchains: import_zod80.z.string().describe('Blockchain to fetch positions from (e.g., "solana", "ethereum")')
});
// src/v2/wallet/WalletDeployerSchema.ts
var WalletV2DeployerParamsSchema = WalletDeployerQuery;
var WalletV2DeployerResponseSchema = walletDeployerOutputSchema;
// src/v2/wallet/WalletPerpsPositionsSchema.ts
var import_zod81 = require("zod");
var ExchangesIds = import_zod81.z.enum(["gains", "hyperliquid", "gte", "lighter", "drift"]);
var tpSlSchema = import_zod81.z.object({ size: import_zod81.z.bigint(), price: import_zod81.z.number(), id: import_zod81.z.number() });
var PerpsPositionSchema = import_zod81.z.object({
  id: import_zod81.z.string(),
  entryPriceQuote: import_zod81.z.number(),
  currentLeverage: import_zod81.z.number(),
  amountUSD: import_zod81.z.number(),
  amountRaw: import_zod81.z.bigint(),
  side: import_zod81.z.enum(["BUY", "SELL"]),
  liquidationPriceQuote: import_zod81.z.number(),
  currentPriceQuote: import_zod81.z.number(),
  realizedPnlUSD: import_zod81.z.number(),
  unrealizedPnlUSD: import_zod81.z.number(),
  realizedPnlPercent: import_zod81.z.number(),
  unrealizedPnlPercent: import_zod81.z.number(),
  tp: import_zod81.z.array(tpSlSchema),
  sl: import_zod81.z.array(tpSlSchema),
  marketId: import_zod81.z.string(),
  exchange: ExchangesIds,
  feesOpeningUSD: import_zod81.z.number(),
  feesClosingUSD: import_zod81.z.number(),
  feesFundingUSD: import_zod81.z.number(),
  openDate: import_zod81.z.date(),
  lastUpdate: import_zod81.z.date(),
  address: import_zod81.z.string(),
  chainId: import_zod81.z.string(),
  collateralAsset: import_zod81.z.string()
});
var PerpsPositionNonExecutedSchema = PerpsPositionSchema.extend({
  type: import_zod81.z.enum(["STOP", "LIMIT"])
});
var WalletPerpsPositionsResponseSchema = import_zod81.z.object({
  data: import_zod81.z.array(PerpsPositionSchema)
});
var WalletPerpsPositionsNonExecutedResponseSchema = import_zod81.z.object({
  data: import_zod81.z.array(PerpsPositionNonExecutedSchema)
});
// src/v2/wallet/WalletPositionsSchema.ts
var import_zod82 = require("zod");
var WalletPositionsParamsSchema = import_zod82.z.object({
  wallet: import_zod82.z.string(),
  blockchain: import_zod82.z.string().optional(),
  backfillPositions: import_zod82.z.union([import_zod82.z.boolean(), import_zod82.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val),
  backfillSwapsAndPositions: import_zod82.z.union([import_zod82.z.boolean(), import_zod82.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
var SinglePositionQuery = import_zod82.z.object({
  wallet: import_zod82.z.string(),
  asset: import_zod82.z.string(),
  blockchain: import_zod82.z.string()
});
var SinglePositionItemSchema = import_zod82.z.object({
  wallet: import_zod82.z.string(),
  asset: import_zod82.z.string(),
  blockchain: import_zod82.z.string()
});
var SinglePositionBatchParamsSchema = import_zod82.z.union([
  import_zod82.z.array(SinglePositionItemSchema),
  import_zod82.z.object({
    items: import_zod82.z.array(SinglePositionItemSchema),
    instanceTracking: import_zod82.z.preprocess((val) => {
      if (val === "true")
        return true;
      if (val === "false")
        return false;
      return val;
    }, import_zod82.z.boolean().optional())
  })
]);
var WalletPositionsResponseSchema = import_zod82.z.object({
  data: import_zod82.z.array(tokenPositionSchema)
});
var singlePositionOutputSchema = import_zod82.z.object({
  data: tokenPositionSchema
});
var batchPositionItemSchema = tokenPositionSchema.extend({
  wallet: import_zod82.z.string()
});
var SinglePositionBatchResponseSchema = import_zod82.z.object({
  payload: import_zod82.z.array(batchPositionItemSchema.or(import_zod82.z.object({ error: import_zod82.z.string().optional(), wallet: import_zod82.z.string().optional() })).nullable()),
  hostname: import_zod82.z.string().optional()
});
// src/v2/wallet/WalletTokenBalancesSchema.ts
var import_zod83 = require("zod");
var tokenHoldingSchema = import_zod83.z.object({
  token: import_zod83.z.object({
    address: import_zod83.z.string(),
    chainId: import_zod83.z.string(),
    name: import_zod83.z.string().nullable(),
    symbol: import_zod83.z.string().nullable(),
    logo: import_zod83.z.string().nullable(),
    decimals: import_zod83.z.coerce.number().default(0),
    holdersCount: import_zod83.z.coerce.number().default(0),
    deployer: import_zod83.z.string().nullable(),
    website: import_zod83.z.string().nullable(),
    x: import_zod83.z.string().nullable(),
    telegram: import_zod83.z.string().nullable(),
    description: import_zod83.z.string().nullable(),
    security: SecurityFlagsSchema.nullable()
  }),
  balance: import_zod83.z.number(),
  rawBalance: import_zod83.z.string(),
  lamports: import_zod83.z.string().nullable().optional()
});
var WalletHoldingsResponseSchema = import_zod83.z.object({
  data: import_zod83.z.array(tokenHoldingSchema)
});
// src/wss/aggregated-feed/FeedSchema.ts
var import_zod84 = require("zod");
var FeedPayloadSchema = import_zod84.z.discriminatedUnion("kind", [
  import_zod84.z.object({
    kind: import_zod84.z.literal("asset_ids"),
    asset_ids: import_zod84.z.array(import_zod84.z.number()).optional(),
    quote_id: import_zod84.z.number().optional().nullable()
  }),
  import_zod84.z.object({
    kind: import_zod84.z.literal("address"),
    tokens: import_zod84.z.array(import_zod84.z.object({
      blockchain: import_zod84.z.string(),
      address: import_zod84.z.string()
    })),
    quote: import_zod84.z.object({
      address: import_zod84.z.string(),
      blockchain: import_zod84.z.string()
    }).optional()
  }),
  import_zod84.z.object({
    kind: import_zod84.z.literal("all")
  })
]);
var FeedAssetIdSchema = import_zod84.z.object({
  asset_ids: import_zod84.z.array(import_zod84.z.number()).optional(),
  quote_id: import_zod84.z.number().optional().nullable()
});
var FeedTokenSchema = import_zod84.z.object({
  tokens: import_zod84.z.array(import_zod84.z.object({
    blockchain: import_zod84.z.string(),
    address: import_zod84.z.string()
  })),
  quote: import_zod84.z.object({
    address: import_zod84.z.string(),
    blockchain: import_zod84.z.string()
  }).optional()
});
// src/wss/BalancePayloadSchema.ts
var import_zod85 = require("zod");
var BalanceItemSchema = import_zod85.z.object({
  wallet: import_zod85.z.string(),
  token: import_zod85.z.string(),
  blockchain: import_zod85.z.string()
});
var BalancePayloadSchema = import_zod85.z.object({
  items: import_zod85.z.array(BalanceItemSchema),
  subscriptionId: import_zod85.z.string().optional(),
  subscriptionTracking: import_zod85.z.union([import_zod85.z.boolean(), import_zod85.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/FastTradePayloadSchema.ts
var import_zod86 = require("zod");
var FastTradesPayloadSchema = import_zod86.z.object({
  assetMode: import_zod86.z.coerce.boolean().default(false),
  items: import_zod86.z.array(import_zod86.z.object({
    address: import_zod86.z.string(),
    blockchain: import_zod86.z.string()
  })),
  subscriptionId: import_zod86.z.string().optional(),
  subscriptionTracking: import_zod86.z.union([import_zod86.z.boolean(), import_zod86.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/FundingPayloadSchema.ts
var import_zod87 = require("zod");
var FundingPayloadSchema = import_zod87.z.object({
  symbol: import_zod87.z.string(),
  quote: import_zod87.z.string().optional(),
  exchange: import_zod87.z.string().optional().transform((val) => {
    const validExchanges = ["binance", "bybit", "hyperliquid", "deribit", "okx", "gate"];
    if (!val)
      return validExchanges;
    const requestedExchanges = val.split(",").map((ex) => ex.trim().toLowerCase()).filter((ex) => validExchanges.includes(ex));
    return requestedExchanges.length > 0 ? requestedExchanges : validExchanges;
  }),
  interval: import_zod87.z.number().optional().default(5),
  subscriptionId: import_zod87.z.string().optional(),
  subscriptionTracking: import_zod87.z.string().optional()
});
// src/wss/HoldersPayloadSchema.ts
var import_zod88 = require("zod");
var HoldersPayloadSchema = import_zod88.z.object({
  tokens: import_zod88.z.array(import_zod88.z.object({
    address: import_zod88.z.string(),
    blockchain: import_zod88.z.string()
  })),
  subscriptionId: import_zod88.z.string().optional(),
  subscriptionTracking: import_zod88.z.union([import_zod88.z.boolean(), import_zod88.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/MarketDetailsPayloadSchema.ts
var import_zod89 = require("zod");
var MarketDetailsPayloadSchema = import_zod89.z.object({
  pools: import_zod89.z.array(import_zod89.z.object({
    address: import_zod89.z.string(),
    blockchain: import_zod89.z.string()
  })),
  subscriptionId: import_zod89.z.string().optional(),
  subscriptionTracking: import_zod89.z.union([import_zod89.z.boolean(), import_zod89.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/MarketPayloadSchema.ts
var import_zod90 = require("zod");
var MarketPayloadSchema = import_zod90.z.object({
  interval: import_zod90.z.number().default(30),
  subscriptionId: import_zod90.z.string().optional(),
  assets: import_zod90.z.array(import_zod90.z.union([
    import_zod90.z.object({ name: import_zod90.z.string() }),
    import_zod90.z.object({ symbol: import_zod90.z.string() }),
    import_zod90.z.object({
      address: import_zod90.z.string(),
      blockchain: import_zod90.z.string()
    })
  ])).max(100),
  subscriptionTracking: import_zod90.z.union([import_zod90.z.boolean(), import_zod90.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/OhlcvPayloadSchema.ts
var import_zod91 = require("zod");
var OhlcvPayloadSchema = import_zod91.z.object({
  address: import_zod91.z.string().optional(),
  subscriptionId: import_zod91.z.string().optional(),
  blockchain: import_zod91.z.string().optional(),
  chainId: import_zod91.z.string().optional(),
  period: import_zod91.z.string().optional().transform((val) => {
    if (val) {
      return normalizePeriod(val);
    }
    return "5m";
  }),
  asset: import_zod91.z.string().optional(),
  currentPrice: import_zod91.z.string().optional(),
  mode: import_zod91.z.enum(["asset", "pair"]).optional(),
  subscriptionTracking: import_zod91.z.union([import_zod91.z.boolean(), import_zod91.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/PairsPayloadSchema.ts
var import_zod92 = require("zod");
var PairsPayloadSchema = import_zod92.z.object({
  mode: import_zod92.z.enum(["asset", "pair"]).optional().default("pair"),
  subscriptionId: import_zod92.z.string().optional(),
  blockchain: import_zod92.z.string().optional(),
  factory: import_zod92.z.string().optional(),
  interval: import_zod92.z.number().default(30),
  address: import_zod92.z.string().optional(),
  asset: import_zod92.z.string().optional(),
  subscriptionTracking: import_zod92.z.union([import_zod92.z.boolean(), import_zod92.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/PositionPayloadSchema.ts
var import_zod93 = require("zod");
var PositionPayloadSchema = import_zod93.z.object({
  wallet: import_zod93.z.string(),
  token: import_zod93.z.string(),
  blockchain: import_zod93.z.string(),
  subscriptionId: import_zod93.z.string().optional(),
  subscriptionTracking: import_zod93.z.union([import_zod93.z.boolean(), import_zod93.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
var PositionsPayloadSchema = import_zod93.z.object({
  wallet: import_zod93.z.string(),
  blockchain: import_zod93.z.string(),
  subscriptionId: import_zod93.z.string().optional(),
  subscriptionTracking: import_zod93.z.union([import_zod93.z.boolean(), import_zod93.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});
// src/wss/pulse/PausePulsePayloadSchema.ts
var import_zod94 = require("zod");
var PausePulsePayloadSchema = import_zod94.z.object({
  action: import_zod94.z.enum(["pause", "unpause"]),
  views: import_zod94.z.array(import_zod94.z.string()).min(1)
});
// src/wss/stream/StreamPayloadSchema.ts
var import_zod96 = require("zod");

// src/utils/schemas/Filter.ts
var import_zod95 = require("zod");
var BaseFilter2 = import_zod95.z.object({
  eq: import_zod95.z.tuple([import_zod95.z.string(), import_zod95.z.union([import_zod95.z.string(), import_zod95.z.number(), import_zod95.z.boolean(), import_zod95.z.null()])]).optional(),
  neq: import_zod95.z.tuple([import_zod95.z.string(), import_zod95.z.union([import_zod95.z.string(), import_zod95.z.number(), import_zod95.z.boolean(), import_zod95.z.null()])]).optional(),
  lt: import_zod95.z.tuple([import_zod95.z.string(), import_zod95.z.coerce.number()]).optional(),
  lte: import_zod95.z.tuple([import_zod95.z.string(), import_zod95.z.coerce.number()]).optional(),
  gt: import_zod95.z.tuple([import_zod95.z.string(), import_zod95.z.coerce.number()]).optional(),
  gte: import_zod95.z.tuple([import_zod95.z.string(), import_zod95.z.coerce.number()]).optional(),
  in: import_zod95.z.tuple([
    import_zod95.z.string(),
    import_zod95.z.union([
      import_zod95.z.string(),
      import_zod95.z.number(),
      import_zod95.z.boolean(),
      import_zod95.z.null(),
      import_zod95.z.array(import_zod95.z.union([import_zod95.z.string(), import_zod95.z.number(), import_zod95.z.boolean(), import_zod95.z.null()]))
    ])
  ]).optional()
});
var Filter2 = BaseFilter2.and(import_zod95.z.union([
  BaseFilter2.extend({ and: import_zod95.z.undefined(), or: import_zod95.z.undefined() }),
  BaseFilter2.extend({ and: import_zod95.z.array(import_zod95.z.lazy(() => Filter2)), or: import_zod95.z.undefined() }),
  BaseFilter2.extend({ and: import_zod95.z.undefined(), or: import_zod95.z.array(import_zod95.z.lazy(() => Filter2)) })
]));
function countOperations2(filter) {
  if (!filter)
    return 0;
  let count = 0;
  for (const key of ["eq", "neq", "lt", "lte", "gt", "gte", "in"]) {
    if (filter[key])
      count += 1;
  }
  if ("and" in filter && Array.isArray(filter.and)) {
    for (const child of filter.and) {
      count += countOperations2(child);
    }
  }
  if ("or" in filter && Array.isArray(filter.or)) {
    for (const child of filter.or) {
      count += countOperations2(child);
    }
  }
  return count;
}
var FilterWithLimit2 = Filter2.superRefine((val, ctx) => {
  const total = countOperations2(val);
  const max = 1000;
  if (total > max) {
    ctx.addIssue({
      code: import_zod95.z.ZodIssueCode.custom,
      message: `Your filter contains ${total} leaf operations, exceeding the maximum of ${max}. Only leaf conditions like "eq", "neq", "lt", "lte", "gt", "gte", "in" are counted; logical operators ("and", "or") are ignored.`
    });
  }
});
var Filter_default = FilterWithLimit2;

// src/wss/stream/StreamPayloadSchema.ts
var StreamPayloadSchema = import_zod96.z.object({
  filters: Filter_default.optional(),
  chainIds: import_zod96.z.array(import_zod96.z.string()).nonempty(),
  name: import_zod96.z.string().optional(),
  events: import_zod96.z.array(import_zod96.z.enum(["swap", "transfer", "swap-enriched", "block", "order"])).nonempty(),
  authorization: import_zod96.z.string(),
  subscriptionId: import_zod96.z.string().optional(),
  subscriptionTracking: import_zod96.z.string().optional(),
  debugSubscriptionId: import_zod96.z.string().optional()
});
var UnsubscribeStreamPayloadSchema = import_zod96.z.object({
  type: import_zod96.z.enum(["stream"]).optional(),
  subscriptionId: import_zod96.z.string().optional(),
  personalizedId: import_zod96.z.string().optional(),
  viewName: import_zod96.z.string().optional()
}).transform((data) => {
  if (data.personalizedId && !data.subscriptionId) {
    return {
      ...data,
      subscriptionId: data.personalizedId
    };
  }
  return data;
}).optional();
var UpdateStreamPayloadSchema = import_zod96.z.object({
  subscriptionId: import_zod96.z.string(),
  authorization: import_zod96.z.string(),
  mode: import_zod96.z.enum(["merge", "replace"]).default("replace"),
  filters: Filter_default.optional(),
  chainIds: import_zod96.z.array(import_zod96.z.string()).optional(),
  events: import_zod96.z.array(import_zod96.z.string()).optional(),
  subscriptionTracking: import_zod96.z.string().optional()
});
// src/wss/TokenDetailsPayloadSchema.ts
var import_zod97 = require("zod");
var TokenDetailsPayloadSchema = import_zod97.z.object({
  tokens: import_zod97.z.array(import_zod97.z.object({
    address: import_zod97.z.string(),
    blockchain: import_zod97.z.string()
  })),
  subscriptionId: import_zod97.z.string().optional(),
  subscriptionTracking: import_zod97.z.union([import_zod97.z.boolean(), import_zod97.z.string()]).default(false).transform((val) => typeof val === "string" ? val === "true" : val)
});

//# debugId=7826C36F59A2923064756E2164756E21
