import {BaseModel} from '@tomuench/vetprovieh-shared/lib/orm/baseModel';

/**
 * Drug-Model
 */
export class Drug extends BaseModel {
    public name = '';
    public approvalNumber = '';
    public dose = '';
}
