import { canisterId, createActor } from '../../declarations/phonebook';
import { AuthClient } from '@dfinity/auth-client';

export const getActor = async identity => {
  const actor = createActor(canisterId, {
    agentOptions: {
      identity
    }
  });
  return actor;
};

export const getAuthClient = async () => {
  return await AuthClient.create();
};
