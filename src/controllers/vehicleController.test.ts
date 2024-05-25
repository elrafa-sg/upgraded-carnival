import { Request, Response } from 'express';
import { VehicleController } from './vehicleController';
import { mongoClient } from '../database/mongoClient';

jest.mock('../database/mongoClient', () => ({
    mongoClient: {
      vehicle: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    },
  }));

describe('VehicleController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createVehicle', () => {
    beforeEach(() => {
      req = {
        body: {
          plate: 'ABC-1234',
          userId: 'user123',
        },
      };
    });

    it('should create a vehicle successfully', async () => {
      const createVehicleResponse = {
        plate: 'ABC-1234',
        ownerId: 'user123',
      };
      (mongoClient.vehicle.create as jest.Mock).mockResolvedValue(createVehicleResponse);

      await VehicleController.createVehicle(req as Request, res as Response);

      expect(mongoClient.vehicle.create).toHaveBeenCalledWith({
        data: {
          plate: req.body.plate,
          ownerId: req.body.userId,
        },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createVehicleResponse);
    });

    it('should handle errors during vehicle creation', async () => {
      const errorMessage = 'Unexpected error';
      (mongoClient.vehicle.create as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await VehicleController.createVehicle(req as Request, res as Response);

      expect(mongoClient.vehicle.create).toHaveBeenCalledWith({
        data: {
          plate: req.body.plate,
          ownerId: req.body.userId,
        },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: errorMessage });
    });
  });

  describe('getAllVehicles', () => {
    beforeEach(() => {
      req = {
        body: {
          idUsuario: 'user123',
        },
      };
    });

    it('should retrieve all vehicles for a user successfully', async () => {
      const vehiclesList = [
        { plate: 'ABC-1234', ownerId: 'user123' },
        { plate: 'XYZ-5678', ownerId: 'user123' },
      ];
      (mongoClient.vehicle.findMany as jest.Mock).mockResolvedValue(vehiclesList);

      await VehicleController.getAllVehicles(req as Request, res as Response);

      expect(mongoClient.vehicle.findMany).toHaveBeenCalledWith({
        where: { ownerId: req.body.idUsuario },
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(vehiclesList);
    });

    it('should handle errors during retrieval of vehicles', async () => {
      const errorMessage = 'Unexpected error';
      (mongoClient.vehicle.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await VehicleController.getAllVehicles(req as Request, res as Response);

      expect(mongoClient.vehicle.findMany).toHaveBeenCalledWith({
        where: { ownerId: req.body.idUsuario },
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});