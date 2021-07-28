module Utils {
  public type Message = {
    msg: Text;
    code: Text;
  };

  public func signMsg(msg : Text, code : Text) : Message {
    return {
      msg = msg;
      code = code;
    };
  };
}