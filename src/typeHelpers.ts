export type ValueOf<T> = T[keyof T];
// Construct a new union U consisting of the provided keys (U)
// that occur with in the union T
export type SubUnion<T, U extends T> = U;
