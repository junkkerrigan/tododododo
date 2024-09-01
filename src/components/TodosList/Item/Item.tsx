import { Todo } from "@/src/domain";
import {
  ChangeEventHandler,
  FC,
  FormEvent,
  use,
  useEffect,
  useRef,
  useState,
} from "react";
import s from "./Item.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faCircleCheck,
  faStop,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { EssentialsContext } from "@/src/contexts/EssentialsContext";
import { Input } from "../../Input/Input";
import { logError } from "@/src/infra/logError";
import { AudioRecording } from "../AudioRecording/AudioRecording";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

type ItemProps = {
  item: Todo;
  onChange: (update: Partial<Todo>) => Promise<void>;
};

export const Item: FC<ItemProps> = ({ item, onChange }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  useEffect(() => {
    const storedAudioUrl = localStorage.getItem(`audio.${item.id}`);
    setAudioUrl(storedAudioUrl);
  });

  const handleCompleteClick = () => {
    localStorage.removeItem(`audio.${item.id}`);
    onChange({ isComplete: true });
  };
  const handleTitleChange = async (newValue: string) => {
    onChange({ title: newValue });
  };
  const handleDescriptionChange = async (newValue: string) => {
    onChange({ description: newValue });
  };

  const handleRecordingFinish = (blob: Blob) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const { result } = event.target as any;

      setAudioUrl(result);
      localStorage.setItem(`audio.${item.id}`, result);
    };
    reader.readAsDataURL(blob);
  };

  return (
    <li className={s.item}>
      <Input
        value={item.title}
        required
        onInputEnd={handleTitleChange}
        className={s.input}
      />
      <Input
        value={item.description ?? ""}
        onInputEnd={handleDescriptionChange}
        as="textarea"
        className={s.textarea}
        placeholder="add a description"
      />

      <div className={s.audioContainer}>
        {!audioUrl && <AudioRecording onFinish={handleRecordingFinish} />}
        {audioUrl && (
          <div>
            <AudioPlayer
              src={audioUrl}
              showJumpControls={false}
              header={<h3>Voice note</h3>}
            />
          </div>
        )}
      </div>

      <button className={s.completeButton} onClick={handleCompleteClick}>
        <FontAwesomeIcon icon={faCircleCheck} />
      </button>
      <audio ref={audioRef}></audio>
    </li>
  );
};
