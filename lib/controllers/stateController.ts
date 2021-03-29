import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { Istate } from '../modules/states/model';
import StateService from '../modules/states/service';

export class StateController {

    private stateService: StateService = new StateService();

    public createState(req: Request, res: Response) {
        if (req.body.name &&
            req.body.uf ) {
            const stateParams: Istate = {
                name: req.body.name,
                uf: req.body.uf.toUpperCase(),
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New state created'
                }]
            };
            this.stateService.createState(stateParams, (err: any, stateData: Istate) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create state SuccessFully', stateData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getState(req: Request, res: Response) {
        if (req.params.uf) {
            const stateFilter = { uf: req.params.uf.toUpperCase() };
            this.stateService.filterState(stateFilter, (err: any, stateData: Istate) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get state SuccessFully', stateData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public getAllStates(req: Request, res: Response) {
        this.stateService.getAllStates((err: any, stateData: Istate) => {
            if (err) {
                mongoError(err, res);
            } else {
                successResponse('get state SuccessFully', stateData, res);
            }
        });
    }

    public updateState(req: Request, res: Response) {
        if (req.params.id &&
          req.body.name ||
          req.body.uf ) {
            const stateFilter = { _id: req.params.id };
            this.stateService.filterState(stateFilter, (err: any, stateData: Istate) => {
                if (err) {
                    mongoError(err, res);
                } else if (stateData) {
                    stateData.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'State data updated'
                    });
                    const stateParams: Istate = {
                        _id: req.params.id,
                        name: req.body.name ? req.body.name : stateData.name,
                        uf: req.body.uf ? req.body.uf : stateData.uf,
                        is_deleted: req.body.is_deleted ? req.body.is_deleted : stateData.is_deleted,
                        modification_notes: stateData.modification_notes
                    };
                    this.stateService.updateState(stateParams, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update state SuccessFully', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid State', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public deleteState(req: Request, res: Response) {
        if (req.params.id) {
            this.stateService.deleteState(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete state SuccessFully', null, res);
                } else {
                    failureResponse('invalid state', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}
