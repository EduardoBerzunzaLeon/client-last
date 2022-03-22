import { Generic } from '../../interfaces/generic';
import './customBadge.scss';

interface Props <T>{
    match: keyof T,
    matchObject: T,
    text: string
}

export const CustomBadge = ({ text, matchObject, match }: Props<Generic>) => (
  <span className={`custom-badge status-${matchObject[match]}`}>{text.trim()}</span>
);

export default CustomBadge;
