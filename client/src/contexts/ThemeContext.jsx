import {createContext} from "react";

export const ThemeContext = createContext({ enableDarkTheme: true, setEnableDarkTheme: () => {} });
