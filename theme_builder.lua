local p = require('palettes')
local colors = p.colors
local palettes = p.palettes

local default_theme = 'wave'

local function generate_theme(items)
    for _, a in ipairs(items) do
        local id = a[1]
        local color_data = a[2]

        for idx, b in ipairs(color_data) do
            if type(b) == "table" then
                local color_id = tostring(b[1]):gsub('_', '-')
                local color = b[2]
                if type(color) == "table" then
                    for _, c in ipairs(color) do
                        local sub_color_id = tostring(c[1]):gsub('_', '-')
                        local sub_color = c[2]
                        print(('  --color-%s-%s-%s : var(--color-%s);'):format(id, color_id, sub_color_id, sub_color))
                    end
                else
                    print(('  --color-%s-%s : var(--color-%s);'):format(id, color_id, color))
                end
            else
                print(('  --color-%s-%s : var(--color-%s);'):format(id, idx, b))
            end
        end
    end
end

print('@import \'tailwindcss\';')
print('@theme {')
print('  --font-mono: \'Fira Code\', monospace;')
print('  --color-*: initial;')
for _, color_def in ipairs(colors) do
    local name = color_def[1]
    local value = color_def[2]
    print(('  --color-%s: %s;'):format(name, value:lower()))
end
generate_theme(palettes[1][2].colors)
print('}')

for _, val in ipairs(palettes) do
    local palette = val[1]
    local items = val[2]
    print(('[data-theme="%s"] {'):format(palette))
    print(('\tcolor-scheme: %s;'):format(items.color_scheme))
    if palette ~= default_theme then
        generate_theme(items.colors)
    end
    print('}')
end
