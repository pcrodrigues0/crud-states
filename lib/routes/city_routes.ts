import { Application, Request, Response } from 'express';
import { CityController } from '../controllers/cityController';

export class CityRoutes {

    private cityController: CityController = new CityController();

    public route(app: Application) {

        app.post('/api/cities', (req: Request, res: Response) => {
            this.cityController.createCity(req, res);
        });

        app.get('/api/cities', (req: Request, res: Response) => {
            this.cityController.getAllCity(req, res);
        });

        app.get('/api/cities/:name', (req: Request, res: Response) => {
            this.cityController.getCity(req, res);
        });

        app.get('/api/cities/stateid/:stateId', (req: Request, res: Response) => {
            this.cityController.getCityUf(req, res);
        });

        app.put('/api/cities/:id', (req: Request, res: Response) => {
            this.cityController.updateCity(req, res);
        });

        app.delete('/api/cities/:id', (req: Request, res: Response) => {
            this.cityController.deleteCity(req, res);
        });

    }
}
