import { createCookie } from "@remix-run/node";

//We convert our custom select Diffculty to have a radio button group or select as a base
//We use a form to gather the diff data and an action to set the cookie
//Game page reads the cookie on loader, fetchs pokemon according to it.

export const gameSettings = createCookie("game-settings", {
  
})