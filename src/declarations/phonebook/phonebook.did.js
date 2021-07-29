export const idlFactory = ({ IDL }) => {
  const Message = IDL.Record({ 'msg' : IDL.Text, 'code' : IDL.Text });
  const Name = IDL.Text;
  const Entry = IDL.Record({ 'desc' : IDL.Text, 'phone' : IDL.Text });
  return IDL.Service({
    'callerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'createBook' : IDL.Func([], [Message], []),
    'delete' : IDL.Func([Name], [Message], []),
    'getBook' : IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Tuple(Name, Entry)))], []),
    'insert' : IDL.Func([Name, Entry], [Message], []),
  });
};
export const init = ({ IDL }) => { return []; };
