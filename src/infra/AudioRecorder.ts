export class AudioRecorder {
  private audioBlobs: Blob[] = [];
  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;

  start() {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      return Promise.reject(
        new Error(
          "mediaDevices API or getUserMedia method is not supported in this browser.",
        ),
      );
    } else {
      return navigator.mediaDevices
        .getUserMedia({ audio: true })

        .then((stream) => {
          this.stream = stream;
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioBlobs = [];

          this.mediaRecorder.addEventListener("dataavailable", (event) => {
            this.audioBlobs.push(event.data);
          });

          this.mediaRecorder.start();
        });
    }
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      let mimeType = this.mediaRecorder?.mimeType;
      this.mediaRecorder!.addEventListener("stop", () => {
        let audioBlob = new Blob(this.audioBlobs, { type: mimeType });
        resolve(audioBlob);
      });
      this.cancel();
    });
  }

  cancel() {
    this.mediaRecorder!.stop();

    this.stopStream();

    this.resetRecordingProperties();
  }

  private stopStream() {
    this.stream!.getTracks().forEach((track) => track.stop());
  }

  private resetRecordingProperties() {
    this.mediaRecorder = null;
    this.stream = null;
  }
}
