
import { WebComponent, VetproviehElement } from "@tomuench/vetprovieh-shared/lib";
import { KeyResult } from "../models/keyresult";
import { Objective } from "../models/objective";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
  template:
    VetproviehElement.template +
    `
    <div class="columns">
        <div class="column">
            Ich bin ein KeyResult
        </div>
        <div class="column is-one-third" style="text-align: right;">
            <i class="fas fa-check" id="check" style="cursor: pointer;"></i>
        </div>   
             
    </div>
    <hr>
    `,
  tag: "vp-key-result",
})
export class KeyResultComponent extends VetproviehElement {

  private _keyResult:KeyResult = new KeyResult();
  
  public get keyResult() : KeyResult {
    return this._keyResult;
  }

  public set keyResult(val: KeyResult){
    this._keyResult = val;
    //UI kann auf Veränderungen reagieren
    this.render();
  }


  constructor() {
    super();
  }

  connectedCallback(){
    let checkKeyResult = this.shadowRoot?.getElementById("check") as HTMLElement;
    checkKeyResult.addEventListener("click", () => {
        console.log(this._keyResult.value);
        switch(this._keyResult.value){
            case 0:
                this.keyResult.value++;
                checkKeyResult.classList.remove(...checkKeyResult.classList);
                checkKeyResult.classList.add("fas");
                checkKeyResult.classList.add("fa-check-double");
                break;
            case 1:
                this._keyResult.value++;
                checkKeyResult.classList.remove(...checkKeyResult.classList);
                checkKeyResult.classList.add("fas");
                checkKeyResult.classList.add("fa-check-double");
                checkKeyResult.style.color = "#03fc07";
                break;
            case 2:
                this._keyResult.value = 0;
                checkKeyResult.classList.remove(...checkKeyResult.classList);
                checkKeyResult.classList.add("fas");
                checkKeyResult.classList.add("fa-check");
                checkKeyResult.style.color = "black";
                break;
        }
        
    });
  }



  

}
