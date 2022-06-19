import { Tariff, TaxiDriver } from 'src/app/data/schema/trip';
import { Address } from '../types';

export const calculateCostOfOrder = (tariff: Tariff) => {
  let tariffCost;

  switch (tariff) {
    case Tariff.Economy:
      tariffCost = 8;
      break;
    case Tariff.Standart:
      tariffCost = 11;
      break;
    case Tariff.Business:
      tariffCost = 16;
      break;
    case Tariff.Children:
      tariffCost = 10;
      break;
    default:
      tariffCost = 16;
      break;
  }

  return tariffCost + Math.floor(Math.random() * 100);
};

export const generateTaxiDriverPosition = (taxiDriver: TaxiDriver, currentAddress: Address) => {
  return {
    taxiDriver,
    position: {
      latitude: currentAddress.latitude - 0.00555850655,
      longitude: currentAddress.longitude - 0.0001481538,
    },
  }; // mock taxi position. Point near user
};
