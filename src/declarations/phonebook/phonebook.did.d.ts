import type { Principal } from '@dfinity/principal';
export interface Entry { 'desc' : string, 'phone' : string }
export type Name = string;
export interface _SERVICE {
  'callerPrincipal' : () => Promise<Principal>,
  'createBook' : () => Promise<string>,
  'delete' : (arg_0: Name) => Promise<string>,
  'getBook' : () => Promise<[] | [Array<[Name, Entry]>]>,
  'insert' : (arg_0: Name, arg_1: Entry) => Promise<string>,
}
