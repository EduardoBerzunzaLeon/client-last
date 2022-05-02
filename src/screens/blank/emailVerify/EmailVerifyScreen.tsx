import { useEffect } from 'react';

import { Card } from 'primereact/card';
import { Link, useParams } from 'react-router-dom';
import { Toast } from 'primereact/toast';

import { Spinner } from '../../../components/spinner/Spinner';
import { useEmailVerifyMutation } from '../../../redux/auth/auth.api';
import { useToast } from '../../../hooks/useToast';

export const EmailVerifyScreen = () => {
  const { token } = useParams();
  const [ emailVerify, { isLoading, isSuccess, isError }] = useEmailVerifyMutation();
  const { toast, showError, showSuccess } = useToast();

  useEffect(() => {
    if (isError) {
      showError({ detail: 'Ocurrio un error' });
    }

    if (isSuccess) {
      showSuccess({ detail: 'Cuenta verificada con éxito' });
    }
  }, [ isError, isSuccess ]);

  useEffect(() => {
    if (token) {
      emailVerify(token);
    }
  }, [ emailVerify, token ]);

  return (
    <Card
      title="¡Activar Cuenta!"
      subTitle="Verificación de correo electrónico"
    >
      <Toast ref={toast} />
      {
            isLoading ? (
              <Spinner message="Verificando cuenta" />
            ) : (
              <>
                {
                        isSuccess && (
                        <>
                          <p className="text-justify">
                            Si logramos verificar su cuenta de usuario, ya puede
                            iniciar sesión correctamente.
                          </p>
                          <div className="flex justify-content-end mt-1">
                            <Link to="/">
                              Ir a inicio de sesión
                            </Link>
                          </div>
                        </>
                        )
                    }
                {
                        isError && (
                        <p className="text-justify">
                          Ocurrio un error al momento de verificar su cuenta,
                          favor de volverlo a intentar
                        </p>
                        )
                    }

              </>
            )
        }

    </Card>
  );
};

export default EmailVerifyScreen;
