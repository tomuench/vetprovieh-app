import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { Document } from "../../../../documents/models/document";
import { DocumentRepository } from "../../../../documents/repository/documentRepository";
import { RecordingModal } from './recording-modal';

@WebComponent({
    tag: "vetprovieh-video",
    template: VetproviehElement.template + `
        <div class="card">
            <div id="content" class="card-content">
                \${this.content}
            </div>
            <footer class="card-footer">
                \${this.openButton}
            </footer>
        </div>
        <recording-modal id="recordingModal" title="\${this.name}" type="\${this.type}" active="false"></recording-modal>
        `
})
export class VetproviehVideo extends VetproviehElement {

    private _type: string = "video";
    private _name: string = "";
    private _thumbnail: string | undefined;
    private _repository: DocumentRepository = new DocumentRepository();

    constructor() {
        super(true, false);
    }


    public get name(): string {
        return this._name;
    }
    
    public set name(v: string) {
        if (this._name !== v) {
            this._name = v;
        }
    }

    /**
     * Type Getter
     * @return {string}
     */
    public get type(): string {
        return this._type;
    }

    /**
     * Type Setter
     * @param {string} v
     */
    public set type(v: string) {
        if (this._type !== v) {
            this._type = v;
        }
    }

    /**
     * Getting Base64 Encoded Thumbnail to Show
     * @return {string | undefined}
     */
    public get thumbnail(): string | undefined {
        return this._thumbnail;
    }



    public connectedCallback() {
        this.render();
        this.attachListener();

    }

    private sendToServer() {
        let document = new Document();
        document.barnId = 1;
        document.content = this.recordingModal.loadContent();
        document.name = "testfile";
        this._repository.create(document).then((r) => {
            this._thumbnail = `/service/upload/uploadFile/${document.id}`;

            this.renderContentBox();
        });
    }

    private attachListener() {
        let button = this.getByIdFromShadowRoot("openButton") as HTMLButtonElement;
        let clickFunction = () => {
            console.log("Activating Recording modal");
            this.recordingModal.active = true;
        }
        clickFunction.bind(this);
        button.addEventListener("click", clickFunction);

        let modalCloseFunction = (event:any) => {
            if(event.detail.takeover) {
                this._thumbnail = event.detail.content;
                this.sendToServer();
                this.renderContentBox();
            }
        }
        modalCloseFunction.bind(this);
        this.recordingModal.addEventListener("change", modalCloseFunction);
    }


    private renderContentBox() {
        let contentBox = this.getByIdFromShadowRoot("content")
        if(contentBox) contentBox.innerHTML = this.content;
    }

    /**
     * Rendering Content
     * @return {string}
     */
    protected get content(): string {
        if (this.thumbnail) {
            if(this.type == "image"){
                return `<img src="${this.thumbnail}" alt="Vorschaubild">`;
            } else {
                return `<video controls> <source src="${this.thumbnail}" type="video/mp4> </video>`;
            }
        } else {
            return "<p>Es wurde noch nichts aufgenommen.</p>";
        }
    }

    /**
     * Rendering Open-Button
     * @return {string}
     */
    protected get openButton(): string {
        return `<button id="openButton" class="button">${this.buttonname} aufnehmen</button>`
    }

    /**
     * Generate Button name
     * @return {string}
     */
    private get buttonname(): string {
        if (this.type == "video") {
            return "Video";
        } else {
            return "Bild";
        }
    }

    /**
     * Observed Attributes
     */
    static get observedAttributes() {
        return ['type', 'name'];
    }

    /**
     * Getting RecordingModal
     * @return {RecordingModal}
     */
    private get recordingModal(): RecordingModal {
        return this.getByIdFromShadowRoot("recordingModal") as RecordingModal;
    }
}