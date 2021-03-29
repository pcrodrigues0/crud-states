import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { Icity } from '../modules/cities/model';
import CitiesService from '../modules/cities/service';

export class CityController {

    private citiesService: CitiesService = new CitiesService();

    public createCity(req: Request, res: Response) {
        if (req.body.name &&
            req.body.stateId ) {
            const cityParams: Icity = {
                name: req.body.name.toUpperCase(),
                stateId: req.body.stateId,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New city created'
                }]
            };
            this.citiesService.createCity(cityParams, (err: any, cityData: Icity) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create city SuccessFully', cityData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getCity(req: Request, res: Response) {
        if (req.params.name) {
            const filterCities = { name: req.params.name.toUpperCase() };
            this.citiesService.filterCities(filterCities, (err: any, citiesData: Icity) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get state SuccessFully', citiesData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getCityUf(req: Request, res: Response) {
        if (req.params.stateId) {
            const citiesFilter = { stateId: req.params.stateId };
            this.citiesService.filterCityUf(citiesFilter, (err: any, cityData: Icity) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get city SuccessFully', cityData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getAllCity(req: Request, res: Response) {
        this.citiesService.getAllCities((err: any, cityData: Icity) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('get cities SuccessFully', cityData, res);
            }
        });
    }

    public updateCity(req: Request, res: Response) {
        if (req.params.id &&
          req.body.name ||
          req.body.stateId ) {
            const stateFilter = { _id: req.params.id };
            this.citiesService.filterCities(stateFilter, (err: any, cityData: Icity) => {
                if (err) {
                    mongoError(err, res);
                } else if (cityData) {
                    cityData.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'city data updated'
                    });
                    const stateParams: Icity = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : cityData.name,
                        stateId: req.body.stateId ? req.body.stateId : cityData.stateId,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : cityData.is_deleted,
                        modification_notes: cityData.modification_notes
                    };
                    this.citiesService.updateCity(stateParams, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update city SuccessFully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid city', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public deleteCity(req: Request, res: Response) {
        if (req.params.id) {
            this.citiesService.deleteCity(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete city SuccessFully', null, res);
                } else {
                    failureResponse('invalid city', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}
