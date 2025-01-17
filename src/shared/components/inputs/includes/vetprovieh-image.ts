import {WebComponent} from '@vetprovieh/vetprovieh-shared';
import {VetproviehMedia} from './vetprovieh-media';

// eslint-disable-next-line new-cap
@WebComponent({
  tag: 'vetprovieh-image',
  template: VetproviehMedia.template,
})
/**
 * Vetprovieh-Image
 */
export class VetproviehImage extends VetproviehMedia {
  /**
   * Default-Constructor
   */
  constructor() {
    super();
    this.type = 'image';
  }

  /**
   * After Model Close Callback
   * @param {any} event
   */
  protected afterModalClose(event:any) {
    this.thumbnail = event.detail.content;
  }

  /**
     * Rendering Content
     * @return {string}
     */
  protected get content(): string {
    if (this.thumbnail) {
      return `<img id="thumb" style="cursor:pointer" 
                  width="200px" src="${this.thumbnail}" alt="Vorschaubild">
            
                    <div id="imageModal" class="modal">
                        <div id="imageModalCloseBackground" 
                             class="modal-background"></div>
                        <div class="modal-content">
                            <p class="image is-4by3">
                                ${this.modalContent}
                            </p>
                        </div>
                    <button id="imageModalCloseButton" 
                            class="modal-close is-large" 
                            aria-label="close"></button>
                    </div>`;
    } else {
      return super.content;
    }
  }

  /**
   * Generate ModalContnet
   * @return {string}
   */
  protected get modalContent(): string {
    return `<img src="${this.thumbnail}" alt="Vorschaubild">`;
  }

  /**
   * Close Image Modal
   */
  protected closeImageModal() {
    const modal = this.getByIdFromShadowRoot('imageModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('is-active');
    }
  }

  /**
     * Rendering ContentBox again
     */
  protected renderContentBox() {
    super.renderContentBox();
    const img = this.getByIdFromShadowRoot('thumb') as HTMLImageElement;
    if (img) {
      img.addEventListener('click', () => {
        this.openImageModal();
      });
    }

    const closeElements = [
      this.getByIdFromShadowRoot('imageModalCloseButton'),
      this.getByIdFromShadowRoot('imageModalCloseBackground'),
    ];
    closeElements.forEach((e) => {
            e?.addEventListener('click', () => {
              this.closeImageModal();
            });
    });
  }

  /**
     * Image Modal öffnen
     */
  private openImageModal() {
    const modal = this.getByIdFromShadowRoot('imageModal') as HTMLElement;
    if (modal) {
      modal.classList.add('is-active');
    }
  }


  /**
     * Generate Button name
     * @return {string}
     */
  protected get buttonname(): string {
    return 'Bild';
  }

  /**
     * Observed Attributes
     */
  static get observedAttributes() {
    return ['type', 'name', 'value', 'barnid'];
  }

  /**
     * Generating a filename
     * @return {string}
     */
  protected generateFilename() : string {
    return `${super.generateFilename()}.png`;
  }
}
