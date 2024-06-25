 

```markdown
# WebRTC Video Streaming App

## Overview

This project is a WebRTC-based video streaming application that allows users to initiate a video call, send text messages, mute/unmute audio, toggle video, and share their screen. The app leverages the power of WebRTC for real-time peer-to-peer communication and Tailwind CSS for modern, responsive UI design.

## Features

- **Video Streaming**: Real-time video call between two peers.
- **Text Chat**: Send and receive messages during the video call.
- **Mute/Unmute Audio**: Toggle audio on/off during the call.
- **Toggle Video**: Enable or disable the video stream.
- **Screen Sharing**: Share your screen during the call.
- **Responsive UI**: Designed using Tailwind CSS for a modern and responsive interface.

## Project Structure

```
webrtc-video-streaming/
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── index.html
├── tailwind.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have Node.js installed. You can download it from [Node.js](https://nodejs.org/).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/1saptarshi/webrtc-video-streaming.git
    cd webrtc-video-streaming
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

3. Install Tailwind CSS:

    ```bash
    npm install tailwindcss
    ```

4. Generate the Tailwind CSS configuration file:

    ```bash
    npx tailwindcss init
    ```

### Running the Application

1. Compile the Tailwind CSS:

    ```bash
    npx tailwindcss -i ./css/styles.css -o ./css/tailwind.output.css --watch
    ```

2. Open `index.html` in your browser to view the application.

## Usage

### Starting a Call

1. Click the "Start" button to access your webcam and microphone.
2. Click the "Call" button to initiate a call.
3. The "Hang Up" button ends the call.

### Text Chat

- Type a message in the input box and click "Send" to send a message during the call.

### Audio and Video Controls

- **Mute**: Click the "Mute" button to toggle audio on/off.
- **Toggle Video**: Click the "Toggle Video" button to enable/disable the video stream.

### Screen Sharing

- Click the "Share Screen" button to share your screen. Click "Stop Sharing" to revert to the webcam stream.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [WebRTC](https://webrtc.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Font Awesome](https://fontawesome.com/)

## Contact

For any inquiries or feedback, please contact [Saptarshi Chowdhury](saptarshichowdhury860@gmail.com).

```
 (`1saptarshi`, ` Saptarshi Chowdhury`, `saptarshichowdhury860@gmail.com`)  
![image](https://github.com/1saptarshi/webrtc-video-streaming/assets/142312774/756fd334-459d-4b60-b62a-47f92e823a76)
