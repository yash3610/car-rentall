// Simple utility to play sound effects
export const playPopSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
  audio.volume = 0.3;
  audio.play().catch(e => console.log("Audio play failed", e));
};

export const playConfettiSound = () => {
  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
  audio.volume = 0.4;
  audio.play().catch(e => console.log("Audio play failed", e));
};
