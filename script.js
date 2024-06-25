let localStream;
let remoteStream;
let localPeerConnection;
let remotePeerConnection;
let dataChannel;

const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');
const muteButton = document.getElementById('muteButton');
const videoButton = document.getElementById('videoButton');
const shareButton = document.getElementById('shareButton');
const sendButton = document.getElementById('sendButton');
const chatInput = document.getElementById('chatInput');
const chatBox = document.getElementById('chatBox');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

startButton.onclick = start;
callButton.onclick = call;
hangupButton.onclick = hangup;
muteButton.onclick = toggleMute;
videoButton.onclick = toggleVideo;
shareButton.onclick = shareScreen;
sendButton.onclick = sendMessage;

async function start() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
    callButton.disabled = false;
    muteButton.disabled = false;
    videoButton.disabled = false;
    shareButton.disabled = false;
  } catch (error) {
    console.error('Error accessing media devices.', error);
  }
}

async function call() {
  callButton.disabled = true;
  hangupButton.disabled = false;

  const configuration = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302'
      }
    ]
  };

  localPeerConnection = new RTCPeerConnection(configuration);
  remotePeerConnection = new RTCPeerConnection(configuration);

  dataChannel = localPeerConnection.createDataChannel('chat');
  dataChannel.onmessage = (event) => {
    const message = document.createElement('div');
    message.textContent = event.data;
    chatBox.appendChild(message);
  };

  remotePeerConnection.ondatachannel = (event) => {
    event.channel.onmessage = (event) => {
      const message = document.createElement('div');
      message.textContent = event.data;
      chatBox.appendChild(message);
    };
  };

  localPeerConnection.addEventListener('icecandidate', event => onIceCandidate(event, remotePeerConnection));
  remotePeerConnection.addEventListener('icecandidate', event => onIceCandidate(event, localPeerConnection));

  remotePeerConnection.addEventListener('track', event => {
    remoteStream = event.streams[0];
    remoteVideo.srcObject = remoteStream;
  });

  localStream.getTracks().forEach(track => localPeerConnection.addTrack(track, localStream));

  try {
    const offer = await localPeerConnection.createOffer();
    await localPeerConnection.setLocalDescription(offer);
    await remotePeerConnection.setRemoteDescription(offer);

    const answer = await remotePeerConnection.createAnswer();
    await remotePeerConnection.setLocalDescription(answer);
    await localPeerConnection.setRemoteDescription(answer);
  } catch (error) {
    console.error('Error creating offer/answer.', error);
  }
}

function onIceCandidate(event, peerConnection) {
  if (event.candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(event.candidate))
      .catch(error => console.error('Error adding ICE candidate.', error));
  }
}

function hangup() {
  localPeerConnection.close();
  remotePeerConnection.close();
  localPeerConnection = null;
  remotePeerConnection = null;
  hangupButton.disabled = true;
  callButton.disabled = false;
}

function toggleMute() {
  const audioTrack = localStream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
  muteButton.textContent = audioTrack.enabled ? 'Mute' : 'Unmute';
}

function toggleVideo() {
  const videoTrack = localStream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
  videoButton.textContent = videoTrack.enabled ? 'Disable Video' : 'Enable Video';
}

async function shareScreen() {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const screenTrack = screenStream.getTracks()[0];

    localPeerConnection.getSenders().find(sender => sender.track.kind === 'video').replaceTrack(screenTrack);

    screenTrack.onended = () => {
      localPeerConnection.getSenders().find(sender => sender.track.kind === 'video').replaceTrack(localStream.getTracks().find(track => track.kind === 'video'));
    };
  } catch (error) {
    console.error('Error sharing screen.', error);
  }
}

function sendMessage() {
  const message = chatInput.value;
  dataChannel.send(message);
  const messageElement = document.createElement('div');
  messageElement.textContent = `You: ${message}`;
  chatBox.appendChild(messageElement);
  chatInput.value = '';
}
