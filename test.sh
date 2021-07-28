#!/usr/local/bin/zsh
echo -e "\033[32m> TEST 1 - CALLER PRINCIPAL \033[0m"
dfx canister call phonebook callerPrincipal
echo -e "\033[32m> TEST 2 - CREATE BOOK \033[0m"
dfx identity use johnathan
dfx canister call phonebook createBook
dfx identity use default
dfx canister call phonebook createBook
echo -e "\033[32m> TEST 3 - INSERT ENTRIES \033[0m"
dfx identity use default
dfx canister call phonebook insert '("Johnathan", record { desc="My Friend!"; phone="123456" })'
dfx canister call phonebook insert '("Joseph", record { desc="My Friend!"; phone="123423" })'
dfx canister call phonebook insert '("Jotaro", record { desc="My Friend!"; phone="654321" })'
dfx identity use johnathan 
dfx canister call phonebook insert '("Johnathan", record { desc="My Friend!"; phone="123456" })'
dfx canister call phonebook insert '("Joseph", record { desc="My Friend!"; phone="123423" })'
dfx canister call phonebook insert '("Jotaro", record { desc="My Friend!"; phone="654321" })'
echo -e "\033[32m> TEST 4 - PRINT THE BOOK \033[0m"
dfx canister call phonebook getBook
echo -e "\033[32m> TEST 5 - CODE UPGRADE \033[0m"
dfx deploy phonebook
dfx identity use default
dfx canister call phonebook getBook
dfx identity use johnathan 
dfx canister call phonebook getBook
echo -e "\033[32m> END OF TEST \033[0m"
