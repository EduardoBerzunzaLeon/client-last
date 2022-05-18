interface Props {
    title: string,
    value: string,
    icon: string,
}

export const SpanDetail = ({ title, value, icon }: Props) => (
  <div className="overflow-hidden text-overflow-ellipsis">
    <div className="inline-flex align-items-center text-purple-700">
      <i className={`pi pi-${icon} mr-2`} />
      <b>{title}</b>
    </div>
    <span className="font-semibold ml-2">{value}</span>
  </div>
);

export default SpanDetail;
