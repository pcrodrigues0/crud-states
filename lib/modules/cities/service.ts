import { Icity } from './model';
import cities from './schema';

export default class CitiesService {

    public createCity(cityParams: Icity, callback: any) {
        const _session = new cities(cityParams);
        _session.save(callback);
    }

    public filterCities(query: any, callback: any) {
        cities.findOne(query, callback);
    }

    public filterCityUf(query: any, callback: any) {
        cities.find(query, callback);
    }

    public getAllCities(callback: any) {
        cities.find(callback);
    }

    public updateCity(stateParams: Icity, callback: any) {
        const query = { _id: stateParams._id };
        cities.findOneAndUpdate(query, stateParams, callback);
    }

    public deleteCity(_id: String, callback: any) {
        const query = { _id: _id };
        cities.deleteOne(query, callback);
    }

}
