import { faMicrophone, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, use, useState } from "react";
import s from "./AudioRecording.module.scss";
import { EssentialsContext } from "@/src/contexts/EssentialsContext";
import { logError } from "@/src/infra/logError";

type AudioRecordingProps = {
  onFinish: (blob: Blob) => void;
};

export const AudioRecording: FC<AudioRecordingProps> = ({ onFinish }) => {
  const { audioRecorder } = use(EssentialsContext);
  const [isRunning, setIsRunning] = useState(false);

  const start = async () => {
    try {
      await audioRecorder.start();
      setIsRunning(true);
    } catch (error) {
      logError(error);
    }
  };
  const stop = async () => {
    const blob = await audioRecorder.stop();
    setIsRunning(false);

    onFinish(blob);
  };

  return (
    <div className={s.container}>
      {!isRunning && (
        <button className={s.button} onClick={start}>
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      )}
      {isRunning && <p className={s.message}>Recording a voice note...</p>}
      {isRunning && (
        <button className={s.button} onClick={stop}>
          <FontAwesomeIcon icon={faStop} />
        </button>
      )}
    </div>
  );
};
