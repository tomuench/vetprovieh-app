import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import RecordRTC from "recordrtc";
import { RecordingModal } from "./recording-modal";


@WebComponent({
    tag: "recording-video-modal",
    template: VetproviehElement.template + `
    <div id="modal" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Aufnahme für \${this.title}</p>
            <button id="closeButton" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <video style="object-fit: fill;" id="media">
            </video>
        </section>
        <footer class="modal-card-foot"> 
            <div class="field is-grouped">
                <p class="control">
                    <button class="button is-primary" id="start">
                        <span class="icon"><i class="fas fa-play"></i></span>
                        <span>Aufnahme starten</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button is-danger" id="stop" disabled>
                        <span class="icon"><i class="fas fa-stop"></i></span>
                        <span>Aufnahme stoppen</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button is-primary is-hidden" id="takeoverButton">
                    <span class="icon"><i class="fas fa-download"></i></span>
                        <span>Aufnahme übernehmen</span>
                    </button>
                </p>
          </div>
        </footer>
        </div>
    </div>`
})
export class RecordingVideoModal extends RecordingModal {

    private recorder: RecordRTC | undefined;
    private _recording: boolean = false;

    /**
     * Set Recording
     * @param {boolean} v
     */
    private set recording(v: boolean) {
        if (this._recording != v) {
            if (this.startButton) this.startButton.disabled = v;
            if (this.stopButton) this.stopButton.disabled = !v;
            this._recording = v;
        }
    }

    /**
     * Add Listener to Buttons
     */
    protected addButtonListeners() {

        var _self = this;
        this.startButton.addEventListener("click", () => {
            this.startRecording(_self)
        });
        this.stopButton.addEventListener("click", () => {
            this.stopRecording(_self);
            this.stopButton.classList.add("is-hidden");
            this.startButton.classList.add("is-hidden");
            this.takeoverButton.classList.remove("is-hidden");
        })

        let closeFuncTakeover = () => {
            this._content = this.recorder?.getBlob() || null;
            this.recordedContent = this._content;
            this.close(true);
        }
        closeFuncTakeover.bind(this);
        this.takeoverButton.addEventListener("click", closeFuncTakeover);

    }

    /**
     * After Stream started, bind recorder
     * @param {MediaStream} stream 
     */
    protected afterStreamStarted(stream: MediaStream){
        this.recorder = new RecordRTC(stream, {
            type: 'video',
        });
    }

    /**
     * Starting Recording
     * @param self 
     */
    private startRecording(self: RecordingVideoModal) {
        self.recorder?.startRecording();
        self.recording = true;
    }

    /**
     * Stop Video-Recording
     * @param {RecordingModal} self
     */
    private stopRecording(self: RecordingVideoModal) {
        self.recorder?.stopRecording();
        self.mediaElement.srcObject = null;
        self.recording = false;
    }

    /**
     * Gettings StartButton
     * @return {HTMLButtonElement}
     */
    private get startButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("start") as HTMLButtonElement;
    }

    /**
    * Gettings StopButton
    * @return {HTMLButtonElement}
    */
    private get stopButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("stop") as HTMLButtonElement;
    }

    /**
    * Gettings takeoverButton
    * @return {HTMLButtonElement}
    */
    private get takeoverButton(): HTMLButtonElement {
        return this.getByIdFromShadowRoot("takeoverButton") as HTMLButtonElement;
    }

}