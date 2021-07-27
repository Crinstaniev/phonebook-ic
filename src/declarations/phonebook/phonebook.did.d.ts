import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'callerPrincipal' : () => Promise<Principal>,
  'greet' : (arg_0: string) => Promise<string>,
}
