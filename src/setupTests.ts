import Enzyme from 'enzyme';
import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const fbScript = document.createElement('script');
fbScript.id = 'facebook-jssdk';
document.body.appendChild(fbScript);
