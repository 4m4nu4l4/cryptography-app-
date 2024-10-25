let privateKey;

// Função para importar a chave privada do localStorage
async function importPrivateKey() {
    const keyData = JSON.parse(localStorage.getItem("privateKey"));
    privateKey = await window.crypto.subtle.importKey(
        "jwk",
        keyData,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );
}

// Função para descriptografar a mensagem
async function decryptMessage() {
    await importPrivateKey();
    const encryptedMessage = document.getElementById("encryptedMessage").value;
    const decodedMessage = Uint8Array.from(atob(encryptedMessage), c => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        decodedMessage
    );

    const decoder = new TextDecoder();
    document.getElementById("decryptedMessage").value = decoder.decode(decrypted);
}
