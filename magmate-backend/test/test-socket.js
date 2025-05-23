/*
const { io } = require("socket.io-client");

// Configuration
const FRIEND_ID = "4b8a32ce-b48c-4844-9a43-65d863f64b36"; // Doit correspondre à un ID existant
const SOCKET_URL = "http://localhost:3000/messagerie";
const AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5MWYxNWRlZTg0OTUzNjZjOTgyZTA1MTMzYmNhOGYyNDg5ZWFjNzIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiemFpbmViIGJhcWlsaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMN0ZpZkZhaEZhVTdVZEdRN3BqdnpFTGVxcUFSUjliNlBjUnFkNWYxcDI1TVE4MlQySj1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tYWdtYXRlLTYwMTlhIiwiYXVkIjoibWFnbWF0ZS02MDE5YSIsImF1dGhfdGltZSI6MTc0NjgyNzY3MSwidXNlcl9pZCI6IkllVDhrR1ZzVHpUWUIzVW1zMG9NTm1RTVhrNDIiLCJzdWIiOiJJZVQ4a0dWc1R6VFlCM1VtczBvTU5tUU1YazQyIiwiaWF0IjoxNzQ2ODI3NjcxLCJleHAiOjE3NDY4MzEyNzEsImVtYWlsIjoiYmFxaWxpLmhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDg4NjUyNjQyMTM0OTQyMTc1NDMiXSwiZW1haWwiOlsiYmFxaWxpLmhAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.p8w8DTBVH3NiCMqWD4TyTtzusHmcvHm5fbIW7A8LJ_fh5M18s6pfv20fUrSrM1Y5dmFVc-pfAHB1LZBZbG5l34h6OuGtNamVWFLpT7YOo_CqEp0YIBIKmdurCGaQMVtMHi6LYtoOzCpQNr1eBApDknbL0WyPELnBGeSeEPRULsjw5jfS86gc8MIeuBgWE3Nx2Wwp4Jq44WrC3qcipQCOuXx4-_7Ua7RE9uK0QvG-LYNyYHeEhowWNA9nvc0cAUOZI_eI-Cym0VrDiRb09tbhInFNyeu1NjrC3PbqYqf_uZkVjU5qDBvj0J1x5svaqbSrP2hwTfBH6d58rUl-7CQ3-g"; // Votre token complet ici

// Initialisation
const socket = io(SOCKET_URL, {
  auth: {
    token: AUTH_TOKEN
  },

});

// Événements
socket.on("connect", () => {
  console.log("✅ Connected with ID:", socket.id);
  
  setTimeout(() => {
    console.log("⚡ Attempting to create conversation with friend:", FRIEND_ID);
    socket.emit("createConversation", { id: FRIEND_ID });
  }, 2000);
});

socket.on("conversations", (conversations) => {
  console.log("📋 Received conversations:", JSON.stringify(conversations, null, 2));
  
  if (conversations && conversations.length > 0) {
    const lastConversation = conversations[conversations.length - 1];
    
    console.log("🔗 Joining conversation:", lastConversation.id);
    socket.emit("joinConversation", FRIEND_ID); // On utilise friendId comme dans votre gateway
    
    setTimeout(() => {
      const message = {
        message: "Bonjour! Ceci est mon premier message",
        conversation: {
          id: lastConversation.id
        }
      };
      
      console.log("📤 Sending message:", message);
      socket.emit("sendMessage", message);
    }, 2000);
  }
});

socket.on("messages", (messages) => {
  console.log("📨 Messages in conversation:", messages);
});

socket.on("newMessage", (msg) => {
  console.log("📥 New message received:", msg);
});

socket.on("error", (err) => {
  console.error("❌ Error:", err);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected:", reason);
});

// Gestion des erreurs non catchées
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  process.exit(1);
});

*/