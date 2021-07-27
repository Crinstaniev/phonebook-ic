import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

type Name = Text;
type Entry = {
  desc: Text;
  phone: Text;
};

object class Record() {
  let phonebook = HashMap.HashMap<Name, Entry>(0, Text.equal, Text.hash);
  public func insert(name : Name, entry : Entry) : async () {
    phonebook.put(name, entry);
  };

  public func lookup(name : Name) : ?Entry {
    return phonebook.get(name);
  };

  public func getAll() : [(Name, Entry)] {
    return Iter.toArray(phonebook.entries());
  };

  public func delete(name : Name) : () {
    phonebook.delete(name);
  };
};
