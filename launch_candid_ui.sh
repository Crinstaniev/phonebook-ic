#!/bin/bash

exec open http://localhost:8000/?canisterId=`dfx canister id __Candid_UI`&id=`dfx canister id phonebook`