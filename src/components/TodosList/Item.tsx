import { Todo } from "@/src/domain";
import {
  ChangeEventHandler,
  FC,
  FormEvent,
  use,
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
import { Input } from "../Input/Input";

type ItemProps = {
  item: Todo;
  onChange: (update: Partial<Todo>) => Promise<void>;
};

export const Item: FC<ItemProps> = ({ item, onChange }) => {
  const { audioRecorder } = use(EssentialsContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleCompleteClick = () => {
    onChange({ isComplete: true });
  };

  const handleTitleChange = async (newValue: string) => {
    onChange({ title: newValue });
  };
  const handleDescriptionChange = async (newValue: string) => {
    onChange({ description: newValue });
  };

  const handleStartRecordingClick = () => {
    audioRecorder.start();
  };

  const handleStopRecordingClick = async () => {
    const blob = await audioRecorder.stop();
    const reader = new FileReader();

    reader.onload = (event) => {
      const { result } = event.target as any;
      localStorage.setItem(`audio.${item.id}`, result);
    };

    reader.readAsDataURL(blob);
  };

  const play = () => {
    const audioPlayer = audioRef.current!;
    let base64URL = localStorage.getItem(`audio.${item.id}`)!;

    audioPlayer.src = base64URL;
    audioPlayer.load();
    audioPlayer.play();
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
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          className={`${s.button} ${s.recordButton}`}
          onClick={handleStartRecordingClick}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <button
          className={`${s.button} ${s.recordButton}`}
          onClick={handleStopRecordingClick}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
        <button className={`${s.button} ${s.recordButton}`} onClick={play}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>

      <button
        className={`${s.button} ${s.completeButton}`}
        onClick={handleCompleteClick}
      >
        <FontAwesomeIcon icon={faCircleCheck} />
      </button>
      <audio ref={audioRef}></audio>
    </li>
  );
};
