import { VetproviehElement, WebComponent } from "@tomuench/vetprovieh-shared/lib";

@WebComponent({
    template:  VetproviehElement.template + `<i class="fas \${this.icon}"></i>`,
    tag: 'bulma-check-icon'
})
export class CheckIcon extends VetproviehElement {

    private _active: boolean = false;

    constructor() {
        super(true, true);
    }
    
    public get active(): string {
        return this._active + "";
    }

    public set active(v: string) {
        let vAsBool = v === "true";
        if (this._active !== vAsBool) {
            this._active = vAsBool;
        }
    }

    public get icon(): string {
        if (this._active) {
            return "fa-check-square";
        } else {
            return "fa-square";
        }
    }

    /**
     * Rendering Element
     */
     public render() {
        super.render();
      }
  

    /**
     * Observed Attributes
     * @return {Array<string>}
     */
     static get observedAttributes() {
        return ['active'];
    }

}