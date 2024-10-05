import React, { useState, useEffect } from 'react';

const icebreakers = [
  "If you could create your own course at college, what would it be?",
    "Draw the layout of your dorm room.",
    "What's your favorite spot on campus to hang out between classes?",
    "If you could switch majors without any consequences, what would you pick?",
    "What's the most creative excuse you've heard for missing class?",
    "Describe your ideal college schedule—no early classes, unlimited electives, or something else?",
    "What's a fun fact about your campus that most people don't know?",
    "If you could redesign one area on campus, what would you change?",
    "What's the best (or worst) campus food you've tried so far?",
    "What's a student organization you'd love to join or start?",
    "If you could take a class taught by any celebrity, who would it be?",
    "Draw your campus mascot in your style!",
    "What's your favorite study hack?",
    "What's the most interesting class you've taken at college so far?",
    "Describe a campus event you're excited about attending.",
    "What's your best or most embarrassing freshman-year story?",
    "If you could pick a new name for your university, what would it be?",
    "What's your favorite way to relax after a big exam or project?",
    "What's the best piece of advice an upperclassman has given you?",
    "What would your dorm's theme song be?",
    "What's one campus tradition you're excited to experience?",
    "If you could live in any building on campus, which one would you choose?",
    "What's a hidden gem on your campus that more students should know about?",
    "What's the most creative or oddest club you've heard about at your school?",
    "If you could host a themed party on campus, what would the theme be?",
    "What's your go-to spot for a late-night snack near campus?",
    "If you could name one building on campus after yourself, which one would it be?",
    "What's your secret weapon for pulling off all-nighters?",
    "If you could pick your own roommate, which person would you choose?",
    "What's the best spot to people-watch on campus?",
    "What's the funniest thing that's happened during a lecture?",
    "If you could take a gap year anywhere in the world, where would you go?",
    "If your dorm/apartment had a signature scent, what would it smell like?",
    "If you could add one thing to your campus dining hall, what would it be?",
    "What's a weird roommate habit that you've either developed or noticed?",
    "What's a class you thought would be easy but turned out to be hard?",
    "If you could have any college professor as a mentor, who would it be?",
    "Describe the best prank you've witnessed on campus.",
    "What's something you've always wanted to do on campus but haven't done yet?",
    "Draw your ideal study set-up—snacks, music, or anything else included!",
    "Describe the biggest lie you've told to get out of class or an assignment.",
    "Draw your most chaotic night out in emojis only.",
    "Draw the most awkward position you've fallen asleep in during class.",
    "What's the craziest thing you've snuck into a dorm room or library?",
    "What's your longest all-nighter streak?"
];

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#B19CD9', '#FF85A2', '#77DD77', '#836FFF'
];

const IcebreakerPrompt: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [color, setColor] = useState(colors[0]);
  const [isPromptTime, setIsPromptTime] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * icebreakers.length);
    return icebreakers[randomIndex];
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  useEffect(() => {
    const updateState = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      if (minutes < 30) {
        // It's prompt time (0:00 to 0:29)
        if (!isPromptTime) {
          // Only set a new prompt and color when transitioning to prompt time
          setPrompt(getRandomPrompt());
          setColor(getRandomColor());
        }
        setIsPromptTime(true);
        setCountdown(30 * 60 - minutes * 60 - seconds);
      } else {
        // It's countdown time (0:30 to 0:59)
        setIsPromptTime(false);
        setCountdown(60 * 60 - minutes * 60 - seconds);
      }
    };

    updateState(); // Initial update
    const interval = setInterval(updateState, 1000);

    return () => clearInterval(interval);
  }, [isPromptTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="icebreaker-prompt" style={{ color: color }}>
      {isPromptTime ? (
        <>
          <h3>Tag Challenge: {prompt}</h3>
          <div className="countdown">{formatTime(countdown)}</div>
        </>
      ) : (
        <>
          <h3>Next Tag Challenge in:</h3>
          <div className="countdown">{formatTime(countdown)}</div>
        </>
      )}
    </div>
  );
};

export default IcebreakerPrompt;