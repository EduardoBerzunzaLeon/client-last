import './customBadge.scss';

interface Props <T>{
    match: keyof T,
    matchObject: T,
    text: string
}

const CustomBadge = ({ text, matchObject, match }: Props<{[x: string]: any}>) => (
  <span className={`custom-badge status-${matchObject[match]}`}>{text.trim()}</span>
);

export default CustomBadge;
