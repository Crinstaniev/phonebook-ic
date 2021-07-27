export const idlFactory = ({ IDL }) => {
  const Name = IDL.Text;
  const Entry = IDL.Record({ 'desc' : IDL.Text, 'phone' : IDL.Text });
  return IDL.Service({
    'callerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'createBook' : IDL.Func([], [IDL.Text], []),
    'delete' : IDL.Func([Name], [IDL.Text], []),
    'getBook' : IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Tuple(Name, Entry)))], []),
    'insert' : IDL.Func([Name, Entry], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
