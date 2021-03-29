import { ModificationNote } from "../common/model";

export interface Icity {
    _id?: String;
    name: String;
    stateId: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}
