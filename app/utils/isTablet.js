import * as Device from 'expo-device';
import { PixelRatio, Dimensions } from 'react-native';

const isNineInchTabletOrLarger = () => {
  const deviceTypeAsync = Device.getDeviceTypeAsync();
  const { width, height } = Dimensions.get('window');
  const pixelRatio = PixelRatio.get();

  // Convertir puntos lógicos a píxeles físicos
  const widthPx = width * pixelRatio;
  const heightPx = height * pixelRatio;

  // Calcular la diagonal en píxeles
  const diagonalPx = Math.sqrt(widthPx * widthPx + heightPx * heightPx);

  // Estimar la densidad de píxeles (DPI) - Para pantallas de alta densidad
  // 300 inicial
  // 200 ajustado
  const estimatedDPI = 200;

  // Calcular el tamaño de la pantalla en pulgadas
  const screenDiagonalInches = diagonalPx / estimatedDPI;
  const device = Device.deviceType; // 1 phone, 2 tablet, 3 web

  // const isNineInchOrLarger = device === 2;
  // const isNineInchOrLarger = screenDiagonalInches >= 9 && deviceTypeAsync === Device.DeviceType.TABLET;
  // const isNineInchOrLarger = screenDiagonalInches >= 9 // && deviceTypeAsync === Device.DeviceType.TABLET;
  const isNineInchOrLarger = screenDiagonalInches >= 9 && device === Device.DeviceType.TABLET;

  console.log('-------------------START-------------------');
  console.log('Tipo de Device:', Device);
  console.log('Tipo de deviceTypeAsync:', deviceTypeAsync);
  console.log('Tipo de device:', device);
  console.log('Ancho (dp):', width);
  console.log('Alto (dp):', height);
  console.log('Relación de píxeles:', pixelRatio);
  console.log('Diagonal (píxeles):', diagonalPx);
  console.log('Diagonal (pulgadas):', screenDiagonalInches);
  console.log('¿Es una tablet de 9 pulgadas o más?', isNineInchOrLarger);
  console.log('Device.DeviceType.TABLET:', Device.DeviceType.TABLET);
  console.log('-------------------END-------------------');

  return isNineInchOrLarger;
};

export default isNineInchTabletOrLarger;
