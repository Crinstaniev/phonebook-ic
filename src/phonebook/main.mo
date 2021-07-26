actor {
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };

    public query func queryName(name : Text) : async Text {
        return "Greeting from " # name # "!";
    };
};
