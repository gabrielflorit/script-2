Make a high-level implementation plan for the following:

- add /boot, /home, /play, /edit, /learn, and /about pages. If I don't give you instructions, use placeholder content.
- /boot should show a placeholder progress bar loading for one sec, then transition to either /play or /edit or /learn or /about. Hopefully there's a lit-labs router setting that makes this clean.
- /home shows the choices: play|new, edit, learn, about
- / should go to /home
- e.g. if you go to /about and you're not already on the site, first you go to /boot, then /about. Same for others. The idea being if you go to the site directly from outside,, you always see booting, because it has to. Then it goes to the page you chose. But if you're already on the site, changing URLS doesn't show boot. Maybe we can accomplish this effect simply by always using internal routing when changing screens intenrally.
- /play shows just the game
- /edit shows a top menu, the left editor, and the right preview. the preview contains game.
- for the first demo we need to verify joystick can send short and long presses, meaning, we should be able to "see" the effects of short/long presses, direclty on the game. don't worry about creating a game engine, etc. for this first demo, verify joystick actions work on mobile. I'm especially concerned long presses will trick the browser into selecting text or copying or soemthing else. I just want the browser to not do anything else except register the long press.

For this implementation plan, don't produce code. Write outlines, breaking everything into small commits that build off each other. Do highlight anything of interest technically, e.g. what are you going to use for state management? and etc. But don't just start printing walls of code.
