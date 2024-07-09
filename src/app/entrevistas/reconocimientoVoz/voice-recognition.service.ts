import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  recognition: any;
  isListening = false;
  onTranscript: ((interimTranscript: string, finalTranscript: string) => void) | null = null;
  onError: ((error: any) => void) | null = null;

  constructor() {
    const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (this.onTranscript) {
        this.onTranscript(interimTranscript, finalTranscript);
      }
    };

    this.recognition.onerror = (event: any) => {
      if (this.onError) {
        this.onError(event);
      }
    };
  }

  start() {
    this.isListening = true;
    this.recognition.start();
  }

  stop() {
    this.isListening = false;
    this.recognition.stop();
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
