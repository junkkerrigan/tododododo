import { Todo } from "@/src/domain";
import { FC, use, useRef } from "react";
import s from "./Item.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faCircleCheck,
  faStop,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { EssentialsContext } from "@/src/contexts/EssentialsContext";

type ItemProps = {
  item: Todo;
  onCompleteClick: (item: Todo) => void;
};

export const Item: FC<ItemProps> = ({ item, onCompleteClick }) => {
  const { audioRecorder } = use(EssentialsContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  const { title, description } = item;

  return (
    <li className={s.item}>
      <span className={s.title}>{title}</span>
      <p className={s.description}>{description}</p>
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
        onClick={() => onCompleteClick(item)}
      >
        <FontAwesomeIcon icon={faCircleCheck} />
      </button>
      <audio ref={audioRef}></audio>
    </li>
  );
};
