import './badge.scss';

type Status = 'warning' | 'danger' | 'success' | 'info' | 'purple' | 'extra';

interface MatchObject {
  [x: string]: Status
}

interface Props <T>{
    match: keyof T,
    text: string
    matchObject?: T,
}

const matchObjectDefault: MatchObject = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  purple: 'purple',
  extra: 'extra',
};

export const Badge = ({
  match,
  text,
  matchObject = matchObjectDefault,
}: Props<MatchObject>) => (
  <span className={`custom-badge status-${matchObject[match]}`}>
    {text.trim()}
  </span>
);

Badge.defaultProps = {
  matchObject: matchObjectDefault,
};

export default Badge;
