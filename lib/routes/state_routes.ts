import { Application, Request, Response } from 'express';
import { StateController } from '../controllers/stateController';

export class StateRoutes {

    private stateController: StateController = new StateController();

    public route(app: Application) {

        app.post('/api/states', (req: Request, res: Response) => {
            this.stateController.createState(req, res);
        });

        app.get('/api/states', (req: Request, res: Response) => {
            this.stateController.getAllStates(req, res);
        });

        app.get('/api/states/:uf', (req: Request, res: Response) => {
            this.stateController.getState(req, res);
        });

        app.put('/api/states/:id', (req: Request, res: Response) => {
            this.stateController.updateState(req, res);
        });

        app.delete('/api/states/:id', (req: Request, res: Response) => {
            this.stateController.deleteState(req, res);
        });

    }
}
