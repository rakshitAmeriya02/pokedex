import { toast } from "react-toastify";
import { NOTIFICATION_TYPE } from "src/utils/enums";

export const createNotification = (
  type: NOTIFICATION_TYPE,
  message: string
) => {
  switch (type) {
    case NOTIFICATION_TYPE.ERROR:
      toast.error(message);
      break;

    case NOTIFICATION_TYPE.INFO:
      toast.info(message);
      break;

    case NOTIFICATION_TYPE.SUCCESS:
      toast.success(message);
      break;

    case NOTIFICATION_TYPE.WARN:
    default:
      toast.warn(message);
      break;
  }
};
