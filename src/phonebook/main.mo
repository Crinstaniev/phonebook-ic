import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Records "Record";

actor Service {
    type Name = Text;
    type Entry = {
        desc: Text;
        phone: Text;
    };
    type Record = Records.Record;

    let books = HashMap.HashMap<Principal, Record>(0, Principal.equal, Principal.hash);

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

    public shared(msg) func createBook() : async Text {
        let caller : Principal = msg.caller;
        switch(books.get(caller)) {
            case null { 
                let payload = Records.Record();
                books.put(caller, payload);
                return "[INFO] new phonebook created";
            };
            case (?record) {
                return "[ERR] phonebook already exists";
            };
        };
    };

    public shared({ caller }) func insert(name : Name, entry : Entry) : async Text {
        let book : ?Record = books.get(caller);
        switch(book) {
            case (?phonebook) {
                ignore phonebook.insert(name, entry);
                return "[INFO] entry inserted";
            };
            case _ {
                return "[ERR] book notfound"
            };
        };
    };

    public shared({ caller }) func delete(name : Name) : async Text {
        let book : ?Record = books.get(caller);
        switch(book) {
            case (?phonebook) {
                ignore phonebook.delete(name);
                return "[INFO] operation success";
            };
            case _ {
                return "[ERR] book notfound"
            };
        };
    };
};
