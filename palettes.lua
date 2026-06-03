--[[
Colors derived from kanagawa.nvim
https: //github.com/rebelot/kanagawa.nvim
LICENCE:
MIT License

Copyright (c) 2021 Tommaso Laurenzi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
]]

return {
    colors = {
        -- Bg Shades
        { "sumiInk0",      "#16161D" },
        { "sumiInk1",      "#181820" },
        { "sumiInk2",      "#1a1a22" },
        { "sumiInk3",      "#1F1F28" },
        { "sumiInk4",      "#2A2A37" },
        { "sumiInk5",      "#363646" },
        { "sumiInk6",      "#54546D" }, --fg

        -- Popup and Floats
        { "waveBlue1",     "#223249" },
        { "waveBlue2",     "#2D4F67" },

        -- Diff and Git
        { "winterGreen",   "#2B3328" },
        { "winterYellow",  "#49443C" },
        { "winterRed",     "#43242B" },
        { "winterBlue",    "#252535" },
        { "autumnGreen",   "#76946A" },
        { "autumnRed",     "#C34043" },
        { "autumnYellow",  "#DCA561" },

        -- Diag
        { "samuraiRed",    "#E82424" },
        { "roninYellow",   "#FF9E3B" },
        { "waveAqua1",     "#6A9589" },
        { "dragonBlue",    "#658594" },

        -- Fg and Comments
        { "oldWhite",      "#C8C093" },
        { "fujiWhite",     "#DCD7BA" },
        { "fujiGray",      "#727169" },

        { "oniViolet",     "#957FB8" },
        { "oniViolet2",    "#b8b4d0" },
        { "crystalBlue",   "#7E9CD8" },
        { "springViolet1", "#938AA9" },
        { "springViolet2", "#9CABCA" },
        { "springBlue",    "#7FB4CA" },
        { "lightBlue",     "#A3D4D5" }, -- unused yet
        { "waveAqua2",     "#7AA89F" }, -- improve lightness: desaturated greenish Aqua

        -- {"waveAqua2", "#68AD99"},
        -- {"waveAqua4", "#7AA880"},
        -- {"waveAqua5", "#6CAF95"},
        -- {"waveAqua3", "#68AD99"},

        { "springGreen",   "#98BB6C" },
        { "boatYellow1",   "#938056" },
        { "boatYellow2",   "#C0A36E" },
        { "carpYellow",    "#E6C384" },

        { "sakuraPink",    "#D27E99" },
        { "waveRed",       "#E46876" },
        { "peachRed",      "#FF5D62" },
        { "surimiOrange",  "#FFA066" },
        { "katanaGray",    "#717C7C" },

        { "dragonBlack0",  "#0d0c0c" },
        { "dragonBlack1",  "#12120f" },
        { "dragonBlack2",  "#1D1C19" },
        { "dragonBlack3",  "#181616" },
        { "dragonBlack4",  "#282727" },
        { "dragonBlack5",  "#393836" },
        { "dragonBlack6",  "#625e5a" },

        { "dragonWhite",   "#c5c9c5" },
        { "dragonGreen",   "#87a987" },
        { "dragonGreen2",  "#8a9a7b" },
        { "dragonPink",    "#a292a3" },
        { "dragonOrange",  "#b6927b" },
        { "dragonOrange2", "#b98d7b" },
        { "dragonGray",    "#a6a69c" },
        { "dragonGray2",   "#9e9b93" },
        { "dragonGray3",   "#7a8382" },
        { "dragonBlue2",   "#8ba4b0" },
        { "dragonViolet",  "#8992a7" },
        { "dragonRed",     "#c4746e" },
        { "dragonAqua",    "#8ea4a2" },
        { "dragonAsh",     "#737c73" },
        { "dragonTeal",    "#949fb5" },
        { "dragonYellow",  "#c4b28a" }, --"#a99c8b",
        -- "#8a9aa3",

        { "lotusInk1",     "#545464" },
        { "lotusInk2",     "#43436c" },
        { "lotusGray",     "#dcd7ba" },
        { "lotusGray2",    "#716e61" },
        { "lotusGray3",    "#8a8980" },
        { "lotusWhite0",   "#d5cea3" },
        { "lotusWhite1",   "#dcd5ac" },
        { "lotusWhite2",   "#e5ddb0" },
        { "lotusWhite3",   "#f2ecbc" },
        { "lotusWhite4",   "#e7dba0" },
        { "lotusWhite5",   "#e4d794" },
        { "lotusViolet1",  "#a09cac" },
        { "lotusViolet2",  "#766b90" },
        { "lotusViolet3",  "#c9cbd1" },
        { "lotusViolet4",  "#624c83" },
        { "lotusBlue1",    "#c7d7e0" },
        { "lotusBlue2",    "#b5cbd2" },
        { "lotusBlue3",    "#9fb5c9" },
        { "lotusBlue4",    "#4d699b" },
        { "lotusBlue5",    "#5d57a3" },
        { "lotusGreen",    "#6f894e" },
        { "lotusGreen2",   "#6e915f" },
        { "lotusGreen3",   "#b7d0ae" },
        { "lotusPink",     "#b35b79" },
        { "lotusOrange",   "#cc6d00" },
        { "lotusOrange2",  "#e98a00" },
        { "lotusYellow",   "#77713f" },
        { "lotusYellow2",  "#836f4a" },
        { "lotusYellow3",  "#de9800" },
        { "lotusYellow4",  "#f9d791" },
        { "lotusRed",      "#c84053" },
        { "lotusRed2",     "#d7474b" },
        { "lotusRed3",     "#e82424" },
        { "lotusRed4",     "#d9a594" },
        { "lotusAqua",     "#597b75" },
        { "lotusAqua2",    "#5e857a" },
        { "lotusTeal1",    "#4e8ca2" },
        { "lotusTeal2",    "#6693bf" },
        { "lotusTeal3",    "#5a7785" },
        { "lotusCyan",     "#d7e3d8" },
    },

    palettes = {
        { "wave", {
            color_scheme = "dark",
            colors = {
                { "ui", {
                    { "fg",         "fujiWhite" },
                    { "fg_dim",     "oldWhite" },
                    { "fg_reverse", "waveBlue1" },

                    { "bg_dim",     "sumiInk1" },
                    { "bg_gutter",  "sumiInk4" },

                    { "bg_m3",      "sumiInk0" },
                    { "bg_m2",      "sumiInk1" },
                    { "bg_m1",      "sumiInk2" },
                    { "bg",         "sumiInk3" },
                    { "bg_p1",      "sumiInk4" },
                    { "bg_p2",      "sumiInk5" },

                    { "special",    "springViolet1" },
                    { "nontext",    "sumiInk6" },
                    { "whitespace", "sumiInk6" },

                    { "bg_search",  "waveBlue2" },
                    { "bg_visual",  "waveBlue1" },

                    { "pmenu", {
                        { "fg",       "fujiWhite" },
                        { "fg_sel",   "ui-fg" }, -- This is important to make highlights pass-through
                        { "bg",       "waveBlue1" },
                        { "bg_sel",   "waveBlue2" },
                        { "bg_sbar",  "waveBlue1" },
                        { "bg_thumb", "waveBlue2" }, }
                    },
                    { "float", {
                        { "fg",        "oldWhite" },
                        { "bg",        "sumiInk0" },
                        { "fg_border", "sumiInk6" },
                        { "bg_border", "sumiInk0" }, }
                    },
                } },
                { "syn", {
                    { "string",     "springGreen" },
                    { "variable",   "ui-fg" },
                    { "number",     "sakuraPink" },
                    { "constant",   "surimiOrange" },
                    { "identifier", "carpYellow" },
                    -- {"parameter", "#C3B1B1"},
                    -- {"parameter", "#B1ADC8"},
                    -- {"parameter", "#b8b4d0"},
                    { "parameter",  "oniViolet2" },
                    -- {"parameter", "#d5a4a6"},
                    -- {"parameter", "#C8ADAD"},
                    -- {"parameter", "#d7a8a8"},
                    { "fun",        "crystalBlue" },
                    { "statement",  "oniViolet" },
                    { "keyword",    "oniViolet" },
                    { "operator",   "boatYellow2" },
                    { "preproc",    "waveRed" }, --lightBlue? deserves its own color
                    { "type",       "waveAqua2" },
                    { "regex",      "boatYellow2" },
                    { "deprecated", "katanaGray" },
                    { "comment",    "fujiGray" },
                    { "punct",      "springViolet2" },
                    { "special1",   "springBlue" },
                    { "special2",   "waveRed" },
                    { "special3",   "peachRed" },
                }
                },
                { "vcs", {
                    { "added",   "autumnGreen" },
                    { "removed", "autumnRed" },
                    { "changed", "autumnYellow" }, }
                },
                { "diff", {
                    { "add",    "winterGreen" },
                    { "delete", "winterRed" },
                    { "change", "winterBlue" },
                    { "text",   "winterYellow" }, }
                },
                { "diag", {
                    { "ok",      "springGreen" },
                    { "error",   "samuraiRed" },
                    { "warning", "roninYellow" },
                    { "info",    "dragonBlue" },
                    { "hint",    "waveAqua1" }, }
                },
                { "term", {
                    "sumiInk0",      -- black
                    "autumnRed",     -- red
                    "autumnGreen",   -- green
                    "boatYellow2",   -- yellow
                    "crystalBlue",   -- blue
                    "oniViolet",     -- magenta
                    "waveAqua1",     -- cyan
                    "oldWhite",      -- white
                    "fujiGray",      -- bright black
                    "samuraiRed",    -- bright red
                    "springGreen",   -- bright green
                    "carpYellow",    -- bright yellow
                    "springBlue",    -- bright blue
                    "springViolet1", -- bright magenta
                    "waveAqua2",     -- bright cyan
                    "fujiWhite",     -- bright white
                    "surimiOrange",  -- extended color 1
                    "peachRed",      -- extended color 2
                } },
            },
        } },
        { "dragon", {
            color_scheme = "dark",
            colors = {
                { "ui", {
                    { "fg",         "dragonWhite" },
                    { "fg_dim",     "oldWhite" },
                    { "fg_reverse", "waveBlue1" },

                    { "bg_dim",     "dragonBlack1" },
                    { "bg_gutter",  "dragonBlack4" },

                    { "bg_m3",      "dragonBlack0" },
                    { "bg_m2",      "dragonBlack1" },
                    { "bg_m1",      "dragonBlack2" },
                    { "bg",         "dragonBlack3" },
                    { "bg_p1",      "dragonBlack4" },
                    { "bg_p2",      "dragonBlack5" },

                    { "special",    "dragonGray3" },
                    { "whitespace", "dragonBlack6" },
                    { "nontext",    "dragonBlack6" },

                    { "bg_visual",  "waveBlue1" },
                    { "bg_search",  "waveBlue2" },

                    { "pmenu", {
                        { "fg",       "fujiWhite" },
                        { "fg_sel",   "ui-fg" },
                        { "bg",       "waveBlue1" },
                        { "bg_sel",   "waveBlue2" },
                        { "bg_thumb", "waveBlue2" },
                        { "bg_sbar",  "waveBlue1" },
                    } },

                    { "float", {
                        { "fg",        "oldWhite" },
                        { "bg",        "dragonBlack0" },
                        { "fg_border", "sumiInk6" },
                        { "bg_border", "dragonBlack0" },
                    } },
                } },
                { "syn", {
                    { "string",     "dragonGreen2" },
                    { "variable",   "ui-fg" },
                    { "number",     "dragonPink" },
                    { "constant",   "dragonOrange" },
                    { "identifier", "dragonYellow" },
                    { "parameter",  "dragonGray" },
                    { "fun",        "dragonBlue2" },
                    { "statement",  "dragonViolet" },
                    { "keyword",    "dragonViolet" },
                    { "operator",   "dragonRed" },
                    { "preproc",    "dragonRed" },
                    { "type",       "dragonAqua" },
                    { "regex",      "dragonRed" },
                    { "deprecated", "katanaGray" },
                    { "punct",      "dragonGray2" },
                    { "comment",    "dragonAsh" },
                    { "special1",   "dragonTeal" },
                    { "special2",   "dragonRed" },
                    { "special3",   "dragonRed" },
                } },
                { "diag", {
                    { "error",   "samuraiRed" },
                    { "ok",      "springGreen" },
                    { "warning", "roninYellow" },
                    { "info",    "dragonBlue" },
                    { "hint",    "waveAqua1" },
                } },
                { "diff", {
                    { "add",    "winterGreen" },
                    { "delete", "winterRed" },
                    { "change", "winterBlue" },
                    { "text",   "winterYellow" },
                } },
                { "vcs", {
                    { "added",   "autumnGreen" },
                    { "removed", "autumnRed" },
                    { "changed", "autumnYellow" },
                } },
                { "term", {
                    "dragonBlack0",  -- black
                    "dragonRed",     -- red
                    "dragonGreen2",  -- green
                    "dragonYellow",  -- yellow
                    "dragonBlue2",   -- blue
                    "dragonPink",    -- magenta
                    "dragonAqua",    -- cyan
                    "oldWhite",      -- white
                    "dragonGray",    -- bright black
                    "waveRed",       -- bright red
                    "dragonGreen",   -- bright green
                    "carpYellow",    -- bright yellow
                    "springBlue",    -- bright blue
                    "springViolet1", -- bright magenta
                    "waveAqua2",     -- bright cyan
                    "dragonWhite",   -- bright white
                    "dragonOrange",  -- extended color 1
                    "dragonOrange2", -- extended color 2
                } },
            },
        } },
        { "lotus", {
            color_scheme = "light",
            colors = {
                { "ui", {
                    { "fg",         "lotusInk1" },
                    { "fg_dim",     "lotusInk2" },
                    { "fg_reverse", "lotusGray" },

                    { "bg_dim",     "lotusWhite1" },
                    { "bg_gutter",  "lotusWhite4" },

                    { "bg_m3",      "lotusWhite0" },
                    { "bg_m2",      "lotusWhite1" },
                    { "bg_m1",      "lotusWhite2" },
                    { "bg",         "lotusWhite3" },
                    { "bg_p1",      "lotusWhite4" },
                    { "bg_p2",      "lotusWhite5" },

                    { "nontext",    "lotusViolet1" },
                    { "whitespace", "lotusViolet1" },
                    { "special",    "lotusViolet2" },

                    { "bg_visual",  "lotusViolet3" },
                    { "bg_search",  "lotusBlue2" },

                    { "pmenu", {
                        { "fg",       "lotusInk2" },
                        { "fg_sel",   "ui-fg" },
                        { "bg",       "lotusBlue1" },
                        { "bg_sel",   "lotusBlue3" },
                        { "bg_sbar",  "lotusBlue1" },
                        { "bg_thumb", "lotusBlue2" },
                    } },
                    { "float", {
                        { "fg",        "lotusInk2" },
                        { "bg",        "lotusWhite0" },
                        { "fg_border", "lotusGray2" },
                        { "bg_border", "lotusWhite0" },
                    } },
                } },
                { "syn", {
                    { "string",     "lotusGreen" },
                    { "variable",   "ui-fg" },
                    { "number",     "lotusPink" },
                    { "constant",   "lotusOrange" },
                    { "identifier", "lotusYellow" },
                    { "parameter",  "lotusBlue5" },
                    { "fun",        "lotusBlue4" },
                    { "statement",  "lotusViolet4" },
                    { "keyword",    "lotusViolet4" },
                    { "operator",   "lotusYellow2" },
                    { "preproc",    "lotusRed" },
                    { "type",       "lotusAqua" },
                    { "regex",      "lotusYellow2" },
                    { "deprecated", "lotusGray3" },
                    { "comment",    "lotusGray3" },
                    { "punct",      "lotusTeal1" },
                    { "special1",   "lotusTeal2" },
                    { "special2",   "lotusRed" },
                    { "special3",   "lotusRed" },
                } },
                { "vcs", {
                    { "added",   "lotusGreen2" },
                    { "removed", "lotusRed2" },
                    { "changed", "lotusYellow3" },
                } },
                { "diff", {
                    { "add",    "lotusGreen3" },
                    { "delete", "lotusRed4" },
                    { "change", "lotusCyan" },
                    { "text",   "lotusYellow4" },
                } },
                { "diag", {
                    { "error",   "lotusRed3" },
                    { "ok",      "lotusGreen" },
                    { "warning", "lotusOrange2" },
                    { "info",    "lotusTeal3" },
                    { "hint",    "lotusAqua2" },
                } },
                { "term", {
                    "sumiInk3",     -- black
                    "lotusRed",     -- red
                    "lotusGreen",   -- green
                    "lotusYellow",  -- yellow
                    "lotusBlue4",   -- blue
                    "lotusPink",    -- magenta
                    "lotusAqua",    -- cyan
                    "lotusInk1",    -- white
                    "lotusGray3",   -- bright black
                    "lotusRed2",    -- bright red
                    "lotusGreen2",  -- bright green
                    "lotusYellow2", -- bright yellow
                    "lotusTeal2",   -- bright blue
                    "lotusViolet4", -- bright magenta
                    "lotusAqua2",   -- bright cyan
                    "lotusInk2",    -- bright white
                    "lotusOrange2", -- extended color 1
                    "lotusRed3",    -- extended color 2
                } },
            }
        } },
    }
}
