import { Card } from 'primereact/card';

interface Props {
    title: string,
    detail: string
}

export const ErrorCard = ({ title, detail }: Props) => (
  <div className="grid">
    <div className="col-12">
      <Card title={title} className="bg-purple-100">
        <div className="flex align-items-center justify-content-center">
          <div
            className="fadein animation-duration-2000"
            style={{ maxWidth: '500px' }}
          >
            <figure>
              <img
                src="/assets/images/error404.png"
                alt="error400"
                className="max-w-full block"
              />
            </figure>
          </div>
        </div>

        <span
          className="flex align-items-center justify-content-center text-pink-900 font-bold text-xl text-justify"
        >
          ¡Ups! Nuestro perrito se comio la infomación, favor de intentarlo más tarde.
        </span>
        <span className="inline-block mt-2">
          {`Error: ${detail}`}
        </span>
      </Card>
    </div>
  </div>
);

export default ErrorCard;
