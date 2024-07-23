import moment from "moment";
import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa6";

const Clock = ({
  startTime,
  duration,
}: {
  startTime: string;
  duration: number;
}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [status, setStatus] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const duration = moment.duration(time, "milliseconds");
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${days ? `${days}:` : ""}${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = start + duration * 60 * 1000;

    if (currentTime < start) {
      setStatus("00:00:00");
    } else if (currentTime < end) {
      const remaining = end - currentTime;
      setStatus(`${formatTime(remaining)}`);
    } else {
      setStatus("00:00:00");
    }
  }, [currentTime, startTime, duration]);

  return (
    <div className="flex items-center gap-3 rounded-md border p-2">
      <FaClock className="size-5" />
      <p className="text-md font-semibold text-muted-foreground">{status}</p>
    </div>
  );
};

export default Clock;
