import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";

export interface TypingAnimationProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  text: string;
  duration?: number;
  delay?: number;
  cursor?: boolean;
  loop?: boolean;
  pauseDuration?: number;
}

export const TypingAnimation = forwardRef<HTMLSpanElement, TypingAnimationProps>(
  (
    {
      className = "",
      text,
      duration = 60,
      delay = 0,
      cursor = true,
      loop = false,
      pauseDuration = 2000,
      ...props
    },
    ref
  ) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const indexRef = useRef(0);
    const directionRef = useRef<"forward" | "backward">("forward");

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsTyping(true);
        indexRef.current = 0;
        directionRef.current = "forward";

        const type = () => {
          if (directionRef.current === "forward") {
            if (indexRef.current <= text.length) {
              setDisplayedText(text.slice(0, indexRef.current));
              indexRef.current++;
              return setTimeout(type, duration);
            }
            if (loop) {
              return setTimeout(() => {
                directionRef.current = "backward";
                indexRef.current = text.length;
                type();
              }, pauseDuration);
            }
            setIsTyping(false);
          } else {
            if (indexRef.current >= 0) {
              setDisplayedText(text.slice(0, indexRef.current));
              indexRef.current--;
              return setTimeout(type, duration / 2);
            }
            directionRef.current = "forward";
            indexRef.current = 0;
            return setTimeout(type, 500);
          }
        };

        const id = type();
        return () => clearTimeout(id as unknown as number);
      }, delay);

      return () => clearTimeout(timeout);
    }, [text, duration, delay, loop, pauseDuration]);

    return (
      <span
        ref={ref}
        className={`inline-block ${className}`}
        {...props}
      >
        {displayedText}
        {cursor && (
          <span
            className="ml-0.5 inline-block w-[2px] bg-current"
            style={{
              height: "1em",
              verticalAlign: "text-bottom",
              animation: isTyping ? "none" : "cursor-blink 1s step-end infinite",
              opacity: isTyping ? 1 : undefined,
            }}
          />
        )}
        <style>{`
          @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </span>
    );
  }
);

TypingAnimation.displayName = "TypingAnimation";
