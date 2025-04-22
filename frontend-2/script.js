const uploadVoice = async () => {
    const fileInput = document.getElementById("voiceFile");
    const file = fileInput.files[0];
    const status = document.getElementById("uploadStatus");
  
    if (!file) {
      status.innerText = "Please select a file.";
      return;
    }
  
    const formData = new FormData();
    formData.append("voice", file);
  
    try {
      const res = await fetch("http://localhost:5000/upload_voice", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        status.innerText = "✅ Voice uploaded! Redirecting...";
        setTimeout(() => (window.location.href = "chat.html"), 1000);
      } else {
        status.innerText = "❌ Upload failed: " + data.error;
      }
    } catch (err) {
      status.innerText = "❌ Error: " + err.message;
    }
  };
  
  
  const sendMessage = async () => {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const text = input.value.trim();
    if (!text) return;
  
    chatBox.innerHTML += `<div><b>You:</b> ${text}</div>`;
    input.value = "";
  
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
  
      const data = await res.json();
      const reply = data.response;
      const audioUrl = "http://localhost:5000" + data.audio_url;
  
      chatBox.innerHTML += `<div><b>Echoes:</b> ${reply}</div>`;
  
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      chatBox.innerHTML += `<div style="color:red;"><b>Error:</b> ${err.message}</div>`;
    }
  
    chatBox.scrollTop = chatBox.scrollHeight;
  };
  