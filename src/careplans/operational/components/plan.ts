import { ViewHelper, VetproviehRepeat } from "@tomuench/vetprovieh-shared";
import { VetproviehDetail } from "@tomuench/vetprovieh-detail/lib/index";
import { VpOperationGroup } from "./group";
import { WebComponent } from "@tomuench/vetprovieh-shared/lib";
import { OperationPlan } from "../models";

/**
 * Controller for Page
 * pages/operations/plans/create or edit
 */
@WebComponent({
    template: '',
    tag: 'vp-operation-plan'
})
export class VpOperationPlan extends VetproviehDetail {

    private _groupElement: VpOperationGroup = new VpOperationGroup();

    constructor() {
        super();
        this.storeElement = true;
    }


    /**
     * Getting current selected OperationPlan
     */
    public get currentObject(): OperationPlan {
        return this._currentObject as OperationPlan;
    }

    /**
     * Group-Position from URL
     * Default = 0
     * @return {number}
     */
    public get groupIdParam(): number {
        return parseInt(ViewHelper.getParameter("groupsId") as string) || 0;
    }

    /**
     * Setting group Component
     */
    _setGroupComponent() {
        if (this.currentObject.opGroups.length > this.groupIdParam) {
            this._groupElement.object = this.currentObject.opGroups[this.groupIdParam];
            let detail = this.getByIdFromShadowRoot("group") as HTMLElement;

            if (detail) {
                console.log("FOUND");
                detail.appendChild(this._groupElement);
            } else {
                console.log("not found");
            }

        }
    }

    /**
     * Overwriteable Callback
     * @param {any} data
     * @protected
     */
    _afterFetch(data: any) {
        this._setGroupComponent();
        this._setNavigation();
    }

    _buildUrl(): string {
        let currentUrl = new URL(window.location.href);

        if (currentUrl.searchParams.has("groupsId")) {
            currentUrl.searchParams.delete("groupsId");
        }
        currentUrl.searchParams.append("groupsId", '')
        return currentUrl.toString();
    }

    _setNavigation() {
        let processMenu = this.getByIdFromShadowRoot("processMenu") as VetproviehRepeat;
        if (processMenu) {
            processMenu.objects = this.currentObject.opGroups;
            let param = this.groupIdParam;
            let link = processMenu.shadowRoot?.querySelector("[href='" + this._buildUrl() +  (param == 0 ? '' : param) + "']")
            if (link) {
                link.classList.add("is-active");
            }
        }
    }
}