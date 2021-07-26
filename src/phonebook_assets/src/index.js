import { phonebook } from "../../declarations/phonebook";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with phonebook actor, calling the greet method
  const greeting = await phonebook.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
