import React from "react";
import { useEffect, useState } from "react";
import { Subject, debounceTime, buffer, map, filter, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Viewer from "./components/Viewer";
 
type Status = "start" | "stop" | "wait";
 
export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState<Status>("stop");

  const subject$ = new Subject<void>()
 
  useEffect(() => {
    const doubleClick$ = subject$.pipe(
      buffer(subject$.pipe(debounceTime(300))),
      map((list) => list.length),
      filter((value) => value >= 2),
    );

    doubleClick$.subscribe((_) => {
      setStatus('wait')
    });

    const timer$ = new Observable((observer) => {
      let count = 0;
      const intervalId = setInterval(() => {
        if (status !== 'stop') {
          observer.next(count += 1);
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });

    const subscribtion$ = timer$
      .pipe(takeUntil(subject$))
      .subscribe({
        next: () => {
          if (status === 'start') {
            setSec((prev) => prev + 1);
          }
        },
      });

    return (() => {
      subscribtion$.unsubscribe();
    });
  }, [status]);
 
  const start = React.useCallback(() => {
    setStatus("start");
  }, []);
 
  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);
 
  const reset = React.useCallback(() => {
    setSec(0);
  }, []);
 
  const wait = React.useCallback(() => {
    subject$.next()
  }, []);
 
  return (
    <Viewer time={sec} start={start} stop={stop} reset={reset} wait={wait} />
  );
}