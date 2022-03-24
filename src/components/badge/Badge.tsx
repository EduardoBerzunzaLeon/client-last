import { Generic } from '../../interfaces/generic';
import './badge.scss';

interface Props <T>{
    match: keyof T,
    matchObject: T,
    text: string
}

export const Badge = ({ text, matchObject, match }: Props<Generic>) => (
  <span className={`custom-badge status-${matchObject[match]}`}>{text.trim()}</span>
);

export default Badge;
