import { TaxiDriver } from 'src/app/data/schema/trip';

export const getVehicleInfoByTaxiDriver = (taxiDriver: TaxiDriver): null | string => {
  const { vehicle } = taxiDriver;

  let vehicleInfo: string[] = [];

  if (vehicle.brand) {
    vehicleInfo.push(vehicle.brand);
  }

  if (vehicle.model) {
    vehicleInfo.push(vehicle.model);
  }

  if (!vehicleInfo.length) {
    return null;
  }

  return vehicleInfo.join(' ');
};
