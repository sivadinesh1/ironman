import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-speech-text',
  templateUrl: './speech-text.page.html',
  styleUrls: ['./speech-text.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeechTextPage implements OnInit {
  bgcolor: any;

  text_sentences: any;

  gntext: any;

  conversation: any;

  constructor(private speechRecognition: SpeechRecognition, private _cdr: ChangeDetectorRef,
    private tts: TextToSpeech) {
    this.text_sentences = [
      "Good night, sweet dreams love you rithvik and kutti"
    ]
  }

  ngOnInit() {

    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }

      });

  }

  start() {

    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          this.bgcolor = matches[0];
          console.log('object.........' + matches[0]);
          console.log('object.........' + JSON.stringify(matches));
        },
        (onerror) => console.log('error:', onerror)
      )

  }

  textToSpeech() {
    this.tts.speak('Good night, sweet dreams love you rithvik and kutti')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  converse() {

    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
           this.conversation = matches[0];
      //    this.conversation = matches;
          //console.log('object.........' + matches[0]);
          this._cdr.detectChanges();
          this._cdr.markForCheck();

          if (this.conversation === 'hello') {
            this.tts.speak('how are you?')
              .then(() => console.log('Success'))
              .catch((reason: any) => console.log(reason));
          } else if (this.conversation === 'morning') {
            this.tts.speak('Good Morning')
              .then(() => console.log('Success'))
              .catch((reason: any) => console.log(reason));
          }

        },
        (onerror) => console.log('error:', onerror)
      )

  }

}
