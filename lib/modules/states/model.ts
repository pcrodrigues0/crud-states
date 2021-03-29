import { ModificationNote } from "../common/model";

export interface Istate {
    _id?: String;
    name: String;
    uf: String;
    is_deleted?: Boolean;
    modification_notes: ModificationNote[]
}
