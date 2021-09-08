import { Alert, Collapse } from 'react-bootstrap';

export enum AlertVariant {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  light = 'light',
  dark = 'dark'
}

type AlertProps = {
  variant: AlertVariant;
  title: string;
  message: string;
  show: boolean;
  closeAlert: () => void;
};

const AlertNotification = ({
  variant,
  title,
  message,
  show,
  closeAlert
}: AlertProps) => {
  if (show) {
    return (
      <Collapse
        in={show}
        className="pt-2 pl-2 pb-0 animate__animated animate__zoomIn animate__faster"
      >
        <Alert variant={variant} onClose={() => closeAlert()} dismissible>
          <Alert.Heading>{title}</Alert.Heading>
          <p>{message}</p>
        </Alert>
      </Collapse>
    );
  } else {
    return <></>;
  }
};

export default AlertNotification;
