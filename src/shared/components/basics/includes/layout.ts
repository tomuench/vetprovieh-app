import { VetproviehElement } from '@tomuench/vetprovieh-shared';

/**
 * Layout for Vet:ProVieh
 */
export class VetproviehLayout extends VetproviehElement {
  /**
       * Observed Attributes
       */
  static get observedAttributes() {
    return ['title'];
  }

  private _title = 'No Title Set';
  private _outsideInnerHtml = '';

  /**
   * Konstruktor
   */
  constructor() {
    super();
    this._outsideInnerHtml = this.innerHTML;

    const self = this;
    document.addEventListener('DOMContentLoaded', function () {
      self._deactivatePageLoader();
    }, false);
  }

  /**
   * PUBLIC
   * Getter for title of current layout
   * @return {string}
   */
  get title() {
    return this._title;
  }

  /**
   * PUBLIC
   * Setter for title of current layout
   * @param {string} val
   */
  set title(val) {
    if (val !== this.title) {
      this._title = val;
      this._updateRendering();
    }
  }

  /**
   * Callback after Render
   */
  connectedCallback() {
    this._addCssClassToBody();
    this._updateRendering();
    this._addListenerToButton();
  }

  /**
   * CSS-Klasse an das Body-Element hängen, so dass Header fixed ist.
   */
  _addCssClassToBody() {
    document.getElementsByTagName('body')[0]
      .classList.add('has-navbar-fixed-top');
  }

  /**
   * Listener for Button (Left/Right)
   */
  _addListenerToButton() {
    ['left', 'right'].forEach((menuOrientation) => {
      const button = document
        .getElementById(menuOrientation + '-menu-open') as HTMLElement;
      const sideMenu = document
        .getElementById(menuOrientation + '-menu') as HTMLElement;
      if (button) {
        button.addEventListener('click', () => {
          sideMenu.dispatchEvent(new Event('toggle'));
        });
      }
    });
  }

  /**
   * Hide pageloader
   * @private
   */
  _deactivatePageLoader() {
    const element = document.getElementById('pageloader') as HTMLElement;
    setTimeout(
      (_) => element.classList.remove('is-active'),
      100);
  }

  /**
   * HTML-Output schreiben
   * @private
   */
  _updateRendering() {
    this.innerHTML = `
        <div id="pageloader" 
             class="pageloader is-active has-background-vetprovieh-light-blue">
             <span class="title">Ihre Daten werden geladen...</span>
        </div>
        <nav class="navbar is-fixed-top has-shadow 
                    has-background-vetprovieh-light-blue" 
             role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a id="left-menu-open" class="navbar-item has-text-white" >
                    <i class="fas fa-bars"></i>
                </a>
                <h1 id="title" class="has-text-white">` + this.title + `</h1>
            </div>
           <!-- <button id="right-menu-open">open right</button> -->
        </nav>
        <vetprovieh-sidemenu id="left-menu" width="300px">
            <aside class="menu">
                <div >
                    <div class="card-content">
                        <div class="media">
                          <div class="media-left">
                            <figure class="image is-48x48">
                              <img src="https://bulma.io/images/placeholders/96x96.png" 
                                   alt="Placeholder image">
                            </figure>
                          </div>
                          <div class="media-content">
                            <p class="title is-5">Stephan Göken</p>
                            <p class="subtitle is-7">
                                Gemeinschaftspraxis Göken & Braune
                            </p>
                          </div>
                        </div>
                    </div>
                </div>
                <p class="menu-label">
                   Behandlung
                </p>
                <ul class="menu-list">
                    <li><a href="/careplans/operational/new.html">Neue Behandlung</a></li>
                    <li><a href="/careplans/operational">Behandlungen</a></li>
                </ul>
                
                <p class="menu-label">
                   Persönliche Einstellungen
                </p>
                <ul class="menu-list">
                    <li><a href="#">Mein Profil</a></li>
                    <li><a href="#">Benachrichtigungen</a></li>
                    <li><a href="#">Termine</a></li>
                </ul>
            
                <p class="menu-label">
                  Meine Stammdaten
                </p>
                <ul class="menu-list">
                    <li><a href="/farmers">Landwirte</a></li>
                    <li><a href="/barns">Ställe</a></li>
                </ul>
                <p class="menu-label">
                  Meine Praxis
                </p>
                <ul class="menu-list">
                    <li><a href="/settings/surgery">Basisdaten</a></li>
                    <li><a href="#">Benutzer</a></li>
                    <li><a href="/settings/careplans">Behandlungspläne</a></li>
                </ul>
                
            </aside>
        </vetprovieh-sidemenu>
      <!--  <vetprovieh-sidemenu id="right-menu" 
                   orientation="right" width="300px">
        <h2> Right </h2>
            <ul>
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
            </ul>
        </vetprovieh-sidemenu> -->
        <section class="section full-height">
            <div class="container">
            ` + this._outsideInnerHtml + `
            </div>
        </section>
        
        <vetprovieh-footer></vetprovieh-footer>
            `;
  }
}


// Komponente registrieren
customElements.define('vetprovieh-layout', VetproviehLayout);