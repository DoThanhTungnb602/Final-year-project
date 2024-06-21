import moment from "moment";
import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa6";

const Timer = ({
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
    return `${days > 0 ? `${days}d ` : ""}${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
  };

  useEffect(() => {
    const start = new Date(startTime).getTime();
    const end = start + duration * 60 * 1000;

    if (currentTime < start) {
      const startsIn = start - currentTime;
      setStatus(`Starts in ${formatTime(startsIn)}`);
    } else if (currentTime < end) {
      const remaining = end - currentTime;
      setStatus(`The test has started. (${formatTime(remaining)} left)`);
    } else {
      setStatus("The test has ended.");
    }
  }, [currentTime, startTime, duration]);

  return (
    <div className="flex items-center gap-3 rounded-md border p-4">
      <FaClock className="size-5" />
      <p className="text-md font-semibold text-muted-foreground">{status}</p>
    </div>
  );
};

export default Timer;
