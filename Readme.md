Window Namer : a browser plugin to name your windows
====================================================

Window Namer is a browser plugin with a very simple agenda: allow users to name their browser windows.

If you're like me, you have tons of browser tabs open, and when that becomes unmanageable, you open up tons of windows to keep things sane.
Well, I found that I typically have one window per topic/context/project that I'm working on. My usual split of windows are something like so:
  
  * Work: Tabs related to work; usually in a single window unless multiple work projects arise and need their own windows. Issue tracker is typically here, as is work webmail.
  * Project A: 20 tabs related to Project A
  * Project B: similar set of tabs related to Project B
  * Personal: This is all personal stuff - looking up restaurants, checking on taxes, etc - all the mundane stuff
  * Browse: This is for Hacker News, and similar idle browsing
  
Usually, these are in separate workspaces, so there's a natural separation, but the Projects are all in one tab, and I thought it'd be nice if I could know easily which window is which - especially by looking at the Taskbar or while switching between windows.

Hence this plugin.

Now, there are other solutions available - especially on firefox. Firefox has had superb tab control plugins for a while, and FF4 has the Panorama feature which helps organize tabs. However, these are of no use to me as my unit of division is the window, not the tab - I want to be able to Alt-tab to the right project easily.

How to Use
==========
The general steps in using the plugin are:
* Download and install the plugin
* Activate the plugin.
  * Chrome: Select the plugin's icon
  * FF: Tools -> WindowNamer
* Enter a name for the current window in the popup that shows up
* All tabs in the curent window should now have the chosen name


Implementation
==============
When it comes to implementing the idea of a window name, there's a bit of a problem: Browser windows dont have names.

Rather, they all have the same name - the browser's name; which browser authors have wisely chosen to append it to the page's (read tab's these days) title. So even if I could change add something to the "Mozilla Firefox" or "Google Chrome" texts, it would be of no use from the POV of seeing such a name in a taskbar or while switching using Alt-tab (or mac equivalent)

I have therefore implemented Window Namer as a Tab title updater, actually.

Yes, this means all your tabs' title will have a prefix that you choose.
Yes, they will retain the name past page reloads and changes in page location
Yes, new tabs will automatically get the name you chose when a page is loaded in them.
And yes, this also means that if you have tons of tabs opened, looking at the first few letters to discern the content is no longer an option. I did consider some crazy time-elapse hide of the window name, but havent got to it yet. IMO unless is a graceful fade in/out, it would be a very jarring experience.

In fact, the only pages it won't work on are the Google Chrome Extension Gallery pages - see how I turned what's essentially something I cannot do into a feature there ;)?

Browser specific details
------------------------
* Firefox: The FF plugin is almost working, I'm stuck in the part where the window name needs to be updated when the page reloads
* Chrome: The Chrome plugin is working, except for items mentioned in the todo list

Todos
=====
* Validate name entered doesnt have XSS potential. FF: Done, Chrome: TBD
* Display existing name if name entry chosen again.  FF: Done, Chrome: TBD
* CSS for Popup. FF: NA, Chrome: TBD
* Make plugin reinsert window name when tab reloads or changes location. FF:TBD, Chrome:Done
* Create/find icon for plugin. FF: TBD, Chrome: TBD
* Packaging of the plugin. FF: TBD, Chrome: TBD

Future features
===============
* Ability to turn names off. Although on Chrome at least, if you set the name to blank it will essentially revert back to the old state
* Ability to configure the name text. Maybe "[context] actual title" is better than "context - actual title"?
