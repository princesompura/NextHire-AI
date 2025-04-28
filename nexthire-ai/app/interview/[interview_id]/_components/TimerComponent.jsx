"use client";
import React, { useEffect, useState } from "react";

function TimerComponent({ start, stop }) {
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        if (start) {
            setRunning(true);
        }
    }, [start]);

    useEffect(() => {
        if (stop) {
            setRunning(false);
        }
    }, [stop]);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (!running && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    const formatTime = (totalSeconds) => {
        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return <span>{formatTime(seconds)}</span>;
}

export default TimerComponent;
