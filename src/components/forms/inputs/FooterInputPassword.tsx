import { Divider } from 'primereact/divider';

export const footerInputPassword = () => (
  <>
    <Divider />
    <p className="p-mt-2">Sugerencias</p>
    <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
      <li>Al menos una minúscula</li>
      <li>Al menos una mayúscula</li>
      <li>Al menos un númerico</li>
      <li>Mínimo 8 carácteres</li>
    </ul>
  </>
);

export default footerInputPassword;
