import './badge.scss';

type Status = 'warning' | 'danger' | 'success' | 'info' | 'purple' | 'extra';

interface MatchObject {
  [x: string]: Status
}

interface Props <T>{
    match: keyof T,
    text: string,
    noMatch?: string,
    matchObject?: T,
    className?: string,
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
  className,
  noMatch,
}: Props<MatchObject>) => (
  <span className={`custom-badge status-${matchObject[match] ?? noMatch} ${className}`}>
    {text.trim()}
  </span>
);

Badge.defaultProps = {
  matchObject: matchObjectDefault,
  className: '',
  noMatch: 'danger',
};

export default Badge;
