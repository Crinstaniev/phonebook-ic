import Array "mo:base/Array";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Record "Record";
import Records "Record";
import Utils "Utils";

actor Service {
    type Name = Text;
    type Entry = {
        desc: Text;
        phone: Text;
    };
    type Record = Records.Record;
    type Message = Utils.Message;

    private stable var persist : [(Principal, [(Name, Entry)])] = [];

    let books = HashMap.HashMap<Principal, Record>(10, Principal.equal, Principal.hash);

    public shared(msg) func callerPrincipal() : async Principal {
        return msg.caller;
    };

    public shared(msg) func getBook() : async ?[(Name, Entry)] {
        let caller : Principal = msg.caller;
        let book : ?Record = books.get(caller);
        
        return switch(book) {
            case null {
                return null;
            };
            case (?record) {
                return ?record.getAll();
            };
        };
    };

    public shared(msg) func createBook() : async Message {
        let caller : Principal = msg.caller;
        switch(books.get(caller)) {
            case null { 
                let payload = Records.Record();
                books.put(caller, payload);
                return Utils.signMsg("[INFO] book created", "200");
            };
            case (?record) {
                return Utils.signMsg("[ERR] phonebook already exists", "500");
            };
        };
    };

    public shared({ caller }) func insert(name : Name, entry : Entry) : async Message {
        let book : ?Record = books.get(caller);
        switch(book) {
            case (?phonebook) {
                phonebook.insert(name, entry);
                return Utils.signMsg("[INFO] entry inserted", "200");
            };
            case _ {
                return Utils.signMsg("[ERR] book notfound", "404");
            };
        };
    };

    public shared({ caller }) func delete(name : Name) : async Message  {
        let book : ?Record = books.get(caller);
        switch(book) {
            case (?phonebook) {
                phonebook.delete(name);
                return Utils.signMsg("[INFO] operation success", "200");
            };
            case _ {
                return Utils.signMsg("[ERR] book notfound", "404");
            };
        };
    };

    system func preupgrade() {
        for ((prince, map) in books.entries()) {
            persist := Array.append([(prince, map.getAll())], persist);
        };
    };

    system func postupgrade() {
        for ((prince, map) in Iter.fromArray(persist)) {
            let payload = Records.Record();
            for ((name, entry) in Iter.fromArray(map)) {
                payload.insert(name, entry);
            };
            books.put(prince, payload);
        };
    };
};
