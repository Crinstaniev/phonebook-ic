import { canisterId, createActor } from "../../declarations/phonebook";

export const getActor = async (identity) => {
  const actor = createActor(canisterId, {
    agentOptions: {
      identity: identity,
    },
  });

  return actor;
};
