import { primitivesSpecs } from "./primitives";
import { compositesSpecs } from "./composites";
import { templatesSpecs } from "./templates";

/** All component specs, by level. Product-level specs will live in src/product. */
export const allSpecs = [...primitivesSpecs, ...compositesSpecs, ...templatesSpecs];
export { primitivesSpecs, compositesSpecs, templatesSpecs };
