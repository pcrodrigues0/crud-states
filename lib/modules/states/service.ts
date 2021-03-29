import { Istate } from './model';
import states from './schema';

export default class StateService {

    public createState(stateParams: Istate, callback: any) {
        const _session = new states(stateParams);
        _session.save(callback);
    }

    public filterState(query: any, callback: any) {
        states.findOne(query, callback);
    }

    public getAllStates(callback: any) {
        states.find(callback);
    }

    public updateState(stateParams: Istate, callback: any) {
        const query = { _id: stateParams._id };
        states.findOneAndUpdate(query, stateParams, callback);
    }

    public deleteState(_id: String, callback: any) {
        const query = { _id: _id };
        states.deleteOne(query, callback);
    }

}
